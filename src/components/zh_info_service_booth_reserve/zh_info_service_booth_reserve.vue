<template>
  <div>
    <!--  class="navbar" -->
   <!-- <el-dialog title="展位预定" :visible.sync="openSelExhAlert" width="80%" append-to-body :before-close="submitForm">
      <div> -->
        <div style="height: 20px;"></div>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple div1">展商已选择</div>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="selbuylistrecruit_boothList" highlight-current-row
          @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <!-- <el-table-column label="展厅号" align="center" prop="hallId" /> -->

          <el-table-column label="展厅名" align="center" prop="params.hallName" />


          <el-table-column label="展位号" align="center" prop="boothNo" />
          <el-table-column label="展位类别" align="center" prop="boothType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType" />
            </template>
          </el-table-column>
           <el-table-column label="展位面积" align="center" prop="boothArea" />
          <el-table-column label="展位费" align="center" prop="rmbPrice" />
          <el-table-column label="合同状态" align="center" >
            <template slot-scope="scope">
              <div style="color: red;" v-if="scope.row.params.outStatus!=0">已出合同</div>
              <div style="color: rgb(64, 158, 255);" v-if="scope.row.params.outStatus==0"
              @click.stop="zhanweiTUiding(scope.row)"
              >展位退订</div>
            </template>
          </el-table-column>
        </el-table>



        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple div1">给展商选择展位</div>
          </el-col>
        </el-row>

        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
          label-width="108px">
          <el-form-item label="所属展厅" prop="hallId">
            <el-select v-model="queryParams.hallId" placeholder="请选择展厅" clearable>
              <el-option v-for="dict in listExh_hallList" :key="dict.id" :label="dict.hallName" :value="dict.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="展位号" prop="boothNo">
            <el-input v-model="queryParams.boothNo" placeholder="请输入展位号" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>

         <!-- <el-form-item label="价格类别" prop="priceId">
            <el-input v-model="queryParams.priceId" placeholder="请输入价格类别" clearable @keyup.enter.native="handleQuery" />
          </el-form-item> -->
          <el-form-item label="展位类别" prop="boothType">
            <el-select v-model="queryParams.boothType" placeholder="请选择展位类别" clearable>
              <el-option v-for="dict in dict.type.booth_type" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="展位场所" prop="boothLocation">
            <el-select v-model="queryParams.boothLocation" placeholder="请选择展位场所" clearable>
              <el-option v-for="dict in dict.type.booth_location_type" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>


        <el-table v-loading="loading" :data="listRecruit_boothList" highlight-current-row
          @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="展厅名" align="center" prop="params.hallName" />

          <!-- <el-table-column label="展厅号" align="center" prop="hallId" /> -->
          <el-table-column label="展位号" align="center" prop="boothNo" />
          <el-table-column label="展位类别" align="center" prop="boothType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType" />
            </template>
          </el-table-column>
           <el-table-column label="展位面积" align="center" prop="boothArea" />
          <el-table-column label="展位费" align="center" prop="rmbPrice" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="addZhanwei(scope.row)"
                v-hasPermi="['recruit:recruit_booth:edit']">添加展位</el-button>
            </template>
          </el-table-column>
        </el-table>



        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />


      <!-- </div> -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="submitForm">关闭</el-button> -->
      </div>
    <!-- </el-dialog> -->




  </div>
</template>

<script>


  import {
    listExh_list
  } from '@/api/exh/exh_list';
  // 展会项目分类
  import {
    listExh_type
  } from '@/api/exh/exh_type';
  // 展馆
  import {
    listExh_gallery
  } from '@/api/exh/exh_gallery';
  // 展厅
  import {
    listExh_hall
  } from '@/api/exh/exh_hall';

  import {
    listRecruit_booth,
    addexhibitor_exhbuybooth,
    recruitrecruit_boothbatchimport,
    getRecruit_booth,
    delRecruit_booth,
    addRecruit_booth,
    updateRecruit_booth,notbuylistrecruit_booth,buylistrecruit_booth,
    addRecruit_boothbatchadd,boothreturnexhibitor_exh
  } from '@/api/recruit/recruit_booth';
