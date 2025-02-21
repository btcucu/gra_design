package com.yupi.springbootinit.model.dto.products;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 烟草产品编辑新增DTO
 * @TableName products
 */
@Data
public class ProductsRequest implements Serializable {

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
     * 价格
     */
    private BigDecimal price;

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