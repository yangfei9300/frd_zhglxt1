<template>
  <div>
    <!--  class="navbar" -->
    <!-- <el-dialog title="合同" :visible.sync="openSelExhAlert" width="80%" append-to-body :before-close="submitForm"> -->
      <!-- <div> -->
      <div style="height: 15px;"></div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
          label-width="68px">
          <!-- <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="queryParams.contractName" placeholder="请输入合同名称" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item> -->
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="queryParams.customerName" placeholder="请输入客户名称" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item>


          <!-- <el-form-item label="展商ID" prop="exhibitorId">
            <el-input
              v-model="queryParams.exhibitorId"
              placeholder="请输入展商ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="展会ID" prop="exhId">
            <el-input
              v-model="queryParams.exhId"
              placeholder="请输入展会ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="业务员ID" prop="userId">
            <el-input
              v-model="queryParams.userId"
              placeholder="请输入业务员ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="展商联系人ID" prop="contactId">
            <el-input
              v-model="queryParams.contactId"
              placeholder="请输入展商联系人ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="客户名称" prop="customerName">
            <el-input
              v-model="queryParams.customerName"
              placeholder="请输入客户名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="地址" prop="customerAddress">
            <el-input
              v-model="queryParams.customerAddress"
              placeholder="请输入地址"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="联系人" prop="customerPerson">
            <el-input
              v-model="queryParams.customerPerson"
              placeholder="请输入联系人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="电话" prop="customerTel">
            <el-input
              v-model="queryParams.customerTel"
              placeholder="请输入电话"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="传真" prop="customerFax">
            <el-input
              v-model="queryParams.customerFax"
              placeholder="请输入传真"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="合同时间" prop="contractTime">
            <el-date-picker clearable
              v-model="queryParams.contractTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择合同时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目总金额" prop="contentTotal">
            <el-input
              v-model="queryParams.contentTotal"
              placeholder="请输入项目总金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="注册费" prop="registerCost">
            <el-input
              v-model="queryParams.registerCost"
              placeholder="请输入注册费"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="合同总金额" prop="totalRmb">
            <el-input
              v-model="queryParams.totalRmb"
              placeholder="请输入合同总金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="折扣(%)" prop="discount">
            <el-input
              v-model="queryParams.discount"
              placeholder="请输入折扣(%)"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="抹零抵扣" prop="moling">
            <el-input
              v-model="queryParams.moling"
              placeholder="请输入抹零抵扣"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="优惠后总价" prop="afterDiscount">
            <el-input
              v-model="queryParams.afterDiscount"
              placeholder="请输入优惠后总价"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="已收金额" prop="receivedAmount">
            <el-input
              v-model="queryParams.receivedAmount"
              placeholder="请输入已收金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="合同附注" prop="memo">
            <el-input
              v-model="queryParams.memo"
              placeholder="请输入合同附注"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="是否双届合同" prop="isTwo">
            <el-select v-model="queryParams.isTwo" placeholder="请选择是否双届合同" clearable>
              <el-option
                v-for="dict in dict.type.biz_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="合同模版ID" prop="templateId">
            <el-input
              v-model="queryParams.templateId"
              placeholder="请输入合同模版ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="审核状态" prop="examineStatus">
            <el-select v-model="queryParams.examineStatus" placeholder="请选择审核状态" clearable>
              <el-option
                v-for="dict in dict.type.examine_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审核人" prop="examineUser">
            <el-input
              v-model="queryParams.examineUser"
              placeholder="请输入审核人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="合同状态" prop="contractStatus">
            <el-select v-model="queryParams.contractStatus" placeholder="请选择合同状态" clearable>
              <el-option
                v-for="dict in dict.type.contract_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item label="发票状态" prop="ifInvoice">
            <el-select v-model="queryParams.ifInvoice" placeholder="请选择发票状态" clearable>
              <el-option v-for="dict in dict.type.invoice_status" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
              v-hasPermi="['recruit:recruit_contract:add']">新增</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
              v-hasPermi="['recruit:recruit_contract:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
              v-hasPermi="['recruit:recruit_contract:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
              v-hasPermi="['recruit:recruit_contract:export']">导出</el-button>
          </el-col> -->
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="recruit_contractList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="客户名称" align="center" prop="customerName" />
          <!-- <el-table-column label="合同名称" align="center" prop="contractName" /> -->
          <el-table-column label="生成时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同总金额" align="center" prop="totalRmb" />
           <el-table-column label="已收金额" align="center" prop="receivedAmount" />

           <el-table-column label="发票状态" align="center" prop="ifInvoice">
             <template slot-scope="scope">
               <dict-tag :options="dict.type.invoice_status" :value="scope.row.ifInvoice" />
             </template>
           </el-table-column>

           <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
             <template slot-scope="scope">
               <el-button size="mini" type="text" icon="el-icon-edit" @click="dwolwnFile(scope.row)"
                 v-hasPermi="['recruit:recruit_contract:edit']">下载</el-button>

             </template>
           </el-table-column>


          <!-- <el-table-column label="已收金额" align="center" prop="receivedAmount" />
            <el-table-column label="审核状态" align="center" prop="examineStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus" />
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="审核人" align="center" prop="examineUser" />
            <el-table-column label="合同状态" align="center" prop="contractStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.contract_status" :value="scope.row.contractStatus" />
            </template>
          </el-table-column> -->

          <!-- <el-table-column label="合同编号" align="center" prop="id" />
          <el-table-column label="展商ID" align="center" prop="exhibitorId" />
          <el-table-column label="展会ID" align="center" prop="exhId" />
          <el-table-column label="业务员ID" align="center" prop="userId" />
          <el-table-column label="展商联系人ID" align="center" prop="contactId" />
          <el-table-column label="地址" align="center" prop="customerAddress" />
          <el-table-column label="联系人" align="center" prop="customerPerson" />
          <el-table-column label="电话" align="center" prop="customerTel" />
          <el-table-column label="传真" align="center" prop="customerFax" />
          <el-table-column label="合同时间" align="center" prop="contractTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.contractTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目总金额" align="center" prop="contentTotal" />
          <el-table-column label="注册费" align="center" prop="registerCost" />
          <el-table-column label="合同总金额" align="center" prop="totalRmb" />
          <el-table-column label="折扣(%)" align="center" prop="discount" />
          <el-table-column label="抹零抵扣" align="center" prop="moling" />
          <el-table-column label="优惠后总价" align="center" prop="afterDiscount" />
          <el-table-column label="已收金额" align="center" prop="receivedAmount" />
          <el-table-column label="合同附注" align="center" prop="memo" />
          <el-table-column label="是否双届合同" align="center" prop="isTwo">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.biz_yes_no" :value="scope.row.isTwo" />
            </template>
          </el-table-column>
          <el-table-column label="合同模版ID" align="center" prop="templateId" />
          <el-table-column label="审核状态" align="center" prop="examineStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.examine_status" :value="scope.row.examineStatus" />
            </template>
          </el-table-column>
          <el-table-column label="审核人" align="center" prop="examineUser" />
          <el-table-column label="生成合同文件" align="center" prop="file" />
          <el-table-column label="回传合同附件" align="center" prop="uploadFile" />
          <el-table-column label="合同状态" align="center" prop="contractStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.contract_status" :value="scope.row.contractStatus" />
            </template>
          </el-table-column>
          <el-table-column label="发票状态" align="center" prop="ifInvoice">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.invoice_status" :value="scope.row.ifInvoice" />
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.zlf_status" :value="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="创建者" align="center" prop="createBy" />

           -->
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="getList" />

      <!-- </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">关闭</el-button>
      </div>
    </el-dialog> -->






    <!-- 添加或修改合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="100%" append-to-body>
       <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div class="colonn">
        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              乙方信息
            </div>
          </el-col>
        </el-row>
        <el-row style="line-height: 50px;color: #000000;margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content ">

              展商名称：{{exhibitorInfo.exhibitorName}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              地址： {{exhibitorInfo.exhibitorAddress}}
            </div>
          </el-col>
        </el-row>
        <el-row style="line-height: 50px;color: #000000;margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content ">
                <div class="roww">
                  <!-- <div>经办人：</div> -->

              <el-form-item label="经办人：" prop="contactId">
                  <el-select v-model="form.contactId" placeholder="请选择经办人" clearable>
                    <el-option
                    v-for="dict in listExhibitor_contactList"
                    :key="dict.id"
                    :label="dict.contactName"
                      :value="dict.id" />
                  </el-select>
                  </el-form-item>

                  <div style="width: 25px;"></div>
                </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              电话： {{exhibitorInfo.exhibitorTel}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              传真： {{exhibitorInfo.exhibitorFax}}
            </div>
          </el-col>
        </el-row>
        <el-row style="line-height: 50px;color: #000000;margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content ">
              参展展品类别：{{exhibitorInfo.exhibitsCategory}}
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              请填写合同基本信息
            </div>
          </el-col>
        </el-row>

        <el-row style="line-height: 50px;color: #000000;margin-bottom: 0px;">
          <!-- <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww">
                <div style="white-space: nowrap;">合同编号：</div>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col> -->
          <!-- <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww" >
                <div style="white-space: nowrap;">合同名称：</div>
                <el-input v-model="form.contractName" placeholder="请输入内容"></el-input>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col> -->
          <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww">
                <div style="white-space: nowrap;">签约人：</div>
                <el-select v-model="form.contactId" placeholder="请选择经办人" clearable>
                  <el-option
                  v-for="dict in listExhibitor_contactList"
                  :key="dict.id"
                  :label="dict.contactName"
                    :value="dict.id" />
                </el-select>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww">
                <div style="white-space: nowrap;">客户名称：</div>
                <el-input v-model="form.customerName" placeholder="请输入内容"></el-input>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="line-height: 50px;color: #000000;margin-bottom: 0px;">

          <!-- <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww">
                <div style="white-space: nowrap;">合同截止日期：</div>
                <el-date-picker
                      v-model="form.contractTime"
                      format="yyyy 年 MM 月 dd 日"
                       value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="合同截止日期">
                    </el-date-picker>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col> -->
          <!-- <el-col :span="8">
            <div class="grid-content roww">
              <div class="grid-content roww">
                <div style="white-space: nowrap;">付款截至日期：</div>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <div style="width: 25px;"></div>
              </div>
            </div>
          </el-col> -->
        </el-row>
        <div style="height: 40px;"></div>
        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              请选择合同所包含的项目
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: green;">
              所选展位
            </div>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="selbuylistrecruit_boothList" @selection-change="handleSelectionZWChange">
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column label="费用名称" align="center" prop="boothType">
            <template slot-scope="scope">
              <div>摊位费</div>
            </template>
          </el-table-column>

          <el-table-column label="展厅号" align="center" prop="hallId" />
          <el-table-column label="展位号" align="center" prop="boothNo" />
         <!-- <el-table-column label="展位类别" align="center" prop="boothType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.booth_type" :value="scope.row.boothType" />
            </template>
          </el-table-column>
           <el-table-column label="展位面积" align="center" prop="boothArea" /> -->

          <el-table-column label="展位费" align="center" prop="rmbPrice" />

           <el-table-column label="销售单价" align="center" prop="afterDiscount">
             <template slot-scope="scope">
               <el-input   v-model="scope.row.afterDiscount"
                   @change="serviceInputChange(scope.row,scope.$index,'zw',0)"

                   placeholder="销售单价"></el-input>
             </template>
           </el-table-column>



          <el-table-column label="折扣" align="center" prop="discount">
            <template slot-scope="scope">
              <div class="roww center_center">
                <el-input  v-model="scope.row.discount"

                @change="serviceInputChange(scope.row,scope.$index,'zw',1)"

                 placeholder="折扣"></el-input>
                 <div>%</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="抵扣" align="center" prop="moling">
            <template slot-scope="scope">
              <el-input   v-model="scope.row.moling"

               @change="serviceInputChange(scope.row,scope.$index,'zw',2)"
               placeholder="抵扣"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="小计" align="center" prop="subTotal">
            <template slot-scope="scope">
              <el-input  disabled  v-model="scope.row.subTotal"  placeholder="小计"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="说明" align="center" prop="boothType">
            <template slot-scope="scope">
              <el-input   v-model="scope.row.memo"   placeholder="说明"></el-input>
            </template>
          </el-table-column>



        </el-table>

        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: green;">
              所选服务
            </div>
          </el-col>
        </el-row>

<!-- @current-change="handleSelectionFWChange" -->

        <el-table v-loading="loading" :data="selServiceListList"
          @selection-change="handleSelectionFWChange" >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="服务名称" align="center" prop="params.projectName" />
          <el-table-column label="服务编号" align="center" prop="params.projectNo" />
          <el-table-column label="服务类别" align="center" prop="params.categoryName">
          </el-table-column>
          <el-table-column label="数量" align="center" prop="reservationNum" />
           <el-table-column label="价格" align="center" prop="params.rmbPrice" />

          <el-table-column label="销售单价" align="center" prop="afterDiscount">
            <template slot-scope="scope">
              <el-input    @change="serviceInputChange(scope.row,scope.$index,'fw',0)" v-model="scope.row.afterDiscount"  placeholder="销售单价"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="折扣" align="center" prop="discount">
            <template slot-scope="scope">
              <div class="roww center_center">
                <el-input  v-model="scope.row.discount"
                @change="serviceInputChange(scope.row,scope.$index,'fw',1)"
                            placeholder="折扣"></el-input>
                            <div>%</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="抵扣" align="center" prop="moling">
            <template slot-scope="scope">
              <el-input    @change="serviceInputChange(scope.row,scope.$index,'fw',2)"   v-model="scope.row.moling"  placeholder="抵扣"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="小计" align="center" prop="subTotal">
            <template slot-scope="scope">
              <el-input  disabled  v-model="scope.row.subTotal"  placeholder="小计"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="说明" align="center" prop="memo">
            <template slot-scope="scope">
              <el-input   v-model="scope.row.memo"   placeholder="说明"></el-input>
            </template>
          </el-table-column>

        </el-table>


        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div class="roww center_center">

              <div style="line-height: 50px;color: #000000;">
                已选择 <span style="color:red;">
                  {{zwSelChangeList.length+fwSelChangeList.length}}
                </span> 项内容
              </div>

              <div style="line-height: 50px;color: #000000;">
                项目总金额：
              </div>

              <div style="width: 130px;margin-left: 15px;">
                <el-input v-model="moneyAll" disabled placeholder="请输入内容"></el-input>
              </div>
              <div style="line-height: 50px;color: #000000;margin-left: 15px;">
                元
              </div>

             <div style="line-height: 50px;color: #000000;margin-left: 15px;">
                注册费：
              </div>
              <div style="width: 130px;margin-left: 15px;">
                <el-input @change="registerCostChange" v-model="form.registerCost" placeholder="请输入内容"></el-input>
              </div>
              <div style="line-height: 50px;color: #000000;margin-left: 15px;">
                元
              </div>


              <div style="line-height: 50px;color: #000000;margin-left: 15px;">
                合同总金额：
              </div>

              <div style="width: 130px;margin-left: 15px;">
                <el-input v-model="form.totalRmb" placeholder="请输入内容"></el-input>
              </div>
              <div style="line-height: 50px;color: #000000;margin-left: 15px;">
                元
              </div>
              <div class="allline"></div>
            </div>
          </el-col>
        </el-row>





        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              付款计划设置
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange1"
          :row-class-name="rowClassName"
          >
          <el-table-column prop="planName" label="付款计划名称">
              <template slot-scope="scope">
                  <el-input value="全款付清" disabled
                   placeholder="请输入内容"></el-input>
              </template>
          </el-table-column>
          <el-table-column prop="payAmount" label="付款金额">
              <template slot-scope="scope">
                  <el-input v-model="form.totalRmb" disabled placeholder="请输入内容"></el-input>
              </template>
          </el-table-column>
          <el-table-column prop="planPercent" label="付款比例" >
            <template slot-scope="scope">
                <div class="roww center_center">
                  <el-input value="100" disabled  placeholder="单位%"></el-input>
                  <div>%</div>
                </div>
            </template>
          </el-table-column>
          <el-table-column prop="planTime" label="截止时间" >
            <template slot-scope="scope">
               <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                     value-format="yyyy-MM-dd"
                     v-model="form.payEndTime"
                     type="date"
                     placeholder="选择日期">
                   </el-date-picker>
            </template>
          </el-table-column>
        </el-table>



        <div class="roww">
          <!-- <el-button type="text" style="color: #67c23a;" @click="addMoneyPlan">增加付款计划</el-button> -->
          <!-- <el-button type="text"  style="color: #67c23a;" @click="removeMoneyPlan">删除付款计划</el-button> -->
        </div>

        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              合同备注
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
             <el-input
               type="textarea"
               :autosize="{ minRows: 2, maxRows: 4}"
               placeholder="请输入内容"
               v-model="form.memo">
             </el-input>
            </div>
          </el-col>
        </el-row>

        <!-- <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div class="roww center_center">
              <div style="line-height: 50px;color: #000000;">
                是否是双份合同
              </div>
              <div style="width: 15px;"></div>
              <div class="roww center_center" style="width:160px;">
                <el-select v-model="queryParams.isTwo" placeholder="请选择" clearable>
                  <el-option
                    v-for="dict in dict.type.biz_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </div>
              <div style="width: 15px;"></div>
              <div style="line-height: 50px;color: #000000;">
                	需设置双届合同的展会
              </div>
              <div style="width: 15px;"></div>
              <div class="roww center_center" style="width:160px;">
                <el-select v-model="queryParams.isTwo" placeholder="请选择" clearable>
                  <el-option
                    v-for="dict in dict.type.biz_yes_no"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </div>
              <div style="width: 15px;"></div>
              <div class="allline"></div>
            </div>
          </el-col>
        </el-row> -->
        <el-row style="margin-bottom: 0px;">
          <el-col :span="24">
            <div style="line-height: 50px;color: #1890ff;">
              请选择合同模板
            </div>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="listRecruit_templateList"
         highlight-current-row
         >
         <el-table-column
               label="选择项"
               width="55">
               <template slot-scope="scope">
               	<el-radio @change="handleSelectionHTChange(scope.row)" v-model="tableRadio"  :label="scope.row.id" ></el-radio>
               </template>
          </el-table-column>
          <el-table-column label="合同地址" align="center" prop="templateFile" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-download" @click="downLoadFile(scope.row)"
                v-hasPermi="['recruit:recruit_contract:edit']">查看模板</el-button>
            </template>
          </el-table-column>
        </el-table>



      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>

    </el-dialog>
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="form.contractName" placeholder="请输入合同名称" />
            </el-form-item>
            <el-form-item label="展商联系人ID" prop="contactId">
              <el-input v-model="form.contactId" placeholder="请输入展商联系人ID" />
            </el-form-item>
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入客户名称" />
            </el-form-item>
            <el-form-item label="地址" prop="customerAddress">
              <el-input v-model="form.customerAddress" placeholder="请输入地址" />
            </el-form-item>
            <el-form-item label="联系人" prop="customerPerson">
              <el-input v-model="form.customerPerson" placeholder="请输入联系人" />
            </el-form-item>
            <el-form-item label="电话" prop="customerTel">
              <el-input v-model="form.customerTel" placeholder="请输入电话" />
            </el-form-item>
            <el-form-item label="传真" prop="customerFax">
              <el-input v-model="form.customerFax" placeholder="请输入传真" />
            </el-form-item>
            <el-form-item label="合同时间" prop="contractTime">
              <el-date-picker clearable
                v-model="form.contractTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择合同时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="项目总金额" prop="contentTotal">
              <el-input v-model="form.contentTotal" placeholder="请输入项目总金额" />
            </el-form-item>
            <el-form-item label="注册费" prop="registerCost">
              <el-input v-model="form.registerCost" placeholder="请输入注册费" />
            </el-form-item>
            <el-form-item label="合同总金额" prop="totalRmb">
              <el-input v-model="form.totalRmb" placeholder="请输入合同总金额" />
            </el-form-item>
            <el-form-item label="折扣(%)" prop="discount">
              <el-input v-model="form.discount" placeholder="请输入折扣(%)" />
            </el-form-item>
            <el-form-item label="抹零抵扣" prop="moling">
              <el-input v-model="form.moling" placeholder="请输入抹零抵扣" />
            </el-form-item>
            <el-form-item label="优惠后总价" prop="afterDiscount">
              <el-input v-model="form.afterDiscount" placeholder="请输入优惠后总价" />
            </el-form-item>
            <el-form-item label="已收金额" prop="receivedAmount">
              <el-input v-model="form.receivedAmount" placeholder="请输入已收金额" />
            </el-form-item>
            <el-form-item label="合同附注" prop="memo">
              <el-input v-model="form.memo" placeholder="请输入合同附注" />
            </el-form-item>
            <el-form-item label="是否双届合同">
              <el-radio-group v-model="form.isTwo">
                <el-radio
                  v-for="dict in dict.type.biz_yes_no"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="合同模版ID" prop="templateId">
              <el-input v-model="form.templateId" placeholder="请输入合同模版ID" />
            </el-form-item>
            <el-form-item label="审核状态">
              <el-radio-group v-model="form.examineStatus">
                <el-radio
                  v-for="dict in dict.type.examine_status"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核人" prop="examineUser">
              <el-input v-model="form.examineUser" placeholder="请输入审核人" />
            </el-form-item>
            <el-form-item label="生成合同文件">
              <file-upload v-model="form.file"/>
            </el-form-item>
            <el-form-item label="回传合同附件">
              <file-upload v-model="form.uploadFile"/>
            </el-form-item>
            <el-form-item label="合同状态">
              <el-radio-group v-model="form.contractStatus">
                <el-radio
                  v-for="dict in dict.type.contract_status"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票状态">
              <el-radio-group v-model="form.ifInvoice">
                <el-radio
                  v-for="dict in dict.type.invoice_status"
                  :key="dict.value"
    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
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
        </el-dialog> -->



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
    listRecruit_contract,
    getRecruit_contract,
    delRecruit_contract,
    addRecruit_contract,
    updateRecruit_contract
  } from "@/api/recruit/recruit_contract";
import { listRecruit_template,
} from "@/api/recruit/recruit_template";

  import {
    listRecruit_booth,
    addexhibitor_exhbuybooth,
    recruitrecruit_boothbatchimport,
    getRecruit_booth,
    delRecruit_booth,
    addRecruit_booth,
    updateRecruit_booth,notbuylistrecruit_booth,buylistrecruit_booth,
    addRecruit_boothbatchadd
  } from '@/api/recruit/recruit_booth';

  import { listExhibitor_service_reservation,
  getExhibitor_service_reservation,
  delExhibitor_service_reservation,
   addExhibitor_service_reservation,
   updateExhibitor_service_reservation,
   buyexhibitor_service_reservation,
   booklistexhibitor_service_reservation
   } from "@/api/exhibitor/exhibitor_service_reservation";


import { listExhibitor_contact} from "@/api/exhibitor/exhibitor_contact";
import { listExhibitor_info,getExhibitor_info } from "@/api/exhibitor/exhibitor_info";



  export default {
    name: "Recruit_contract",
    dicts: ['examine_status', 'invoice_status', 'zlf_status', 'biz_yes_no', 'contract_status'],
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
        textarea2:"",
        input: "",
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
        // 合同表格数据
        recruit_contractList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          contractName: null,
          exhibitorId: null,
          exhId: null,
          userId: null,
          contactId: null,
          customerName: null,
          customerAddress: null,
          customerPerson: null,
          customerTel: null,
          customerFax: null,
          contractTime: null,
          contentTotal: null,
          registerCost: null,
          totalRmb: null,
          discount: null,
          moling: null,
          afterDiscount: null,
          receivedAmount: null,
          memo: null,
          isTwo: null,
          templateId: null,
          examineStatus: null,
          examineUser: null,
          file: null,
          uploadFile: null,
          contractStatus: null,
          ifInvoice: null,
          status: null,
        },
        // 表单参数
        form: {},
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
          userId: [{
            required: true,
            message: "业务员ID不能为空",
            trigger: "blur"
          }],
          contactId: [{
            required: true,
            message: "展商联系人ID不能为空",
            trigger: "blur"
          }],
        },
        openSelExhAlert: true,


        tableData: [{
          index:0,
          planName: '',
          payAmount:"",
          planPercent: '100',
          planTime:''
        }],

        selFkjh:false,//付款计划选择的
        listRecruit_templateList:[],//合同列表
        username:"",//当前登录的用户名称

        listExhibitor_contactList:[],//联系人列表
        exhibitorInfo:{},//展商详情

        selbuylistrecruit_boothList:[],//选择的展位
        selServiceListList:[],//获取已选的服务

        zwSelChangeList:[],//选择的展位变动
        fwSelChangeList:[],//选择的展位变动 tableData
        moneyAll:0,
        // 合同模板单选
        tableRadio: '',
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
      const username = this.$store.state.user.name;
      this.username=username;
      var queryParams = this.queryParams;
      var selExhibitorId = this.selExhibitorId;
      queryParams.exhibitorId = selExhibitorId;
      this.queryParams = queryParams;
      this.getList();
      this.listRecruit_template();
      this.listExhibitor_contactGet();
      this.getZhanshangInfo();
      // 获取选择的展位列表
      this.getYesZhanwei()
      // 获取自己的已选服务
      this.getSelServiceList();
    },

    methods: {

      // 下载合同
      dwolwnFile(res){
        console.log("下载合同",res);
         this.$download.resource(res.file);
      },

      // 计算小计
      sumXiaoji(){
        var sb=this.selbuylistrecruit_boothList;
         var ssll=this.selServiceListList;



         // 展位的计算
         for(var a=0;a<sb.length;a++){
           //有折扣判断单价
           if(sb[a].discount){
             sb[a].afterDiscount=sb[a].discount*sb[a].rmbPrice/100;
             sb[a].afterDiscount=parseFloat(sb[a].afterDiscount.toFixed(2))
             sb[a].subTotal=sb[a].afterDiscount;
           }else{
              sb[a].afterDiscount=sb[a].rmbPrice;
              sb[a].subTotal=sb[a].rmbPrice;
           }
         }
         // 服务的计算
         for(var a=0;a<ssll.length;a++){
           //有折扣判断单价
           if(ssll[a].discount){
             ssll[a].afterDiscount=ssll[a].discount*ssll[a].params.rmbPrice/100;
             ssll[a].afterDiscount=parseFloat(ssll[a].afterDiscount.toFixed(2))
             ssll[a].subTotal=ssll[a].afterDiscount*ssll[a].reservationNum;
           }else{
              ssll[a].afterDiscount=ssll[a].params.rmbPrice*ssll[a].reservationNum;
              ssll[a].subTotal=ssll[a].rmbPrice*ssll[a].reservationNum;
           }
         }
         this.calculationAll();
      },

      // 服务列表()参数最后一个  第几个输入框
      serviceInputChange(res,index,type,diji){
          if(type=='zw'){
            var selbuylistrecruit_boothList=this.selbuylistrecruit_boothList;
            var obg=selbuylistrecruit_boothList[index];
            if(diji==0){//改动销售单价变动销售折扣比例
              var discount=obg.afterDiscount/obg.rmbPrice*100;
              discount=discount.toFixed(2)
              discount=parseFloat(discount)
              obg.discount=discount;
              obg.subTotal=obg.afterDiscount-obg.moling;
            }else
            if(diji==1){//改动折扣变动算单价
              var afterDiscount=obg.discount*obg.rmbPrice/100;
              obg.afterDiscount=afterDiscount;
              obg.subTotal=obg.afterDiscount-obg.moling;
            }else
            if(diji==2){//改变折扣算小计
              var subTotal=obg.afterDiscount-obg.moling;
              obg.subTotal=subTotal;
            }
            selbuylistrecruit_boothList[index]=obg;
            this.selbuylistrecruit_boothList=selbuylistrecruit_boothList;
            this.syncSelData('zw',index,obg);
          }else  if(type=='fw'){
            var selServiceListList=this.selServiceListList;
            var obg=selServiceListList[index];
            if(diji==0){//改动销售单价变动销售折扣比例
              var discount=obg.afterDiscount/obg.params.rmbPrice*100;
              obg.discount=discount;
              discount=discount.toFixed(2)
              discount=parseFloat(discount)
              obg.subTotal=obg.afterDiscount*obg.reservationNum-obg.moling;
            }else
            if(diji==1){//改动折扣变动算单价
              var afterDiscount=obg.discount*obg.params.rmbPrice/100;
              obg.afterDiscount=afterDiscount;
              obg.subTotal=obg.afterDiscount*obg.reservationNum-obg.moling;
            }else
            if(diji==2){//改变折扣算小计
              var subTotal=obg.afterDiscount*obg.reservationNum-obg.moling;
              obg.subTotal=subTotal;
            }
            selServiceListList[index]=obg;
            this.selServiceListList=selServiceListList;
            this.syncSelData('fw',index,obg);
          }
      },

      // 变动之后同步选中的数据
      syncSelData(type,index,info){
            var zwSelChangeList=this.zwSelChangeList;
            var fwSelChangeList=this.fwSelChangeList;

            if(type=='zw'){
              for(var a=0;a<zwSelChangeList.length;a++){
                if(zwSelChangeList[a].id==info.id){
                  zwSelChangeList[a]=info;
                  break;
                }
              }
              this.zwSelChangeList=zwSelChangeList;
            }else if(type=='fw'){
               for(var a=0;a<fwSelChangeList.length;a++){
                 if(fwSelChangeList[a].id==info.id){
                   fwSelChangeList[a]=info;
                   break;
                 }
               }
               this.fwSelChangeList=fwSelChangeList;
            }
            this.calculationAll()
      },

      // 计算总钱数
      calculationAll(){
          var zwSelChangeList=this.zwSelChangeList;
          var fwSelChangeList=this.fwSelChangeList;
          var moneyAll=0;
          for(var a=0;a<zwSelChangeList.length;a++){
            moneyAll=moneyAll+parseFloat(zwSelChangeList[a].afterDiscount)
          }
          for(var a=0;a<fwSelChangeList.length;a++){
               var money=fwSelChangeList[a].afterDiscount*fwSelChangeList[a].reservationNum;
               moneyAll=moneyAll+money;
          }
          var form=this.form;
          // if(form.registerCost){
          //   moneyAll=moneyAll+parseFloat(form.registerCost)
          // }
          this.moneyAll=moneyAll;
          //计算合同总金额
          var form=this.form;
          if(form.registerCost&&form.registerCost!=''){
            form.totalRmb=moneyAll+parseFloat(form.registerCost);
          }else{
            form.totalRmb=moneyAll;
          }
          this.form=form;
          console.log("合同总金额", this.form);
          this.$forceUpdate()
      },
      // 注册费
      registerCostChange(){
              this.calculationAll()
      },




      // 下载合同模板
      downLoadFile(res){
        this.$download.resource(res.templateFile);
      },

      // 合同模板
      handleSelectionHTChange(res){
        console.log("合同模板",res)
        this.tableRadio=res.id;
        this.form.templateId=res.id

      },


      // 展位选择变动
      handleSelectionZWChange(res){
        console.log("展位选择变动",res);
        this.zwSelChangeList=res;
        // this.serviceInputChange();
        this.sumXiaoji();
      },
      // 服务选择变动
      handleSelectionFWChange(res){
        console.log("服务选择变动",res);
        this.fwSelChangeList=res;
        // this.serviceInputChange();

        this.sumXiaoji();
      },

     // 获取已选择的服务
     getSelServiceList(){
         var selExhInfo=this.$cache.local.getJSON('selExhInfo');
           console.log(selExhInfo) // 输出'{sessionProp: 1}'
         if(!selExhInfo.value){
           this.$modal.msgError("请选择展会");
           return false;
         }
         var data={
           pageNum: 1,
           pageSize: 1000,
           exhId:selExhInfo.id,
           exhibitorId:this.selExhibitorId,
         }
         booklistexhibitor_service_reservation(data).then(response => {
         if(response.code==200){
           var  selServiceListList=response.rows;
           for(var a=0;a<selServiceListList.length;a++){
             selServiceListList[a].afterDiscount=selServiceListList[a].params.rmbPrice;
             selServiceListList[a].discount=100;  //折扣
             selServiceListList[a].moling=0;    //抵扣
             selServiceListList[a].subTotal=0;   //小计
             selServiceListList[a].memo="";       //说明
             selServiceListList[a].index=a;       //下标
           }
            var list=[];
            for(var a=0;a<selServiceListList.length;a++){
              if(selServiceListList[a].params.outStatus==0){
                list.push(selServiceListList[a]);
              }
            }
           this.selServiceListList=list;
         }
       });
     },
      // 获取已选择展位
      getYesZhanwei(){
         this.$modal.loading("展位获取中，请稍后...");
        var data={
            exhibitorId:this.selExhibitorId,
            pageNum: 1,
            pageSize: 10000,
        }
        buylistrecruit_booth(data).then(response => {
          if(response.code==200){
            var selbuylistrecruit_boothList=response.rows;
            for(var a=0;a<selbuylistrecruit_boothList.length;a++){
             // selbuylistrecruit_boothList[a].unit_price=selbuylistrecruit_boothList[a].rmbPrice;
             selbuylistrecruit_boothList[a].afterDiscount=selbuylistrecruit_boothList[a].rmbPrice;
              selbuylistrecruit_boothList[a].discount=100;  //折扣
              selbuylistrecruit_boothList[a].moling=0;    //抵扣
              selbuylistrecruit_boothList[a].subTotal=0;   //小计
              selbuylistrecruit_boothList[a].memo="";       //说明
             selbuylistrecruit_boothList[a].index=a;       //下标
            }

            var list=[];
            for(var a=0;a<selbuylistrecruit_boothList.length;a++){
              if(selbuylistrecruit_boothList[a].params.outStatus==0){
                list.push(selbuylistrecruit_boothList[a]);
              }
            }

            this.selbuylistrecruit_boothList=list;
            // 关闭遮罩层
            this.$modal.closeLoading();
          }
        }).catch((res) => {
          console.log("展位选择的吧",res)
            // 关闭遮罩层
            this.$modal.closeLoading();
        });
      },


      // 获取企业
      planNameChange(res){
        console.log("修改",res);
      },
        rowClassName({row, rowIndex}) {
		      //把每一行的索引放进row
		       row.index = rowIndex;
		    },
      // 获取联系人
      listExhibitor_contactGet(){
        var data={
            pageNum: 1,
            pageSize: 1000,
            exhibitorId:this.selExhibitorId
        }
        listExhibitor_contact(data).then(response => {
          this.listExhibitor_contactList = response.rows;

        });
      },

      // 获取展商详情
      getZhanshangInfo(){
        const id = this.selExhibitorId
        getExhibitor_info(id).then(response => {
          console.log("展商详情",response.data)
            this.exhibitorInfo=response.data;
           var form=this.form;
           form.customerName=response.data.exhibitorName;
           this.form=form;
           console.log("表单啊",this.form)
           this.$forceUpdate()
        });
      },
      // 获取合同模板
      listRecruit_template(){
        var data={
          templateType:'1',
          pageNum: 1,
          pageSize: 1000,
        }
        listRecruit_template(data).then(response => {
          this.listRecruit_templateList = response.rows;

        });


      },

      // 付款计划选择改变
      handleSelectionChange1(selection) {
        this.selFkjh=selection;
      },
      // 增加付款计划
      addMoneyPlan(){
        var tableData=this.tableData;
        var obg={
          index:tableData.length>0?tableData[tableData.length-1].index+1:0,
          planName: '',
          payAmount:"",
          planPercent: '100',
          planTime:''
        }
        this.tableData.push(obg);
      },
      removeMoneyPlan(){
          var tableData=this.tableData;
          var selFkjh=this.selFkjh;
          var noSel=[];
          for(var a=0;a<tableData.length;a++){
              var isHave=false;
              for(var b=0;b<selFkjh.length;b++){
                if(tableData[a].index==selFkjh[b].index){
                  isHave=true;
                }
              }
              if(!isHave){
                noSel.push(tableData[a]);
              }
          }
          this.tableData=noSel;
      },

      /** 查询合同列表 */
      getList() {
        this.loading = true;
        listRecruit_contract(this.queryParams).then(response => {
          this.recruit_contractList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel1() {
        this.tableRadio="";
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {

        this.form = {
          id: null,
          contractName: "展商合同",
          exhibitorId: this.selExhibitorId,
          exhId: null,
          userId: null,
          contactId: null,
          customerName: this.exhibitorInfo.exhibitorName,
          customerAddress: null,
          customerPerson: null,
          customerTel: null,
          customerFax: null,
          // contractTime: null,
          contentTotal: null,
          registerCost: null,
          totalRmb: null,
          discount: null,
          moling: null,
          afterDiscount: null,
          receivedAmount: null,
          memo: null,
          isTwo: "0",
          templateId: null,
          examineStatus: "0",
          examineUser: null,
          file: null,
          uploadFile: null,
          contractStatus: "0",
          ifInvoice: "0",
          status: "0",
          delFlag: null,
          version: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null
        };
        this.resetForm("form");

        console.error("表单form重置",this.form);

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
        this.title = "添加合同";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        console.log('idididid',id)
        getRecruit_contract(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改合同";
        });
      },
      /** 提交按钮 */
      submitForm1() {

        var data=this.form;
        var tableData=this.tableData;
        var zwSelChangeList=this.zwSelChangeList;
        var fwSelChangeList=this.fwSelChangeList;
        var exhibitorInfo=this.exhibitorInfo;
        console.log("提交按钮",data)
        if(zwSelChangeList.length<=0&&fwSelChangeList.length<=0){
          this.$modal.msgError("请选择展位或者服务项目");
          return false;
        }
        if(tableData.length<=0){
           this.$modal.msgError("至少添加一条付款计划");
          return false;
        }
        // var have=false;
        // for(var a=0;a<tableData.length;a++){
        //   var obg=tableData[a];
        //   console.log(obg);
        //   if(obg.planName==""||obg.payAmount==''||obg.planPercent==''||obg.planTime==''){
        //     this.$modal.msgError("请将付款计划填写完整");
        //     have=true;
        //     break;
        //   }
        // }
        // if(have){
        //   return
        // }
        if(!data.contactId||data.contactId==""){
          this.$modal.msgError("请选择经办人");
          return false;
        }

        var lc=this.listExhibitor_contactList;
        for(var a=0;a<lc.length;a++){
          if(data.contactId==lc[a].id){
            data.customerPerson=lc[a].contactName;
          }
        }
        if(!data.contractName||data.contractName==""){
          this.$modal.msgError("请添加合同名称");
          return false;
        }
        if(!data.customerName||data.customerName==''){
          this.$modal.msgError("请输入客户名称");
          return false;
        }
        // if(!data.contractTime||data.contractTime==''){
        //   this.$modal.msgError("请选择合同截止日期");
        //   return false;
        // }
        if(!data.totalRmb||data.totalRmb==""){
          this.$modal.msgError("请填写项目总金额");
          return false;
        }
        // if(this.form.payEndTime==""){
        //   this.$modal.msgError("请选择最后支付时间");
        //   return false;
        // }
        if(!data.templateId||data.templateId==''){
          this.$modal.msgError("请选择合同模板");
          return false;
        }


        data.params={
          booths:zwSelChangeList,
          services:fwSelChangeList,
          payPlans:tableData
        }
        data.exhibitorId=this.selExhibitorId;

        data.customerName=exhibitorInfo.exhibitorName;
        data.customerAddress=exhibitorInfo.exhibitorAddress;
        data.customerTel=exhibitorInfo.exhibitorTel;
        data.customerFax=exhibitorInfo.exhibitorFax;
        data.contentTotal=this.moneyAll; //项目总金额

        console.log("提交合同号  参数",data,JSON.stringify(data))

        this.$modal.loading("合同提交中...");
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateRecruit_contract(data).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();

                  this.$modal.closeLoading();
              }).catch(() => {

                this.tableRadio="";

                 this.$modal.closeLoading();
              });
            } else {
              console.log("进来了")
              addRecruit_contract(data).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
                  this.tableRadio="";
                  this.$modal.closeLoading();
              }).catch(() => {
                 this.$modal.closeLoading();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除合同编号为"' + ids + '"的数据项？').then(function() {
          return delRecruit_contract(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('recruit/recruit_contract/export', {
          ...this.queryParams
        }, `recruit_contract_${new Date().getTime()}.xlsx`)
      },


      cancel() {
        this.openSelExhAlert = false;
      },
      submitForm() {

        this.$emit('getSelExhInfo', 7);
      },

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
