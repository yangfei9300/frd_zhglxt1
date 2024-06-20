<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="姓名" prop="exhibitorName">
        <el-input
          v-model="queryParams.exhibitorName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="exhibitorPhone">
        <el-input
          v-model="queryParams.exhibitorPhone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="职务" prop="exhibitorPost">
        <el-input
          v-model="queryParams.exhibitorPost"
          placeholder="请输入职务"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展位号" prop="boothNo">
        <el-input
          v-model="queryParams.boothNo"
          placeholder="请输入展位号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
  <!--    <el-form-item label="省份" prop="visitorProvince">
        <el-input
          v-model="queryParams.visitorProvince"
          placeholder="请输入省份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->


      <!-- <el-form-item label="是否支付款项" prop="isPay">
        <el-input
          v-model="queryParams.isPay"
          placeholder="请输入是否支付款项"
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
          v-hasPermi="['visitor:exhibitor_arrive:add']"
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
          v-hasPermi="['visitor:exhibitor_arrive:edit']"
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
          v-hasPermi="['visitor:exhibitor_arrive:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['visitor:exhibitor_arrive:export']"
        >导出</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExportQr"
          v-hasPermi="['visitor:exhibitor_arrive:list']"
        >导出全部二维码</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exhibitor_arriveList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="姓名" align="center" prop="exhibitorName" />
      <el-table-column label="公司" align="center" prop="companyName" />
      <el-table-column label="手机号" align="center" prop="exhibitorPhone" />
      <el-table-column label="职务" align="center" prop="exhibitorPost" />
      <el-table-column label="展位号" align="center" prop="boothNo" />
      <!-- <el-table-column label="省份" align="center" prop="visitorProvince" /> -->

      <el-table-column label="二维码" align="center" prop="qrcode" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.qrcode" :width="50" :height="50"/>
        </template>
      </el-table-column>

     <!-- <el-table-column label="是否填写问卷" align="center" prop="isAnswer" />
      <el-table-column label="是否支付款项" align="center" prop="isPay" />
      <el-table-column label="支付金额" align="center" prop="payAmount" /> -->

      <!-- <el-table-column label="到场状态" align="center" prop="status" /> -->

      <el-table-column label="到场状态" align="center" prop="status" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.status==1?'已到场':'未到场' }}</span>
        </template>
      </el-table-column>

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
            v-hasPermi="['visitor:exhibitor_arrive:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['visitor:exhibitor_arrive:remove']"
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

    <!-- 添加或修改展商报道对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <el-form-item label="姓名" prop="exhibitorName">
          <el-input v-model="form.exhibitorName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="公司" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司" />
        </el-form-item>
        <el-form-item label="手机号" prop="exhibitorPhone">
          <el-input v-model="form.exhibitorPhone" placeholder="请输入手机号" />
        </el-form-item>
        <!-- <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
        </el-form-item> -->
        <el-form-item label="职务" prop="exhibitorPost">
          <el-input v-model="form.exhibitorPost" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="展位号" prop="boothNo">
          <el-input v-model="form.boothNo" placeholder="请输入展位号" />
        </el-form-item>
       <!-- <el-form-item label="省份" prop="visitorProvince">
          <el-input v-model="form.visitorProvince" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="visitorCity">
          <el-input v-model="form.visitorCity" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="地址" prop="visitorAddress">
          <el-input v-model="form.visitorAddress" placeholder="请输入地址" />
        </el-form-item> -->
        <!-- <el-form-item label="二维码" prop="qrcode">
          <el-input v-model="form.qrcode" placeholder="请输入二维码" />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
        <el-form-item label="唯一标识" prop="cardNum">
          <el-input v-model="form.cardNum" placeholder="请输入唯一标识" />
        </el-form-item>
        <el-form-item label="邀请人(unionid)" prop="referrerId">
          <el-input v-model="form.referrerId" placeholder="请输入邀请人(unionid)" />
        </el-form-item>
        <el-form-item label="邀请来源" prop="referrerSource">
          <el-input v-model="form.referrerSource" placeholder="请输入邀请来源" />
        </el-form-item>
        <el-form-item label="团体id" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入团体id" />
        </el-form-item>
        <el-form-item label="预登记来源" prop="preSource">
          <el-input v-model="form.preSource" placeholder="请输入预登记来源" />
        </el-form-item>
        <el-form-item label="预登记邀请来源" prop="preReferrerSource">
          <el-input v-model="form.preReferrerSource" placeholder="请输入预登记邀请来源" />
        </el-form-item>
        <el-form-item label="是否填写问卷" prop="isAnswer">
          <el-input v-model="form.isAnswer" placeholder="请输入是否填写问卷" />
        </el-form-item>
        <el-form-item label="负责人ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入负责人ID" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
         -->
       <!--  <el-form-item label="是否支付款项" prop="isPay">
           <el-input v-model="form.isPay" placeholder="请输入是否支付款项" />
         </el-form-item> -->
