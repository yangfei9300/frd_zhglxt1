<template>
  <div class="dashboard-editor-container">
    <panel-group :popData="popData"  />
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

import {
moneytotalrecruit,
typeexhibitorrecruit,
regionexhibitorrecruit,
areaboothrecruit
} from "@/api/tool/data";


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    // actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      popData:{
        'totalAd':0,
        'totalBooth':0,
        'areaBiaozhan':0,
        'areaTezhuang':0
      },
      isDiquShow:false,//是否显示地区
      isQiyeTypeShow:false,

      xAxis_data:[],
      series_data:[],
      xAxis_data_t:[],
      series_data_t:[]
    }
  },
  created() {
    this.getData1();
    // this.getDaya2();
    // this.getDaya3();
    // this.getDaya4();
  },
  methods: {

    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 获取招商金额统计
    getData1(){
      var data={

      }
      moneytotalrecruit(data).then(response => {
          console.log("请求内容1",response)
          if(response.code==200&&response.data){
            this.popData.totalAd=response.data.params.totalAd
            this.popData.totalBooth=response.data.params.totalBooth
          }
          this.getDaya4();
      });
    },

    // 统计展位面积
    getDaya4(){
        var data={
        }
        areaboothrecruit(data).then(response => {
            if(response.code==200&&response.data){
              this.popData.areaBiaozhan=response.data.params.areaBiaozhan
              this.popData.areaTezhuang=response.data.params.areaTezhuang
            }
            this.getDaya2();
        });
    },

    // 统计企业招商类别分类
    getDaya2(){
      var data={
      }
      typeexhibitorrecruit(data).then(response => {
          console.log("请求内容2",response)
          var data=response.data;
          var xAxis_data=[];
          var series_data=[];
          for(var a=0;a<data.length;a++){
            xAxis_data.push(data[a].categoryName);
            series_data.push(data[a].params.total);
          }
          console.log("数据之后",xAxis_data,series_data);
          this.xAxis_data_t=xAxis_data;
          this.series_data_t=series_data;
          this.isQiyeTypeShow=true;
          this.getDaya3()
      });
    },
    // 参展企业地区统计
    getDaya3(){
      var data={

      }
      regionexhibitorrecruit(data).then(response => {
          console.log("请求内容3",response)
          var data=response.data;
          var xAxis_data=[];
          var series_data=[];
          for(var a=0;a<data.length;a++){
            xAxis_data.push(data[a].params.area);
            series_data.push(data[a].params.total);
          }

          this.xAxis_data=xAxis_data;
          this.series_data=series_data;
          this.isDiquShow=true;
      });

    },



  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
