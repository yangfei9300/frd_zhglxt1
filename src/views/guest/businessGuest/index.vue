<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="观众姓名" prop="visitorName">
        <el-input v-model="queryParams.visitorName" placeholder="请输入观众姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="性别" prop="visitorGender">
        <el-select v-model="queryParams.visitorGender" placeholder="请选择性别" clearable>
          <el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入公司名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="职务" prop="visitorPost">
        <el-input v-model="queryParams.visitorPost" placeholder="请输入职务" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="地址" prop="visitorAddress">
        <el-input v-model="queryParams.visitorAddress" placeholder="请输入地址" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="手机号" prop="visitorPhone">
        <el-input v-model="queryParams.visitorPhone" placeholder="请输入手机号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="所属行业" prop="industryId">
        <el-input v-model="queryParams.industryId" placeholder="请输入所属行业" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="所属行业" prop="industryType">
        <el-select v-model="queryParams.industryType" placeholder="请选择所属行业" clearable>
          <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="信息来源类别" prop="sourceType">
        <el-select v-model="queryParams.sourceType" placeholder="请选择信息来源类别" clearable>
          <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="信息来源名称" prop="industryId">
        <el-input v-model="queryParams.sourceName" placeholder="请输入信息来源名称"
        clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="备注" prop="memo">
        <el-input v-model="queryParams.memo" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['guest:businessGuest:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['guest:businessGuest:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['guest:businessGuest:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['guest:businessGuest:export']">导出</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="primary" plain  icon="el-icon-plus"  size="mini" @click="openAlertUpload"
        >商协会嘉宾导入</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="businessGuestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众姓名" align="center" prop="visitorName" />
      <el-table-column label="观众英文姓名" align="center" prop="visitorEname" />
      <el-table-column label="性别" align="center" prop="visitorGender" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="职务" align="center" prop="visitorPost" />
      <el-table-column label="地址" align="center" prop="visitorAddress" />
      <el-table-column label="手机号" align="center" prop="visitorPhone" />
      <el-table-column label="标签一" align="center" prop="tag1" />
      <el-table-column label="标签二" align="center" prop="tag2" />
      <el-table-column label="所属行业" align="center" prop="industryType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.industry_type" :value="scope.row.industryType" />
        </template>
      </el-table-column>
      <el-table-column label="经营品类" align="center" prop="businessCategory" />
      <el-table-column label="经营品类" align="center" prop="businessCategory2" />
      <el-table-column label="信息来源类别" align="center" prop="sourceType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.visitor_source_type" :value="scope.row.sourceType" />
        </template>
      </el-table-column>
      <el-table-column label="信息来源名称" align="center" prop="sourceName" />
      <el-table-column label="企业规模" align="center" prop="companyScale" />
      <el-table-column label="备注" align="center" prop="memo" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['guest:businessGuest:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['guest:businessGuest:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />

    <!-- 添加或修改商协会嘉宾对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="观众姓名" prop="visitorName">
          <el-input v-model="form.visitorName" placeholder="请输入观众姓名" />
        </el-form-item>
        <el-form-item label="观众英文姓名" prop="visitorEname">
          <el-input v-model="form.visitorEname" placeholder="请输入观众英文姓名" />
        </el-form-item>
        <el-table-column label="性别" align="center" prop="visitorGender">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.visitorGender" />
          </template>
        </el-table-column>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="visitorDepartment">
          <el-input v-model="form.visitorDepartment" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="职务" prop="visitorPost">
          <el-input v-model="form.visitorPost" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="国家" prop="visitorCountry">
          <el-input v-model="form.visitorCountry" placeholder="请输入国家" />
        </el-form-item>
        <el-form-item label="省份" prop="visitorProvince">
          <el-input v-model="form.visitorProvince" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="visitorCity">
          <el-input v-model="form.visitorCity" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="地址" prop="visitorAddress">
          <el-input v-model="form.visitorAddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="英文地址" prop="visitorEaddress">
          <el-input v-model="form.visitorEaddress" placeholder="请输入英文地址" />
        </el-form-item>
        <el-form-item label="邮编" prop="visitorZipcode">
          <el-input v-model="form.visitorZipcode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="电话" prop="visitorTel">
          <el-input v-model="form.visitorTel" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="手机号" prop="visitorPhone">
          <el-input v-model="form.visitorPhone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="传真" prop="visitorFax">
          <el-input v-model="form.visitorFax" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="Email" prop="visitorEmail">
          <el-input v-model="form.visitorEmail" placeholder="请输入Email" />
        </el-form-item>
        <el-form-item label="QQ" prop="visitorQq">
          <el-input v-model="form.visitorQq" placeholder="请输入QQ" />
        </el-form-item>
        <el-form-item label="微信" prop="visitorWechat">
          <el-input v-model="form.visitorWechat" placeholder="请输入微信" />
        </el-form-item>
        <el-form-item label="微信unionid" prop="unionid">
          <el-input v-model="form.unionid" placeholder="请输入微信unionid" />
        </el-form-item>
        <el-form-item label="微信头像" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入微信头像" />
        </el-form-item>
        <el-form-item label="其他联系方式" prop="visitorOther">
          <el-input v-model="form.visitorOther" placeholder="请输入其他联系方式" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="网址" prop="visitorWeburl">
          <el-input v-model="form.visitorWeburl" placeholder="请输入网址" />
        </el-form-item>
        <el-form-item label="所属行业" prop="industryId">
          <el-input v-model="form.industryId" placeholder="请输入所属行业" />
        </el-form-item>
        <el-form-item label="产品类别" prop="productCategory">
          <el-input v-model="form.productCategory" placeholder="请输入产品类别" />
        </el-form-item>
        <el-form-item label="岗位职责" prop="jobResp">
          <el-input v-model="form.jobResp" placeholder="请输入岗位职责" />
        </el-form-item>
        <el-form-item label="工作性质" prop="jobNature">
          <el-input v-model="form.jobNature" placeholder="请输入工作性质" />
        </el-form-item>
        <el-form-item label="人员级别" prop="visitorLevel">
          <el-input v-model="form.visitorLevel" placeholder="请输入人员级别" />
        </el-form-item>
        <el-form-item label="推荐人" prop="referrer">
          <el-input v-model="form.referrer" placeholder="请输入推荐人" />
        </el-form-item>
        <el-form-item label="标签一" prop="tag1">
          <el-input v-model="form.tag1" placeholder="请输入标签一" />
        </el-form-item>
        <el-form-item label="标签二" prop="tag2">
          <el-input v-model="form.tag2" placeholder="请输入标签二" />
        </el-form-item>
        <el-form-item label="所属行业" prop="industryType">
          <el-select v-model="form.industryType" placeholder="请选择所属行业">
            <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经营品类" prop="businessCategory">
          <el-input v-model="form.businessCategory" placeholder="请输入经营品类" />
        </el-form-item>
        <el-form-item label="经营品类" prop="businessCategory2">
          <el-input v-model="form.businessCategory2" placeholder="请输入经营品类" />
        </el-form-item>
        <el-form-item label="信息来源类别" prop="sourceType">
          <el-select v-model="form.sourceType" placeholder="请选择信息来源类别">
            <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息来源名称" prop="sourceName">
          <el-input v-model="form.sourceName" placeholder="请输入信息来源名称" />
        </el-form-item>
        <el-form-item label="企业规模" prop="companyScale">
          <el-input v-model="form.companyScale" placeholder="请输入企业规模" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建人ID" prop="creatorId">
          <el-input v-model="form.creatorId" placeholder="请输入创建人ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>









    <!-- 用户导入对话框 -->
    <el-dialog
    :title="upload.title"
    :visible.sync="upload.open"
    width="400px"
    append-to-body
    >
      <div class="roww center_center">
        <div>选择行业</div>
        <div style="width: 20px;"></div>
        <el-select v-model="upload.industryType" placeholder="请选择行业" clearable>
          <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
        </el-select>
        <div class="allline"></div>
      </div>
      <div style="height: 20px;"></div>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport+'&industryType='+upload.industryType" :disabled="upload.isUploading"
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
import { listBusinessGuest, getBusinessGuest, delBusinessGuest, addBusinessGuest, updateBusinessGuest } from '@/api/guest/businessGuest';
 import {
    getToken
  } from "@/utils/auth";
export default {
  name: 'BusinessGuest',
  dicts: ['industry_type', 'zlf_status', 'visitor_source_type', 'sys_user_sex'],
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
      // 商协会嘉宾表格数据
      businessGuestList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        visitorName: null,
        visitorEname: null,
        visitorGender: null,
        companyName: null,
        exhibitorId: null,
        idNumber: null,
        visitorDepartment: null,
        visitorPost: null,
        visitorCountry: null,
        visitorProvince: null,
        visitorCity: null,
        visitorAddress: null,
        visitorEaddress: null,
        visitorZipcode: null,
        visitorTel: null,
        visitorPhone: null,
        visitorFax: null,
        visitorEmail: null,
        visitorQq: null,
        visitorWechat: null,
        unionid: null,
        avatar: null,
        visitorOther: null,
        userName: null,
        password: null,
        visitorWeburl: null,
        industryId: null,
        productCategory: null,
        jobResp: null,
        jobNature: null,
        visitorType: null,
        visitorLevel: null,
        referrer: null,
        tag1: null,
        tag2: null,
        industryType: null,
        businessCategory: null,
        businessCategory2: null,
        sourceType: null,
        sourceName: null,
        companyScale: null,
        memo: null,
        status: null,
        creatorId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},

      // 若以版本导入
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        industryType:"",//h行业
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {
          Authorization: "Bearer " + getToken()
        },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/guest/businessGuest/importData",
      },

    };
  },
  created() {
    this.getList();
  },
  methods: {

    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('/api/visitor/data/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`)
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
    openAlertUpload(){
     this.upload.open=!this.upload.open;
    },
    // ----------------------------------------------











    /** 查询商协会嘉宾列表 */
    getList() {
      this.loading = true;
      listBusinessGuest(this.queryParams).then((response) => {
        this.businessGuestList = response.rows;
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
        visitorName: null,
        visitorEname: null,
        visitorGender: null,
        companyName: null,
        exhibitorId: null,
        idNumber: null,
        visitorDepartment: null,
        visitorPost: null,
        visitorCountry: null,
        visitorProvince: null,
        visitorCity: null,
        visitorAddress: null,
        visitorEaddress: null,
        visitorZipcode: null,
        visitorTel: null,
        visitorPhone: null,
        visitorFax: null,
        visitorEmail: null,
        visitorQq: null,
        visitorWechat: null,
        unionid: null,
        avatar: null,
        visitorOther: null,
        userName: null,
        password: null,
        visitorWeburl: null,
        industryId: null,
        productCategory: null,
        jobResp: null,
        jobNature: null,
        visitorType: null,
        visitorLevel: null,
        referrer: null,
        tag1: null,
        tag2: null,
        industryType: null,
        businessCategory: null,
        businessCategory2: null,
        sourceType: null,
        sourceName: null,
        companyScale: null,
        memo: null,
        status: '0',
        delFlag: null,
        version: null,
        createBy: null,
        creatorId: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm('form');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加商协会嘉宾';
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBusinessGuest(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = '修改商协会嘉宾';
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateBusinessGuest(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addBusinessGuest(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功');
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
      this.$modal
        .confirm('是否确认删除商协会嘉宾编号为"' + ids + '"的数据项？')
        .then(function () {
          return delBusinessGuest(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'guest/businessGuest/export',
        {
          ...this.queryParams
        },
        `businessGuest_${new Date().getTime()}.xlsx`
      );
    }
  }
};
</script>
