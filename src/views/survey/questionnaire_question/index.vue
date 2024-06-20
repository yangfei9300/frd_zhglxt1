<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <!-- <el-form-item label="问题ID" prop="id"><el-input v-model="queryParams.id" placeholder="请输入问题ID" clearable @keyup.enter.native="handleQuery" /></el-form-item> -->
      <el-form-item label="选择问卷标题" prop="questionnaireId">
        <!-- <el-input v-model="queryParams.questionnaireId" placeholder="请输入所属调查问卷ID" clearable @keyup.enter.native="handleQuery" /> -->
        <el-select v-model="queryParams.questionnaireId" placeholder="请选择问卷标题" clearable>
          <el-option v-for="dict in questionnaireList" :key="dict.id" :label="dict.title" :value="dict.id" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="问题序号" prop="qSort"><el-input v-model="queryParams.qSort" placeholder="请输入问题序号" clearable @keyup.enter.native="handleQuery" /></el-form-item> -->
      <el-form-item label="问题类型" prop="qType">
        <el-select v-model="queryParams.qType" placeholder="请选择问题类型" clearable>
          <el-option v-for="dict in dict.type.problem_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
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
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['survey:questionnaire_question:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['survey:questionnaire_question:edit']">
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['survey:questionnaire_question:remove']">
          删除
        </el-button>
      </el-col>
     <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['survey:questionnaire_question:export']">导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="questionnaire_questionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="问题ID" align="center" prop="id" />
      <el-table-column label="所属调查问卷" align="center" prop="params.title" />
      <el-table-column label="问题内容" align="center" prop="content" />
      <el-table-column label="问题英文内容" align="center" prop="englishContent" />
      <el-table-column label="问题序号" align="center" prop="qSort" />
      <el-table-column label="问题类型" align="center" prop="qType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.problem_type" :value="scope.row.qType" />
        </template>
      </el-table-column>
      <el-table-column label="最大可选" align="center" prop="maxSelect" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建者" align="center" prop="createBy" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['survey:questionnaire_question:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['survey:questionnaire_question:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
    @pagination="getList" />

    <!-- 添加或修改调查问卷问题对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="所属调查问卷"
        prop="questionnaireId">

        <el-select v-model="form.questionnaireId" placeholder="请选择所属调查问卷" clearable>
          <el-option v-for="dict in questionnaireList" :key="dict.id" :label="dict.title" :value="dict.id" />
        </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">

           <el-form-item label="问题内容"><el-input
           placeholder="请输入问题内容"
           type="textarea" v-model="form.content" :min-height="192" /></el-form-item>

          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">

            <el-form-item label="问题英文内容"><el-input  type="textarea"
             placeholder="请输入问题英文内容"
             v-model="form.englishContent" :min-height="192" /></el-form-item>

          </div></el-col>
        </el-row>



        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">

            <el-form-item label="问题序号" prop="qSort"><el-input v-model="form.qSort" placeholder="请输入问题序号" /></el-form-item>

          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">

          <el-form-item label="问题类型" prop="qType">
            <el-select @change="qTypeChange" v-model="form.qType" placeholder="请选择问题类型"
            >
              <el-option v-for="dict in dict.type.problem_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
            </el-select>
          </el-form-item>

          </div></el-col>
        </el-row>

        <el-form-item label="答案列表" prop="qType" v-if="answerShow">
          <el-row v-for="(item,index) in answerList">
            <el-col :span="2"><div class="grid-content bg-purple">选项{{index+1}}</div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                 <el-input v-model="item.content" placeholder="请输入答案内容" />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                 <el-input  v-model="item.englishContent"  placeholder="请输入答案内容(英文)" />
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                 <el-input v-model="item.sort" placeholder="序号" />
              </div>
            </el-col>
            <el-col :span="2" >
              <div class="grid-content bg-purple-light">
                 <el-button type="text" @click="delAnswe(index)">删除</el-button>
              </div>
            </el-col>
          </el-row>
          <div style="width: 100%;">
            <div style="flex: 1;"></div>
            <el-button size="mini" type="primary" @click="addAnswer">增加选项</el-button>
          </div>
        </el-form-item>

        <el-form-item label="最大可选" v-if="form.qType==2" prop="maxSelect"><el-input v-model="form.maxSelect" placeholder="请输入最大可选" /></el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
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
<style>
   .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
</style>
<script>
import {
  listQuestionnaire_question,
  getQuestionnaire_question,
  delQuestionnaire_question,
  addQuestionnaire_question,
  updateQuestionnaire_question
} from '@/api/survey/questionnaire_question';

// 卷子列表
import { listQuestionnaire} from "@/api/survey/questionnaire";

import {  delQuestionnaire_option, } from "@/api/survey/questionnaire_option";


export default {
  name: 'Questionnaire_question',
  dicts: ['problem_type', 'zlf_status'],
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
      // 调查问卷问题表格数据
      questionnaire_questionList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        questionnaireId: null,
        content: null,
        englishContent: null,
        qSort: null,
        qType: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        questionnaireId: [{ required: true, message: '所属调查问卷ID不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '问题内容不能为空', trigger: 'blur' }]
      },

      // 答案列表
      answerList:[],//
      answerShow:true,
      questionnaireList:[],//卷子列表

    };
  },
  created() {
    this.getList();
  },
  methods: {

    // 动态添加问题的答案开始
    addAnswer(){
      var obg={
        content:"",
        'englishContent':"",//英文内容
        'sort':'',//选项序号
      }
      this.answerList.push(obg);
    },
    // 问题类型改变
    qTypeChange(res){
      console.log("问题类型改变",res)
      if(res==4){
        this.answerShow=false;
      }else if(res==3){
        this.answerShow=true;
        var obg={
          content:"是",
          'englishContent':"yes",//英文内容
          'sort':'1',//选项序号
        }
        var obg1={
          content:"否",
          'englishContent':"no",//英文内容
          'sort':'2',//选项序号
        }
        var answerList=[];
        answerList.push(obg)
        answerList.push(obg1)
        this.answerList=answerList;
      }
      else{
        var answerList=this.answerList;
        if(answerList.length>0&&answerList[0].content=='是'&&answerList[1].content=='否'){
          this.answerList=[];
        }
        this.answerShow=true;
      }
    },
    // 获取问题列表
    // 删除答案
    delAnswe(index){
      var answerList=this.answerList;
      var list=[];
      for(var a=0;a<answerList.length;a++){
        if(index!=a){
          list.push(answerList[a]);
        }else{
          console.log("一样的",answerList[a])
          if(answerList[a].id){
            this.delAnsweInfo(answerList[a].id);
          }
        }
      }

      this.answerList=list;
    },

    // 删除答案信息
    delAnsweInfo(id){
      delQuestionnaire_option(id);
    },

    //动态添加问题的答案结束



    /** 查询调查问卷问题列表 */
    getList() {
      this.loading = true;
      listQuestionnaire_question(this.queryParams).then(response => {
        this.questionnaire_questionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });

      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listQuestionnaire(data).then(response => {
        this.questionnaireList = response.rows;
      });

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.answerList=[];
      this.form = {
        id: null,
        questionnaireId: null,
        content: null,
        englishContent: null,
        qSort: null,
        qType: null,
        maxSelect: null,
        status: '0',
        delFlag: null,
        version: null,
        createBy: null,
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
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加调查问卷问题';
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getQuestionnaire_question(id).then(response => {
        this.form = response.data;
        console.log("通过id获取的问题详情",this.form);
        this.answerList=response.data.params.list;
        this.open = true;
        this.title = '修改调查问卷问题';
      });
    },
    /** 提交按钮 */
    submitForm() {
      var form=this.form;
      form.params={
        list:this.answerList,
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateQuestionnaire_question(form).then(response => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addQuestionnaire_question(form).then(response => {
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
        .confirm('是否确认删除调查问卷问题编号为"' + ids + '"的数据项？')
        .then(function() {
          return delQuestionnaire_question(ids);
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
        'survey/questionnaire_question/export',
        {
          ...this.queryParams
        },
        `questionnaire_question_${new Date().getTime()}.xlsx`
      );
    }
  }
};
</script>
