<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="模版类别" prop="templateType">
        <el-select v-model="queryParams.templateType" placeholder="请选择模版类别" clearable>
          <el-option
            v-for="dict in dict.type.recruit_template_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="模版名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入模版名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['recruit:recruit_template:add']"
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
          v-hasPermi="['recruit:recruit_template:edit']"
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
          v-hasPermi="['recruit:recruit_template:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['recruit:recruit_template:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recruit_templateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="模版类别" align="center" prop="templateType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.recruit_template_type" :value="scope.row.templateType"/>
        </template>
      </el-table-column>
       <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="模版文件" align="center" prop="templateFile" />
      <el-table-column label="所属展会ID" align="center" prop="params.exhName" />
      <!-- <el-table-column label="所属展会项目ID" align="center" prop="exhType" /> -->
      <el-table-column label="状态" align="center" prop="status" />
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
            icon="el-icon-download"
            @click="downloadExcel(scope.row)"
            v-hasPermi="['exh:exh_file:edit']"
          >下载</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['recruit:recruit_template:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['recruit:recruit_template:remove']"
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

    <!-- 添加或修改招展模版对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模版类别" prop="templateType">
          <el-select v-model="form.templateType" placeholder="请选择模版类别"
          @change="mobanChange"
          >
            <el-option
              v-for="dict in dict.type.recruit_template_type"
              :key="dict.value"
              :label="dict.label"
            :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模版名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入模版名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="模版文件">
          <file-upload v-model="form.templateFile" :fileType="fileType" />
        </el-form-item>
        <!-- <el-form-item label="所属展会" prop="exhId">
          <el-select v-model="form.exhId" placeholder="请选择展会" clearable>
            <el-option
              v-for="dict in exhList"
              :key="dict.id"
              :label="dict.exhName"
              :value="dict.id"
            />
          </el-select>
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
import { listRecruit_template, getRecruit_template, delRecruit_template, addRecruit_template, updateRecruit_template } from "@/api/recruit/recruit_template";
// 获取所有展会列表
import { listExh_list } from "@/api/exh/exh_list";


export default {
  name: "Recruit_template",
  dicts: ['recruit_template_type'],
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
      // 招展模版表格数据
      recruit_templateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name:null,
        templateType: null,
        templateFile: null,
        exhId: null,
        exhType: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        templateFile: [
          { required: true, message: "模版文件类型不能为空", trigger: "blur" },
           { templateFile: true, message: "模版文件不能为空", trigger: "blur" }
        ],
      },
      // 展会列表
      exhList:[],
      // 文件类型
      fileType:["doc","docx", "xls", "ppt", "txt", "pdf"]
    };
  },
  created() {
    this.getAllList();
    this.getList();
  },
  methods: {
    // 模板类型修改
    mobanChange(res){
      console.log("模板类型",res);
      if(res==1){
        this.fileType=["docx"]
      }else{
        this.fileType=["doc", "xls", "ppt", "txt", "pdf"]
      }
    },
    // 下载文件
    downloadExcel(row) {
      console.log(row,process.env)
        // window.location.href = process.env.VUE_APP_BASE_API+row.templateFile;
        this.$download.resource(row.templateFile);
    },

    // 获取相关数据列表
    getAllList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listExh_list(data).then(response => {
        this.exhList = response.rows;
      });
    },
    /** 查询招展模版列表 */
    getList() {
      this.loading = true;
      listRecruit_template(this.queryParams).then(response => {
        this.recruit_templateList = response.rows;
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
        templateType: null,
        templateFile: null,
        exhId: null,
        exhType: null,
        status: "0",
         name:null,
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
      this.title = "添加招展模版";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecruit_template(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改招展模版";
      });
    },
    /** 提交按钮 */
    submitForm() {
      var form=this.form;
      if(form.templateType==null){
        this.$modal.msgError("请选择模板类型");
        return false;
      }
      if(form.templateFile==null){
        this.$modal.msgError("请选择模板文件");
        return false;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecruit_template(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecruit_template(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除招展模版编号为"' + ids + '"的数据项？').then(function() {
        return delRecruit_template(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/recruit_template/export', {
        ...this.queryParams
      }, `recruit_template_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
