package com.yupi.springbootinit.model.vo;

import lombok.Data;

/**
 * 分析图表相关数据VO
 */
@Data
public class ChartVO {

    /**
     * 日期
     */
    private String date;

    /**
     * 品牌
     */
    private String brand;

    /**
     * 规格
     */
    private String specification;

    /**
     * 区域
     */
    private String region;

}
