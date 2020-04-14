<template>
  <div class="mypublish-container">
    <div class="title">
      <div @click="changeToLost" :class="[ navActive===1?'nav-active':'', 'nav']">我的归还</div>
      <div @click="changeToPick" :class="[ navActive===2?'nav-active':'', 'nav']">我的认领</div>
    </div>

    <div class="list" v-loading="listLoading">
      <div @click="itemDetail(i)" v-for="i in list" :key="i.id" class="item">
        <div class="item-img-container">
          <img class="item-img" :src="URL + i.img_url">
        </div>  
        <div class="item-content">
          <div class="item-title">{{ i.title }}</div>
          <div class="item-desc">{{ i.itemdesc }}</div>
        </div>
        <!-- <div @click.stop="deleteItem(i.id, i.status)" class="el-icon-close delete-btn"></div> -->
      </div>
    </div>

    <div v-if="!list.length" class="no-data">
      暂无数据
    </div>

     <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :page-count="totalPage"
      background
      style="text-align: right; margin-top: 8px;">
    </el-pagination>

    <Detail @update-list="updateList" ref="detailData" />
    
  </div>
</template>

<script>

import { getUserClaim, getUserReturn } from '@/api/myRecord/index';
import Detail from './detail'

export default {
  components: {
    Detail
  },
  data() {
    return {
      navActive: 1,
      list: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 6,
      totalPage: null,
      URL: ''
    }
  },
  created() {
    this.getUserReturn()
    this.URL = window.location.origin
  },
  methods: {
    changeToLost() {
      this.navActive = 1
      this.list = []
      this.pageNum = 1
      this.listLoading = true
      this.getUserReturn()
    },
    changeToPick() {
      this.navActive = 2
      this.list = []
      this.pageNum = 1
      this.listLoading = true
      this.getUserClaim()
    },
    getUserClaim() {
      getUserClaim({
        account_id: this.$store.state.user.accountid,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          console.log(res)
          this.totalPage = res.data.totalPage
          this.list = res.data.list
          this.listLoading = false
        })
    },
    getUserReturn() {
      getUserReturn({
        account_id: this.$store.state.user.accountid,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          console.log(res)
          this.totalPage = res.data.totalPage
          this.list = res.data.list
          this.listLoading = false
        })
    },
    itemDetail(item) {
      this.$refs.detailData.dialogVisible = true
      this.$refs.detailData.URL = this.URL
      this.$refs.detailData.btnTextt = ''
      this.$refs.detailData.btnTexttt = ''
      this.$refs.detailData.formData = JSON.parse(JSON.stringify(item))
      if(this.navActive === 1) {
        this.$refs.detailData.title = '失物详情'
        this.$refs.detailData.text = '丢失'
        if(item.status === 1) {
          this.$refs.detailData.btnText = '归还中'
          this.$refs.detailData.btnTextt = '已归还失主'
          this.$refs.detailData.btnTexttt = '取消归还'
        } else if(item.status === 2) {
          this.$refs.detailData.btnText = '已归还'
        }
        
      } else if(this.navActive === 2) {
        this.$refs.detailData.title = '拾物详情'
        this.$refs.detailData.text = '拾取'
        if(item.status === 1) {
          this.$refs.detailData.btnText = '认领中'
          this.$refs.detailData.btnTextt = '已取到失物'
          this.$refs.detailData.btnTexttt = '取消认领'
        } else if(item.status === 2) {
          this.$refs.detailData.btnText = '已认领'
        }
      }
    },
    handleCurrentChange() {
      this.listLoading = true
      if(this.navActive === 1) {
        this.getUserReturn()
      } else if(this.navActive === 2) {
        this.getUserClaim()
      }
    },
    updateList() {
      this.listLoading = true
      if(this.navActive === 1) {
        this.getUserReturn()
      } else if(this.navActive === 2) {
        this.getUserClaim()
      }
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .mypublish-container {
    // background-color: #fff;
    height: 768px;
    border-radius: 4px;
    padding: 20px 40px;
    // box-shadow: 0 2px 15px 0 rgba(0,0,0,0.08);

    .title {
      font-size: 20px;
      color: #6a6a6a;
      line-height: 65px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;

      .nav {
        margin: 0 20px;
        cursor: pointer;
      }

      .nav-active{
        color: #0066ff;
        font-size: 24px;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      color: #606266;
      min-height: 550px;
      align-content: flex-start;

      .item {
        width: 49%;
        height: 150px;
        margin: 0 0.5%;
        margin-bottom: 1%;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;
        padding: 20px;
        display: flex;
        align-items: center;
        position: relative;
        box-shadow: 0 2px 15px 0 rgba(0,0,0,0.08);

        .item-img-container {
          width: 100px;
          height: 100px;
          margin-right: 40px;
          display: flex;
          justify-content: center;
          align-items: center;

          .item-img {
            max-width: 100px;
            max-height: 100px;
          }
        }

        .item-content {
          flex: 1;
          max-width: 65%;

          .item-title {
            line-height: 30px;
            max-width: 345px;
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .item-desc {
            padding-top: 5px;
            height: 78px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 4;
          }
        }

        .delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
        }
      }

      .item:hover {
        background-color: #f3f3f3;
        transition: all 0.3s ease;
      }


    }

    .no-data {
      width: 93%;
      height: 550px;
      background-color: #fff;
      text-align: center;
      line-height: 550px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      color: #6a6a6a;
      position: absolute;
      top: 95px;
    }

    
  }

  
</style>