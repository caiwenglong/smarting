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
          <el-table-column type="selection" width="38" />
          <el-table-column v-for="(item, index) in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.widthNum ? item.widthNum : ''">
            <template v-if="item.prop === 'isLoading'" v-slot:default="scope">
              <!-- <el-button v-if="scope.row.isLoading" type="text" size="small" disabled>加载中...</el-button> -->
              <div v-if="scope.row[item.prop]" class="is-loading">
                <el-icon class="is-loading">
                  <Loading />
                </el-icon>
              </div>
              <div v-else>

              </div>
            </template>
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

.is-loading {
  text-align: center;
}
</style>
