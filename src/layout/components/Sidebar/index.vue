<template>

    
  <el-menu
    class="sidebar"
    :default-active="activeMenu"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    mode="vertical"
  >
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
 




</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'


export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
     
      return this.$store.state.user.routes
     
      
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>
  
  .sidebar {
    min-width: 204px;
    height: auto;
    border: none;
    border-radius: 3px;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);
    margin-right: 14px;
  }

</style>

<style lang="scss">
  .el-submenu__title {
    font-size: 16px;
    padding-left: 22px !important;
  }

  .el-submenu__title:hover {
    border-radius: 5px;
    background-color: transparent !important;
    color: #4a4a4a !important;
  }

  .el-menu-item {
    font-size: 16px;
    padding-left: 51px !important;
    background-color: rgba(248, 249, 250, 1) !important;
    color: rgba(138, 138, 138, 1) !important;
  }

  .el-menu-item:hover {
    border-radius: 5px;
    background-color: rgba(0, 99, 255, 1) !important;
    color: rgba(255, 255, 255, 1) !important;
  }

  .el-menu-item.is-active {
    border-radius: 5px;
    color: rgba(255, 255, 255, 1) !important;
    background-color: rgba(0, 99, 255, 1) !important;
  }
</style>
