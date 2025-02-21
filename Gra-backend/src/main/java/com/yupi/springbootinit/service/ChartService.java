package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.vo.ChartVO;

import java.util.List;

/**
 * 数据分析服务
 */
public interface ChartService {

    /**
     * 根据时间分析数据
     * @param time
     * @return
     */
    List<ChartVO> analyzeByTime(String time);
}
