<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="108px">
      <!-- <el-form-item label="所属展会" prop="exhId">
        <el-select v-model="queryParams.exhId" placeholder="请选择展会" clearable>
          <el-option v-for="dict in exhList" :key="dict.id" :label="dict.exhName" :value="dict.id" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="所属展厅" prop="hallId">
        <el-select v-model="queryParams.hallId" placeholder="请选择展厅" clearable>
          <el-option v-for="dict in listExh_hallList" :key="dict.id" :label="dict.hallName" :value="dict.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="展位号" prop="boothNo"><el-input v-model="queryParams.boothNo" placeholder="请输入展位号" clearable
          @keyup.enter.native="handleQuery" /></el-form-item>
      <el-form-item label="价格类别" prop="priceId">
        <el-input v-model="queryParams.priceId" placeholder="请输入价格类别" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="展位类别" prop="boothType">
        <el-select v-model="queryParams.boothType" placeholder="请选择展位类别" clearable>
          <el-option v-for="dict in dict.type.booth_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="展位场所" prop="boothLocation">
        <el-select v-model="queryParams.boothLocation" placeholder="请选择展位场所" clearable>
          <el-option v-for="dict in dict.type.booth_location_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="展位长度" prop="boothLength">
        <el-input v-model="queryParams.boothLength" placeholder="请输入展位长度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="展位宽度" prop="boothWidth">
        <el-input v-model="queryParams.boothWidth" placeholder="请输入展位宽度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="展位面积" prop="boothArea">
        <el-input v-model="queryParams.boothArea" placeholder="请输入展位面积" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="人民币价格" prop="rmbPrice">
        <el-input v-model="queryParams.rmbPrice" placeholder="请输入人民币价格" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="展位描述" prop="boothDescribe">
        <el-input v-model="queryParams.boothDescribe" placeholder="请输入展位描述" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="所属展商ID" prop="exhibitorId">
        <el-input v-model="queryParams.exhibitorId" placeholder="请输入所属展商ID" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5"><el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['recruit:recruit_booth:add']">新增</el-button></el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['recruit:recruit_booth:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['recruit:recruit_booth:remove']">删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['recruit:recruit_booth:export']">导出</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-download" size="mini" @click.stop="batchClick"
          v-hasPermi="['recruit:recruit_booth:add_batch']">批量增加展位</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="danger" plain  size="mini" @click="showTypeClick">切换布局</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button type="danger" plain  size="mini"  v-hasPermi="['recruit:recruit_booth:export']" @click="exportDzw">导出已定展位</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>



    <!-- 表格 -->
    <el-table v-loading="loading" :data="recruit_boothList" @selection-change="handleSelectionChange" v-if="showType">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- hallId -->
      <el-table-column label="所属展厅" align="center" prop="params.hallName" />

      <el-table-column label="展位号" align="center" prop="boothNo" />
      <el-table-column label="展位面积" align="center" prop="boothArea" />
      <el-table-column label="展位类别" align="center" prop="boothType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType" />
        </template>
      </el-table-column>
      <el-table-column label="人民币价格" align="center" prop="rmbPrice" />
      <!-- exhibitorId -->
      <el-table-column label="所属展商" align="center" prop="params.exhibitorName" />

      <el-table-column label="展位场所" align="center" prop="boothLocation">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.booth_location_type" :value="scope.row.boothLocation" />
        </template>
      </el-table-column>
      <!-- 所属业务员 -->

      <!-- <el-table-column label="所属展会ID" align="center" prop="exhId" />
      <el-table-column label="价格类别" align="center" prop="priceId" />

      <el-table-column label="展位长度" align="center" prop="boothLength" />
      <el-table-column label="展位宽度" align="center" prop="boothWidth" />


      <el-table-column label="展位描述" align="center" prop="boothDescribe" />

      <el-table-column label="所属展会项目ID" align="center" prop="exhType" /> -->
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" />

      <el-table-column label="是否预定" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.exhibitorId" style="color: red;">已被预定</span>
          <span v-else>未被预定</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['recruit:recruit_booth:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" v-if="!scope.row.exhibitorId"
            @click="handleDelete(scope.row)" v-hasPermi="['recruit:recruit_booth:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 循环展位编号 -->
    <div class="huanhang" v-if="!showType">
      <div style="width: 10%;margin-top: 20px;" class="roww" v-for="(item,index) in recruit_boothList"
        @change="xunhuanChange(index,$event)">
        <el-checkbox v-model="item.checked" :disabled="item.exhibitorId!=null"></el-checkbox>
        <div style="width: 10px;"></div>
        <div v-if="item.exhibitorId" style="color: red;">{{item.boothNo}}</div>
        <div v-else @click="handleUpdate(item)">{{item.boothNo}}</div>
      </div>
    </div>


    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      :page-sizes="showType?pageSizes:pageSizes1" @pagination="getList" />


    <!-- 添加或修改招展展位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="批量增加" v-if="is_batch">
          <el-row>
            <el-col :span="6">
              <div class="grid-content roww bg-purple">
                <div class="laberss">前缀</div>
                <el-input v-model="bathInfo.prefix" placeholder="前缀" />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content roww bg-purple-light">
                <div class="laberss" style="width: 100px;">循环到</div>
                <el-input v-model="bathInfo.start" type="number" maxlength="3" placeholder="开始位置(数字)" />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content roww bg-purple-light">
                <div class="laberss">到</div>
                <el-input v-model="bathInfo.end" type="number" placeholder="终点位置(数字)" />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content roww bg-purple-light">
                <div class="laberss">后缀</div>
                <el-input v-model="bathInfo.suffix" placeholder="后缀" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <!--  <el-form-item label="所属展会" prop="exhId">
          <el-select v-model="form.exhId" placeholder="请选择展会" clearable><el-option v-for="dict in exhList" :key="dict.id" :label="dict.exhName" :value="dict.id" /></el-select>
        </el-form-item> -->



        <el-form-item label="生成规则(几位数)" prop="digit">
          <el-input v-model="form.digit"
            placeholder="生成规则" type="number" />
        </el-form-item>



        <el-form-item label="所属展厅" prop="hallId" v-if="is_batch">
          <el-select v-model="form.hallId" placeholder="请选择展厅" clearable>
            <el-option v-for="dict in listExh_hallList" :key="dict.id" :label="dict.hallName" :value="dict.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="!is_batch" label="展位号" prop="boothNo"><el-input v-model="form.boothNo"
            placeholder="请输入展位号" /></el-form-item>
        <el-form-item label="价格类别" prop="priceId">
          <el-select v-model="form.priceId" placeholder="请选择展位类别" @change="moneyTypeChange">
            <el-option v-for="dict in listRecruit_booth_priceList" :key="dict.id" :label="dict.boothName"
              :value="dict.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类别" prop="boothType">
          <el-select v-model="form.boothType" placeholder="请选择展位类别">
            <el-option v-for="dict in dict.type.booth_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位场所" prop="boothLocation">
          <el-select v-model="form.boothLocation" placeholder="请选择展位场所">
            <el-option v-for="dict in dict.type.booth_location_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位长度" prop="boothLength"><el-input v-model="form.boothLength" placeholder="请输入展位长度"
            @change="boothLengthChange" /></el-form-item>
        <el-form-item label="展位宽度" prop="boothWidth"><el-input v-model="form.boothWidth" placeholder="请输入展位宽度"
            @change="boothWidthChange" /></el-form-item>

        <el-form-item label="展位面积" prop="boothArea"><el-input v-model="form.boothArea"
            placeholder="请输入展位面积" /></el-form-item>
        <el-form-item label="人民币价格" prop="rmbPrice"><el-input v-model="form.rmbPrice"
            placeholder="请输入人民币价格" /></el-form-item>
        <el-form-item label="展位描述" prop="boothDescribe"><el-input v-model="form.boothDescribe"
            placeholder="请输入展位描述" /></el-form-item>
        <!-- <el-form-item label="所属展商ID" prop="exhibitorId"><el-input v-model="form.exhibitorId" placeholder="请输入所属展商ID" /></el-form-item> -->
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value"
              :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <GetExhLists  @getSelExhInfo="getSelExhInfo"></GetExhLists> -->
  </div>
</template>

<style>
  .laberss {
    width: 50px;
    text-align: right;
    padding-right: 10px;
  }
</style>

<script>
  import {
    listRecruit_booth,
    recruitrecruit_boothbatchimport,
    getRecruit_booth,
    delRecruit_booth,
    addRecruit_booth,
    updateRecruit_booth,
    addRecruit_boothbatchadd
  } from '@/api/recruit/recruit_booth';
  // 获取所有展会列表
  import {
    listExh_list
  } from '@/api/exh/exh_list';
  // 展厅
  import {
    exhlistexh_hall
  } from '@/api/exh/exh_hall';

  import {
    listRecruit_booth_price
  } from "@/api/recruit/recruit_booth_price";

  import GetExhLists from '@/components/GetExhLists/GetExhLists'

  export default {
    name: 'Recruit_booth',
    dicts: ['booth_type', 'booth_location_type', 'zlf_status'],

    components: {
      GetExhLists
    },

    data() {
      return {
        checked: false,

        showType: true, //true是表格，false是只是展示名字
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
        // 招展展位表格数据
        recruit_boothList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          exhId: null,
          hallId: null,
          boothNo: null,
          priceId: null,
          boothType: null,
          boothLocation: null,
          boothLength: null,
          boothWidth: null,
          boothArea: null,
          rmbPrice: null,
          boothDescribe: null,
          exhibitorId: null,
          exhType: null,
          status: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          exhId: [{
            required: true,
            message: '所属展会ID不能为空',
            trigger: 'blur'
          }],
          hallId: [{
            required: true,
            message: '所属展厅ID不能为空',
            trigger: 'blur'
          }],
          boothNo: [{
            required: true,
            message: '展位号不能为空',
            trigger: 'blur'
          }],
          priceId: [{
            required: true,
            message: '价格类别不能为空',
            trigger: 'blur'
          }],
          boothType: [{
            required: true,
            message: '展位类别不能为空',
            trigger: 'change'
          }],
          boothLength: [{
            required: true,
            message: '展位长度不能为空',
            trigger: 'blur'
          }],
          boothWidth: [{
            required: true,
            message: '展位宽度不能为空',
            trigger: 'blur'
          }],
          boothArea: [{
            required: true,
            message: '展位面积不能为空',
            trigger: 'blur'
          }],
          rmbPrice: [{
            required: true,
            message: '人民币价格不能为空',
            trigger: 'blur'
          }]
        },

        // 展会列表
        exhList: [],
        listExh_hallList: [], //展厅列表
        is_batch: false, //是否是批量增加
        bathInfo: {
          start: "", //开始
          end: "", //结束
          prefix: "", //前缀
          suffix: "" //后缀
        }, //批量添加的字段
        listRecruit_booth_priceList: [], //价格列表
        nowSelPriceType: {}, //选中的价格类别

        pageSizes: [10, 20, 30, 50],
        pageSizes1: [10, 20, 30, 200],

        selExhInfo:{},
      };
    },
    created() {
      this.getAllList();
      this.getList();
      this.getPriceType();
    },
    methods: {
      // 导出
      exportDzw(){
            var selExhInfo = this.$ls.get("selExhInfo");

            var data={}
            this.download('/recruit/recruit_booth/export/lock', {
              data
            }, `${selExhInfo.exhName}已锁定展位${new Date().getTime()}.xlsx`)


      },

      //多选change
      xunhuanChange(index, res) {
        console.log("多选Change", index, res);
        console.log('recruit_boothList', this.recruit_boothList[index].checked)
        var recruit_boothList = this.recruit_boothList;
        var list = []
        for (var a = 0; a < recruit_boothList.length; a++) {
          if (recruit_boothList[a].checked) {
            list.push(recruit_boothList[a]);
          }
        }
        this.handleSelectionChange(list);
      },

      // 长度=变动
      boothLengthChange(res) {
        console.log("长度变动", res)

        this.moneyCHange();
      },
      // 宽度变动
      boothWidthChange(res) {
        console.log("宽度变动", res)
        this.moneyCHange();
      },
      moneyCHange() {


        var form = this.form;
        var nowSelPriceType = this.nowSelPriceType;
        var unitPrice = nowSelPriceType.rmbUnitPrice / nowSelPriceType.standardArea; //单价standard_area
        //  boothLength boothWidth
        var totalMoney = unitPrice * (form.boothLength * form.boothWidth);
        form.rmbPrice = totalMoney;
        form.boothArea = form.boothLength * form.boothWidth;
        this.form = form;
      },
      // 金额变动
      moneyTypeChange(res) {
        var lbp = this.listRecruit_booth_priceList;
        var info = {};
        for (var a = 0; a < lbp.length; a++) {
          if (lbp[a].id == res) {
            info = lbp[a];
            break;
          }
        }
        this.nowSelPriceType = info;
        var form = this.form;
        // form.boothWidth=0;
        // form.boothLengthChange=0;

        form.rmbPrice = info.rmbUnitPrice;
        form.boothArea = info.standardArea;
        this.form = form;
        // this.moneyCHange();
      },
      // 获取价格分类
      getPriceType() {
        var data = {
          pageNum: 1,
          pageSize: 1000,
        }
        listRecruit_booth_price(data).then(response => {
          console.log("价格分类", response);
          this.listRecruit_booth_priceList = response.rows;
        });
      },

      // 分类显示
      showTypeClick() {
        this.showType = !this.showType;
        if (!this.showType) {
          this.queryParams.pageSize = 200;
          this.handleQuery();
        }
      },

      // 获取选中的展会列表 /recruit/recruit_booth/batch/add
      getSelExhInfo(info) {
        console.log("选中的展会信息", info);
        if (info && info.id) {
          this.$modal.confirm('确定要导入吗').then(() => {

            var data = {
              'params': {
                'otherExh': info.id
              }
            }
            recruitrecruit_boothbatchimport(data).then(response => {
              this.$modal.alertSuccess("导入成功");
            });


          }).then(() => {
            console.log("2222")
          }).catch(() => {
            console.log("33333")
          });
        }


      },

      // 批量增加按钮
      batchClick() {
        this.is_batch = true;
        this.reset();
        this.open = true;
        this.title = '批量添加招展展位';
      },
      // 获取相关数据列表
      getAllList() {
        var data = {
          pageNum: 1,
          pageSize: 1000
        };
        listExh_list(data).then(response => {
          this.exhList = response.rows;
        });
        var selExhInfo = this.$cache.local.getJSON('selExhInfo').value;
        if (selExhInfo) {
          // data.galleryId=selExhInfo.galleryId;
          data.params = {
            'hallIds': selExhInfo.hallId
          }
        }
        exhlistexh_hall(data).then(response => {
          this.listExh_hallList = response.rows;
        });
      },

      /** 查询招展展位列表 */
      getList() {
        this.loading = true;
        listRecruit_booth(this.queryParams).then(response => {
          var list = response.rows;
          for (var a = 0; a < list.length; a++) {
            list[a].checked = false;
          }
          this.recruit_boothList = list;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
        this.is_batch = false;
        this.nowSelPriceType = {};


      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          exhId: null,
          hallId: null,
          boothNo: null,
          priceId: null,
          boothType: null,
          boothLocation: null,
          boothLength: null,
          boothWidth: null,
          boothArea: null,
          rmbPrice: null,
          boothDescribe: null,
          exhibitorId: null,
          exhType: null,
          status: '0',
          delFlag: null,
          version: null,
          createBy: null,
          createTime: null,
          digit:3,
          updateBy: null,
          updateTime: null
        };
        this.bathInfo = {
          start: "", //开始
          end: "", //结束
          prefix: "", //前缀
          suffix: "" //后缀
        }; //批量添加的字段
        this.resetForm('form');
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm');
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single = selection.length !== 1;
        this.multiple = !selection.length;
        console.log("选中改变", this.ids, this.single, this.multiple);
      },
      /** 新增按钮操作 */
      handleAdd() {

        this.is_batch = false;
        this.reset();
        this.open = true;
        this.title = '添加招展展位';
      },
      /** 修改按钮操作 */
      handleUpdate(row) {

        this.is_batch = false;
        this.reset();
        const id = row.id || this.ids;
        getRecruit_booth(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = '修改招展展位';
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateRecruit_booth(this.form).then(response => {
                this.$modal.msgSuccess('修改成功');
                this.open = false;
                this.getList();
                this.nowSelPriceType = {};
              });

            } else {

              var form = this.form;
              var is_batch = this.is_batch;
              var bathInfo = this.bathInfo;
              bathInfo.digit=form.digit;
              if (is_batch) {
                if (bathInfo.start == '' || bathInfo.end == '') {
                  this.$modal.msgError("请补充完批量操作的数据");
                  this.$modal.closeLoading();
                  return false;
                }
              }


              form.params = bathInfo;
              this.$modal.loading("正在传输数据");
              if (is_batch) {
                addRecruit_boothbatchadd(this.form).then(response => {
                  this.$modal.msgSuccess('新增成功');
                  this.open = false;
                  this.$modal.closeLoading();
                  this.getList();

                  this.nowSelPriceType = {};

                }).catch((res) => {
                  console.log("报错", res);
                  this.$modal.closeLoading();
                });
              } else {
                addRecruit_booth(this.form).then(response => {
                  this.$modal.msgSuccess('新增成功');
                  this.open = false;
                  this.$modal.closeLoading();
                  this.getList();

                  this.nowSelPriceType = {};

                }).catch((res) => {
                  console.log("报错", res);
                  this.$modal.closeLoading();
                });
              }

            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal
          .confirm('是否确认删除招展展位编号为"' + ids + '"的数据项？')
          .then(function() {
            return delRecruit_booth(ids);
          })
          .then(() => {
            this.getList();
            this.$modal.msgSuccess('删除成功');
          })
          .catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download(
          'recruit/recruit_booth/export', {
            ...this.queryParams
          },
          `recruit_booth_${new Date().getTime()}.xlsx`
        );
      }
    }
  };
</script>
