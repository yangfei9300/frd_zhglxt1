<template>
  <div class="app-container">
      <right-toolbar @queryTable="getList"></right-toolbar>

<el-row :gutter="10" class="mb8">

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['call:call_person_link:add']"
        >导入</el-button>
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
            @click="toImportInfo(scope.row)"
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
        <el-form-item label="导入名称" prop="importGroup">
          <el-input v-model="form.importGroup" placeholder="请输入导入名称" />
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

    <el-dialog title="导入信息" :visible.sync="openImportAlert" width="95%" append-to-body>

   <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="导入名称" prop="exhId">
        <el-input
          v-model="queryParams.importGroup"
          placeholder="请输入导入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->


      <el-table v-loading="loadingResult" :data="importResultList"
        ref="multipleTable"
       @selection-change="handleSelectionResultChange">
        <el-table-column type="selection" label="当前页" width="55" align="center" />
        <el-table-column label="ID"
             align="center" prop="id">
            </el-table-column>
        <el-table-column label="姓名" align="center" prop="contactName" />
        <el-table-column label="职务" align="center" prop="contactPost" />
        <el-table-column label="公司" align="center" prop="params.exhibitorName" />
        <el-table-column label="电话" align="center" prop="contactTel" />
        <el-table-column label="手机" align="center" prop="contactPhone" />
        <el-table-column label="邮箱" align="center" prop="contactEmail" />
        <el-table-column label="城市" align="center" prop="params.exhibitorCity" />
       <!-- <el-table-column label="最后联系时间" align="center" prop="importGroup" />
        <el-table-column label="修改时间" align="center" prop="importGroup" />
        <el-table-column label="修改人" align="center" prop="importGroup" /> -->
      </el-table>
      <pagination
        v-show="totalResult>0"
        :total="totalResult"
        :page.sync="queryParamsResult.pageNum"
        :limit.sync="queryParamsResult.pageSize"
        @pagination="getImportResultById"
      />
      <div style="padding: 15px 0px;" class="roww center_center">
        <div>选择任务</div>
        <div style="width: 20px;"></div>
        <el-select v-model="queryParamsResult.id" placeholder="请选择任务" clearable>
          <el-option
            v-for="dict in listCall_taskList"
            :key="dict.id"
            :label="dict.taskName"
            :value="dict.id"
          />
        </el-select>
        <div style="width: 10px;"></div>
       <el-button type="primary" @click="toZhenggepiciAdd">整个批次导入任务中</el-button>
        <el-button type="primary" @click="toSubmitData">部分添加到任务</el-button>
        <div class="allline"></div>
      </div>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listCall_target, getCall_target, delCall_target, addCall_target, updateCall_target,
 groupcall_import,filecall_import,listcall_import,addcall_import,alladdcall_import
 } from "@/api/call/call_target";
import { listCall_task } from "@/api/call/call_task";

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
        // importGroup: null,
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


      // 导入结果对话框
      openImportAlert:false,

      queryParamsResult: {
        pageNum: 1,
        pageSize: 10,
        importGroup: null,
      },

    groupcall_importList:[],

      // 提交结果
      importResultList:[],//每次导入数据的结果列表
      totalResult:0,//总数量
      loadingResult:0,
      listCall_taskList:[],//任务列表
      allSel:false,//全选当前页面
      idsResult:[],//选中的ids

      fileType:["xls", "xlsx"]
    };



  },
  created() {
    this.getList();
  },
  methods: {

    // 将整个批次添加到
    toZhenggepiciAdd(){
      var data={
        "importGroup":this.queryParamsResult.importGroup,
        'taskId':this.queryParamsResult.id
      }
      alladdcall_import(data).then(response => {
          if(response.code==200){
            this.$modal.alertError("成功导入了"+response.data+"条");
            this.openImportAlert=false;
            this.$tab.refreshPage();
          }else{
             this.$modal.alertError(response.msg);
          }
      });
    },

    // 提交视频
    toSubmitData(){
      var idsResult=this.idsResult;
      var importResultList=this.importResultList;
      var selResult=[];
      for(var a=0;a<importResultList.length;a++){
        for(var b=0;b<idsResult.length;b++){
          if(idsResult[b]==importResultList[a].id){
            selResult.push(importResultList[a]);
          }
        }
      }
      if(selResult.length<=0){
        this.$modal.alertError("请选择联系人");
        return false;
      }
      if(!this.queryParamsResult.id){
        this.$modal.alertError("请选择任务");
        return false;
      }
      console.log("Aaa",this.queryParamsResult)
      var data={
        'params':{
          'personList':selResult
        },
        'taskId':this.queryParamsResult.id
      }
      addcall_import(data).then(response => {
          if(response.code==200){
            this.$modal.alertError("成功导入了"+response.data+"条");
            this.openImportAlert=false;
            this.$tab.refreshPage();
          }else{
             this.$modal.alertError(response.msg);
          }
      });
    },
  // 全选当前批次的改变
  allSelChange(res){
      if(res){
          this.toggleSelection(this.importResultList);
      }else{
        this.toggleSelection(null);
      }
  },

  // 改变表格数据的选中装填
   toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },

    // 获取任务列表
    getRenwu() {
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listCall_task(data).then(response => {
        this.listCall_taskList = response.rows;
      });
    },
    // 获取导入的详情信息
    getImportResultById(){
        console.log("获取导入信息结果",this.queryParamsResult)
        listcall_import(this.queryParamsResult).then(response => {
          this.importResultList = response.rows;
          this.totalResult = response.total;
          this.loadingResult = false;
        });
    },
    // 显示导入结果
    toImportInfo(row){
      this.queryParamsResult=row;
      this.getImportResultById();
      this.getRenwu();
      this.openImportAlert=true;
    },

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
      this.openImportAlert=false;
      this.importResultLis=[];
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
    handleSelectionResultChange(selection){
      this.idsResult = selection.map(item => item.id)
      console.log("handleSelectionResultChange",this.ids)
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log("aa--多选框选中数据",selection)
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
      // this.download('call/call_target/export', {
      //   ...this.queryParams
      // }, `call_target_${new Date().getTime()}.xlsx`)
      this.open=true;
    }
  }
};
</script>
