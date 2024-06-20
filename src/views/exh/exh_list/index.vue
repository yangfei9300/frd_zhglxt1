<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="118px">
      <el-form-item label="所属展会项目" prop="typeId">
        <!-- <el-input
          v-model="queryParams.typeId"
          placeholder="请输入所属展会项目ID"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
        <el-select v-model="queryParams.typeId" placeholder="请选择展会项目" clearable>
          <el-option
            v-for="dict in listExh_typeList"
            :key="dict.id"
            :label="dict.typeName"
            :value="dict.id"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="展会全称" prop="exhName">
        <el-input
          v-model="queryParams.exhName"
          placeholder="请输入展会全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展会英文名称" prop="englishName">
        <el-input
          v-model="queryParams.englishName"
          placeholder="请输入展会英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展会简称" prop="shortName">
        <el-input
          v-model="queryParams.shortName"
          placeholder="请输入展会简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="展会开始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择展会开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="展会结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择展会结束时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="所属展馆" prop="galleryId">

        <el-select   v-model="queryParams.galleryId" placeholder="请选择所属展馆" clearable

        >
          <el-option
            v-for="dict in listExh_galleryList"
            :key="dict.id"
            :label="dict.galleryName"
            :value="dict.id"
          />
        </el-select>

      </el-form-item>
      <!-- <el-form-item label="所属展厅"  prop="hallId">
        <el-select v-model="queryParams.hallId" placeholder="请选择所属展厅" clearable>
          <el-option
            v-for="dict in listExh_hallList"
            :key="dict.id"
            :label="dict.hallName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="举办城市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入举办城市"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="所属行业" prop="trade">
        <el-input
          v-model="queryParams.trade"
          placeholder="请输入所属行业"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展会类别" prop="exhCategory">
        <el-input
          v-model="queryParams.exhCategory"
          placeholder="请输入展会类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="问卷调查表ID" prop="quesId">
        <el-input
          v-model="queryParams.quesId"
          placeholder="请输入问卷调查表ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="是否本公司展会" prop="isSelf">
        <el-select v-model="queryParams.isSelf" placeholder="请选择是否本公司展会" clearable>
          <el-option
            v-for="dict in dict.type.is_self_exh"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="观众项目经理" prop="visitorManager">
        <el-input
          v-model="queryParams.visitorManager"
          placeholder="请输入观众项目经理"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="招展项目经理" prop="recruitManager">
        <el-input
          v-model="queryParams.recruitManager"
          placeholder="请输入招展项目经理"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="招展工作组" prop="recruitGroup">
        <el-input
          v-model="queryParams.recruitGroup"
          placeholder="请输入招展工作组"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
     <!-- <el-form-item label="是否用于招展" prop="isRecruit">
        <el-select v-model="queryParams.isRecruit" placeholder="请选择是否用于招展" clearable>
          <el-option
            v-for="dict in dict.type.whether_recruit"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
     <!-- <el-form-item label="展会级别" prop="exhLevel">
        <el-input
          v-model="queryParams.exhLevel"
          placeholder="请输入展会级别"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exh:exh_list:add']"
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
          v-hasPermi="['exh:exh_list:edit']"
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
          v-hasPermi="['exh:exh_list:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exh:exh_list:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exh_listList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="展会ID" align="center" prop="id" />
      <el-table-column label="展会简称" align="center" prop="shortName" />
      <el-table-column label="展会全称" align="center" prop="exhName" />
      <el-table-column label="举办城市" align="center" prop="city" />
      <el-table-column label="展会开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展会结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="展会短链接" align="center" prop="urlDuan" />

     <!-- <el-table-column label="所属展会项目ID" align="center" prop="typeId" />
      <el-table-column label="展会英文名称" align="center" prop="englishName" />


      <el-table-column label="所属展馆ID" align="center" prop="galleryId" />
      <el-table-column label="所属展厅ID" align="center" prop="hallId" /> -->



      <!-- <el-table-column label="所属行业" align="center" prop="trade" />
      <el-table-column label="展会类别" align="center" prop="exhCategory" /> -->
      <!-- <el-table-column label="问卷调查表ID" align="center" prop="quesId" /> -->
      <!-- <el-table-column label="是否本公司展会" align="center" prop="isSelf">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_self_exh" :value="scope.row.isSelf"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="观众项目经理" align="center" prop="visitorManager" />
      <el-table-column label="招展项目经理" align="center" prop="recruitManager" />
      <el-table-column label="招展工作组" align="center" prop="recruitGroup" /> -->
      <!-- <el-table-column label="是否用于招展" align="center" prop="isRecruit">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.whether_recruit" :value="scope.row.isRecruit"/>
        </template>
      </el-table-column>
      <el-table-column label="展会级别" align="center" prop="exhLevel" /> -->
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
            v-hasPermi="['exh:exh_list:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exh:exh_list:remove']"
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

    <!-- 添加或修改展会信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="所属展会项目" prop="typeId">
          <el-select v-model="form.typeId" placeholder="请选择展会项目" clearable>
            <el-option
              v-for="dict in listExh_typeList"
              :key="dict.id"
              :label="dict.typeName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="展会全称" prop="exhName">
          <el-input v-model="form.exhName" placeholder="请输入展会全称" />
        </el-form-item>
        <el-form-item label="展会英文名称" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入展会英文名称" />
        </el-form-item>
        <el-form-item label="展会简称" prop="shortName">
          <el-input v-model="form.shortName" placeholder="请输入展会简称" />
        </el-form-item>
        <el-form-item label="展会开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择展会开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="展会结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择展会结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属展馆" prop="galleryId">
          <el-select v-model="form.galleryId" placeholder="请选择所属展馆" clearable
          @change="changeGallery"
          >
            <el-option
              v-for="dict in listExh_galleryList"
              :key="dict.id"
              :label="dict.galleryName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属展厅" prop="hallId">
          <el-select v-model="form.hallId" clearable multiple placeholder="请选择所属展厅" clearable>
            <el-option
              v-for="dict in listExh_hallList"
              :key="dict.id"
              :label="dict.hallName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="举办城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入举办城市" />
        </el-form-item>
        <el-form-item label="所属行业" prop="trade">
          <el-input v-model="form.trade" placeholder="请输入所属行业" />
        </el-form-item>
        <el-form-item label="展会类别" prop="exhCategory">
          <el-input v-model="form.exhCategory" placeholder="请输入展会类别" />



        </el-form-item>
        <el-form-item label="问卷调查表ID" prop="quesId">
          <!-- <el-input v-model="form.quesId" placeholder="请输入问卷调查表ID" /> -->

          <el-select v-model="form.quesId" clearable  placeholder="请选择所属展厅" clearable>
            <el-option
              v-for="dict in listQuestionnaireList"
              :key="dict.id"
              :label="dict.title"
              :value="dict.id"
            />
          </el-select>


        </el-form-item>
        <el-form-item label="是否本公司展会">
          <el-radio-group v-model="form.isSelf">
            <el-radio
              v-for="dict in dict.type.is_self_exh"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="观众项目经理" prop="visitorManager">
          <el-input v-model="form.visitorManager" placeholder="请输入观众项目经理" />
        </el-form-item>
        <el-form-item label="招展项目经理" prop="recruitManager">
          <el-input v-model="form.recruitManager" placeholder="请输入招展项目经理" />
        </el-form-item>
        <el-form-item label="招展工作组" prop="recruitGroup">
          <el-input v-model="form.recruitGroup" placeholder="请输入招展工作组" />
        </el-form-item>
        <el-form-item label="是否用于招展">
          <el-radio-group v-model="form.isRecruit">
            <el-radio
              v-for="dict in dict.type.whether_recruit"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展会级别" prop="exhLevel">
          <el-input v-model="form.exhLevel" placeholder="请输入展会级别" />
        </el-form-item> -->
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
import { listExh_list, getExh_list, delExh_list, addExh_list, updateExh_list } from "@/api/exh/exh_list";
// 展会项目分类
import { listExh_type } from "@/api/exh/exh_type";
// 展馆
import { listExh_gallery } from "@/api/exh/exh_gallery";
// 展厅
import { listExh_hall} from "@/api/exh/exh_hall";

