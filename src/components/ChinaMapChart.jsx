import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { provinceEmotionData } from '../data/mockData';

const emotionColors = {
  happy: '#fbbf24',
  calm: '#38bdf8',
  anxious: '#9ca3af',
  sad: '#7c3aed',
  angry: '#ef4444',
  lost: '#64748b',
  tired: '#f97316',
  energetic: '#22d3ee',
};

export default function ChinaMapChart({ onProvinceSelect, selectedProvince, theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;

    let isMounted = true;
    
    const initChart = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // 使用一个更稳定的 GeoJSON 源，或者添加重试逻辑
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const mapData = await response.json();
        
        if (!isMounted) return;
        
        echarts.registerMap('china', mapData);
        
        if (!chartInstance.current) {
          chartInstance.current = echarts.init(chartRef.current);
        }
        
        renderChart();
        setLoading(false);
      } catch (error) {
        console.error('Failed to load map data:', error);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    const renderChart = () => {
      if (!chartInstance.current) return;
      
      const lightTheme = theme === 'light';
      
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: lightTheme ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.95)',
          borderColor: lightTheme ? '#e5e7eb' : 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 0,
          textStyle: {
            color: lightTheme ? '#111827' : '#f1f5f9',
          },
          formatter: (params) => {
            const data = provinceEmotionData.find(d => d.name === params.name);
            if (!data) return params.name;
            return `
              <div style="padding: 12px; border-radius: 12px;">
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: ${lightTheme ? '#111827' : '#f1f5f9'}">${params.name}</div>
                <div style="display: flex; items-center; gap: 6px; margin-bottom: 4px;">
                  <span style="color: ${emotionColors[data.emotion]}">●</span>
                  <span style="color: ${lightTheme ? '#4b5563' : '#94a3b8'}">当前情绪: ${data.emotionName}</span>
                </div>
                <div style="color: ${lightTheme ? '#6b7280' : '#64748b'}; font-size: 12px;">情绪指数: ${data.value}</div>
              </div>
            `;
          },
        },
        visualMap: {
          min: 50,
          max: 90,
          left: 20,
          bottom: 20,
          text: ['高', '低'],
          textStyle: {
            color: lightTheme ? '#6b7280' : '#94a3b8',
            fontSize: 10
          },
          inRange: {
            color: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#7c3aed', '#f472b6', '#ef4444'],
          },
          show: true,
          itemWidth: 10,
          itemHeight: 80,
        },
        series: [
          {
            name: '情绪指数',
            type: 'map',
            map: 'china',
            roam: true,
            zoom: 1.2,
            center: [104, 36],
            label: {
              show: true,
              fontSize: 9,
              color: lightTheme ? '#4b5563' : '#94a3b8',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                color: lightTheme ? '#111827' : '#ffffff',
              },
              itemStyle: {
                areaColor: '#38bdf8',
                shadowBlur: 15,
                shadowColor: 'rgba(56, 189, 248, 0.4)',
              },
            },
            itemStyle: {
              areaColor: lightTheme ? '#f3f4f6' : '#1a1f35',
              borderColor: lightTheme ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
              borderWidth: 0.5,
            },
            data: provinceEmotionData.map(item => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                areaColor: getEmotionColor(item.emotion, item.value),
              },
            })),
          },
        ],
      };

      chartInstance.current.setOption(option);

      chartInstance.current.off('click');
      chartInstance.current.on('click', (params) => {
        if (params.name && onProvinceSelect) {
          const data = provinceEmotionData.find(d => d.name === params.name);
          if (data) {
            onProvinceSelect(data);
          }
        }
      });
    };

    initChart();

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [onProvinceSelect, theme, retryCount]);

  useEffect(() => {
    if (chartInstance.current) {
      // 当选中省份变化时，更新地图高亮
      // 这里可以根据需要添加逻辑
    }
  }, [selectedProvince]);

  return (
    <div className="relative w-full aspect-[4/3] bg-bg-card/50 backdrop-blur-lg rounded-2xl border border-border overflow-hidden shadow-card">
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-card/40 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-sky animate-spin mb-3" />
          <p className="text-sm text-text-secondary font-medium">正在加载地图数据...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-card/60 backdrop-blur-md px-6 text-center">
          <AlertCircle className="w-10 h-10 text-pink mb-3" />
          <p className="text-base font-bold text-text-primary mb-2">地图加载失败</p>
          <p className="text-xs text-text-tertiary mb-4">可能是网络连接问题，请尝试重新加载</p>
          <button 
            onClick={() => setRetryCount(c => c + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-sky text-white rounded-xl text-sm font-bold shadow-lg hover:bg-sky/90 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            重试加载
          </button>
        </div>
      )}
      
      <div 
        ref={chartRef} 
        className="w-full h-full"
      />
    </div>
  );
}

function getEmotionColor(emotion, value) {
  const baseColor = emotionColors[emotion] || '#9ca3af';
  const opacity = 0.4 + (value - 50) / 100 * 0.6;
  return hexToRgba(baseColor, opacity);
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export { provinceEmotionData };

