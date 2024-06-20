<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <el-form-item label="展商名称" prop="params.exhibitorName">
        <el-input
          v-model="queryParams.params.exhibitorName"
          placeholder="请输入展商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="展品类别" prop="productType">
        <el-input
          v-model="queryParams.productType"
          placeholder="请输入展品类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展品中文名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入展品中文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="展品英文名称" prop="productEname">
        <el-input
          v-model="queryParams.productEname"
          placeholder="请输入展品英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-input
          v-model="queryParams.model"
          placeholder="请输入型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="中文介绍" prop="intro">
        <el-input
          v-model="queryParams.intro"
          placeholder="请输入中文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文介绍" prop="englishIntro">
        <el-input
          v-model="queryParams.englishIntro"
          placeholder="请输入英文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="特点" prop="trait">
        <el-input
          v-model="queryParams.trait"
          placeholder="请输入特点"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采用标准" prop="standard">
        <el-input
          v-model="queryParams.standard"
          placeholder="请输入采用标准"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结构" prop="structure">
        <el-input
          v-model="queryParams.structure"
          placeholder="请输入结构"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="典型应用" prop="typical">
        <el-input
          v-model="queryParams.typical"
          placeholder="请输入典型应用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关注数量" prop="voteCount">
        <el-input
          v-model="queryParams.voteCount"
          placeholder="请输入关注数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="新品" prop="isNew">
        <el-select v-model="queryParams.isNew" placeholder="请选择新品" clearable>
          <el-option
            v-for="dict in dict.type.is_new"
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
      <!-- <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['exhibitor:exhibitor_product:add']"
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
          v-hasPermi="['exhibitor:exhibitor_product:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_product:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_product:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_productList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <el-table-column label="展品图片" align="center" prop="productImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.productImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="技术参数" align="center" prop="productSpecs" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.productSpecs" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="展品类别" align="center" prop="productType" />
      <el-table-column label="展品中文名称" align="center" prop="productName" />
      <el-table-column label="展品英文名称" align="center" prop="productEname" />
      <el-table-column label="型号" align="center" prop="model" />
      <el-table-column label="中文介绍" align="center" prop="intro" />
      <el-table-column label="英文介绍" align="center" prop="englishIntro" />
      <el-table-column label="特点" align="center" prop="trait" />
      <el-table-column label="采用标准" align="center" prop="standard" />
      <el-table-column label="结构" align="center" prop="structure" />
      <el-table-column label="典型应用" align="center" prop="typical" />
      <el-table-column label="关注数量" align="center" prop="voteCount" />
      <el-table-column label="新品" align="center" prop="isNew">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_new" :value="scope.row.isNew"/>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="examineStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus"/>
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
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_product:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_product:remove']"
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

    <!-- 添加或修改展商展品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <el-form-item label="展品图片">
          <image-upload v-model="form.productImg"/>
        </el-form-item>
        <el-form-item label="技术参数">
          <image-upload v-model="form.productSpecs"/>
        </el-form-item>
        <el-form-item label="展品类别" prop="productType">
          <!-- <el-input v-model="form.productType" placeholder="请输入展品类别" /> -->
          <el-select v-model="form.productType" placeholder="请选择产品类别" clearable>
            <el-option
              v-for="dict in categoryList"
              :key="dict.id"
              :label="dict.categoryName"
              :value="dict.id"
            />
          </el-select>


        </el-form-item>
        <el-form-item label="展品中文名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入展品中文名称" />
        </el-form-item>
        <el-form-item label="展品英文名称" prop="productEname">
          <el-input v-model="form.productEname" placeholder="请输入展品英文名称" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="中文介绍" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入中文介绍" />
        </el-form-item>
        <el-form-item label="英文介绍" prop="englishIntro">
          <el-input v-model="form.englishIntro" placeholder="请输入英文介绍" />
        </el-form-item>
        <el-form-item label="特点" prop="trait">
          <el-input v-model="form.trait" placeholder="请输入特点" />
        </el-form-item>
        <el-form-item label="采用标准" prop="standard">
          <el-input v-model="form.standard" placeholder="请输入采用标准" />
        </el-form-item>
        <el-form-item label="结构" prop="structure">
          <el-input v-model="form.structure" placeholder="请输入结构" />
        </el-form-item>
        <el-form-item label="典型应用" prop="typical">
          <el-input v-model="form.typical" placeholder="请输入典型应用" />
        </el-form-item>
        <el-form-item label="关注数量" prop="voteCount">
          <el-input v-model="form.voteCount" placeholder="请输入关注数量" />
        </el-form-item>
        <el-form-item label="新品">
          <el-radio-group v-model="form.isNew">
            <el-radio
              v-for="dict in dict.type.is_new"
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
import { listExhibitor_product, getExhibitor_product, delExhibitor_product, addExhibitor_product, updateExhibitor_product } from "@/api/exhibitor/exhibitor_product";

import {listExh_category} from "@/api/exh/exh_category";

export default {
  name: "Exhibitor_product",
  dicts: ['examine_status', 'is_new', 'zlf_status'],
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
      // 展商展品表格数据
      exhibitor_productList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        params:{
          'exhibitorName':""
        },
        pageNum: 1,
        pageSize: 10,
        exhibitorId: null,
        exhId: null,
        productImg: null,
        productSpecs: null,
        productType: null,
        productName: null,
        productEname: null,
        model: null,
        intro: null,
        englishIntro: null,
        trait: null,
        standard: null,
        structure: null,
        typical: null,
        voteCount: null,
        isNew: null,
        examineStatus: null,
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
        exhId: [
          { required: true, message: "展会ID不能为空", trigger: "blur" }
        ],
        productType: [
          { required: true, message: "展品类别不能为空", trigger: "blur" }
        ],
        productName: [
          { required: true, message: "展品中文名称不能为空", trigger: "blur" }
        ],
      },
      categoryList:[],//分类列表
    };
  },
  created() {
    this.getList();
    this.getShopType();
  },
  methods: {

    // 获取上架分类
    getShopType(){
      var data={
        categoryType:4,
      }
      console.log("---------",data);
      listExh_category(data).then(response => {
           if(response.code==200){
              console.log("商家分类",response);
              this.categoryList=response.rows;
           }else{
             this.$modal.msgSuccess(response.msg);
             this.$modal.closeLoading();
           }
      }).catch(() => {
      });
    },

    /** 查询展商展品列表 */
    getList() {
      this.loading = true;
      listExhibitor_product(this.queryParams).then(response => {
        this.exhibitor_productList = response.rows;
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
        exhId: null,
        productImg: null,
        productSpecs: null,
        productType: null,
        productName: null,
        productEname: null,
        model: null,
        intro: null,
        englishIntro: null,
        trait: null,
        standard: null,
        structure: null,
        typical: null,
        voteCount: null,
        isNew: "0",
        examineStatus: "0",
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
      this.title = "添加展商展品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_product(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商展品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_product(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_product(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商展品编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_product(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_product/export', {
        ...this.queryParams
      }, `exhibitor_product_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
