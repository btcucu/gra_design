package com.yupi.springbootinit.service.impl;

import com.yupi.springbootinit.mapper.CustomerOrdersMapper;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.ChartVO;
import com.yupi.springbootinit.service.ChartService;
import com.yupi.springbootinit.service.CustomerOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 数据分析服务实现
 */
@Service
public class ChartServiceImpl implements ChartService {

    @Resource
    private CustomerOrdersMapper customerOrdersMapper;


    @Override
    public List<ChartVO> analyzeByTime(String time) {
        TimeEnum enumByText = TimeEnum.getEnumByText(time);
        if (enumByText != null) {
            Long timestamp = enumByText.getValue();
            Date now = new Date();
            Date before = new Date(now.getTime() - timestamp);
            return customerOrdersMapper.listByTime(before, now);
        }
        return Collections.emptyList();
    }
}
