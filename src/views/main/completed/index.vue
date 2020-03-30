<template>
  <div class="losthall-container">
    <div class="top">
      <div class="left">
        <el-select style="width: 150px; margin-right: 20px;" clearable v-model="searchData.itemClass" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 250px" v-model="searchData.searchText" placeholder="请输入内容"></el-input>
        <el-button class="search-btn" @click="searchList" icon="el-icon-search" type="primary">搜索</el-button>
      </div>
      <div class="right">
        <div @click="changeToClaim" :class="[navActive===1?'nav-btn-active':'','nav-btn']">已认领</div>
        <div @click="changeToReturn" :class="[navActive===2?'nav-btn-active':'','nav-btn']">已归还</div>
      </div>
    </div>
    <div v-loading="listLoading" class="lost-list">
      <div v-for="(item, index) in List" :key="index" @click="getDetail(item)" class="lost-item">
        <div class="item-img-container">
          <img class="item-img" :src="URL + item.img_url">
        </div>
        <div class="detail">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div v-if="!List.length" class="no-data">
      暂无数据
    </div>

     <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="searchData.pageNum"
      :page-size="searchData.pageSize"
      layout="total, prev, pager, next, jumper"
      :page-count="totalPage"
      background
      style="text-align: right; margin-top: 8px;">
    </el-pagination>

    <Detail ref="detailData" />

  </div>
</template>

<script>

import { getReturnList, getClaimList, getItemClass } from '@/api/completed/index'
import Detail from './detail'

export default {
  components: {
    Detail
  },
  data() {
    return {
      options: [],
      List: [],
      listLoading: false,
      totalPage: null,
      searchData: {
        pageSize: 9,
        pageNum: 1,
        searchText: '',
        itemClass: null
      },
      navActive: 1,
      URL: ''
    }
  },
  created() {
    this.listLoading = true
    this.getClaimList()
    this.getItemClass()
    this.URL = window.location.origin
    // console.log(window.location.origin)
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listLoading = true
      this.getLostList(this.searchData)
    },
    getReturnList() {
      getReturnList(this.searchData)
      .then(res => {
        if(this.searchData.pageNum > res.data.totalPage && res.data.totalPage !== 0) {
          this.searchData.pageNum = res.data.totalPage
          getReturnList(this.searchData)
            .then(res => {
              this.totalPage = res.data.totalPage
              this.List = res.data.list
              this.listLoading = false
            })
        } else {
          this.totalPage = res.data.totalPage
          this.List = res.data.list
          this.listLoading = false
        } 
      })
    },
    getClaimList() {
      getClaimList(this.searchData)
      .then(res => {
        if(this.searchData.pageNum > res.data.totalPage && res.data.totalPage !== 0) {
          this.searchData.pageNum = res.data.totalPage
          getClaimList(this.searchData)
            .then(res => {
              this.totalPage = res.data.totalPage
              this.List = res.data.list
              this.listLoading = false
            })
        } else {
          this.totalPage = res.data.totalPage
          this.List = res.data.list
          this.listLoading = false
        } 
      })
    },
    getItemClass() {
      getItemClass()
        .then(res => {
          console.log(res.data)
          this.options = res.data
        })
    },
    searchList() {
      this.listLoading = true
      if(this.navActive === 1) {
        this.getClaimList()
      } else if(this.navActive === 2) {
        this.getReturnList()
      }
    },
    getDetail(item) {
      console.log(item)
      let btnText = ''
      if(this.navActive === 1){
        btnText = '已认领'
      } else if (this.navActive === 2) {
        btnText = '已归还'
      }
      this.$refs.detailData.dialogVisible = true
      this.$refs.detailData.lostData = item
      this.$refs.detailData.btnText = btnText
      this.$refs.detailData.navActive = this.navActive
      this.$refs.detailData.URL = this.URL
    },
    changeToClaim() {
      this.list = []
      this.navActive = 1
      this.listLoading = true
      this.initSearchData()
      this.getClaimList()
    },
    changeToReturn() {
      this.list = []
      this.navActive = 2
      this.listLoading = true
      this.initSearchData()
      this.getReturnList()
    },
    initSearchData() {
      this.searchData = {
        pageSize: 9,
        pageNum: 1,
        searchText: '',
        itemClass: null
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
  .losthall-container {
    height: 100%;
    border-radius: 4px;
    padding: 0 10px;
    display: flex;
    flex-flow: column;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);

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

    .lost-list {
      display: flex;
      flex-wrap: wrap;
      align-content: start;
      min-height: 650px;

      .lost-item {
        width: 33%;
        height: 210px;
        background-color: #fff;
        margin-bottom: 5px;
        margin-right: 0.3%;
        border-radius: 3px;
        cursor: pointer;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        padding: 0 25px;

        .item-img-container {
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;

          .item-img {
            max-width: 130px;
            max-height: 130px;
            border-radius: 3px;
          }
        }

        .detail {
          flex: 1;
          // height: 150px;
          margin-left: 22px;
          color: #606266;
          font-size: 15px;

          .title {
            text-align: center;
            margin-bottom: 15px;
          }

          .desc {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            white-space: wrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      .lost-item:hover {
        background-color: #f3f3f3;
        transition: all 0.3s ease;
      }
    }
    
    .no-data {
      width: 100%;
      height: 650px;
      background-color: #fff;
      text-align: center;
      line-height: 650px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      color: #6a6a6a;
      position: absolute;
      top: 75px;
    }
  }
</style>