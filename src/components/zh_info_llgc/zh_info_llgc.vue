<template>
  <div >
    <!-- class="navbar" -->
    <!-- :visible.sync="openSelExhAlert"  -->
  <!--  <el-dialog title="联络过程" :visible.sync="openSelExhAlert" width="80%" append-to-body

      :before-close="submitForm"
    >
      <div> -->
        <div style="height: 15px;"></div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
          label-width="68px">
          <!-- <el-form-item label="展商ID" prop="exhibitorId">
            <el-input
              v-model="queryParams.exhibitorId"
              placeholder="请输入展商ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item> -->
          <el-form-item label="联络人" prop="contactId">
            <el-select v-model="queryParams.contactId" placeholder="请选择联络人"

            >
              <el-option v-for="dict in listExhibitor_contactList" :key="dict.id" :label="dict.contactName"
                :value="dict.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户姓名" prop="contactName">
            <el-input v-model="queryParams.contactName" placeholder="请输入客户姓名" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item>


          <el-form-item label="联络方式" prop="contactType">
            <el-select v-model="queryParams.contactType" placeholder="请选择联络方式" clearable>
              <el-option v-for="dict in dict.type.contact_type" :key="dict.value" :label="dict.label"
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

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd1"
              v-hasPermi="['exhibitor:exhibitor_contact_record:add']">新增</el-button>
          </el-col>
          <!--   <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate1"
              v-hasPermi="['exhibitor:exhibitor_contact_record:edit']"
            >修改</el-button>
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete1"
              v-hasPermi="['exhibitor:exhibitor_contact_record:remove']"
            >删除</el-button>
          </el-col> -->

          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
