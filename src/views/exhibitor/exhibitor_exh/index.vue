<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">

      <el-form-item label="展商名称" prop="exhibitorSname">
        <el-input v-model="queryParams.exhibitorName" placeholder="请输入展商名称" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="展商来源" prop="exhibitorSource">
        <el-select v-model="queryParams.exhibitorSource" placeholder="请选择展商来源" clearable>
          <el-option v-for="dict in dict.type.exhibitor_source_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="展商地址" prop="exhibitorAddress">
        <el-input v-model="queryParams.exhibitorAddress" placeholder="请输入展商地址" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="省份" prop="exhibitorProvince">
        <el-input v-model="queryParams.exhibitorProvince" placeholder="请输入展商省份" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="产品分类" prop="productCategory">
        <el-select v-model="queryParams.productCategory" placeholder="请选择产品类别" clearable>
          <el-option v-for="dict in categoryList" :key="dict.id" :label="dict.categoryName" :value="dict.id" />
        </el-select>
      </el-form-item>


      <el-form-item label="标签1" prop="tag1">
        <el-input v-model="queryParams.tag1" placeholder="标签1" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="标签2" prop="tag2">
        <el-input v-model="queryParams.tag2" placeholder="标签2" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
 <el-form-item label="展商状态" prop="determineRefuse">
        <el-select v-model="queryParams.determineRefuse" placeholder="请选择本届不参展" clearable>
          <el-option v-for="dict in dict.type.exhibitor_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>






      <!-- <el-form-item label="销售进度" prop="saleProgress">
        <el-input
          v-model="queryParams.saleProgress"
          placeholder="请输入销售进度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->


      <!--   -->

    <!--  <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>

      <el-form-item v-hasRole="['manager']" label="" label-width="30px" prop="productCategory">
        <el-checkbox v-model="checkedShowAllData" style="color:red;">是否显示所有可见数据</el-checkbox>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_exh:add']">新增</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="alertOpenidClick"
          >导入往届展商</el-button>
      </el-col>

      <!--  <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exhibitor:exhibitor_exh:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_exh:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_exh:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_exhList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />


      <el-table-column label="业务员" align="center" prop="params.nickName" />
      <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
      <el-table-column label="展商地址" align="center" prop="params.exhibitorAddress" />

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

      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_exh:edit']">修改</el-button>

         <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row,1)"
            v-hasPermi="['exhibitor:exhibitor_exh:remove']">删除</el-button> -->

          <el-button size="mini" type="text" icon="el-icon-remove-outline" v-if="scope.row.determineRefuse<=2||scope.row.determineRefuse>=7" @click="outZhanhui(scope.row,2)"
            v-hasPermi="['exhibitor:exhibitor_exh:remove']">退展</el-button>

          <el-button size="mini" type="text" icon="el-icon-picture-outline-round"  v-if="scope.row.determineRefuse<=2||scope.row.determineRefuse>=7"
          @click="toOutSea(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_exh:remove']">退回公海</el-button>

          <el-button size="mini" type="text" icon="el-icon-picture-outline-round" @click="closeMenus(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_exh:remove']">展商详情</el-button>


        </template>
      </el-table-column>


      <!--      <el-table-column label="展商ID" align="center" prop="exhibitorId" />
      <el-table-column label="展会ID" align="center" prop="exhId" />
      <el-table-column label="负责人ID" align="center" prop="userId" />

      <el-table-column label="退回类型" align="center" prop="rollbackType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.rollback_type" :value="scope.row.rollbackType"/>
        </template>
      </el-table-column>
      <el-table-column label="退回人" align="center" prop="rollbackUserId" />
      <el-table-column label="销售进度" align="center" prop="saleProgress" />

      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" /> -->

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- GetZhanshang -->

    <div class="roww" style="margin-top: 30px;" v-hasRole="['manager']">
     <!-- <el-button type="primary" @click="isZSAlertClick">从展商中选择展商</el-button>
      <el-button type="primary" @click="isGetExhListsClick">从往届展会中选择展商</el-button> -->

      <!-- <el-button type="primary">取消标签</el-button>
       <el-button type="primary">设置标签</el-button> -->
      <!-- <el-button type="primary">申请优质供应商</el-button> -->
      <el-button type="primary" @click="addInternationalWaters1">批量退回公海</el-button>
    </div>

    <div class="roww center_center" style="padding: 25px 0px;;" v-hasRole="['manager']">
      <div>将选中的展商分配给</div>
      <div style="color: blue;" v-if="selUserInfoList.length<=0" @click="closeUserAlertClick">点击选择业务员</div>
      <div style="color: blue;" class="roww" v-if="selUserInfoList.length>0" @click="closeUserAlertClick">
        <div v-for="(item,index) in selUserInfoList">{{item.nickName}},</div>
      </div>
      <div>业务员</div>
      <el-button style="margin-left: 15px;" type="primary" @click="toFenpeiYewuyuan">确认分配</el-button>
      <div class="allline"></div>
    </div>


    <!-- 添加或修改展商展会关联对话框 -->
    <!-- 添加或修改展商展会关联对话框 -->
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
          <image-upload v-model="form.exhibitorLogo" />
        </el-form-item>
        <el-form-item label="国家" prop="exhibitorCountry">
          <el-input v-model="form.exhibitorCountry" placeholder="请输入国家" />
        </el-form-item>


        <el-form-item label="省份" prop="exhibitorProvince">
          <!-- <el-input v-model="form.exhibitorProvince" placeholder="请输入省份" /> -->
          <el-select v-model="form.exhibitorProvince" placeholder="请选择" @change="shengChange">
            <el-option v-for="item in regionJsonData" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="城市" prop="exhibitorCity">
          <!-- <el-input v-model="form.exhibitorCity" placeholder="请输入城市" /> -->
          <el-select v-model="form.exhibitorCity" placeholder="请输入城市">
            <el-option v-for="item in cityListData" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

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


        <el-form-item label="产品类别" prop="productCategory">
          <!-- <el-input v-model="form.productCategory" placeholder="请输入产品类别" />          -->
          <el-select v-model="form.productCategory" placeholder="请选择产品类别" clearable>
            <el-option v-for="dict in categoryList" :key="dict.id" :label="dict.categoryName" :value="dict.id" />
          </el-select>

        </el-form-item>


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
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.value">{{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>






    <GetZhanshang v-if="isZSAlert" @close="closeGetZhanshang" @getSelZhanshang="getSelZhanshang"></GetZhanshang>

    <GetExhLists v-if="isGetExhLists" @close="isGetExhListsClose" :exhibitorId="exhibitorId"
      @getSelExhInfo="getSelExhInfo1"></GetExhLists>










    <zh_info :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo"
      v-if="zsgkShow"></zh_info>
    <zh_info_czls :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo" v-if="zh_info_czlsShow">
    </zh_info_czls>
    <zh_info_lxr :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo" v-if="zh_info_lxrShow"></zh_info_lxr>
    <zh_info_file :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo" v-if="zh_info_fileShow">
    </zh_info_file>
    <zh_info_service_reserve :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo"
      v-if="zh_info_service_reserveShow"></zh_info_service_reserve>
    <zh_info_service_booth_reserve :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId"
      @getSelExhInfo="getSelExhInfo" v-if="zh_info_service_booth_reserveShow"></zh_info_service_booth_reserve>
    <div v-if="zh_info_lxr_contractShow">
      <zh_info_lxr_contract :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId"
        @getSelExhInfo="getSelExhInfo"></zh_info_lxr_contract>

    </div>

    <zh_info_plan_money :selExhibitorId="selExhibitorId" v-if="zh_info_plan_moneyShow" @getSelExhInfo="getSelExhInfo">
    </zh_info_plan_money>
    <zh_info_plan_money_history :selExhibitorId="selExhibitorId" v-if="zh_info_plan_money_historyShow"
      @getSelExhInfo="getSelExhInfo"></zh_info_plan_money_history>
    <zh_info_llgc :selExhibitorId="selExhibitorId" v-if="zh_info_llgcShow" @getSelExhInfo="getSelExhInfo">
    </zh_info_llgc>
    <zh_info_zpgl :selExhibitorId="selExhibitorId" v-if="zh_info_zpglShow" @getSelExhInfo="getSelExhInfo">
    </zh_info_zpgl>


    <ExhMenus v-if="exhMenusClickShow" :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId"
      @closeMenus="closeMenus"></ExhMenus>

    <GetUserList v-if="alertUserShow" :isSingle="isSingle" @getUserList="getUserList1" @close="closeUserAlertClick">
    </GetUserList>

    <!-- <zh_updateShopInfo></zh_updateShopInfo> -->


    <!-- 用户导入对话框 -->
    <el-dialog
    :title="upload.title"
    :visible.sync="upload.open"
    width="400px"
    append-to-body
    >
      <div class="roww center_center">
        <div>选择展会</div>
        <div style="width: 20px;"></div>
        <el-select v-model="upload.exhId" placeholder="请选择展会" clearable>
          <el-option v-for="dict in exh_listList"
          :key="dict.id" :label="dict.exhName"
            :value="dict.id" />
        </el-select>
        <div class="allline"></div>
      </div>
      <div style="height: 20px;"></div>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport+'&exhId='+upload.exhId" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import {
    listExhibitor_exh,
    exhibitor_exhseaput,
    addExhToBp,
    exhibitor_exhimport,
    getExhibitor_exh,
    delExhibitor_exh,
    addExhibitor_exh,
    updateExhibitor_exh,
    replaceseaexhibitor_exh,cancelseaexhibitor_exh,
  } from "@/api/exhibitor/exhibitor_exh";

  import {
    listExhibitor_info,
    getExhibitor_info,
    delExhibitor_info,
    addExhibitor_info,
    updateExhibitor_info,
    fileimportsea
  } from "@/api/exhibitor/exhibitor_info";


  import GetZhanshang from '@/components/GetZhanshang/GetZhanshang'
  import GetExhLists from '@/components/GetExhLists/GetExhLists'

  import GetUserList from '@/components/GetUserList/GetUserList'

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
  import ExhMenus from '@/components/ExhMenus/ExhMenus'
  import zh_updateShopInfo from '@/components/zh_updateShopInfo/zh_updateShopInfo'
  import {
    listExh_category
  } from "@/api/exh/exh_category";

  import regionJson from '@/utils/region.json'


  import { listExh_list} from "@/api/exh/exh_list";
  import {
    getToken
  } from "@/utils/auth";

  export default {
    name: "Exhibitor_exh",
    dicts: ['determine_refuse', 'exhibitor_source_type', 'rollback_type', 'zlf_status', 'exhibitor_status'],
    components: {
      GetZhanshang,
      GetExhLists,
      zh_info,
      zh_info_czls,
      zh_info_lxr,
      zh_info_file,
      zh_info_service_reserve,
      zh_info_service_booth_reserve,
      zh_info_lxr_contract,
      zh_info_plan_money,
      zh_info_plan_money_history,
      zh_info_llgc,
      zh_info_zpgl,
      ExhMenus,
      GetUserList,
      zh_updateShopInfo
    },

    data() {
      return {
        cityListData: [],
        checkedShowAllData: false, //是否显示所有可见数据

        alertUserShow: false, //业务员对话框
        isSingle: true, //是否多选


        exhMenusClickShow: false, //菜单显示

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
        // 展商展会关联表格数据
        exhibitor_exhList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhibitorId: null,
          exhId: null,
          userId: null,
          exhibitorSource: null,
          rollbackType: null,
          rollbackUserId: null,
          saleProgress: null,
          determineRefuse: null,
          status: null,
          exhibitorName: null,


          exhibitorAddress: "",
          exhibitorProvince: "",
          tag1: null,
          tag2: null,
          productCategory: "",

        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          exhibitorId: [{
            required: true,
            message: "展商ID不能为空",
            trigger: "blur"
          }],
          exhId: [{
            required: true,
            message: "展会ID不能为空",
            trigger: "blur"
          }],

          exhibitorName: [{
            required: true,
            message: "展商名称不能为空",
            trigger: "blur"
          }],
          exhibitorTel: [{
            required: true,
            message: "企业联系电话不能为空",
            trigger: "blur"
          }],


          productCategory: [{
            required: true,
            message: "产品类别不能为空",
            trigger: "blur"
          }],
        },

        isZSAlert: false, //展商弹窗
        isGetExhLists: false, //历史展会弹窗
        exhibitorId: "", //当前选中的ID


        // 展会详情
        zsgkShow: false,
        // 展会参展历史
        zh_info_czlsShow: false,
        // 联系人
        zh_info_lxrShow: false,
        // 文件管理
        zh_info_fileShow: false,
        // 服务列表
        zh_info_service_reserveShow: false,

        zh_info_service_booth_reserveShow: false,
        zh_info_lxr_contractShow: false,
        zh_info_plan_moneyShow: false,
        zh_info_plan_money_historyShow: false,
        zh_info_llgcShow: false,
        zh_info_zpglShow: false,
        selExhibitorId: -1, //选中的企业信息
        exhibitorInfo: {}, //展会详情


        selUserInfoList: [], //选择的业务员详情
        selExhInfoList: [], //选中的展商信息
        categoryList: [], //分类列表















        // 若以版本导入
        // 用户导入参数
        upload: {
          // 是否显示弹出层（用户导入）
          open: false,
          // 弹出层标题（用户导入）
          title: "",
          // 是否禁用上传
          isUploading: false,
          exhId:'',
          // 是否更新已经存在的用户数据
          updateSupport: 0,
          // 设置上传的请求头部
          headers: {
            Authorization: "Bearer " + getToken()
          },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/api/exhibitor/data/importData",
        },
        exh_listList:[],

      };
    },
    created() {
      this.regionJsonData = regionJson;
      var selExhInfo = this.$cache.local.getJSON('selExhInfo');
      console.log("index", selExhInfo)
      if (!selExhInfo) {
        return false;
      }
      this.exhibitorId = selExhInfo.value.id + "";
      this.getList();
      this.getShopType()

      this.getExhList();
    },
    methods: {

      // 获取展会列表
      getExhList(){
        listExh_list({
          pageNum: 1,
          pageSize: 10000,
        }).then(response => {
         var exh_listList = response.rows;
         this.exh_listList=exh_listList;
        });
      },

      /** 导入按钮操作 */
      handleImport() {
        this.upload.title = "用户导入";
        this.upload.open = true;
      },
      /** 下载模板操作 */
      importTemplate() {
        this.download('/api/exhibitor/data/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`)
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        this.upload.open = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response
          .msg + "</div>", "导入结果", {
            dangerouslyUseHTMLString: true
          });
        this.getList();
      },
      // 提交上传文件
      submitFileForm() {
        console.log("报答",this.upload)
        if(this.upload.exhId==""){
          this.$modal.alertError("请选择展会");
          return false;
        }
        this.$refs.upload.submit();
      },
      alertOpenidClick(){
       this.upload.open=!this.upload.open;
      },
      // ----------------------------------------------



      // 退展
      outZhanhui(info){
        console.log("展商详情",info)

        var data={
          exhibitorId:info.exhibitorId,
          exhId:info.exhId,
          determineRefuse:info.determineRefuse,
        }
        cancelseaexhibitor_exh(data).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("退展成功");
            setTimeout(res=>{
              this.getList()
            },1000)
          } else {
            this.$modal.msgSuccess(response.msg);
            this.$modal.closeLoading();
          }
        }).catch(() => {});
      },

      // @getUserList="getUserList"
      // @close="close"
      // 省修改
      shengChange(res) {
        this.form.exhibitorCity = "";
        var regionJsonData = this.regionJsonData;
        var index = -1;
        for (var a = 0; a < regionJsonData.length; a++) {
          if (res == regionJsonData[a].name) {
            index = a;
          }
        }
        this.cityListData = regionJsonData[index].children;
      },

      // 获取上架分类
      getShopType() {
        var data = {
          'categoryType': 4,
        }
        listExh_category(data).then(response => {
          if (response.code == 200) {
            console.log("商家分类", response);
            this.categoryList = response.rows;
          } else {
            this.$modal.msgSuccess(response.msg);
            this.$modal.closeLoading();
          }
        }).catch(() => {});
      },


      // 将选中的业务员和展商平均分配给他们
      toFenpeiYewuyuan() {
        var selUserInfoList = this.selUserInfoList;
        console.log("选中的用户详情", selUserInfoList);
        if (selUserInfoList.length <= 0) {
          this.$modal.alertError("请选择需要转的业务员");
          return false;
        }
        var selExhInfoList = this.selExhInfoList;
        if (selExhInfoList.length <= 0) {
          this.$modal.alertError("请选择需要转的展商");
          return false;
        }
        var data = {
          userId: selUserInfoList[0].userId,
          params: {
            exhibitors: selExhInfoList
          }
        }

        this.$modal.loading("正在导出数据，请稍后...");
        replaceseaexhibitor_exh(data).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("分配成功");
            this.$modal.closeLoading();
            this.getList();
          } else {
            this.$modal.msgError(response.msg);
            this.$modal.closeLoading();
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
          this.$modal.closeLoading();
        })


      },
      // 业务员组件确认按钮
      getUserList1(res) {
        console.log("确认", res);
        this.selUserInfoList = res;
        this.alertUserShow = false;
      },
      //关闭业务员组件
      closeUserAlertClick() {
        this.alertUserShow = !this.alertUserShow;
      },

      closeMenus(res) {
        if (res) {
          this.exhibitorInfo = res;
          this.selExhibitorId = res.exhibitorId;
          console.log("猎豹", res, ' this.exhibitorInfo', this.exhibitorInfo)
        }

        this.exhMenusClickShow = !this.exhMenusClickShow;
      },

      // 开始菜单
      zsgkClick(command) {
        console.log("开始", command)
        var command1 = command.split(",");
        command = parseInt(command1[0])
        this.selExhibitorId = command1[1];

        var exhibitor_exhList = this.exhibitor_exhList;
        for (var a = 0; a < exhibitor_exhList.length; a++) {
          console.log("详情", exhibitor_exhList[a].id, this.selExhibitorId)
          if (exhibitor_exhList[a].exhibitorId == this.selExhibitorId) {
            // 选中的详情
            this.exhibitorInfo = exhibitor_exhList[a];
          }
        }



        if (command == 0) {
          this.zsgkShow = true;
        } else {
          this.zsgkShow = false;
        }

        if (command == 2) {
          this.zh_info_czlsShow = true;
        } else {
          this.zh_info_czlsShow = false;
        }

        if (command == 3) {
          this.zh_info_lxrShow = true;
        } else {
          this.zh_info_lxrShow = false;
        }
        if (command == 4) {
          this.zh_info_fileShow = true;
        } else {
          this.zh_info_fileShow = false;
        }
        if (command == 5) {
          this.zh_info_service_reserveShow = true;
        } else {
          this.zh_info_service_reserveShow = false;
        }
        if (command == 6) {
          this.zh_info_service_booth_reserveShow = true;
        } else {
          this.zh_info_service_booth_reserveShow = false;
        }
        if (command == 7) {
          this.zh_info_lxr_contractShow = true;
        } else {
          this.zh_info_lxr_contractShow = false;
        }
        if (command == 8) {
          this.zh_info_plan_moneyShow = true;
        } else {
          this.zh_info_plan_moneyShow = false;
        }
        if (command == 9) {
          this.zh_info_plan_money_historyShow = true;
        } else {
          this.zh_info_plan_money_historyShow = false;
        }
        if (command == 12) {
          this.zh_info_llgcShow = true;
        } else {
          this.zh_info_llgcShow = false;
        }
        if (command == 13) {
          this.zh_info_zpglShow = true;
        } else {
          this.zh_info_zpglShow = false;
        }
      },
      getSelExhInfo(res) {
        console.log("第几个", res)
        var command = res;
        if (command == 0) {
          this.zsgkShow = false;
        }
        if (command == 2) {
          this.zh_info_czlsShow = false;
        }
        if (command == 3) {
          this.zh_info_lxrShow = false;
        }
        if (command == 4) {
          this.zh_info_fileShow = false;
        }
        if (command == 5) {
          this.zh_info_service_reserveShow = false;
        }
        if (command == 6) {
          this.zh_info_service_booth_reserveShow = false;
        }
        if (command == 7) {
          this.zh_info_lxr_contractShow = false;
          console.log(this.zh_info_lxr_contractShow)
          this.$forceUpdate()
        }
        if (command == 8) {
          this.zh_info_plan_moneyShow = false;
        }

        if (command == 9) {
          this.zh_info_plan_money_historyShow = false;
        }

        if (command == 12) {
          this.zh_info_llgcShow = false;
        }
        if (command == 13) {
          this.zh_info_zpglShow = false;
        }

      },


      // 列表的按钮退回公海
      toOutSea(res) {
        console.log("公海", res);
        this.ids = [res.id];
        this.addInternationalWaters1();
      },
      // 本页批量加入公海
      addInternationalWaters1() {
        var ids = this.ids;
        console.log("批量化", ids);
        if (ids.length <= 0) {
          this.$modal.msgError("请选择展商");
          return false
        }
        this.$modal.confirm('确定要将这些展商退出到公海吗？').then((res) => {

          this.addInternationalWaters();
        }).then(() => {

        }).catch((res) => {
          console.log("巴粗", res)
        });
      },
      addInternationalWaters() {
        console.log("加上")
        var ids = this.ids;
        var exhibitor_exhList = this.exhibitor_exhList;
        var selList = [];
        for (var a = 0; a < ids.length; a++) {
          for (var b = 0; b < exhibitor_exhList.length; b++) {
            if (ids[a] == exhibitor_exhList[b].id) {

              selList.push(exhibitor_exhList[b])
            }
          }
        }
        console.log("exhibfuse",selList);
        // scope.row.determineRefuse<=2
        for(var a=0;a<selList.length;a++){
          console.log("exhibitor_exhList[a].determineRefuse",selList[a]);
          if(parseInt(selList[a].determineRefuse)>2&&parseInt(selList[a].determineRefuse)<7){
            this.$modal.msgError("其中包含已签约展商，不可退回公海");
            return false;
          }
        }

        console.log('asdasdasdasd')
        var data = {
          params: {
            exhibitors: selList
          }
        }
        console.log('datadatadata', data)
        this.$modal.loading("提交中...");
        exhibitor_exhseaput(data).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("操作成功");
            this.$modal.closeLoading();
            setTimeout(res => {
              this.getList()
            }, 1000)
          } else {
            this.$modal.msgError(response.msg);
            this.$modal.closeLoading();
          }
        }).catch((r) => {
          console.log("报错", r)
          this.$modal.msgError(r);
          this.$modal.closeLoading();
        })

      },
      // 获取选中的展会（对话框）
      getSelExhInfo1(res) {
        console.log("选中的展会", res)
        var data = {
          params: {
            otherExh: res.id
          }
        }
        this.$modal.loading("正在导入，请稍后...");
        exhibitor_exhimport(data).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("导入成功");
            this.isGetExhLists = false;
            this.$modal.closeLoading();
            setTimeout(res => {
              this.getList()
            }, 1000)
          } else {
            this.$modal.msgError(response.msg);
            this.$modal.closeLoading();
          }
        }).catch((r) => {
          this.$modal.msgError(r);
          this.$modal.closeLoading();
        })
      },
      isGetExhListsClose() {
        this.isGetExhLists = false;
      },
      isGetExhListsClick() {
        this.isGetExhLists = true;
      },
      closeGetZhanshang() {
        this.isZSAlert = false;
      },
      isZSAlertClick() {
        this.isZSAlert = true;
      },
      // 获取选中的展商
      getSelZhanshang(res) {
        console.log("选中的展商的id", res);
        this.$modal.confirm('确定要导入吗').then(res1 => {
          console.log("5678", res)
          this.addExhToBp(res);
        }).catch(() => {});
      },

      // 将多个展商添加到展会里去
      addExhToBp(exhList) {
        var data = {
          params: {
            ids: exhList
          }
        }
        addExhToBp(data).then(response => {
          console.log("添加结果", response)
          if (response.code == 200) {
            this.$modal.msgSuccess("导入成功");
            this.isZSAlert = false;
            setTimeout(res => {
              this.getList()
            }, 1000)
          } else {
            this.$modal.msgError(response.msg);
          }
        });
      },

      /** 查询展商展会关联列表 */
      getList() {
        this.loading = true;
        var queryParams = this.queryParams;
        console.log("插损参数", queryParams);
        queryParams.params = {
          exhibitorName: queryParams.exhibitorName,
          exhibitorAddress: queryParams.exhibitorAddress,
          exhibitorProvince: queryParams.exhibitorProvince,
          productCategory: queryParams.productCategory,
          tag1: queryParams.tag1,
          tag2: queryParams.tag2,
        }
        queryParams.searchValue = this.checkedShowAllData ? 2 : 1;

        listExhibitor_exh(queryParams).then(response => {
          this.exhibitor_exhList = response.rows;
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
          exhibitorId: null,
          exhId: null,
          userId: null,
          exhibitorSource: null,
          rollbackType: null,
          rollbackUserId: null,
          saleProgress: null,
          determineRefuse: "0",
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
        this.selExhInfoList = selection; //选中的展商信息
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length;
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加展商展会关联";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.exhibitorId;
        getExhibitor_info(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改展商展会关联";
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
              var data = {
                params: this.form,
              }
              addExhibitor_exh(data).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row, type) {

        var txt = "";
        if (type == 1) {
          txt = "是否确认删除此展商吗？";
        } else {
          txt = "是否确认此展商退展吗？";
        }

        const ids = row.id || this.ids;
        this.$modal.confirm(txt).then(function() {
          return delExhibitor_exh(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('exhibitor/exhibitor_exh/export', {
          ...this.queryParams
        }, `exhibitor_exh_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
