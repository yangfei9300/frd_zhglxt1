<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="88px">
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="联络目标" prop="targetId">
        <el-select v-model="queryParams.targetId" placeholder="请选择联络状态" clearable
        @change="getRenwuList"
        >
          <el-option
            v-for="dict in mubiaoList"
            :key="dict.id"
            :label="dict.targetName"
            :value="dict.id"
          />
        </el-select>

      </el-form-item>

     
      <el-form-item label="联络任务" prop="taskId">


        <el-select v-model="queryParams.taskId" placeholder="请选择联络状态" clearable
        >
          <el-option
            v-for="dict in renwuList"
            :key="dict.id"
            :label="dict.taskName"
            :value="dict.id"
          />
        </el-select>

      </el-form-item>

      <el-form-item label="联络状态" prop="linkStatus">
        <el-select v-model="queryParams.linkStatus" placeholder="请选择联络状态" clearable>
          <el-option
            v-for="dict in dict.type.call_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>


      <el-form-item label="联络结果" prop="linkResult">
        <el-select v-model="queryParams.linkResult" placeholder="请选择联络结果" clearable
        @change="linkResultChange"
        >
          <el-option
            v-for="dict in dict.type.call_result"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="联络结果1" prop="linkReason">
        <el-select v-model="queryParams.linkReason" placeholder="请选择联络原因" clearable
         @change="linkResultChange1"
        >
          <el-option
            v-for="dict in zidian2"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="联络原因2" prop="linkReason2">
        <el-select v-model="queryParams.linkReason2" placeholder="请选择联络原因" clearable>
          <el-option
            v-for="dict in zidian3"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['call:call_person_link:add']"
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
          v-hasPermi="['call:call_person_link:edit']"
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
          v-hasPermi="['call:call_person_link:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['call:call_person_link:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="call_person_linkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="展会ID" align="center" prop="exhId" /> -->
      <el-table-column label="联络目标" align="center" prop="params.targetName" />
      <el-table-column label="联络任务" align="center" prop="params.taskName" />

      <el-table-column label="企业名称" align="center" prop="params.exhibitorName" />
      <el-table-column label="企业姓名" align="center" prop="params.contactName" />
      <el-table-column label="企业电话" align="center" prop="params.contactPhone" />


      <!-- <el-table-column label="联系人ID" align="center" prop="contactId" /> -->
      <el-table-column label="联络状态" align="center" prop="linkStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_status" :value="scope.row.linkStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="联络结果" align="center" prop="linkResult">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_result" :value="scope.row.linkResult"/>
        </template>
      </el-table-column>
      <el-table-column label="联络原因" align="center" prop="linkReason">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_reason" :value="scope.row.linkReason"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="联络员工ID" align="center" prop="linkUserId" /> -->
      <!-- <el-table-column label="历史记录" align="center" prop="history" /> -->
      <el-table-column label="备注" align="center" prop="memo" />
      <!-- <el-table-column label="计划联络时间" align="center" prop="planTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.planTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="最后联络时间" align="center" prop="lastLinkTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastLinkTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="最后联络员工ID" align="center" prop="lastLinkUserId" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="创建者" align="center" prop="createBy" /> -->
      <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['call:call_person_link:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['call:call_person_link:remove']"
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

    <!-- 添加或修改联络关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="联络目标ID" prop="targetId">
          <el-input v-model="form.targetId" placeholder="请输入联络目标ID" />
        </el-form-item>
        <el-form-item label="联络任务ID" prop="taskId">
          <el-input v-model="form.taskId" placeholder="请输入联络任务ID" />
        </el-form-item>
        <el-form-item label="企业ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入企业ID" />
        </el-form-item>
        <el-form-item label="联系人ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入联系人ID" />
        </el-form-item>
        <el-form-item label="联络状态">
          <el-radio-group v-model="form.linkStatus">
            <el-radio
              v-for="dict in dict.type.call_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联络结果">
          <el-radio-group v-model="form.linkResult">
            <el-radio
              v-for="dict in dict.type.call_result"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联络原因">
          <el-radio-group v-model="form.linkReason">
            <el-radio
              v-for="dict in dict.type.call_reason"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联络员工ID" prop="linkUserId">
          <el-input v-model="form.linkUserId" placeholder="请输入联络员工ID" />
        </el-form-item>
        <el-form-item label="历史记录" prop="history">
          <el-input v-model="form.history" placeholder="请输入历史记录" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="计划联络时间" prop="planTime">
          <el-date-picker clearable
            v-model="form.planTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择计划联络时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后联络时间" prop="lastLinkTime">
          <el-date-picker clearable
            v-model="form.lastLinkTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后联络时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后联络员工ID" prop="lastLinkUserId">
          <el-input v-model="form.lastLinkUserId" placeholder="请输入最后联络员工ID" />
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
import { listCall_person_link, getCall_person_link, delCall_person_link, addCall_person_link, updateCall_person_link } from "@/api/call/call_person_link";

// 获取目标列表
import { listCall_target} from "@/api/call/call_target";
// 获取任务列表
import { listCall_task} from "@/api/call/call_task";
import { listData} from "@/api/system/dict/data";


// 联络结果 call_result
// 联络原因 call_reason
// 联络原因-细化 call_reason2
// 这三个总的，用来列表匹配

export default {
  name: "Call_person_link",
  dicts: ['call_result', 'zlf_status', 'call_status', 'call_reason','call_reason2'],
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
      // 联络关联表格数据
      call_person_linkList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhId: null,
        targetId: null,
        taskId: null,
        exhibitorId: null,
        contactId: null,
        linkStatus: null,
        linkResult: null,
        linkReason: null,
        linkReason2:null,
        linkUserId: null,
        history: null,
        memo: null,
        planTime: null,
        lastLinkTime: null,
        lastLinkUserId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      mubiaoList:[],//目标列表
      renwuList:[],//任务列表

      zidian2:[],//
      zidian3:[],//

    };
  },
  created() {
    this.getlistCall_target();
    this.getList();
  },
  methods: {
    linkResultChange(res){
      var dictName="call_reason_"+res;
      this.queryParams.linkReason=""
       this.queryParams.linkReason2=""
      this.getZidian1(dictName,2);
    },
    linkResultChange1(res){
      var dictName="call_reason2_"+res;
       this.queryParams.linkReason2=""
      this.getZidian1(dictName,3);
    },
    // 获取字典第一个
    getZidian1(dictName,type){
      var daaa={
         pageNum:1,
         pageSize:50,
         dictType:dictName,
         exhId:123,
      }
      listData(daaa).then(response => {
        console.log("获取子哦段",response)
        if(response.code==200){
          if(type==2){
            this.zidian2=response.rows;
          }else if(type==3){
            this.zidian3=response.rows;
          }

        }
      });
    },

    // 获取任务列表
    getRenwuList(res){
      this.queryParams.taskId="";
      var daaa={
        pageNum: 1,
        pageSize: 100,
        'targetId':res
      }
      listCall_task(daaa).then(response => {
        console.log("任务列表",response)
        this.renwuList=response.rows;
      });
    },
    // 获取目标列表
    getlistCall_target(){
      var daaa={
        pageNum: 1,
        pageSize: 100,
      }
      listCall_target(daaa).then(response => {
        console.log("目标列表",response)
        this.mubiaoList=response.rows;
      });
    },



    /** 查询联络关联列表 */
    getList() {
      this.loading = true;
      listCall_person_link(this.queryParams).then(response => {
        this.call_person_linkList = response.rows;
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
        targetId: null,
        taskId: null,
        exhibitorId: null,
        contactId: null,
        linkStatus: "0",
        linkResult: "0",
        linkReason: "0",
        linkUserId: null,
        history: null,
        memo: null,
        planTime: null,
        lastLinkTime: null,
        lastLinkUserId: null,
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
      this.title = "添加联络关联";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCall_person_link(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改联络关联";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCall_person_link(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCall_person_link(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除联络关联编号为"' + ids + '"的数据项？').then(function() {
        return delCall_person_link(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('call/call_person_link/export', {
        ...this.queryParams
      }, `call_person_link_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
