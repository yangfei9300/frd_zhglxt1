<template>
  <div class="app-container">
    <el-form :model="queryParams"
    ref="queryForm"
    size="small"
    :inline="true"
    v-show="showSearch"
    label-width="68px">
      <!-- <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同ID" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入合同ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="合同金额" prop="contractAmount">
        <el-input
          v-model="queryParams.contractAmount"
          placeholder="请输入合同金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票金额" prop="invoiceAmount">
        <el-input
          v-model="queryParams.invoiceAmount"
          placeholder="请输入开票金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="开票日期" prop="invoiceTime">
        <el-date-picker clearable
          v-model="queryParams.invoiceTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择开票日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开票类型" prop="invoiceType">
        <el-select v-model="queryParams.invoiceType" placeholder="请选择开票类型" clearable>
          <el-option
            v-for="dict in dict.type.invoice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="抬头类型" prop="titleType">
        <el-select v-model="queryParams.titleType" placeholder="请选择抬头类型" clearable>
          <el-option
            v-for="dict in dict.type.invoice_title_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="抬头名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入抬头名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="taxNumber">
        <el-input
          v-model="queryParams.taxNumber"
          placeholder="请输入纳税人识别号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入单位地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入电话号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户银行" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入开户银行"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行账户" prop="cardNo">
        <el-input
          v-model="queryParams.cardNo"
          placeholder="请输入银行账户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input
          v-model="queryParams.contactName"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="contactTel">
        <el-input
          v-model="queryParams.contactTel"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮寄地址" prop="contactCity">
        <el-input
          v-model="queryParams.contactCity"
          placeholder="请输入邮寄地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="contactAddress">
        <el-input
          v-model="queryParams.contactAddress"
          placeholder="请输入详细地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入经办人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票号码" prop="innvoiceNumber">
        <el-input
          v-model="queryParams.innvoiceNumber"
          placeholder="请输入发票号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际开票日期" prop="realDate">
        <el-input
          v-model="queryParams.realDate"
          placeholder="请输入实际开票日期"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物流单号" prop="logisticsNumber">
        <el-input
          v-model="queryParams.logisticsNumber"
          placeholder="请输入物流单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票状态" prop="invoiceStatus">
        <el-select v-model="queryParams.invoiceStatus" placeholder="请选择发票状态" clearable>
          <el-option
            v-for="dict in dict.type.invoice_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态" prop="examineStatus">
        <el-select v-model="queryParams.examineStatus" placeholder="请选择审核状态" clearable>
          <el-option
            v-for="dict in dict.type.examine_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="examineUser">
        <el-input
          v-model="queryParams.examineUser"
          placeholder="请输入审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核意见" prop="examineOpinion">
        <el-input
          v-model="queryParams.examineOpinion"
          placeholder="请输入审核意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
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
          v-hasPermi="['finance:finance_invoice_record:add']"
        >新增</el-button>
      </el-col>
      <!-- 
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['finance:finance_invoice_record:edit']"
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
          v-hasPermi="['finance:finance_invoice_record:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['finance:finance_invoice_record:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="finance_invoice_recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="id" />
      <el-table-column label="展商ID" align="center" prop="exhibitorId" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="合同金额" align="center" prop="contractAmount" />
      <el-table-column label="开票金额" align="center" prop="invoiceAmount" />
      <el-table-column label="开票日期" align="center" prop="invoiceTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.invoiceTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开票类型" align="center" prop="invoiceType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.invoice_type" :value="scope.row.invoiceType"/>
        </template>
      </el-table-column>
      <el-table-column label="抬头类型" align="center" prop="titleType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.invoice_title_type" :value="scope.row.titleType"/>
        </template>
      </el-table-column>
      <el-table-column label="抬头名称" align="center" prop="title" />
      <el-table-column label="纳税人识别号" align="center" prop="taxNumber" />
      <el-table-column label="单位地址" align="center" prop="address" />
      <el-table-column label="电话号码" align="center" prop="tel" />
      <el-table-column label="开户银行" align="center" prop="bankName" />
      <el-table-column label="银行账户" align="center" prop="cardNo" />
      <el-table-column label="联系人" align="center" prop="contactName" />
      <el-table-column label="联系方式" align="center" prop="contactTel" />
      <el-table-column label="邮寄地址" align="center" prop="contactCity" />
      <el-table-column label="详细地址" align="center" prop="contactAddress" />
      <el-table-column label="经办人" align="center" prop="userId" />
      <el-table-column label="发票号码" align="center" prop="innvoiceNumber" />
      <el-table-column label="实际开票日期" align="center" prop="realDate" />
      <el-table-column label="物流单号" align="center" prop="logisticsNumber" />
      <el-table-column label="发票状态" align="center" prop="invoiceStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.invoice_status" :value="scope.row.invoiceStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="examineStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center" prop="examineUser" />
      <el-table-column label="审核意见" align="center" prop="examineOpinion" />
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
       <!--
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:finance_invoice_record:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['finance:finance_invoice_record:remove']"
          >删除</el-button>
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

    <!-- 添加或修改开票记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <!-- <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item> -->
        <el-form-item label="合同金额" prop="contractAmount">
          <el-input v-model="form.contractAmount" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="开票金额" prop="invoiceAmount">
          <el-input v-model="form.invoiceAmount" placeholder="请输入开票金额" />
        </el-form-item>
        <el-form-item label="开票日期" prop="invoiceTime">
          <el-date-picker clearable
            v-model="form.invoiceTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开票类型" prop="invoiceType">
          <el-select v-model="form.invoiceType" placeholder="请选择开票类型">
            <el-option
              v-for="dict in dict.type.invoice_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抬头类型" prop="titleType">
          <el-select v-model="form.titleType" placeholder="请选择抬头类型">
            <el-option
              v-for="dict in dict.type.invoice_title_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抬头名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入抬头名称" />
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="taxNumber">
          <el-input v-model="form.taxNumber" placeholder="请输入纳税人识别号" />
        </el-form-item>
        <el-form-item label="单位地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入单位地址" />
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" />
        </el-form-item>
        <el-form-item label="银行账户" prop="cardNo">
          <el-input v-model="form.cardNo" placeholder="请输入银行账户" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contactTel">
          <el-input v-model="form.contactTel" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="邮寄地址" prop="contactCity">
          <el-input v-model="form.contactCity" placeholder="请输入邮寄地址" />
        </el-form-item>
        <el-form-item label="详细地址" prop="contactAddress">
          <el-input v-model="form.contactAddress" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="经办人" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入经办人" />
        </el-form-item>
        <el-form-item label="发票号码" prop="innvoiceNumber">
          <el-input v-model="form.innvoiceNumber" placeholder="请输入发票号码" />
        </el-form-item>
        <el-form-item label="实际开票日期" prop="realDate">
          <el-input v-model="form.realDate" placeholder="请输入实际开票日期" />
        </el-form-item>
        <el-form-item label="物流单号" prop="logisticsNumber">
          <el-input v-model="form.logisticsNumber" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="发票状态">
          <el-radio-group v-model="form.invoiceStatus">
            <el-radio
              v-for="dict in dict.type.invoice_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.examineStatus">
            <el-radio
              v-for="dict in dict.type.examine_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人" prop="examineUser">
          <el-input v-model="form.examineUser" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核意见" prop="examineOpinion">
          <el-input v-model="form.examineOpinion" placeholder="请输入审核意见" />
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
  </div>
