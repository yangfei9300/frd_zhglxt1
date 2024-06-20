<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="选择展会" prop="visitorName">
        <el-select v-model="queryParams.exhId" placeholder="请选择展会" clearable>
          <el-option v-for="dict in exh_listList" :key="dict.id" :label="dict.exhName" :value="dict.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="观众姓名" prop="visitorName">
        <el-input v-model="queryParams.visitorName" placeholder="请输入观众姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <!-- <el-form-item label="观众英文姓名" prop="visitorEname">
        <el-input
          v-model="queryParams.visitorEname"
          placeholder="请输入观众英文姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="性别" prop="visitorGender">
        <el-input
          v-model="queryParams.visitorGender"
          placeholder="请输入性别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入公司名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <!-- <el-form-item label="展商ID" prop="exhibitorId">
        <el-input
          v-model="queryParams.exhibitorId"
          placeholder="请输入展商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <!-- <el-form-item label="身份证号" prop="idNumber">
        <el-input
          v-model="queryParams.idNumber"
          placeholder="请输入身份证号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="部门" prop="visitorDepartment">
        <el-input
          v-model="queryParams.visitorDepartment"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="职务" prop="visitorPost">
        <el-input v-model="queryParams.visitorPost" placeholder="请输入职务" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->

      <el-form-item label="省份" prop="visitorProvince">
        <el-input v-model="queryParams.visitorProvince" placeholder="请输入省份" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="城市" prop="visitorCity">
        <el-input v-model="queryParams.visitorCity" placeholder="请输入城市" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>




      <el-form-item label="所属行业" prop="industryType">
        <el-select v-model="queryParams.industryType" placeholder="请选择所属行业" clearable>
          <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="来源类别" prop="sourceType">
        <el-select v-model="queryParams.sourceType" placeholder="请选择来源类别" clearable>
          <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="信息来源名称" prop="sourceType">
        <el-input v-model="queryParams.sourceName" placeholder="请输入城市" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="审核状态" prop="jobResp">
        <el-select v-model="queryParams.examineStatus" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.examine_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>


      <!--   <el-form-item label="企业规模" prop="companyScale">
          <el-input v-model="queryParams.companyScale" type="number"   placeholder="请输入企业规模" >
            <template slot="append">星</template>
            </el-input>
        </el-form-item> -->

      <!-- <el-form-item label="国家" prop="visitorCountry">
        <el-input
          v-model="queryParams.visitorCountry"
          placeholder="请输入国家"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!--

      <el-form-item label="地址" prop="visitorAddress">
        <el-input
          v-model="queryParams.visitorAddress"
          placeholder="请输入地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文地址" prop="visitorEaddress">
        <el-input
          v-model="queryParams.visitorEaddress"
          placeholder="请输入英文地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮编" prop="visitorZipcode">
        <el-input
          v-model="queryParams.visitorZipcode"
          placeholder="请输入邮编"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="电话" prop="visitorTel">
        <el-input v-model="queryParams.visitorTel" placeholder="请输入电话" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="手机号" prop="visitorPhone">
        <el-input v-model="queryParams.visitorPhone" placeholder="请输入手机号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>


      <el-form-item label="经营品类" prop="businessCategory">
        <!-- <el-select v-model="queryParams.businessCategory" placeholder="请选择经营品类" clearable>
          <el-option v-for="dict in dict.type.business_category " :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select> -->
        <el-select v-model="selJyplIndexSearch[0]" placeholder="请选择一级经营品类"
          @change="jingyingpinleiSearchChange(1,$event)">
          <el-option v-for="dict in jingyingpinleiListSearch[0] " :key="dict.id" :label="dict.categoryName"
            :value="dict.txt"></el-option>
        </el-select>
        <div style="width:10px"></div>
        <el-select v-model="selJyplIndexSearch[1]" placeholder="请选择二级经营品类"
          @change="jingyingpinleiSearchChange(2,$event)">
          <el-option v-for="dict in jingyingpinleiListSearch[1] " :key="dict.id" :label="dict.categoryName"
            :value="dict.txt"></el-option>
        </el-select>
        <div style="width:10px"></div>
        <el-select v-model="selJyplIndexSearch[2]" placeholder="请选择三级经营品类" multiple style="flex: 1;"
          @change="jingyingpinleiSearchChange(3,$event)">
          <el-option v-for="dict in jingyingpinleiListSearch[2] " :key="dict.categoryName" :label="dict.categoryName"
            :value="dict.categoryName"></el-option>
        </el-select>
      </el-form-item>


      <!-- <el-form-item label="传真" prop="visitorFax">
        <el-input
          v-model="queryParams.visitorFax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Email" prop="visitorEmail">
        <el-input
          v-model="queryParams.visitorEmail"
          placeholder="请输入Email"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="QQ" prop="visitorQq">
        <el-input
          v-model="queryParams.visitorQq"
          placeholder="请输入QQ"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信" prop="visitorWechat">
        <el-input
          v-model="queryParams.visitorWechat"
          placeholder="请输入微信"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="微信unionid" prop="unionid">
        <el-input
          v-model="queryParams.unionid"
          placeholder="请输入微信unionid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="其他联系方式" prop="visitorOther">
        <el-input
          v-model="queryParams.visitorOther"
          placeholder="请输入其他联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网址" prop="visitorWeburl">
        <el-input
          v-model="queryParams.visitorWeburl"
          placeholder="请输入网址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属行业" prop="industryId">
        <el-input
          v-model="queryParams.industryId"
          placeholder="请输入所属行业"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品类别" prop="productCategory">
        <el-input
          v-model="queryParams.productCategory"
          placeholder="请输入产品类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="岗位职责" prop="jobResp">
        <el-select v-model="queryParams.jobResp" placeholder="请选择岗位职责" clearable>
          <el-option
            v-for="dict in dict.type.job_resp"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作性质" prop="jobNature">
        <el-select v-model="queryParams.jobNature" placeholder="请选择工作性质" clearable>
          <el-option
            v-for="dict in dict.type.job_nature"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="人员类别" prop="visitorType">
        <el-select v-model="queryParams.visitorType" placeholder="请选择人员类别" clearable>
          <el-option
            v-for="dict in dict.type.visitor_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="人员级别" prop="visitorLevel">
        <el-select v-model="queryParams.visitorLevel" placeholder="请选择人员级别" clearable>
          <el-option
            v-for="dict in dict.type.visitor_level"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="推荐人" prop="referrer">
        <el-input
          v-model="queryParams.referrer"
          placeholder="请输入推荐人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标签一" prop="tag1">
        <el-input
          v-model="queryParams.tag1"
          placeholder="请输入标签一"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标签二" prop="tag2">
        <el-input
          v-model="queryParams.tag2"
          placeholder="请输入标签二"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.zlf_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>

    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['visitor:visitor_info:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['visitor:visitor_info:edit']">修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['visitor:visitor_info:remove']">删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['visitor:visitor_info:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="fileOpenClick"
          v-hasPermi="['visitor:visitor_info:add']">导入观众信息</el-button>
      </el-col>


      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="visitor_infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="观众姓名" align="center" prop="visitorName" />
      <!-- <el-table-column label="观众英文姓名" align="center" prop="visitorEname" /> -->
      <!-- <el-table-column label="性别" align="center" prop="visitorGender">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.visitorGender"/>
        </template>
      </el-table-column> -->
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <!-- <el-table-column label="展商ID" align="center" prop="exhibitorId" /> -->
      <!-- <el-table-column label="身份证号" align="center" prop="idNumber" /> -->
      <!-- <el-table-column label="部门" align="center" prop="visitorDepartment" /> -->
      <el-table-column label="职务" align="center" prop="visitorPost" />
      <!-- <el-table-column label="国家" align="center" prop="visitorCountry" /> -->
      <el-table-column label="省份" align="center" prop="visitorProvince" />
      <el-table-column label="城市" align="center" prop="visitorCity" />
      <el-table-column label="地址" align="center" prop="visitorAddress" />
      <!-- <el-table-column label="英文地址" align="center" prop="visitorEaddress" /> -->
      <!-- <el-table-column label="邮编" align="center" prop="visitorZipcode" /> -->
      <!-- <el-table-column label="电话" align="center" prop="visitorTel" /> -->
      <el-table-column label="手机号" align="center" prop="visitorPhone" />
      <!-- <el-table-column label="传真" align="center" prop="visitorFax" /> -->
      <!-- <el-table-column label="Email" align="center" prop="visitorEmail" /> -->
      <!-- <el-table-column label="QQ" align="center" prop="visitorQq" /> -->
      <!-- <el-table-column label="微信" align="center" prop="visitorWechat" /> -->
      <!-- <el-table-column label="微信unionid" align="center" prop="unionid" /> -->
      <!-- <el-table-column label="微信头像" align="center" prop="avatar" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="其他联系方式" align="center" prop="visitorOther" /> -->
      <!-- <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="密码" align="center" prop="password" /> -->
      <!-- <el-table-column label="网址" align="center" prop="visitorWeburl" /> -->
      <!-- <el-table-column label="所属行业" align="center" prop="industryId" /> -->
      <!-- <el-table-column label="产品类别" align="center" prop="productCategory" /> -->
      <!-- <el-table-column label="岗位职责" align="center" prop="jobResp">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.job_resp" :value="scope.row.jobResp"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="工作性质" align="center" prop="jobNature">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.job_nature" :value="scope.row.jobNature"/>
        </template>
      </el-table-column>
      <el-table-column label="人员类别" align="center" prop="visitorType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.visitor_type" :value="scope.row.visitorType"/>
        </template>
      </el-table-column>
      <el-table-column label="人员级别" align="center" prop="visitorLevel">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.visitor_level" :value="scope.row.visitorLevel"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="推荐人" align="center" prop="referrer" /> -->
      <!--  <el-table-column label="标签一" align="center" prop="tag1" />
      <el-table-column label="标签二" align="center" prop="tag2" /> -->
      <!-- <el-table-column label="备注" align="center" prop="memo" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zlf_status" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row,1)"
            v-hasPermi="['visitor:visitor_info:edit']">修改</el-button> -->

          <el-button size="mini" type="text" icon="el-icon-edit" @click="isUpdateData(scope.row,2)"
            v-hasPermi="['visitor:visitor_info:edit']">市场部修改</el-button>

          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['visitor:visitor_info:remove']">删除</el-button> -->

          <el-button size="mini" type="text" icon="el-icon-edit" @click="getWjExhList(scope.row.id)"
            v-hasPermi="['visitor:visitor_info:list']">已参加历史展会</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改观众信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">


        <el-row>
          <el-col :span="24" v-if="!shichangbuButton">
            <el-form-item label="观众姓名" prop="visitorName">
              <el-input v-model="form.visitorName" placeholder="请输入观众姓名" />
            </el-form-item>
            <!-- <el-form-item label="观众英文姓名" prop="visitorEname">
              <el-input v-model="form.visitorEname" placeholder="请输入观众英文姓名" />
            </el-form-item> -->
            <!-- <el-form-item label="性别" prop="visitorGender">
              <el-input v-model="form.visitorGender" placeholder="请输入性别" />
            </el-form-item> -->
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入公司名称" />
            </el-form-item>
            <!-- <el-form-item label="展商ID" prop="exhibitorId">
              <el-input v-model="form.exhibitorId" placeholder="请输入展商ID" />
            </el-form-item> -->
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="部门" prop="visitorDepartment">
              <el-input v-model="form.visitorDepartment" placeholder="请输入部门" />
            </el-form-item>
            <el-form-item label="职务" prop="visitorPost">
              <el-input v-model="form.visitorPost" placeholder="请输入职务" />
            </el-form-item>
            <el-form-item label="国家" prop="visitorCountry">
              <el-input v-model="form.visitorCountry" placeholder="请输入国家" />
            </el-form-item>
            <el-form-item label="省份" prop="visitorProvince">
              <el-input v-model="form.visitorProvince" placeholder="请输入省份" />
            </el-form-item>
            <el-form-item label="城市" prop="visitorCity">
              <el-input v-model="form.visitorCity" placeholder="请输入城市" />
            </el-form-item>
            <el-form-item label="地址" prop="visitorAddress">
              <el-input v-model="form.visitorAddress" placeholder="请输入地址" />
            </el-form-item>
            <!--  <el-form-item label="英文地址" prop="visitorEaddress">
              <el-input v-model="form.visitorEaddress" placeholder="请输入英文地址" />
            </el-form-item>
            <el-form-item label="邮编" prop="visitorZipcode">
              <el-input v-model="form.visitorZipcode" placeholder="请输入邮编" />
            </el-form-item> -->
            <el-form-item label="电话" prop="visitorTel">
              <el-input v-model="form.visitorTel" placeholder="请输入电话" />
            </el-form-item>
            <el-form-item label="手机号" prop="visitorPhone">
              <el-input v-model="form.visitorPhone" placeholder="请输入手机号" />
            </el-form-item>
            <!-- <el-form-item label="传真" prop="visitorFax">
              <el-input v-model="form.visitorFax" placeholder="请输入传真" />
            </el-form-item>
            <el-form-item label="Email" prop="visitorEmail">
              <el-input v-model="form.visitorEmail" placeholder="请输入Email" />
            </el-form-item>
            <el-form-item label="QQ" prop="visitorQq">
              <el-input v-model="form.visitorQq" placeholder="请输入QQ" />
            </el-form-item> -->
            <el-form-item label="微信" prop="visitorWechat">
              <el-input v-model="form.visitorWechat" placeholder="请输入微信" />
            </el-form-item>
            <!-- <el-form-item label="微信unionid" prop="unionid">
              <el-input v-model="form.unionid" placeholder="请输入微信unionid" />
            </el-form-item> -->
            <!-- <el-form-item label="微信头像">
              <image-upload v-model="form.avatar" />
            </el-form-item>
            <el-form-item label="其他联系方式" prop="visitorOther">
              <el-input v-model="form.visitorOther" placeholder="请输入其他联系方式" />
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" />
            </el-form-item> -->
            <el-form-item label="网址" prop="visitorWeburl">
              <el-input v-model="form.visitorWeburl" placeholder="请输入网址" />
            </el-form-item>
            <el-form-item label="所属行业" prop="industryId">
              <el-input v-model="form.industryId" placeholder="请输入所属行业" />
            </el-form-item>
            <el-form-item label="产品类别" prop="productCategory">
              <el-input v-model="form.productCategory" placeholder="请输入产品类别" />
            </el-form-item>
            <el-form-item label="岗位职责" prop="jobResp">
              <el-select v-model="form.jobResp" placeholder="请选择岗位职责">
                <el-option v-for="dict in dict.type.job_resp" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作性质" prop="jobNature">
              <el-select v-model="form.jobNature" placeholder="请选择工作性质">
                <el-option v-for="dict in dict.type.job_nature" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员类别" prop="visitorType">
              <el-select v-model="form.visitorType" placeholder="请选择人员类别">
                <el-option v-for="dict in dict.type.visitor_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员级别" prop="visitorLevel">
              <el-select v-model="form.visitorLevel" placeholder="请选择人员级别">
                <el-option v-for="dict in dict.type.visitor_level" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="推荐人" prop="referrer">
              <el-input v-model="form.referrer" placeholder="请输入推荐人" />
            </el-form-item> -->
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
                <el-radio v-for="dict in dict.type.zlf_status" :key="dict.value"
                  :label="dict.value">{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>


          </el-col>
          <el-col :span="24" v-if="shichangbuButton">
            <div style="font-weight: bold;margin-left:40px;color: red;">市场部功能</div>
            <div style="height: 20px;"></div>
            <el-form-item label="所属行业" prop="industryType">
              <el-select v-model="form.industryType" placeholder="请选择所属行业">
                <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="经营品类" prop="businessCategory">
              <el-select v-model="form.businessCategory" placeholder="请选择经营品类">
                <el-option v-for="dict in dict.type.business_category " :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="来源类别" prop="sourceType">
              <el-select v-model="form.sourceType" placeholder="请选择来源类别">
                <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="信息来源名称" prop="sourceName">
              <el-input v-model="form.sourceName" placeholder="请输入信息来源名称" />
            </el-form-item>

            <el-form-item label="企业规模" prop="companyScale">
              <el-input v-model="form.companyScale" type="number" placeholder="请输入企业规模">
                <template slot="append">星</template>
              </el-input>
            </el-form-item>

            <el-form-item label="选择审核人员" prop="examineUserId">
              <el-select v-model="form.examineUserId" placeholder="请选择审核人员">
                <el-option v-for="dict in shenherenList" :key="dict.userId" :label="dict.nickName"
                  :value="dict.userId"></el-option>
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>












      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="参加展会历史记录" :visible.sync="cjzhlsjAlert" width="80%" append-to-body>
      <el-table v-loading="loading" :data="attendExhList" highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="展会名称" align="center" prop="exhName" />
        <el-table-column label="公司名" align="center" prop="companyName" />
        <el-table-column label="团名称" align="center" prop="params.groupName" />
        <el-table-column label="团名称" align="center" prop="params.groupName" />
        <el-table-column label="采购情况" align="center" prop="purchaseSituation" />


        <el-table-column label="参观意见度" align="center" prop="opinionLevel">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.visitor_opinion_level" :value="scope.row.opinionLevel" />
          </template>
        </el-table-column>


        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="huifangInfoUpdateAlertClick(scope.row)"
              icon="el-icon-edit">回访结果录入</el-button>
          </template>
        </el-table-column>
      </el-table>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cjzhlsjAlert=false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 导入观众数据 -->
    <el-dialog title="导入观众数据" :visible.sync="fileOpen" width="50%" append-to-body>
      <el-form ref="form" :model="form_file" :rules="rules_file" label-width="130px">
        <el-form-item label="观众数据文件" prop="filePathIn">
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

    <!-- 修改回访数据 -->
    <el-dialog title="添加回访数据" :visible.sync="huifangAlert" width="50%" append-to-body>

      <el-form ref="form" :model="huifangInfo" :rules="rules" label-width="100px">





        <el-form-item label="展会名称" prop="visitorName">
          <el-input disabled v-model="huifangInfo.exhName" placeholder="请输入展会名称" />
        </el-form-item>




        <el-form-item label="姓名" prop="visitorName">
          <el-input v-model="huifangInfo.visitorName" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="手机号" prop="visitorName">
          <el-input v-model="huifangInfo.visitorPhone" disabled />
          <div style="color:blue" @click.stop="callPhone(huifangInfo.visitorPhone)">拨打电话</div>
        </el-form-item>


        <el-form-item label="采购情况" prop="visitorName">
          <el-input v-model="huifangInfo.purchaseSituation" placeholder="请输入采购情况" />
        </el-form-item>
        <el-form-item label="参观意见度" prop="opinionLevel">
          <el-select multiple v-model="huifangInfo.opinionLevel" placeholder="请选择参观意见度">
            <el-option v-for="dict in dict.type.visitor_opinion_level" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_hf">确 定</el-button>
        <el-button @click="cancel_fileopenCLick">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 补充观众数据 -->
    <el-dialog title="补充观众数据" :visible.sync="buchongAlert" width="80%" append-to-body>

      <el-form ref="form" :model="form" :rules="rules" label-width="100px">

        <el-form-item label="手机号" prop="visitorName">
          <el-input v-model="form.visitorPhone" disabled />
          <div style="color:blue" @click.stop="callPhone(form.visitorPhone)">拨打电话</div>
        </el-form-item>

        <el-form-item label="职务" prop="visitorPost">
          <el-input v-model="form.visitorPost" placeholder="请输入职务" />
        </el-form-item>

        <el-form-item label="所属行业" prop="industryType">
          <el-select v-model="form.industryType" placeholder="请选择所属行业">
            <el-option v-for="dict in dict.type.industry_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经营品类" prop="businessCategory">

          <div class="roww">
            <div class="roww ">
              <div style="margin-right: 10px;">已选择分类</div>

              :<div style="color: blue;">
                <el-tag style="margin-right: 10px;" v-for="(item,index) in oldType" :key="index" closable
                 @close="handleClose(item,index)"
                >
                  {{item}}
                </el-tag>
              </div>
            </div>
            <div style="width: 20px;"></div>
            <el-button type="primary" @click="addJyplType()">点击添加分类</el-button>
          </div>

          <div class="roww " style="margin-top: 20px;" v-for="(item,index) in jingyingpinleiList">
            <el-select v-model="selJyplIndex[index][0]" placeholder="请选择经营品类"
              @change="jingyingpinleiChange(1,$event,index)">
              <el-option v-for="dict in jingyingpinleiList[index][0] " :key="dict.id" :label="dict.categoryName"
                :value="dict.txt"></el-option>
            </el-select>
            <div style="width:10px"></div>
            <el-select v-model="selJyplIndex[index][1]" placeholder="请选择经营品类"
              @change="jingyingpinleiChange(2,$event,index)">
              <el-option v-for="dict in jingyingpinleiList[index][1] " :key="dict.id" :label="dict.categoryName"
                :value="dict.txt"></el-option>
            </el-select>
            <div style="width:10px"></div>
            <el-select v-model="selJyplIndex[index][2]" placeholder="请选择经营品类" multiple style="flex: 1;"
              @change="jingyingpinleiChange(3,$event,index)">
              <el-option v-for="dict in jingyingpinleiList[index][2] " :key="dict.id" :label="dict.categoryName"
                :value="dict.txt"></el-option>
            </el-select>
          </div>


        </el-form-item>








        <el-form-item label="来源类别" prop="sourceType">
          <el-select v-model="form.sourceType" placeholder="请选择来源类别">
            <el-option v-for="dict in dict.type.visitor_source_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信息来源名称" prop="sourceName">
          <el-input v-model="form.sourceName" placeholder="请输入信息来源名称" />
        </el-form-item>

        <el-form-item label="企业规模" prop="companyScale">
          <el-input v-model="form.companyScale" type="number" placeholder="请输入企业规模">
            <template slot="append">星</template>
          </el-input>
        </el-form-item>

        <el-form-item label="选择审核人员" prop="examineUserId">
          <el-select v-model="form.examineUserId" placeholder="请选择审核人员" @change="selShengePeoChange">
            <el-option v-for="dict in shenherenList" :key="dict.userId" :label="dict.nickName"
              :value="dict.userId"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toSubmitShicb">确 定</el-button>
        <el-button @click="cancel_fileopenCLick">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import {
    listVisitor_info,
    getVisitor_info,
    delVisitor_info,
    addVisitor_info,
    updateVisitor_info,
    visitor_exhhistory,
    visitor_infoimport,
    user_market_data_examinesubmit,
    user_market_data_examinecheck,
    allocatedList,
  } from "@/api/visitor/visitor_info";
  import {
    updateVisitor_exh,
  } from "@/api/visitor/visitor_exh";


  import {
    listExh_list
  } from "@/api/exh/exh_list";

  import {
    listExh_category,
  } from "@/api/exh/exh_category";

  export default {
    name: "Visitor_info",
    dicts: [
      'visitor_level',
      'industry_type',
      'visitor_opinion_level',
      'business_category',
      'job_resp',
      'zlf_status',
      'job_nature',
      'visitor_type',
      'visitor_source_type',
      'examine_status',
    ],
    data() {
      return {
        // 回访数据
        huifangAlert: false,
        //回访数据详情
        huifangInfo: {},
        shichangbuButton: false,
        //市场部补充数据对话框是否显示
        buchongAlert: false,
        // 观众数据
        fileOpen: false,
        // 表单参数
        form_file: {},
        // 表单校验
        rules_file: {},
        fileType: ["xls", 'xlsx', ],
        filePathIn: "", //文件导入地址存储



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
        // 观众信息表格数据
        visitor_infoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          visitorName: null,
          visitorEname: null,
          visitorGender: null,
          companyName: null,
          exhibitorId: null,
          idNumber: null,
          visitorDepartment: null,
          visitorPost: null,
          visitorCountry: null,
          visitorProvince: null,
          visitorCity: null,
          visitorAddress: null,
          visitorEaddress: null,
          visitorZipcode: null,
          visitorTel: null,
          visitorPhone: null,
          visitorFax: null,
          visitorEmail: null,
          visitorQq: null,
          visitorWechat: null,
          unionid: null,
          avatar: null,
          visitorOther: null,
          userName: null,
          password: null,
          visitorWeburl: null,
          industryId: null,
          productCategory: null,
          jobResp: null,
          jobNature: null,
          visitorType: null,
          visitorLevel: null,
          referrer: null,
          tag1: null,
          tag2: null,
          memo: null,
          status: null,

          exhId: null,
          industryType: null,
          businessCategory: null,
          sourceType: null,
          queryParams: null,
          examineStatus: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {},

        attendExhList: [], //观众出席展会的列表
        // 观众参加历史信息记录
        cjzhlsjAlert: false,
        exh_listList: [], //展会列表
        shenherenList: [], //审核人员列表
        // 审核
        shenheDaye: {
          applicantUserId: "",
          examineUserId: "",
          examineType: "1",
          visitorId: "",
          contentOld: "",
          contentNew: "",
        },
        updateBefore: "",

        jingyingpinleiList: [
          [
            [],
            [],
            [],
          ]
        ], //经营品类
        selJyplIndex: [
          [null, null, null]
        ], //经营品类选中的下标
        oldType: [], //以前选择经营分类


        // 搜索分类
        jingyingpinleiListSearch:[
            [],
            [],
            [],
          ],
        selJyplIndexSearch:
          [null, null, null]
        , //搜索选中的经营品类选中的下标


      };
    },
    created() {
      this.getList();
      this.getListZhlist();
      this.getShenge();
       this.getJingyingpinlei(1,"", 0,'search');
    },
    methods: {

      // 关闭标签
      handleClose(item,index){
        // console.log("关闭标签",item,index);
        // var list=[];
        // for(var a=0;a<this.oldType[a].length;a++){
        //   if(index!=a){
        //     list.push(this.oldType[a]);
        //   }
        // }
        // this.oldType=list;

         this.oldType.splice(this.oldType.indexOf(item), 1);

      },
      // 初始化
      clearData() {
        this.jingyingpinleiList = [
          [
            [],
            [],
            [],
          ]
        ];
        this.selJyplIndex = [
          [null, null, null]
        ];
      },

      // 增加分类
      addJyplType() {
        var alists = [
          [],
          [],
          []
        ]
        alists[0] = this.jingyingpinleiList[0][0];
        this.jingyingpinleiList.push(alists)
        var selindex = [null, null, null]
        this.selJyplIndex.push(selindex)

        this.$forceUpdate();
      },

      jingyingpinleiSearchChange(level, res) {
        if (level < 3) {
          res = res.split("--");
          if (level == 1) {
            this.selJyplIndexSearch[1] = null;
            this.selJyplIndexSearch[2] = null;
          }
          if (level == 2) {
            this.selJyplIndexSearch[2] = null;
          }
          this.getJingyingpinlei(level + 1, res[0], "",'search');
        }
      },

      //经营品类变动
      jingyingpinleiChange(level, res, hangIndex) {

        if (level < 3) {
          res = res.split("--");
          if (level == 1) {
            this.selJyplIndex[hangIndex][1] = null;
            this.selJyplIndex[hangIndex][2] = null;
          }
          if (level == 2) {
            this.selJyplIndex[hangIndex][2] = null;
          }
          this.getJingyingpinlei(level + 1, res[0], hangIndex,'update');
        }
      },
      // 获取经营品类  index   第几行分类
      getJingyingpinlei(level, parentId, index,typeGet) {
        var data = {
          pageNum: 1,
          pageSize: 1000,
          categoryLevel: level,
          categoryType: 4,
          parentId: parentId
        }

        listExh_category(data).then(response => {
          if (response.code == 200) {
            var list = response.rows;
            for (var a = 0; a < list.length; a++) {
              list[a].txt = list[a].id + "--" + list[a].categoryName
            }
            if(typeGet=='update'){
              this.jingyingpinleiList[index][level - 1] = list;
            }else{
               this.jingyingpinleiListSearch[level - 1] = list;
            }
            this.$forceUpdate();
          } else {
            this.$modal.msgError(response.info);
          }
        });
      },

      // 导入观众数据开发
      callPhone(phone) {
        window.location.href = "yhhl://call/num=" + phone + "&custom_key=index_gz"
      },

      // 审核姓名变动
      selShengePeoChange(res) {
        console.log("ePeoChange", res)
        // .userId" :label="dict.nickName"
        for (var a = 0; a < this.shenherenList.length; a++) {
          if (res == this.shenherenList[a].userId) {
            this.form.examineUserName = this.shenherenList[a].nickName
          }
        }
      },
      // 提交市场部修改的数据
      toSubmitShicb() {


        if (this.form.visitorPost == "") {
          this.$modal.msgError("请输入职位");
          return false;
        }
        if (!this.form.examineUserId) {
          this.$modal.msgError("请选择审核人员");
          return false;
        }
        if (!this.form.industryType) {
          this.$modal.msgError("请选择所属行业");
          return false;
        }
        // if (!this.form.businessCategory) {
        //   this.$modal.msgError("请选择经营品类");
        //   return false;
        // }
        console.log('selJyplIndex', this.selJyplIndex)
        var selJyplIndex = this.selJyplIndex;
        var txtTypes = [];
        for (var a = 0; a < selJyplIndex.length; a++) {
          if(selJyplIndex[a][2]){
            for (var b = 0; b < selJyplIndex[a][2].length; b++) {
              var typename = selJyplIndex[a][2][b].split("--")[1];
              txtTypes.push(typename);
            }
          }
        }
        console.log("txtTypes", txtTypes)
        console.log("oldType", this.oldType)
        var allTypes=txtTypes.concat(this.oldType);
        let allTypes1 = [...new Set(allTypes)];

        if(allTypes1.length<=0){
           this.$modal.msgError("请选择经营品类");
          return false;
        }

        this.form.businessCategory = allTypes1.join(",");
        console.log("--",allTypes1)


        var data = {
          applicantUserId: "", //申请人ID
          applicantUserName: "", //申请人姓名

          examineUserId: this.form.examineUserId,
          examineType: "1",
          visitorId: this.form.id,
          contentOld: this.updateBefore,
          contentNew: JSON.stringify(this.form),
          examineUserName: this.form.examineUserName, //审核人姓名
          visitorPost: this.form.visitorPost, //职位

        }
        user_market_data_examinesubmit(data).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess("提交成功，请等待审核");
            this.buchongAlert = false;
          } else {
            this.$modal.msgError(response.info);
          }
        });
      },
      // 获取审核人员数据
      getShenge() {
        var data = {
          roleId: 19
        }
        allocatedList(data).then(response => {
          console.log("获取审核人员数据", response)
          this.shenherenList = response.rows;
        });
      },
      // 判断数据是否可修改
      isUpdateData(info) {
        this.clearData();

        user_market_data_examinecheck({
          'visitorId': info.id
        }).then(response => {
          if (response.code == 200) {
            this.handleGetInfo(info);
          } else {
            this.$modal.msgError("数据审核中");
            this.buchongAlert = false;
          }
        });
      },

      handleGetInfo(row) {
        const id = row.id || this.ids
        getVisitor_info(id).then(response => {
          this.form = response.data;
          if (this.form.businessCategory) {
            console.log("----1111111",)
            this.oldType = this.form.businessCategory.split(",");
          } else {
             console.log("2222222",)
            this.oldType = [];
          }

          this.updateBefore = JSON.stringify(this.form);
          this.buchongAlert = true;
          this.getJingyingpinlei(1, null, 0,"update");
        });
      },

      // 获取展会列表
      getListZhlist() {
        var data = {
          pageNum: 1,
          pageSize: 1000,
        }
        listExh_list(data).then(response => {
          this.exh_listList = response.rows;
        });
      },

      // 提交回访数据
      submitForm_hf() {
        this.huifangInfo.opinionLevel = this.huifangInfo.opinionLevel.join(",");

        updateVisitor_exh(this.huifangInfo).then(response => {
          if (response.code == 200) {
            this.$modal.msgSuccess(response.msg);
            this.huifangAlert = false;
            this.getWjExhList(this.huifangInfo.visitorId);
          } else {
            this.$modal.msgSuccess(response.msg);
          }
        }).catch((res) => {
          console.log('aaaa', res);
        });
      },

      //弹出修改回访数据
      huifangInfoUpdateAlertClick(info) {
        console.log('弹出修改回访数据', info);
        // if(info.opinionLevel&&info.opinionLevel.length>0){
        //   info.opinionLevel= info.opinionLevel.split(",");
        // }
        this.huifangInfo = info;
        this.huifangAlert = true;
        console.log("观众报名数据", info);
      },

      // 导入文件
      submitForm_file() {
        var filepath = this.filePathIn;
        if (filepath == '') {
          this.$modal.msgError("请选择文件");
          return false;
        }
        var data = {
          file: filepath,
        }
        this.$modal.loading("正在导入数据，请稍后...");
        visitor_infoimport(data).then(response => {
          this.$modal.closeLoading();
          if (response.code == 200) {
            this.$modal.msgSuccess("导入成功");
            this.cancel_fileopenCLick();
          } else {
            this.$modal.msgSuccess(res.msg);
          }
        }).catch(() => {
          this.$modal.closeLoading();
        });
      },
      // 文件关闭
      cancel_fileopenCLick() {
        this.fileOpen = false;
        this.huifangAlert = false;
        this.buchongAlert = false;
      },
      // 弹出导入狂
      fileOpenClick() {
        this.fileOpen = !this.fileOpen;
      },
      // 下载模板
      downLoadFile() {
        // https://frdzlfapi.zsyflive.com/profile/zhanshang.xlsx
        this.$download.resource("/profile/guanzhongmodal.xlsx");
      },

      // 查询观众一参加展会列表
      getWjExhList(id) {
        var data = {
          id: id
        }
        visitor_exhhistory(data).then(response => {
          if (response.code == 200) {
            var list = response.data;
            for (var a = 0; a < list.length; a++) {
              var info = list[a]
              if (info.opinionLevel && info.opinionLevel.length > 0) {
                info.opinionLevel = info.opinionLevel.split(",");
              }
              list[a] = info;
            }
            this.attendExhList = list;
            this.cjzhlsjAlert = true;
          } else {
            this.$modal.msgSuccess(response.msg);
          }
        });
      },

      // 结束



      /** 查询观众信息列表 */
      getList() {
        this.loading = true;
        var queryParams = this.queryParams;
        var params = {};
        if (queryParams.exhId) {
          params.exhId = queryParams.exhId;
        }
        if (queryParams.examineStatus) {
          params.examineStatus = queryParams.examineStatus;
        }

        queryParams.params = params;

        // if(this.selJyplIndexSearch[2]){
        //   var selTypes=[];
        //   for(var a=0;a<this.selJyplIndexSearch[2].length;a++){
        //     console.log("sousuo搜素",this.selJyplIndexSearch[2]);
        //     selTypes.push(this.selJyplIndexSearch[2][a].split("--")[1]);
        //   }
        // }

        if(this.selJyplIndexSearch[2]){
          queryParams.businessCategory=this.selJyplIndexSearch[2].join(",");
        }

        console.log("queryParamsqueryParams",queryParams)

        listVisitor_info(queryParams).then(response => {
          this.visitor_infoList = response.rows;
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
          visitorName: null,
          visitorEname: null,
          visitorGender: null,
          companyName: null,
          exhibitorId: null,
          idNumber: null,
          visitorDepartment: null,
          visitorPost: null,
          visitorCountry: null,
          visitorProvince: null,
          visitorCity: null,
          visitorAddress: null,
          visitorEaddress: null,
          visitorZipcode: null,
          visitorTel: null,
          visitorPhone: null,
          visitorFax: null,
          visitorEmail: null,
          visitorQq: null,
          visitorWechat: null,
          unionid: null,
          avatar: null,
          visitorOther: null,
          userName: null,
          password: null,
          visitorWeburl: null,
          industryId: null,
          productCategory: null,
          jobResp: null,
          jobNature: null,
          visitorType: null,
          visitorLevel: null,
          referrer: null,
          tag1: null,
          tag2: null,
          memo: null,
          status: "0",
          delFlag: null,
          version: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,

          industryType: null,
          businessCategory: null,
          sourceType: null,
          sourceName: null,
          companyScale: null,
          examineUserId: null,

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
        this.shichangbuButton = false;
        this.reset();
        this.open = true;
        this.title = "添加观众信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row, type) {

        if (type == 1) {
          this.shichangbuButton = false;
        } else if (type == 2) {
          this.shichangbuButton = true;
        } else {
          this.shichangbuButton = false;
        }

        this.reset();
        const id = row.id || this.ids
        getVisitor_info(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改观众信息";
        });
      },




      /** 提交按钮 */
      submitForm() {

        if (this.shichangbuButton) {
          return false;
        }


        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateVisitor_info(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addVisitor_info(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除观众信息编号为"' + ids + '"的数据项？').then(function() {
          return delVisitor_info(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('visitor/visitor_info/export', {
          ...this.queryParams
        }, `visitor_info_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
