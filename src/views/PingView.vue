<script setup>
import { onMounted, reactive, ref } from 'vue';
import { round } from 'lodash';
import { useIndexData } from '@/store';
import SearchComponent from '@/components/SearchComponent.vue';
import EleBaseTable from '@/components/EleBaseTable.vue';

const tableData = reactive([]);
const tableHeader = reactive([
  { prop: 'name', label: '节点名称' },
  { prop: 'ip', label: '响应IP' },
  { prop: 'LossPk', label: '丢包' },
  { prop: 'SendPk', label: '发包' },
  { prop: 'RevcPk', label: '收包' },
  { prop: 'MaxDelay', label: '最慢(ms)' },
  { prop: 'AvgDelay', label: '平均(ms)' },
]);
const identity = ref('port');

const indexDataStore = useIndexData();

onMounted(() => {
  handleGetDataByIdentify();
});

const handleSearchData = (searchValue) => {
  console.log(identity.value);
  tableData.forEach((element) => {
    indexDataStore.searchPingData(element.addr, searchValue).then((res) => {
      element.ip = res?.ip;
      element.AvgDelay = res?.ping?.AvgDelay ? round(res?.ping?.AvgDelay) : '';
      element.LossPk = res?.ping?.LossPk;
      element.MaxDelay = res?.ping?.MaxDelay ? round(res?.ping?.MaxDelay) : '';
      element.MinDelay = res?.ping?.MinDelay ? round(res?.ping?.MinDelay) : '';
      element.RevcPk = res?.ping?.RevcPk;
      element.SendPk = res?.ping?.SendPk;
    });
  });
};

const handleGetDataByIdentify = () => {
  indexDataStore.getPingData().then((res) => {
    if (res && res.length) {
      tableData.push(...res);
    }
    console.log(tableData)
  });
};
</script>

<template>
  <div class="page-ping">
    <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
    <EleBaseTable :table-data="tableData" :table-header="tableHeader"></EleBaseTable>
  </div>
</template>
