<template>
  <div class="userMan-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select clearable placeholder="身份" v-model="searchData.type" style="width: 150px;">
          <el-option
            v-for="item in authList"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input style="width: 250px;" placeholder="请输入账号" v-model="searchData.searchText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <!-- <el-button type="success" icon="el-icon-refresh">刷新</el-button> -->
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNews" v-if="isAuth(currentPer,'NEWS_INSERT')">新增</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" v-if="isAuth(currentPer,'NEWS_DELETES')" @click="deleteBatchNews" :disabled="!eletelist.length">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table class="user-list" :data="userList" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column label="账号" prop="account_id" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="姓名" prop="user_name" show-overflow-tooltip></el-table-column>
      <el-table-column label="学号" prop="user_id" show-overflow-tooltip></el-table-column>
      <el-table-column label="院系" width="150" prop="user_departname" show-overflow-tooltip></el-table-column>
      <el-table-column label="专业" width="150" prop="user_majorname" show-overflow-tooltip></el-table-column>
      <el-table-column label="班级" prop="user_class" show-overflow-tooltip></el-table-column>
      <el-table-column label="身份" prop="auth_name" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scoped">
          <el-tooltip
            effect="light"
            :content="scoped.row.auth==='admin'?'取消管理员':'设为管理员'"
            placement="top"
          >
            <el-button
              circle
              size="mini"
              v-if="auth === 'super_admin'"
              :disabled="scoped.row.auth==='super_admin'"
              :type="scoped.row.auth==='admin'?'warning':'primary'"
              @click="setAdmin(scoped.row)"
            >
              <i class="el-icon-setting"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="light" :content="scoped.row.status===1?'停用':'启用'" placement="top">
            <el-button
              circle
              size="mini"
              :disabled="scoped.row.auth==='super_admin' || accountid === scoped.row.account_id"
              :type="scoped.row.status===1?'success':'danger'"
              @click="changeStatus(scoped.row)"
            >
              <i :class="scoped.row.status===1?'el-icon-video-pause':'el-icon-video-play'"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="重置密码" placement="top">
            <el-button :disabled="scoped.row.auth==='super_admin' || accountid === scoped.row.account_id" circle size="mini" type="warning" @click="initPwd(scoped.row)">
              <i class="el-icon-refresh"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="删除" placement="top">
            <el-button v-if="auth === 'super_admin'" :disabled="scoped.row.auth==='super_admin'" circle size="mini" type="danger" @click="deleteUser(scoped.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :page-count="totalPage"
      background
      style="text-align: right; margin-top: 20px;"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getUserList,
  getAuthList,
  setAdmin,
  cancelAdmin,
  startATop,
  initPwd,
  deleteUser
} from "@/api/system/index";

export default {
  components: {},
  data() {
    return {
      userList: [],
      authList: [],
      currentPage: 1,
      totalPage: null,
      listLoading: false,
      value: "",
      searchData: {
        pageNum: 1,
        pageSize: 10,
        searchText: "",
        type: ""
      }
    };
  },
  created() {
    this.listLoading = true;
    this.getUserList();
    this.getAuthList();
  },
  filters: {},
  computed: {
    auth() {
      return this.$store.state.user.role
    },
    accountid() {
      return this.$store.state.user.accountid
    }
  },
  methods: {
    getUserList() {
      getUserList({
        account_id: this.$store.state.user.accountid,
        pageNum: this.searchData.pageNum,
        searchText: this.searchData.searchText,
        type: this.searchData.type
      }).then(res => {
        console.log(res);
        if (
          this.searchData.pageNum > res.data.totalPage &&
          res.data.totalPage !== 0
        ) {
          this.searchData.pageNum = res.data.totalPage;
          getUserList({
            account_id: this.$store.state.user.accountid,
            pageNum: this.searchData.pageNum,
            searchText: this.searchData.searchText,
            type: this.searchData.type
          }).then(res => {
            this.totalPage = res.data.totalPage;
            this.userList = res.data.list;
            this.listLoading = false;
          });
        } else {
          this.totalPage = res.data.totalPage;
          this.userList = res.data.list;
          this.listLoading = false;
        }
      });
    },
    handleCurrentChange() {
      this.listLoading = true;
      this.getUserList();
    },
    searchList() {
      this.getUserList();
    },
    getAuthList() {
      getAuthList().then(res => {
        console.log(res);
        this.authList = res.data;
      });
    },
    setAdmin(data) {
      if (data.auth === "admin") {
        this.$confirm("是否取消管理员?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            cancelAdmin({
              account_id: data.account_id,
              userId: this.$store.state.user.accountid
            }).then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "取消成功!"
              });
              this.updateList();
            });
          })
          .catch(() => {});
      } else if (data.auth === "consumer") {
        this.$confirm("是否设为管理员?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            setAdmin({
              account_id: data.account_id,
              userId: this.$store.state.user.accountid
            }).then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "设置成功!"
              });
              this.updateList();
            });
          })
          .catch(() => {});
      }
    },
    changeStatus(data) {
      this.$confirm("是否确认此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          startATop({
            account_id: data.account_id,
            userId: this.$store.state.user.accountid,
            status: data.status
          }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "成功!"
            });
            this.updateList();
          });
        })
        .catch(() => {});
    },
    initPwd(data) {
      this.$confirm("是否确认重置该用户密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          initPwd({
            account_id: data.account_id,
            userId: this.$store.state.user.accountid
          }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "成功!"
            });
            this.updateList();
          });
        })
        .catch(() => {});
    },
    deleteUser(data) {
      this.$confirm("是否确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({
            account_id: data.account_id,
            userId: this.$store.state.user.accountid
          }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "成功!"
            });
            this.updateList();
          });
        })
        .catch(() => {});
    },
    updateList() {
      this.listLoading = true;
      this.searchData = {
        pageNum: 1,
        pageSize: 10,
        searchText: "",
        type: ""
      };
      this.getUserList();
    }
  }
};
</script>

<style scoped>
.d {
  margin-top: 8px;
}
.footer {
  margin: 10px 0;
  text-align: right;
}
.user-list {
  min-height: 595px;
  border-radius: 4px;
  padding-left: 20px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);
}

.userMan-container {
  border-radius: 4px;
  padding: 0 10px;
  display: flex;
  flex-flow: column;
}
</style>

