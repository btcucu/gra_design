import {Button, message, Modal, Space} from "antd";
import React, {useState, useRef, useEffect} from "react";
import {analyzeByTimeUsingPost} from "@/services/swagger/chartController";
import { Line, Column } from '@ant-design/charts';

const App: React.FC = () => {

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('lastMonth');
  const [selectedFeather, setSelectedFeather] = useState<string>('brand');
  const [datasource, setDatasource] = useState<API.ChartVO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [detailType, setDetailType] = useState<'specification' | 'region'>('specification');

  // 添加图表引用
  const mainChartRef = useRef<any>(null);
  const detailChartRef = useRef<any>(null);

  // 添加数据预处理函数
const processData = (data: API.ChartVO[], selectedFeather: string) => {
  // 使用 Map 来统计每个组合的数量
  const countMap = new Map<string, Map<string, number>>();
  
  data.forEach((item) => {
    const date = item.date || '';
    const featherValue = item[selectedFeather as keyof API.ChartVO] || '';
    
    if (!countMap.has(date)) {
      countMap.set(date, new Map());
    }
    
    const dateMap = countMap.get(date)!;
    dateMap.set(featherValue, (dateMap.get(featherValue) || 0) + 1);
  });

  // 获取所有日期并排序
  const sortedDates = Array.from(countMap.keys()).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // 转换为图表所需的数据格式
  const processedData: {
    date: string;
    count: number;
    [key: string]: string | number;
  }[] = [];

  // 使用排序后的日期进行数据转换
  sortedDates.forEach(date => {
    const dateMap = countMap.get(date)!;
    dateMap.forEach((count, featherValue) => {
      processedData.push({
        date,
        count,
        [selectedFeather]: featherValue,
      });
    });
  });

  return processedData;
};

// 添加柱状图数据处理函数
const processBarData = (data: API.ChartVO[], selectedFeather: string) => {
  const countMap = new Map<string, number>();
  
  data.forEach((item) => {
    const featherValue = item[selectedFeather as keyof API.ChartVO] || '';
    countMap.set(featherValue, (countMap.get(featherValue) || 0) + 1);
  });

  return Array.from(countMap.entries()).map(([key, value]) => ({
    [selectedFeather]: key,
    count: value
  }));
};

  // 处理原始数据
  const chartData = processData(datasource, selectedFeather);

  // 处理柱状图数据
  const barData = processBarData(datasource, selectedFeather);

    // 添加调试信息
    useEffect(() => {
      console.log('Current barData:', barData);
      console.log('Selected Feature:', selectedFeather);
    }, [barData, selectedFeather]);

  const getDatasource = async (time: any) => {
    const res = await analyzeByTimeUsingPost({time: time})
    if (res.code === 0) {
      setDatasource(res.data)
    } else {
      message.error(res.message);
    }
  }

  // 当选中品牌时，立即处理并设置数据
  useEffect(() => {
    if (isModalVisible && selectedBrand) {
      const newData = processDetailData(datasource, selectedBrand, detailType);
      setDetailData(newData);
    }
  }, [isModalVisible, selectedBrand, detailType]);

  // 修改点击事件处理
  const handleBarClick = (event: any, currentFeather: string) => {
    if (currentFeather !== 'brand') {
      return;
    }

    const clickedData = event.data?.data;
    if (clickedData) {
      const brand = clickedData[currentFeather];
      if (brand) {
        setSelectedBrand(brand);
        const initialData = processDetailData(datasource, brand, 'specification');
        setDetailData(initialData);
        setDetailType('specification');
        setIsModalVisible(true);
      }
    }
  };

  // 优化数据处理函数
  const processDetailData = (data: API.ChartVO[], brand: string, type: 'specification' | 'region') => {
    if (!brand || !data?.length) return [];
    
    // 先过滤出选中品牌的数据
    const brandData = data.filter(item => item.brand === brand);
    if (!brandData.length) return [];
    
    // 统计数量
    const countMap = new Map<string, number>();
    brandData.forEach((item) => {
      const key = item[type] || '未知';
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });

    // 转换为数组并排序
    return Array.from(countMap.entries())
      .map(([key, value]) => ({
        [type]: key,
        count: value
      }))
      .sort((a, b) => b.count - a.count);
  };

  // 处理切换类型
  const handleTypeChange = (newType: 'specification' | 'region') => {
    setDetailType(newType);
    const newData = processDetailData(datasource, selectedBrand, newType);
    setDetailData(newData);
  };

  return (
    <>
      <div style={{marginBottom: 16}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <Button.Group>
            <Button
              type={selectedTimeRange === 'lastMonth' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastMonth')
                  getDatasource('lastMonth')
                }
              }
            >
              过去一个月
            </Button>
            <Button
              type={selectedTimeRange === 'lastSeason' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastSeason')
                  getDatasource('lastSeason')
                }
              }
            >
              过去一个季度
            </Button>
            <Button
              type={selectedTimeRange === 'lastYear' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastYear')
                  getDatasource('lastYear')
                }
              }
            >
              过去一年
            </Button>
          </Button.Group>

          <Button.Group>
            <Button
              type={selectedFeather === 'brand' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('brand')}
            >
              品牌
            </Button>
            <Button
              type={selectedFeather === 'specification' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('specification')}
            >
              规格
            </Button>
            <Button
              type={selectedFeather === 'region' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('region')}
            >
              地区
            </Button>
          </Button.Group>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <Line
              data={chartData}
              xField='date'
              yField='count'
              seriesField={selectedFeather}
              colorField={selectedFeather}
              color={[
                '#1979C9',
                '#D62A0D',
                '#FAA219',
                '#67C23A',
                '#E6A23C',
                '#F56C6C',
                '#909399',
                '#2F4F4F',
                '#800080',
                '#4169E1'
              ]}
              axis={{
                x: {
                  title: '日期'
                },
                y: {
                  title: '销量'
                }
              }}
              legend={{
                position: 'top'
              }}
              smooth={true}
              animation={{
                appear: {
                  animation: 'path-in',
                  duration: 1000
                }
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Column
              data={barData}
              xField={selectedFeather}
              yField='count'
              color='#1979C9'
              label={{
                position: 'top'
              }}
              xAxis={{
                label: {
                  autoRotate: true,
                  autoHide: false,
                  autoEllipsis: true
                }
              }}
              axis={{
                x: {
                  title: '类别'
                },
                y: {
                  title: '销量'
                }
              }}
              animation={{
                appear: {
                  animation: 'fade-in',
                  duration: 1000
                }
              }}
              onEvent={(chart, event) => {
                if (event.type === 'click') {
                  handleBarClick(event, selectedFeather);
                }
              }}
              interactions={selectedFeather === 'brand' ? [
                { type: 'element-active' }
              ] : []}
              style={{
                cursor: selectedFeather === 'brand' ? 'pointer' : 'default'
              }}
            />
            {selectedFeather === 'brand' && (
              <div style={{ textAlign: 'center', marginTop: 8, color: '#666' }}>
                点击柱状图查看详细数据
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={`${selectedBrand} 详细数据`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setDetailData([]);  // 关闭时清空数据
        }}
        footer={null}
        width={800}
      >
        <div style={{ marginBottom: 16 }}>
          <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type={detailType === 'specification' ? 'primary' : 'default'}
              onClick={() => handleTypeChange('specification')}
            >
              查看规格分布
            </Button>
            <Button 
              type={detailType === 'region' ? 'primary' : 'default'}
              onClick={() => handleTypeChange('region')}
            >
              查看区域分布
            </Button>
          </Space>
        </div>

        <div style={{ height: 400 }}>
          {detailData.length > 0 ? (
            <Column
              data={detailData}
              xField={detailType}
              yField='count'
              color='#1979C9'
              label={{
                position: 'top',
                style: {
                  fontSize: 12
                }
              }}
              xAxis={{
                label: {
                  autoRotate: true,
                  autoHide: false,
                  autoEllipsis: true,
                  style: {
                    fontSize: 12
                  }
                }
              }}
              yAxis={{
                label: {
                  style: {
                    fontSize: 12
                  }
                }
              }}
              animation={{
                appear: {
                  animation: 'fade-in',
                  duration: 1000
                }
              }}
            />
          ) : (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              color: '#999' 
            }}>
              暂无数据
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default App;
