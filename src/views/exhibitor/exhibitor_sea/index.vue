<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="展商名称" prop="exhName">
        <el-input v-model="queryParams.exhName" placeholder="请输入展商名称" clearable @keyup.enter.native="handleQuery" />
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

      <el-form-item label="展商状态" prop="determineRefuse">
        <el-select v-model="queryParams.determineRefuse" placeholder="请选择展商状态" clearable>
          <el-option v-for="dict in dict.type.exhibitor_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="标签1" prop="tag1">
        <el-input v-model="queryParams.tag1" placeholder="标签1" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="标签2" prop="tag2">
        <el-input v-model="queryParams.tag2" placeholder="标签2" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <!-- <el-form-item label="展会ID" prop="exhId">
            <el-input
              v-model="queryParams.exhId"
              placeholder="请输入展会ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="负责人ID" prop="userId">
            <el-input
              v-model="queryParams.userId"
              placeholder="请输入负责人ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item label="退回类型" prop="rollbackType">
            <el-select v-model="queryParams.rollbackType" placeholder="请选择退回类型" clearable>
              <el-option
                v-for="dict in dict.type.rollback_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="退回人" prop="rollbackUserId">
            <el-input
              v-model="queryParams.rollbackUserId"
              placeholder="请输入退回人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="销售进度" prop="saleProgress">
            <el-input
              v-model="queryParams.saleProgress"
              placeholder="请输入销售进度"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option
                v-for="dict in dict.type.zlf_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>





    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_exh:add']">新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['exhibitor:exhibitor_exh:edit']"
            >修改</el-button>
          </el-col> -->
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
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_exh:export']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="multipleTable" v-loading="loading" :data="exhibitor_exhList"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />

      <el-table-column label="展商状态" align="center" prop="determineRefuse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.exhibitor_status" :value="scope.row.determineRefuse" />
        </template>
      </el-table-column>

      <el-table-column label="所属展会" align="center" prop="params.exhName" />
      <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
      <el-table-column label="电话" align="center" prop="params.exhibitorTel" />
      <el-table-column label="公司网址" align="center" prop="params.exhibitorWeburl" />
      <el-table-column label="地址" align="center" prop="params.exhibitorAddress" />
      <el-table-column label="城市" align="center" prop="params.exhibitorCity" />
      <el-table-column label="传真" align="center" prop="params.exhibitorFax" />


      <!--
          <el-table-column label="展商ID" align="center" prop="exhibitorId" />
          <el-table-column label="展会ID" align="center" prop="exhId" />
          <el-table-column label="负责人ID" align="center" prop="userId" />
          <el-table-column label="展商来源" align="center" prop="exhibitorSource">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.exhibitor_source_type" :value="scope.row.exhibitorSource"/>
            </template>
          </el-table-column>
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
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_exh:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_exh:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />



    <div style="height: 20px;"></div>
    <!-- <div class="roww center_center">
      <el-checkbox-group v-model="checkList" @change="changeAll(exhibitor_exhList)">
          <el-checkbox label="选择全部"></el-checkbox>
        </el-checkbox-group>
        <div class="allline"></div>
    </div>
 -->




    <div class="roww center_center" style="margin-top: 20px;">
      <div style="margin-right: 15px;">加入到公海</div>
      <el-button type="primary" @click="isZSAlertClick">选择其他展商加入公海</el-button>
      <el-button type="primary" @click="isGetExhListsClick">从往届展会中选择展商加入到公海</el-button>
      <div style="flex:1;"></div>
    </div>


    <div class="roww center_center" style="margin-top: 20px;">
      <div style="margin-right: 15px;">加入招展工作台</div>



      <el-button style="margin-right: 15px;" type="primary" @click="getExhibitor_exhClick">加入潜在展商</el-button>
      <el-button type="primary" @click="delGonghai">从招展公海移除</el-button>
      <div style="flex:1;"></div>
    </div>

    <div class="roww center_center" style="margin-top: 20px;" v-hasRole="['manager']">
      <div style="margin-right: 15px;">(单人)数据分配给</div>
      <div style="margin-right: 15px;color: red;">

        <div @click="closeUserAlertClick(1)" v-if="selUserInfo.length">
          <div v-for="(item,index) in selUserInfo">
            {{item.nickName}}
          </div>
        </div>


        <div @click="closeUserAlertClick(1)" v-else>点击选择业务员</div>
      </div>
      <el-button style="margin-right: 15px;" type="primary" @click="distributeseaexhibitor_exhClick">确认分配</el-button>
      <div style="flex:1;"></div>
    </div>

    <div class="roww center_center allline" style="margin-top: 20px;" v-hasRole="['manager']">
      <div style="margin-right: 15px;">(多人)数据平均分配给</div>
      <div style="margin-right: 15px;color: red;">

        <div @click="closeUserAlertClick(2)" class="roww" v-if="selUserInfos.length">
          <div v-for="(item,index) in selUserInfos">
            {{item.nickName}},
          </div>
        </div>

        <div @click="closeUserAlertClick(2)" v-else>点击选择业务员</div>
      </div>
      <el-button style="margin-right: 15px;" type="primary" @click="distributeseaexhibitor_exhClick">确认分配</el-button>
      <div style="flex:1;"></div>
    </div>



    <!-- 添加或修改展商信息对话框 -->
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

          <!-- regionJson -->

          <el-select v-model="form.exhibitorProvince" placeholder="请选择" @change="shengChange">
            <el-option v-for="item in regionJsonData" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>


          <!-- <el-input v-model="form.exhibitorProvince" placeholder="请输入省份" /> -->
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
        <el-form-item label="所属代理" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入所属代理" />
        </el-form-item>
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
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value"
              :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入展商" :visible.sync="fileOpen" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="展商文件" prop="filePathIn">
          <file-upload :fileType="fileType" v-model="filePathIn" />
        </el-form-item>
        <el-form-item label="参考模板">
          <el-button type="text" @click="downLoadFile">模板下载</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_file">确 定</el-button>
        <el-button @click="cancel_fileopenCLick">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 获取用户列表 -->
    <GetUserList v-if="alertUserShow" :isSingle="isSingle" @getUserList="getUserList1" @close="closeUserAlertClick">
    </GetUserList>

    <!-- 获取展会列表 -->
    <GetExhLists v-if="isGetExhLists" @close="isGetExhListsClose" :exhibitorId="exhibitorId"
      @getSelExhInfo="getSelExhInfo1"></GetExhLists>
    <!-- 获取展商列表 -->
    <GetZhanshang v-if="isZSAlert" @close="closeGetZhanshang" @getSelZhanshang="getSelZhanshang"></GetZhanshang>

  </div>
