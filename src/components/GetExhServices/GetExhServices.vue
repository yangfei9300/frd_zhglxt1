<template>
  <div class="navbar">
    <!-- 获取服务 -->
    <!-- 添加或修改招展展位价格类别对话框 -->     <el-dialog title="批量导入服务" :visible.sync="openSelExhAlert" width="80%" append-to-body
     :before-close="cancel"
     >        <div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="148px">



          <el-form-item label="所属展会" prop="exhId">
            <el-select v-model="queryParams.exh" placeholder="请选择展会" clearable>
              <el-option v-for="dict in listExh_List" :key="dict.id" :label="dict.exhName" :value="dict.id" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>



        <el-table v-loading="loading" :data="recruit_service_projectList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="projectName" />
          <el-table-column label="所属服务类别" align="center" prop="categoryId" />
          <el-table-column label="人民币价格" align="center" prop="rmbPrice" />
          <el-table-column label="服务规格" align="center" prop="projectSpec" />
          <el-table-column label="计数单位" align="center" prop="countUnit" />


          <el-table-column label="所属展会ID" align="center" prop="exhId" />
          <el-table-column label="所属展会项目ID" align="center" prop="exhType" />
          <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
        </el-table>       </div>        <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm">确 定</el-button>          <el-button @click="cancel">取 消</el-button>        </div>      </el-dialog>
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
import { listRecruit_service_project} from "@/api/recruit/recruit_service_project";


export default {
  dicts: ['whether_recruit', 'is_self_exh', 'zlf_status'],
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
        pageSize: 1000,
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
        exh:"",
        params:{
          exh:""
        }
      },

      listExh_List:[],//展会列表
      showSearch: true, //是否显示搜索框
      selExhId: -1, //选中的展会的id
      selExhInfo: null ,//选中的额展会详情
      recruit_service_projectList:[],
      selServicess:[],//选择服务
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

  created() {
    this.openSelExhAlert=true;
    this.getList();
    this.listExhTypegetList();
    this.getLoacage();
  },

  methods: {
    // 展会列表开始

    getLoacage() {
      //从缓存中拿到选中的展会
      var selExhInfo = this.$ls.get('selExhInfo');
      if (selExhInfo) {
        this.selExhInfo = selExhInfo;
      } else {
      }
    },

    /** 查询招展服务项目列表 */
    getList() {
      this.loading = true;
      this.queryParams.params.exh=this.queryParams.exh;
      listRecruit_service_project(this.queryParams).then(response => {
        this.recruit_service_projectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;

      this.selServicess=selection
    },
    // 单选框选中的数据
    handleCurrentChange(selection) {
      console.log('单选框选中的数据', selection);
      this.selExhId = selection.id;
      this.selExhInfo = selection;
    },

    // 获取展会项目
    listExhTypegetList() {
      var data = {
        pageNum: 1,
        pageSize: 1000
      };
      listExh_list(data).then(response => {
        this.listExh_List = response.rows;
      });
      // 获取问卷调查表
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    cancel() {
      this.openSelExhAlert = false;
      this.$emit('close',{});
    },
    submitForm() {
      if(this.selServicess.length<=0){
        this.$modal.alertError("请选择相关服务");
        return false;
      }
      this.openSelExhAlert = true;
      this.$emit('getSelExhServiceInfo', this.selServicess);
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
</style>
