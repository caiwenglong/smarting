<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useIndexData } from '@/store';
import SearchComponent from '@/components/SearchComponent.vue';
import EleBaseTable from '@/components/EleBaseTable.vue';
import { handleGetIndexData } from '@/utils/common'
import { cloneDeep, forEach } from 'lodash';

const tableData = reactive([]);
const tableHeader = reactive([
  { prop: 'name', label: '节点名称' },
  { prop: 'ip', label: '响应IP:端口' },
  { prop: 'delay', label: '响应时间' },
  { prop: 'isLoading', label: '' },
]);
const identity = ref('port');
const backRes = [];
const indexDataStore = useIndexData();

onMounted(() => {
  handleGetDataByIdentify();
});

const handleSearchData = (searchValue) => {
  handleResetTableData();
  tableData.forEach((element) => {
    element.isLoading = true
    indexDataStore.searchPortData(element.addr, searchValue).then((res) => {
      let ip = res?.ip ? res?.ip : '';
      let port = res?.port ? res?.port : '';
      element.delay = res?.delay;
      if(ip && port) {
        element.ip = ip + ':' + port;
      } else if(ip) {
        element.ip = ip
      }
      element.isLoading = false
    });
  });
};

const handleGetDataByIdentify = async () => {
  let res = await handleGetIndexData();
  backRes.push(...res);
  tableData.push(...res);
};

const handleResetTableData = (newTableData) => {
  newTableData = newTableData ? newTableData : backRes;
  forEach(newTableData, (item, index) => {
    tableData[index] = cloneDeep(item)
  })
}

</script>

<template>
  <div class="page-port">
    <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
    <EleBaseTable :table-data="tableData" :table-header="tableHeader"></EleBaseTable>
  </div>
</template>
