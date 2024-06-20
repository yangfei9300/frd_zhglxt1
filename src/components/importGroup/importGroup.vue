<template>
  <div>
    <el-dialog title="导入数据创建战团" :visible.sync="fileOpen" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="展商信息文件" prop="filePathIn">
          <file-upload :fileType="fileType" v-model="filePathIn" />
        </el-form-item>
        <el-form-item label="参考模板">
          <el-button type="text" @click="downLoadFile">模板下载</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_file">确 定</el-button>
        <el-button @click="cancel_fileopenCLick">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {  visitor_groupfileimport} from "@/api/visitor/visitor_group";


  export default {
    dicts: ['whether_recruit', 'is_self_exh', 'zlf_status', 'exhibitor_source_type'],
    components: {

    },
    props: {
      selExhibitorId: {
        type: Number,
        default: -1
      },
      exhibitorInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        fileOpen: true,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        },
      fileType:["doc", "xls",'xlsx', "ppt", "txt", "pdf"],
            filePathIn:"",//文件导入地址存储

      };
    },

    computed: {
      setting: {

      },
      topNav: {
        get() {
          return this.$store.state.settings.topNav;
        }
      }
    },

    created() {
      console.log('exhibitorInfo', this.exhibitorInfo, "selExhibitorId", this.selExhibitorId)
      this.getList();
    },

    methods: {
      downLoadFile(){
          console.log("downLoadFile")
          // https://frdzlfapi.zsyflive.com/profile/zhanshang.xlsx
          this.$download.resource("/profile/zhantuan.xlsx");
        },
 // 导入文件
        submitForm_file(){
          var filepath=this.filePathIn;
          if(filepath==''){
            this.$modal.msgError("请选择文件");
            return false;
          }
          var data={
            file:filepath,
          }
          this.$modal.loading("正在导入数据，请稍后...");
          visitor_groupfileimport(data).then(response => {
              this.$modal.closeLoading();
              if(response.code==200){
                this.$modal.msgSuccess("导入成功");
                this.cancel_fileopenCLick("success");
              }else{
                this.$modal.msgSuccess(res.msg);
              }
          }).catch(() => {
            this.$modal.closeLoading();
          });
        },
        // 文件关闭
        cancel_fileopenCLick(txtx){
          // this.fileOpen=false;
          this.$emit("cancel_fileopenCLick",{"code":txtx})
        },


    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 1000px;
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
