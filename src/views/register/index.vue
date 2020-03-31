<template>

  <div class="register-container">

    <div class="register-form">
      <div class="title">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
      <div class="form">
        <input type="text" v-model="formData.account_id" placeholder="请输入账号(6-18位字母或数字)">
        <input type="password" v-model="formData.password" placeholder="请输入密码(6-18位字母或数字)">
        <el-select v-model="formData.user_depart" placeholder="请选择" @change="departChange">
          <el-option
            v-for="item in departList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="formData.user_major" placeholder="请选择">
          <el-option
            v-for="item in majorList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" v-model="formData.user_class" placeholder="请输入班级">
        <input type="text" v-model="formData.user_name" placeholder="请输入姓名">
        <input type="text" v-model="formData.user_id" placeholder="请输入学号">
        <div class="tip">
          <div class="forget"></div>
          <div class="register">已有账号?去 <router-link to="/login" style="color:#04599a;">登录</router-link></div>
        </div>
      </div>
      <div class="register-btn" @click="handleRegister">注册</div>
    </div>

  </div>


</template>

<script>

import { getDepartList, getMajorList, register } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        account_id: null,
        password: null,
        user_depart: null,
        user_major: null,
        user_class: null,
        user_name: null,
        user_id: null,
      },
      departList: [],
      majorList: []
    }
  },
  created() {
    this.getDepartList()
  },
  methods: {
    handleRegister() {
      let pattern = /^[a-zA-Z0-9]{6,18}$/;
      if(!this.formData.account_id) {
        return Message({
          message: '账号不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if(!pattern.test(this.formData.account_id)) {
        return Message({
          message: '请输入由6-18位字母或数字组成的账号！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if(!pattern.test(this.formData.password)) {
        return Message({
          message: '请输入由6-18位字母或数字组成的密码！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.password) {
        return Message({
          message: '密码不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.user_depart) {
        return Message({
          message: '学院不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.user_major) {
        return Message({
          message: '专业不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.user_class) {
        return Message({
          message: '班级不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.user_name) {
        return Message({
          message: '姓名不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (!this.formData.user_id) {
        return Message({
          message: '学号不能为空！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      register(this.formData)
        .then(res => {
          console.log(res)
          if(res.code === 200) {
            Message({
              message: '注册成功!',
              type: 'success',
              duration: 2 * 1000
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          } else {
            this.formData.password = ''
          }
        })
        .catch(err => {
          this.formData.password = null
        })

    },
    getDepartList() {
      getDepartList()
        .then(res => {
          console.log(res)
          this.departList = res.data
        })
    },
    getMajorList() {
      getMajorList({ value: this.formData.user_depart })
        .then(res => {
          console.log(res)
          this.majorList = res.data
        })
    },
    departChange() {
      this.formData.user_major = null
      this.getMajorList()
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

  .register-container {
    width: 100%;
    height: 100%;
    background-image: url("./login_bg.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .register-form {
      width: 390px;
      height: 600px;
      border-radius: 8px;
      padding: 50px 60px;
      background-color: rgba(255,255,255,0.5);

      .title {
        text-align: center;
        font-size: 30px;
        color: #fff;
        margin-bottom: 40px;
      }

      .form {
        text-align: center;

        input {
          width: 260px;
          height: 35px;
          margin-bottom: 15px;
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

      .register-btn {
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
  }

  .register-container .el-input__inner {
    width: 260px;
    height: 35px;
    border: none;
    background-color: transparent;
    padding: 0;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
  }

</style>

