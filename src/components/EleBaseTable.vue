<script setup>
defineProps({
  tableData: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="table-result">
    <el-row>
      <el-col :span="24">
        <el-table ref="multipleTableRef" :data="tableData" :border="true" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column label="节点名称">
            <template #default="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column property="ip" label="响应IP" />
          <el-table-column property="LossPk" label="丢包" />
          <el-table-column property="SendPk" label="发包" />
          <el-table-column property="RevcPk" label="收包" />
          <el-table-column property="MinDelay" label="最快(ms)" />
          <el-table-column property="MaxDelay" label="最慢(ms)" />
          <el-table-column property="AvgDelay" label="平均(ms)" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.table-result {
  width: 1080px;
  margin: 42px auto;
}
</style>
