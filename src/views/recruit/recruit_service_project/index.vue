<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="148px">
      <el-form-item label="服务名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入服务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="英文名称" prop="englishName">
        <el-input
          v-model="queryParams.englishName"
          placeholder="请输入英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
    <!--  <el-form-item label="服务编号" prop="projectNo">
        <el-input
          v-model="queryParams.projectNo"
          placeholder="请输入服务编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="所属服务类别ID" prop="categoryId">

        <el-select v-model="queryParams.categoryId" placeholder="请选择服务类别" clearable>
          <el-option
            v-for="dict in listRecruit_service_categoryList"
            :key="dict.id"
            :label="dict.categoryName"
            :value="dict.id"
          />
        </el-select>

      </el-form-item>
     <!-- <el-form-item label="人民币价格" prop="rmbPrice">
        <el-input
          v-model="queryParams.rmbPrice"
          placeholder="请输入人民币价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务规格" prop="projectSpec">
        <el-input
          v-model="queryParams.projectSpec"
          placeholder="请输入服务规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务英文规格" prop="projectEnglishSpec">
        <el-input
          v-model="queryParams.projectEnglishSpec"
          placeholder="请输入服务英文规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计数单位" prop="countUnit">
        <el-input
          v-model="queryParams.countUnit"
          placeholder="请输入计数单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文计数单位" prop="countEnglishUnit">
        <el-input
          v-model="queryParams.countEnglishUnit"
          placeholder="请输入英文计数单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="服务商" prop="provider">
        <el-input
          v-model="queryParams.provider"
          placeholder="请输入服务商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="是否用于自助服务" prop="selfService">
        <el-input
          v-model="queryParams.selfService"
          placeholder="请输入是否用于自助服务"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务总量" prop="serviceTotal">
        <el-input
          v-model="queryParams.serviceTotal"
          placeholder="请输入服务总量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="负责展馆" prop="responsibleHall">
        <el-input
          v-model="queryParams.responsibleHall"
          placeholder="请输入负责展馆"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="服务介绍" prop="serviceIntroduction">
        <el-input
          v-model="queryParams.serviceIntroduction"
          placeholder="请输入服务介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务英文介绍" prop="englishIntroduction">
        <el-input
          v-model="queryParams.englishIntroduction"
          placeholder="请输入服务英文介绍"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="所属展会" prop="exhId">
       <!-- <el-input
          v-model="queryParams.exhId"
          placeholder="请输入所属展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
        -->

        <el-select v-model="queryParams.exhId" placeholder="请选择展会" clearable>
          <el-option
            v-for="dict in listExh_listList"
            :key="dict.id"
            :label="dict.exhName"
            :value="dict.id"
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
          v-hasPermi="['recruit:recruit_service_project:add']"
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
          v-hasPermi="['recruit:recruit_service_project:edit']"
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
          v-hasPermi="['recruit:recruit_service_project:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['recruit:recruit_service_project:export']"
        >导出</el-button>
      </el-col> -->

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="showPiliang"
        >往届服务选择</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recruit_service_projectList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="服务名称" align="center" prop="projectName" />
      <el-table-column label="所属服务类别" align="center" prop="categoryId" />
      <el-table-column label="人民币价格" align="center" prop="rmbPrice" />
      <el-table-column label="服务规格" align="center" prop="projectSpec" />
      <el-table-column label="计数单位" align="center" prop="countUnit" />



      <!--

      <el-table-column label="英文名称" align="center" prop="englishName" />
      <el-table-column label="服务编号" align="center" prop="projectNo" />
      <el-table-column label="服务英文规格" align="center" prop="projectEnglishSpec" />
      <el-table-column label="英文计数单位" align="center" prop="countEnglishUnit" />
      <el-table-column label="服务商" align="center" prop="provider" />
      <el-table-column label="供应商" align="center" prop="supplier" />
      <el-table-column label="是否用于自助服务" align="center" prop="selfService">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_self_service" :value="scope.row.selfService"/>
        </template>
      </el-table-column>
      <el-table-column label="服务总量" align="center" prop="serviceTotal" />
      <el-table-column label="负责展馆" align="center" prop="responsibleHall" />
      <el-table-column label="服务介绍" align="center" prop="serviceIntroduction" />
      <el-table-column label="服务英文介绍" align="center" prop="englishIntroduction" /> -->
      <el-table-column label="所属展会" align="center" prop="params.exhName" />
      <!-- <el-table-column label="所属展会项目ID" align="center" prop="exhType" /> -->
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
            v-hasPermi="['recruit:recruit_service_project:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['recruit:recruit_service_project:remove']"
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

    <!-- 添加或修改招展服务项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="服务名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="英文名称" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="服务编号" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入服务编号" />
        </el-form-item>
        <el-form-item label="所属服务类别" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择所属服务类别" clearable>
            <el-option
              v-for="dict in listRecruit_service_categoryList"
              :key="dict.id"
              :label="dict.categoryName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人民币价格" prop="rmbPrice">
          <el-input v-model="form.rmbPrice" placeholder="请输入人民币价格" />
        </el-form-item>
        <el-form-item label="服务规格" prop="projectSpec">
          <el-input v-model="form.projectSpec" placeholder="请输入服务规格" />
        </el-form-item>
        <el-form-item label="服务英文规格" prop="projectEnglishSpec">
          <el-input v-model="form.projectEnglishSpec" placeholder="请输入服务英文规格" />
        </el-form-item>
        <el-form-item label="计数单位" prop="countUnit">
          <el-input v-model="form.countUnit" placeholder="请输入计数单位" />
        </el-form-item>
        <el-form-item label="英文计数单位" prop="countEnglishUnit">
          <el-input v-model="form.countEnglishUnit" placeholder="请输入英文计数单位" />
        </el-form-item>
       <!-- <el-form-item label="服务商" prop="provider">
          <el-input v-model="form.provider" placeholder="请输入服务商" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="form.supplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="是否用于自助服务" prop="selfService">
          <el-input v-model="form.selfService" placeholder="请输入是否用于自助服务" />
        </el-form-item> -->
       <!-- <el-form-item label="服务总量" prop="serviceTotal">
          <el-input v-model="form.serviceTotal" placeholder="请输入服务总量" />
        </el-form-item>
        <el-form-item label="负责展馆" prop="responsibleHall">
          <el-input v-model="form.responsibleHall" placeholder="请输入负责展馆" />
        </el-form-item> -->
        <el-form-item label="服务介绍" prop="serviceIntroduction">
          <el-input v-model="form.serviceIntroduction" placeholder="请输入服务介绍" />
        </el-form-item>
        <el-form-item label="服务英文介绍" prop="englishIntroduction">
          <el-input v-model="form.englishIntroduction" placeholder="请输入服务英文介绍" />
        </el-form-item>

        <!-- <el-form-item label="所属展会" prop="exhId">
          <el-select v-model="form.exhId" placeholder="请选择展会" clearable>
            <el-option
              v-for="dict in listExh_listList"
              :key="dict.id"
              :label="dict.exhName"
              :value="dict.id"
            />
          </el-select>
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





 <!-- 添加或修改招展展位价格类别对话框 -->
       <!-- <el-dialog title="选择当前展会" :visible.sync="openSelExhAlert" width="80%" append-to-body>
          <div>


            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="118px">
              <el-form-item label="所属展会项目" prop="typeId">
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

            <el-table v-loading="loading" :data="exh_listList"
             highlight-current-row
             @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
             >
             <el-table-column label="展会开始时间" align="center" prop="startTime" width="180">
               <template slot-scope="scope">
                 <el-radio v-model="selExhId" :label="scope.row.id">{{selExhId==scope.row.id?'已选择':''}}</el-radio>
               </template>
             </el-table-column>
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
            </el-table>

          </div>
          <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog> -->



  <GetExhServices v-if="batchAlertShow" @close="closeService" @getSelExhServiceInfo="getSelExhServiceInfo"></GetExhServices>



  </div>
