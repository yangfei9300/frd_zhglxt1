<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <el-form-item label="所属展商" prop="exhibitorId">
        <!-- <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入所属展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
        <!--  -->
        <el-select v-model="queryParams.exhibitorId" placeholder="请输入所属展商" clearable>
          <el-option
            v-for="dict in listExhibitor_infoList"
            :key="dict.id"
            :label="dict.exhibitorName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="contactName">
        <el-input
          v-model="queryParams.contactName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="contactGender">
        <el-select v-model="queryParams.contactGender" placeholder="请选择性别" clearable>
          <el-option
            v-for="dict in dict.type.sys_user_sex"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="contactDept">
        <el-input
          v-model="queryParams.contactDept"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职务" prop="contactPost">
        <el-input
          v-model="queryParams.contactPost"
          placeholder="请输入职务"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="地址" prop="contactAddress">
        <el-input
          v-model="queryParams.contactAddress"
          placeholder="请输入地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮编" prop="contactZipcode">
        <el-input
          v-model="queryParams.contactZipcode"
          placeholder="请输入邮编"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="手机号" prop="contactPhone">
        <el-input
          v-model="queryParams.contactPhone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="contactTel">
        <el-input
          v-model="queryParams.contactTel"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <!-- <el-form-item label="传真" prop="contactFax">
        <el-input
          v-model="queryParams.contactFax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Email" prop="contactEmail">
        <el-input
          v-model="queryParams.contactEmail"
          placeholder="请输入Email"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="QQ" prop="contactQq">
        <el-input
          v-model="queryParams.contactQq"
          placeholder="请输入QQ"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="微信" prop="contactWechat">
        <el-input
          v-model="queryParams.contactWechat"
          placeholder="请输入微信"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="其他联系方式" prop="contactOther">
        <el-input
          v-model="queryParams.contactOther"
          placeholder="请输入其他联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地域信息" prop="contactRegion">
        <el-input
          v-model="queryParams.contactRegion"
          placeholder="请输入地域信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
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
     <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_contact:add']"
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
          v-hasPermi="['exhibitor:exhibitor_contact:edit']"
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
          v-hasPermi="['exhibitor:exhibitor_contact:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exhibitor:exhibitor_contact:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_contactList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- exhibitorId -->
      <el-table-column label="所属展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="姓名" align="center" prop="contactName" />
      <el-table-column label="性别" align="center" prop="contactGender">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.contactGender"/>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center" prop="contactDept" />
      <el-table-column label="职务" align="center" prop="contactPost" />
      <el-table-column label="地址" align="center" prop="contactAddress" />
      <el-table-column label="邮编" align="center" prop="contactZipcode" />
      <el-table-column label="手机号" align="center" prop="contactPhone" />
      <el-table-column label="电话" align="center" prop="contactTel" />
      <el-table-column label="传真" align="center" prop="contactFax" />
      <el-table-column label="Email" align="center" prop="contactEmail" />
      <el-table-column label="QQ" align="center" prop="contactQq" />
      <el-table-column label="微信" align="center" prop="contactWechat" />
      <el-table-column label="其他联系方式" align="center" prop="contactOther" />
      <el-table-column label="地域信息" align="center" prop="contactRegion" />
      <el-table-column label="备注" align="center" prop="memo" />
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
            v-hasPermi="['exhibitor:exhibitor_contact:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exhibitor:exhibitor_contact:remove']"
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

    <!-- 添加或修改展商联系人对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入所属展商ID" />
        </el-form-item>
        <el-form-item label="姓名" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.contactGender">
            <el-radio
              v-for="dict in dict.type.sys_user_sex"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" prop="contactDept">
          <el-input v-model="form.contactDept" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="职务" prop="contactPost">
          <el-input v-model="form.contactPost" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="地址" prop="contactAddress">
          <el-input v-model="form.contactAddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="邮编" prop="contactZipcode">
          <el-input v-model="form.contactZipcode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="手机号" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="电话" prop="contactTel">
          <el-input v-model="form.contactTel" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="传真" prop="contactFax">
          <el-input v-model="form.contactFax" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="Email" prop="contactEmail">
          <el-input v-model="form.contactEmail" placeholder="请输入Email" />
        </el-form-item>
        <el-form-item label="QQ" prop="contactQq">
          <el-input v-model="form.contactQq" placeholder="请输入QQ" />
        </el-form-item>
        <el-form-item label="微信" prop="contactWechat">
          <el-input v-model="form.contactWechat" placeholder="请输入微信" />
        </el-form-item>
        <el-form-item label="其他联系方式" prop="contactOther">
          <el-input v-model="form.contactOther" placeholder="请输入其他联系方式" />
        </el-form-item>
        <el-form-item label="地域信息" prop="contactRegion">
          <el-input v-model="form.contactRegion" placeholder="请输入地域信息" />
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
import { listExhibitor_contact, getExhibitor_contact, delExhibitor_contact, addExhibitor_contact, updateExhibitor_contact } from "@/api/exhibitor/exhibitor_contact";

import { listExhibitor_info } from "@/api/exhibitor/exhibitor_info";

export default {
  name: "Exhibitor_contact",
  dicts: ['sys_user_sex', 'zlf_status'],
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
      // 展商联系人表格数据
      exhibitor_contactList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhibitorId: null,
        contactName: null,
        contactGender: null,
        contactDept: null,
        contactPost: null,
        contactAddress: null,
        contactZipcode: null,
        contactPhone: null,
        contactTel: null,
        contactFax: null,
        contactEmail: null,
        contactQq: null,
        contactWechat: null,
        contactOther: null,
        contactRegion: null,
        memo: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exhibitorId: [
          { required: true, message: "所属展商ID不能为空", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
      },
      listExhibitor_infoList:[],//商家列表
    };
  },
  created() {
    this.getList();
    this.getAllList();
  },
  methods: {
    // 获取列表集合
    getAllList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listExhibitor_info(data).then(response => {
        this.listExhibitor_infoList = response.rows;
      });
    },
    /** 查询展商联系人列表 */
    getList() {
      this.loading = true;
      listExhibitor_contact(this.queryParams).then(response => {
        this.exhibitor_contactList = response.rows;
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
        contactName: null,
        contactGender: "0",
        contactDept: null,
        contactPost: null,
        contactAddress: null,
        contactZipcode: null,
        contactPhone: null,
        contactTel: null,
        contactFax: null,
        contactEmail: null,
        contactQq: null,
        contactWechat: null,
        contactOther: null,
        contactRegion: null,
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
      this.title = "添加展商联系人";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_contact(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商联系人";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_contact(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_contact(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商联系人编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_contact(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exhibitor/exhibitor_contact/export', {
        ...this.queryParams
      }, `exhibitor_contact_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
