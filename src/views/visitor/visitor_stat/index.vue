<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px" :rules="rules">

      <el-form-item label="开始时间" label-width="200" prop="sTime">
        <el-date-picker v-model="queryParams.sTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
          placeholder="请选择开始时间" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="结束时间" label-width="200" prop="eTime">
        <el-date-picker v-model="queryParams.eTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
          placeholder="请选择结束时间" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button icon="el-icon-refresh" type="success" size="mini" @click="exportDaochang">导出到场观众信息</el-button>
        <el-button icon="el-icon-refresh" type="warning" size="mini" @click="logVerificationexport">导出展会核销记录列表</el-button>
      </el-form-item>
    </el-form>

    <div class="colonn center_center">
      <div style="height: 50px;"></div>
      <div class="colonn" style="line-height:25px;">
        {{selExhInfo.exhName}}现场门禁扫描报告如下：<br />
        微信预登记：{{totalNum.preEnroll}}<br />
        微信现场登记：{{totalNum.sceneEnroll}}<br />
        共计：{{totalNum.heji}}<br /><br />

        现场入场人次：{{totalNum.arriveVisitorNum}}<br />
        现场入场人数：{{totalNum.totalEnroll}}<br />
        <br />
        双展到场观众人数：{{totalNum.arriveTwoExhVisitorNum}}<br />
        总人数：{{totalNum.arriveTotal}}<br/>
      </div>
    </div>


  </div>
</template>

<script>
  import {
    enrollNumstatvisitor,
    arriveVisitorexportstat,
    logVerificationexport
  } from "@/api/visitor/visitor_group";


  export default {
    name: "Questionnaire_answer",
    dicts: ['zlf_status'],
    data() {
      return {
        queryParams: {
          'exhId': "",
          'sDate': "",
          'sTime': '',
          'eTime': '',
          'params': {}
        },
        showSearch: false,
        selExhInfo: null, //选择的当前展会

        rules: {
          sTime: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }, ],
          eTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }, ],
        },

        totalNum: {
          'preEnroll': 0,
          'sceneEnroll': 0,
          'heji': 0,
          'arriveVisitorNum': 0,
          'totalEnroll': 0
        }, //展会查询人数结果

      };
    },
    created() {

    },
    mounted() {
      var selExhInfo = this.$ls.get("selExhInfo");
      if (selExhInfo) {
        this.selExhInfo = selExhInfo;
        this.queryParams.sTime = selExhInfo.startTime
        this.queryParams.eTime = selExhInfo.endTime
        this.handleQuery()
        console.log("选择的展会", selExhInfo)
      }
    },
    methods: {
      // .导出展会核销记录列表
      logVerificationexport(){
        if (!this.selExhInfo) {
          this.$alert('请先选择展会', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
          return false;
        }
        this.$refs["queryForm"].validate(valid => {
          console.log("asdvalid-", valid)
          if (valid) {
            var queryParams = this.queryParams;
            queryParams.params = {
              'sDate': this.selExhInfo.startTime,
              'sTime': queryParams.sTime,
              'eTime': queryParams.eTime,
            }
            console.log('queryParams',queryParams)
            this.download('api/visitor/stat/export/logVerification', {
              ...queryParams
            }, `visitor_group_${new Date().getTime()}.xlsx`)


          }
        })
      },
      // 导出到场观众信息
      exportDaochang() {
        if (!this.selExhInfo) {
          this.$alert('请先选择展会', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
          return false;
        }


        this.$refs["queryForm"].validate(valid => {
          console.log("asdvalid-", valid)
          if (valid) {
            var queryParams = this.queryParams;
            queryParams.params = {
              'sDate': this.selExhInfo.startTime,
              'sTime': queryParams.sTime,
              'eTime': queryParams.eTime,
            }

            console.log('queryParams',queryParams)
            this.download('api/visitor/stat/export/arriveVisitor', {
              ...queryParams
            }, `visitor_group_${new Date().getTime()}.xlsx`)


          }
        })
      },
      // 查询人数
      handleQuery() {
        if (!this.selExhInfo) {
          this.$alert('请先选择展会', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
          return false;
        }


        this.$refs["queryForm"].validate(valid => {
          console.log("asdvalid-", valid)
          if (valid) {
            var queryParams = this.queryParams;
            queryParams.params = {
              'sDate': this.selExhInfo.startTime,
              'sTime': queryParams.sTime,
              'eTime': queryParams.eTime,
            }
            enrollNumstatvisitor(queryParams).then(response => {
              console.log("查询结果", response);
              if (response.code == 200 && response.data) {
                var totalNum = response.data;
                this.totalNum = totalNum;
                this.totalNum.heji = parseInt(totalNum.preEnroll) + parseInt(totalNum.sceneEnroll)
              } else {
                this.$message.error(response.msg);
                this.totalNum= {
                  'preEnroll': 0,
                  'sceneEnroll': 0,
                  'heji': 0,
                  'arriveVisitorNum': 0,
                  'totalEnroll': 0
                }; //展会查询人数结果
              }
            });
          }
        });




        var queryParams = this.queryParams;
        queryParams.params = {


        }
      },
      resetQuery() {

      },
      handleAdd() {

      },
      getList() {

      },
    }
  };
</script>
