
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useIndexData, useCurrentRoutePath } from '@/store';
import SearchComponent from '@/components/SearchComponent.vue';
import EleBaseTable from '@/components/EleBaseTable.vue';
import { handleGetIndexData, handleTurnEmpty } from '@/utils/common'
import { cloneDeep, forEach } from 'lodash';

const tableData = reactive([]);
const tableHeader = reactive([
    { prop: 'name', label: '节点名称' },
    { prop: 'ip', label: '响应IP' },
    { prop: 'status', label: '状态' },
    { prop: 'totalTime', label: '总耗时' },
    { prop: 'lookUp', label: '解析' },
    { prop: 'connect', label: '连接' },
    { prop: 'appConnect', label: 'SSL握手' },
    { prop: 'redirect', label: '重定向', widthNum: 180 },
    { prop: 'isLoading', label: '', widthNum: 38  },
]);
const backRes = [];
const indexDataStore = useIndexData();
const currentRoutePathStore = useCurrentRoutePath();

onMounted(() => {
    handleGetDataByIdentify();
    currentRoutePathStore.setCurrentRoutePath('domain')
});

const handleSearchData = (searchValue) => {
    handleResetTableData();
    tableData.forEach((element) => {
        element.isLoading = true
        indexDataStore.searchDomainData(element.addr, searchValue).then((res) => {
            if (res) {
                element.ip = res?.remote_ip ? res.remote_ip : '';
                element.status = res?.http_code ? res.http_code : '';
                element.totalTime = handleTurnEmpty(res?.time_total, 'ms');
                element.lookUp = handleTurnEmpty(res?.time_namelookup, 'ms');
                element.connect = handleTurnEmpty(res?.time_connect, 'ms');
                element.appConnect = handleTurnEmpty(res?.time_appconnect, 'ms');
                element.redirect = handleTurnEmpty(res?.num_redirects, `次(耗时：${res?.time_redirect}ms)`);
            } else {
                element.ip = '-';
                element.status = '-';
                element.totalTime = '-';
                element.lookUp = '-';
                element.connect = '-';
                element.appConnect = '-';
                element.redirect = '-';
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
    <div class="page-domain">
        <SearchComponent @handle-search-data="handleSearchData"></SearchComponent>
        <EleBaseTable :table-data="tableData" :table-header="tableHeader"></EleBaseTable>
    </div>
</template>
