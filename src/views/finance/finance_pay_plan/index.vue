<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="所属展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入所属展会ID"
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
      </el-form-item>
      <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="付款计划名称" prop="planName">
        <el-input
          v-model="queryParams.planName"
          placeholder="请输入付款计划名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款比例(%)" prop="planPercent">
        <el-input
          v-model="queryParams.planPercent"
          placeholder="请输入付款比例(%)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款金额" prop="payAmount">
        <el-input
          v-model="queryParams.payAmount"
          placeholder="请输入付款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="截止日期" prop="planTime">
        <el-date-picker clearable
          v-model="queryParams.planTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择截止日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="付款状态" prop="planStatus">
        <el-select v-model="queryParams.planStatus" placeholder="请选择付款状态" clearable>
          <el-option
            v-for="dict in dict.type.pay_plan_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['finance:finance_pay_plan:add']"
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
          v-hasPermi="['finance:finance_pay_plan:edit']"
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
          v-hasPermi="['finance:finance_pay_plan:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['finance:finance_pay_plan:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="finance_pay_planList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="计划ID" align="center" prop="id" />
      <el-table-column label="所属展会ID" align="center" prop="exhId" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="展商ID" align="center" prop="exhibitorId" />
      <el-table-column label="付款计划名称" align="center" prop="planName" />
      <el-table-column label="付款比例(%)" align="center" prop="planPercent" />
      <el-table-column label="付款金额" align="center" prop="payAmount" />
      <el-table-column label="截止日期" align="center" prop="planTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.planTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款状态" align="center" prop="planStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pay_plan_status" :value="scope.row.planStatus"/>
        </template>
      </el-table-column>
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
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:finance_pay_plan:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['finance:finance_pay_plan:remove']"
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

    <!-- 添加或修改付款(回款)计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入所属展会ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="付款计划名称" prop="planName">
          <el-input v-model="form.planName" placeholder="请输入付款计划名称" />
        </el-form-item>
        <el-form-item label="付款比例(%)" prop="planPercent">
          <el-input v-model="form.planPercent" placeholder="请输入付款比例(%)" />
        </el-form-item>
        <el-form-item label="付款金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item label="截止日期" prop="planTime">
          <el-date-picker clearable
            v-model="form.planTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="付款状态">
          <el-radio-group v-model="form.planStatus">
            <el-radio
              v-for="dict in dict.type.pay_plan_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listFinance_pay_plan, getFinance_pay_plan, delFinance_pay_plan, addFinance_pay_plan, updateFinance_pay_plan } from "@/api/finance/finance_pay_plan";

export default {
  name: "Finance_pay_plan",
  dicts: ['pay_plan_status', 'zlf_status'],
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
      // 付款(回款)计划表格数据
      finance_pay_planList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhId: null,
        contractId: null,
        exhibitorId: null,
        planName: null,
        planPercent: null,
        payAmount: null,
        planTime: null,
        planStatus: null,
        memo: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        contractId: [
          { required: true, message: "合同ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询付款(回款)计划列表 */
    getList() {
      this.loading = true;
      listFinance_pay_plan(this.queryParams).then(response => {
        this.finance_pay_planList = response.rows;
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
        exhId: null,
        contractId: null,
        exhibitorId: null,
        planName: null,
        planPercent: null,
        payAmount: null,
        planTime: null,
        planStatus: "0",
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
      this.title = "添加付款(回款)计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFinance_pay_plan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改付款(回款)计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFinance_pay_plan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFinance_pay_plan(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除付款(回款)计划编号为"' + ids + '"的数据项？').then(function() {
        return delFinance_pay_plan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('finance/finance_pay_plan/export', {
        ...this.queryParams
      }, `finance_pay_plan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