<!--        <el-form-item label="支付金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入支付金额" />
        </el-form-item> -->
      <!--  <el-form-item label="删除标志" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
        </el-form-item>
        <el-form-item label="乐观锁" prop="version">
          <el-input v-model="form.version" placeholder="请输入乐观锁" />
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
import { listExhibitor_arrive, getExhibitor_arrive, delExhibitor_arrive,
addExhibitor_arrive, updateExhibitor_arrive,exhibitorexport,
 } from "@/api/visitor/exhibitor_arrive";
 import { saveAs } from 'file-saver';

export default {
  name: "Exhibitor_arrive",
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
      // 展商报道表格数据
      exhibitor_arriveList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhId: null,
        exhibitorName: null,
        companyName: null,
        exhibitorPhone: null,
        idNumber: null,
        exhibitorPost: null,
        boothNo: null,
        visitorProvince: null,
        visitorCity: null,
        visitorAddress: null,
        qrcode: null,
        exhibitorId: null,
        cardNum: null,
        referrerId: null,
        referrerSource: null,
        registerType: null,
        groupId: null,
        preSource: null,
        preReferrerSource: null,
        isAnswer: null,
        userId: null,
        memo: null,
        isPay: null,
        payAmount: null,
        status: null,
        version: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      selExhInfo:{}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    saveFile(blob, filename) {
          saveAs(blob, filename);
      },
    // 导出二维码
    handleExportQr(){
      // exhibitorexport(this.queryParams).then(response => {
      //     console.log("adad ",response);
      //     this.saveFile(response,"文件地址");
      // });
// `exhibitor_arrive_${new Date().getTime()}.zip`

        var selExhInfo = this.$ls.get('selExhInfo');
        if (selExhInfo) {

          this.selExhInfo = selExhInfo;
          this.download('visitor/exhibitor_arrive/export/exhibitor', {
            ...this.queryParams
          }, this.selExhInfo.exhName+"展商二维码集合.zip")

        } else {

        }





    },

    /** 查询展商报道列表 */
    getList() {
      this.loading = true;
      listExhibitor_arrive(this.queryParams).then(response => {
        this.exhibitor_arriveList = response.rows;
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
        exhibitorName: null,
        companyName: null,
        exhibitorPhone: null,
        idNumber: null,
        exhibitorPost: null,
        boothNo: null,
        visitorProvince: null,
        visitorCity: null,
        visitorAddress: null,
        qrcode: null,
        exhibitorId: null,
        cardNum: null,
        referrerId: null,
        referrerSource: null,
        registerType: null,
        groupId: null,
        preSource: null,
        preReferrerSource: null,
        isAnswer: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加展商报道";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_arrive(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商报道";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_arrive(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExhibitor_arrive(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商报道编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_arrive(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('visitor/exhibitor_arrive/export', {
        ...this.queryParams
      }, `exhibitor_arrive_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
