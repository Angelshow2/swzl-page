<template>
  <div class="detail-container">
    <el-dialog
      title="拾物详情"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="4vh">

      <img :src="URL + pickData.img_url" class="pick-img">
      <div class="content">
        <div class="title">
          <label class="label-class">物品标题：</label>
          <div>{{ pickData.title }}</div>
        </div>
        <div class="desc">
          <label class="label-class">物品描述：</label>
          <div>{{ pickData.desc }}</div>
        </div>
        <div class="contcat">
          <label class="label-class">联系方式：</label>
          <!-- <div>{{ pickData.contcat }}</div> -->
          <div>************</div>
        </div>
        <div class="site">
          <label class="label-class">拾取地点：</label>
          <div>{{ pickData.site }}</div>
        </div>
        <div class="pick-time">
          <label class="label-class">拾取时间：</label>
          <div>{{ pickData.occur_time }}</div>
        </div>
        <div class="publish-time">
          <label class="label-class">发布时间：</label>
          <div>{{ pickData.publish_time | timeFormat }}</div>
        </div>
        <div class="btn-group">
          <el-button @click="claimItem" class="return-btn" type="primary" :disabled="pickData.status===1">{{ btnText }}</el-button>
        </div>
      </div>



    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import { claimItem } from '@/api/pickHall/index'

export default {
  data() {
    return {
      dialogVisible: false,
      pickData: {},
      btnText: ''
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    claimItem() {
      this.$confirm('确认认领？确认后可在我的认领模块查看对方联系方式，联系拾主认领时请确认物品是否属于你，以防认领错误！')
        .then(_ => {
          this.dialogVisible = false
          claimItem({
            id: this.pickData.id,
            accountid: this.$store.state.user.accountid
          })
            .then(res =>{
              console.log(res)
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
    
    .pick-img {
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

      .pick-time {
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