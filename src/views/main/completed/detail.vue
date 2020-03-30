<template>
  <div class="detail-container">
    <el-dialog
      title="失物详情"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="4vh">

      <img :src="URL + lostData.img_url" class="lost-img">
      <div class="content">
        <div class="title">
          <label class="label-class">物品标题：</label>
          <div>{{ lostData.title }}</div>
        </div>
        <div class="desc">
          <label class="label-class">物品描述：</label>
          <div>{{ lostData.desc }}</div>
        </div>
        <div class="contcat">
          <label class="label-class">联系方式：</label>
          <div>{{ lostData.contcat }}</div>
          <!-- <div>************</div> -->
        </div>
        <div class="site">
          <label class="label-class">{{ navActive === 1 ? '拾取地点：' : '丢失地点：' }}</label>
          <div>{{ lostData.site }}</div>
        </div>
        <div class="lost-time">
          <label class="label-class">{{ navActive === 1 ? '拾取时间：' : '丢失时间：' }}</label>
          <div>{{ navActive === 1 ? lostData.occur_time : lostData.occur_time }}</div>
        </div>
        <div class="publish-time">
          <label class="label-class">发布时间：</label>
          <div>{{ lostData.publish_time | timeFormat }}</div>
        </div>
        <div class="btn-group">
          <el-button class="return-btn" type="primary" disabled>{{ btnText }}</el-button>
        </div>
      </div>



    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'

export default {
  data() {
    return {
      dialogVisible: false,
      lostData: {},
      btnText: '',
      navActive: null
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
   
  },
  filters: {
    timeFormat(val) {
      return parseTime(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    
    .lost-img {
      display: block;
      margin: auto;
      max-width: 300px;
      max-height: 300px;
    }

    .content {
      margin-top: 30px;
      font-size: 15px;
      padding: 0 100px;
      line-height: 22px;

      .title {
        margin-bottom: 15px;
        display: flex;
      }

      .desc {
        margin-bottom: 15px;
        display: flex;
      }

      .site {
        margin-bottom: 15px;
        display: flex;
      }

      .lost-time {
        margin-bottom: 15px;
        display: flex;
      }

      .contcat {
        margin-bottom: 15px;
        display: flex;
      }

      .publish-time {
        margin-bottom: 15px;
        display: flex;
      }

      .label-class {
        min-width: 80px;
      }

      .btn-group {
        display: flex;
        justify-content: center;
        margin-top: 15px;
      }
    }
  }
</style>