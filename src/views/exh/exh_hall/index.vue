<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <el-form-item label="所属展馆" prop="galleryId">

        <el-select v-model="queryParams.galleryId" placeholder="请选择展馆" clearable>
          <el-option
            v-for="dict in exh_galleryList"
            :key="dict.id"
            :label="dict.galleryName"
            :value="dict.id"
          />
        </el-select>


      </el-form-item>
      <el-form-item label="展厅名称" prop="hallName">
        <el-input
          v-model="queryParams.hallName"
          placeholder="请输入展厅名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展厅英文名称" prop="englishName">
        <el-input
          v-model="queryParams.englishName"
          placeholder="请输入展厅英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展位图" prop="boothImg">
        <el-input
          v-model="queryParams.boothImg"
          placeholder="请输入展位图"
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
          v-hasPermi="['exh:exh_hall:add']"
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
          v-hasPermi="['exh:exh_hall:edit']"
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
          v-hasPermi="['exh:exh_hall:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exh:exh_hall:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exh_hallList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="展厅ID" align="center" prop="id" />
      <el-table-column label="所属展馆" align="center" prop="params.galleryName" />
      <el-table-column label="展厅名称" align="center" prop="hallName" />
      <el-table-column label="展厅英文名称" align="center" prop="englishName" />
      <el-table-column label="展位图" align="center" prop="boothImg" width="100">
              <template slot-scope="scope">
                <image-preview :src="scope.row.boothImg" :width="50" :height="50"/>
              </template>
            </el-table-column>
      <el-table-column label="面积" align="center" prop="area" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建者" align="center" prop="createBy" /> -->
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
            v-hasPermi="['exh:exh_hall:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exh:exh_hall:remove']"
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

    <!-- 添加或修改展厅信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">



        <el-form-item label="所属展馆ID" prop="galleryId">
          <el-select v-model="form.galleryId" placeholder="请选择展馆" clearable>
            <el-option
              v-for="dict in exh_galleryList"
              :key="dict.id"
              :label="dict.galleryName"
              :value="dict.id"
            />
          </el-select>

        </el-form-item>
        <el-form-item label="展厅名称" prop="hallName">
          <el-input v-model="form.hallName" placeholder="请输入展厅名称" />
        </el-form-item>
        <el-form-item label="展厅英文名称" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入展厅英文名称" />
        </el-form-item>
        <el-form-item label="展位图" prop="boothImg">
           <image-upload v-model="form.boothImg"/>
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
import { listExh_hall, getExh_hall, delExh_hall, addExh_hall, updateExh_hall } from "@/api/exh/exh_hall";
import { listExh_gallery} from "@/api/exh/exh_gallery";



export default {
  name: "Exh_hall",
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
      // 展厅信息表格数据
      exh_hallList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        galleryId: null,
        hallName: null,
        englishName: null,
        boothImg: null,
        area: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        galleryId: [
          { required: true, message: "所属展馆ID不能为空", trigger: "blur" }
        ],
        hallName: [
          { required: true, message: "展厅名称不能为空", trigger: "blur" }
        ],
      },

      exh_galleryList:[],

    };
  },
  created() {
    this.getList();
    this.getZhanguan()
  },
  methods: {

    // 获取展馆列表
    getZhanguan(){
      var data={
        pageNum: 1,
        pageSize: 100,
      }
      listExh_gallery(data).then(response => {
        this.exh_galleryList = response.rows;
      });
    },

    /** 查询展厅信息列表 */
    getList() {
      this.loading = true;
      listExh_hall(this.queryParams).then(response => {
        this.exh_hallList = response.rows;
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
        galleryId: null,
        hallName: null,
        englishName: null,
        boothImg: null,
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
      this.title = "添加展厅信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExh_hall(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展厅信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExh_hall(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExh_hall(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展厅信息编号为"' + ids + '"的数据项？').then(function() {
        return delExh_hall(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exh/exh_hall/export', {
        ...this.queryParams
      }, `exh_hall_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
