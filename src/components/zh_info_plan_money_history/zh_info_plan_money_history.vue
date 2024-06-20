<template>
  <div>
    <!-- class="navbar" -->
    <!-- :visible.sync="openSelExhAlert"  -->
    <!-- <el-dialog title="展商付款记录"
    :visible.sync="openSelExhAlert"
    width="80%"
    append-to-body
      :before-close="submitForm"> -->
    <div style="height: 15px;"></div>
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="付款公司" prop="payCompany">
        <el-input v-model="queryParams.payCompany" placeholder="请输入付款公司" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="收款账户" prop="payAccount">
        <el-select v-model="queryParams.payAccount" placeholder="请选择收款账户" clearable>
          <el-option v-for="dict in dict.type.finance_pay_account" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input v-model="queryParams.memo" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="dict in dict.type.pay_record_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item> -->



      <!-- <el-form-item label="所属展会ID" prop="exhId">
          <el-input
            v-model="queryParams.exhId"
            placeholder="请输入所属展会ID"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="展商ID" prop="exhibitorId">
          <el-input
            v-model="queryParams.exhibitorId"
            placeholder="请输入展商ID"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="合同ID" prop="contractId">
          <el-input
            v-model="queryParams.contractId"
            placeholder="请输入合同ID"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="付款名称" prop="payName">
          <el-input
            v-model="queryParams.payName"
            placeholder="请输入付款名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select v-model="queryParams.payType" placeholder="请选择付款方式" clearable>
            <el-option
              v-for="dict in dict.type.finance_pay_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收款账户" prop="payAccount">
          <el-select v-model="queryParams.payAccount" placeholder="请选择收款账户" clearable>
            <el-option
              v-for="dict in dict.type.finance_pay_account"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="付款时间" prop="payTime">
          <el-date-picker clearable
            v-model="queryParams.payTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择付款时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="付款金额" prop="payAmount">
          <el-input
            v-model="queryParams.payAmount"
            placeholder="请输入付款金额"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="币种" prop="moneyType">
          <el-select v-model="queryParams.moneyType" placeholder="请选择币种" clearable>
            <el-option
              v-for="dict in dict.type.money_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="付款凭证" prop="payVoucher">
          <el-input
            v-model="queryParams.payVoucher"
            placeholder="请输入付款凭证"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="认领人" prop="userId">
          <el-input
            v-model="queryParams.userId"
            placeholder="请输入认领人"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="认领时间" prop="claimTime">
          <el-date-picker clearable
            v-model="queryParams.claimTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择认领时间">
          </el-date-picker>
        </el-form-item> -->



      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
     <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['finance:finance_pay_record:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['finance:finance_pay_record:edit']">修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['finance:finance_pay_record:remove']"
          >删除</el-button>
        </el-col> -->

      <el-col :span="1.5">
        <el-button type="danger" plain :disabled="multiple"  size="mini" @click="claimMoney"
          v-hasPermi="['finance:finance_pay_record:remove']">认领款项</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


    <el-table v-loading="loading" :data="finance_pay_recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" :selectable="selectable" />
      <el-table-column label="记录ID" align="center" prop="id" />
      <el-table-column label="付款公司" align="center" prop="payCompany" />
      <el-table-column label="付款名称" align="center" prop="payName" />
      <el-table-column label="付款时间" align="center" prop="payTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款金额" align="center" prop="payAmount" />
      <el-table-column label="此记录余额" align="center" label-width="100" prop="payBalance" />





      <!-- <el-table-column label="所属展会ID" align="center" prop="exhId" /> -->
      <!-- exhibitorId -->
      <el-table-column label="展商" align="center" prop="params.exhibitorName" />
      <el-table-column label="合同ID" align="center" prop="contractId" />
      <el-table-column label="付款方式" align="center" prop="payType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.finance_pay_type" :value="scope.row.payType" />
        </template>
      </el-table-column>
      <el-table-column label="收款账户" align="center" prop="payAccount">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.finance_pay_account" :value="scope.row.payAccount" />
        </template>
      </el-table-column>

      <el-table-column label="币种" align="center" prop="moneyType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.money_type" :value="scope.row.moneyType" />
        </template>
      </el-table-column>
      <el-table-column label="付款凭证" align="center" prop="payVoucher" />
      <!-- <el-table-column label="认领人" align="center" prop="userId" />
      <el-table-column label="认领时间" align="center" prop="claimTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.claimTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pay_record_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建者" align="center" prop="createBy" /> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['finance:finance_pay_record:edit']">修改</el-button>
       
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改付款(回款)记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body @close="closeAlert">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="所属展会ID" prop="exhId">
                <el-input v-model="form.exhId" placeholder="请输入所属展会ID" />
              </el-form-item> -->
        <!-- <el-form-item label="展商ID" prop="exhibitorId">
                <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
              </el-form-item> -->
        <!-- <el-form-item label="合同ID" prop="contractId">
                <el-input v-model="form.contractId" placeholder="请输入合同ID" />
              </el-form-item> -->
        <el-form-item label="付款公司" prop="payCompany">
          <el-input v-model="form.payCompany" :disabled="isRenling" placeholder="请输入付款公司" />
        </el-form-item>
        <el-form-item label="付款名称" prop="payName">
          <el-input v-model="form.payName" :disabled="isRenling" placeholder="请输入付款名称" />
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select :disabled="isRenling" v-model="form.payType" placeholder="请选择付款方式">
            <el-option v-for="dict in dict.type.finance_pay_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款账户" prop="payAccount">
          <el-select :disabled="isRenling" v-model="form.payAccount" placeholder="请选择收款账户">
            <el-option v-for="dict in dict.type.finance_pay_account" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款时间" prop="payTime">
          <el-date-picker clearable :disabled="isRenling"  v-model="form.payTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择付款时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="付款金额" prop="payAmount">
          <el-input v-model="form.payAmount" :disabled="isRenling" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item  label="剩余金额" prop="payBalance">
          <el-input v-model="form.payBalance" :disabled="isRenling" placeholder="请输入剩余金额" />
        </el-form-item>


        <el-form-item  label="币种" prop="moneyType">
          <el-select v-model="form.moneyType" placeholder="请选择币种">
            <el-option v-for="dict in dict.type.money_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="付款凭证" prop="payVoucher">
          <el-input :disabled="isRenling"  v-model="form.payVoucher" placeholder="请输入付款凭证" />
        </el-form-item>
        <!-- <el-form-item label="认领人" prop="userId"> -->
       <!--   <el-input :disabled="isRenling"  v-model="form.userId" placeholder="请输入认领人" />
        </el-form-item>
        <el-form-item :disabled="isRenling"  label="认领时间" prop="claimTime">
          <el-date-picker clearable v-model="form.claimTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择认领时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>

      </el-form>


      <!---->




      <el-row style="margin-bottom: 0px; background: #d3dce6;padding-left: 15px;" v-if="isRenling">
        <el-col :span="24">
          <div class="roww center_center">
            <div style="line-height: 50px;color: #000000;margin-right:15px;">
              展商合同
            </div>
            <div class="roww center_center" style="width:160px;">
              <!-- <div style="line-height: 50px;width:150px;color:red;margin-right:15px;">
                         是否开发票
                     </div> -->
              <el-checkbox v-model="checked">是否开发票</el-checkbox>
            </div>
            <div class="allline"></div>
          </div>
        </el-col>
      </el-row>

      <!--  v-if="isRenling" -->
      <el-table v-loading="loading" :data="recruit_contractList" @selection-change="handleSelectionHTChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="客户名称" align="center" prop="customerName" />
        <el-table-column label="合同名称" align="center" prop="contractName" />
        <el-table-column label="生成时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同总金额" align="center" prop="totalRmb" />
        <el-table-column label="已收金额" align="center" prop="receivedAmount" />

        <el-table-column label="此次付款金额" align="center" prop="moling">
          <template slot-scope="scope">
            <el-input v-model="scope.row.renling_money" placeholder="抵扣"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1" v-if="!isRenling">确 定</el-button>
        <el-button type="primary" @click="claimMoneyTo" v-if="isRenling">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>


    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
      <!-- <el-button @click="submitForm">关闭</el-button> -->
    </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import Breadcrumb from '@/components/Breadcrumb';
  import TopNav from '@/components/TopNav';
  import Hamburger from '@/components/Hamburger';
  import Screenfull from '@/components/Screenfull';
  import SizeSelect from '@/components/SizeSelect';
  import Search from '@/components/HeaderSearch';
  import RuoYiGit from '@/components/RuoYi/Git';
  import RuoYiDoc from '@/components/RuoYi/Doc';

  // 获取联络地址
  import {
    listFinance_pay_record,
    getFinance_pay_record,
    delFinance_pay_record,
    addFinance_pay_record,
    updateFinance_pay_record
  } from "@/api/finance/finance_pay_record";
  // 企业合同列表
  import {
    listRecruit_contract,
    getRecruit_contract,
    delRecruit_contract,
    addRecruit_contract,
    updateRecruit_contract
  } from "@/api/recruit/recruit_contract";


  import {
    listFinance_pay_plan,
    claimfinancefinance,
    getFinance_pay_plan,
    delFinance_pay_plan,
    addFinance_pay_plan,
    updateFinance_pay_plan
  } from "@/api/finance/finance_pay_plan";


  claimfinancefinance
  export default {
    dicts: ['whether_recruit', 'is_self_exh',
      'finance_pay_account', 'money_type', 'biz_yes_no', 'zlf_status', 'finance_pay_type', 'pay_record_status'
    ],
    components: {
      Breadcrumb,
      TopNav,
      Hamburger,
      Screenfull,
      SizeSelect,
      Search,
      RuoYiGit,
      RuoYiDoc
    },

    data() {
      return {


        checked: false,
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
        // 付款(回款)记录表格数据
        finance_pay_recordList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        form: {},
        openSelExhAlert: true,
        exh_listList: [],
        rules: {},
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhId: null,
          exhibitorId: null,
          contractId: null,
          payCompany: null,
          payName: null,
          payType: null,
          payAccount: null,
          payTime: null,
          payAmount: null,
          moneyType: null,
          payVoucher: null,
          userId: null,
          claimTime: null,
          memo: null,
          status: null,
        },
        finance_pay_recordList: [],


        isRenling: false, //是否点了认领
        recruit_contractList: [], //合同列表
        idsHt: [], //合同ids列表

      };
    },
    props: {
      selExhibitorId: {
        type: Number,
        default: -1
      }
    },
    computed: {
      ...mapGetters(['sidebar', 'avatar', 'device']),
      setting: {
        get() {
          return this.$store.state.settings.showSettings;
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
          });
        }
      },
      topNav: {
        get() {
          return this.$store.state.settings.topNav;
        }
      }
    },

    created() {
      this.getList();
      this.getHTList();

    },

    methods: {

      // 禁用某些行
      selectable(row, index) {
        if (row.status == 2) {
          return false;
        }
        return true;
      },

      // 修改记录的弹窗的关闭回调
      closeAlert() {
        this.isRenling = false;
      },

      // 将认领的钱提交到后台
      claimMoneyTo() {





        var idsHt = this.idsHt;
        var recruit_contractList = this.recruit_contractList;
        var moneyTotal = 0;
        var form = this.form;
        var moneyList = []; //合同的金额列表
        var exhibitorId = "";
        for (var a = 0; a < recruit_contractList.length; a++) {
          var obg = recruit_contractList[a];
          var obg_money = {
            "id": recruit_contractList[a].id,
            "receivedAmount": obg.renling_money
          }
          if((recruit_contractList[a].contentTotal-recruit_contractList[a].receivedAmount)<obg.renling_money){
            this.$modal.msgError("认领金额不能超过合同总金额");
            return false;
          }
          moneyList.push(obg_money);
          moneyTotal = moneyTotal + parseFloat(obg.renling_money);
          exhibitorId = recruit_contractList[a].exhibitorId
        }
        if (moneyTotal <= 0) {
          this.$modal.msgError("认领金额不能小于0");
          return false;
        }
        if (form.payBalance < moneyTotal) {
          this.$modal.msgError("不能超过付款记录剩余金额");
          return false;
        }
        if (form.payBalance < moneyTotal) {
          this.$modal.msgError("不能超过付款记录剩余金额");
          return false;
        }


        // return false;

        this.submitForm1();
        var data = {
          'recordId': form.id,
          params: {
            "contractList": moneyList
          },
          'exhibitorId': exhibitorId
        }
        this.$modal.loading("正在提交中，请稍后...");
        claimfinancefinance(data).then(response => {

          this.$modal.closeLoading();
          if (response.code == 200) {
            this.open = false;
            this.$modal.msgSuccess("领取成功");
            setTimeout(res => {
              this.getList();
              this.getHTList();
            }, 1000)
          } else {
            this.$modal.msgSuccess(response.msg);
          }
        }).catch(() => {
          this.$modal.closeLoading();
        });
        this.isRenling = false;
      },
      // 认领款项
      claimMoney() {
        const ids = this.ids;
        console.log(ids)
        if (ids.length > 1) {
          this.$modal.msgError("一次只能选择一个款项认领");
          return false;
        }
        this.isRenling = true;
        var rcList = this.recruit_contractList;
        var obg = "";
        for (var a = 0; a < rcList.length; a++) {
          if (rcList[a].id == ids[0]) {
            obg = rcList[a];
          }
        }

        console.log("认领款项", obg)

        this.handleUpdate(obg);
      },
      // 合同的选中事件
      handleSelectionHTChange(selection) {
        this.idsHt = selection.map(item => item.id);
        console.log("合同选中事件", this.idsHt);
      },
      // 获取合同列表
      getHTList() {
        var data = {
          pageNum: 1,
          pageSize: 1000,
          exhibitorId: this.selExhibitorId,
        }
        listRecruit_contract(data).then(response => {
          var list = response.rows;
          var nowList = [];
          for (var a = 0; a < list.length; a++) {
            var obg = list[a];
            if (obg.receivedAmount < obg.totalRmb) {
              list[a].renling_money = 0;
              nowList.push(list[a]);
            }
          }
          this.recruit_contractList = nowList;
        });

      },


      /** 查询付款(回款)记录列表 */
      getList() {
        this.loading = true;
        listFinance_pay_record(this.queryParams).then(response => {
          this.finance_pay_recordList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
      },
      // 单选框选中的数据
      handleCurrentChange(selection) {
        console.log('单选框选中的数据', selection);
      },



      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      cancel() {
        this.openSelExhAlert = false;
      },
      cancel1() {
        this.open = false;
        this.isRenling = false;
      },
      submitForm() {
        // this.openSelExhAlert = false;
        // if(this.selExhInfo!=null&&this.selExhInfo.id){
        //    this.$ls.set('selExhInfo', this.selExhInfo, 5000*60 * 60 * 1000); //有效5000小时
        // }else{
        //    this.getLoacage();
        // }
        this.$emit('getSelExhInfo', 9);
      },
      resetQuery() {
        this.resetForm('queryForm');
        this.handleQuery();
      },

      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加付款(回款)记录";
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          exhId: null,
          exhibitorId: null,
          contractId: null,
          payCompany: null,
          payName: null,
          payType: null,
          payAccount: null,
          payTime: null,
          payAmount: null,
          moneyType: null,
          payVoucher: null,
          userId: null,
          claimTime: null,
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
      /** 修改按钮操作 */
      handleUpdate(row) {




        this.reset();
        const id = row.id || this.ids
        getFinance_pay_record(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改付款(回款)记录";
        });
      },
      /** 提交按钮 */
      submitForm1() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateFinance_pay_record(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addFinance_pay_record(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
        this.isRenling = false;

      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除付款(回款)记录编号为"' + ids + '"的数据项？').then(function() {
          return delFinance_pay_record(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },

      // 展会列表结束

      openSelExhAlertClick() {
        this.openSelExhAlert = !this.openSelExhAlert;
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar');
      },
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$ls.remove('selExhInfo');

            this.$store.dispatch('LogOut').then(() => {
              location.href = '/index';
            });
          })
          .catch(() => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .topmenu-container {
      position: absolute;
      left: 50px;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

  // 展示信息
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .div1 {
    line-height: 40px;
    padding-left: 10px;
  }

  td {
    padding: 10px 15px;
  }
</style>
