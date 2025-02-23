// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** analyzeByTime POST /api/chart/analyzeByTime */
export async function analyzeByTimeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyzeByTimeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChartVO_>('/api/chart/analyzeByTime', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
