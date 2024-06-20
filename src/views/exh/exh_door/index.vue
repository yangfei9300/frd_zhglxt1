<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="展会ID" prop="exhId">
        <el-input
          v-model="queryParams.exhId"
          placeholder="请输入展会ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出入门名称" prop="doorName">
        <el-input
          v-model="queryParams.doorName"
          placeholder="请输入出入门名称"
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exh:exh_door:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exh:exh_door:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['exh:exh_door:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['exh:exh_door:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exh_doorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="展会项目ID" align="center" prop="exhType" /> -->
      <el-table-column label="展会" align="center" prop="params.exhName" />
      <el-table-column label="出入门名称" align="center" prop="doorName" />
      <el-table-column label="备注" align="center" prop="memo" />

      <el-table-column label="门禁码" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <vue-qr :logoSrc="scope.row.aa"
          :text='scope.row.params.exhName+"~"+scope.row.exhId+"~"+scope.row.id+"~"+scope.row.doorName'
          :size="150"></vue-qr>
        </template>
      </el-table-column>

      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['exh:exh_door:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['exh:exh_door:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-magic-stick"
            @click="makeQrcode(scope.row)"
            v-hasPermi="['exh:exh_door:remove']"
          >查看二维码</el-button>


        </template>
      </el-table-column>
    </el-table>
    <!--  style="position: fixed;right: 5000px;" -->
    <!-- <div class="colonn"
    id="qrcode1" v-if="isQrShow"
    >
      <div style="width: 200px;height: 200px;"  ref="qrcode" id="chajian">
      </div>
    </div> -->



    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改展会出入口对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="展会ID" prop="exhId">
          <el-input v-model="form.exhId" placeholder="请输入展会ID" />
        </el-form-item>
        <el-form-item label="出入门名称" prop="doorName">
          <el-input v-model="form.doorName" placeholder="请输入出入门名称" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listExh_door, getExh_door, delExh_door, addExh_door, updateExh_door } from "@/api/exh/exh_door";

import Qrcode from "qrcodejs2"
import vueQr from 'vue-qr'
export default {
  name: "Exh_door",
  components: {
              vueQr,Qrcode
          },
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
      // 展会出入口表格数据
      exh_doorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        exhType: null,
        exhId: null,
        doorName: null,
        memo: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      isQrShow:true,//是否显示二维码
      imageUrl:"",//二维码
    };
  },
  created() {
    this.getList();
  },
  methods: {

// 下载二维码
			downloadClick(info) {
				// 先找到canvas节点下的二维码图片
				const myCanvas = document.getElementById('qrcode1').getElementsByTagName('canvas')
				const img = document.getElementById('qrcode1').getElementsByTagName('img')
				// 创建一个a节点
				const a = document.createElement('a')
				// 设置a的href属性将canvas变成png格式
				const imgURL = myCanvas[0].toDataURL('image/jpg')
				const ua = navigator.userAgent
				if (ua.indexOf('Trident') !== -1 && ua.indexOf('Windows') !== -1) { // IE内核 并且  windows系统 情况下 才执行;
					var bstr = atob(imgURL.split(',')[1])
					var n = bstr.length
					var u8arr = new Uint8Array(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					const blob = new Blob([u8arr])
					window.navigator.msSaveOrOpenBlob(blob, '下载' + '.' + 'png')
				} else if (ua.indexOf('Firefox') > -1) { // 火狐兼容下载
					const blob = this.base64ToBlob(imgURL); //new Blob([content]);
					const evt = document.createEvent("HTMLEvents");
					evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
					a.download = ' '; //下载图片名称，如果填内容识别不到，下载为未知文件，所以我这里就不填为空
					a.href = URL.createObjectURL(blob);
					a.dispatchEvent(new MouseEvent('click', {
						bubbles: true,
						cancelable: true,
						view: window
					}));
				} else { // 谷歌兼容下载
					img.src = myCanvas[0].toDataURL('image/jpg')
					a.href = img.src


					// 设置下载文件的名字
					a.download = info.exhName+"__"+info.doorName + '二维码';
					// 点击
					a.click();

					this.$message({
						message: '下载成功，已保存到桌面',
						type: 'success'
					});
				}
        this.isQrShow=false;
        setTimeout(res=>{
          this.isQrShow=true;
        },1000)
			},

			// base64转blob
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;
				let uInt8Array = new Uint8Array(rawLength);
				for (let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}
				return new Blob([uInt8Array], {
					type: contentType
				});
			},


      // 生成二维码
       makeQrcode(row){
        console.log("生成二维码",row)

      },

    /** 查询展会出入口列表 */
    getList() {
      this.loading = true;
      listExh_door(this.queryParams).then(response => {
        this.exh_doorList = response.rows;
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
        exhType: null,
        exhId: null,
        doorName: null,
        memo: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加展会出入口";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExh_door(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改展会出入口";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExh_door(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExh_door(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除展会出入口编号为"' + ids + '"的数据项？').then(function() {
        return delExh_door(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('exh/exh_door/export', {
        ...this.queryParams
      }, `exh_door_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
