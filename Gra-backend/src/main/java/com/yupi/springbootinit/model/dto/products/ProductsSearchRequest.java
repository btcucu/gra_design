package com.yupi.springbootinit.model.dto.products;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 烟草产品查询DTO
 * @TableName products
 */
@Data
public class ProductsSearchRequest implements Serializable {
    /**
     * 产品 ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 品牌
     */
    private String brand;

    /**
     * 规格
     */
    private String specification;

    /**
     * 最低价格
     */
    private BigDecimal minPrice;

    /**
     * 最高价格
     */
    private BigDecimal maxPrice;

    /**
     * 价位
     */
    private String price_level;

    /**
     * 当前库存量
     */
    private Integer current_stock;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}