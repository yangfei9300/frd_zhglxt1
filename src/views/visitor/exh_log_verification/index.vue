<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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
     <!-- <el-form-item label="观众唯一标识" prop="cardNum">
        <el-input
          v-model="queryParams.cardNum"
          placeholder="请输入观众唯一标识"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="unionid" prop="unionid">
        <el-input
          v-model="queryParams.unionid"
          placeholder="请输入unionid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="负责人ID" prop="userId">

        <el-select v-model="queryParams.userId" placeholder="请输入负责人" clearable>
          <el-option
            v-for="dict in yewuyuanList"
            :key="dict.userId"
            :label="dict.params.visitorName"
            :value="dict.userId"
          />
        </el-select>

      </el-form-item> -->
      <el-form-item label="核销状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择核销状态" clearable>
          <el-option
            v-for="dict in dict.type.exh_verification_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="核销类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择核销类型" clearable>
          <el-option
            v-for="dict in dict.type.exh_verification_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>


      <el-button
        type="warning"
        plain
        icon="el-icon-download"
        size="mini"
        @click="imporShowClick"
         v-hasPermi="['visitor:exh_log_verification:edit']"
      >导入闸机记录</el-button>

      </el-form-item>
    </el-form>



    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['visitor:exh_log_verification:add']"
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
          v-hasPermi="['visitor:exh_log_verification:edit']"
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
          v-hasPermi="['visitor:exh_log_verification:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['visitor:exh_log_verification:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="exh_log_verificationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众名称" align="center" prop="params.visitorName" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <!-- <el-table-column label="观众唯一标识" align="center" prop="cardNum" /> -->
      <!-- <el-table-column label="unionid" align="center" prop="unionid" /> -->
      <!-- <el-table-column label="负责人名称" align="center" prop="params.nickName" /> -->
      <el-table-column label="核销状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.exh_verification_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="核销类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.exh_verification_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center" prop="memo" /> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
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

    <!-- 添加或修改展会核销记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="观众姓名" prop="visitorId">
          <el-input v-model="form.visitorId" placeholder="请输入观众ID" />
        </el-form-item>
       <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <!-- <el-form-item label="观众唯一标识" prop="cardNum">
          <el-input v-model="form.cardNum" placeholder="请输入观众唯一标识" />
        </el-form-item> -->
        <el-form-item label="unionid" prop="unionid">
          <el-input v-model="form.unionid" placeholder="请输入unionid" />
        </el-form-item>
       <!-- <el-form-item label="负责人ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入负责人ID" />
        </el-form-item> -->
        <el-form-item label="核销状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.exh_verification_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核销类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择核销类型">
            <el-option
              v-for="dict in dict.type.exh_verification_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>




    <el-dialog title="导入数据创建战团" :visible.sync="imporShow" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="核销记录文件" prop="filePathIn">
          <file-upload :fileType="fileType" v-model="filePathIn" />
        </el-form-item>
       <!-- <el-form-item label="参考模板">
          <el-button type="text" @click="downLoadFile">模板下载</el-button>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_file">确 定</el-button>
        <el-button @click="cancel_fileopenCLick">取 消</el-button>
      </div>
    </el-dialog>








  </div>
</template>

<script>
import { listExh_log_verification,list_user_exh_log_verification_visitor,
importexh_log_verification,
 getExh_log_verification, delExh_log_verification, addExh_log_verification,
  updateExh_log_verification } from "@/api/visitor/exh_log_verification";
// 获取负责人列表列表

export default {
  name: "Exh_log_verification",
  dicts: ['exh_verification_type', 'exh_verification_status'],
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
      // 展会核销记录表格数据
      exh_log_verificationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        visitorId: null,
        exhId: null,
        cardNum: null,
        unionid: null,
        userId: null,
        status: null,
        type: null,
        memo: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      yewuyuanList:[],//业务员列表


      imporShow:false,//是否显示导入展商记录
      // 文件导入
      fileOpen: true,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        },
      fileType:["doc", "xls",'xlsx', "ppt", "txt", "pdf"],
      filePathIn:"",//文件导入地址存储
    };
  },
  created() {
    this.getList();
    this.getYewuyuanList();
  },
  methods: {

cancel_fileopenCLick(){
  this.imporShow=false;
},
 // 导入文件
        submitForm_file(){
          var filepath=this.filePathIn;
          if(filepath==''){
            this.$modal.msgError("请选择文件");
            return false;
          }
          var data={
            file:filepath,
          }
          console.log("asd",data)
          this.$modal.loading("正在导入数据，请稍后...");
          importexh_log_verification(data).then(response => {
              this.$modal.closeLoading();
              if(response.code==200){
                this.$modal.msgSuccess("导入成功");
                this.imporShow=false;
                // 刷新当前页签
                this.$tab.refreshPage();
              }else{
                this.$modal.msgSuccess(res.msg);
              }
          }).catch(() => {
            this.$modal.closeLoading();
          });
        },

    // 导入核销记录
    imporShowClick(){
      this.imporShow=!this.imporShow;
    },
    exportZhajihistory(){

    },

    // 获取业务员列表  list_user_exh_log_verification_visitor
    getYewuyuanList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      console.log("获取里欸包")
      list_user_exh_log_verification_visitor(data).then(response => {
        this.yewuyuanList = response.data;
        console.log("业务员列表",  this.yewuyuanList ,response)
      });
    },
    /** 查询展会核销记录列表 */
    getList() {
      this.loading = true;
      listExh_log_verification(this.queryParams).then(response => {
        this.exh_log_verificationList = response.rows;
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
        unionid: null,
        userId: null,
        status: "0",
        type: null,
        memo: null,
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
      this.title = "添加展会核销记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExh_log_verification(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展会核销记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExh_log_verification(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExh_log_verification(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展会核销记录编号为"' + ids + '"的数据项？').then(function() {
        return delExh_log_verification(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('visitor/exh_log_verification/export', {
        ...this.queryParams
      }, `exh_log_verification_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
