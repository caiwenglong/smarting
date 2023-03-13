<script setup>
defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  tableHeader: {
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
          <el-table-column v-for="(item, index) in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label">

          </el-table-column>
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
