<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
    <!--  <el-form-item label="观众ID" prop="visitorId">
        <el-input
          v-model="queryParams.visitorId"
          placeholder="请输入观众ID"
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
      <el-form-item label="用户答案" label-width="200" prop="answerOption">
        <el-input
          v-model="queryParams.answerOption"
          placeholder="请输入答案"
          clearable
          @keyup.enter.native="handleQuery"
        />



        <!-- questionnaire_questionList -->

      </el-form-item>
     <!-- <el-form-item label="所属问题ID" prop="questionId">
        <el-input
          v-model="queryParams.questionId"
          placeholder="请输入所属问题ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回答内容" prop="answerContent">
        <el-input
          v-model="queryParams.answerContent"
          placeholder="请输入回答内容"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
<!--      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['visitor:questionnaire_answer:add']"
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
          v-hasPermi="['visitor:questionnaire_answer:edit']"
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
          v-hasPermi="['visitor:questionnaire_answer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['visitor:questionnaire_answer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="questionnaire_answerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众名称" align="center" prop="params.visitorName" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <el-table-column label="所属调查问卷名称" align="center" prop="params.quesTitle" />
      <el-table-column label="所属问题" align="center" prop="params.quesContent" />
      <el-table-column label="回答内容" align="center" prop="params.answerOption" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo" />
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
            v-hasPermi="['visitor:questionnaire_answer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['visitor:questionnaire_answer:remove']"
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

    <!-- 添加或修改调查问卷观众回答对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="观众ID" prop="visitorId">
          <el-input v-model="form.visitorId" placeholder="请输入观众ID" />
        </el-form-item>
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="所属调查问卷ID" prop="questionnaireId">
          <el-input v-model="form.questionnaireId" placeholder="请输入所属调查问卷ID" />
        </el-form-item>
        <el-form-item label="所属问题ID" prop="questionId">
          <el-input v-model="form.questionId" placeholder="请输入所属问题ID" />
        </el-form-item>
        <el-form-item label="回答内容" prop="answerContent">
          <el-input v-model="form.answerContent" placeholder="请输入回答内容" />
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

import { listQuestionnaire_answer, getQuestionnaire_answer, delQuestionnaire_answer, addQuestionnaire_answer, updateQuestionnaire_answer } from "@/api/visitor/questionnaire_answer";

import {
  listQuestionnaire_question,
} from '@/api/survey/questionnaire_question';


export default {
  name: "Questionnaire_answer",
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
      // 调查问卷观众回答表格数据
      questionnaire_answerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        visitorId: null,
        exhId: null,
        questionnaireId: null,
        questionId: null,
        answerContent: null,
        memo: null,
        answerOption:"",
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      questionnaire_questionList:[],//问题列表
    };
  },
  created() {
    this.getList();
    this.getWentiList();
  },
  methods: {

    getWentiList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listQuestionnaire_question(data).then(response => {
        this.questionnaire_questionList = response.rows;
      });
    },

    /** 查询调查问卷观众回答列表 */
    getList() {
      this.loading = true;
      var queryParams=this.queryParams;
      queryParams.params={
        'answerOption':queryParams.answerOption
      }
      listQuestionnaire_answer(queryParams).then(response => {
        this.questionnaire_answerList = response.rows;
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
        visitorId: null,
        exhId: null,
        questionnaireId: null,
        questionId: null,
        answerContent: null,
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
      this.title = "添加调查问卷观众回答";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getQuestionnaire_answer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改调查问卷观众回答";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateQuestionnaire_answer(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addQuestionnaire_answer(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除调查问卷观众回答编号为"' + ids + '"的数据项？').then(function() {
        return delQuestionnaire_answer(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('visitor/questionnaire_answer/export', {
        ...this.queryParams
      }, `questionnaire_answer_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
