<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:10px;">
          展商情况
        </div>
      </el-col>
    </el-row>
    <div style="padding:10px;">
      截止到目前，当前展会一共有{{zsgks.params.count}} 家展商，其中
      <span style="color: rgb(255, 165, 0);">潜在展商</span>
      {{zsgks.params.qianzai}} 家，
      <span style="color: rgb(255, 0, 0);;">预订展商</span>
      {{zsgks.params.yuding}} 家，
      <span style="color: rgb(255, 0, 255);">签约展商</span>
      {{zsgks.params.qianyue}} 家，
      <span style="color: rgb(255, 0, 255);">部分付款</span>
      {{zsgks.params.bufen}} 家，
      <span style="color: rgb(0, 0, 255);">全部付款</span>
      {{zsgks.params.quanbu}} 家，
      <span style="color:rgb(128, 128, 128);">退展展商</span>
      {{zsgks.params.tuizhan}} 家。
      <el-button type="success" size="mini" @click="getExhList(1)">查看详情</el-button>
    </div>
    <div style="padding:10px;">
      这些展商中一共提交了 {{zsgks.params.countContact}} 个联系人信息，其中有 {{zsgks.params.noContact}} 家展商尚未提交联系人信息。
      <el-button type="success" size="mini" @click="getExhList(2)">查看详情</el-button>
      <el-button type="success" size="mini" @click="getContractList(5)">展商概览</el-button>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:10px;">
          服务预定
        </div>
      </el-col>
    </el-row>

    <div style="padding:10px;">
      当前展会共设置了 {{serviceGk.params.count}} 项服务，其中 {{serviceGk.params.countService}} 项服务被预订。
      <el-button type="success" size="mini"
      @click="getServiceReserve(3)"
      >查看详情</el-button>
    </div>
    <div style="padding:10px;">
      有 {{serviceGk.params.countExhibitor}} 家展商预订了展会服务。
      <el-button type="success" size="mini"
       @click="getServiceReserve(3)"
      >查看详情</el-button>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:10px;">
          展位预定
        </div>
      </el-col>
    </el-row>

    <div style="padding:10px;" class="roww">
      当前展会分 {{zwgkInfo1.params.halls}} 个展厅共 {{zwgkInfo1.params.count}} 个展位。其中

      <div class="huanhang">
        <div v-for="(item,index) in zwgkInfo2" v-if="zwgkInfo2.length>0">
          {{item.params.boothName}}{{item.params.countPrice}}个，
        </div>
      </div>
      <!-- 标展1 495 个； 光地1 134 个； 标展2 116 个； 光地2 7 个 -->

    </div>
    <div style="padding:10px;">
      其中 {{zwgkInfo1.params.booths}} 个展位已经被 {{zwgkInfo1.params.exhibitors}} 家展商预订。
      <el-button type="success" size="mini" @click="toPage(2)">查看详情</el-button>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:10px;">
          合同情况
        </div>
      </el-col>
    </el-row>

    <div style="padding:10px;">
      目前共生成合同 {{pageInfoHt.params.count}} 份，
    </div>
    <div style="padding:10px;">
      合同总金额 {{pageInfoHt.params.zongjine}} 元，
    </div>
    <div style="padding:10px;">
      已收总金额 {{pageInfoHt.params.yishou }} 元，
    </div>
    <div style="padding:10px;">
      余款 {{pageInfoHt.params.weishou }} 元。
      <el-button type="success" size="mini" @click="getContractList(5)">查看详情</el-button>
    </div>
    <div style="padding:10px;">
      其中有 {{pageInfoHt.params.exhibitorCount }} 个展商生成了合同。
      <el-button type="success" size="mini"
       @click="getContractList(5)"
      >查看详情</el-button>
    </div>




    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body :before-close="handleClose">

      <div class="colonn" v-if="getType==1||getType==2">
        <el-table v-loading="loading" :data="exhibitor_exhList">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="业务员" align="center" prop="params.nickName" />
          <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
          <el-table-column label="展位号" align="center" prop="params.boothNo" />
           <el-table-column label="展商状态" align="center" prop="determineRefuse">
             <template slot-scope="scope">
               <dict-tag :options="dict.type.exhibitor_status" :value="scope.row.determineRefuse" />
             </template>
           </el-table-column>
          <el-table-column label="展商来源" align="center" prop="exhibitorSource">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.exhibitor_source_type" :value="scope.row.exhibitorSource" />
            </template>
          </el-table-column>
          <el-table-column label="联系人" v-if="getType==2" align="center" prop="params.contactCount">
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getExhList(1)"
        />
      </div>


      <div class="colonn" v-if="getType==3">
        <el-table v-loading="loading" :data="listRecruitServiceProjectList">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="projectName" />
          <el-table-column label="预定数量" align="center" prop="params.serviceCount" />
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getServiceReserve(3)"
        />
      </div>
      <div class="colonn" v-if="getType==4">
        <el-table v-loading="loading" :data="listRecruitServiceProjectList">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="projectName" />
          <el-table-column label="预定数量" align="center" prop="params.serviceCount" />
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getExhList(4)"
        />
      </div>
      <div class="colonn" v-if="getType==5">
        <el-table v-loading="loading" :data="contractlistexhibitor_exhList">
          <el-table-column label="ID" align="center" prop="exhibitorId" />
          <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
          <el-table-column label="业务员" align="center" prop="params.nickName" />
          <el-table-column label="展商状态" align="center" prop="determineRefuse">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.exhibitor_status" :value="scope.row.determineRefuse"/>
            </template>
          </el-table-column>
          <el-table-column label="合同数量" align="center" prop="params.contractCount" />
          <el-table-column label="合同总金额" align="center" prop="params.rmbTotal" />
          <el-table-column label="已付金额" align="center" prop="params.rmbYi" />
          <el-table-column label="未付金额" align="center" prop="params.rmbWei" />
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getContractList(5)"
        />
      </div>



      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  // contractinfoexh
  import {
    contractinfoexh,
    boothinfoexh,
    serviceinfoexh,
    priceboothinfo,
    exhibitorinfoexh,contractlistexhibitor_exh
  } from "@/api/exhibitor/exhibitor_exh";