</template>

<script>
import { listRecruit_service_project,recruit_service_projectbatchimport,importbatchrecruit_service_project, getRecruit_service_project, delRecruit_service_project, addRecruit_service_project, updateRecruit_service_project } from "@/api/recruit/recruit_service_project";

import { listExh_list } from "@/api/exh/exh_list";
import { listRecruit_service_category} from "@/api/recruit/recruit_service_category";

import GetExhServices from '@/components/GetExhServices/GetExhServices';

export default {
  name: "Recruit_service_project",
  dicts: ['zlf_status'],

  components: {
    GetExhServices
  },

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
      // 招展服务项目表格数据
      recruit_service_projectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectName: null,
        englishName: null,
        projectNo: null,
        categoryId: null,
        rmbPrice: null,
        projectSpec: null,
        projectEnglishSpec: null,
        countUnit: null,
        countEnglishUnit: null,
        provider: null,
        supplier: null,
        selfService: null,
        serviceTotal: null,
        responsibleHall: null,
        serviceIntroduction: null,
        englishIntroduction: null,
        exhId: null,
        exhType: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        projectName: [
          { required: true, message: "服务名称不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "所属服务类别ID不能为空", trigger: "blur" }
        ],
        rmbPrice: [
          { required: true, message: "人民币价格不能为空", trigger: "blur" }
        ],
      },

      listExh_listList:[],//展展会列表
      listRecruit_service_categoryList:[],//服务类目
      batchAlertShow:false,//批量
    };
  },
  created() {
    this.getZhanguan();
    this.getList();
  },
  methods: {

    closeService(){
      this.batchAlertShow=false;
    },
    // 显示批量
    showPiliang(){
      this.batchAlertShow=true;
    },

    // 选择展位的
    getSelExhServiceInfo(res){
      var data={
        params:{
          projectList:res
        }
      }
      recruit_service_projectbatchimport(data).then(response => {
        this.$modal.msgSuccess("批量添加完成");
        this.open = false;
        this.getList();
        this.closeService()
      });
    },


    // 获取展会列表
    getZhanguan(){
      var data={
        pageNum: 1,
        pageSize: 100,
      }
      listExh_list(data).then(response => {
        this.listExh_listList = response.rows;
      });
      listRecruit_service_category(data).then(response => {
        this.listRecruit_service_categoryList = response.rows;
      });
    },


    /** 查询招展服务项目列表 */
    getList() {
      this.loading = true;
      listRecruit_service_project(this.queryParams).then(response => {
        this.recruit_service_projectList = response.rows;
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
        projectName: null,
        englishName: null,
        projectNo: null,
        categoryId: null,
        rmbPrice: null,
        projectSpec: null,
        projectEnglishSpec: null,
        countUnit: null,
        countEnglishUnit: null,
        provider: null,
        supplier: null,
        selfService: null,
        serviceTotal: null,
        responsibleHall: null,
        serviceIntroduction: null,
        englishIntroduction: null,
        exhId: null,
        exhType: null,
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
      this.title = "添加招展服务项目";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      console.log("idsss",id);
      getRecruit_service_project(id).then(response => {
        console.log("详情",response);
        this.form = response.data;
        this.open = true;
        this.title = "修改招展服务项目";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRecruit_service_project(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecruit_service_project(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除招展服务项目编号为"' + ids + '"的数据项？').then(function() {
        return delRecruit_service_project(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/recruit_service_project/export', {
        ...this.queryParams
      }, `recruit_service_project_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