// 问卷裂帛啊
import { listQuestionnaire } from "@/api/survey/questionnaire";

export default {
  name: "Exh_list",
  dicts: ['whether_recruit', 'is_self_exh', 'zlf_status'],
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
      // 展会信息表格数据
      exh_listList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeId: null,
        exhName: null,
        englishName: null,
        shortName: null,
        startTime: null,
        endTime: null,
        galleryId: null,
        hallId: null,
        city: null,
        trade: null,
        exhCategory: null,
        quesId: null,
        isSelf: null,
        visitorManager: null,
        recruitManager: null,
        recruitGroup: null,
        isRecruit: null,
        exhLevel: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        typeId: [
          { required: true, message: "所属展会项目ID不能为空", trigger: "blur" }
        ],
        exhName: [
          { required: true, message: "展会全称不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "展会开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "展会结束时间不能为空", trigger: "blur" }
        ],
      },


      listExh_typeList:[],//展会类型列表
      listExh_hallList:[],//展会展厅信息
      listExh_galleryList:[],//展馆信息
      listQuestionnaireList:[],//问卷调查列表
    };
  },
  created() {

    this.$utils.meFuctions();

    this.getList();
    // 获取展区类型
    this.listExhTypegetList()
    this.getZhanting()
  },
  methods: {



    // 展馆改变回调
    changeGallery(res){
      console.log("展馆改变回调",res)
      this.listExh_hallList=[];
      this.form.hallId=[];
      this.getZhanting(res);
    },
    // 获取展厅
    getZhanting(id){
      var  data={
        pageNum: 1,
        pageSize: 1000,
        galleryId:id,
      }
      listExh_hall(data).then(response => {
        this.listExh_hallList = response.rows;
      });
    },
    // 获取展会项目
    listExhTypegetList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      // 获取展会项目
      listExh_type(data).then(response => {
        this.listExh_typeList = response.rows;
      });

      // 获取展馆
      listExh_gallery(data).then(response => {
        this.listExh_galleryList = response.rows;
      });
      // 获取问卷调查表
      listQuestionnaire(data).then(response => {
        this.listQuestionnaireList = response.rows;
      });
    },


    /** 查询展会信息列表 */
    getList() {
      this.loading = true;

      listExh_list(this.queryParams).then(response => {
       var exh_listList = response.rows;

        for(var a=0;a<exh_listList.length;a++){
          var exType=exh_listList[a].exType;
          var zhId=exh_listList[a].id;
          var url="https://frdzhtsignup.zsyflive.com?exType=" + exType + "&exhId=" + zhId;
          var urlDuan=url.split("?")
          urlDuan='https://frdzhtsignup.zsyflive.com/frd/'+this.aesEncrypt(urlDuan[1])

          exh_listList[a].url=url;
           exh_listList[a].urlDuan=urlDuan;
        }
        this.exh_listList=exh_listList;
        console.log("奥塞斯",exh_listList)
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
        typeId: null,
        exhName: null,
        englishName: null,
        shortName: null,
        startTime: null,
        endTime: null,
        galleryId: null,
        hallId: null,
        city: null,
        trade: null,
        exhCategory: null,
        quesId: null,
        isSelf: "0",
        visitorManager: null,
        recruitManager: null,
        recruitGroup: null,
        isRecruit: "0",
        exhLevel: null,
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
      this.title = "添加展会信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExh_list(id).then(response => {
        var form=response.data;
        if(form.hallId){
          form.hallId=form.hallId.split(",");
          for(var a=0;a<form.hallId.length;a++){
            form.hallId[a]=parseInt(form.hallId[a])
          }
        }else{
          form.hallId=[];
        }



        this.form =form;
        this.open = true;
        this.title = "修改展会信息";
        this.getZhanting(this.form.galleryId);
      });
    },
    /** 提交按钮 */
    submitForm() {

      var form=this.form;
      if(!form.hallId||form.hallId.length<=0){
        this.$modal.msgError("请选择展厅");
        return false;
      }
      console.log('form.hallId',form.hallId)
      if(form.hallId){
        form.hallId=form.hallId.join(",");
      }

      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExh_list(form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExh_list(form).then(response => {
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
      this.$modal.confirm('是否确认删除展会信息编号为"' + ids + '"的数据项？').then(function() {
        return delExh_list(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exh/exh_list/export', {
        ...this.queryParams
      }, `exh_list_${new Date().getTime()}.xlsx`)
    },
    //AES加密
    aesEncrypt(encrypt) {
    	//加密值
    	var e = this.AES.encrypt(encrypt, '1234567891234567', '1234567891234567')
    	// console.error("加密结果",e);
    	return e;
    },
    //AES解密
    aesDecrypt(decrypt) {
    	// console.error("解密值",decrypt);
    	//解密值
    	var d = this.AES.decrypt(decrypt, '1234567891234567', '1234567891234567')
    	// console.error("解密结果",d);
    	return d;
    },



  }
};
</script>
