<template>
  <div class="itemMan-container">
    <div class="top">
      <div class="left">
        <el-select clearable placeholder="物品分类" v-model="searchData.itemClass" style="width: 150px; margin-right: 20px;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input style="width: 250px;" placeholder="请输入内容" v-model="searchData.searchText"></el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
        <!-- <el-button type="success" icon="el-icon-refresh">刷新</el-button> -->
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNews" v-if="isAuth(currentPer,'NEWS_INSERT')">新增</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" v-if="isAuth(currentPer,'NEWS_DELETES')" @click="deleteBatchNews" :disabled="!eletelist.length">批量删除</el-button> -->
      
      </div>
      <div class="right">
        <div @click="changeToLost" :class="[navActive===1?'nav-btn-active':'','nav-btn']">失物</div>
        <div @click="changeToPick" :class="[navActive===2?'nav-btn-active':'','nav-btn']">拾物</div>
      </div>
    </div>
    <!-- 表格 -->
    <el-table v-if="navActive===1" class="user-list" :data="lostList" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" width="200" prop="itemdesc" show-overflow-tooltip></el-table-column>
      <el-table-column label="分类" width="80" prop="itemclassLabel" show-overflow-tooltip></el-table-column>
      <el-table-column label="丢失时间" prop="occur_time" :formatter="timeFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="丢失地点" prop="site" show-overflow-tooltip></el-table-column>
      <el-table-column label="联系方式" prop="contcat" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户账号" prop="account_id" show-overflow-tooltip></el-table-column>
      <el-table-column label="归还者" prop="return_id" :formatter="returnFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" prop="status" :formatter="statusFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-tooltip effect="light" content="删除" placement="top">
            <el-button circle size="mini" type="danger" @click="deleteItem(scoped.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="navActive===2" class="user-list" :data="pickList" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" width="200" prop="itemdesc" show-overflow-tooltip></el-table-column>
      <el-table-column label="分类" width="80" prop="itemclassLabel" show-overflow-tooltip></el-table-column>
      <el-table-column label="拾取时间" prop="occur_time" :formatter="timeFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="拾取地点" prop="site" show-overflow-tooltip></el-table-column>
      <el-table-column label="联系方式" prop="contcat" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户账号" prop="account_id" show-overflow-tooltip></el-table-column>
      <el-table-column label="认领者" prop="claim_id" :formatter="returnFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" prop="status" :formatter="statusFormat" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-tooltip effect="light" content="删除" placement="top">
            <el-button circle size="mini" type="danger" @click="deleteItem(scoped.row)">
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
import { getAllLostList, getAllPickList, deleteLost, deletePick } from "@/api/system/index";
import { getItemClass } from '@/api/lostHall/index'


export default {
  components: {},
  data() {
    return {
      navActive: 1,
      lostList: [],
      pickList: [],
      options: [],
      currentPage: 1,
      totalPage: null,
      listLoading: false,
      value: "",
      searchData: {
        pageSize: 10,
        pageNum: 1,
        searchText: '',
        itemClass: null
      }
    };
  },
  created() {
    this.listLoading = true;
    this.getItemClass()
    this.getLostList()
  },
  filters: {},
  methods: {
    getLostList() {
      getAllLostList(this.searchData).then(res => {
        if (
          this.searchData.pageNum > res.data.totalPage &&
          res.data.totalPage !== 0
        ) {
          this.searchData.pageNum = res.data.totalPage;
          getAllLostList(this.searchData).then(res => {
            this.totalPage = res.data.totalPage;
            this.lostList = res.data.list;
            this.listLoading = false;
          });
        } else {
          this.totalPage = res.data.totalPage;
          this.lostList = res.data.list;
          this.listLoading = false;
        }
      });
    },
    getPickList() {
      getAllPickList(this.searchData).then(res => {
        if (
          this.searchData.pageNum > res.data.totalPage &&
          res.data.totalPage !== 0
        ) {
          this.searchData.pageNum = res.data.totalPage;
          getAllPickList(this.searchData).then(res => {
            this.totalPage = res.data.totalPage;
            this.pickList = res.data.list;
            this.listLoading = false;
          });
        } else {
          this.totalPage = res.data.totalPage;
          this.pickList = res.data.list;
          this.listLoading = false;
        }
      });
    },
    getItemClass() {
      getItemClass()
        .then(res => {
          console.log(res.data)
          this.options = res.data
        })
    },
    handleCurrentChange() {
      this.listLoading = true;
      if(this.navActive === 1) {
        this.getLostList();
      } else if(this.navActive === 2) {
        this.getPickList()
      }
    },
    searchList() {
      this.listLoading = true
      if(this.navActive === 1) {
        this.getLostList();
      } else if(this.navActive === 2) {
        this.getPickList()
      }
      
    },
    deleteItem(data) {
      this.$confirm("是否确认删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(this.navActive === 1) {
            deleteLost({
              id: data.id,
              account_id: this.$store.state.user.accountid
            })
              .then(res => {
                console.log(res)
                this.updateList();
              })
          } else if(this.navActive === 2) {
            deletePick({
              id: data.id,
              account_id: this.$store.state.user.accountid
            })
              .then(res => {
                console.log(res)
                this.updateList();
              })
          }
            
         
        })
        .catch(() => {});
    },
    updateList() {
      this.listLoading = true;
      this.searchData = {
        pageSize: 10,
        pageNum: 1,
        searchText: '',
        itemClass: null
      };
      if(this.navActive === 1) {
        this.getLostList();
      } else if(this.navActive === 2) {
        this.getPickList();
      }

    },
    timeFormat(row) {
      return row.occur_time.substr(0,10)
    },
    statusFormat(row) {
      if(this.navActive === 1) {
        if(row.status===0) {
          return '待归还'
        } else if(row.status===1) {
          return '归还中'
        } else if(row.status===2) {
          return '已归还'
        }
      } else if(this.navActive === 2) {
        if(row.status===0) {
          return '待认领'
        } else if(row.status===1) {
          return '认领中'
        } else if(row.status===2) {
          return '已认领'
        }
      }
      

    },
    returnFormat(row) {
      if(this.navActive === 1) {
        if(!row.return_id) {
          return '暂无'
        } else {
          return row.return_id
        }
      } else if(this.navActive === 2) {
        if(!row.claim_id) {
          return '暂无'
        } else {
          return row.claim_id
        }
      }

    },
    changeToLost() {
      this.navActive = 1
      this.listLoading = true
      this.initSearchData()
      this.getLostList()
    },
    changeToPick() {
      this.navActive = 2
      this.listLoading = true
      this.initSearchData()
      this.getPickList()
    },
    initSearchData() {
      this.searchData = {
        pageSize: 10,
        pageNum: 1,
        searchText: '',
        itemClass: null
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

.itemMan-container {
  border-radius: 4px;
  padding: 0 10px;
  display: flex;
  flex-flow: column;
}

.top {
  height: 60px;
  margin-bottom: 15px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    .search-btn {
      margin-left: 20px;
      height: 40px;
    }
  }

  .right {
    display: flex;
    font-size: 18px;
    color: #6a6a6a;
    align-items: flex-end;

    .nav-btn {
      margin-left: 20px;
      cursor: pointer;
    }

    .nav-btn-active {
      font-size: 20px;
      color: #0066ff;
    }
  }
    }
</style>

