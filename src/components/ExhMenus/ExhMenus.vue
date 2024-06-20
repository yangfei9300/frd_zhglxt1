<template>

  <el-dialog title="展商操作台" :visible.sync="openSelExhAlert" width="95%" height="1000px" append-to-body :before-close="submitForm">

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">展商概况</el-menu-item>
      <!-- <el-menu-item index="2">基本信息</el-menu-item> -->
      <el-menu-item index="3">参会历史</el-menu-item>
      <el-menu-item index="4">联系人</el-menu-item>
      <el-menu-item index="5">文件管理</el-menu-item>
      <el-menu-item index="6">服务预定</el-menu-item>
      <el-menu-item index="7">展位预定</el-menu-item>
      <el-menu-item index="8">合同管理</el-menu-item>
      <!-- <el-menu-item index="9">付款计划</el-menu-item> -->
      <el-menu-item index="10">付款记录</el-menu-item>
      <!-- <el-menu-item index="11">会刊信息</el-menu-item> -->
      <!-- <el-menu-item index="12">证件管理</el-menu-item> -->
      <el-menu-item index="13">联络过程</el-menu-item>
      <el-menu-item index="14">展品管理</el-menu-item>
      <!-- <el-menu-item index="15">登录信息</el-menu-item> -->
    </el-menu>

    <zh_info
    :selExhibitorId="selExhibitorId"
     :exhibitorInfo="exhibitorInfo"
    @getSelExhInfo="getSelExhInfo"
    v-if="activeIndex==1"></zh_info>


    <zh_info_czls :selExhibitorId="selExhibitorId"  @getSelExhInfo="getSelExhInfo"
      v-if="activeIndex==3"></zh_info_czls>
    <zh_info_lxr :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo" v-if="activeIndex==4">
    </zh_info_lxr>
    <zh_info_file :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo"
      v-if="activeIndex==5"></zh_info_file>
    <zh_info_service_reserve :selExhibitorId="selExhibitorId" @getSelExhInfo="getSelExhInfo"
      v-if="activeIndex==6"></zh_info_service_reserve>
    <zh_info_service_booth_reserve :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId"
      @getSelExhInfo="getSelExhInfo" v-if="activeIndex==7">
    </zh_info_service_booth_reserve>

    <div v-if="activeIndex==8">
      <zh_info_lxr_contract :exhibitorInfo="exhibitorInfo" :selExhibitorId="selExhibitorId"
        @getSelExhInfo="getSelExhInfo"></zh_info_lxr_contract>
    </div>

    <zh_info_plan_money :selExhibitorId="selExhibitorId" v-if="activeIndex==9"
      @getSelExhInfo="getSelExhInfo"></zh_info_plan_money>
        
    <zh_info_plan_money_history :selExhibitorId="selExhibitorId" v-if="activeIndex==10"
      @getSelExhInfo="getSelExhInfo"></zh_info_plan_money_history>
        
    <zh_info_llgc :selExhibitorId="selExhibitorId" v-if="activeIndex==13"
      @getSelExhInfo="getSelExhInfo"></zh_info_llgc>
    <zh_info_zpgl :selExhibitorId="selExhibitorId" v-if="activeIndex==14"
      @getSelExhInfo="getSelExhInfo"></zh_info_zpgl>







    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
      <el-button @click="closeMenus">关闭</el-button>
    </div>
  </el-dialog>


</template>


<script>
  import zh_info from '@/components/zh_info/zh_info'

  import zh_info_czls from '@/components/zh_info_czls/zh_info_czls'
  import zh_info_lxr from '@/components/zh_info_lxr/zh_info_lxr'
  import zh_info_file from '@/components/zh_info_file/zh_info_file'
  import zh_info_service_reserve from '@/components/zh_info_service_reserve/zh_info_service_reserve'
  import zh_info_service_booth_reserve from '@/components/zh_info_service_booth_reserve/zh_info_service_booth_reserve'
  import zh_info_lxr_contract from '@/components/zh_info_lxr_contract/zh_info_lxr_contract'
  import zh_info_plan_money from '@/components/zh_info_plan_money/zh_info_plan_money'
  import zh_info_plan_money_history from '@/components/zh_info_plan_money_history/zh_info_plan_money_history'
  import zh_info_llgc from '@/components/zh_info_llgc/zh_info_llgc'
  import zh_info_zpgl from '@/components/zh_info_zpgl/zh_info_zpgl'

  export default {

    components: {
      zh_info,
      zh_info_czls,
      zh_info_lxr,
      zh_info_file,
      zh_info_service_reserve,
      zh_info_service_booth_reserve,
      zh_info_lxr_contract,
      zh_info_plan_money,
      zh_info_plan_money_history,
      zh_info_llgc,
      zh_info_zpgl,
    },

    dicts: [],


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
    data() {
      return {
        openSelExhAlert: true,
        activeIndex: '1',
      };
    },

    methods: {
      closeMenus(){
        this.$emit("closeMenus",{"is":false})
      },
      handleSelect(key, keyPath) {
        console.log(key);
        console.log(keyPath);
        this.activeIndex=keyPath[0];
      },
      submitForm() {

          this.$emit("closeMenus",{"is":false})
      },
      getSelExhInfo(){},
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
