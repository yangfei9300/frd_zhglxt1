<template>
  <div >
    <!-- class="navbar" -->
    <!-- <el-dialog title="服务预定" :visible.sync="openSelExhAlert" width="80%" append-to-body      :before-close="submitForm">
      <div>
        <el-row :gutter="24">
          <el-col :span="24"><div class="grid-content bg-purple div1">服务预定</div></el-col>
        </el-row>
        <el-table v-loading="loading" :data="exh_listList" highlight-current-row @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="shortName" />
          <el-table-column label="服务编号" align="center" prop="exhName" />
          <el-table-column label="服务类别" align="center" prop="city" />
          <el-table-column label="价格" align="center" prop="city" />
          <el-table-column label="数量" align="center" prop="city" />
          <el-table-column label="剩余数量" align="center" prop="city" />
          <el-table-column label="预定数量" align="center" prop="city" />
          <el-table-column label="服务总量" align="center" prop="city" />
          <el-table-column label="服务商" align="center" prop="city" />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">关闭</el-button>
      </div>
    </el-dialog> -->

    <!-- <el-dialog title="服务预定" :visible.sync="openSelExhAlert" width="80%" append-to-body :before-close="submitForm"> -->
    <div style="height: 15px;"></div>
      <div>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple div1">服务已预定</div>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="selServiceListList" highlight-current-row
          @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="params.projectName" />
          <el-table-column label="服务编号" align="center" prop="params.projectNo" />
          <el-table-column label="服务类别" align="center" prop="params.categoryName">

          </el-table-column>
           <el-table-column label="价格" align="center" prop="params.rmbPrice" />



          <el-table-column label="数量" align="center" prop="reservationNum" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="updateServiceInfo(scope.row)"
                icon="el-icon-delete"
                v-hasPermi="['exhibitor:exhibitor_service_reservation:remove']"
              >修改</el-button>

              <el-button
                size="mini"
                type="text"
                @click="delExhibitor_service_reservationClick(scope.row)"
                icon="el-icon-delete"
                v-hasPermi="['exhibitor:exhibitor_service_reservation:remove']"
              >删除服务</el-button>

            </template>
          </el-table-column>
        </el-table>



        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple div1">给展商选择服务</div>
          </el-col>
        </el-row>

        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="150px">

          <el-form-item label="服务名称" prop="projectName">
            <el-input
              v-model="queryParams.projectName"
              placeholder="请输入服务名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="所属服务类别ID" prop="categoryId">
            <el-select v-model="queryParams.categoryId" placeholder="请选择服务类别" clearable>
              <el-option
                v-for="dict in recruit_service_categoryList"
                :key="dict.id"
                :label="dict.categoryName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>



        <el-table v-loading="loading" :data="listRecruit_service_projectList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务编号" align="center" prop="projectNo" />
          <el-table-column label="服务名称" align="center" prop="projectName" />
          <el-table-column label="服务类别" align="center" prop="boothType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType" />
            </template>
          </el-table-column>
           <el-table-column label="价格" align="center" prop="rmbPrice" />
          <!-- <el-table-column label="数量" align="center" prop="rmbPrice" /> -->
          <!-- <el-table-column label="剩余数量" align="center" prop="city" /> -->
          <!-- <el-table-column label="预定数量" align="center" prop="city" /> -->
          <el-table-column label="服务总量" align="center" prop="serviceTotal" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button @click="addserviceClick(scope.row)"
                size="mini"
                type="text"
                icon="el-icon-folder-add"
                v-hasPermi="['exhibitor:exhibitor_service_reservation:remove']"
              >添加此服务</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

      </div>
  <!--    <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">关闭</el-button>
      </div>
    </el-dialog> -->


    <!-- 添加服务 -->
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen"
     :visible.sync="addServiceAlert" :modal-append-to-body="false"
     @close="onClose" title="展商服务修改"  >
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
          >
            <el-form-item prop="projectName" label="服务名称" >
              <el-input v-model="selServiceInfo.projectName" disabled  show-word-limit clearable
                prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="服务数量" prop="reservationNum">
              <el-input v-model="formData.reservationNum" placeholder="请输入服务数量" type="number"  show-word-limit clearable
                prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addExhService">确定</el-button>
          </div>
        </el-dialog>
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
    addRecruit_boothbatchadd
  } from '@/api/recruit/recruit_booth';

  import { listExhibitor_service_reservation,
  getExhibitor_service_reservation,
  delExhibitor_service_reservation,
   addExhibitor_service_reservation,
   updateExhibitor_service_reservation,
   buyexhibitor_service_reservation,
   booklistexhibitor_service_reservation
   } from "@/api/exhibitor/exhibitor_service_reservation";

import { listRecruit_service_project,recruit_service_projectbatchimport,
importbatchrecruit_service_project, getRecruit_service_project,
delRecruit_service_project, addRecruit_service_project,
updateRecruit_service_project } from "@/api/recruit/recruit_service_project";

