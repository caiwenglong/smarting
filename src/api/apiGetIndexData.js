import { get } from '@/utils/request';

export default class IndexData {
  /**
   * 获取ping接口数据
   * @returns
   */
  static async apiGetPingData() {
    return get('/api//v1/topology');
  }

  /**
   * 根据搜索条件查询数据
   * @param {*} searchValue 搜索的值
   * @returns
   */
  static async apiSearchPingData(ip, searchValue) {
    return get(`/api/v1/tools/proxy?url=http://${ip}/api/v1/tools/ping?ip=${searchValue}`);
  }

  /**
   * 根据搜索条件查询数据
   * @param {*} ip 目标网站的IP
   * @param {*} searchValue 搜索的值
   * @returns
   */
  static async apiSearchPortData(ip, searchValue) {
    return get(`/api/v1/tools/proxy?url=http://${ip}/api/v1/tools/port?addr=${searchValue}`);
  }

  /**
   * 根据搜索条件查询数据
   * @param {*} ip 目标网站的IP
   * @param {*} searchValue 搜索的值
   * @returns
   */
  static async apiSearchPortData(ip, searchValue) {
    return get(`/api/v1/tools/proxy?url=http://${ip}/api/v1/tools/domain?url=${searchValue}`);
  }

}
