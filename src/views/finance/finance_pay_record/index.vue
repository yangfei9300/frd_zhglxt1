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
      <el-form-item label="展商ID" prop="exhibitorId">
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
      <el-form-item label="付款公司" prop="payCompany">
        <el-input v-model="queryParams.payCompany" placeholder="请输入付款公司" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="付款名称" prop="payName">
        <el-input v-model="queryParams.payName" placeholder="请输入付款名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="付款方式" prop="payType">
        <el-select v-model="queryParams.payType" placeholder="请选择付款方式" clearable>
          <el-option v-for="dict in dict.type.finance_pay_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="收款账户" prop="payAccount">
        <el-select v-model="queryParams.payAccount" placeholder="请选择收款账户" clearable>
          <el-option v-for="dict in dict.type.finance_pay_account" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

     <!-- <el-form-item label="付款时间" prop="payTime">
        <el-date-picker clearable v-model="queryParams.payTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择付款时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="付款金额" prop="payAmount">
        <el-input v-model="queryParams.payAmount" placeholder="请输入付款金额" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->

      <el-form-item label="币种" prop="moneyType">
        <el-select v-model="queryParams.moneyType" placeholder="请选择币种" clearable>
          <el-option v-for="dict in dict.type.money_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="付款凭证" prop="payVoucher">
        <el-input v-model="queryParams.payVoucher" placeholder="请输入付款凭证" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
 -->
     <!-- <el-form-item label="认领人" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入认领人" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="认领时间" prop="claimTime">
        <el-date-picker clearable v-model="queryParams.claimTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择认领时间">
        </el-date-picker>
      </el-form-item> -->
