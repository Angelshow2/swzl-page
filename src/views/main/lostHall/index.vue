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
      </div>
      <div class="right">
        <el-button @click="searchList" icon="el-icon-search" type="primary">搜索</el-button>
        <el-button @click="publishLost" icon="el-icon-circle-plus-outline" type="primary">发布失物</el-button>
      </div>
    </div>
    <div v-loading="listLoading" class="lost-list">
      <div v-for="(item, index) in lostList" :key="index" @click="getDetail(item)" class="lost-item">
        <div class="item-img-container">
          <img class="item-img" :src="URL + item.img_url">
        </div>
        <div class="detail">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.itemdesc }}</div>
        </div>
      </div>
    </div>

    <div v-if="!lostList.length" class="no-data">
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

    <Edit v-if="editFlag" @destory="destoryEdit" @update-list="updateList" ref="editData" />
    <Detail @update-list="updateList" ref="detailData" />

  </div>
</template>

<script>

import { getLostList, getItemClass } from '@/api/lostHall/index'
import Edit from './edit'
import Detail from './detail'

export default {
  components: {
    Edit,
    Detail
  },
  data() {
    return {
      options: [],
      lostList: [],
      listLoading: false,
      totalPage: null,
      searchData: {
        pageSize: 9,
        pageNum: 1,
        searchText: '',
        itemClass: null
      },
      URL: '',
      editFlag: false
    }
  },
  created() {
    this.listLoading = true
    this.getLostList()
    this.getItemClass()
    this.URL = window.location.origin
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listLoading = true
      this.getLostList(this.searchData)
    },
    getLostList() {
      getLostList(this.searchData)
        .then(res => {
          if(this.searchData.pageNum > res.data.totalPage && res.data.totalPage !== 0) {
            this.searchData.pageNum = res.data.totalPage
            getLostList(this.searchData)
              .then(res => {
                this.totalPage = res.data.totalPage
                this.lostList = res.data.list
                this.listLoading = false
              })
          } else {
            this.totalPage = res.data.totalPage
            this.lostList = res.data.list
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
    publishLost() {
      this.editFlag = true
      this.$nextTick(() => {
        this.$refs.editData.dialogVisible = true
        this.$refs.editData.URL = this.URL
      })
      
    },
    updateList() {
      this.searchData = {
        pageSize: 9,
        pageNum: 1,
        searchText: '',
        itemClass: null
      }
      this.listLoading = true
      this.getLostList()
    },
    searchList() {
      this.listLoading = true
      this.getLostList()
    },
    getDetail(item) {
      console.log(item)
      let btnText = ''
      if(item.status === 0){
        btnText = '归还'
      } else if (item.status === 1) {
        btnText = '归还中'
      }
      this.$refs.detailData.dialogVisible = true
      this.$refs.detailData.lostData = item
      this.$refs.detailData.btnText = btnText
      this.$refs.detailData.URL = this.URL
    },
    destoryEdit() {
      this.editFlag = false
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
        display: flex;
        align-items: center;
        padding: 0 25px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);

        .item-img-container {
          width: 130px;
          height: 130px;
          display: flex;
          justify-content: center;
          align-items: center;

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