<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="合同ID" prop="contractId">
        <el-input
          v-model="queryParams.contractId"
          placeholder="请输入合同ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内容类型" prop="contentType">
        <el-select v-model="queryParams.contentType" placeholder="请选择内容类型" clearable>
          <el-option
            v-for="dict in dict.type.contract_content_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容ID" prop="contentId">
        <el-input
          v-model="queryParams.contentId"
          placeholder="请输入内容ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务类别" prop="categoryId">
        <el-input
          v-model="queryParams.categoryId"
          placeholder="请输入服务类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内容名称" prop="contentName">
        <el-input
          v-model="queryParams.contentName"
          placeholder="请输入内容名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格" prop="contentSpec">
        <el-input
          v-model="queryParams.contentSpec"
          placeholder="请输入规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="unitPrice">
        <el-input
          v-model="queryParams.unitPrice"
          placeholder="请输入单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="说明" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="折扣(%)" prop="discount">
        <el-input
          v-model="queryParams.discount"
          placeholder="请输入折扣(%)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠后" prop="afterDiscount">
        <el-input
          v-model="queryParams.afterDiscount"
          placeholder="请输入优惠后"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="抹零抵扣" prop="moling">
        <el-input
          v-model="queryParams.moling"
          placeholder="请输入抹零抵扣"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小计" prop="subTotal">
        <el-input
          v-model="queryParams.subTotal"
          placeholder="请输入小计"
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
          v-hasPermi="['recruit:recruit_contract_content:add']"
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
          v-hasPermi="['recruit:recruit_contract_content:edit']"
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
          v-hasPermi="['recruit:recruit_contract_content:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['recruit:recruit_contract_content:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recruit_contract_contentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="内容类型" align="center" prop="contentType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.contract_content_type" :value="scope.row.contentType"/>
        </template>
      </el-table-column>
      <el-table-column label="内容ID" align="center" prop="contentId" />
      <el-table-column label="服务类别" align="center" prop="categoryId" />
      <el-table-column label="内容名称" align="center" prop="contentName" />
      <el-table-column label="规格" align="center" prop="contentSpec" />
      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="说明" align="center" prop="memo" />
      <el-table-column label="折扣(%)" align="center" prop="discount" />
      <el-table-column label="优惠后" align="center" prop="afterDiscount" />
      <el-table-column label="数量" align="center" prop="num" />
      <el-table-column label="抹零抵扣" align="center" prop="moling" />
      <el-table-column label="小计" align="center" prop="subTotal" />
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
            v-hasPermi="['recruit:recruit_contract_content:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['recruit:recruit_contract_content:remove']"
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

    <!-- 添加或修改合同内容对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="合同ID" prop="contractId">
          <el-input v-model="form.contractId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="内容类型" prop="contentType">
          <el-select v-model="form.contentType" placeholder="请选择内容类型">
            <el-option
              v-for="dict in dict.type.contract_content_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容ID" prop="contentId">
          <el-input v-model="form.contentId" placeholder="请输入内容ID" />
        </el-form-item>
        <el-form-item label="服务类别" prop="categoryId">
          <el-input v-model="form.categoryId" placeholder="请输入服务类别" />
        </el-form-item>
        <el-form-item label="内容名称" prop="contentName">
          <el-input v-model="form.contentName" placeholder="请输入内容名称" />
        </el-form-item>
        <el-form-item label="规格" prop="contentSpec">
          <el-input v-model="form.contentSpec" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="说明" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入说明" />
        </el-form-item>
        <el-form-item label="折扣(%)" prop="discount">
          <el-input v-model="form.discount" placeholder="请输入折扣(%)" />
        </el-form-item>
        <el-form-item label="优惠后" prop="afterDiscount">
          <el-input v-model="form.afterDiscount" placeholder="请输入优惠后" />
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="form.num" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="抹零抵扣" prop="moling">
          <el-input v-model="form.moling" placeholder="请输入抹零抵扣" />
        </el-form-item>
        <el-form-item label="小计" prop="subTotal">
          <el-input v-model="form.subTotal" placeholder="请输入小计" />
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
import { listRecruit_contract_content, getRecruit_contract_content, delRecruit_contract_content, addRecruit_contract_content, updateRecruit_contract_content } from "@/api/recruit/recruit_contract_content";

export default {
  name: "Recruit_contract_content",
  dicts: ['contract_content_type', 'zlf_status'],
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
      // 合同内容表格数据
      recruit_contract_contentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contractId: null,
        contentType: null,
        contentId: null,
        categoryId: null,
        contentName: null,
        contentSpec: null,
        unitPrice: null,
        memo: null,
        discount: null,
        afterDiscount: null,
        num: null,
        moling: null,
        subTotal: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        contractId: [
          { required: true, message: "合同ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询合同内容列表 */
    getList() {
      this.loading = true;
      listRecruit_contract_content(this.queryParams).then(response => {
        this.recruit_contract_contentList = response.rows;
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
        contractId: null,
        contentType: null,
        contentId: null,
        categoryId: null,
        contentName: null,
        contentSpec: null,
        unitPrice: null,
        memo: null,
        discount: null,
        afterDiscount: null,
        num: null,
        moling: null,
        subTotal: null,
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
      this.title = "添加合同内容";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecruit_contract_content(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同内容";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecruit_contract_content(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecruit_contract_content(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除合同内容编号为"' + ids + '"的数据项？').then(function() {
        return delRecruit_contract_content(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/recruit_contract_content/export', {
        ...this.queryParams
      }, `recruit_contract_content_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
