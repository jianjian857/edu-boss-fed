<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline"
          ref="form">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="资源分类" clearable>
              <!-- 请求接口进行下拉菜单单项设置 -->
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                clearable
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onReset"
            >重置</el-button>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="isLoading"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使用 Table 组件 -->
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          type="index"
          label="编号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 设置过滤器需要使用作用域插槽数据 -->
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.createdTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
            >删除</el-button>
          </template>
          </el-table-column>
      </el-table>
      <!-- 分页组件结构 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 30]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages, getResourceCategories } from '@/services/resource'
export default {
  name: 'ResourceList',
  data () {
    return {
      // 用于存储资源列表数据
      resources: [],
      form: {
        // 当前显示的页号
        current: 1,
        // 每页显示的数据条数
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类 ID
        categoryId: ''
      },
      // 数据总数
      totalCount: 0,
      // 存储资源分类信息
      resourceCategories: [],
      isLoading: false
    }
  },
  created () {
    // 加载资源数据
    this.loadResources()
    // 加载资源列表
    this.loadResourceCategories()
  },
  methods: {
    // 重置按钮点击操作
    onReset () {
      this.$refs.form.resetFields()
    },
    // 提交筛选功能
    onSubmit () {
      // 请求数据前，将请求的页数更新为 1
      this.form.current = 1
      this.loadResources()
    },
    // 加载资源列表
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    // 页号改变触发
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResources()
    },
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    handleEdit () {

    },
    handleDelete () {

    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
