<template>
  <div class="baseinfo-container">
    <div class="title">基本信息</div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">个人账号:  </label>
      <div>{{ userInfo. account_id}}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">用户姓名:  </label>
      <div>{{ userInfo.user_name }}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">用户学号:  </label>
      <div>{{ userInfo.user_id }}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属学院:  </label>
      <div>{{ userInfo.user_departname }}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属专业:  </label>
      <div>{{ userInfo.user_majorname }}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">所属班级:  </label>
      <div>{{ userInfo.user_class }}</div>
    </div>
  </div>
</template>

<script>

import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo({
        account_id: this.$store.state.user.accountid
      })
      .then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .baseinfo-container {
    background-color: #fff;
    height: 768px;
    border-radius: 4px;
    padding: 20px 40px;
    box-shadow: 0 2px 15px 0 rgba(0,0,0,0.08);

    .title {
      font-size: 20px;
      color: #0066ff;
      line-height: 65px;
      border-bottom: 1px dashed #0066ff;
      margin-bottom: 50px;
      text-align: center;
    }

    .item {
      display: flex;
      color: #4a4a4a;
      margin: auto;
      margin-bottom: 20px;
      width: 25%;
      // padding-left: 100px;
    }
  }

  
</style>