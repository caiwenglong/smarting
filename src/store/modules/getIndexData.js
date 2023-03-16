import { defineStore } from 'pinia';
import IndexData from '@/api/apiGetIndexData';

export const useIndexData = defineStore('indexData', {
  state: () => ({
    code: 1,
    data: [],
    msg: '',
  }),
  actions: {
    getPingData() {
      const result = IndexData.apiGetPingData().then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
        return [];
      });
      return result;
    },

    searchPingData(ip, searchValue) {
      const result = IndexData.apiSearchPingData(ip, searchValue).then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
        return [];
      });
      return result;
    },

    searchPortData(ip, searchValue) {
      const result = IndexData.apiSearchPortData(ip, searchValue).then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
        return [];
      });
      return result;
    },

    searchDomainData(ip, searchValue) {
      const result = IndexData.apiSearchPortData(ip, searchValue).then((res) => {
        console.log(res)
        if (res.status === 200) {
          return res.data.data;
        }
        return [];
      });
      return result;
    },
  },
});