import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb';
  import TopNav from '@/components/TopNav';
  import Hamburger from '@/components/Hamburger';
  import Screenfull from '@/components/Screenfull';
  import SizeSelect from '@/components/SizeSelect';
  import Search from '@/components/HeaderSearch';
  import RuoYiGit from '@/components/RuoYi/Git';
  import RuoYiDoc from '@/components/RuoYi/Doc';

  export default {
    dicts: ['whether_recruit', 'is_self_exh', 'zlf_status', 'booth_type', 'booth_location_type'],
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
        form: {},
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhId: null,
          hallId: null,
          boothNo: null,
          priceId: null,
          boothType: null,
          boothLocation: null,
          boothLength: null,
          boothWidth: null,
          boothArea: null,
          rmbPrice: null,
          boothDescribe: null,
          exhibitorId: null,
          exhType: null,
          status: null
        },

        listExh_typeList: [], //展会类型列表
        listExh_hallList: [], //展会展厅信息
        listExh_galleryList: [], //展馆信息
        showSearch: true, //是否显示搜索框
        selExhId: -1, //选中的展会的id
        selExhInfo: null, //选中的额展会详情
        rules: {
        exhId: [{ required: true, message: '所属展会ID不能为空', trigger: 'blur' }],
        hallId: [{ required: true, message: '所属展厅ID不能为空', trigger: 'blur' }],
        boothNo: [{ required: true, message: '展位号不能为空', trigger: 'blur' }],
        priceId: [{ required: true, message: '价格类别不能为空', trigger: 'blur' }],
        boothType: [{ required: true, message: '展位类别不能为空', trigger: 'change' }],
        boothLength: [{ required: true, message: '展位长度不能为空', trigger: 'blur' }],
        boothWidth: [{ required: true, message: '展位宽度不能为空', trigger: 'blur' }],
        boothArea: [{ required: true, message: '展位面积不能为空', trigger: 'blur' }],
        rmbPrice: [{ required: true, message: '人民币价格不能为空', trigger: 'blur' }]
      },
        listRecruit_boothList: [], //未选择的展位
        selbuylistrecruit_boothList:[],//选择的展位
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
    },
    exhibitorInfo:{
      type: Object,
      default: null
    }
  },
    created() {

      console.log("初始化展位预定",this.selExhibitorId,this.exhibitorInfo)

      this.getList();
      this.getYesZhanwei();
      this.listExhTypegetList();
    },

    methods: {

        // 展位退订
        zhanweiTUiding(res1){
          console.log("要退订的信息",res1);
          this.$modal.confirm('确定要退订吗').then((res)=> {
              console.log("要退订")
              this.boothreturnexhibitor_exhTo(res1);
          }).catch((res) => {
            console.log("报错",res);
          });
        },

        // 展位退订接口
        boothreturnexhibitor_exhTo(res1){
          var data={
              params:{
                booths:res1.id,
              
              },
              'exhibitorId':res1.exhibitorId
          }
          boothreturnexhibitor_exh(data).then(response => {
            if(response.code==200){
               this.$modal.msgSuccess("展位退订成功");
               setTimeout(res=>{
                 this.getYesZhanwei();
                 this.getList();
               },1000)
            }
          }).catch((res) => {
            console.log("请求接口报错",res);
          });
        },

      // 获取已选择展位
      getYesZhanwei(){
        var data={
            exhibitorId:this.exhibitorInfo.exhibitorId,
            pageNum: 1,
            pageSize: 10000,
        }
        buylistrecruit_booth(data).then(response => {
          if(response.code==200){
            this.selbuylistrecruit_boothList=response.rows;
          }
        }).catch((res) => {
            // 关闭遮罩层
            this.$modal.closeLoading();
        });
      },

      // 给展商添加展位
      addZhanwei(row) {
        console.log('this.exhibitorInfo',this.exhibitorInfo)
        this.$modal.confirm('确定要绑定展商吗？').then((res) => {
          this.addZhanwei1(row);
        }).catch(() => {
          console.log("333")
        });
      },
      addZhanwei1(row) {
        var data = {
          "id":this.exhibitorInfo.id,
          "exhibitorId":this.exhibitorInfo.exhibitorId,
          "params":{
            "booths":row.id
          }
        }
        this.$modal.loading("展位提交中，请稍后...");
        addexhibitor_exhbuybooth(data).then(response => {
          if(response.code==200){
            this.$modal.msgSuccess("操作成功");
            console.log("刷新已选择展位");
            // 关闭遮罩层
            this.$modal.closeLoading();
            this.getYesZhanwei();
            this.getList()
          }
        }).catch((res) => {
            console.log("保安说的阿斯顿",res);
            // 关闭遮罩层
            this.$modal.closeLoading();
        });
      },
      // 未选择的展位
      getList() {
        this.loading = true;
        notbuylistrecruit_booth(this.queryParams).then(response => {
          this.listRecruit_boothList = response.rows;
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
        // console.log('单选框选中的数据', selection);

      },

      // 获取展会项目
      listExhTypegetList() {
        var data = {
          pageNum: 1,
          pageSize: 1000
        };
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
      cancel() {
        this.openSelExhAlert = false;
        this.getLoacage();
      },
      submitForm() {

        this.$emit('getSelExhInfo', 6);
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
