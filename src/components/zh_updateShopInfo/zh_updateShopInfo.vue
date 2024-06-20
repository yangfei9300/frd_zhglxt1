<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
    
    
           <el-form-item label="展商名称" prop="exhibitorName">
              <el-input v-model="form.exhibitorName" placeholder="请输入展商名称" />
            </el-form-item>
    
    
    
    
    
            <el-form-item label="展商简称" prop="exhibitorSname">
              <el-input v-model="form.exhibitorSname" placeholder="请输入展商简称" />
            </el-form-item>
    
            <el-form-item label="展商英文名称" prop="exhibitorEname">
              <el-input v-model="form.exhibitorEname" placeholder="请输入展商英文名称" />
            </el-form-item>
            <el-form-item label="展商英文简称" prop="exhibitorEsname">
              <el-input v-model="form.exhibitorEsname" placeholder="请输入展商英文简称" />
            </el-form-item>
            <el-form-item label="公司地址" prop="exhibitorAddress">
              <el-input v-model="form.exhibitorAddress" placeholder="请输入公司地址" />
            </el-form-item>
            <el-form-item label="公司英文地址" prop="exhibitorEaddress">
              <el-input v-model="form.exhibitorEaddress" placeholder="请输入公司英文地址" />
            </el-form-item>
            <el-form-item label="公司邮编" prop="exhibitorZipcode">
              <el-input v-model="form.exhibitorZipcode" placeholder="请输入公司邮编" />
            </el-form-item>
            <el-form-item label="公司网址" prop="exhibitorWeburl">
              <el-input v-model="form.exhibitorWeburl" placeholder="请输入公司网址" />
            </el-form-item>
            <el-form-item label="展商LOGO">
              <image-upload v-model="form.exhibitorLogo"/>
            </el-form-item>
            <el-form-item label="国家" prop="exhibitorCountry">
              <el-input v-model="form.exhibitorCountry" placeholder="请输入国家" />
            </el-form-item>
            <el-form-item label="省份" prop="exhibitorProvince">
              <el-input v-model="form.exhibitorProvince" placeholder="请输入省份" />
            </el-form-item>
            <el-form-item label="城市" prop="exhibitorCity">
              <el-input v-model="form.exhibitorCity" placeholder="请输入城市" />
            </el-form-item>
    
    
    
    
            <el-form-item label="注册资本" prop="exhibitorCapital">
              <el-input v-model="form.exhibitorCapital" placeholder="请输入注册资本" />
            </el-form-item>
           <!-- <el-form-item label="所属展团" prop="delegationId">
              <el-input v-model="form.delegationId" placeholder="请输入所属展团" />
            </el-form-item> -->
            <el-form-item label="所属代理" prop="agentId">
              <el-input v-model="form.agentId" placeholder="请输入所属代理" />
            </el-form-item>
           <!-- <el-form-item label="信誉等级" prop="exhibitorLevel">
              <el-input v-model="form.exhibitorLevel" placeholder="请输入信誉等级" />
            </el-form-item> -->
           <!-- <el-form-item label="展商类别" prop="exhibitorCategory">
              <el-input v-model="form.exhibitorCategory" placeholder="请输入展商类别" />
            </el-form-item> -->
            <el-form-item label="电话" prop="exhibitorTel">
              <el-input v-model="form.exhibitorTel" placeholder="请输入电话" />
            </el-form-item>
    
    
    
            <el-form-item label="传真" prop="exhibitorFax">
              <el-input v-model="form.exhibitorFax" placeholder="请输入传真" />
            </el-form-item>
            <el-form-item label="Email" prop="exhibitorEmail">
              <el-input v-model="form.exhibitorEmail" placeholder="请输入Email" />
            </el-form-item>
           <!-- <el-form-item label="所属行业" prop="industryId">
              <el-input v-model="form.industryId" placeholder="请输入所属行业" />
            </el-form-item> -->
    
    
            <el-form-item label="产品类别" prop="productCategory">
              <el-select v-model="form.productCategory" placeholder="请选择产品类别" clearable>
                <el-option
                  v-for="dict in categoryList"
                  :key="dict.id"
                  :label="dict.categoryName"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
    
    
    
            <el-form-item label="参展展品类别" prop="exhibitsCategory">
              <el-input v-model="form.exhibitsCategory" placeholder="请输入参展展品类别" />
            </el-form-item>
            <el-form-item label="展商中文介绍" prop="exhibitorIntro">
              <el-input v-model="form.exhibitorIntro" placeholder="请输入展商中文介绍" />
            </el-form-item>
            <el-form-item label="展商英文介绍" prop="exhibitorEintro">
              <el-input v-model="form.exhibitorEintro" placeholder="请输入展商英文介绍" />
            </el-form-item>
            <el-form-item label="展品中文介绍" prop="exhibitsIntro">
              <el-input v-model="form.exhibitsIntro" placeholder="请输入展品中文介绍" />
            </el-form-item>
            <el-form-item label="展品英文介绍" prop="exhibitsEintro">
              <el-input v-model="form.exhibitsEintro" placeholder="请输入展品英文介绍" />
            </el-form-item>
            <el-form-item label="标签一" prop="tag1">
              <el-input v-model="form.tag1" placeholder="请输入标签一" />
            </el-form-item>
            <el-form-item label="标签二" prop="tag2">
              <el-input v-model="form.tag2" placeholder="请输入标签二" />
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
  </div>
  
