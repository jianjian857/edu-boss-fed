<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header></app-header>
        </el-header>
        <el-main>
          <!-- 设置子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入侧边栏组件
import AppAside from './components/AppAside.vue'
// 引入头部组件
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang='scss' scoped>
  .el-container {
    height: 100vh;
    min-width: 980px;
  }

  .el-aside {
    background-color: red;
  }

  .el-main {
    background-color: skyblue;
  }

  .el-header {
    background-color: #fff;
  }
  </style>
