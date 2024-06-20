<template>
  <div class="app-container">


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['call:call_target:add']"
        >新增</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="groupcall_importList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="排序"
            type="index"
            width="50">
          </el-table-column>
      <el-table-column label="目标名称" align="center" prop="importGroup" />
      <el-table-column label="数量" align="center" prop="params.groupCount" />
      <el-table-column label="导入人" align="center" prop="params.nickName" />
      <el-table-column label="导入时间" align="center" prop="createTime" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['call:call_target:edit']"
          >查看详情</el-button>
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

    <!-- 添加或修改联络目标对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="目标名称" prop="importGroup">
          <el-input v-model="form.importGroup" placeholder="请输入目标名称" />
        </el-form-item>

        <el-form-item label="模版文件">
          <file-upload v-model="form.file" :fileType="fileType" />
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
import { listCall_target, getCall_target, delCall_target, addCall_target, updateCall_target,
 groupcall_import,filecall_import

 } from "@/api/call/call_target";

export default {
  name: "Call_target",
  dicts: ['call_type', 'call_source', 'zlf_status'],
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
      // 联络目标表格数据
      call_targetList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        importGroup: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        targetName: [
          { required: true, message: "目标名称不能为空", trigger: "blur" }
        ],
        exhId: [
          { required: true, message: "展会ID不能为空", trigger: "blur" }
        ],
      },
      groupcall_importList:[],
      fileType:["doc","docx", "xls", "ppt", "txt", "pdf","xlsx"]
    };
  },
  created() {
    this.getList();
  },
  methods: {

    /** 查询联络目标列表 */
    getList() {
      this.loading = true;
      groupcall_import(this.queryParams).then(response => {
        this.groupcall_importList = response.rows;
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
        "file": "",
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
      this.title = "添加联络目标";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCall_target(id).then(response => {
        this.form = response.data;
        this.form.callType = this.form.callType.split(",");
        this.open = true;
        this.title = "修改联络目标";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        console.log("提交Anastasia",this.form)
        if (valid) {
          if (this.form.id != null) {
            updateCall_target(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            filecall_import(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('call/call_target/export', {
        ...this.queryParams
      }, `call_target_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
