<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <!-- <el-form-item label="所属展会" prop="exhId">
        <el-select v-model="queryParams.exhId" placeholder="请选择展会" clearable>
          <el-option
            v-for="dict in listExh_listList"
            :key="dict.id"
            :label="dict.exhName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属展会项目" prop="exhType">
        <el-select v-model="queryParams.exhType" placeholder="请选择展会项目" clearable>
          <el-option
            v-for="dict in listExh_typeList"
            :key="dict.id"
            :label="dict.typeName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item> -->


      <el-form-item label="选择行业" prop="industryType">
        <el-select v-model="queryParams.industryType"
         placeholder="请选择行业">
          <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="类别种类" prop="categoryType">
        <el-select v-model="queryParams.categoryType" placeholder="请选择类别种类" clearable>
          <el-option v-for="dict in dict.type.category_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="类别名称" prop="categoryName">
        <el-input v-model="queryParams.categoryName" placeholder="请输入类别名称" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="英文名称" prop="englishName">
        <el-input v-model="queryParams.englishName" placeholder="请输入英文名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="类别序号" prop="categorySort">
        <el-input
          v-model="queryParams.categorySort"
          placeholder="请输入类别序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="级别" prop="categoryLevel">
        <el-select v-model="queryParams.categoryLevel" placeholder="请选择级别" clearable>
          <el-option
            v-for="dict in dict.type.category_lever"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="上级类别ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入上级类别ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['exh:exh_category:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['exh:exh_category:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['exh:exh_category:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exh:exh_category:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exh_categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="类别ID" align="center" prop="id" />
     <!-- <el-table-column label="所属展会ID" align="center" prop="exhId" />
      <el-table-column label="所属展会项目ID" align="center" prop="exhType" /> -->


       <el-table-column label="级别" align="center" prop="categoryLevel">
         <template slot-scope="scope">
           <dict-tag :options="dict.type.category_lever" :value="scope.row.categoryLevel" />
         </template>
       </el-table-column>
       <el-table-column label="行业" align="center" prop="industryType">
         <template slot-scope="scope">
           <dict-tag :options="dict.type.industry_type" :value="scope.row.categoryType" />
         </template>
       </el-table-column>

      <el-table-column label="类别种类" align="center" prop="categoryType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.category_type" :value="scope.row.categoryType" />
        </template>
      </el-table-column>
      <el-table-column label="类别名称" align="center" prop="categoryName" />
      <!-- <el-table-column label="英文名称" align="center" prop="englishName" /> -->
      <!-- <el-table-column label="类别序号" align="center" prop="categorySort" /> -->
      <!-- <el-table-column label="级别" align="center" prop="categoryLevel">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.category_lever" :value="scope.row.categoryLevel"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="上级类别ID" align="center" prop="parentId" /> -->
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
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
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['exh:exh_category:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['exh:exh_category:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改类别管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="所属展会" prop="exhId">
          <el-select v-model="form.exhId" placeholder="请选择展会" clearable>
            <el-option
              v-for="dict in listExh_listList"
              :key="dict.id"
              :label="dict.exhName"
              :value="dict.id"
            />
          </el-select>

        </el-form-item>
        <el-form-item label="所属展会项目" prop="exhType">
          <el-select v-model="form.exhType" placeholder="请选择展会项目" clearable>
            <el-option
              v-for="dict in listExh_typeList"
              :key="dict.id"
              :label="dict.typeName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item> -->




        <el-form-item label="类别种类" prop="categoryType">
          <el-select v-model="form.categoryType"
             @change="levelChange1"
           placeholder="请选择类别种类">
            <el-option v-for="dict in dict.type.category_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择行业" prop="industryType">
          <el-select v-model="form.industryType"
             @change="levelChange1"
           placeholder="请选择行业">
            <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="级别" prop="categoryLevel">
          <el-select v-model="form.categoryLevel" placeholder="请选择级别"
          @change="levelChange"

          >
            <el-option v-for="dict in dict.type.category_lever" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.categoryLevel>1" label="上级类别ID" prop="parentId">
          <el-select
          no-match-text="无数据"
          remote filterable
          :remote-method="serchThereType"
          v-model="form.parentId" placeholder="请选择上级类别ID">
            <el-option
            v-for="dict in selectTypeList"
            :key="dict.id"
            :label="dict.categoryName"
            :value="dict.id"
              ></el-option>
          </el-select>

          <!-- <el-input v-model="form.parentId" placeholder="请输入上级类别ID" /> -->
        </el-form-item>
        <el-form-item label="类别名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入类别名称" />
        </el-form-item>

        <!-- <el-form-item label="英文名称" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入英文名称" />
        </el-form-item> -->

        <el-form-item label="类别序号" prop="categorySort">
          <el-input v-model="form.categorySort" placeholder="请输入类别序号" />
        </el-form-item>


        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value"
              :label="dict.value">{{dict.label}}</el-radio>
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
  import {
    listExh_category,
    getExh_category,
    delExh_category,
    addExh_category,
    updateExh_category
  } from "@/api/exh/exh_category";

  // 展会列表
  import {
    listExh_list
  } from "@/api/exh/exh_list";

  // 展会项目分类
  import {
    listExh_type
  } from "@/api/exh/exh_type";


  export default {
    name: "Exh_category",
    dicts: ['category_lever',
    'category_type',
    'zlf_status',
    'industry_type'
    ],
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
        // 类别管理表格数据
        exh_categoryList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhId: null,
          exhType: null,
          categoryType: null,
          categoryName: null,
          englishName: null,
          categorySort: null,
          categoryLevel: null,
          parentId: null,
          industryType:null,
          status: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          categoryName: [{
            required: true,
            message: "类别名称不能为空",
            trigger: "blur"
          }],
        },

        listExh_listList: [], //展会列表
        listExh_typeList: [], //展会项目列表

        selectTypeList:[],//搜索三级分类

      };
    },
    created() {
      this.getList();
      this.getOtherList();
    },
    methods: {
      // 获取级别修改
      levelChange(res){
        console.log("级别变动",res);
        if(res==1){
          this.form.parentId=null;
        }else{
          this.serchThereType("");
        }
      },
      levelChange1(res){
        this.serchThereType("");
      },
      // 搜搜三级分类
      serchThereType(res){
        console.log("---",res);

        this.form.parentId="";
        this.selectTypeList=[];

        var data={
          pageNum: 1,
          pageSize: 1000,
          categoryLevel: this.form.categoryLevel-1,
          categoryName: res,
          industryType:this.form.industryType,
        }
        listExh_category(data).then(response => {
          console.log("结果",response)
          this.selectTypeList = response.rows;

        });
      },

      // 获取其他列表
      getOtherList() {
        var data = {
          pageNum: 1,
          pageSize: 1000,
        }
        listExh_list(data).then(response => {
          this.listExh_listList = response.rows;
        });
        listExh_type(data).then(response => {
          this.listExh_typeList = response.rows;
        });
      },

      /** 查询类别管理列表 */
      getList() {
        this.loading = true;
        listExh_category(this.queryParams).then(response => {
          this.exh_categoryList = response.rows;
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
          exhType: null,
          categoryType: null,
          categoryName: null,
          englishName: null,
          categorySort: null,
          categoryLevel: null,
          parentId: null,
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
        this.title = "添加类别管理";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getExh_category(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改类别管理";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateExh_category(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addExh_category(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除类别管理编号为"' + ids + '"的数据项？').then(function() {
          return delExh_category(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('exh/exh_category/export', {
          ...this.queryParams
        }, `exh_category_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