// 服务类别
import { listRecruit_service_category  } from "@/api/recruit/recruit_service_category";

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

        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,

        openSelExhAlert: true,
        exh_listList: [],
        loading: false,
        // 总条数
        total: 0,
        form: {},
        // 查询参数
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhibitorId: null,
          serviceId: null,
          reservationNum: null,
          exhId: null,
          userId: null,
          status: null,
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
        listRecruit_service_projectList: [], //未选择的服务
        selistRecruit_service_project:[],//选择的展位
        recruit_service_categoryList:[],//服务类别列表


        //添加服务
        addServiceAlert:false,//服务器弹窗
        // 选中的服务详情
        selServiceInfo:{},
        selServiceListList:[],//已经选择的服务列表

        formData: {
                exhibitorId: '',
                reservationNum: "",
                serviceId: "",
              },
              rules: {
                reservationNum: [{
                  required: true,
                  message: '请输入服务数量',
                  trigger: 'blur'
                }],
                serviceId: [{
                  required: true,
                  message: '请选择服务',
                  trigger: 'blur'
                }]
              },

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
      this.getList();
      this.getYesZhanwei();
      this.listExhTypegetList();
      this.getListRecruit_service_category();
      this.getSelServiceList();
    },

    methods: {
      // 删除服务
      delExhibitor_service_reservationClick(info){
        delExhibitor_service_reservation(info.id).then(response => {
          if(response.code==200){
             this.$modal.msgSuccess("删除成功");
            setTimeout(res=>{
              this.getSelServiceList();
            },1000)
          }
        });
      },
      // 修改服务数量
      updateServiceInfo(res){
        this.formData={
              exhibitorId: res.exhibitorId,
              reservationNum:res.reservationNum,
              serviceId: res.serviceId,
              id:res.id
        };
        this.selServiceInfo=res.params;
        this.selServiceInfo.id=res.serviceId;
        this.addServiceAlert=true;
        console.log("修啊给i",this.formData)
      },

      resetFrom(){
        this.formData={
              exhibitorId: '',
              reservationNum: "",
              serviceId: "",
        };
      },
      // 获取已选择的服务
      getSelServiceList(){

        var selExhInfo=this.$cache.local.getJSON('selExhInfo');
          console.log(selExhInfo) // 输出'{sessionProp: 1}'
        if(!selExhInfo.value){
          this.$modal.msgError("请选择展会");
          return false;
        }

          var data={
            pageNum: 1,
            pageSize: 1000,
            exhId:selExhInfo.id,
            exhibitorId:this.selExhibitorId,
          }
          booklistexhibitor_service_reservation(data).then(response => {
          if(response.code==200){
            this.selServiceListList=response.rows;
          }
        });
      },

      // 添加服务
      addExhService(){
        console.log(this.$cache.session.get('selExhInfo')) // 输出'{sessionProp: 1}'
         var selExhInfo=this.$cache.local.getJSON('selExhInfo');
           console.log(selExhInfo) // 输出'{sessionProp: 1}'
         if(!selExhInfo.value){
           this.$modal.msgError("请选择展会");
           return false;
         }

        var formData=this.formData;
        var selServiceInfo=this.selServiceInfo;

        if(!selServiceInfo.id&&!formData.id){
          this.$modal.msgError("请选择服务");
          return false;
        }

        if(formData.reservationNum<=0){
          this.$modal.msgError("请输入数量");
          return false;
        }
        formData.exhibitorId=this.selExhibitorId;

        formData.serviceId=this.selServiceInfo.id;

        formData.exhId=selExhInfo.value.id;
        console.log("as",formData)
        var data=[
          formData
        ];
        buyexhibitor_service_reservation(data).then(response => {
          if(response.code==200){
            this.$modal.msgSuccess("操作成功");
            this.addServiceAlert=false;
            this.resetFrom();
            this.getSelServiceList();
          }
        });

      },

      // 添加类别对话框
       addserviceClick(res) {
         console.log(res)
         this.selServiceInfo=res;
          this.addServiceAlert=true;
       },
       onOpen(){},
          onClose() {
            this.$refs['elForm'].resetFields()
          },
          close() {
            this.$emit('update:visible', false)
          },
          handleConfirm() {
            this.$refs['elForm'].validate(valid => {
              if (!valid) return
              this.close()
            })
          },

      // 获取服务类别
      getListRecruit_service_category(){
        var  queryParams={
            pageNum: 1,
            pageSize: 1000,
        }
        listRecruit_service_category(queryParams).then(response => {
          this.recruit_service_categoryList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },


      // 获取已选择服务
      getYesZhanwei(){
        var data={
            exhibitorId:this.selExhibitorId,
            pageNum: 1,
            pageSize: 10000,
        }
        listRecruit_service_project(data).then(response => {
          if(response.code==200){
            this.selistRecruit_service_project=response.rows;
          }
        }).catch((res) => {
            // 关闭遮罩层
            this.$modal.closeLoading();
        });
      },


      // 未选择的服务
      getList() {
        this.loading = true;
        listRecruit_service_project(this.queryParams).then(response => {
          this.listRecruit_service_projectList = response.rows;
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
 /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加招展服务项目";
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

        this.$emit('getSelExhInfo', 5);
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
  .demo-ruleForm{
    z-index:2005;
  }
  .jg-file-viewer{
    z-index:2004;
  }
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
