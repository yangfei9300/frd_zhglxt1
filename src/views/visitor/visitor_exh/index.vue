<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="138px">


      <el-form-item label="观众名称" prop="visitorName">
        <el-input v-model="queryParams.visitorName" placeholder="请输入观众名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入公司名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="手机号" prop="visitorPhone">
        <el-input v-model="queryParams.visitorPhone" placeholder="请输入手机号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

<el-form-item label="省" prop="visitorPhone">
        <el-input v-model="queryParams.visitorProvince" placeholder="请输入省" clearable
        @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="市" prop="visitorPhone">
        <el-input v-model="queryParams.visitorCity"
        placeholder="请输入市" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      
      <el-form-item label="详细地址" prop="visitorAddress">
        <el-input v-model="queryParams.visitorAddress"
        placeholder="请输入详细地址" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>


      <!-- <el-form-item label="观众ID" prop="visitorId">
        <el-input
          v-model="queryParams.visitorId"
          placeholder="请输入观众ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!--  <el-form-item label="观众唯一标识" prop="cardNum">
        <el-input
          v-model="queryParams.cardNum"
          placeholder="请输入观众唯一标识"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="邀请人" prop="referrerId">
        <el-input
          v-model="queryParams.referrerId"
          placeholder="请输入邀请人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="邀请来源" prop="referrerSource">
        <el-input
          v-model="queryParams.referrerSource"
          placeholder="请输入邀请来源"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="团体id" prop="groupId">
        <el-input
          v-model="queryParams.groupId"
          placeholder="请输入团体id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="预登记来源" prop="preSource">
        <el-select v-model="queryParams.preSource" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.pre_source_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="到场状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.is_arrive" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <!-- pre_referrer_source_type -->
      <!-- <el-form-item label="预登记邀请来源" prop="preReferrerSource">
        <el-select v-model="queryParams.handleQuery" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.pre_referrer_source_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item> -->

      <el-form-item label="邀请人" prop="preSource">
        <el-select v-model="queryParams.referrerId" placeholder="请选择邀请人" clearable>
          <el-option v-for="dict in referrerlistvisitor_exhList" :key="dict.referrerId" :label="dict.params.referrerName"
            :value="dict.referrerId" />
        </el-select>
      </el-form-item>
      <el-form-item label="团队" prop="preSource">
        <el-select v-model="queryParams.groupId" placeholder="请选择团队" clearable>
          <el-option v-for="dict in grouplistvisitor_exhList" :key="dict.groupId" :label="dict.params.groupName"
            :value="dict.groupId" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="负责人ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入负责人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
    <!--  <el-form-item label="备注" prop="memo">
        <el-input v-model="queryParams.memo" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <!-- <el-form-item label="是否支付会议款项" prop="isPay">
        <el-input
          v-model="queryParams.isPay"
          placeholder="请输入是否支付会议款项"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付金额" prop="payAmount">
        <el-input
          v-model="queryParams.payAmount"
          placeholder="请输入支付金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
   <!--   <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['visitor:visitor_exh:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['visitor:visitor_exh:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['visitor:visitor_exh:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['visitor:visitor_exh:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="visitor_exhList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众名称" align="center" prop="visitorName" />
      <el-table-column label="公司" align="center" prop="companyName" />
      <el-table-column label="手机号" align="center" prop="visitorPhone" />
       <el-table-column label="省" align="center" prop="visitorProvince" />
       <el-table-column label="市" align="center" prop="visitorCity" />
       
       <el-table-column label="详细地址" align="center" prop="visitorAddress" />
       
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <!-- <el-table-column label="观众唯一标识" align="center" prop="cardNum" /> -->
      <el-table-column label="邀请人" align="center" prop="params.referrerName" />
      <!-- <el-table-column label="邀请来源" align="center" prop="referrerSource" /> -->
      <!-- <el-table-column label="注册方式" align="center" prop="registerType" /> -->
      <el-table-column label="团体名称" align="center" prop="params.groupName" />
      <!-- <el-table-column label="预登记来源" align="center" prop="preSource" /> -->

      <el-table-column label="预登记来源" align="center" prop="preSource">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pre_source_type" :value="scope.row.preSource" />
        </template>
      </el-table-column>
      <el-table-column label="到场状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_arrive" :value="scope.row.status" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="预登记邀请来源" align="center" prop="preReferrerSource" /> -->
<!--      <el-table-column label="预登记邀请来源" align="center" prop="preReferrerSource">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pre_referrer_source_type" :value="scope.row.preReferrerSource" />
        </template>
      </el-table-column> -->


      <!-- <el-table-column label="状态" align="center" prop="preReferrerSource">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pre_referrer_source_type" :value="scope.row.preReferrerSource"/>
        </template>
      </el-table-column> -->

      <!-- pre_referrer_source_type -->

      <!-- <el-table-column label="负责人ID" align="center" prop="userId" /> -->
      <!--  -->
      <!-- <el-table-column label="是否支付会议款项" align="center" prop="isPay">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.biz_yes_no" :value="scope.row.isPay"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="支付金额" align="center" prop="payAmount" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['visitor:visitor_exh:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['visitor:visitor_exh:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改观众展会关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">


        <el-form-item label="姓名" prop="visitorName">
          <el-input v-model="form.visitorName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>

        <el-form-item label="省" prop="visitorProvince">
          <el-input v-model="form.visitorProvince" placeholder="请输入省" />
        </el-form-item>

        <el-form-item label="市" prop="visitorCity">
          <el-input v-model="form.visitorCity" placeholder="请输入市" />
        </el-form-item>

        <el-form-item label="所在团ID" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入所在团ID" />
        </el-form-item>
 <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>


        <!-- <el-form-item label="观众ID" prop="visitorId">
          <el-input v-model="form.visitorId" placeholder="请输入观众ID" />
        </el-form-item> -->
        <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <!-- <el-form-item label="观众唯一标识" prop="cardNum">
          <el-input v-model="form.cardNum" placeholder="请输入观众唯一标识" />
        </el-form-item> -->
        <!-- <el-form-item label="邀请人" prop="referrerId">
          <el-input v-model="form.referrerId" placeholder="请输入邀请人" />
        </el-form-item> -->
        <!--  <el-form-item label="邀请来源" prop="referrerSource">
          <el-input v-model="form.referrerSource" placeholder="请输入邀请来源" />
        </el-form-item> -->
        <!--  <el-form-item label="团体id" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入团体id" />
        </el-form-item> -->
        <!-- <el-form-item label="预登记来源" prop="preSource">
          <el-input v-model="form.preSource" placeholder="请输入预登记来源" />
        </el-form-item>
        <el-form-item label="预登记邀请来源" prop="preReferrerSource">
          <el-input v-model="form.preReferrerSource" placeholder="请输入预登记邀请来源" />
        </el-form-item>
        <el-form-item label="负责人ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入负责人ID" />
        </el-form-item>

        <el-form-item label="是否支付会议款项" prop="isPay">
          <el-input v-model="form.isPay" placeholder="请输入是否支付会议款项" />
        </el-form-item>
        <el-form-item label="支付金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入支付金额" />
        </el-form-item> -->
        <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.zlf_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listVisitor_exh,
    getVisitor_exh,
    delVisitor_exh,
    addVisitor_exh,
    updateVisitor_exh,
    grouplistvisitor_exh,
    referrerlistvisitor_exh
  } from "@/api/visitor/visitor_exh";

  export default {
    name: "Visitor_exh",
    dicts: ['zlf_status', 'pre_source_type', 'pre_referrer_source_type','is_arrive'],
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
        // 观众展会关联表格数据
        visitor_exhList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          visitorAddress:null,
          visitorName: null,
          companyName: null,
          visitorPhone: null,

          pageNum: 1,
          pageSize: 10,
          visitorId: null,
          exhId: null,
          cardNum: null,
          referrerId: null,
          referrerSource: null,
          registerType: null,
          groupId: null,
          preSource: null,
          preReferrerSource: null,
          userId: null,
          memo: null,
          isPay: null,
          payAmount: null,
          status: null,

          visitorProvince:null,
          visitorCity:null,

        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        grouplistvisitor_exhList:[],//团列表
        referrerlistvisitor_exhList:[]//邀请人列表
      };
    },
    created() {
      this.getAbout()
      this.getList();
    },
    methods: {

      // 获取邀请人列表
      // grouplistvisitor_exh,
    // referrerlistvisitor_exh
     // 获取相关辅助数据
     getAbout(){
        var data={
            pageNum: 1,
            pageSize: 10000,
        }
        grouplistvisitor_exh(data).then(response => {

          this.grouplistvisitor_exhList = response.data;
        });
        referrerlistvisitor_exh(data).then(response => {
          this.referrerlistvisitor_exhList = response.data;
        });
     },


      /** 查询观众展会关联列表 */
      getList() {
        this.loading = true;
        listVisitor_exh(this.queryParams).then(response => {
          this.visitor_exhList = response.rows;
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
          visitorId: null,
          exhId: null,
          cardNum: null,
          referrerId: null,
          referrerSource: null,
          registerType: null,
          groupId: null,
          preSource: null,
          preReferrerSource: null,
          userId: null,
          memo: null,
          isPay: null,
          payAmount: null,
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
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加观众展会关联";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getVisitor_exh(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改观众展会关联";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateVisitor_exh(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addVisitor_exh(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除观众展会关联编号为"' + ids + '"的数据项？').then(function() {
          return delVisitor_exh(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('visitor/visitor_exh/export', {
          ...this.queryParams
        }, `visitor_exh_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
