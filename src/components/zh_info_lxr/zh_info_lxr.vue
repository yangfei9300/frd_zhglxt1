<template>
  <div >

    <!-- class="navbar" -->

    <!-- :visible.sync="openSelExhAlert"  -->
   <!-- <el-dialog title="联系人" :visible.sync="openSelExhAlert" width="80%" append-to-body
         :before-close="submitForm"
    >
      <div> -->
      <div style="height: 20px;"></div>
        <el-row :gutter="24">
          <el-col :span="24"><div class="grid-content bg-purple div1">相关联系人</div></el-col>
        </el-row>

        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true"
         v-show="showSearch" label-width="68px">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini"
              v-hasPermi="['exhibitor:exhibitor_contact:add']"
             @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="listExhibitor_contactList" highlight-current-row @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="姓名" align="center" prop="contactName" />
         <el-table-column label="性别" align="center" prop="contactGender">
           <template slot-scope="scope">
             <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.contactGender"/>
           </template>
         </el-table-column>
          <el-table-column label="部门" align="center" prop="contactDept" />
          <el-table-column label="职务" align="center" prop="contactPost" />
          <el-table-column label="邮编" align="center" prop="contactZipcode" />
          <el-table-column label="手机号" align="center" prop="contactPhone" />
          <el-table-column label="电话" align="center" prop="contactTel" />
          <el-table-column label="传真" align="center" prop="contactFax" />
          <!-- <el-table-column label="职责" align="center" prop="city" /> -->
          <el-table-column label="其他联系方式" align="center" prop="contactOther" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['exhibitor:exhibitor_contact:edit']"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>


      <!-- </div> -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <!-- <el-button @click="submitForm">关闭</el-button> -->
      </div>
    <!-- </el-dialog> -->




    <!-- 添加或修改展商联系人对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
           <!-- <el-form-item label="所属展商ID" prop="exhibitorId">
              <el-input v-model="form.exhibitorId" placeholder="请输入所属展商ID" />
            </el-form-item> -->
            <el-form-item label="姓名" prop="contactName">
              <el-input v-model="form.contactName" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.contactGender">
                <el-radio
                  v-for="dict in dict.type.sys_user_sex"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="部门" prop="contactDept">
              <el-input v-model="form.contactDept" placeholder="请输入部门" />
            </el-form-item>
            <el-form-item label="职务" prop="contactPost">
              <el-input v-model="form.contactPost" placeholder="请输入职务" />
            </el-form-item>
            <el-form-item label="地址" prop="contactAddress">
              <el-input v-model="form.contactAddress" placeholder="请输入地址" />
            </el-form-item>
            <el-form-item label="邮编" prop="contactZipcode">
              <el-input v-model="form.contactZipcode" placeholder="请输入邮编" />
            </el-form-item>
           <el-form-item label="手机号" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="电话" prop="contactTel">
              <el-input v-model="form.contactTel" placeholder="请输入电话" />
            </el-form-item>
            <el-form-item label="传真" prop="contactFax">
              <el-input v-model="form.contactFax" placeholder="请输入传真" />
            </el-form-item>
            <el-form-item label="Email" prop="contactEmail">
              <el-input v-model="form.contactEmail" placeholder="请输入Email" />
            </el-form-item>
            <el-form-item label="QQ" prop="contactQq">
              <el-input v-model="form.contactQq" placeholder="请输入QQ" />
            </el-form-item>
            <el-form-item label="微信" prop="contactWechat">
              <el-input v-model="form.contactWechat" placeholder="请输入微信" />
            </el-form-item>
            <el-form-item label="其他联系方式" prop="contactOther">
              <el-input v-model="form.contactOther" placeholder="请输入其他联系方式" />
            </el-form-item>
            <el-form-item label="地域信息" prop="contactRegion">
              <el-input v-model="form.contactRegion" placeholder="请输入地域信息" />
            </el-form-item>
            <el-form-item label="备注" prop="memo">
              <el-input v-model="form.memo" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.zlf_status"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
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



import { listExhibitor_contact, getExhibitor_contact, delExhibitor_contact, addExhibitor_contact, updateExhibitor_contact } from "@/api/exhibitor/exhibitor_contact";


export default {
  dicts: ['whether_recruit', 'is_self_exh', 'zlf_status','sys_user_sex'],

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

      listExh_typeList: [], //展会类型列表
      listExh_hallList: [], //展会展厅信息
      listExh_galleryList: [], //展馆信息
      showSearch: true, //是否显示搜索框
      selExhId: -1, //选中的展会的id
      selExhInfo: null ,//选中的额展会详情

      // 联系人
      listExhibitor_contactList:[],

      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      form: {},
      // 表单校验
      rules: {
        exhibitorId: [
          { required: true, message: "所属展商ID不能为空", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        // contactTel: [
        //   { required: true, message: "电话不能为空", trigger: "blur" }
        // ],
        contactPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
      }

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
  },

  methods: {


    // 联系人开始

// 表单重置
    reset() {
      this.form = {
        id: null,
        exhibitorId: null,
        contactName: null,
        contactGender: "0",
        contactDept: null,
        contactPost: null,
        contactAddress: null,
        contactZipcode: null,
        contactPhone: null,
        contactTel: null,
        contactFax: null,
        contactEmail: null,
        contactQq: null,
        contactWechat: null,
        contactOther: null,
        contactRegion: null,
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

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加展商联系人";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_contact(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商联系人";
      });
    },
    /** 提交按钮 */
    submitForm1() {

      // this.form.contactPhone="";
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_contact(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            var form=this.form;
            form.exhibitorId=this.selExhibitorId;
            this.form=form;
            addExhibitor_contact(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },


    // 联系人结束

    // 展会列表开始


    getList() {
      this.loading = true;
      console.log(this.selExhibitorId)
      var data={
        'exhibitorId':this.selExhibitorId,
        pageNum: 1,
        pageSize: 100,
      }
      listExhibitor_contact(data).then(response => {
        this.listExhibitor_contactList = response.rows;
        this.loading=false;
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
    },
    cancel1() {
      this.open = false;
    },
    submitForm() {
      // this.openSelExhAlert = false;
      // if(this.selExhInfo!=null&&this.selExhInfo.id){
      //    this.$ls.set('selExhInfo', this.selExhInfo, 5000*60 * 60 * 1000); //有效5000小时
      // }else{
      //    this.getLoacage();
      // }
      this.$emit('getSelExhInfo',3);
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
