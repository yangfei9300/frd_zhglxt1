<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="展位类别名称" prop="boothName">
        <el-input
          v-model="queryParams.boothName"
          placeholder="请输入展位类别名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展位类别" prop="boothType">
        <el-select v-model="queryParams.boothType" placeholder="请选择展位类别" clearable>
          <el-option
            v-for="dict in dict.type.booth_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="人民币单价" prop="rmbUnitPrice">
        <el-input
          v-model="queryParams.rmbUnitPrice"
          placeholder="请输入人民币单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准面积" prop="standardArea">
        <el-input
          v-model="queryParams.standardArea"
          placeholder="请输入标准面积"
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
          v-hasPermi="['recruit:recruit_booth_price:add']"
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
          v-hasPermi="['recruit:recruit_booth_price:edit']"
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
          v-hasPermi="['recruit:recruit_booth_price:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['recruit:recruit_booth_price:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recruit_booth_priceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="展位类别名称" align="center" prop="boothName" />
      <el-table-column label="展位类别" align="center" prop="boothType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType"/>
        </template>
      </el-table-column>
      <el-table-column label="人民币单价" align="center" prop="rmbUnitPrice" />
      <el-table-column label="标准面积" align="center" prop="standardArea" />
      <!-- <el-table-column label="所属展会ID" align="center" prop="exhId" /> -->

      <el-table-column label="所属展会" align="center" prop="params.exhName" width="180">
        <!-- <template slot-scope="scope">
          <span>{{}}</span>
        </template> -->
      </el-table-column>

      <!-- <el-table-column label="所属展会项目ID" align="center" prop="exhType" /> -->
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
            v-hasPermi="['recruit:recruit_booth_price:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['recruit:recruit_booth_price:remove']"
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

    <!-- 添加或修改招展展位价格类别对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="70%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="展位类别名称" prop="boothName">
          <el-input v-model="form.boothName" placeholder="请输入展位类别名称" />
        </el-form-item>
        <el-form-item label="展位类别" prop="boothType">
          <el-select v-model="form.boothType" placeholder="请选择展位类别">
            <el-option
              v-for="dict in dict.type.booth_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人民币单价" prop="rmbUnitPrice">
          <el-input v-model="form.rmbUnitPrice"  type="number" placeholder="请输入人民币单价" />
        </el-form-item>
        <el-form-item label="标准面积" prop="standardArea">
          <el-input v-model="form.standardArea" type="number" placeholder="请输入标准面积" />
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
import { listRecruit_booth_price, getRecruit_booth_price, delRecruit_booth_price, addRecruit_booth_price, updateRecruit_booth_price } from "@/api/recruit/recruit_booth_price";

import { listExh_list } from "@/api/exh/exh_list";
// 展会项目分类
import { listExh_type } from "@/api/exh/exh_type";


export default {
  name: "Recruit_booth_price",
  dicts: ['booth_type', 'zlf_status'],
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
      // 招展展位价格类别表格数据
      recruit_booth_priceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        boothName: null,
        boothType: null,
        rmbUnitPrice: null,
        standardArea: null,
        exhId: null,
        exhType: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        boothName: [
          { required: true, message: "展位类别名称不能为空", trigger: "blur" }
        ],
        boothType: [
          { required: true, message: "展位类别不能为空", trigger: "change" }
        ],
        rmbUnitPrice: [
          { required: true, message: "人民币单价不能为空", trigger: "blur" }
        ],
        standardArea: [
          { required: true, message: "标准面积不能为空", trigger: "blur" }
        ],
      },

      // 展会列表
      listExh_listList:[],
      // 展会项目列表
      listExh_typeList:[],

    };
  },
  created() {
    this.getExhAbout();
    this.getList();
  },
  methods: {

    getExhAbout(){
      var data={
        pageNum: 1,
        pageSize: 10,
      }
      listExh_list(data).then(response => {
        this.listExh_listList = response.rows;
      });
      listExh_type(data).then(response => {
        this.listExh_typeList = response.rows;
      });

    },

    /** 查询招展展位价格类别列表 */
    getList() {
      this.loading = true;
      listRecruit_booth_price(this.queryParams).then(response => {
        this.recruit_booth_priceList = response.rows;
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
        boothName: null,
        boothType: null,
        rmbUnitPrice: null,
        standardArea: null,
        exhId: null,
        exhType: null,
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
      this.title = "添加招展展位价格类别";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecruit_booth_price(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改招展展位价格类别";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecruit_booth_price(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecruit_booth_price(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除招展展位价格类别编号为"' + ids + '"的数据项？').then(function() {
        return delRecruit_booth_price(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/recruit_booth_price/export', {
        ...this.queryParams
      }, `recruit_booth_price_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
