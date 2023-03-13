<script setup>
import { onMounted, reactive, ref } from 'vue';
import { round } from 'lodash';
import { useIndexData } from '@/store';
import SearchComponent from '@/components/SearchComponent.vue';
import EleBaseTable from '@/components/EleBaseTable.vue';

const tableData = reactive([]);
const tableHeader = reactive([
  { prop: 'name', label: '节点名称' },
  { prop: 'ip', label: '响应IP:端口' },
  { prop: 'delay', label: '响应时间' },
]);
const identity = ref('port');

const indexDataStore = useIndexData();

onMounted(() => {
  handleGetDataByIdentify();
});

const handleSearchData = (searchValue) => {
  tableData.forEach((element) => {
    indexDataStore.searchPortData(element.addr, searchValue).then((res) => {
      let ip = res?.ip ? res?.ip : '';
      let port = res?.port ? res?.port : '';
      element.delay = res?.delay;
      if(ip && port) {
        element.ip = ip + ':' + port;
      } else if(ip) {
        element.ip = ip
      }
    });
  });
};

const handleGetDataByIdentify = () => {
  indexDataStore.getPingData().then((res) => {
    if (res && res.length) {
      tableData.push(...res);
    }
  });
};
</script>

<template>
  <div class="page-port">
    <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
    <EleBaseTable :table-data="tableData" :table-header="tableHeader"></EleBaseTable>
  </div>
</template>