</template>

<script>
import { listFinance_invoice_record, getFinance_invoice_record, delFinance_invoice_record, addFinance_invoice_record, updateFinance_invoice_record } from "@/api/finance/finance_invoice_record";

export default {
  name: "Finance_invoice_record",
  dicts: ['examine_status', 'invoice_status', 'invoice_type', 'invoice_title_type', 'zlf_status'],
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
      // 开票记录表格数据
      finance_invoice_recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhibitorId: null,
        contractId: null,
        contractAmount: null,
        invoiceAmount: null,
        invoiceTime: null,
        invoiceType: null,
        titleType: null,
        title: null,
        taxNumber: null,
        address: null,
        tel: null,
        bankName: null,
        cardNo: null,
        contactName: null,
        contactTel: null,
        contactCity: null,
        contactAddress: null,
        userId: null,
        innvoiceNumber: null,
        realDate: null,
        logisticsNumber: null,
        invoiceStatus: null,
        examineStatus: null,
        examineUser: null,
        examineOpinion: null,
        memo: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exhibitorId: [
          { required: true, message: "展商ID不能为空", trigger: "blur" }
        ],
        contractId: [
          { required: true, message: "合同ID不能为空", trigger: "blur" }
        ],
        invoiceType: [
          { required: true, message: "开票类型不能为空", trigger: "change" }
        ],
        titleType: [
          { required: true, message: "抬头类型不能为空", trigger: "change" }
        ],
        title: [
          { required: true, message: "抬头名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询开票记录列表 */
    getList() {
      this.loading = true;
      listFinance_invoice_record(this.queryParams).then(response => {
        this.finance_invoice_recordList = response.rows;
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
        contractId: null,
        contractAmount: null,
        invoiceAmount: null,
        invoiceTime: null,
        invoiceType: null,
        titleType: null,
        title: null,
        taxNumber: null,
        address: null,
        tel: null,
        bankName: null,
        cardNo: null,
        contactName: null,
        contactTel: null,
        contactCity: null,
        contactAddress: null,
        userId: null,
        innvoiceNumber: null,
        realDate: null,
        logisticsNumber: null,
        invoiceStatus: "0",
        examineStatus: "0",
        examineUser: null,
        examineOpinion: null,
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
      this.title = "添加开票记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFinance_invoice_record(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改开票记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFinance_invoice_record(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFinance_invoice_record(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除开票记录编号为"' + ids + '"的数据项？').then(function() {
        return delFinance_invoice_record(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('finance/finance_invoice_record/export', {
        ...this.queryParams
      }, `finance_invoice_record_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
