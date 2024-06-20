<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="目标名称" prop="targetName">
        <el-input
          v-model="queryParams.targetName"
          placeholder="请输入目标名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联络对象" prop="callSource">
        <el-select v-model="queryParams.callSource" placeholder="请选择联络对象" clearable>
          <el-option
            v-for="dict in dict.type.call_source"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker clearable
          v-model="queryParams.beginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="短信模板" prop="msgTemplate">
        <el-input
          v-model="queryParams.msgTemplate"
          placeholder="请输入短信模板"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮件标题" prop="emailTitle">
        <el-input
          v-model="queryParams.emailTitle"
          placeholder="请输入邮件标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮件模板" prop="emailTemplate">
        <el-input
          v-model="queryParams.emailTemplate"
          placeholder="请输入邮件模板"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮件发件人" prop="mailSender">
        <el-input
          v-model="queryParams.mailSender"
          placeholder="请输入邮件发件人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真模板" prop="faxTemplate">
        <el-input
          v-model="queryParams.faxTemplate"
          placeholder="请输入传真模板"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问卷ID" prop="qtrId">
        <el-input
          v-model="queryParams.qtrId"
          placeholder="请输入问卷ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真" prop="rxEmail">
        <el-input
          v-model="queryParams.rxEmail"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理级别" prop="level">
        <el-input
          v-model="queryParams.level"
          placeholder="请输入处理级别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据处理方式：允许联络他人过期任务" prop="ifMixCall">
        <el-input
          v-model="queryParams.ifMixCall"
          placeholder="请输入数据处理方式：允许联络他人过期任务"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="ifConfirm">
        <el-input
          v-model="queryParams.ifConfirm"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.zlf_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
     <!-- <el-form-item label="创建人ID" prop="creatorId">
        <el-input
          v-model="queryParams.creatorId"
          placeholder="请输入创建人ID"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['call:call_target:add']"
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
          v-hasPermi="['call:call_target:edit']"
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
          v-hasPermi="['call:call_target:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['call:call_target:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="call_targetList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="目标名称" align="center" prop="targetName" />
      <!-- <el-table-column label="目的" align="center" prop="intent" /> -->
      <el-table-column label="联络方式" align="center" prop="callType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_type" :value="scope.row.callType ? scope.row.callType.split(',') : []"/>
        </template>
      </el-table-column>
      <el-table-column label="联络对象" align="center" prop="callSource">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_source" :value="scope.row.callSource"/>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" />
      <el-table-column label="展会类型" align="center" prop="exhType" />
      <el-table-column label="短信模板" align="center" prop="msgTemplate" />
      <el-table-column label="邮件标题" align="center" prop="emailTitle" />
      <el-table-column label="邮件模板" align="center" prop="emailTemplate" />
      <el-table-column label="邮件发件人" align="center" prop="mailSender" />
      <el-table-column label="传真模板" align="center" prop="faxTemplate" />
      <el-table-column label="问卷ID" align="center" prop="qtrId" />
      <el-table-column label="传真" align="center" prop="rxEmail" />
      <el-table-column label="处理级别" align="center" prop="level" />
      <el-table-column label="数据处理方式：允许联络他人过期任务" align="center" prop="ifMixCall" />
      <el-table-column label="${comment}" align="center" prop="ifConfirm" /> -->
      <el-table-column label="备注" align="center" prop="memo" />
     <!-- <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <el-table-column label="创建者" align="center" prop="createBy" />
      <!-- <el-table-column label="创建人ID" align="center" prop="creatorId" /> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['call:call_target:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['call:call_target:remove']"
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

    <!-- 添加或修改联络目标对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="目标名称" prop="targetName">
          <el-input v-model="form.targetName" placeholder="请输入目标名称" />
        </el-form-item>
        <el-form-item label="目的" prop="intent">
          <el-input v-model="form.intent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="联络方式">
          <el-checkbox-group v-model="form.callType">
            <el-checkbox
              v-for="dict in dict.type.call_type"
              :key="dict.value"
              :label="dict.value">
              {{dict.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="联络对象">
          <el-radio-group v-model="form.callSource">
            <el-radio
              v-for="dict in dict.type.call_source"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable
            v-model="form.beginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
       <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <!-- <el-form-item label="短信模板" prop="msgTemplate">
          <el-input v-model="form.msgTemplate" placeholder="请输入短信模板" />
        </el-form-item>
        <el-form-item label="邮件标题" prop="emailTitle">
          <el-input v-model="form.emailTitle" placeholder="请输入邮件标题" />
        </el-form-item>
        <el-form-item label="邮件模板" prop="emailTemplate">
          <el-input v-model="form.emailTemplate" placeholder="请输入邮件模板" />
        </el-form-item>
        <el-form-item label="邮件发件人" prop="mailSender">
          <el-input v-model="form.mailSender" placeholder="请输入邮件发件人" />
        </el-form-item>
        <el-form-item label="传真模板" prop="faxTemplate">
          <el-input v-model="form.faxTemplate" placeholder="请输入传真模板" />
        </el-form-item>
        <el-form-item label="问卷ID" prop="qtrId">
          <el-input v-model="form.qtrId" placeholder="请输入问卷ID" />
        </el-form-item>
        <el-form-item label="传真" prop="rxEmail">
          <el-input v-model="form.rxEmail" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="处理级别" prop="level">
          <el-input v-model="form.level" placeholder="请输入处理级别" />
        </el-form-item>
        <el-form-item label="数据处理方式：允许联络他人过期任务" prop="ifMixCall">
          <el-input v-model="form.ifMixCall" placeholder="请输入数据处理方式：允许联络他人过期任务" />
        </el-form-item>
        <el-form-item label="${comment}" prop="ifConfirm">
          <el-input v-model="form.ifConfirm" placeholder="请输入${comment}" />
        </el-form-item> -->
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.zlf_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建人ID" prop="creatorId">
          <el-input v-model="form.creatorId" placeholder="请输入创建人ID" />
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
import { listCall_target, getCall_target, delCall_target, addCall_target, updateCall_target } from "@/api/call/call_target";

export default {
  name: "Call_target",
  dicts: ['call_type', 'call_source', 'zlf_status'],
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
      // 联络目标表格数据
      call_targetList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        targetName: null,
        intent: null,
        callType: null,
        callSource: null,
        beginTime: null,
        endTime: null,
        exhId: null,
        exhType: null,
        msgTemplate: null,
        emailTitle: null,
        emailTemplate: null,
        mailSender: null,
        faxTemplate: null,
        qtrId: null,
        rxEmail: null,
        level: null,
        ifMixCall: null,
        ifConfirm: null,
        memo: null,
        status: null,
        creatorId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        targetName: [
          { required: true, message: "目标名称不能为空", trigger: "blur" }
        ],
        exhId: [
          { required: true, message: "展会ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询联络目标列表 */
    getList() {
      this.loading = true;
      listCall_target(this.queryParams).then(response => {
        this.call_targetList = response.rows;
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
        targetName: null,
        intent: null,
        callType: [],
        callSource: "0",
        beginTime: null,
        endTime: null,
        exhId: null,
        exhType: null,
        msgTemplate: null,
        emailTitle: null,
        emailTemplate: null,
        mailSender: null,
        faxTemplate: null,
        qtrId: null,
        rxEmail: null,
        level: null,
        ifMixCall: null,
        ifConfirm: null,
        memo: null,
        status: "0",
        delFlag: null,
        version: null,
        createBy: null,
        creatorId: null,
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
      this.title = "添加联络目标";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCall_target(id).then(response => {
        this.form = response.data;
        this.form.callType = this.form.callType.split(",");
        this.open = true;
        this.title = "修改联络目标";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.callType = this.form.callType.join(",");
          if (this.form.id != null) {
            updateCall_target(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCall_target(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除联络目标编号为"' + ids + '"的数据项？').then(function() {
        return delCall_target(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('call/call_target/export', {
        ...this.queryParams
      }, `call_target_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
