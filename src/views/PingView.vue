<script setup>
import { onMounted, reactive, ref } from 'vue';
import { round } from 'lodash';
import { useIndexData } from '@/store';
import SearchComponent from '@/components/SearchComponent.vue';
import EleBaseTable from '@/components/EleBaseTable.vue';

const tableData = reactive([]);
const identity = ref('ping');

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
  });
};
</script>

<template>
  <div class="page-ping">
    <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
    <EleBaseTable :table-data="tableData"></EleBaseTable>
  </div>
</template>

<style lang="scss">
.el-input {
  width: 100%;
  transition: width 0.4s ease-in-out;
}

.el-input--medium:focus {
  width: 70%;
}
</style>
