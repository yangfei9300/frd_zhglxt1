<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="展馆名称" prop="galleryName">
        <el-input
          v-model="queryParams.galleryName"
          placeholder="请输入展馆名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展馆地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入展馆地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入所在城市"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input
          v-model="queryParams.contacts"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input
          v-model="queryParams.telephone"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系传真" prop="fax">
        <el-input
          v-model="queryParams.fax"
          placeholder="请输入联系传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网址" prop="website">
        <el-input
          v-model="queryParams.website"
          placeholder="请输入网址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="面积" prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入面积"
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
          v-hasPermi="['exh:exh_gallery:add']"
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
          v-hasPermi="['exh:exh_gallery:edit']"
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
          v-hasPermi="['exh:exh_gallery:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exh:exh_gallery:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exh_galleryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="展馆ID" align="center" prop="id" />
      <el-table-column label="展馆名称" align="center" prop="galleryName" />
      <el-table-column label="展馆地址" align="center" prop="address" />
      <el-table-column label="所在城市" align="center" prop="city" />
      <el-table-column label="联系人" align="center" prop="contacts" />
      <el-table-column label="联系电话" align="center" prop="telephone" />
      <el-table-column label="联系传真" align="center" prop="fax" />
      <el-table-column label="网址" align="center" prop="website" />
      <el-table-column label="面积" align="center" prop="area" />
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
            v-hasPermi="['exh:exh_gallery:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exh:exh_gallery:remove']"
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

    <!-- 添加或修改展馆信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" height='80%' append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展馆名称" prop="galleryName">
          <el-input v-model="form.galleryName" placeholder="请输入展馆名称" />
        </el-form-item>
        <el-form-item label="展馆地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入展馆地址" />
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入所在城市" />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="联系传真" prop="fax">
          <el-input v-model="form.fax" placeholder="请输入联系传真" />
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model="form.website" placeholder="请输入网址" />
        </el-form-item>
        <el-form-item label="面积" prop="area">
          <el-input v-model="form.area" placeholder="请输入面积" />
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
import { listExh_gallery, getExh_gallery, delExh_gallery, addExh_gallery, updateExh_gallery } from "@/api/exh/exh_gallery";

export default {
  name: "Exh_gallery",
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
      // 展馆信息表格数据
      exh_galleryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        galleryName: null,
        address: null,
        city: null,
        contacts: null,
        telephone: null,
        fax: null,
        website: null,
        area: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        galleryName: [
          { required: true, message: "展馆名称不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "展馆地址不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询展馆信息列表 */
    getList() {
      this.loading = true;
      listExh_gallery(this.queryParams).then(response => {
        this.exh_galleryList = response.rows;
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
        galleryName: null,
        address: null,
        city: null,
        contacts: null,
        telephone: null,
        fax: null,
        website: null,
        area: null,
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
      this.title = "添加展馆信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExh_gallery(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展馆信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExh_gallery(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExh_gallery(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展馆信息编号为"' + ids + '"的数据项？').then(function() {
        return delExh_gallery(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exh/exh_gallery/export', {
        ...this.queryParams
      }, `exh_gallery_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
