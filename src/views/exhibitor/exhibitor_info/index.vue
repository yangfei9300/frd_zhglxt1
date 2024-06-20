<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="展商名称" prop="exhibitorName">
        <el-input
          v-model="queryParams.exhibitorName"
          placeholder="请输入展商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="展商简称" prop="exhibitorSname">
        <el-input
          v-model="queryParams.exhibitorSname"
          placeholder="请输入展商简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="展商英文名称" prop="exhibitorEname">
        <el-input
          v-model="queryParams.exhibitorEname"
          placeholder="请输入展商英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展商英文简称" prop="exhibitorEsname">
        <el-input
          v-model="queryParams.exhibitorEsname"
          placeholder="请输入展商英文简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="公司地址" prop="exhibitorAddress">
        <el-input
          v-model="queryParams.exhibitorAddress"
          placeholder="请输入公司地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="公司英文地址" prop="exhibitorEaddress">
        <el-input
          v-model="queryParams.exhibitorEaddress"
          placeholder="请输入公司英文地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="公司邮编" prop="exhibitorZipcode">
        <el-input
          v-model="queryParams.exhibitorZipcode"
          placeholder="请输入公司邮编"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="公司网址" prop="exhibitorWeburl">
        <el-input
          v-model="queryParams.exhibitorWeburl"
          placeholder="请输入公司网址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国家" prop="exhibitorCountry">
        <el-input
          v-model="queryParams.exhibitorCountry"
          placeholder="请输入国家"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省份" prop="exhibitorProvince">
        <el-input
          v-model="queryParams.exhibitorProvince"
          placeholder="请输入省份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="城市" prop="exhibitorCity">
        <el-input
          v-model="queryParams.exhibitorCity"
          placeholder="请输入城市"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册资本" prop="exhibitorCapital">
        <el-input
          v-model="queryParams.exhibitorCapital"
          placeholder="请输入注册资本"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="所属展团" prop="delegationId">
        <el-input
          v-model="queryParams.delegationId"
          placeholder="请输入所属展团"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属代理" prop="agentId">
        <el-input
          v-model="queryParams.agentId"
          placeholder="请输入所属代理"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="信誉等级" prop="exhibitorLevel">
        <el-input
          v-model="queryParams.exhibitorLevel"
          placeholder="请输入信誉等级"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="展商类别" prop="exhibitorCategory">
        <el-input
          v-model="queryParams.exhibitorCategory"
          placeholder="请输入展商类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="exhibitorTel">
        <el-input
          v-model="queryParams.exhibitorTel"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="传真" prop="exhibitorFax">
        <el-input
          v-model="queryParams.exhibitorFax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Email" prop="exhibitorEmail">
        <el-input
          v-model="queryParams.exhibitorEmail"
          placeholder="请输入Email"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="所属行业" prop="industryId">
        <el-input
          v-model="queryParams.industryId"
          placeholder="请输入所属行业"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品类别" prop="productCategory">
        <el-input
          v-model="queryParams.productCategory"
          placeholder="请输入产品类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="参展展品类别" prop="exhibitsCategory">
        <el-input
          v-model="queryParams.exhibitsCategory"
          placeholder="请输入参展展品类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展商中文介绍" prop="exhibitorIntro">
        <el-input
          v-model="queryParams.exhibitorIntro"
          placeholder="请输入展商中文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展商英文介绍" prop="exhibitorEintro">
        <el-input
          v-model="queryParams.exhibitorEintro"
          placeholder="请输入展商英文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展品中文介绍" prop="exhibitsIntro">
        <el-input
          v-model="queryParams.exhibitsIntro"
          placeholder="请输入展品中文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展品英文介绍" prop="exhibitsEintro">
        <el-input
          v-model="queryParams.exhibitsEintro"
          placeholder="请输入展品英文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="标签一" prop="tag1">
        <el-input
          v-model="queryParams.tag1"
          placeholder="请输入标签一"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标签二" prop="tag2">
        <el-input
          v-model="queryParams.tag2"
          placeholder="请输入标签二"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.zlf_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_info:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exhibitor:exhibitor_info:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['exhibitor:exhibitor_info:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_info:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号(ID)" align="center" prop="id" />
      <el-table-column label="展商名称" align="center" prop="exhibitorName" />
      <!-- <el-table-column label="产品类别" align="center" prop="productCategory" /> -->
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

     <!-- <el-table-column label="展商简称" align="center" prop="exhibitorSname" />
      <el-table-column label="展商英文名称" align="center" prop="exhibitorEname" />
      <el-table-column label="展商英文简称" align="center" prop="exhibitorEsname" />
      <el-table-column label="公司地址" align="center" prop="exhibitorAddress" />
      <el-table-column label="公司英文地址" align="center" prop="exhibitorEaddress" />
      <el-table-column label="公司邮编" align="center" prop="exhibitorZipcode" />
      <el-table-column label="公司网址" align="center" prop="exhibitorWeburl" />
      <el-table-column label="展商LOGO" align="center" prop="exhibitorLogo" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.exhibitorLogo" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="国家" align="center" prop="exhibitorCountry" />
      <el-table-column label="省份" align="center" prop="exhibitorProvince" />
      <el-table-column label="城市" align="center" prop="exhibitorCity" />
      <el-table-column label="注册资本" align="center" prop="exhibitorCapital" />
      <el-table-column label="所属展团" align="center" prop="delegationId" />
      <el-table-column label="所属代理" align="center" prop="agentId" />
      <el-table-column label="信誉等级" align="center" prop="exhibitorLevel" />
      <el-table-column label="展商类别" align="center" prop="exhibitorCategory" />
      <el-table-column label="电话" align="center" prop="exhibitorTel" />
      <el-table-column label="传真" align="center" prop="exhibitorFax" />
      <el-table-column label="Email" align="center" prop="exhibitorEmail" />
      <el-table-column label="所属行业" align="center" prop="industryId" />
      <el-table-column label="参展展品类别" align="center" prop="exhibitsCategory" />
      <el-table-column label="展商中文介绍" align="center" prop="exhibitorIntro" />
      <el-table-column label="展商英文介绍" align="center" prop="exhibitorEintro" />
      <el-table-column label="展品中文介绍" align="center" prop="exhibitsIntro" />
      <el-table-column label="展品英文介绍" align="center" prop="exhibitsEintro" />
      <el-table-column label="标签一" align="center" prop="tag1" />
      <el-table-column label="标签二" align="center" prop="tag2" />
      <el-table-column label="备注" align="center" prop="memo" /> -->

      <el-table-column label="创建者" align="center" prop="createBy" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_info:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_info:remove']"
          >删除</el-button>

          <!-- <el-dropdown  @command="zsgkClick">
            <span class="el-dropdown-link" style="color:#409EFF;">
              展商菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'0,'+scope.row.id">展商概况</el-dropdown-item>
              <el-dropdown-item  :command="'1,'+scope.row.id" disabled>基本信息</el-dropdown-item>
             <el-dropdown-item  :command="'2,'+scope.row.id">参会历史</el-dropdown-item>
             <el-dropdown-item  :command="'3,'+scope.row.id">联系人</el-dropdown-item>
             <el-dropdown-item  :command="'4,'+scope.row.id">文件管理</el-dropdown-item>
             <el-dropdown-item  :command="'5,'+scope.row.id">服务预定</el-dropdown-item>
             <el-dropdown-item  :command="'6,'+scope.row.id">展位预定</el-dropdown-item>
             <el-dropdown-item  :command="'7,'+scope.row.id">合同管理</el-dropdown-item>
             <el-dropdown-item  :command="'8,'+scope.row.id">付款计划</el-dropdown-item>
             <el-dropdown-item  :command="'9,'+scope.row.id">付款记录</el-dropdown-item>
             <el-dropdown-item  :command="'10,'+scope.row.id" disabled>会刊信息</el-dropdown-item>
             <el-dropdown-item  :command="'11,'+scope.row.id" disabled>证件管理</el-dropdown-item>
             <el-dropdown-item  :command="'12,'+scope.row.id">联络过程</el-dropdown-item>
             <el-dropdown-item  :command="'13,'+scope.row.id">展品管理</el-dropdown-item>
             <el-dropdown-item  :command="'14,'+scope.row.id" disabled>登录信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->



        </template>
      </el-table-column>
    </el-table>

  <!-- <zh_info></zh_info> -->

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    <div class="roww">
       <el-button type="primary">取消标签</el-button>
       <el-button type="primary">设置标签</el-button>
       <el-button type="primary">申请优质供应商</el-button>
       <el-button type="primary">批量退回公海</el-button>
       <el-button type="primary">加入任务</el-button>
    </div> -->

    <!-- 添加或修改展商信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="70%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="展商名称" prop="exhibitorName">
          <el-input v-model="form.exhibitorName" placeholder="请输入展商名称" />
        </el-form-item>
        <el-form-item label="展商简称" prop="exhibitorSname">
          <el-input v-model="form.exhibitorSname" placeholder="请输入展商简称" />
        </el-form-item>
        <el-form-item label="展商英文名称" prop="exhibitorEname">
          <el-input v-model="form.exhibitorEname" placeholder="请输入展商英文名称" />
        </el-form-item>
        <el-form-item label="展商英文简称" prop="exhibitorEsname">
          <el-input v-model="form.exhibitorEsname" placeholder="请输入展商英文简称" />
        </el-form-item>
        <el-form-item label="公司地址" prop="exhibitorAddress">
          <el-input v-model="form.exhibitorAddress" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="公司英文地址" prop="exhibitorEaddress">
          <el-input v-model="form.exhibitorEaddress" placeholder="请输入公司英文地址" />
        </el-form-item>
        <el-form-item label="公司邮编" prop="exhibitorZipcode">
          <el-input v-model="form.exhibitorZipcode" placeholder="请输入公司邮编" />
        </el-form-item>
        <el-form-item label="公司网址" prop="exhibitorWeburl">
          <el-input v-model="form.exhibitorWeburl" placeholder="请输入公司网址" />
        </el-form-item>
        <el-form-item label="展商LOGO">
          <image-upload v-model="form.exhibitorLogo"/>
        </el-form-item>
        <el-form-item label="国家" prop="exhibitorCountry">
          <el-input v-model="form.exhibitorCountry" placeholder="请输入国家" />
        </el-form-item>
        <el-form-item label="省份" prop="exhibitorProvince">
          <el-input v-model="form.exhibitorProvince" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="exhibitorCity">
          <el-input v-model="form.exhibitorCity" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="注册资本" prop="exhibitorCapital">
          <el-input v-model="form.exhibitorCapital" placeholder="请输入注册资本" />
        </el-form-item>
       <!-- <el-form-item label="所属展团" prop="delegationId">
          <el-input v-model="form.delegationId" placeholder="请输入所属展团" />
        </el-form-item> -->
        <!-- <el-form-item label="所属代理" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入所属代理" />
        </el-form-item> -->
       <!-- <el-form-item label="信誉等级" prop="exhibitorLevel">
          <el-input v-model="form.exhibitorLevel" placeholder="请输入信誉等级" />
        </el-form-item> -->
       <!-- <el-form-item label="展商类别" prop="exhibitorCategory">
          <el-input v-model="form.exhibitorCategory" placeholder="请输入展商类别" />
        </el-form-item> -->
        <el-form-item label="电话" prop="exhibitorTel">
          <el-input v-model="form.exhibitorTel" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="传真" prop="exhibitorFax">
          <el-input v-model="form.exhibitorFax" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="Email" prop="exhibitorEmail">
          <el-input v-model="form.exhibitorEmail" placeholder="请输入Email" />
        </el-form-item>
       <!-- <el-form-item label="所属行业" prop="industryId">
          <el-input v-model="form.industryId" placeholder="请输入所属行业" />
        </el-form-item> -->
       <!-- <el-form-item label="产品类别" prop="productCategory">
          <el-input v-model="form.productCategory" placeholder="请输入产品类别" />
        </el-form-item> -->
        <el-form-item label="参展展品类别" prop="exhibitsCategory">
          <el-input v-model="form.exhibitsCategory" placeholder="请输入参展展品类别" />
        </el-form-item>
        <el-form-item label="展商中文介绍" prop="exhibitorIntro">
          <el-input v-model="form.exhibitorIntro" placeholder="请输入展商中文介绍" />
        </el-form-item>
        <el-form-item label="展商英文介绍" prop="exhibitorEintro">
          <el-input v-model="form.exhibitorEintro" placeholder="请输入展商英文介绍" />
        </el-form-item>
        <el-form-item label="展品中文介绍" prop="exhibitsIntro">
          <el-input v-model="form.exhibitsIntro" placeholder="请输入展品中文介绍" />
        </el-form-item>
        <el-form-item label="展品英文介绍" prop="exhibitsEintro">
          <el-input v-model="form.exhibitsEintro" placeholder="请输入展品英文介绍" />
        </el-form-item>
        <el-form-item label="标签一" prop="tag1">
          <el-input v-model="form.tag1" placeholder="请输入标签一" />
        </el-form-item>
        <el-form-item label="标签二" prop="tag2">
          <el-input v-model="form.tag2" placeholder="请输入标签二" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.zlf_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- <zh_info :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo" v-if="zsgkShow"></zh_info>
    <zh_info_czls :selExhibitorId="selExhibitorId"   @getSelExhInfo="getSelExhInfo"  v-if="zh_info_czlsShow"></zh_info_czls>
    <zh_info_lxr :selExhibitorId="selExhibitorId"   @getSelExhInfo="getSelExhInfo"  v-if="zh_info_lxrShow"></zh_info_lxr>
    <zh_info_file :selExhibitorId="selExhibitorId"   @getSelExhInfo="getSelExhInfo"  v-if="zh_info_fileShow"></zh_info_file>
    <zh_info_service_reserve  :selExhibitorId="selExhibitorId"  @getSelExhInfo="getSelExhInfo"  v-if="zh_info_service_reserveShow"></zh_info_service_reserve>
    <zh_info_service_booth_reserve  :selExhibitorId="selExhibitorId"  @getSelExhInfo="getSelExhInfo"  v-if="zh_info_service_booth_reserveShow"></zh_info_service_booth_reserve>
    <div v-if="zh_info_lxr_contractShow">
      <zh_info_lxr_contract
       :exhibitorInfo="exhibitorInfo"
       :selExhibitorId="selExhibitorId"  @getSelExhInfo="getSelExhInfo"  ></zh_info_lxr_contract>

    </div>

    <zh_info_plan_money  :selExhibitorId="selExhibitorId"  v-if="zh_info_plan_moneyShow"  @getSelExhInfo="getSelExhInfo"  ></zh_info_plan_money>
    <zh_info_plan_money_history  :selExhibitorId="selExhibitorId"  v-if="zh_info_plan_money_historyShow"  @getSelExhInfo="getSelExhInfo"  ></zh_info_plan_money_history>
    <zh_info_llgc  :selExhibitorId="selExhibitorId"  v-if="zh_info_llgcShow"  @getSelExhInfo="getSelExhInfo"  ></zh_info_llgc>
    <zh_info_zpgl  :selExhibitorId="selExhibitorId"  v-if="zh_info_zpglShow"  @getSelExhInfo="getSelExhInfo"  ></zh_info_zpgl>
 -->

  </div>
</template>

<script>
import { listExhibitor_info, getExhibitor_info, delExhibitor_info, addExhibitor_info, updateExhibitor_info } from "@/api/exhibitor/exhibitor_info";

import zh_info from '@/components/zh_info/zh_info'
import zh_info_czls from '@/components/zh_info_czls/zh_info_czls'
import zh_info_lxr from '@/components/zh_info_lxr/zh_info_lxr'
import zh_info_file from '@/components/zh_info_file/zh_info_file'
import zh_info_service_reserve from '@/components/zh_info_service_reserve/zh_info_service_reserve'
import zh_info_service_booth_reserve from '@/components/zh_info_service_booth_reserve/zh_info_service_booth_reserve'
import zh_info_lxr_contract from '@/components/zh_info_lxr_contract/zh_info_lxr_contract'
import zh_info_plan_money from '@/components/zh_info_plan_money/zh_info_plan_money'
import zh_info_plan_money_history from '@/components/zh_info_plan_money_history/zh_info_plan_money_history'
import zh_info_llgc from '@/components/zh_info_llgc/zh_info_llgc'
import zh_info_zpgl from '@/components/zh_info_zpgl/zh_info_zpgl'




export default {
  name: "Exhibitor_info",
  dicts: ['zlf_status'],

  components: {
    zh_info,zh_info_czls,zh_info_lxr,zh_info_file,zh_info_service_reserve,
    zh_info_service_booth_reserve,zh_info_lxr_contract,zh_info_plan_money,
    zh_info_plan_money_history,zh_info_llgc,zh_info_zpgl,
  },

  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 展商信息表格数据
      exhibitor_infoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhibitorName: null,
        exhibitorSname: null,
        exhibitorEname: null,
        exhibitorEsname: null,
        exhibitorAddress: null,
        exhibitorEaddress: null,
        exhibitorZipcode: null,
        exhibitorWeburl: null,
        exhibitorLogo: null,
        exhibitorCountry: null,
        exhibitorProvince: null,
        exhibitorCity: null,
        exhibitorCapital: null,
        delegationId: null,
        agentId: null,
        exhibitorLevel: null,
        exhibitorCategory: null,
        exhibitorTel: null,
        exhibitorFax: null,
        exhibitorEmail: null,
        industryId: null,
        productCategory: null,
        exhibitsCategory: null,
        exhibitorIntro: null,
        exhibitorEintro: null,
        exhibitsIntro: null,
        exhibitsEintro: null,
        tag1: null,
        tag2: null,
        memo: null,
        status: null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exhibitorName: [
          { required: true, message: "展商名称不能为空", trigger: "blur" }
        ],
      },

      // 展商菜单
      // 展会详情
      zsgkShow:false,
      // 展会参展历史
      zh_info_czlsShow:false,
      // 联系人
      zh_info_lxrShow:false,
      // 文件管理
      zh_info_fileShow:false,
      // 服务列表
      zh_info_service_reserveShow:false,

      zh_info_service_booth_reserveShow:false,
      zh_info_lxr_contractShow:false,
      zh_info_plan_moneyShow:false,
      zh_info_plan_money_historyShow:false,
      zh_info_llgcShow:false,
      zh_info_zpglShow:false,
      selExhibitorId:-1,//选中的企业信息
    };
  },
  created() {
    this.getList();
  },
  methods: {

    // 开始菜单
    zsgkClick(command){
      console.log("开始",command)
      var command1=command.split(",");
      command=parseInt(command1[0])
      this.selExhibitorId=command1[1];


      var exhibitor_infoList=this.exhibitor_infoList;
      for(var a=0;a<exhibitor_infoList.length;a++){
        console.log("详情",exhibitor_infoList[a].id,this.selExhibitorId)
        if(exhibitor_infoList[a].id==this.selExhibitorId){
          // 选中的详情
          this.exhibitorInfo=exhibitor_infoList[a];
        }
      }

      if(command==0){
        this.zsgkShow=true;
      }else{
        this.zsgkShow=false;
      }

      if(command==2){
        this.zh_info_czlsShow=true;
      }else{
        this.zh_info_czlsShow=false;
      }

      if(command==3){
        this.zh_info_lxrShow=true;
      }else{
        this.zh_info_lxrShow=false;
      }
      if(command==4){
        this.zh_info_fileShow=true;
      }else{
        this.zh_info_fileShow=false;
      }
      if(command==5){
        this.zh_info_service_reserveShow=true;
      }else{
        this.zh_info_service_reserveShow=false;
      }
      if(command==6){
        this.zh_info_service_booth_reserveShow=true;
      }else{
        this.zh_info_service_booth_reserveShow=false;
      }
      if(command==7){
        this.zh_info_lxr_contractShow=true;
      }else{
        this.zh_info_lxr_contractShow=false;
      }
      if(command==8){
        this.zh_info_plan_moneyShow=true;
      }else{
        this.zh_info_plan_moneyShow=false;
      }
      if(command==9){
        this.zh_info_plan_money_historyShow=true;
      }else{
        this.zh_info_plan_money_historyShow=false;
      }
      if(command==12){
        this.zh_info_llgcShow=true;
      }else{
        this.zh_info_llgcShow=false;
      }
      if(command==13){
        this.zh_info_zpglShow=true;
      }else{
        this.zh_info_zpglShow=false;
      }


    },
    close(){

    },
    getSelExhInfo(res){
      console.log("第几个",res)
      var command=res;
      if(command==0){
        this.zsgkShow=false;
      }
      if(command==2){
        this.zh_info_czlsShow=false;
      }
      if(command==3){
        this.zh_info_lxrShow=false;
      }
      if(command==4){
        this.zh_info_fileShow=false;
      }
      if(command==5){
        this.zh_info_service_reserveShow=false;
      }
      if(command==6){
        this.zh_info_service_booth_reserveShow=false;
      }
      if(command==7){
        this.zh_info_lxr_contractShow=false;
        console.log(this.zh_info_lxr_contractShow)
        this.$forceUpdate()
      }
      if(command==8){
        this.zh_info_plan_moneyShow=false;
      }

      if(command==9){
        this.zh_info_plan_money_historyShow=false;
      }

      if(command==12){
        this.zh_info_llgcShow=false;
      }
      if(command==13){
        this.zh_info_zpglShow=false;
      }

    },
    // 结束菜单

    /** 查询展商信息列表 */
    getList() {
      this.loading = true;
      listExhibitor_info(this.queryParams).then(response => {
        this.exhibitor_infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        exhibitorName: null,
        exhibitorSname: null,
        exhibitorEname: null,
        exhibitorEsname: null,
        exhibitorAddress: null,
        exhibitorEaddress: null,
        exhibitorZipcode: null,
        exhibitorWeburl: null,
        exhibitorLogo: null,
        exhibitorCountry: null,
        exhibitorProvince: null,
        exhibitorCity: null,
        exhibitorCapital: null,
        delegationId: null,
        agentId: null,
        exhibitorLevel: null,
        exhibitorCategory: null,
        exhibitorTel: null,
        exhibitorFax: null,
        exhibitorEmail: null,
        industryId: null,
        productCategory: null,
        exhibitsCategory: null,
        exhibitorIntro: null,
        exhibitorEintro: null,
        exhibitsIntro: null,
        exhibitsEintro: null,
        tag1: null,
        tag2: null,
        memo: null,
        status: "0",
        delFlag: null,
        version: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加展商信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_info(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_info(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_info(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除展商信息编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_info(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_info/export', {
        ...this.queryParams
      }, `exhibitor_info_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
