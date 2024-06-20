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

<!--  @selection-change="handleSelectionChange" -->
    <el-table v-loading="loading" :data="nametypeList"
    :span-method="objectSpanMethod"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->

      <!-- <el-table-column v-for="(item,index) in keys" :label="item" type="index" width="100">       </el-table-column> -->

        <el-table-column
          v-for="(item,index) in keys" :label="item"
         align="center" :prop="item"
         :fixed="item=='type'||item=='name'"

         >

          <template slot-scope="scope">

            <div style="width: 100%;height: 100%;"
             v-if="item=='type'||item=='name'">{{scope.row[item]}}</div>

            <div style="width: 100%;height: 100%;"
             v-else-if="scope.row[item]==''"
             :style="{
               'background-color':scope.row.name=='合计'?'#f2917e':'#f5f5f5'
             }"
             >无</div>

            <div style="width: 100%;height: 100%;color: white;"
            :style="{
              'background-color':scope.row.name=='合计'?'#f2917e':'blueviolet'
            }"
            v-else>{{scope.row[item]}}</div>
          </template>

         </el-table-column>
     <!-- <el-table-column label="业务员姓名" align="center" prop="linkUserName" />
      <el-table-column label="已联络人数" align="center" prop="personCount" />
      <el-table-column label="通话总时长" align="center" prop="timeAll" />
      <el-table-column label="有效通话时长" align="center" prop="timeYes" />
      <el-table-column label="无效通话时长" align="center" prop="timeNo" />
      <el-table-column label="意向公司数" align="center" prop="companyIntend" />
      <el-table-column label="通话次数" align="center" prop="linkCompany" />
      <el-table-column label="联络公司数 " align="center" prop="linkNum" />
      <el-table-column label="联络人员数" align="center" prop="linkPerson" />
      <el-table-column label="有效联络人员数 " align="center" prop="personYes" />
      <el-table-column label="无效联系人员数 " align="center" prop="personNo" /> -->
    </el-table>




<!--    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" /> -->




  </div>
</template>

