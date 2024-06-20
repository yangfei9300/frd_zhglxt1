<template>
  <div>
    <!--  class="navbar" -->
    <!-- 参展历史 -->
    <!-- :visible.sync="openSelExhAlert"  -->
   <!-- <el-dialog title="参展历史" :visible.sync="openSelExhAlert" width="80%" append-to-body
     :before-close="submitForm"
    >
      <div> -->
      <div style="height: 20px;"></div>
        <el-row :gutter="24">
          <el-col :span="24"><div class="grid-content bg-purple div1">展商参展历史</div></el-col>
        </el-row>

        <el-table v-loading="loading" :data="historylistexhibitor_exhList"
         highlight-current-row @selection-change="handleSelectionChange" @current-change="handleCurrentChange"

         >
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="所属展会" align="center" prop="params.exhName" />
          <el-table-column label="展商名称" align="center" prop="params.exhibitorName" />

          <!-- <el-table-column label="展商状态" align="center" prop="params.exhName" /> -->
          <el-table-column label="展商状态" align="center" prop="determineRefuse">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.exhibitor_status" :value="scope.row.determineRefuse" />
            </template>
          </el-table-column>


          <el-table-column label="展位号" align="center" prop="params.boothNo" />
          <!-- <el-table-column label="展位类型" align="center" prop="startTime" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="展位面积" align="center" prop="params.boothArea" />
          <el-table-column label="业务员" align="center" prop="params.nickName" />

          <el-table-column label="数据来源" align="center" prop="exhibitorSource" />

          <el-table-column   width="120px" label="合同总金额" align="center" prop="params.sumAllContracts" />

        </el-table>

       <!--  -->

        <!-- <el-table v-loading="loading" :data="historylistexhibitor_exhList" highlight-current-row @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="所属展会" align="center" prop="params.exhName" />
          <el-table-column label="展位号" align="center" prop="exhName" />
          <el-table-column label="展位面积" align="center" prop="city" />
          <el-table-column label="展位类型" align="center" prop="startTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同金额" align="center" prop="city" />
          <el-table-column label="付款状态" align="center" prop="city" />
        </el-table> -->


      <!-- </div> -->
     <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">关闭</el-button>
      </div> -->
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

//
import {historylistexhibitor_exh  } from "@/api/exhibitor/exhibitor_exh";


export default {
  dicts: ['whether_recruit', 'is_self_exh', 'zlf_status',"exhibitor_status"],
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
        status: null
      },

      historylistexhibitor_exhList:[],//参展历史
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
      var data={
        exhibitorId:this.selExhibitorId
      };
      historylistexhibitor_exh(data).then(response => {
        this.historylistexhibitor_exhList = response.rows;
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

      this.$emit('getSelExhInfo',2);
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
