<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="服务" prop="serviceId">
        <!-- <el-input
          v-model="queryParams.serviceId"
          placeholder="请输入服务"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->

        <el-select v-model="queryParams.serviceId" placeholder="请选择服务" clearable>
          <el-option
            v-for="dict in recruit_service_projectList"
            :key="dict.id"
            :label="dict.projectName"
            :value="dict.id"
          />
        </el-select>

        <!-- .recruit_service_projectList -->


      </el-form-item>
      <!-- <el-form-item label="订购数量" prop="reservationNum">
        <el-input
          v-model="queryParams.reservationNum"
          placeholder="请输入订购数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入所属展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="业务员ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入业务员ID"
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_service_reservation:add']"
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
          v-hasPermi="['exhibitor:exhibitor_service_reservation:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_service_reservation:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_service_reservation:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_service_reservationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
      <el-table-column label="服务类型" align="center" prop="params.categoryName" />
      <el-table-column label="服务名称" align="center" prop="params.projectName" />

      <el-table-column label="订购数量" align="center" prop="reservationNum" />
      <!-- <el-table-column label="所属展会ID" align="center" prop="exhId" /> -->
      <el-table-column label="业务员ID" align="center" prop="params.nickName" />
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
            v-hasPermi="['exhibitor:exhibitor_service_reservation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_service_reservation:remove']"
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

    <!-- 添加或修改展商服务预定对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="服务ID" prop="serviceId">
          <el-input v-model="form.serviceId" placeholder="请输入服务ID" />
        </el-form-item>
        <el-form-item label="订购数量" prop="reservationNum">
          <el-input v-model="form.reservationNum" placeholder="请输入订购数量" />
        </el-form-item>
        <el-form-item label="所属展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入所属展会ID" />
        </el-form-item>
        <el-form-item label="业务员ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入业务员ID" />
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
import { listExhibitor_service_reservation, getExhibitor_service_reservation, delExhibitor_service_reservation, addExhibitor_service_reservation, updateExhibitor_service_reservation } from "@/api/exhibitor/exhibitor_service_reservation";

import { listRecruit_service_project} from "@/api/recruit/recruit_service_project";


export default {
  name: "Exhibitor_service_reservation",
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
      // 展商服务预定表格数据
      exhibitor_service_reservationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhibitorId: null,
        serviceId: null,
        reservationNum: null,
        exhId: null,
        userId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      recruit_service_projectList:[],//服务列表
    };
  },
  created() {
    this.getList();
    this.getServiceList();
  },
  methods: {

    getServiceList(){
      var queryParams={
        pageNum: 1,
        pageSize: 10,
      };
      listRecruit_service_project(queryParams).then(response => {
        this.recruit_service_projectList = response.rows;
      });
    },

    /** 查询展商服务预定列表 */
    getList() {
      this.loading = true;
      listExhibitor_service_reservation(this.queryParams).then(response => {
        this.exhibitor_service_reservationList = response.rows;
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
        serviceId: null,
        reservationNum: null,
        exhId: null,
        userId: null,
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
      this.title = "添加展商服务预定";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_service_reservation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商服务预定";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_service_reservation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_service_reservation(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商服务预定编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_service_reservation(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_service_reservation/export', {
        ...this.queryParams
      }, `exhibitor_service_reservation_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
