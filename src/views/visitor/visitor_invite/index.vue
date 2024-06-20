<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams"
    ref="queryForm" size="small"
    :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="开始日期" prop="startTime">
         <el-date-picker
              v-model="queryParams.startTime"
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['visitor:visitor_group:add']"
        >创建战团</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['visitor:visitor_group:edit']"
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
          v-hasPermi="['visitor:visitor_group:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['visitor:visitor_invite:export']"
        >导出</el-button>
      </el-col>

    <!--  <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="cancel_fileopenCLick"
           v-hasPermi="['visitor:visitor_group:add']"
        >导入展商</el-button>
      </el-col> -->


      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="visitor_groupList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众姓名" align="center" prop="visitorName" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="观众电话" align="center" prop="visitorPhone" />
      <el-table-column label="邀请人数" align="center" prop="invitedCount" />
      <el-table-column label="已到场人数" align="center" prop="invitedArriveCount" />
      <el-table-column label="预注册人数" align="center" prop="preRegisteredInvitedCount" />
      <el-table-column label="预登记入场人数" align="center" prop="preRegisteredInvitedArriveCount" />



     <!-- <el-table-column label="展商二维码" align="center" prop="qrCode" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.qrCode" :width="50" :height="50"/>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['visitor:visitor_group:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['visitor:visitor_group:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改观众团体对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item v-if="!this.form.id" label="团长" prop="visitorId">
          <!-- <el-input v-model="form.visitorId" placeholder="请输入观众ID" /> -->

          <el-select
              v-model="form.visitorId"
              :multiple="false"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading1">
              <el-option
                v-for="item in noGroupInfoLists"
                :key="item.id"
                :label="item.visitorName"
                :value="item.id">
              </el-option>
            </el-select>

        </el-form-item>
       <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <el-form-item label="团体名称" prop="groupName">
          <el-input v-model="form.groupName" placeholder="请输入团体名称" />
        </el-form-item>
        <!-- <el-form-item label="二维码" prop="qrCode">
          <el-input v-model="form.qrCode" placeholder="请输入二维码" />
        </el-form-item> -->
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

    <importGroup v-if="imporShow" @cancel_fileopenCLick="cancel_fileopenCLick"></importGroup>

  </div>
</template>

<script>
import {
visitor_referrerlist,
visitor_referrerExport,
} from "@/api/visitor/visitor_index";
import importGroup from '@/components/importGroup/importGroup'
export default {
  name: "Visitor_group",
  dicts: ['zlf_status'],
  components: {
importGroup
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
      // 观众团体表格数据
      visitor_groupList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        startTime:null,
        pageNum: 1,
        pageSize: 10,
        visitorId: null,
        exhId: null,
        groupName: null,
        qrCode: null,
        memo: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      imporShow:false,

      visitorName:"",//名称
      loading1:false,
      noGroupInfoLists:[],//未有团的人
    };
  },
  created() {
    this.getList();
  },
  methods: {
    remoteMethod(res){
      this.getNoGroupLists(res)
    },
    // 获取为参展的观众信息
    getNoGroupLists(res){
      var data={
        visitorName:res
      }
      nogroupvisitor_info(data).then(response => {
          this.noGroupInfoLists=response.rows;
      });
    },

    // 关闭导入对话框
    cancel_fileopenCLick(res){
      this.imporShow=!this.imporShow;
      if(res&&res.code=="success"){
        this.getList();
      }
    },

    /** 查询观众团体列表 */
    getList() {
      this.loading = true;

      var selExhInfo=this.$ls.get("selExhInfo");
      if(selExhInfo){
        this.queryParams.id=selExhInfo.id;
        this.queryParams.startTime=selExhInfo.startTime;
      }

      visitor_referrerlist(this.queryParams).then(response => {
        this.visitor_groupList = response.rows;
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
        groupName: null,
        qrCode: null,
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
      console.log("asdasd",this.queryParams)
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
      this.getNoGroupLists("");
      this.reset();
      this.open = true;
      this.title = "添加观众团体";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVisitor_group(id).then(response => {
        this.getNoGroupLists();
        this.form = response.data;
        this.open = true;
        this.title = "修改观众团体";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVisitor_group(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            createvisitor_group(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除观众团体编号为"' + ids + '"的数据项？').then(function() {
        return delVisitor_group(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('visitor/visitor_referrer/export', {
        ...this.queryParams
      }, `visitor_group_${new Date().getTime()}观众邀请表.xlsx`)
    }
  }
};
</script>
