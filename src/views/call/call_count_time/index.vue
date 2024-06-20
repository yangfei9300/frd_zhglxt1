<template>
  <div class="app-container">
    <right-toolbar @queryTable="getList"></right-toolbar>

    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务名称" prop="targetName">
        <el-select v-model="queryParams.taskId" placeholder="请选择任务" clearable>
          <el-option v-for="dict in listCall_taskList" :key="dict.id" :label="dict.taskName" :value="dict.id" />
        </el-select>

      </el-form-item>

      <el-form-item label="从" prop="targetName">
        <el-date-picker v-model="queryParams.sTime"
         format="yyyy 年 MM 月 dd 日"
               value-format="yyyy-MM-dd"
         type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="至" prop="targetName">
        <el-date-picker v-model="queryParams.eTime"
         format="yyyy 年 MM 月 dd 日"
               value-format="yyyy-MM-dd"
         type="date" placeholder="选择日期">          </el-date-picker>





      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="tongjiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="排序" type="index" width="50">       </el-table-column>
      <el-table-column label="业务员姓名" align="center" prop="linkUserName" />
      <el-table-column label="已联络人数" align="center" prop="personCount" />
      <el-table-column label="通话总时长(s)" align="center" prop="timeAll" />
      <el-table-column label="有效通话时长(s)" align="center" prop="timeYes" />
      <el-table-column label="无效通话时长(s)" align="center" prop="timeNo" />
      <el-table-column label="意向公司数" align="center" prop="companyIntend" />
      <el-table-column label="通话次数" align="center" prop="linkNum" />
      <el-table-column label="联络公司数 " align="center" prop="linkCompany" />
      <el-table-column label="联络人员数" align="center" prop="linkPerson" />
      <el-table-column label="有效联络人员数 " align="center" prop="personYes" />
      <el-table-column label="无效联系人员数 " align="center" prop="personNo" />
    </el-table>




<!--    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" /> -->



  </div>
</template>

<script>


  import {
    listCall_task,callcountcount,
    reasoncountcall,staffcountcall,
    kbcountcall,
  } from "@/api/call/call_task";

  export default {
    name: "Call_target",
    dicts: ['call_type', 'call_source', 'zlf_status'],
    data() {
      return {
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
        // 联络目标表格数据
        call_targetList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          sTime: null,
          eTime: null,
          // importGroup: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          targetName: [{
            required: true,
            message: "目标名称不能为空",
            trigger: "blur"
          }],
          exhId: [{
            required: true,
            message: "展会ID不能为空",
            trigger: "blur"
          }],
        },


        // 导入结果对话框
        openImportAlert: false,



        tongjiList: [],

        // 提交结果
        importResultList: [], //每次导入数据的结果列表
        totalResult: 0, //总数量
        loadingResult: 0,
        listCall_taskList: [], //任务列表
        allSel: false, //全选当前页面
        idsResult: [], //选中的ids

        tongjiType:1,//1是按照数量统计2按照百分比统计3按照类别哦


        fileType: ["doc", "docx", "xls", "ppt", "txt", "pdf", "xlsx"]
      };



    },
    created() {
      this.getNowTimehou()
        this.getRenwu();
      this.getList();
    },
    methods: {
    
    // 获取当前一周的时间
    getNowTimehou(){
            var dateWeek=[];
            const date = new Date()
            for(var i=0;i<7;i++){
              let newDate=new Date(date.getTime()-(6-i)*1000*60*60*24)
              let year=newDate.getFullYear()
              let month=(parseInt(newDate.getMonth())+1)>9?(parseInt(newDate.getMonth())+1):"0"+(parseInt(newDate.getMonth())+1)
              let day=(newDate.getDate())>9?newDate.getDate():"0"+newDate.getDate()
              let fullDate=`${year}-${month}-${day}`
              dateWeek.push(fullDate)
            }
            this.dateShowList=dateWeek;
            this.queryParams.sTime=dateWeek[0];
            this.queryParams.eTime=dateWeek[dateWeek.length-1];
          // this.queryParams.sTime='2023-04-12';
            // this.queryParams.eTime='2023-04-14';
    
    
    },
    
    typeChange(res){
      console.log("查询类型修改",res)
      this.tongjiType=res;
      this.getList()
    },

     // 获取任务列表
      getRenwu() {
        var data = {
          pageNum: 1,
          pageSize: 1000,
        }
        listCall_task(data).then(response => {
          this.listCall_taskList = response.rows;
        });
      },


      /** 查询联络目标列表 */
      getList() {
        this.loading = true;
        var queryParams=this.queryParams;
        queryParams.params={
          sTime:queryParams.sTime,
          eTime:queryParams.eTime,
        }
          kbcountcall(queryParams).then(response => {
            console.log("统计结果",response)
              this.loading = false;
              this.tongjiList=response.data;
          });


      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.openImportAlert = false;
        this.importResultLis = [];
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          "file": "",
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      handleSelectionResultChange(selection) {
        this.idsResult = selection.map(item => item.id)
        console.log("handleSelectionResultChange", this.ids)
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        console.log("aa--多选框选中数据", selection)
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加联络目标";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getCall_target(id).then(response => {
          this.form = response.data;
          this.form.callType = this.form.callType.split(",");
          this.open = true;
          this.title = "修改联络目标";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          console.log("提交Anastasia", this.form)
          if (valid) {
            if (this.form.id != null) {
              updateCall_target(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              filecall_import(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },

      /** 导出按钮操作 */
      handleExport() {
        // this.download('call/call_target/export', {
        //   ...this.queryParams
        // }, `call_target_${new Date().getTime()}.xlsx`)
        this.open = true;
      }
    }
  };
</script>
