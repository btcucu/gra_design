package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.vo.BrandAnalysisResult;
import com.yupi.springbootinit.model.vo.ChartVO;
import com.yupi.springbootinit.service.BrandAnalysisService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 品牌分析柱状图接口
 */
@RestController
@RequestMapping
@Slf4j
public class BrandAnalysisController {

    @Resource
    private BrandAnalysisService brandAnalysisService;

    @GetMapping("/brand-analysis")
    public BaseResponse analyzeBrand(@RequestParam String brandName) {
        if (StringUtils.isEmpty(brandName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BrandAnalysisResult result = brandAnalysisService.analyzeBrand(brandName);
        return ResultUtils.success(result);
    }
}