</template>


<script>
import { listExhibitor_info, getExhibitor_info,
delExhibitor_info, addExhibitor_info,
updateExhibitor_info,fileimportsea } from "@/api/exhibitor/exhibitor_info";

import { listExhibitor_exh,takeseaexhibitor_exh,listseaexhibitor_exh,exhibitor_exhseaput,
addExhToBp,exhibitor_exhimport, getExhibitor_exh,
 delExhibitor_exh, addExhibitor_exh, updateExhibitor_exh,
 distributeseaexhibitor_exh,
 seaexhibitor_exhexhibitor,historylistexhibitor_exh,classificationexhId_liveimage } from "@/api/exhibitor/exhibitor_exh";




import {listExh_category} from "@/api/exh/exh_category";


import getSalesman from '@/components/getSalesman/getSalesman'

import GetUserList from '@/components/GetUserList/GetUserList'




export default {
  name: "Exhibitor_info",
  dicts: ['zlf_status','exhibitor_status'],

  components: {
    getSalesman,GetUserList,
  },

  data() {
    return {
      fileType:["doc", "xls",'xlsx', "ppt", "txt", "pdf"],
      // 遮罩层
            loading: true,
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
            // 展商展会关联表格数据
            exhibitor_exhList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              exhibitorId: null,
              exhId: null,
              userId: null,
              exhibitorSource: null,
              rollbackType: null,
              rollbackUserId: null,
              saleProgress: null,
              determineRefuse: null,
              status: null,
              exhName:"",
              params:{
                exhName:''
              }
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
              exhibitorId: [
                { required: true, message: "展商ID不能为空", trigger: "blur" }
              ],
              exhId: [
                { required: true, message: "展会ID不能为空", trigger: "blur" }
              ],

              exhibitorName: [
                { required: true, message: "展商名称不能为空", trigger: "blur" }
              ],
              exhibitorProvince: [
                { required: true, message: "省份不能为空", trigger: "blur" }
              ],
              exhibitorCity: [
                { required: true, message: "城市不能为空", trigger: "blur" }
              ],
              productCategory: [
                { required: true, message: "产品类别不能为空", trigger: "blur" }
              ],

            },

            checkList:[],//选择列表

            // 选中的业务员列表
            alertUserShow:false,//
            selUserInfo:{},//选择的业务员详情
            selUserInfos:[],//多选用户
            selExhList:[],//多选展会列表

            isSingle:false,

            fileOpen:false,//文件导入

            filePathIn:"",//文件导入地址存储
            categoryList:[],//分类列表
    };
  },
  created() {
    this.getList();
    this.getShopType();
  },
  methods: {

    downLoadFile(){
      console.log("downLoadFile")
      // https://frdzlfapi.zsyflive.com/profile/zhanshang.xlsx
      this.$download.resource("/profile/zhanshang.xlsx");
    },

    // 获取上架分类
    getShopType(){
      var data={
        'categoryType':4,
      }
      listExh_category(data).then(response => {
           if(response.code==200){
              console.log("商家分类",response);
              this.categoryList=response.rows;
           }else{
             this.$modal.msgSuccess(response.msg);
             this.$modal.closeLoading();
           }
      }).catch(() => {
      });
    },
    // 文件关闭
    cancel_fileopenCLick(){
      this.fileOpen=false;
    },


    // 将展商分给其他业务员
    distributeseaexhibitor_exhClick(){
      var ids=this.ids;
      if(ids.length<=0){
        this.$modal.msgError("请选择展商");
        return false;
      }
      var selUserInfos=this.selUserInfos;
      var selUserInfo=this.selUserInfo;
      // if(!selUserInfo||!selUserInfo.userId){
      //   this.$modal.msgError("请选择业务员");
      //   return false;
      // }
      if(selUserInfos.length<=0&&!this.isSingle){
          this.$modal.msgError("请选择业务员");
          return false;
      }
      if(selUserInfo.length<=0&&this.isSingle){
          this.$modal.msgError("请选择业务员");
          return false;
      }

      var selExhList=this.selExhList;
      if(selExhList.length<=0){
        this.$modal.msgError("请选择展会");
        return false;
      }
      var ids=[];
      if(!this.isSingle){
        for(var a=0;a<selUserInfos.length;a++){
          ids.push(selUserInfos[a].userId);
        }
      }else{
        for(var a=0;a<selUserInfo.length;a++){
          ids.push(selUserInfo[a].userId);
        }
      }


      var data={
        // userId:selUserInfos[0].userId,
        params:{
          'exhibitors':selExhList,
          userIds:ids.join(",")
        }
      }
      this.$modal.loading("分配中，请稍后...");
      takeseaexhibitor_exh(data).then(response => {
           console.log("公海添加陈",response);
           if(response.code==200){
             this.$modal.closeLoading();
             this.$modal.msgSuccess("添加成功");
             this.getList()
           }else{
             this.$modal.msgSuccess(response.msg);
             this.$modal.closeLoading();
           }
      }).catch(() => {

      });;
    },
    // 领取公海中的展商  getExhibitor_exh
    getExhibitor_exhClick(){


      var ids=this.ids;
      if(ids.length<=0){
        this.$modal.msgError("请选择展商");
        return false;
      }
      var list=this.toIdsGetExhs();
      var data={
        params:{
          'exhibitors':list,
        }
      }
      this.$modal.loading("领取中，请稍后...");
      takeseaexhibitor_exh(data).then(response => {
           console.log("公海添加陈",response);
           if(response.code==200){
             this.$modal.msgSuccess("添加成功");
             this.$modal.closeLoading();
             this.getList()
           }else{
             this.$modal.msgSuccess(response.msg);
           }
      });
    },

    // 通过ids获取
    toIdsGetExhs(){
       var ids=this.ids;
       var exhibitor_exhList=this.exhibitor_exhList;
       console.log("匹配的数据",ids,exhibitor_exhList);
       var list=[];
      for(var a=0;a<ids.length;a++){
        for(var b=0;b<exhibitor_exhList.length;b++){
            console.log("对比中",ids[a],exhibitor_exhList[b].id);
          if(ids[a]==exhibitor_exhList[b].id){
            list.push(exhibitor_exhList[b]);
            break;
          }
        }
      }
       return list;
    },
    //删除展商公海展商
    delGonghai(){
      var ids=this.ids;
      if(ids.length<=0){
        this.$modal.msgError("请选择展商");
        return false;
      }
      this.handleDelete({});
    },
    // 关闭用户列表
    closeUserAlertClick(type){
      if(!this.alertUserShow){
        this.isSingle=(type==1);
      }
      this.alertUserShow=!this.alertUserShow;

      console.log("alertUserShow",this.alertUserShow)


    },
    // 用户列表
    getUserList1(res){
      console.log("获取的用户详情",res);
      if(this.isSingle){
         this.selUserInfo=res;
      }else{
         this.selUserInfos=res;
      }
       this.alertUserShow=false;
    },

    // 选择全部
    changeAll(rows){
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },

    /** 查询展商展会关联列表 */
        getList() {
          this.getShopType()
          this.loading = true;
          var queryParams=this.queryParams;
          queryParams.params={
            exhibitorName:queryParams.exhName
          }
          console.log("查询参数",queryParams);
          listseaexhibitor_exh(queryParams).then(response => {
            this.exhibitor_exhList = response.rows;
            this.total = response.total;
            this.loading = false;
          });
        },
        // 取消按钮
        cancel() {
          this.open = false;
          this.reset();
        },
        // 表单重置
        reset() {
          this.form = {
            id: null,
            exhibitorId: null,
            exhId: null,
            userId: null,
            exhibitorSource: null,
            rollbackType: null,
            rollbackUserId: null,
            saleProgress: null,
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
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {getUserList
          this.resetForm("queryForm");
          this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
          console.log("多选框选中",selection)
          this.selExhList=selection;

          this.ids = selection.map(item => item.id)
          this.single = selection.length!==1
          this.multiple = !selection.length
        },
        /** 新增按钮操作 */
        handleAdd() {
          this.reset();
          this.open = true;
          this.title = "添加展商信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
          console.log("修改按钮",row,row.exhibitorId)
          this.reset();
          const id = row.exhibitorId || this.ids
          console.log("修改按钮",row,row.exhibitorId)
          getExhibitor_info(id).then(response => {
            this.form = response.data;
            this.open = true;
            this.title = "修改展商展会关联";
          });
        },
        /** 提交按钮 */
        submitForm() {
          this.$refs["form"].validate(valid => {
            if (valid) {
              if (this.form.id != null) {
                updateExhibitor_info(this.form).then(response => {
                  this.$modal.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                });
              } else {
                var data={
                  params:this.form,
                }
                seaexhibitor_exhexhibitor(data).then(response => {
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
          this.$modal.confirm('是否确认删除展商展会关联编号为"' + ids + '"的数据项？').then(function() {
            return delExhibitor_exh(ids);
          }).then(() => {
            this.getList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        /** 导出按钮操作 */
        handleExport() {
          console.log("导入项目");
          this.fileOpen=true;
        },
        // 导入文件
        submitForm_file(){
          var filepath=this.filePathIn;
          if(filepath==''){
            this.$modal.msgError("请选择展商文件");
            return false;
          }
          var data={
            file:filepath,
          }
          this.$modal.loading("正在导入数据，请稍后...");
          fileimportsea(data).then(response => {
              this.$modal.closeLoading();
              if(response.code==200){
                this.$modal.msgSuccess("导入成功");
                this.fileOpen=false;
                setTimeout(res=>{
                  this.getList();
                },1000)
              }else{
                this.$modal.msgSuccess(res.msg);
              }
          }).catch(() => {
            this.$modal.closeLoading();
          });;
        }
      }
};
</script>

<style>
</style>