</template>

<script>
  import {
    listExhibitor_info,
    getExhibitor_info,
    delExhibitor_info,
    addExhibitor_info,
    updateExhibitor_info,
    fileimportsea
  } from "@/api/exhibitor/exhibitor_info";

  import {
    listExhibitor_exh,
    takeseaexhibitor_exh,
    averageeaexhibitor_exh,
    listseaexhibitor_exh,
    exhibitor_exhseaput,
    addExhToBp,
    exhibitor_exhimport,
    getExhibitor_exh,
    delExhibitor_exh,
    addExhibitor_exh,
    updateExhibitor_exh,
    distributeseaexhibitor_exh,
    seaexhibitor_exhexhibitor,
    historylistexhibitor_exh,
    classificationexhId_liveimage
  } from "@/api/exhibitor/exhibitor_exh";




  import {
    listExh_category
  } from "@/api/exh/exh_category";


  import getSalesman from '@/components/getSalesman/getSalesman'

  import GetUserList from '@/components/GetUserList/GetUserList'

  // import regionJson from '@/src/utils/region.json';
  import regionJson from '@/utils/region.json'

  import GetZhanshang from '@/components/GetZhanshang/GetZhanshang'
  import GetExhLists from '@/components/GetExhLists/GetExhLists'

  export default {
    name: "Exhibitor_info",
    dicts: ['zlf_status', 'exhibitor_status', "exhibitor_source_type"],

    components: {
      getSalesman,
      GetUserList,
      GetZhanshang,
      GetExhLists,
    },

    data() {
      return {
        fileType: ["doc", "xls", 'xlsx', "ppt", "txt", "pdf"],
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
          exhName: "",
          tag1: null,
          tag2: null,
          params: {
            exhName: ''
          },
          exhibitorAddress: "",
          exhibitorProvince: "",
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
          exhibitorProvince: [{
            required: true,
            message: "省份不能为空",
            trigger: "blur"
          }],
          exhibitorCity: [{
            required: true,
            message: "城市不能为空",
            trigger: "blur"
          }],
          productCategory: [{
            required: true,
            message: "产品类别不能为空",
            trigger: "blur"
          }],

        },

        checkList: [], //选择列表

        // 选中的业务员列表
        alertUserShow: false, //
        selUserInfo: {}, //选择的业务员详情
        selUserInfos: [], //多选用户
        selExhList: [], //多选展会列表

        isSingle: false,

        fileOpen: false, //文件导入

        filePathIn: "", //文件导入地址存储
        categoryList: [], //分类列表


        regionJsonData: [], //地区列表
        cityListData: [], //城市列表


        isZSAlert: false,
        exhibitorId: "",
        isGetExhLists: false,

      };
    },
    created() {
      var selExhInfo = this.$cache.local.getJSON('selExhInfo');
      console.log("index", selExhInfo)
      if (!selExhInfo) {
        return false;
      }
      this.exhibitorId = selExhInfo.value.id + "";
      this.regionJsonData = regionJson;
      this.getList();
      this.getShopType();
    },
    methods: {

      // 展商加入到公海开始
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
      // 展商加入到公海结束



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
      // 下载文件
      downLoadFile() {
        console.log("downLoadFile")
        // https://frdzlfapi.zsyflive.com/profile/zhanshang.xlsx
        this.$download.resource("/profile/zhanshang.xlsx");
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
      // 文件关闭
      cancel_fileopenCLick() {
        this.fileOpen = false;
      },


      // 将展商分给其他业务员
      distributeseaexhibitor_exhClick() {
        var ids = this.ids;
        if (ids.length <= 0) {
          this.$modal.msgError("请选择展商");
          return false;
        }
        var selUserInfos = this.selUserInfos;
        var selUserInfo = this.selUserInfo;
        // if(!selUserInfo||!selUserInfo.userId){
        //   this.$modal.msgError("请选择业务员");
        //   return false;
        // }
        if (selUserInfos.length <= 0 && !this.isSingle) {
          this.$modal.msgError("请选择业务员");
          return false;
        }
        if (selUserInfo.length <= 0 && this.isSingle) {
          this.$modal.msgError("请选择业务员");
          return false;
        }

        var selExhList = this.selExhList;
        if (selExhList.length <= 0) {
          this.$modal.msgError("请选择展会");
          return false;
        }
        var ids = [];
        if (!this.isSingle) {
          for (var a = 0; a < selUserInfos.length; a++) {
            ids.push(selUserInfos[a].userId);
          }
        } else {
          for (var a = 0; a < selUserInfo.length; a++) {
            ids.push(selUserInfo[a].userId);
          }
        }


        var data = {
          // userId:selUserInfos[0].userId,
          params: {
            'exhibitors': selExhList,
            userIds: ids.join(",")
          }
        }
        this.$modal.loading("分配中，请稍后...");
        averageeaexhibitor_exh(data).then(response => {
          console.log("公海添加陈", response);
          if (response.code == 200) {
            this.$modal.closeLoading();
            this.$modal.msgSuccess("添加成功");
            this.getList()
          } else {
            this.$modal.msgSuccess(response.msg);
            this.$modal.closeLoading();
          }
        }).catch(() => {

        });;
      },
      // 领取公海中的展商  getExhibitor_exh
      getExhibitor_exhClick() {


        var ids = this.ids;
        if (ids.length <= 0) {
          this.$modal.msgError("请选择展商");
          return false;
        }
        var list = this.toIdsGetExhs();
        var data = {
          params: {
            'exhibitors': list,
          }
        }
        this.$modal.loading("领取中，请稍后...");
        takeseaexhibitor_exh(data).then(response => {
          console.log("公海添加陈", response);
          if (response.code == 200) {
            this.$modal.msgSuccess("添加成功");
            this.$modal.closeLoading();
            this.getList()
          } else {
            this.$modal.msgSuccess(response.msg);
          }
        });
      },

      // 通过ids获取
      toIdsGetExhs() {
        var ids = this.ids;
        var exhibitor_exhList = this.exhibitor_exhList;
        console.log("匹配的数据", ids, exhibitor_exhList);
        var list = [];
        for (var a = 0; a < ids.length; a++) {
          for (var b = 0; b < exhibitor_exhList.length; b++) {
            console.log("对比中", ids[a], exhibitor_exhList[b].id);
            if (ids[a] == exhibitor_exhList[b].id) {
              list.push(exhibitor_exhList[b]);
              break;
            }
          }
        }
        return list;
      },
      //删除展商公海展商
      delGonghai() {
        var ids = this.ids;
        if (ids.length <= 0) {
          this.$modal.msgError("请选择展商");
          return false;
        }
        this.handleDelete({});
      },
      // 关闭用户列表
      closeUserAlertClick(type) {
        if (!this.alertUserShow) {
          this.isSingle = (type == 1);
        }
        this.alertUserShow = !this.alertUserShow;

        console.log("alertUserShow", this.alertUserShow)


      },
      // 用户列表
      getUserList1(res) {
        console.log("获取的用户详情", res);
        if (this.isSingle) {
          this.selUserInfo = res;
        } else {
          this.selUserInfos = res;
        }
        this.alertUserShow = false;
      },

      // 选择全部
      changeAll(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      /** 查询展商展会关联列表 */
      getList() {
        this.getShopType()
        this.loading = true;
        var queryParams = this.queryParams;
        queryParams.params = {
          exhibitorName: queryParams.exhName,
          exhibitorAddress: queryParams.exhibitorAddress,
          exhibitorProvince: queryParams.exhibitorProvince,
          productCategory: queryParams.productCategory,
          tag1: queryParams.tag1,
          tag2: queryParams.tag2,
        }




        console.log("查询参数", queryParams);
        listseaexhibitor_exh(queryParams).then(response => {
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
        getUserList
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        console.log("多选框选中", selection)
        this.selExhList = selection;

        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
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
        console.log("修改按钮", row, row.exhibitorId)
        this.reset();
        const id = row.exhibitorId || this.ids
        console.log("修改按钮", row, row.exhibitorId)
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
              seaexhibitor_exhexhibitor(data).then(response => {
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
        this.$modal.confirm('是否确认删除展商展会关联编号为"' + ids + '"的数据项？').then(function() {
          return delExhibitor_exh(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        console.log("导入项目");
        this.fileOpen = true;
      },
      // 导入文件
      submitForm_file() {
        var filepath = this.filePathIn;
        if (filepath == '') {
          this.$modal.msgError("请选择展商文件");
          return false;
        }
        var data = {
          file: filepath,
        }
        this.$modal.loading("正在导入数据，请稍后...");
        fileimportsea(data).then(response => {
          this.$modal.closeLoading();
          if (response.code == 200) {
            this.$modal.msgSuccess("导入成功");
            this.fileOpen = false;
            setTimeout(res => {
              this.getList();
            }, 1000)
          } else {
            this.$modal.msgSuccess(res.msg);
          }
        }).catch(() => {
          this.$modal.closeLoading();
        });;
      }
    }
  };
</script>
