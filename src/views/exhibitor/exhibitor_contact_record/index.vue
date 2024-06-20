<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联络人ID" prop="contactId">
        <el-input
          v-model="queryParams.contactId"
          placeholder="请输入联络人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="客户姓名" prop="contactName">
        <el-input
          v-model="queryParams.contactName"
          placeholder="请输入客户姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="负责人ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入负责人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联络记录" prop="contactRecord">
        <el-input
          v-model="queryParams.contactRecord"
          placeholder="请输入联络记录"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="联络方式" prop="contactType">
        <el-select v-model="queryParams.contactType" placeholder="请选择联络方式" clearable>
          <el-option
            v-for="dict in dict.type.contact_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="销售指数" prop="saleIndex">
        <el-input
          v-model="queryParams.saleIndex"
          placeholder="请输入销售指数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预估面积" prop="estimateArea">
        <el-input
          v-model="queryParams.estimateArea"
          placeholder="请输入预估面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预估金额" prop="estimateAmount">
        <el-input
          v-model="queryParams.estimateAmount"
          placeholder="请输入预估金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下次联络时间" prop="nextContactTime">
        <el-date-picker clearable
          v-model="queryParams.nextContactTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择下次联络时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="意向观众" prop="intentionVisitor">
        <el-select v-model="queryParams.intentionVisitor" placeholder="请选择意向观众" clearable>
          <el-option
            v-for="dict in dict.type.is_intention_visitor"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="确定不参展" prop="determineRefuse">
        <el-select v-model="queryParams.determineRefuse" placeholder="请选择确定不参展" clearable>
          <el-option
            v-for="dict in dict.type.is_determine_refuse"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
      <!--  -->
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
          v-hasPermi="['exhibitor:exhibitor_contact_record:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exhibitor:exhibitor_contact_record:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_contact_record:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_contact_record:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_contact_recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->

      <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />
<!-- contactId -->
      <el-table-column label="联络人" align="center" prop="params.contactName" />

      <el-table-column label="客户姓名" align="center" prop="contactName" />
      <!-- userId -->
      <el-table-column label="负责人" align="center" prop="params.nickName" />

      <el-table-column label="联络记录(备注)" align="center" prop="contactRecord" />
      <el-table-column label="图片" align="center" prop="recordImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.recordImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="附件" align="center" prop="recordFile" /> -->
      <el-table-column label="联络方式" align="center" prop="contactType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.contact_type" :value="scope.row.contactType"/>
        </template>
      </el-table-column>
      <el-table-column label="销售指数" align="center" prop="saleIndex" />
      <el-table-column label="预估面积" align="center" prop="estimateArea" />
      <el-table-column label="预估金额" align="center" prop="estimateAmount" />
      <el-table-column label="下次联络时间" align="center" prop="nextContactTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nextContactTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="意向观众" align="center" prop="intentionVisitor">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_intention_visitor" :value="scope.row.intentionVisitor"/>
        </template>
      </el-table-column>
      <el-table-column label="确定不参展" align="center" prop="determineRefuse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_determine_refuse" :value="scope.row.determineRefuse"/>
        </template>
      </el-table-column>
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
            v-hasPermi="['exhibitor:exhibitor_contact_record:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_contact_record:remove']"
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

    <!-- 添加或修改展商联络记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="联络人ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入联络人ID" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="负责人ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入负责人ID" />
        </el-form-item>
        <el-form-item label="联络记录" prop="contactRecord">
          <el-input v-model="form.contactRecord" placeholder="请输入联络记录" />
        </el-form-item>
        <el-form-item label="图片">
          <image-upload v-model="form.recordImg"/>
        </el-form-item>
        <el-form-item label="附件">
          <file-upload v-model="form.recordFile"/>
        </el-form-item>
        <el-form-item label="联络方式" prop="contactType">
          <el-select v-model="form.contactType" placeholder="请选择联络方式">
            <el-option
              v-for="dict in dict.type.contact_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售指数" prop="saleIndex">
          <el-input v-model="form.saleIndex" placeholder="请输入销售指数" />
        </el-form-item>
        <el-form-item label="预估面积" prop="estimateArea">
          <el-input v-model="form.estimateArea" placeholder="请输入预估面积" />
        </el-form-item>
        <el-form-item label="预估金额" prop="estimateAmount">
          <el-input v-model="form.estimateAmount" placeholder="请输入预估金额" />
        </el-form-item>
        <el-form-item label="下次联络时间" prop="nextContactTime">
          <el-date-picker clearable
            v-model="form.nextContactTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下次联络时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="意向观众">
          <el-radio-group v-model="form.intentionVisitor">
            <el-radio
              v-for="dict in dict.type.is_intention_visitor"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="确定不参展">
          <el-radio-group v-model="form.determineRefuse">
            <el-radio
              v-for="dict in dict.type.is_determine_refuse"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listExhibitor_contact_record, getExhibitor_contact_record, delExhibitor_contact_record, addExhibitor_contact_record, updateExhibitor_contact_record } from "@/api/exhibitor/exhibitor_contact_record";

export default {
  name: "Exhibitor_contact_record",
  dicts: ['contact_type', 'is_determine_refuse', 'is_intention_visitor','pay_record_status', 'zlf_status'],
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
      // 展商联络记录表格数据
      exhibitor_contact_recordList: [],
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
        contactId: null,
        contactName: null,
        userId: null,
        contactRecord: null,
        recordImg: null,
        recordFile: null,
        contactType: null,
        saleIndex: null,
        estimateArea: null,
        estimateAmount: null,
        nextContactTime: null,
        intentionVisitor: null,
        determineRefuse: null,
        status: null,
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
        contactId: [
          { required: true, message: "联络人ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询展商联络记录列表 */
    getList() {
      this.loading = true;
      listExhibitor_contact_record(this.queryParams).then(response => {
        this.exhibitor_contact_recordList = response.rows;
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
        contactId: null,
        contactName: null,
        userId: null,
        contactRecord: null,
        recordImg: null,
        recordFile: null,
        contactType: null,
        saleIndex: null,
        estimateArea: null,
        estimateAmount: null,
        nextContactTime: null,
        intentionVisitor: "0",
        determineRefuse: "0",
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
      this.title = "添加展商联络记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_contact_record(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商联络记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_contact_record(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_contact_record(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商联络记录编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_contact_record(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_contact_record/export', {
        ...this.queryParams
      }, `exhibitor_contact_record_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
