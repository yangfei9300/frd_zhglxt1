<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="queryParams.taskName" placeholder="请输入任务名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="联络目标" prop="targetId">

        <el-select v-model="queryParams.targetId" placeholder="请选择联络对象" clearable>
          <el-option v-for="dict in listCall_targetList" :key="dict.id" :label="dict.targetName" :value="dict.id" />
        </el-select>

      </el-form-item>
      <!-- <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="联络方式" prop="callType">
        <el-select v-model="queryParams.callType" placeholder="请选择联络方式" clearable>
          <el-option v-for="dict in dict.type.call_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="联络对象" prop="callSource">
        <el-select v-model="queryParams.callSource" placeholder="请选择联络对象" clearable>
          <el-option v-for="dict in dict.type.call_source" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="处理级别" prop="level">
        <el-input
          v-model="queryParams.level"
          placeholder="请输入处理级别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="开始日期" prop="beginDate">
        <el-input v-model="queryParams.beginDate" placeholder="请输入开始日期" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="问卷ID" prop="qtrId">
        <el-input
          v-model="queryParams.qtrId"
          placeholder="请输入问卷ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模板路径" prop="tempPath">
        <el-input
          v-model="queryParams.tempPath"
          placeholder="请输入模板路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="ifShare">
        <el-input
          v-model="queryParams.ifShare"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="flag">
        <el-input
          v-model="queryParams.flag"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="rxMail">
        <el-input
          v-model="queryParams.rxMail"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="mailSender">
        <el-input
          v-model="queryParams.mailSender"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="ifAllowSkip">
        <el-input
          v-model="queryParams.ifAllowSkip"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="ifConToPdf">
        <el-input
          v-model="queryParams.ifConToPdf"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="备注" prop="memo">
        <el-input v-model="queryParams.memo" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建人ID" prop="creatorId">
        <el-input
          v-model="queryParams.creatorId"
          placeholder="请输入创建人ID"
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
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['call:call_task:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['call:call_task:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['call:call_task:remove']">删除</el-button>
      </el-col>




      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <div>
      <div class="roww center_center"
      style="border: 1px solid red;min-width: 300px;padding:5px 20px;">
        <el-select multiple  v-model="queryParams.resoonsTxt"
        placeholder="请选择联络结果" clearable>
          <el-option v-for="dict in dict.type.call_reason"
          :key="dict.value" :label="dict.label"
          :value="dict.value" />
        </el-select>
        <div style="width: 20px;"></div>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="el-icon-download" size="mini" @click.stop="handleExport"
            v-hasPermi="['call:call_task:export']">导出</el-button>
        </el-col>
        <div class="allline"></div>
      </div>
    </div>

    <el-table v-loading="loading" :data="call_taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="任务名称" align="center" prop="taskName" />
      <el-table-column label="联络目标" align="center" prop="targetId" />
      <el-table-column label="联络方式" align="center" prop="callType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_type" :value="scope.row.callType" />
        </template>
      </el-table-column>
      <el-table-column label="联络对象" align="center" prop="callSource">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.call_source" :value="scope.row.callSource" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="处理级别" align="center" prop="level" /> -->
      <el-table-column label="开始日期" align="center" prop="beginDate" />

      <el-table-column label="数量" align="center" prop="params.totalCount" />

      <el-table-column label="总体完成率" align="center" prop="params.rate" />

      <el-table-column label="创建人ID" align="center" prop="creatorId" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['call:call_task:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['call:call_task:remove']">删除</el-button>

          <el-button size="mini" type="text" @click="renwuCLick(scope.row)" v-hasPermi="['call:call_task:remove']"
            icon="el-icon-phone">添加系统数据</el-button>

          <el-button size="mini" type="text" icon="el-icon-phone" @click="towangluozhongxin(scope.row)">联络中心</el-button>

          <el-button size="mini" type="text" icon="el-icon-phone" v-hasPermi="['call:call_task:allocation']"
            @click="cxfpAlertShowClick(scope.row)">重新分配</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改联络任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称" />
        </el-form-item>
        <!--<el-form-item label="联络目标" prop="targetId">
          <el-input v-model="form.targetId" placeholder="请输入联络目标" />
        </el-form-item> -->


        <el-form-item label="联络目标id" prop="targetId">
          <el-select v-model="form.targetId" placeholder="请选择联络对象" clearable>
            <el-option v-for="dict in listCall_targetList" :key="dict.id" :label="dict.targetName" :value="dict.id" />
          </el-select>

          <!--  -->

        </el-form-item>

        <!-- <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item> -->
        <el-form-item label="联络方式" prop="callType">
          <el-select v-model="form.callType" placeholder="请选择联络方式">
            <el-option v-for="dict in dict.type.call_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联络对象">
          <el-radio-group v-model="form.callSource">
            <el-radio v-for="dict in dict.type.call_source" :key="dict.value"
              :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="处理级别" prop="level">
          <el-input v-model="form.level" placeholder="请输入处理级别" />
        </el-form-item> -->
        <el-form-item label="开始日期" prop="beginDate">
          <!-- <el-input v-model="form.beginDate" placeholder="请输入开始日期" /> -->

          <el-date-picker v-model="form.beginDate" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="短信模板" prop="smsTemplate">
          <el-input v-model="form.smsTemplate" placeholder="请输入短信模板" />
        </el-form-item>

        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>


        <el-form-item label="业务员">
          <div class="huanhang">
            <el-checkbox-group v-model="listexh_userexhListSel" true-label="userId">
              <el-checkbox :label="item.nickName" v-for="(item,index) in listexh_userexhList"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>





    <el-dialog title="选择系统数据" :visible.sync="xtsjAlert" width="80%" append-to-body>

      <el-form :model="shujuSelQuery" ref="queryForm" size="small" :inline="true" v-show="showSearch"
        label-width="88px">
        <el-form-item label="请选择展会" prop="exhId">
          <el-select v-model="shujuSelQuery.exhId" placeholder="请选择展会" clearable>
            <el-option v-for="dict in exh_listList" :key="dict.id" :label="dict.shortName" :value="dict.id" />
          </el-select>
        </el-form-item>



        <el-form-item label="标签一" prop="tag1">
          <el-input v-model="shujuSelQuery.tag1" placeholder="请输入标签一" clearable />
        </el-form-item>



        <el-form-item label="地址" prop="address">
          <el-input v-model="shujuSelQuery.address" placeholder="请输入地址(模糊查询)" clearable />
        </el-form-item>

      <!--  <el-form-item label="是否到场" prop="taskName">
          <el-input v-model="shujuSelQuery.address"  clearable />
        </el-form-item> -->

        <el-form-item label="是否到场" prop="status">
          <el-select v-model="shujuSelQuery.status" placeholder="请选择是否到场" clearable>
            <el-option v-for="dict in dict.type.is_arrive" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getXtDataListQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>


      <el-table v-loading="loading" :data="gzDAtaList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="公司名" align="center" prop="companyName" />

        <el-table-column label="姓名" align="center" prop="visitorName" />
        <el-table-column label="省" align="center" prop="visitorProvince" />
        <el-table-column label="城市" align="center" prop="visitorCity" />
        <el-table-column label="详细地址" align="center" prop="visitorAddress" />
        <el-table-column label="标签一" align="center" prop="tag1" />
      </el-table>

      <pagination v-show="totalGz>0" :total="totalGz" :page.sync="shujuSelQuery.pageNum"
        :limit.sync="shujuSelQuery.pageSize" @pagination="getXtDataList" />
      <div style="height: 25px;"></div>
      <div class="roww">
        <div>选择业务员</div>
        <div>【任务名称：</div>
        <div style="color: red;">{{selRenwu.taskName}}</div>
        <div>】</div>
      </div>

      <div class="huanhang " style="margin-top: 30px;">
        <el-checkbox-group v-model="taskUsersSel" true-label="userId">
          <el-checkbox style="margin-bottom: 20px;" :label="item.params.nickName"
            v-for="(item,index) in taskUsers"></el-checkbox>
        </el-checkbox-group>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTaskToUserModal">确 定</el-button>
      </div>
    </el-dialog>




    <el-dialog title="未打任务重新分配" :visible.sync="cxfpAlertShow" width="80%" append-to-body>

      <pagination v-show="totalGz>0" :total="totalGz" :page.sync="shujuSelQuery.pageNum"
        :limit.sync="shujuSelQuery.pageSize" @pagination="getXtDataList" />
      <div class="roww">
        <div>选择业务员</div>
        <div>【任务名称：</div>
        <div style="color: red;">{{cxfpInfo.taskName}}</div>
        <div>】</div>
      </div>

      <div class="huanhang " style="margin-top: 30px;">
        <el-checkbox-group v-model="taskUsersSel" true-label="userId">
          <el-checkbox style="margin-bottom: 20px;" :label="item.params.nickName"
            v-for="(item,index) in taskUsers"></el-checkbox>
        </el-checkbox-group>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chongxinfenpei">确 定</el-button>
      </div>
    </el-dialog>






  </div>
</template>

<script>
  import {
    listCall_task,
    getCall_task,
    delCall_task,
    addCall_task,
    updateCall_task,
    staffscall_import,
    importcall_importcall,
    allocationcall_import
  } from "@/api/call/call_task";
  import {
    listCall_target,
    selectlistcall_import
  } from "@/api/call/call_target";
  import {
    listexh_userexh
  } from "@/api/exhibitor/exhibitor_exh";




  import {
    listExh_list
  } from "@/api/exh/exh_list";

  export default {
    name: "Call_task",
    dicts: ['call_type', 'call_source', 'zlf_status', 'is_arrive','call_reason'],
    data() {
      return {

        // 重新分配
        cxfpAlertShow: false,
        cxfpInfo: {}, //选中的任务详情



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
        // 联络任务表格数据
        call_taskList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          taskName: null,
          targetId: null,
          exhId: null,
          exhType: null,
          callType: null,
          callSource: null,
          level: null,
          beginDate: null,
          qtrId: null,
          tempPath: null,
          ifShare: null,
          flag: null,
          rxMail: null,
          wizardFile: null,
          mailSender: null,
          ifAllowSkip: null,
          annexFile: null,
          ifConToPdf: null,
          memo: null,
          status: null,
          creatorId: null,
          resoonsTxt:"",
        },
        listCall_targetList: [], //目标列表
        listexh_userexhList: [], //业务员列表
        listexh_userexhListSel: [], //选中的业务员列表
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          targetId: [{
            required: true,
            message: "联络目标不能为空",
            trigger: "blur"
          }],
          exhId: [{
            required: true,
            message: "展会ID不能为空",
            trigger: "blur"
          }],
          callType: [{
            required: true,
            message: "联络方式不能为空",
            trigger: "change"
          }],
        },

        shujuSelQuery: {
          pageNum: 1,
          pageSize: 10,
          callSource: 2,
          exhId: "",
          tag1: "",
          address: "",
          'status': '',
          params: {
            exhId: "",
            tag1: "",
            address: ""
          }
        }, //查询数据库中的数据的条件
        exh_listList: [], //展会列表
        gzDAtaList: [], //观众列表
        totalGz: 0,
        selRenwu: {}, //选中的任务
        xtsjAlert: false, //选择系统数据对话框
        taskUsers: [], //某个任务的业务员列表
        taskUsersSel: [], //某个任务选择的业务员
      };
    },
    created() {
      this.listCall_targetGet()
      this.getList();
      this.getYewuyuan()
      this.getExhList()
    },
    methods: {
      // 剩余的重新分配
      chongxinfenpei() {
        var taskUsersSel = this.taskUsersSel;
        var ids = [];
        var taskUsers = this.taskUsers;
        for (var a = 0; a < taskUsersSel.length; a++) {
          for (var b = 0; b < taskUsers.length; b++) {
            if (taskUsersSel[a] == taskUsers[b].params.nickName) {
              ids.push(taskUsers[b].userId);
            }
          }
        }
        if (ids.length <= 0) {
          this.$modal.msgError("请选择相关业务员");
          return false;
        }
        var data = {
          taskId: this.cxfpInfo.id,
          userIds: ids.join(",")
        }
        console.log("111", data);
        allocationcall_import(data).then(response => {
          if (response.code == 200) {
            this.cxfpAlertShow = false;
            this.$modal.notifySuccess("分配成功");
          } else {
            this.$modal.notifyError(response.msg);
          }
        });
      },
      cxfpAlertShowClick(info) {

        this.cxfpAlertShow = !this.cxfpAlertShow;
        if (this.cxfpAlertShow) {
          this.cxfpInfo = info;
          this.getRewnYwwuyuan(info);
        }


      },



      // 将选中的数据库中的数据添加到任务中
      addTaskToUserModal() {
        this.$modal.confirm('确认要分配吗').then((res) => {
          console.log("确认分配吗", res)
          if (res == 'confirm') {

            this.addTaskToUser()
          }
        }).catch(() => {
          console.log("报错了")
        });
      },

      addTaskToUser() {
        var taskUsersSel = this.taskUsersSel;
        var ids = [];
        var taskUsers = this.taskUsers;
        for (var a = 0; a < taskUsersSel.length; a++) {
          for (var b = 0; b < taskUsers.length; b++) {
            if (taskUsersSel[a] == taskUsers[b].params.nickName) {
              ids.push(taskUsers[b].userId);
            }
          }
        }
        if (ids.length <= 0) {
          this.$modal.msgError("请选择相关业务员");
          return false;
        }
        console.log('ids', ids)


        var data = {
          targetId: this.selRenwu.targetId,
          taskId: this.selRenwu.id,
          callSource: "2",
          userIds: ids.join(","),
          params: {
            'exhId': this.shujuSelQuery.exhId,
            'tag1': this.shujuSelQuery.params.tag1,
            'address': this.shujuSelQuery.params.address,
            'status': this.shujuSelQuery.status,
          },
        };

        console.log("importcall_importcall", data)

        importcall_importcall(data).then(response => {
          if (response.code == 200) {
            this.$modal.notifySuccess("分配成功");
          } else {
            this.$modal.notifyError(response.msg);
          }
        });
      },
      // 获取任务业务员
      getRewnYwwuyuan(info) {
        console.log("业务员22222", info)
        var data = {
          taskId: info.id,
          callSource: 2,
        };
        staffscall_import(data).then(response => {
          console.log("业务员", response)
          this.taskUsers = response.rows
        });

      },
      // 点击添加系统数据
      renwuCLick(info) {
        this.selRenwu = info;
        this.xtsjAlert = true;
        this.getRewnYwwuyuan(info)
      },
      //搜索
      getXtDataListQuery() {
        this.shujuSelQuery.pageNum = 1;
        this.getXtDataList();
      },
      //获取系统观众列表
      getXtDataList() {
        var shujuSelQuery = this.shujuSelQuery;
        shujuSelQuery.params = {
          exhId: shujuSelQuery.exhId,
          tag1: shujuSelQuery.tag1,
          address: shujuSelQuery.address,
          'status': this.shujuSelQuery.status,
        }
        selectlistcall_import(shujuSelQuery).then(response => {
          this.gzDAtaList = response.rows;
          this.totalGz = response.total;
        });

      },
      //获取展会列表
      getExhList() {
        var queryParams = {
          pageNum: 1,
          pageSize: 1000,
        }
        listExh_list(queryParams).then(response => {
          this.exh_listList = response.rows;

        });
      },
      //跳转到网络中心
      towangluozhongxin(row) {
        var userInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
        console.log("loginUserInfo", userInfo, row)
        var linkUserId = userInfo.userId;
        var taskId = row.id
        if (row.callType == 1) {
          var url = "https://callphone.zsyflive.com/index_gz.html?linkUserId=" + linkUserId + "&taskId=" + taskId
        } else {
          var url = "https://callphone.zsyflive.com/index.html?linkUserId=" + linkUserId + "&taskId=" + taskId
        }
        window.open(url)
      },
      // 获取业务员
      getYewuyuan() {
        //
        var data = {
          pageNum: 1,
          pageSize: 1000,
        }
        listexh_userexh(data).then(response => {
          this.listexh_userexhList = response.rows;
          console.log("展会列表", this.listexh_userexhList)
        });
      },
      // 获取目标列表
      listCall_targetGet() {
        //
        var data = {
          pageNum: 1,
          pageSize: 100,
        }
        listCall_target(data).then(response => {
          this.listCall_targetList = response.rows;

        });
      },
      /** 查询联络任务列表 */
      getList() {
        this.loading = true;
        listCall_task(this.queryParams).then(response => {
          this.call_taskList = response.rows;
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
          taskName: null,
          targetId: null,
          exhId: null,
          exhType: null,
          callType: null,
          callSource: "0",
          level: null,
          beginDate: null,
          qtrId: null,
          tempPath: null,
          ifShare: null,
          flag: null,
          rxMail: null,
          wizardFile: null,
          mailSender: null,
          ifAllowSkip: null,
          annexFile: null,
          ifConToPdf: null,
          memo: null,
          status: "0",
          delFlag: null,
          version: null,
          createBy: null,
          creatorId: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          smsTemplate:null
        };
        this.listexh_userexhListSel = [];
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
        console.log("多选", this.ids);
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加联络任务";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getCall_task(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.showYewuyuan(this.form.params.staffs)
          this.title = "修改联络任务";
        });
      },

      // 回显选中的业务员
      showYewuyuan(ids) {
        if (ids && ids.length <= 0) {
          return false;
        }
        ids = ids.split(",");
        var names = [];
        var sel = this.listexh_userexhListSel;
        var yewuyuanList = this.listexh_userexhList;
        for (var a = 0; a < ids.length; a++) {
          for (var b = 0; b < yewuyuanList.length; b++) {
            if (ids[a] == yewuyuanList[b].userId) {
              names.push(yewuyuanList[b].nickName);
            }
          }
        }

        names = Array.from(new Set(names));
        console.log(names);

        this.listexh_userexhListSel = names;
      },


      getYewuyuanIds() {

        var listexh_userexhList = this.listexh_userexhList;
        var listexh_userexhListSel = this.listexh_userexhListSel;
        var idss = [];
        for (var a = 0; a < listexh_userexhList.length; a++) {
          for (var b = 0; b < listexh_userexhListSel.length; b++) {
            if (listexh_userexhList[a].nickName == listexh_userexhListSel[b]) {
              idss.push(listexh_userexhList[a].userId);
              break;
            }
          }
        }
        return idss;
      },

      /** 提交按钮 */
      submitForm() {

        console.log("选中的业务员", this.listexh_userexhListSel)
        var form = this.form;
        var ids = this.getYewuyuanIds();
        if (ids.length <= 0) {
          this.$modal.msgError("请选择相关业务员");
          return false;
        }
        form.params = {
          'staffs': ids.join(",")
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateCall_task(form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addCall_task(form).then(response => {
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
        this.$modal.confirm('是否确认删除联络任务编号为"' + ids + '"的数据项？').then(function() {
          return delCall_task(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        // this.download('call/call_task/export', {
        //   ...this.queryParams
        // }, `call_task_${new Date().getTime()}.xlsx`)

        var ids=this.ids;
        var resoonsTxt=this.queryParams.resoonsTxt
        if(ids.length<=0){
          this.$modal.msgSuccess("请选择任务");
          return false;
        }
        if(resoonsTxt.length<=0){
          this.$modal.msgSuccess("请选择接通结果");
          return false;
        }
        var data={
          params:{
            'taskIds':this.ids.join(","),
            'reasons':resoonsTxt.join(","),
          }
        }
        this.download('api/call/export/export', {
          ...data
        }, `call_task_${new Date().getTime()}.xlsx`)

      }
    }
  };
</script>
