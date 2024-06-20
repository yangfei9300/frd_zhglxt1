<template>
  <div>

    <!--  class="navbar" -->

    <!-- :visible.sync="openSelExhAlert"  -->
   <!-- <el-dialog title="文件管理" :visible.sync="openSelExhAlert" width="80%" append-to-body
            :before-close="submitForm"
    >
      <div> -->

      <div style="height: 20px;"></div>
        <el-row :gutter="24">
          <el-col :span="24"><div class="grid-content bg-purple div1">相关文件</div></el-col>
        </el-row>

<el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exhibitor:exhibitor_file:add']"
        >新增</el-button>
      </el-col>

      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

        <el-table v-loading="loading" :data="listExhibitor_fileList" highlight-current-row @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
          <el-table-column label="文件ID" align="center" prop="id" />
          <el-table-column label="文件描述" align="center" prop="memo" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                  @click="downloadExcel(scope.row)"
                icon="el-icon-edit"
                v-hasPermi="['exhibitor:exhibitor_info:edit']"
              >下载</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['exhibitor:exhibitor_file:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete1(scope.row)"
                v-hasPermi="['exhibitor:exhibitor_file:remove']"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>


      <!-- </div> -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
        <!-- <el-button @click="submitForm">关闭</el-button> -->
      </div>
    <!-- </el-dialog> -->


    <!-- 添加或修改展商文件对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <!-- <el-form-item label="展商ID" prop="exhibitorId">
              <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
            </el-form-item> -->
            <el-form-item label="文件地址">
              <file-upload v-model="form.filePath"/>
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


import { listExhibitor_file, getExhibitor_file, delExhibitor_file, addExhibitor_file, updateExhibitor_file } from "@/api/exhibitor/exhibitor_file";

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
      selExhInfo: null, //选中的额展会详情

      // 展会列表
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      form:{},
      listExhibitor_fileList:[],
      rules:[],
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

    // 文件管理
 // 取消按钮
    cancel1() {
      this.open = false;
      this.reset();
    },
    downloadExcel(row) {
        console.log(row,process.env)
        // window.location.href = process.env.VUE_APP_BASE_API+row.templateFile;
        this.$download.resource(row.filePath);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加展商文件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExhibitor_file(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展商文件";
      });
    },
    /** 提交按钮 */
    submitForm1() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExhibitor_file(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            var selExhibitorId=this.selExhibitorId;
            var form=this.form;
            form.exhibitorId=selExhibitorId;
            this.form=form;
            addExhibitor_file(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展商文件编号为"' + ids + '"的数据项？').then(function() {
        return delExhibitor_file(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        exhibitorId: this.selExhibitorId,
        filePath: null,
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
 // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },


    // 文件管理结束


    // 展会列表开始
    getLoacage() {
      //从缓存中拿到选中的展会
      var selExhInfo = this.$ls.get('selExhInfo');
      if (selExhInfo) {
        this.selExhInfo = selExhInfo;
      } else {
      }
    },

    getList() {
      this.loading = true;
       var selExhibitorId=this.selExhibitorId;
            var queryParams=this.queryParams;
            queryParams.exhibitorId=selExhibitorId;
            this.queryParams=queryParams;
      listExhibitor_file(this.queryParams).then(response => {
        this.listExhibitor_fileList = response.rows;
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
      this.$emit('getSelExhInfo',4);
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
