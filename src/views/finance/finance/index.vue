<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
     <!-- <el-form-item label="付款记录ID" prop="recordId">
        <el-input
          v-model="queryParams.recordId"
          placeholder="请输入付款记录ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入所属展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="展商名称" prop="params.exhibitorName">
        <el-input
          v-model="queryParams.params.exhibitorName"
          placeholder="请输入展商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="合同ID" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入合同ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="认领人" prop="userId">
        <!-- <el-input
          v-model="queryParams.userId"
          placeholder="请输入认领人"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
 
        <el-select v-model="queryParams.userId" placeholder="请选择认领人" clearable>
          <el-option v-for="dict in listuserfinanceList" :key="dict.id" :label="dict.nickName"
            :value="dict.id" />
        </el-select>

      </el-form-item>
      <!-- <el-form-item label="认领金额" prop="claimAmount">
        <el-input
          v-model="queryParams.claimAmount"
          placeholder="请输入认领金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="认领时间" prop="claimTime">
        <el-date-picker clearable
          v-model="queryParams.claimTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择认领时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['finance:finance:add']"
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
          v-hasPermi="['finance:finance:edit']"
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
          v-hasPermi="['finance:finance:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['finance:finance:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="financeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="付款记录ID" align="center" prop="recordId" />
      <el-table-column label="所属展会" align="center" prop="params.exhName" />
      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="认领人" align="center" prop="params.nickName" />
      <el-table-column label="认领金额" align="center" prop="claimAmount" />
      <el-table-column label="认领时间" align="center" prop="claimTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.claimTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="状态" align="center" prop="status" />
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
            v-hasPermi="['finance:finance:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['finance:finance:remove']"
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

    <!-- 添加或修改付款认领记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="付款记录ID" prop="recordId">
          <el-input v-model="form.recordId" placeholder="请输入付款记录ID" />
        </el-form-item>
        <el-form-item label="所属展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入所属展会ID" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="认领人" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入认领人" />
        </el-form-item>
        <el-form-item label="认领金额" prop="claimAmount">
          <el-input v-model="form.claimAmount" placeholder="请输入认领金额" />
        </el-form-item>
        <el-form-item label="认领时间" prop="claimTime">
          <el-date-picker clearable
            v-model="form.claimTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择认领时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
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
import { listFinance,listuserfinance, getFinance, delFinance, addFinance, updateFinance } from "@/api/finance/finance";

export default {
  name: "Finance",
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
      // 付款认领记录表格数据
      financeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        recordId: null,
        exhId: null,
        exhibitorId: null,
        contractId: null,
        userId: null,
        claimAmount: null,
        claimTime: null,
        memo: null,
        status: null,
        params:{
          exhibitorName:""
        }
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      listuserfinanceList:[],//业务员列表
    };
  },
  created() {
    this.getList();
    this.listuserfinanceGet();
  },
  methods: {
    // 获取业务员列表 listuserfinance
    listuserfinanceGet(){
      listuserfinance({}).then(response => {
        this.listuserfinanceList = response.data;
        console.log("业务员列表",this.listuserfinanceList)
      });
    },
    /** 查询付款认领记录列表 */
    getList() {
      this.loading = true;
      listFinance(this.queryParams).then(response => {
        this.financeList = response.rows;
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
        recordId: null,
        exhId: null,
        exhibitorId: null,
        contractId: null,
        userId: null,
        claimAmount: null,
        claimTime: null,
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
      console.log("sousuo 字段",this.queryParams)
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
      this.title = "添加付款认领记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFinance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改付款认领记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFinance(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFinance(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除付款认领记录编号为"' + ids + '"的数据项？').then(function() {
        return delFinance(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('finance/finance/export', {
        ...this.queryParams
      }, `finance_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
