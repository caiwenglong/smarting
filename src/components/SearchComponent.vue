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
    <el-row :gutter="20">
      <el-col :span="16">
        <el-input v-model="searchValue" placeholder="请输入域名或IP，例如：example.com 、8.8.8.8" size="large">
        </el-input>
      </el-col>
      <el-col :span="8"
        ><el-button type="primary" size="large" :icon="Search" @click="handleSearchData()">检测一下</el-button></el-col
      >
    </el-row>
  </div>
</template>

<style lang="scss">
#searchInputWrapper {
  position: relative;
  margin: 64px auto;
  width: 800px;
}
</style>
