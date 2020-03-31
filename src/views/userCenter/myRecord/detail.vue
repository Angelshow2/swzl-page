<template>
  <div class="detail-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="4vh">

      <img :src="URL + formData.img_url" class="lost-img">
      <div class="content">
        <div class="title">
          <label class="label-class">物品标题：</label>
          <div>{{ formData.title }}</div>
        </div>
        <div class="desc">
          <label class="label-class">物品描述：</label>
          <div>{{ formData.desc }}</div>
        </div>
        <div class="contcat">
          <label class="label-class">联系方式：</label>
          <div>{{ formData.contcat }}</div>
          <!-- <div>************</div> -->
        </div>
        <div class="site">
          <label class="label-class">{{ text }}地点：</label>
          <div>{{ formData.site }}</div>
        </div>
        <div class="lost-time">
          <label class="label-class">{{ text }}时间：</label>
          <div>{{ formData.occur_time }}</div>
        </div>
        <div class="publish-time">
          <label class="label-class">发布时间：</label>
          <div>{{ formData.publish_time | timeFormat }}</div>
        </div>
        <div class="btn-group">
          <el-button class="return-btn" type="primary" disabled>{{ btnText }}</el-button>
          <el-button class="return-btn" v-if="btnTexttt" @click="cancelOperation">{{ btnTexttt }}</el-button>
          <el-button class="return-btn" v-if="btnTextt" @click="succeedOperation">{{ btnTextt }}</el-button>
        </div>
      </div>



    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import { cancelReturn, cancelClaim, returnSucceed, claimSucceed } from '@/api/myRecord/index'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      dialogVisible: false,
      formData: {},
      btnText: '',
      btnTextt: '',
      btnTexttt: '',
      title: '失物详情',
      text: '丢失',
      URL: ''
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    cancelOperation() {
      if(this.text === '丢失') {
        cancelReturn({
          account_id: this.$store.state.user.accountid,
          id: this.formData.id
        })
        .then(res => {
          console.log(res)
          Message({
            message: '取消归还成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.success()
        })
      } else if(this.text === '拾取') {
        cancelClaim({
          account_id: this.$store.state.user.accountid,
          id: this.formData.id
        })
        .then(res => {
          console.log(res)
          Message({
            message: '取消认领成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.success()
        })
      }
    },
    succeedOperation() {
      if(this.text === '丢失') {
        returnSucceed({
          account_id: this.$store.state.user.accountid,
          id: this.formData.id
        })
        .then(res => {
          console.log(res)
          Message({
            message: '归还成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.success()
        })
      } else if(this.text === '拾取') {
        claimSucceed({
          account_id: this.$store.state.user.accountid,
          id: this.formData.id
        })
        .then(res => {
          console.log(res)
          Message({
            message: '认领成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.success()
        })
      }
    },
    success() {
      this.dialogVisible = false
      this.$emit('update-list')
    }
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