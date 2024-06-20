<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
     <!-- <el-form-item label="申请人ID" prop="applicantUserId">
        <el-input v-model="queryParams.applicantUserId" placeholder="请输入申请人ID" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="审核人ID" prop="examineUserId">
        <el-input v-model="queryParams.examineUserId" placeholder="请输入审核人ID" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="审核意见" prop="examineOpinion">
        <el-input v-model="queryParams.examineOpinion" placeholder="请输入审核意见" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="审核状态" prop="examineStatus">
        <el-select v-model="queryParams.examineStatus" placeholder="请选择审核状态" clearable>
          <el-option v-for="dict in dict.type.examine_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核类型" prop="examineType">
        <el-select v-model="queryParams.examineType" placeholder="请选择审核类型" clearable>
          <el-option v-for="dict in dict.type.market_examine_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
     <!-- <el-form-item label="观众ID" prop="visitorId">
        <el-input v-model="queryParams.visitorId" placeholder="请输入观众ID" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->

      <el-form-item v-hasRole="['manager']" label="" label-width="30px" prop="checkedShowAllData">
        <el-checkbox v-model="queryParams.checkedShowAllData" style="color:red;">是否显示所有可见数据</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>


    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['user:user_market_data_examine:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['user:user_market_data_examine:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['user:user_market_data_examine:remove']">删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['user:user_market_data_examine:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="user_market_data_examineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="申请人姓名" align="center" prop="applicantUserName" />
      <el-table-column label="审核人姓名" align="center" prop="examineUserName" />
      <el-table-column label="审核时间" align="center" prop="examineTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.examineTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核意见" align="center" prop="examineOpinion" />
      <el-table-column label="审核状态" align="center" prop="examineStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus" />
        </template>
      </el-table-column>
      <el-table-column label="审核类型" align="center" prop="examineType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.market_examine_type" :value="scope.row.examineType" />
        </template>
      </el-table-column>
      <el-table-column label="观众ID" align="center" prop="visitorId" />
      <!-- <el-table-column label="原内容" align="center" prop="contentOld" />
      <el-table-column label="新内容" align="center" prop="contentNew" /> -->
      <el-table-column label="申请时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text"
           v-if="scope.row.examineStatus<1"
           icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['user:user_market_data_examine:edit']">点击审核</el-button>
         <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['user:user_market_data_examine:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改市场数据审核对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请人" prop="applicantUserId">
          <el-input disabled v-model="form.applicantUserName" />
        </el-form-item>
        <!-- <el-form-item label="审核人ID" prop="examineUserId">
          <el-input disabled v-model="form.examineUserId" placeholder="请输入审核人ID" />
        </el-form-item> -->

        <el-form-item v-if="form.contentOld_json" label="观众名称" prop="visitorId">
          <el-input v-model="form.contentOld_json.visitorName" placeholder="请输入观众ID" />
        </el-form-item>


        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="原内容" prop="contentOld">
                <div class="colonn" v-if="form.contentOld_json">
                  <div class="roww">
                    <div class="la1">职务</div>
                    <el-input style="width: 220px;" disabled v-model="form.contentOld_json.visitorPost"
                      placeholder="请输入职务" />
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">所属行业</div>
                    <el-select disabled v-model="form.contentOld_json.industryType" placeholder="请选择所属行业">
                      <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select>
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">经营品类</div>
                    
                    <el-input
                      type="textarea"
                     style="width: 220px;" disabled v-model="form.contentOld_json.businessCategory"
                      placeholder="请输入经营品类" />
                    
                    
                 <!--   <el-select disabled v-if="form.contentOld_json" v-model="form.contentOld_json.businessCategory"
                      placeholder="请选择经营品类">
                      <el-option v-for="dict in dict.type.business_category" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select> -->
                  </div>
                  <div style="height: 20px;"></div>

                  <div class="roww">
                    <div class="la1">来源类别</div>
                    <el-select disabled v-if="form.contentOld_json" v-model="form.contentOld_json.sourceType"
                      placeholder="请选择来源类别">
                      <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select>
                  </div>
                  <div style="height: 20px;"></div>

                  <div class="roww">
                    <div class="la1" style="flex-shrink: 0;">信息来源名称</div>
                    <el-input disabled v-model="form.contentOld_json.sourceName" placeholder="请输入信息来源名称" />
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">企业规模</div>
                    <div style="width: 20px;"></div>
                    <el-input disabled v-model="form.contentOld_json.companyScale" placeholder="请输入企业规模">
                      <template slot="append">星</template>
                    </el-input>
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="修改内容" prop="contentNew">
                <div class="colonn" v-if="form.contentNew_json">

                  <div class="roww">
                    <div class="la1">职务</div>
                    <div style="width: 20px;"></div>
                    <el-input style="width: 220px;" disabled v-model="form.contentNew_json.visitorPost"
                      placeholder="请输入职务" />
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">所属行业</div>
                     <div style="width: 20px;"></div>
                    <el-select disabled v-if="form.contentNew_json" v-model="form.contentNew_json.industryType"
                      placeholder="请选择所属行业">
                      <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select>
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">经营品类</div>
                     <div style="width: 20px;"></div>

                     <el-input
                       type="textarea"
                      style="width: 220px;" disabled v-model="form.contentNew_json.businessCategory"
                       placeholder="请输入经营品类" />

                    <!-- <el-select disabled v-if="form.contentNew_json" v-model="form.contentNew_json.businessCategory"
                      placeholder="请选择经营品类">
                      <el-option v-for="dict in dict.type.business_category" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select> -->
                  </div>
                  <div style="height: 20px;"></div>

                  <div class="roww">
                    <div class="la1">来源类别</div>
                     <div style="width: 20px;"></div>
                    <el-select disabled v-if="form.contentNew_json" v-model="form.contentNew_json.sourceType"
                      placeholder="请选择来源类别">
                      <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                    </el-select>
                  </div>
                  <div style="height: 20px;"></div>

                  <div class="roww">
                    <div class="la1">信息来源名称</div>
                    <div style="width: 20px;"></div>
                    <el-input style="width: 420px;" disabled v-model="form.contentNew_json.sourceName"
                      placeholder="请输入信息来源名称" />
                  </div>
                  <div style="height: 20px;"></div>
                  <div class="roww">
                    <div class="la1">企业规模</div>
                    <div style="width: 20px;"></div>
                    <el-input style="width: 220px;" disabled v-model="form.contentNew_json.companyScale"
                      placeholder="请输入企业规模">
                      <template slot="append">星</template>
                    </el-input>
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>







        <el-form-item label="审核时间" prop="examineTime">
          <el-date-picker clearable v-model="form.examineTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核意见" prop="examineOpinion">
          <el-input v-model="form.examineOpinion" placeholder="请输入审核意见" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="form.examineStatus">
            <el-radio v-for="dict in dict.type.examine_status" :key="dict.value"
              :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="审核类型">
          <el-radio-group v-model="form.examineType">
            <el-radio v-for="dict in dict.type.market_examine_type" :key="dict.value"
              :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->


        <!-- <el-form-item label="新内容" prop="contentNew">
          <el-input v-model="form.contentNew" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
  .la1 {
    width: 100px;
  }
</style>
<script>
  import {
    listUser_market_data_examine,
    getUser_market_data_examine,
    delUser_market_data_examine,
    addUser_market_data_examine,
    updateUser_market_data_examine,
    user_market_data_examinelist
  } from "@/api/user/user_market_data_examine";

  export default {
    name: "User_market_data_examine",
    dicts: ['examine_status', 'market_examine_type',

      'industry_type',
      "business_category",
      "visitor_source_type",

    ],
    data() {
      return {

        checkedShowAllData: false, //是否查询所有（经理级别)


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
        // 市场数据审核表格数据
        user_market_data_examineList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          applicantUserId: null,
          examineUserId: null,
          examineOpinion: null,
          examineStatus: null,
          examineType: null,
          visitorId: null,
          contentOld: null,
          contentNew: null,
          searchValue: "",
          checkedShowAllData: false,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          applicantUserId: [{
            required: true,
            message: "申请人ID不能为空",
            trigger: "blur"
          }],
          examineUserId: [{
            required: true,
            message: "审核人ID不能为空",
            trigger: "blur"
          }],
          examineType: [{
            required: true,
            message: "审核类型不能为空",
            trigger: "blur"
          }],
          visitorId: [{
            required: true,
            message: "观众ID不能为空",
            trigger: "blur"
          }],
          contentOld: [{
            required: true,
            message: "原内容不能为空",
            trigger: "blur"
          }],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {

      getNowFormatDate() {
        let date = new Date(),
          year = date.getFullYear(), //获取完整的年份(4位)
          month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
          strDate = date.getDate() // 获取当前日(1-31)
        if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
        if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

        return `${year}-${month}-${strDate}`
      },

      /** 查询市场数据审核列表 */
      getList() {
        this.loading = true;
        if (this.queryParams.checkedShowAllData) {
          this.queryParams.searchValue = 2;
        } else {
          this.queryParams.searchValue = 1;
        }


        user_market_data_examinelist(this.queryParams).then(response => {
          this.user_market_data_examineList = response.rows;
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
          applicantUserId: null,
          examineUserId: null,
          examineTime: null,
          examineOpinion: null,
          examineStatus: "0",
          examineType: "0",
          visitorId: null,
          contentOld: null,
          contentNew: null,
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
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加市场数据审核";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getUser_market_data_examine(id).then(response => {
          var json = response.data;
          json.contentOld_json = JSON.parse(json.contentOld)
          json.contentNew_json = JSON.parse(json.contentNew)
          json.examineTime = this.getNowFormatDate();
          this.form = json;

          this.open = true;
          this.title = "修改市场数据审核";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateUser_market_data_examine(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addUser_market_data_examine(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除市场数据审核编号为"' + ids + '"的数据项？').then(function() {
          return delUser_market_data_examine(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('user/user_market_data_examine/export', {
          ...this.queryParams
        }, `user_market_data_examine_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
