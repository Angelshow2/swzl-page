<template>
  <div class="navbar">
    <div class="navbar-left">
      <img class="navbar-img" src="./logo.png" >
      <div class="navbar-time">{{ currentTime }}</div>
    </div>
    <div class="navbar-right">
      <div>欢迎您，{{ username }}</div>
      <div class="loginout" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from "@/utils/index"

export default {
  created() {
    sessionStorage.setItem("name",this.username);
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/resetToken')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  computed: {
    currentTime() {
      return parseTime(new Date(),'{y}年{m}月{d}日 星期{a}')
    },
    username() {
      return this.$store.getters.name
    },
    accountid() {
      return this.$store.getters.accountid
    }
  },
}
</script>

<style lang="scss" scoped>

  .navbar {
    width: 100%;
    // min-width: 1407px;
    min-width: 1238px;
    height: 77px;
    background-color: #fff;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 44px;
    
    .navbar-left{
      width: 560px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .navbar-img {
        width: 380px;
        height: 80px;
      }

      .navbar-time {
        width: 173px;
        height: 18px;
        color: rgba(114, 114, 114, 1);
        font-size: 16px;
      }
    }

    .navbar-right {
      width: 166px;
      font-size: 16px;
      color: rgba(114, 114, 114, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;

      .loginout {
        color: rgba(0, 99, 255, 1);
        cursor: pointer;
        text-decoration: underline;
      }
    }

    
  }



</style>
