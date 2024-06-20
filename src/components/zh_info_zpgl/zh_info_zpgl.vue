<template>
  <div>
    <!--  class="navbar" -->
    <!-- :visible.sync="openSelExhAlert"  -->
    <!--  <el-dialog title="展品管理" :visible.sync="openSelExhAlert" width="80%" append-to-body
      :before-close="submitForm"
    > -->
    <!-- <div> -->
    <div style="height: 50px;"></div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
            v-hasPermi="['exhibitor:exhibitor_product:add']">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
            v-hasPermi="['exhibitor:exhibitor_product:edit']">修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
            v-hasPermi="['exhibitor:exhibitor_product:remove']">删除</el-button>
        </el-col>

        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-table v-loading="loading" :data="exh_listList" highlight-current-row @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="展品名称" align="center" prop="productName" />
        <!-- <el-table-column label="英文名称" align="center" prop="productEname" /> -->
        <el-table-column label="展品图片" align="center" prop="productImg" >
          <template slot-scope="scope">
            <image-preview :src="scope.row.productImg" :width="50" :height="50" />
          </template>
        </el-table-column>
        <el-table-column label="企业名称" align="center" prop="params.exhibitorName" />

        <!-- <el-table-column label="关注数量" align="center" prop="voteCount" /> -->
      </el-table>
    <!-- </div> -->
   <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="submitForm">关闭</el-button>
    </div> -->
    <!-- </el-dialog> -->





    <!-- 添加或修改展商展品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!--  <el-form-item label="展商ID" prop="exhibitorId">
              <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
            </el-form-item> -->
        <!-- <el-form-item label="展会ID" prop="exhId">
              <el-input v-model="form.exhId" placeholder="请输入展会ID" />
            </el-form-item> -->
        <el-form-item label="展品图片">
          <image-upload v-model="form.productImg" />
        </el-form-item>
        <el-form-item label="技术参数">
          <image-upload v-model="form.productSpecs" />
        </el-form-item>
        <el-form-item label="展品类别" prop="productType">
          <!-- <el-input v-model="form.productType" placeholder="请输入展品类别" /> -->
          <el-select v-model="form.productType" placeholder="请选择展品类别" clearable>
            <el-option v-for="dict in listExh_categoryList" :key="dict.id" :label="dict.categoryName"
              :value="dict.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="展品中文名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入展品中文名称" />
        </el-form-item>
        <el-form-item label="展品英文名称" prop="productEname">
          <el-input v-model="form.productEname" placeholder="请输入展品英文名称" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="中文介绍" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入中文介绍" />
        </el-form-item>
        <el-form-item label="英文介绍" prop="englishIntro">
          <el-input v-model="form.englishIntro" placeholder="请输入英文介绍" />
        </el-form-item>
        <el-form-item label="特点" prop="trait">
          <el-input v-model="form.trait" placeholder="请输入特点" />
        </el-form-item>
        <el-form-item label="采用标准" prop="standard">
          <el-input v-model="form.standard" placeholder="请输入采用标准" />
        </el-form-item>
        <el-form-item label="结构" prop="structure">
          <el-input v-model="form.structure" placeholder="请输入结构" />
        </el-form-item>
        <el-form-item label="典型应用" prop="typical">
          <el-input v-model="form.typical" placeholder="请输入典型应用" />
        </el-form-item>
       <!-- <el-form-item label="关注数量" prop="voteCount">
          <el-input v-model="form.voteCount" placeholder="请输入关注数量" />
        </el-form-item> -->
       <!-- <el-form-item label="新品">
          <el-radio-group v-model="form.isNew">
            <el-radio v-for="dict in dict.type.is_new" :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.examineStatus">
            <el-radio v-for="dict in dict.type.examine_status" :key="dict.value" :label="dict.value">{{dict.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
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
    listExhibitor_product,
    getExhibitor_product,
    delExhibitor_product,
    addExhibitor_product,
    updateExhibitor_product
  } from "@/api/exhibitor/exhibitor_product";

  import {
    listExh_category
  } from "@/api/exh/exh_category";


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
        // 遮罩层
        // 选中数组
        ids: [],
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


        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        form: {},

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
        listExh_categoryList: [], //展品列表
        // 表单校验
        rules: {
          exhibitorId: [{
            required: true,
            message: "展商ID不能为空",
            trigger: "blur"
          }],
          exhId: [{
            required: true,
            message: "展会ID不能为空",
            trigger: "blur"
          }],
          productType: [{
            required: true,
            message: "展品类别不能为空",
            trigger: "blur"
          }],
          productName: [{
            required: true,
            message: "展品中文名称不能为空",
            trigger: "blur"
          }],
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

    created() {
      this.getList();
      this.getTypes()
    },

    methods: {
      // 取消按钮
      // 取消按钮
      cancel1() {
        this.open = false;
        this.reset();
      },
      // 获取
      getTypes() {
        var data = {
          // 'exhibitorId': this.selExhibitorId,
          categoryType:4,
          pageNum: 1,
          pageSize: 100,
        }
        listExh_category(data).then(response => {
          this.listExh_categoryList = response.rows;
        });
      },
      // 获取展品列表
      getList() {
        this.loading = true;
        var data = {
          'exhibitorId': this.selExhibitorId,
          pageNum: 1,
          pageSize: 100,
        }
        listExhibitor_product(data).then(response => {
          this.exh_listList = response.rows;
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


      //正山改查
      // 表单重置
      reset() {
        this.form = {
          id: null,
          exhibitorId: null,
          exhId: null,
          productImg: null,
          productSpecs: null,
          productType: null,
          productName: null,
          productEname: null,
          model: null,
          intro: null,
          englishIntro: null,
          trait: null,
          standard: null,
          structure: null,
          typical: null,
          voteCount: null,
          isNew: "0",
          examineStatus: "0",
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
        this.title = "添加展商展品";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getExhibitor_product(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改展商展品";
        });
      },
      /** 提交按钮 */
      submitForm1() {
        var exhibitorId = this.selExhibitorId;
        var form = this.form;
        form.exhibitorId = exhibitorId;
        this.form = form;
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateExhibitor_product(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addExhibitor_product(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除展商展品编号为"' + ids + '"的数据项？').then(function() {
          return delExhibitor_product(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },


      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      cancel() {
        this.openSelExhAlert = false;
      },
      submitForm() {

        this.$emit('getSelExhInfo', 13);
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
