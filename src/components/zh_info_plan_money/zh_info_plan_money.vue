<template>
  <div>
    <!--  class="navbar" -->
    <!-- :visible.sync="openSelExhAlert"  -->
  <!--  <el-dialog title="付款计划" :visible.sync="openSelExhAlert" width="80%" append-to-body
      :before-close="submitForm"> -->
      <div>
        <div style="height: 15px;"></div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <!-- <el-form-item label="所属展会ID" prop="exhId">
            <el-input
              v-model="queryParams.exhId"
              placeholder="请输入所属展会ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item> -->

          <el-form-item label="合同ID" prop="contractId">
            <el-input
              v-model="queryParams.contractId"
              placeholder="请输入合同ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

         <!-- <el-form-item label="付款计划名称" prop="planName">
            <el-input
              v-model="queryParams.planName"
              placeholder="请输入付款计划名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="付款比例(%)" prop="planPercent">
            <el-input
              v-model="queryParams.planPercent"
              placeholder="请输入付款比例(%)"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="付款金额" prop="payAmount">
            <el-input
              v-model="queryParams.payAmount"
              placeholder="请输入付款金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="截止日期" prop="planTime">
            <el-date-picker clearable
              v-model="queryParams.planTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择截止日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="付款状态" prop="planStatus">
            <el-select v-model="queryParams.planStatus" placeholder="请选择付款状态" clearable>
              <el-option
                v-for="dict in dict.type.pay_plan_status"
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
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option
                v-for="dict in dict.type.zlf_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="finance_pay_planList"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="所属合同" align="center" prop="contractId" />
          <!-- <el-table-column label="付款计划名称" align="center" prop="planName" /> -->

          <el-table-column label="付款计划名称" align="center" prop="planStatus">
            <template slot-scope="scope">
              <div>全款付清</div>
            </template>
          </el-table-column>

          <el-table-column label="付款金额" align="center" prop="payAmount" />
          <el-table-column label="付款截止时间" align="center" prop="planTime" />
          <el-table-column label="付款比例" align="center" prop="planPercent" />
         <el-table-column label="付款状态" align="center" prop="planStatus">
           <template slot-scope="scope">
             <dict-tag :options="dict.type.pay_plan_status" :value="scope.row.planStatus"/>
           </template>
         </el-table-column>
          <!-- <el-table-column label="延期" align="center" prop="city" /> -->
          <!-- <el-table-column label="付款通知书" align="center" prop="city" /> -->
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <!-- <el-button @click="submitForm">关闭</el-button> -->
      </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import TopNav from '@/components/TopNav';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import RuoYiGit from '@/components/RuoYi/Git';
import RuoYiDoc from '@/components/RuoYi/Doc';

import { listExh_list } from '@/api/exh/exh_list';
// 展会项目分类
import { listExh_type } from '@/api/exh/exh_type';
// 展馆
import { listExh_gallery } from '@/api/exh/exh_gallery';
// 展厅
import { listExh_hall } from '@/api/exh/exh_hall';

// 付款计划
import { listFinance_pay_plan, getFinance_pay_plan, delFinance_pay_plan, addFinance_pay_plan, updateFinance_pay_plan } from "@/api/finance/finance_pay_plan";


export default {
  dicts: ['whether_recruit', 'is_self_exh', 'zlf_status','pay_plan_status'],
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
      openSelExhAlert: true,
      exh_listList: [],
      loading: false,
      // 总条数
      total: 0,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhId: null,
        contractId: null,
        exhibitorId: null,
        planName: null,
        planPercent: null,
        payAmount: null,
        planTime: null,
        planStatus: null,
        memo: null,
        status: null,
      },

      listExh_typeList: [], //展会类型列表
      listExh_hallList: [], //展会展厅信息
      listExh_galleryList: [], //展馆信息
      showSearch: true, //是否显示搜索框
      selExhId: -1, //选中的展会的id
      selExhInfo: null ,//选中的额展会详情


      // 付款计划
      finance_pay_planList:[],//付款计划列表
    };
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

  props: {
     selExhibitorId: {
       type: Number,
       default: -1
     }
  },

  created() {
    this.getList();

  },

  methods: {



    getList() {
      this.loading = true;
      var exhibitorId=this.selExhibitorId;
      var queryParams=this.queryParams;
      queryParams.exhibitorId=exhibitorId;
      listFinance_pay_plan(queryParams).then(response => {
        this.finance_pay_planList = response.rows;
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
      this.selExhId = selection.id;
      this.selExhInfo = selection;
    },



    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    cancel() {
      this.openSelExhAlert = false;
      this.getLoacage();
    },
    submitForm() {
      // this.openSelExhAlert = false;
      // if(this.selExhInfo!=null&&this.selExhInfo.id){
      //    this.$ls.set('selExhInfo', this.selExhInfo, 5000*60 * 60 * 1000); //有效5000小时
      // }else{
      //    this.getLoacage();
      // }
      this.$emit('getSelExhInfo',8);
    },
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
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