<!--
      <el-form-item label="备注" prop="memo">
        <el-input v-model="queryParams.memo" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->

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
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['finance:finance_pay_record:add']">新增</el-button>
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
          v-hasPermi="['finance:finance_pay_record:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['finance:finance_pay_record:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="openFileClick"
          v-hasPermi="['finance:finance_pay_record:remove']">导入</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['finance:finance_pay_record:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="finance_pay_recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
       <el-table-column label="付款公司" align="center" prop="payCompany" />
       <el-table-column label="付款名称" align="center" prop="payName" />
      <el-table-column label="付款方式" align="center" prop="payType">         <template slot-scope="scope">
           <dict-tag :options="dict.type.finance_pay_type" :value="scope.row.payType" />
         </template>       </el-table-column>
      <el-table-column label="付款时间" align="center" prop="payTime" width="180">         <template slot-scope="scope">
           <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>
         </template>
      </el-table-column>
       <el-table-column label="付款金额" align="center" prop="payAmount" />       <el-table-column label="待认领金额" align="center" prop="payBalance" />


      <el-table-column label="币种" align="center" prop="moneyType">
         <template slot-scope="scope">           <dict-tag :options="dict.type.money_type" :value="scope.row.moneyType" />         </template>
       </el-table-column>

      <!-- <el-table-column label="记录ID" align="center" prop="id" /> -->
      <el-table-column label="所属展会" align="center" prop="params.exhName" />
      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="合同ID" align="center" prop="contractId" />

      <el-table-column label="收款账户" align="center" prop="payAccount">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.finance_pay_account" :value="scope.row.payAccount" />
        </template>
      </el-table-column>

      <el-table-column label="付款凭证" align="center" prop="payVoucher" />
      <!-- <el-table-column label="认领人" align="center" prop="userId" />
      <el-table-column label="认领时间" align="center" prop="claimTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.claimTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:finance_pay_record:edit']"
          >修改</el-button> -->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['finance:finance_pay_record:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改付款(回款)记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="所属展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入所属展会ID" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item> -->
        <el-form-item label="付款公司" prop="payCompany">
          <el-input v-model="form.payCompany" placeholder="请输入付款公司" />
        </el-form-item>
        <el-form-item label="付款名称" prop="payName">
          <el-input v-model="form.payName" placeholder="请输入付款名称" />
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select v-model="form.payType" placeholder="请选择付款方式">
            <el-option v-for="dict in dict.type.finance_pay_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款账户" prop="payAccount">
          <el-select v-model="form.payAccount" placeholder="请选择收款账户">
            <el-option v-for="dict in dict.type.finance_pay_account" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款时间" prop="payTime">
          <el-date-picker clearable v-model="form.payTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择付款时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="付款金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入付款金额" />
        </el-form-item>
        <!-- <el-form-item label="剩余金额" prop="payAmount">
          <el-input :value="form.payAmount" />
        </el-form-item> -->
        <el-form-item label="币种" prop="moneyType">
          <el-select v-model="form.moneyType" placeholder="请选择币种">
            <el-option v-for="dict in dict.type.money_type" :key="dict.value" :label="dict.label" :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款凭证" prop="payVoucher">
          <el-input v-model="form.payVoucher" placeholder="请输入付款凭证" />
        </el-form-item>
        <!-- <el-form-item label="认领人" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入认领人" />
        </el-form-item>
        <el-form-item label="认领时间" prop="claimTime">
          <el-date-picker clearable
            v-model="form.claimTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择认领时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
      <!--  <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.pay_record_status" :key="dict.value" :label="dict.value">{{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入展商" :visible.sync="fileOpen" width="50%" append-to-body>
    <el-form ref="form" :model="form" label-width="130px">          <el-form-item label="展商文件" prop="filePathIn">
          <file-upload :fileType="fileType" v-model="filePathIn" />          </el-form-item>         <el-form-item label="参考模板">
          <el-button type="text" @click="downLoadFile">模板下载</el-button>          </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm_file">确 定</el-button>          <el-button @click="cancel_fileopenCLick">取 消</el-button>       </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listFinance_pay_record,
    getFinance_pay_record,
    delFinance_pay_record,
    addFinance_pay_record,
    updateFinance_pay_record,
    finance_pay_recordbatchimport ,
  } from "@/api/finance/finance_pay_record";

  export default {
    name: "Finance_pay_record",
    dicts: ['finance_pay_account', 'money_type', 'zlf_status', 'finance_pay_type','pay_record_status'],
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
        // 付款(回款)记录表格数据
        finance_pay_recordList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhId: null,
          exhibitorId: null,
          contractId: null,
          payCompany: null,
          payName: null,
          payType: null,
          payAccount: null,
          payTime: null,
          payAmount: null,
          moneyType: null,
          payVoucher: null,
          userId: null,
          claimTime: null,
          memo: null,
          status: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        // 是否显示
        fileOpen: false,
        // 上传的文件路径
        filePathIn:"",
        fileType:[ "xlsx"],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      downLoadFile(res){
        this.$download.resource("/profile/payrecord.xlsx");
      },
      // 导入确认按钮
      submitForm_file() {
        if(this.filePathIn==""){
          this.$modal.msgSuccess("请上传文件");
          return false;
        }
        var data={
            "file": this.filePathIn
        }
        finance_pay_recordbatchimport(data).then(response => {
              this.$modal.closeLoading();
            if(response.code==200){
                this.$modal.msgSuccess(response.msg);
                this.fileOpen=false;
                setTimeout(res=>{
                  this.getList();
                },1000)
            }else{
               this.$modal.msgSuccess(response.msg);
            }
        });
      },

      /** 导入按钮操作 */
       openFileClick() {          console.log("导入项目");         this.fileOpen = true;
       },

    // 关闭导入文件
      cancel_fileopenCLick() {
        this.fileOpen = false;
      },

      /** 查询付款(回款)记录列表 */
      getList() {
        this.loading = true;
        listFinance_pay_record(this.queryParams).then(response => {
          this.finance_pay_recordList = response.rows;
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
          exhibitorId: null,
          contractId: null,
          payCompany: null,
          payName: null,
          payType: null,
          payAccount: null,
          payTime: null,
          payAmount: null,
          moneyType: null,
          payVoucher: null,
          userId: null,
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
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加付款(回款)记录";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getFinance_pay_record(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改付款(回款)记录";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateFinance_pay_record(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addFinance_pay_record(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除付款(回款)记录编号为"' + ids + '"的数据项？').then(function() {
          return delFinance_pay_record(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('finance/finance_pay_record/export', {
          ...this.queryParams
        }, `finance_pay_record_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
