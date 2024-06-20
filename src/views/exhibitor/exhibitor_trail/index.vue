<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人ID" prop="createId">
        <el-input
          v-model="queryParams.createId"
          placeholder="请输入操作人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上一负责人" prop="preOwnerUser">
        <el-input
          v-model="queryParams.preOwnerUser"
          placeholder="请输入上一负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接手负责人" prop="postOwnerUser">
        <el-input
          v-model="queryParams.postOwnerUser"
          placeholder="请输入接手负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作方式" prop="operationType">
        <el-select v-model="queryParams.operationType" placeholder="请选择操作方式" clearable>
          <el-option
            v-for="dict in dict.type.operation_type"
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
          v-hasPermi="['exhibitor:exhibitor_trail:add']"
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
          v-hasPermi="['exhibitor:exhibitor_trail:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_trail:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_trail:export']"
        >导出</el-button>
      </el-col>  -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_trailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <!-- exhibitorId -->
      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="操作人" align="center" prop="params.nickName" />
      <el-table-column label="上一负责人" align="center" prop="params.preOwnerUser" />
      <el-table-column label="接手负责人" align="center" prop="params.postNickName" />
      <el-table-column label="操作方式" align="center" prop="operationType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.operation_type" :value="scope.row.operationType"/>
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
            v-hasPermi="['exhibitor:exhibitor_trail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_trail:remove']"
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

    <!-- 添加或修改展商轨迹对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="操作人ID" prop="createId">
          <el-input v-model="form.createId" placeholder="请输入操作人ID" />
        </el-form-item>
        <el-form-item label="上一负责人" prop="preOwnerUser">
          <el-input v-model="form.preOwnerUser" placeholder="请输入上一负责人" />
        </el-form-item>
        <el-form-item label="接手负责人" prop="postOwnerUser">
          <el-input v-model="form.postOwnerUser" placeholder="请输入接手负责人" />
        </el-form-item>
        <el-form-item label="操作方式" prop="operationType">
          <el-select v-model="form.operationType" placeholder="请选择操作方式">
            <el-option
              v-for="dict in dict.type.operation_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
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
import { listExhibitor_trail, getExhibitor_trail, delExhibitor_trail, addExhibitor_trail, updateExhibitor_trail } from "@/api/exhibitor/exhibitor_trail";

export default {
  name: "Exhibitor_trail",
  dicts: ['operation_type'],
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
      // 展商轨迹表格数据
      exhibitor_trailList: [],
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
        createId: null,
        preOwnerUser: null,
        postOwnerUser: null,
        operationType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exhId: [
          { required: true, message: "展会ID不能为空", trigger: "blur" }
        ],
        exhibitorId: [
          { required: true, message: "展商ID不能为空", trigger: "blur" }
        ],
        createId: [
          { required: true, message: "操作人ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询展商轨迹列表 */
    getList() {
      this.loading = true;
      listExhibitor_trail(this.queryParams).then(response => {
        this.exhibitor_trailList = response.rows;
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
        createId: null,
        preOwnerUser: null,
        postOwnerUser: null,
        operationType: null,
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
      this.title = "添加展商轨迹";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_trail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商轨迹";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_trail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_trail(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商轨迹编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_trail(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_trail/export', {
        ...this.queryParams
      }, `exhibitor_trail_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
