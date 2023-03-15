<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

defineProps({
  tableData: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['handleSearchData']);

const searchValue = ref('');

const handleSearchData = () => {
  emit('handleSearchData', searchValue.value);
};
</script>

<template>
  <div id="searchInputWrapper">
    <div class="vertical-middle search-input-wrapper">
      <el-input v-model="searchValue" placeholder="请输入域名或IP，例如：example.com 、8.8.8.8" size="large">
      </el-input>
    </div>
    <div class="vertical-middle btn-search-warpper"><el-button type="primary" size="large" :icon="Search" @click="handleSearchData()">检测一下</el-button></div>
  </div>
</template>

<style lang="scss">
#searchInputWrapper {
  position: relative;
  margin: 64px auto 16px;
  width: 800px;
}

.search-input-wrapper {
  width: 80%;
}
.btn-search-warpper {
  margin-left: 2%;
  width: 10%;
}
</style>
