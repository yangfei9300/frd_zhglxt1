<template>
  <div class="navbar">

    <!-- 获取展会 -->

        <el-dialog title="选择当前展会" :visible.sync="openSelExhAlert" width="80%" append-to-body
         :before-close="cancel"
        >
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
              <el-form-item label="展会开始时间" prop="startTime">
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
              </el-form-item>

              <el-form-item label="举办城市" prop="city">
                <el-input
                  v-model="queryParams.city"
                  placeholder="请输入举办城市"
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
             <el-table-column label="选择" align="center" prop="startTime" width="180">
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
        </el-dialog>




  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

import { listExh_list} from "@/api/exh/exh_list";
// 展会项目分类
import { listExh_type } from "@/api/exh/exh_type";
// 展馆
import { listExh_gallery } from "@/api/exh/exh_gallery";
// 展厅
import { listExh_hall} from "@/api/exh/exh_hall";

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
    RuoYiDoc,
  },

  data() {
    return {
      openSelExhAlert:true,
      exh_listList:[],
      loading:false,
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
        status: null,
      },

      listExh_typeList:[],//展会类型列表
      listExh_hallList:[],//展会展厅信息
      listExh_galleryList:[],//展馆信息
      showSearch:true,//是否显示搜索框
      selExhId:-1,//选中的展会的id
      selExhInfo:null,//选中的额展会详情
    }
  },

  props: {
    // 展会id
    exhibitorId: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },

  created() {
    this.getList();
    this.listExhTypegetList();
    this.getLoacage();

  },

  methods: {

    // 展会列表开始

    getLoacage(){
      //从缓存中拿到选中的展会
      var selExhInfo=this.$ls.get("selExhInfo");
      if(selExhInfo){
        this.selExhInfo=selExhInfo;
      }
    },

    getList() {
      this.loading = true;
      var exhibitorId=this.exhibitorId;
      console.log("exhibitorIdGetExhLists",exhibitorId)
      var queryParams=this.queryParams;
      if(exhibitorId!=''){
        queryParams.params={
          exhId:exhibitorId
        }
      }
      listExh_list(queryParams).then(response => {
        this.exh_listList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    // 单选框选中的数据
    handleCurrentChange(selection){
      console.log("单选框选中的数据",selection);
      this.selExhId=selection.id;
      this.selExhInfo=selection;
    },

    // 获取展会项目
    listExhTypegetList(){
      var data={
        pageNum: 1,
        pageSize: 1000,
      }
      listExh_type(data).then(response => {
        this.listExh_typeList = response.rows;
      });
      listExh_hall(data).then(response => {
        this.listExh_hallList = response.rows;
      });
      listExh_gallery(data).then(response => {
        this.listExh_galleryList = response.rows;
      });
      // 获取问卷调查表
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    cancel(){
      this.$emit("close",{});
    },
    submitForm(){
      // this.openSelExhAlert=false;
      // if(this.selExhInfo!=null&&this.selExhInfo.id){
      //    this.$ls.set('selExhInfo', this.selExhInfo, 5000*60 * 60 * 1000); //有效5000小时
      // }else{
      //    this.getLoacage();
      // }
      this.$emit("getSelExhInfo",this.selExhInfo);
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 展会列表结束





    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$ls.remove('selExhInfo');

        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
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
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
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