<script>


  import {
    listCall_task,callcountcount,
    reasoncountcall,staffcountcall,
    kbcountcall,workdaycountcall
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



        tongjiList: [],//统计集合
        keys:[],//键值
        nametypeList:[],//数据处理之后名称类型几个


        // 提交结果
        importResultList: [], //每次导入数据的结果列表
        totalResult: 0, //总数量
        loadingResult: 0,
        listCall_taskList: [], //任务列表
        allSel: false, //全选当前页面
        idsResult: [], //选中的ids

        tongjiType:1,//1是按照数量统计2按照百分比统计3按照类别哦

        dateShowList:[],//查询的时间日期列表


        fileType: ["doc", "docx", "xls", "ppt", "txt", "pdf", "xlsx"]
      };



    },
    created() {
        this.getRenwu();
        this.getNowTimehou();

        this.timeChange();
    },
    methods: {

    timeChange(){
      var dateWeek=[];
      const date = new Date()
      for(var i=0;i<8;i++){
        let newDate=new Date(date.getTime()-(6-i)*1000*60*60*24)
        let year=newDate.getFullYear()
        let month=(parseInt(newDate.getMonth())+1)>9?(parseInt(newDate.getMonth())+1):"0"+(parseInt(newDate.getMonth())+1)
        let day=(newDate.getDate())>9?newDate.getDate():"0"+newDate.getDate()
        let fullDate=`${year}-${month}-${day}`
        dateWeek.push(fullDate)
      }
      this.queryParams.sTime=dateWeek[1];
      this.queryParams.eTime=dateWeek[dateWeek.length-1];
       this.getList();
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }){

    },
    // 分类修改
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

          var datatimes=this.getAllDate(this.queryParams.sTime,this.queryParams.eTime);
          this.dateShowList=datatimes;
          console.log("時間列表",this.dateShowList)
          this.loading = true;
          var queryParams=this.queryParams;
          queryParams.params={
            sTime:queryParams.sTime,
            eTime:queryParams.eTime,
          }
          workdaycountcall(queryParams).then(response => {
            console.log("统计结果",response)
            var noList=response.data;
            this.tongjiList=noList;
            this.chaiJieData();//拆解数据
            this.loading = false;
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
        if(!this.queryParams.sTime||!this.queryParams.eTime){
          this.getNowTimehou()
        }

        this.queryParams.pageNum = 1;
        this.getList();
      },

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
              // this.queryParams.sTime=dateWeek[0];
              // this.queryParams.eTime=dateWeek[dateWeek.length-1];
            this.queryParams.sTime='2023-04-12';
              this.queryParams.eTime='2023-04-14';


      },

      // 中国标准时间format yyyy-mm-dd
       format (time) {
           let ymd = ''
           let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
           let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
           ymd += time.getFullYear() + '-' // 获取年份。
           ymd += mouth + '-' // 获取月份。
           ymd += day // 获取日。
           return ymd // 返回日期。
      },
      // 获取每一天的日期
      getAllDate (start, end) {


        console.log("开始时间","结束时间",start,end);
         let dateArr = []
         let startArr = start.split('-')
         let endArr = end.split('-')
         let db = new Date()
         db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
         let de = new Date()
         de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
         let unixDb = db.getTime()
         let unixDe = de.getTime()
         let stamp
         const oneDay = 24 * 60 * 60 * 1000;
         for (stamp = unixDb; stamp <= unixDe;) {
           dateArr.push(this.format(new Date(parseInt(stamp))))
           stamp = stamp + oneDay
         }
         return dateArr
      },
      // 拆解数据
      chaiJieData(data){
        var obg={
          'name':'',
          'type':'',
          'date':'数量'
        };
        var dateShowList=this.dateShowList;

        // 找到每个人名字
        var nametypeList=[];//名字集合
        // 获取的统计数据
        var tongjiList=this.tongjiList;
        // 标头
        var keys=['name','type'];
        for(var b=0;b<dateShowList.length;b++){
          keys.push(dateShowList[b]);
        }
        //表格的key值
        this.keys=keys;

        for(var a=0;a<tongjiList.length;a++){
          var obg1={'name':'','type':''}
          obg1.name=tongjiList[a].linkUserName;
          obg1.type=tongjiList[a].linkReason;
          for(var b=0;b<dateShowList.length;b++){
            obg1[''+dateShowList[b]]='';
          }
          if(!this.isChong(nametypeList,obg1)){
            nametypeList.push(obg1);
          }
        }

        console.log("统计的任命",nametypeList);

        for(var a=0;a<tongjiList.length;a++){
          var index=this.tongjiNumTj(
          nametypeList,tongjiList[a].linkUserName,
          tongjiList[a].linkReason);
          if(index>=0){
            var obg=nametypeList[index];
            obg[tongjiList[a].dayDate]=tongjiList[a].reasonCount;
            console.log("tongjiList[index].reasonCount",index,tongjiList[index],tongjiList[index].reasonCount)
            nametypeList[index]=obg;
          }
        }


        if(nametypeList.length>0){
          var namePush=nametypeList[0].name;
        }
        var listShi=[];//某一个人的
        var listNameNow=[];//总的
        console.log("统计之前",nametypeList)
        for(var a=0;a<nametypeList.length;a++){
          if(listShi.length>0&&listShi[listShi.length-1].name!=namePush){
            listNameNow.push(listShi);
            listShi=[];
            namePush=nametypeList[a].name;
            listShi.push(nametypeList[a]);
          }else{
            if(nametypeList[a].name!=namePush){
              listNameNow.push(listShi);
               listShi=[];
              namePush=nametypeList[a].name;
              listShi.push(nametypeList[a]);
            }else{
              listShi.push(nametypeList[a]);
            }
          }
          console.log("listShi",listShi)
        }
        listNameNow.push(listShi);
        console.log("总人数",listNameNow)
        var tongjis=[];
         // 计算合计
        for(var a=0;a<listNameNow.length;a++){
          var obgTotal={'name':'合计','type':''};
          for(var c=0;c<dateShowList.length;c++){
            var total=0;
            for(var b=0;b<listNameNow[a].length;b++){
              if(listNameNow[a][b][dateShowList[c]]!=""){
                console.log("极速验",a,listNameNow[a][b].name)
                total=total+parseInt(listNameNow[a][b][dateShowList[c]]);
              }
            }
             obgTotal[dateShowList[c]]=total;
          }
         tongjis.push(obgTotal);
         console.log("总结",obgTotal)


        }
        var heiList=[];
        for(var a=0;a<listNameNow.length;a++){
          heiList=heiList.concat(listNameNow[a]);
          heiList.push(tongjis[a]);
        }

        this.nametypeList=heiList;
        console.log("人类型数据",nametypeList)
      },
      // 获取在统计的数第几个
      tongjiNumTj(nametypeList,name,type){
        var index=-1;
        for(var a=0;a<nametypeList.length;a++){
          if(nametypeList[a].name==name&&nametypeList[a].type==type){
            index=a;
            break;
          }
        }
        return index;
      },
      // 查重判斷是否有重複
      isChong(list,obg){
        var isHave=false;
        for(var a=0;a<list.length;a++){
          if(list[a].name==obg.name&&list[a].type==obg.type){
            isHave=true;
            break;
          }
        }
        console.log("是否重复",isHave,obg.name,obg.type)
        return isHave;
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
