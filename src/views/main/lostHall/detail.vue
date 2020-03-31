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
          <!-- <div>{{ lostData.contcat }}</div> -->
          <div>************</div>
        </div>
        <div class="site">
          <label class="label-class">丢失地点：</label>
          <div>{{ lostData.site }}</div>
        </div>
        <div class="lost-time">
          <label class="label-class">丢失时间：</label>
          <div>{{ lostData.occur_time }}</div>
        </div>
        <div class="publish-time">
          <label class="label-class">发布时间：</label>
          <div>{{ lostData.publish_time | timeFormat }}</div>
        </div>
        <div class="btn-group">
          <el-button @click="returnItem" class="return-btn" type="primary" :disabled="lostData.status===1">{{ btnText }}</el-button>
        </div>
      </div>



    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import { returnItem } from '@/api/lostHall/index'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      dialogVisible: false,
      lostData: {},
      btnText: '',
      URL: ''
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    returnItem() {
      this.$confirm('确认归还？确认后可在我的归还模块查看对方联系方式，联系失主归还时请确认物品是否属于他(她)，以防冒领！')
        .then(_ => {
          this.dialogVisible = false
          returnItem({
            id: this.lostData.id,
            accountid: this.$store.state.user.accountid
          })
            .then(res => {
              console.log(res)
              Message({
                message: '成功!',
                type: 'success',
                duration: 2 * 1000
              })
              this.$emit('update-list')
            })
          done();
        })
        .catch(_ => {});
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