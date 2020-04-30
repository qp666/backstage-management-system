<template>
  <div class="chart">
    <el-card class="top-card">
      <div id="main" ref="main" style="width: 800px;height:400px;"></div>
      <div id="main2" ref="main2" style="width: 800px;height:400px;"></div>
    </el-card>
    <el-card class="bot-card">
      <div id="main3" ref="main3" style="width: 100%;height:520px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "chart",

  props: {},
  //数据
  data() {
    return {};
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {},
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {
    var myChart = echarts.init(this.$refs.main);

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" },
          ],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    var myChart2 = echarts.init(this.$refs.main2);
    var option2 = {
      angleAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: "bar",
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: "polar",
          name: "A",
          stack: "a",
        },
        {
          type: "bar",
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: "polar",
          name: "B",
          stack: "a",
        },
        {
          type: "bar",
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: "polar",
          name: "C",
          stack: "a",
        },
      ],
      legend: {
        show: true,
        data: ["A", "B", "C"],
      },
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);

    var myChart3 = echarts.init(this.$refs.main3);
    var option3 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
          "百度",
          "谷歌",
          "必应",
          "其他",
        ],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "bar",
          stack: "广告",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "搜索引擎",
          type: "bar",
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              type: "dashed",
            },
            data: [[{ type: "min" }, { type: "max" }]],
          },
        },
        {
          name: "百度",
          type: "bar",
          barWidth: 5,
          stack: "搜索引擎",
          data: [620, 732, 701, 734, 1090, 1130, 1120],
        },
        {
          name: "谷歌",
          type: "bar",
          stack: "搜索引擎",
          data: [120, 132, 101, 134, 290, 230, 220],
        },
        {
          name: "必应",
          type: "bar",
          stack: "搜索引擎",
          data: [60, 72, 71, 74, 190, 130, 110],
        },
        {
          name: "其他",
          type: "bar",
          stack: "搜索引擎",
          data: [62, 82, 91, 84, 109, 110, 120],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);
  },
  //侦听器
  watch: {},
  //子页面
  components: {},
};
</script>

<style lang="less">
.chart {
  .top-card {
    margin-bottom: 20px;
    .el-card__body {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