import { listRecruit_service_project } from "@/api/recruit/recruit_service_project";

  import {
    listExhibitor_exh
  } from "@/api/exhibitor/exhibitor_exh";

  export default {
    dicts: ['operation_type','determine_refuse', 'exhibitor_source_type', 'rollback_type', 'zlf_status','exhibitor_status'],
    name: "Exhibitor_trail",
    data() {
      return {
        'title': '测试',
        open: false,
        pageInfoHt: {
          params: {}
        },
        // 服务概况
        serviceGk: {
          params: {}
        },
        zwgkInfo1: {
          params: {}
        },
        zwgkInfo2: {
          params: {}
        },
        zsgks: {
          params: {}
        },
        exhibitor_exhList:[],//展商列表1
        loading:false,

        total:0,
        queryParams:{
          'pageNum':1,
          'pageSize':10
        },
        getType:0,
        listRecruitServiceProjectList:[],//服务项目
        contractlistexhibitor_exhList:[],//合同列表
      };
    },
    created() {
      this.getPageInfo();
      this.serviceinfoexhGet();
      this.boothinfoexh1Get()
      this.exhibitorinfoexh1()
    },
    methods: {
      // 获取合同统计列表
      getContractList(type){
          this.getType=type;
          this.loading = true;
          var queryParams = {};
          contractlistexhibitor_exh(queryParams).then(response => {
            this.contractlistexhibitor_exhList = response.rows;
            this.open = true;
            this.loading=false;
            this.total = response.total;
            this.title = "展商合同数据统计";
          });
      },
      // 获取服务预定
      getServiceReserve(type){
          this.getType=type;
          this.loading = true;
          var queryParams = {};
          listRecruit_service_project(queryParams).then(response => {
            this.listRecruitServiceProjectList = response.rows;
            this.open = true;
            this.loading=false;
            this.total = response.total;
            this.title = "展商服务统计";
          });
      },

      //获取展商列表
      getExhList(getType) {

        console.log("queryParams数据",this.queryParams)

        this.getType=getType;
        this.loading = true;
        var queryParams =this.queryParams;
        listExhibitor_exh(queryParams).then(response => {
          this.exhibitor_exhList = response.rows;
          this.open = true;
          this.loading=false;
          this.total = response.total;
          this.title = "展商列表";
        });
      },
      
      // 获取展商概况
      exhibitorinfoexh1() {
        var data = {};
        // 获取展商概况
        exhibitorinfoexh(data).then(response => {
          if (response.code == 200) {
            console.log("页面详情", response)
            this.zsgks = response.data;
          } else {
            this.$modal.msgError(response.msg);
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
        })
      },
      handleClose() {
        this.open = false;
      },
      // 对话框展示
      alertClickOpen() {
        this.open = true;
      },
      submitForm() {
        this.open = false;
      },
      cancel() {},
      // 前往页面
      toPage(type) {
        if (type == 1) {
          this.$tab.openPage("招展工作台", "/erm/exhibitor_exh");
        } else if (type == 2) {
          this.$tab.openPage("招展展位", "/zwsz/recruit_booth");
        }

        //
      },
      // 获取展位概况  boothinfoexh
      boothinfoexh1Get() {
        var data = {};
        // 获取合同概况
        boothinfoexh(data).then(response => {
          if (response.code == 200) {
            console.log("页面详情", response)
            this.zwgkInfo1 = response.data;
          } else {
            this.$modal.msgError(response.msg);
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
        })
        priceboothinfo(data).then(response => {
          if (response.code == 200) {
            console.log("页面详情", response)
            this.zwgkInfo2 = response.data;
          } else {
            this.$modal.msgError(response.msg);
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
        })
      },
      getPageInfo() {
        var data = {};
        // 获取合同概况
        contractinfoexh(data).then(response => {
          if (response.code == 200) {
            console.log("页面详情", response)
            this.pageInfoHt = response.data;
          } else {
            this.$modal.msgError(response.msg);
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
        })
      },
      serviceinfoexhGet() {
        var data = {};
        // 获取服务概况
        serviceinfoexh(data).then(response => {
          if (response.code == 200) {
            console.log("服务页面详情", response)
            this.serviceGk = response.data;
          } else {
            this.$modal.msgError(response.msg);
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
        })
      }
    }
  };
</script>
<style>
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