<!--  @current-change="handleCurrentChange" -->
        <el-table v-loading="loading" :data="exhibitor_contact_recordList" highlight-current-row
          @selection-change="handleSelectionChange">
          <el-table-column label="ID" align="center" prop="id" />

          <el-table-column label="客户姓名" align="center" prop="contactName" />

          <el-table-column label="联络时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联络方式" align="center" prop="contactType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.contact_type" :value="scope.row.contactType" />
            </template>
          </el-table-column>
          <el-table-column label="联络记录(备注)" align="center" prop="contactRecord" />
          <el-table-column label="下次联络时间" align="center" prop="nextContactTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.nextContactTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预估面积" align="center" prop="estimateArea" />
          <el-table-column label="预估金额" align="center" prop="estimateAmount" />
          <el-table-column label="所属展会" align="center" prop="params.exhName" />



          <el-table-column label="销售进度(%)" align="center" prop="saleIndex" />
          <el-table-column label="被联络人" align="center" prop="params.contactName" />
          <el-table-column label="业务员" align="center" prop="params.nickName" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate1(scope.row)"
                v-hasPermi="['exhibitor:exhibitor_contact_record:edit']">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete1(scope.row)"
                v-hasPermi="['exhibitor:exhibitor_contact_record:remove']">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- </div> -->
   <!--   <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">关闭</el-button>
      </div> -->
    <!-- </el-dialog> -->







    <!-- 添加或修改展商联络记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <!-- <el-form-item label="展会ID" prop="exhId">
              <el-input v-model="form.exhId" placeholder="请输入展会ID" />
            </el-form-item> -->
       <!-- <el-form-item label="展商ID" prop="exhibitorId">
          <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
        </el-form-item>
 -->
        <el-form-item label="联络人" prop="contactId">

          <!-- listExhibitor_contact_recordList -->
          <el-select v-model="form.contactId" placeholder="请选择联络人"
             @change="contactNameChange"
          >
            <el-option v-for="dict in listExhibitor_contactList" :key="dict.id" :label="dict.contactName"
              :value="dict.id"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="客户姓名" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入客户姓名" />
        </el-form-item>
        <!-- <el-form-item label="负责人ID" prop="userId">
              <el-input v-model="form.userId" placeholder="请输入负责人ID" />
            </el-form-item> -->
        <el-form-item label="联络记录(备注)" prop="contactRecord">
          <el-input   type="textarea" v-model="form.contactRecord" placeholder="请输入联络记录" />
        </el-form-item>
        <el-form-item label="图片">
          <image-upload v-model="form.recordImg" />
        </el-form-item>
        <el-form-item label="附件">
          <file-upload v-model="form.recordFile" />
        </el-form-item>
        <el-form-item label="联络方式" prop="contactType">
          <el-select v-model="form.contactType" placeholder="请选择联络方式">
            <el-option v-for="dict in dict.type.contact_type" :key="dict.value" :label="dict.label" :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售指数" prop="saleIndex">
          <el-input v-model="form.saleIndex" placeholder="请输入销售指数" />
        </el-form-item>
        <el-form-item label="预估面积" prop="estimateArea">
          <el-input v-model="form.estimateArea" placeholder="请输入预估面积" />
        </el-form-item>
        <el-form-item label="预估金额" prop="estimateAmount">
          <el-input v-model="form.estimateAmount" placeholder="请输入预估金额" />
        </el-form-item>
        <el-form-item label="下次联络时间" prop="nextContactTime">
          <el-date-picker clearable v-model="form.nextContactTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择下次联络时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="意向观众">
          <el-radio-group v-model="form.intentionVisitor">
            <el-radio v-for="dict in dict.type.is_intention_visitor" :key="dict.value" :label="dict.value">
              {{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="确定不参展">
          <el-radio-group v-model="form.determineRefuse">
            <el-radio v-for="dict in dict.type.is_determine_refuse" :key="dict.value" :label="dict.value">{{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.value">{{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>







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
    listExhibitor_contact_record,
    getExhibitor_contact_record,
    delExhibitor_contact_record,
    addExhibitor_contact_record,
    updateExhibitor_contact_record
  } from "@/api/exhibitor/exhibitor_contact_record";



  import {
    listExhibitor_contact,
    getExhibitor_contact,
    delExhibitor_contact,
    addExhibitor_contact,
    updateExhibitor_contact
  } from "@/api/exhibitor/exhibitor_contact";


  export default {
    dicts: ['contact_type', 'is_determine_refuse', 'is_intention_visitor', 'zlf_status'],
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

    props: {
      selExhibitorId: {
        type: Number,
        default: -1
      }
    },

    data() {
      return {

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
        open: false,
        title: "",

        openSelExhAlert: true,
        exh_listList: [],
        loading: false,
        // 总条数
        total: 0,

        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10000,
          exhId: null,
          exhibitorId: null,
          contactId: null,
          contactName: null,
          userId: null,
          contactRecord: null,
          recordImg: null,
          recordFile: null,
          contactType: null,
          saleIndex: null,
          estimateArea: null,
          estimateAmount: null,
          nextContactTime: null,
          intentionVisitor: null,
          determineRefuse: null,
          status: null,
        },
        form: {},
        listExh_typeList: [], //展会类型列表
        listExh_hallList: [], //展会展厅信息
        listExh_galleryList: [], //展馆信息
        showSearch: true, //是否显示搜索框
        selExhId: -1, //选中的展会的id
        selExhInfo: null, //选中的额展会详情


        // 联系记录列表
        exhibitor_contact_recordList: [],
        // 表单校验
        rules: {
          exhId: [{
            required: true,
            message: "展会ID不能为空",
            trigger: "blur"
          }],
          exhibitorId: [{
            required: true,
            message: "展商ID不能为空",
            trigger: "blur"
          }],
          contactId: [{
            required: true,
            message: "联络人ID不能为空",
            trigger: "blur"
          }],
        },

        listExhibitor_contactList: [], //联系人列表

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
      this.getList();
      this.listExhibitor_contactGet();
      // this.listExhTypegetList();
      // this.getLoacage();
    },

    methods: {
      /* 联系人修改*/
      contactNameChange(res){
        console.log("联系人修改",res);
        var selInfo={}
        var list=this.listExhibitor_contactList
        for(var a=0;a<list.length;a++){
          if(res==list[a].id){
            this.form.contactName=list[a].contactName;
            break;
          }
        }
      },

      // 联系记录开始

      // 获取本商家的联系人  listExhibitor_contact
      listExhibitor_contactGet() {
        var data = {
          exhibitorId: this.selExhibitorId,
          pageNum: 1,
          pageSize: 10000,
        }
        listExhibitor_contact(data).then(response => {
          this.listExhibitor_contactList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

      /** 新增按钮操作 */
      handleAdd1() {
        this.reset();
        this.open = true;
        this.title = "添加展商联络记录";
      },
      /** 修改按钮操作 */
      handleUpdate1(row) {
        this.reset();
        const id = row.id || this.ids
        getExhibitor_contact_record(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改展商联络记录";
        });
      },
      /** 提交按钮 */
      submitForm1() {

        var form = this.form;
        form.exhibitorId = this.selExhibitorId;
        this.form = form;
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateExhibitor_contact_record(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addExhibitor_contact_record(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete1(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除展商联络记录编号为"' + ids + '"的数据项？').then(function() {
          return delExhibitor_contact_record(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },

      // 表单重置
      reset() {
        this.form = {
          id: null,
          exhId: null,
          exhibitorId: this.selExhibitorId,
          contactId: null,
          contactName: null,
          userId: null,
          contactRecord: null,
          recordImg: null,
          recordFile: null,
          contactType: null,
          saleIndex: null,
          estimateArea: null,
          estimateAmount: null,
          nextContactTime: null,
          intentionVisitor: "0",
          determineRefuse: "0",
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
      // 取消按钮
      cancel1() {
        this.open = false;
        this.reset();
      },

      /** 删除按钮操作 */
      handleDelete1(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除展商联络记录编号为"' + ids + '"的数据项？').then(function() {
          return delExhibitor_contact_record(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },

      // 联系记录结束










      // 展会列表开始

      getLoacage() {
        //从缓存中拿到选中的展会
        var selExhInfo = this.$ls.get('selExhInfo');
        if (selExhInfo) {
          this.selExhInfo = selExhInfo;
        } else {}
      },

      getList() {
        this.loading = true;
        var queryParams = this.queryParams;
        queryParams.exhibitorId = this.selExhibitorId;
        this.queryParams = queryParams;
        listExhibitor_contact_record(this.queryParams).then(response => {
          this.exhibitor_contact_recordList = response.rows;
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
        // this.openSelExhAlert = false;
        // if(this.selExhInfo!=null&&this.selExhInfo.id){
        //    this.$ls.set('selExhInfo', this.selExhInfo, 5000*60 * 60 * 1000); //有效5000小时
        // }else{
        //    this.getLoacage();
        // }
        this.$emit('getSelExhInfo', 12);
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
