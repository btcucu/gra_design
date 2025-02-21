package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.model.entity.CustomerOrders;
import com.yupi.springbootinit.service.CustomerOrdersService;
import com.yupi.springbootinit.mapper.CustomerOrdersMapper;
import org.springframework.stereotype.Service;

/**
* @author 25020
* @description 针对表【customer_orders(客户订单表)】的数据库操作Service实现
* @createDate 2025-02-21 10:52:25
*/
@Service
public class CustomerOrdersServiceImpl extends ServiceImpl<CustomerOrdersMapper, CustomerOrders>
    implements CustomerOrdersService{

}




