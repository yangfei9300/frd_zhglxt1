<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table  :data="pdaList">
      <el-table-column label="门" align="center" prop="doorName" />
      <el-table-column label="人次" align="center" prop="params.logCount" />
    </el-table>


  </div>
</template>

<script>
  import {
    doornumpda
  } from "@/api/visitor/xianchang";

  export default {
    name: "Exhibitor_arrive",
    data() {
      return {
        queryParams: {},
        showSearch: true,
        pdaList: [],
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        var newExhInfo = this.$ls.get("selExhInfo");
        var data = {
          'exhId': newExhInfo.id,
          pageSize: 100000,
        }
        doornumpda(data).then(response => {
          console.log(" response.data", response.rows)
          this.pdaList = response.rows;
        });
      }
    }
  };
</script>
