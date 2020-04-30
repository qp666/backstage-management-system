<template>
  <div class="subject">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item class="number" label="学科编号">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item class="name" label="学科名称">
          <el-input
            class="name"
            v-model="formInline.user"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item class="number" label="创建者">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item class="status" label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" plain @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="150" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import api from "@/utils/request.js";

export default {
  name: "subject",

  props: {},
  //数据
  data() {
    return {
      page: 1, //当前页
      size: 5, //页容量
      total: 0, //数据总数量
      tableData: [], //表格数据
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: "",
      },
    };
  },
  //方法
  methods: {
    post_subject() {
      api
        .subject_list({
          page: this.page,
          limit: this.size,
          ...this.formInline, //解构语法
          // rid: this.formInline.rid,
          // name: this.formInline.name,
          // username: this.formInline.username,
          // status: this.formInline.status
        })
        .then((res) => {
          console.log("表格数据:", res);

          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        });
    },
    //页容量变化事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val; //页容量赋值
      this.page = 1; //页码回到第一页
      this.post_subject();
    },

    //页码变化事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.post_subject();
    },

    handleClick(row) {
      console.log(row);
    },
    onSubmit() {
      console.log("123");
    },
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    this.post_subject();
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {},
};
</script>

<style lang="less">
.subject {
  .top-card {
    padding-top: 10px;
    margin-bottom: 30px;
    .el-form-item.number {
      .el-form-item__content {
        width: 150px;
      }
    }
    .el-form-item.status {
      .el-form-item__content {
        width: 200px;
      }
    }
    .el-form-item.name {
      // width: 400px;
      .el-form-item__content {
        width: 300px;
      }
    }
  }

  .bottom-card {
    .el-pagination.is-background {
      text-align: center;
      margin-top: 23px;
    }
  }
}
</style>
