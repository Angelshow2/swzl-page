<template>
  <div class="baseinfo-container">
    <div class="title">基本信息</div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">个人账号:  </label>
      <div>{{ userInfo. account_id}}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">账号状态:  </label>
      <div>{{ userInfo. status_name}}</div>
    </div>
    <div class="item">
      <label style="margin-right: 10px;min-width: 75px;">用户身份:  </label>
      <div>{{ userInfo. auth_name}}</div>
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
    <div class="update-pwd" @click="toUpdatePwd">
      修改密码
    </div>


    <div class="update-pwd-container" v-if="pwdFlag">
      <div class="pwd-title">修改密码</div>
      <div class="pwd-item">
        <div class="pwd-item-tit">旧密码</div>
        <el-input type="password" v-model="oldPassword" style="width: 60%;" placeholder="请输入旧密码"></el-input>
      </div>
      <div class="pwd-item">
        <div class="pwd-item-tit">新密码</div>
        <el-input type="password" v-model="newPassword" style="width: 60%;" placeholder="请输入新密码"></el-input>
      </div>
      <div class="pwd-item">
        <div class="pwd-item-tit">新密码</div>
        <el-input type="password" v-model="againPassword" style="width: 60%;" placeholder="请再次输入密码"></el-input>
      </div>
      <div class="pwd-btn-group">
        <div class="pwd-btn pwd-btn-cancel" @click="canccelPwd">取消</div>
        <div class="pwd-btn pwd-btn-confirm" @click="surePwd">确认</div>
      </div>
    </div>

    <div class="shade" v-if="pwdFlag"></div>

  </div>
</template>

<script>

import { getUserInfo, resetPwd } from '@/api/user'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      userInfo: {},
      pwdFlag: false,
      oldPassword: '',
      newPassword: '',
      againPassword: ''
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
    },
    toUpdatePwd() {
      this.pwdFlag = true

    },
    canccelPwd() {
      this.pwdFlag = false

    },
    surePwd() {
      if(!this.oldPassword) {
        return Message({
          message: '旧密码不能为空!',
          type: 'error',
          duration: 2 * 1000
        })
      }
      if(!this.newPassword) {
        return Message({
          message: '新密码不能为空!',
          type: 'error',
          duration: 2 * 1000
        })
      }
      if(!this.againPassword) {
        return Message({
          message: '请再次输入密码!',
          type: 'error',
          duration: 2 * 1000
        })
      }
      if(this.newPassword !== this.againPassword) {
        return Message({
          message: '两次密码输入不一致!',
          type: 'error',
          duration: 2 * 1000
        })
      }
      resetPwd({
        account_id: this.$store.state.user.accountid,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        againPassword: this.againPassword
      })
        .then(res => {
          console.log(res)
          Message({
            message: '修改成功!请重新登录!',
            type: 'success',
            duration: 2 * 1000
          })
          this.$store.dispatch('user/resetToken')
            .then(() => {
              this.$router.push('/login')
            })
          this.pwdFlag = false
        })
      
    },
  },
}
</script>

<style lang="scss" scoped>
  .baseinfo-container {
    width: 99%;
    height: 99%;
    background-color: #fff;
    // height: 768px;
    border-radius: 4px;
    padding: 20px 40px;
    position: relative;
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

    .update-pwd {
      text-align: center;
      color:#0066ff;
      cursor: pointer;
      text-decoration: underline;
    }

    .update-pwd-container {
      width: 500px;
      height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -250px;
      margin-top: -250px;
      background-color: #fff;
      z-index: 10;
      padding: 30px;

      .pwd-title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 70px;
      }

      .pwd-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 35px;

        .pwd-item-tit {
          min-width: 60px;
        }
      }

      .pwd-btn-group {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: auto;
        margin-top: 90px;

        .pwd-btn {
          width: 75px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: 3px;
          cursor: pointer;
        }

        .pwd-btn-cancel {
          border: 1px solid #e5e5e5;
        }

        .pwd-btn-confirm {
          background-color: #409EFF;
          color: #fff;
        }
      }
    }

    .shade {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 8;
      background-color: rgba(0,0,0,0.6);
    }


  }

  
</style>