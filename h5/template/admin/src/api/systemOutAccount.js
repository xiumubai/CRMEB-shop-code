// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from '@/libs/request';

/**
 * @description 列表
 * @param {Object} param data {Object} 传值参数
 */
export function accountListApi(data) {
  return request({
    url: '/setting/system_out_account/index',
    method: 'get',
    params: data,
  });
}

/**
 * @description 对外账号 修改状态
 * @param {Object} param data {Object} 传值
 */
export function setShowApi(data) {
  return request({
    url: `setting/system_out_account/set_status/${data.id}/${data.status}`,
    method: 'PUT',
  });
}

/**
 * @description 添加对外账号
 * @param {Object} param data {Object} 传值
 */
export function outSaveApi(data) {
  return request({
    url: `setting/system_out_account/save`,
    method: 'post',
    params: data
  });
}

/**
 * @description 修改对外账号
 * @param {Object} param id {Number} 账号ID
 * @param {Object} param data {Object} 传值
 */
export function outSavesApi(id, data) {
  return request({
    url: `setting/system_out_account/update/${id}`,
    method: 'post',
    params: data
  });
}