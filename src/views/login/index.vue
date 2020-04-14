<template>

  <div class="login-container">

    <div class="login-form">
      <div class="title">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      <div class="form">
        <input v-model="loginForm.username" type="text" placeholder="请输入用户名">
        <div style="position: relative;">
          <input :type="pwdType" v-model="loginForm.password" placeholder="请输入密码" @keydown.enter="handleLogin">
          <img :src="require('./'+isEye+'.png')" class="pass-img" @click="watchPwd">
        </div>
        <div class="tip">
          <div class="forget" @click="forget">忘记密码</div>
          <div class="register">没有账号?去 <router-link to="/register" style="color:#04599a;">注册</router-link></div>
        </div>
      </div>
      <div class="login-btn" @click="handleLogin">登录</div>
    </div>

  </div>


</template>

<script>

import { loginin } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {

    return {
      loginForm: {
        username: '',
        password: ''
      },
      redirect: undefined,
      isEye: 'beye',
      pwdType: 'password'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    isEye: function(val) {
      if(val === 'beye') {
        this.pwdType = 'password'
      } else if(val === 'eye') {
        this.pwdType = 'text'
      }
    }
  },
  methods: {
    handleLogin() {
      if(!this.loginForm.username) {
        return Message({
          message: '用户名不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.loginForm.password) {
        return Message({
          message: '密码不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    forget() {
      Message({
        message: '请联系管理员处理! 管理员微信: llj981055641 ',
        type: 'info',
        duration: 5 * 1000
      })
    },
    watchPwd() {
      if(this.isEye === 'beye') {
        this.isEye = 'eye'
      } else if(this.isEye === 'eye') {
        this.isEye = 'beye'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: rgba(255,255,255,0.4);
    font-size: 16px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255,255,255,0.4);
    font-size: 16px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: rgba(255,255,255,0.4);
    font-size: 16px;
  }   

  .login-container {
    width: 100%;
    height: 100%;
    background-image: url("./login_bg.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      width: 390px;
      height: 420px;
      border-radius: 8px;
      padding: 50px 60px;
      background-color: rgba(255,255,255,0.5);

      .title {
        text-align: center;
        font-size: 30px;
        color: #fff;
        margin-bottom: 70px;
      }

      .form {
        text-align: center;

        input {
          width: 260px;
          height: 35px;
          margin-bottom: 20px;
          color: #fff;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #fff;
          outline: none;
        }

        .tip {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 0 5px;
          color: #fff;

          .forget {
            cursor: pointer;
          }

          .register {
            // cursor: pointer;
          }
        }
      }

      .login-btn {
        width: 260px;
        height: 40px;
        margin: auto;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-top: 40px;
        cursor: pointer;
        background-color: #04599a;
        background-image: linear-gradient(to right, #0a7ba4 , #04599a);
      }
      
    }

    .pass-img {
      position: absolute;
      width: 20px;
      height: 20px;
      right: 13px;
      top: 8px;
      cursor: pointer;
    }
  }

  

</style>

