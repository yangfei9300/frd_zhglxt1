<template>
  <div class="navbar">

    <!-- 获取展商 -->

    <!-- 添加或修改招展展位价格类别对话框 -->
        <el-dialog title="选择当前展商" :visible.sync="openSelExhAlert" width="80%" append-to-body
        :before-close="cancel"
        >
          <div>
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="118px">

              <el-form-item label="展商名称" prop="exhibitorName">
                <el-input
                  v-model="queryParams.exhibitorName"
                  placeholder="请输入展商名称"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <!-- <el-form-item label="展商简称" prop="exhibitorSname">
                <el-input
                  v-model="queryParams.exhibitorSname"
                  placeholder="请输入展商简称"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item> -->
               <!-- <el-form-item label="公司地址" prop="exhibitorAddress">
                 <el-input
                   v-model="queryParams.exhibitorAddress"
                   placeholder="请输入公司地址"
                   clearable
                   @keyup.enter.native="handleQuery"
                 />
               </el-form-item> -->
               <el-form-item label="电话" prop="exhibitorTel">
                 <el-input
                   v-model="queryParams.exhibitorTel"
                   placeholder="请输入电话"
                   clearable
                   @keyup.enter.native="handleQuery"
                 />
               </el-form-item>
               <el-form-item label="省份" prop="exhibitorProvince">
                 <el-input v-model="queryParams.exhibitorProvince" placeholder="请输入展商省份" clearable
                   @keyup.enter.native="handleQuery" />
               </el-form-item>

               <el-form-item label="标签1" prop="tag1">
                 <el-input
                   v-model="queryParams.tag1"
                   placeholder="标签1"
                   clearable
                   @keyup.enter.native="handleQuery"
                 />
               </el-form-item>

               <el-form-item label="标签2" prop="tag2">
                 <el-input
                   v-model="queryParams.tag2"
                   placeholder="标签2"
                   clearable
                   @keyup.enter.native="handleQuery"
                 />
               </el-form-item>



              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>

            <el-table v-loading="loading" :data="exhibitor_infoList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="序号(ID)" align="center" prop="id" />
              <el-table-column label="展商名称" align="center" prop="exhibitorName" />
              <el-table-column label="产品类别" align="center" prop="productCategory" />
              <el-table-column label="标签1" align="center" prop="tag1" />
              <el-table-column label="标签2" align="center" prop="tag2" />


              <el-table-column label="状态" align="center" prop="status">
                <template slot-scope="scope">
                  <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
                </template>
              </el-table-column>
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
                    v-hasPermi="['exhibitor:exhibitor_info:edit']"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['exhibitor:exhibitor_info:remove']"
                  >删除</el-button>
                </template>
              </el-table-column> -->

            </el-table>

            <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList" />


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

import { listExhibitor_info} from "@/api/exhibitor/exhibitor_info";


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
        exhibitorName: null,
        exhibitorSname: null,
        exhibitorEname: null,
        exhibitorEsname: null,
        exhibitorAddress: null,
        exhibitorEaddress: null,
        exhibitorZipcode: null,
        exhibitorWeburl: null,
        exhibitorLogo: null,
        exhibitorCountry: null,
        exhibitorProvince: null,
        exhibitorCity: null,
        exhibitorCapital: null,
        delegationId: null,
        agentId: null,
        exhibitorLevel: null,
        exhibitorCategory: null,
        exhibitorTel: null,
        exhibitorFax: null,
        exhibitorEmail: null,
        industryId: null,
        productCategory: null,
        exhibitsCategory: null,
        exhibitorIntro: null,
        exhibitorEintro: null,
        exhibitsIntro: null,
        exhibitsEintro: null,
        tag1: null,
        tag2: null,
        memo: null,
        status: null,
      },

      listExh_typeList:[],//展会类型列表
      listExh_hallList:[],//展会展厅信息
      listExh_galleryList:[],//展馆信息
      showSearch:true,//是否显示搜索框
      selExhId:-1,//选中的展会的id
      selExhInfo:null,//选中的额展会详情

      exhibitor_infoList:[],
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

  },

  methods: {

    // 展会列表开始

    handleClose(){
      console.log("对话框关闭前的回调")

    },
    getList() {
      this.loading = true;
      var queryParams=this.queryParams;
      var selExhInfo=this.$cache.local.getJSON('selExhInfo');
      if(!selExhInfo){
        return false;
      }
      selExhInfo=selExhInfo.value;

      queryParams.params={
              "exhId": selExhInfo.id,
      }
      listExhibitor_info(queryParams).then(response => {
        this.exhibitor_infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
      console.log(this.ids)
      console.log(this.exhibitor_infoList)
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

      console.log(this.ids)
      console.log(this.exhibitor_infoList)

      var ids=this.ids;
      if(ids.length<=0){
        this.$modal.msgError("至少选择一个展商");
        return false;
      }
      var exhList=[];
      var exhibitor_infoList=this.exhibitor_infoList;

      for(var b=0;b<ids.length;b++){
         for(var a=0;a<exhibitor_infoList.length;a++){
              console.log(a,exhibitor_infoList[a])
              if(ids[b]==exhibitor_infoList[a].id){
                exhList.push(exhibitor_infoList[a]);
              }
         }
      }
      this.$emit("getSelZhanshang",exhList);
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
