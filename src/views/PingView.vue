<script setup>
import { onMounted, reactive, ref } from 'vue';
import { round, forEach, cloneDeep } from 'lodash';
import { useIndexData, useCurrentRoutePath } from '@/store';
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
  { prop: 'isLoading', label: '' , widthNum: 38 },
]);
let backRes = []

const citySelectObj = reactive({
  cityOptions: ['中国电信', '中国联通', '中国移动', '中国多线', '港澳台、海外'],
  checkedCities: ['中国电信', '中国联通', '中国移动', '中国多线', '港澳台、海外'],
  cities: ['中国电信', '中国联通', '中国移动', '中国多线', '港澳台、海外'],
  isIndeterminate: false,
  checkAll: true
})

const indexDataStore = useIndexData();
const currentRoutePathStore = useCurrentRoutePath();

onMounted(() => {
  handleGetDataByIdentify();
  handleIsCheckAll();
  currentRoutePathStore.setCurrentRoutePath('ping');
});

const handleSearchData = (searchValue) => {
  handleResetTableData();
  tableData.forEach((element) => {
    element.isLoading = true
    indexDataStore.searchPingData(element.addr, searchValue).then((res) => {
      if (res) {
        element.ip = res?.ip;
        element.AvgDelay = res?.ping?.AvgDelay ? round(res?.ping?.AvgDelay) : '';
        element.LossPk = res?.ping?.LossPk;
        element.MaxDelay = res?.ping?.MaxDelay ? round(res?.ping?.MaxDelay) : '';
        element.MinDelay = res?.ping?.MinDelay ? round(res?.ping?.MinDelay) : '';
        element.RevcPk = res?.ping?.RevcPk;
        element.SendPk = res?.ping?.SendPk;
      } else{
        element.ip = '-';
        element.AvgDelay = '-';
        element.LossPk = '-';
        element.MaxDelay = '-';
        element.MinDelay = '-';
        element.RevcPk = '-';
        element.SendPk = '-';
      }
      element.isLoading = false
    });
  });
};

const handleGetDataByIdentify = () => {
  indexDataStore.getPingData().then((res) => {
    if (res && res.length) {
      backRes = cloneDeep(res);
      tableData.push(...res);
    }
  });
};

const handleResetTableData = (newTableData) => {
  newTableData = newTableData ? newTableData : backRes;
  forEach(newTableData, (item, index) => {
    tableData[index] = cloneDeep(item)
  })
}

const handleCheckAllChange = (val) => {
  citySelectObj.checkedCities = val ? citySelectObj.cityOptions : [];
  citySelectObj.isIndeterminate = false;
}

const handleCheckedCitiesChange = (value) => {
  let checkedCount = value.length;
  citySelectObj.checkAll = checkedCount === citySelectObj.cities.length;
  citySelectObj.isIndeterminate = checkedCount > 0 && checkedCount < citySelectObj.cities.length;
}

const handleIsCheckAll = () => {
  citySelectObj.checkAll = citySelectObj.checkedCities.length === citySelectObj.cities.length;
}
</script>

<template>
  <div class="page-ping">
    <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
    <div class="city-select" style="width: 800px; margin: 0 auto;">
      <div class="checkbox-wrapper">
        <el-checkbox :indeterminate="citySelectObj.isIndeterminate" v-model="citySelectObj.checkAll"
          @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <div class="checkbox-wrapper">
        <el-checkbox-group v-model="citySelectObj.checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in citySelectObj.cities" :label="city" :key="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <EleBaseTable :table-data="tableData" :table-header="tableHeader"></EleBaseTable>
  </div>
</template>

<style lang="scss">
.checkbox-wrapper {
  display: inline-block;
  vertical-align: middle;

  &+.checkbox-wrapper {
    margin-left: 30px;
  }
}
</style>