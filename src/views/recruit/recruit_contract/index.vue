<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同名称" prop="contractName">
        <el-input
          v-model="queryParams.contractName"
          placeholder="请输入合同名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

     <!-- <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="业务员ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入业务员ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展商联系人ID" prop="contactId">
        <el-input
          v-model="queryParams.contactId"
          placeholder="请输入展商联系人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地址" prop="customerAddress">
        <el-input
          v-model="queryParams.customerAddress"
          placeholder="请输入地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="customerPerson">
        <el-input
          v-model="queryParams.customerPerson"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="customerTel">
        <el-input
          v-model="queryParams.customerTel"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真" prop="customerFax">
        <el-input
          v-model="queryParams.customerFax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同时间" prop="contractTime">
        <el-date-picker clearable
          v-model="queryParams.contractTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择合同时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目总金额" prop="contentTotal">
        <el-input
          v-model="queryParams.contentTotal"
          placeholder="请输入项目总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册费" prop="registerCost">
        <el-input
          v-model="queryParams.registerCost"
          placeholder="请输入注册费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同总金额" prop="totalRmb">
        <el-input
          v-model="queryParams.totalRmb"
          placeholder="请输入合同总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="折扣(%)" prop="discount">
        <el-input
          v-model="queryParams.discount"
          placeholder="请输入折扣(%)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抹零抵扣" prop="moling">
        <el-input
          v-model="queryParams.moling"
          placeholder="请输入抹零抵扣"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠后总价" prop="afterDiscount">
        <el-input
          v-model="queryParams.afterDiscount"
          placeholder="请输入优惠后总价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已收金额" prop="receivedAmount">
        <el-input
          v-model="queryParams.receivedAmount"
          placeholder="请输入已收金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同附注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入合同附注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否双届合同" prop="isTwo">
        <el-select v-model="queryParams.isTwo" placeholder="请选择是否双届合同" clearable>
          <el-option
            v-for="dict in dict.type.biz_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同模版ID" prop="templateId">
        <el-input
          v-model="queryParams.templateId"
          placeholder="请输入合同模版ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="审核状态" prop="examineStatus">
        <el-select v-model="queryParams.examineStatus" placeholder="请选择审核状态" clearable>
          <el-option
            v-for="dict in dict.type.examine_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="审核人" prop="examineUser">
        <el-input
          v-model="queryParams.examineUser"
          placeholder="请输入审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同状态" prop="contractStatus">
        <el-select v-model="queryParams.contractStatus" placeholder="请选择合同状态" clearable>
          <el-option
            v-for="dict in dict.type.contract_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="发票状态" prop="ifInvoice">
        <el-select v-model="queryParams.ifInvoice" placeholder="请选择发票状态" clearable>
          <el-option
            v-for="dict in dict.type.invoice_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['recruit:recruit_contract:add']"
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
          v-hasPermi="['recruit:recruit_contract:edit']"
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
          v-hasPermi="['recruit:recruit_contract:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['recruit:recruit_contract:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="recruit_contractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="合同名称" align="center" prop="contractName" />
     <el-table-column label="创建时间" align="center" prop="createTime" width="180">
       <template slot-scope="scope">
         <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
       </template>
     </el-table-column>
      <el-table-column label="合同总金额" align="center" prop="totalRmb" />
      <el-table-column label="已收金额" align="center" prop="receivedAmount" />
      <!-- 客户名称 -->
      <!-- <el-table-column label="所属展商" align="center" prop="customerName" /> -->
     <!-- <el-table-column label="生成合同文件" align="center" prop="file" /> -->

     <el-table-column label="发票状态" align="center" prop="ifInvoice">
       <template slot-scope="scope">
         <dict-tag :options="dict.type.invoice_status" :value="scope.row.ifInvoice"/>
       </template>
     </el-table-column>

      <el-table-column label="负责人" align="center" prop="params.nickName" />
      <el-table-column label="生成合同文件" align="center" prop="file">
        <template slot-scope="scope">
          <div>
            <div style="color:#1890ff;" @click="downLoadFile(scope.row.file)">下载附件</div>
          </div>
        </template>
      </el-table-column>


      <!-- <el-table-column label="合同编号" align="center" prop="id" />

      <el-table-column label="展会ID" align="center" prop="exhId" />
      <el-table-column label="业务员ID" align="center" prop="userId" />
      <el-table-column label="展商联系人ID" align="center" prop="contactId" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="地址" align="center" prop="customerAddress" />
      <el-table-column label="联系人" align="center" prop="customerPerson" />
      <el-table-column label="电话" align="center" prop="customerTel" />
      <el-table-column label="传真" align="center" prop="customerFax" />
      <el-table-column label="合同时间" align="center" prop="contractTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.contractTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目总金额" align="center" prop="contentTotal" />
      <el-table-column label="注册费" align="center" prop="registerCost" />
      <el-table-column label="合同总金额" align="center" prop="totalRmb" />
      <el-table-column label="折扣(%)" align="center" prop="discount" />
      <el-table-column label="抹零抵扣" align="center" prop="moling" />
      <el-table-column label="优惠后总价" align="center" prop="afterDiscount" />
      <el-table-column label="已收金额" align="center" prop="receivedAmount" />
      <el-table-column label="合同附注" align="center" prop="memo" />
      <el-table-column label="是否双届合同" align="center" prop="isTwo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.biz_yes_no" :value="scope.row.isTwo"/>
        </template>
      </el-table-column>
      <el-table-column label="合同模版ID" align="center" prop="templateId" />
      <el-table-column label="审核状态" align="center" prop="examineStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center" prop="examineUser" />
      <el-table-column label="生成合同文件" align="center" prop="file" />
      <el-table-column label="回传合同附件" align="center" prop="uploadFile" />
      <el-table-column label="合同状态" align="center" prop="contractStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.contract_status" :value="scope.row.contractStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="发票状态" align="center" prop="ifInvoice">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.invoice_status" :value="scope.row.ifInvoice"/>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" /> -->

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['recruit:recruit_contract:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['recruit:recruit_contract:edit']"
          >回传</el-button> -->
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['recruit:recruit_contract:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同名称" prop="contractName">
          <el-input disabled  v-model="form.contractName" placeholder="请输入合同名称" />
        </el-form-item>
        <!-- <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="业务员ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入业务员ID" />
        </el-form-item>
        <el-form-item label="展商联系人ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入展商联系人ID" />
        </el-form-item> -->
        <el-form-item label="客户名称" prop="customerName">
          <el-input disabled  v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="地址" prop="customerAddress">
          <el-input disabled  v-model="form.customerAddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="联系人" prop="customerPerson">
          <el-input disabled  v-model="form.customerPerson" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="电话" prop="customerTel">
          <el-input disabled  v-model="form.customerTel" placeholder="请输入电话" />
        </el-form-item>
        <!-- <el-form-item label="传真" prop="customerFax">
          <el-input v-model="form.customerFax" placeholder="请输入传真" />
        </el-form-item> -->

        <!-- <el-form-item label="合同时间" prop="contractTime">
          <el-date-picker clearable
            v-model="form.contractTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择合同时间">
          </el-date-picker>
        </el-form-item> -->

        <el-form-item label="项目总金额" prop="contentTotal">
          <el-input disabled   v-model="form.contentTotal" placeholder="请输入项目总金额" />
        </el-form-item>
        <el-form-item label="注册费" prop="registerCost">
          <el-input disabled   v-model="form.registerCost" placeholder="请输入注册费" />
        </el-form-item>
        <el-form-item label="合同总金额" prop="totalRmb">
          <el-input disabled  v-model="form.totalRmb" placeholder="请输入合同总金额" />
        </el-form-item>
        <el-form-item label="折扣(%)" prop="discount">
          <el-input disabled   v-model="form.discount" placeholder="请输入折扣(%)" />
        </el-form-item>
        <el-form-item   label="抹零抵扣" prop="moling">
          <el-input disabled v-model="form.moling" placeholder="请输入抹零抵扣" />
        </el-form-item>
        <el-form-item   label="优惠后总价" prop="afterDiscount">
          <el-input disabled v-model="form.afterDiscount" placeholder="请输入优惠后总价" />
        </el-form-item>
        <el-form-item label="已收金额" prop="receivedAmount">
          <el-input disabled v-model="form.receivedAmount" placeholder="请输入已收金额" />
        </el-form-item>
        <el-form-item label="合同附注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入合同附注" />
        </el-form-item>
        <!-- <el-form-item label="是否双届合同">
          <el-radio-group v-model="form.isTwo">
            <el-radio
              v-for="dict in dict.type.biz_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
       <!-- <el-form-item label="合同模版ID" prop="templateId">
          <el-input v-model="form.templateId" placeholder="请输入合同模版ID" />
        </el-form-item> -->
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.examineStatus">
            <el-radio
              v-for="dict in dict.type.examine_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      <!--  <el-form-item label="审核人" prop="examineUser">
          <el-input v-model="form.examineUser" placeholder="请输入审核人" />
        </el-form-item> -->
<!--        <el-form-item label="生成合同文件">
          <file-upload v-model="form.file"/>
        </el-form-item> -->
        <!-- <el-form-item label="回传合同附件">
          <file-upload v-model="form.uploadFile"/>
        </el-form-item> -->
        <!-- <el-form-item label="合同状态">
          <el-radio-group v-model="form.contractStatus">
            <el-radio
              v-for="dict in dict.type.contract_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="发票状态">
          <el-radio-group v-model="form.ifInvoice">
            <el-radio
              v-for="dict in dict.type.invoice_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
       <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.zlf_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRecruit_contract, getRecruit_contract, delRecruit_contract, addRecruit_contract, updateRecruit_contract } from "@/api/recruit/recruit_contract";

export default {
  name: "Recruit_contract",
  dicts: ['examine_status', 'invoice_status', 'zlf_status', 'biz_yes_no', 'contract_status'],
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
      // 合同表格数据
      recruit_contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractName: null,
        exhibitorId: null,
        exhId: null,
        userId: null,
        contactId: null,
        customerName: null,
        customerAddress: null,
        customerPerson: null,
        customerTel: null,
        customerFax: null,
        contractTime: null,
        contentTotal: null,
        registerCost: null,
        totalRmb: null,
        discount: null,
        moling: null,
        afterDiscount: null,
        receivedAmount: null,
        memo: null,
        isTwo: null,
        templateId: null,
        examineStatus: null,
        examineUser: null,
        file: null,
        uploadFile: null,
        contractStatus: null,
        ifInvoice: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exhibitorId: [
          { required: true, message: "展商ID不能为空", trigger: "blur" }
        ],
        exhId: [
          { required: true, message: "展会ID不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "业务员ID不能为空", trigger: "blur" }
        ],
        contactId: [
          { required: true, message: "展商联系人ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 下载合同
    downLoadFile(row){
      console.log("下载合同",row)
      this.$download.resource(row);
        // this.$download.resource(row.filePath);
    },
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listRecruit_contract(this.queryParams).then(response => {
        this.recruit_contractList = response.rows;
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
        contractName: null,
        exhibitorId: null,
        exhId: null,
        userId: null,
        contactId: null,
        customerName: null,
        customerAddress: null,
        customerPerson: null,
        customerTel: null,
        customerFax: null,
        contractTime: null,
        contentTotal: null,
        registerCost: null,
        totalRmb: null,
        discount: null,
        moling: null,
        afterDiscount: null,
        receivedAmount: null,
        memo: null,
        isTwo: "0",
        templateId: null,
        examineStatus: "0",
        examineUser: null,
        file: null,
        uploadFile: null,
        contractStatus: "0",
        ifInvoice: "0",
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
      this.title = "添加合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {

      console.log("修改按钮",row)

      this.reset();
      const id = row.id || this.ids
      getRecruit_contract(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecruit_contract(this.form).then(response => {
              this.$modal.msgSuccess("回传成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecruit_contract(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除合同编号为"' + ids + '"的数据项？').then(function() {
        return delRecruit_contract(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/recruit_contract/export', {
        ...this.queryParams
      }, `recruit_contract_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
