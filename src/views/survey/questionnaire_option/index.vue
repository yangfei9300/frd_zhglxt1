<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="选项ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入选项ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属调查问卷ID" prop="questionnaireId">
        <el-input
          v-model="queryParams.questionnaireId"
          placeholder="请输入所属调查问卷ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属问题ID" prop="questionId">
        <el-input
          v-model="queryParams.questionId"
          placeholder="请输入所属问题ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="选项序号" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入选项序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否为子选项" prop="subOption">
        <el-input
          v-model="queryParams.subOption"
          placeholder="请输入是否为子选项"
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
          v-hasPermi="['survey:questionnaire_option:add']"
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
          v-hasPermi="['survey:questionnaire_option:edit']"
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
          v-hasPermi="['survey:questionnaire_option:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:questionnaire_option:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="questionnaire_optionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="选项ID" align="center" prop="id" />
      <el-table-column label="所属调查问卷ID" align="center" prop="questionnaireId" />
      <el-table-column label="所属问题ID" align="center" prop="questionId" />
      <el-table-column label="选项内容" align="center" prop="content" />
      <el-table-column label="选项英文内容" align="center" prop="englishContent" />
      <el-table-column label="选项序号" align="center" prop="sort" />
      <el-table-column label="是否为子选项" align="center" prop="subOption" />
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
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:questionnaire_option:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:questionnaire_option:remove']"
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

    <!-- 添加或修改调查问卷选项对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属调查问卷ID" prop="questionnaireId">
          <el-input v-model="form.questionnaireId" placeholder="请输入所属调查问卷ID" />
        </el-form-item>
        <el-form-item label="所属问题ID" prop="questionId">
          <el-input v-model="form.questionId" placeholder="请输入所属问题ID" />
        </el-form-item>
        <el-form-item label="选项内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="选项英文内容">
          <editor v-model="form.englishContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="选项序号" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入选项序号" />
        </el-form-item>
        <el-form-item label="是否为子选项" prop="subOption">
          <el-input v-model="form.subOption" placeholder="请输入是否为子选项" />
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
import { listQuestionnaire_option, getQuestionnaire_option, delQuestionnaire_option, addQuestionnaire_option, updateQuestionnaire_option } from "@/api/survey/questionnaire_option";

export default {
  name: "Questionnaire_option",
  dicts: ['zlf_status'],
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
      // 调查问卷选项表格数据
      questionnaire_optionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        questionnaireId: null,
        questionId: null,
        content: null,
        englishContent: null,
        sort: null,
        subOption: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        questionnaireId: [
          { required: true, message: "所属调查问卷ID不能为空", trigger: "blur" }
        ],
        questionId: [
          { required: true, message: "所属问题ID不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "选项内容不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询调查问卷选项列表 */
    getList() {
      this.loading = true;
      listQuestionnaire_option(this.queryParams).then(response => {
        this.questionnaire_optionList = response.rows;
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
        questionnaireId: null,
        questionId: null,
        content: null,
        englishContent: null,
        sort: null,
        subOption: null,
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
      this.title = "添加调查问卷选项";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getQuestionnaire_option(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改调查问卷选项";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateQuestionnaire_option(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addQuestionnaire_option(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除调查问卷选项编号为"' + ids + '"的数据项？').then(function() {
        return delQuestionnaire_option(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('survey/questionnaire_option/export', {
        ...this.queryParams
      }, `questionnaire_option_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
