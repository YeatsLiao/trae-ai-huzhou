import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const provinceEmotionData = [
  { name: '北京', value: 78, emotion: 'calm', emotionName: '平静' },
  { name: '天津', value: 72, emotion: 'calm', emotionName: '平静' },
  { name: '河北', value: 65, emotion: 'anxious', emotionName: '焦虑' },
  { name: '山西', value: 68, emotion: 'tired', emotionName: '疲惫' },
  { name: '内蒙古', value: 75, emotion: 'calm', emotionName: '平静' },
  { name: '辽宁', value: 62, emotion: 'sad', emotionName: '悲伤' },
  { name: '吉林', value: 60, emotion: 'sad', emotionName: '悲伤' },
  { name: '黑龙江', value: 58, emotion: 'sad', emotionName: '悲伤' },
  { name: '上海', value: 85, emotion: 'energetic', emotionName: '活力' },
  { name: '江苏', value: 82, emotion: 'happy', emotionName: '开心' },
  { name: '浙江', value: 84, emotion: 'happy', emotionName: '开心' },
  { name: '安徽', value: 70, emotion: 'calm', emotionName: '平静' },
  { name: '福建', value: 78, emotion: 'happy', emotionName: '开心' },
  { name: '江西', value: 66, emotion: 'anxious', emotionName: '焦虑' },
  { name: '山东', value: 76, emotion: 'happy', emotionName: '开心' },
  { name: '河南', value: 64, emotion: 'anxious', emotionName: '焦虑' },
  { name: '湖北', value: 74, emotion: 'calm', emotionName: '平静' },
  { name: '湖南', value: 77, emotion: 'happy', emotionName: '开心' },
  { name: '广东', value: 88, emotion: 'energetic', emotionName: '活力' },
  { name: '广西', value: 75, emotion: 'happy', emotionName: '开心' },
  { name: '海南', value: 86, emotion: 'happy', emotionName: '开心' },
  { name: '重庆', value: 68, emotion: 'angry', emotionName: '愤怒' },
  { name: '四川', value: 79, emotion: 'calm', emotionName: '平静' },
  { name: '贵州', value: 72, emotion: 'calm', emotionName: '平静' },
  { name: '云南', value: 80, emotion: 'happy', emotionName: '开心' },
  { name: '西藏', value: 76, emotion: 'calm', emotionName: '平静' },
  { name: '陕西', value: 65, emotion: 'tired', emotionName: '疲惫' },
  { name: '甘肃', value: 62, emotion: 'lost', emotionName: '迷茫' },
  { name: '青海', value: 70, emotion: 'calm', emotionName: '平静' },
  { name: '宁夏', value: 68, emotion: 'calm', emotionName: '平静' },
  { name: '新疆', value: 64, emotion: 'tired', emotionName: '疲惫' },
];

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

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const fetchMapData = async () => {
      try {
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        const mapData = await response.json();
        echarts.registerMap('china', mapData);
        renderChart();
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    const renderChart = () => {
      const lightTheme = theme === 'light';
      
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: lightTheme ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.95)',
          borderColor: lightTheme ? '#e5e7eb' : 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          textStyle: {
            color: lightTheme ? '#111827' : '#f1f5f9',
          },
          formatter: (params) => {
            const data = provinceEmotionData.find(d => d.name === params.name);
            if (!data) return params.name;
            return `
              <div style="padding: 8px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
                <div style="color: ${emotionColors[data.emotion]}; margin-bottom: 4px;">当前情绪: ${data.emotionName}</div>
                <div>情绪指数: ${data.value}</div>
              </div>
            `;
          },
        },
        visualMap: {
          min: 50,
          max: 90,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          textStyle: {
            color: lightTheme ? '#6b7280' : '#94a3b8',
          },
          inRange: {
            color: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#7c3aed', '#f472b6', '#ef4444'],
          },
          show: true,
          itemWidth: 12,
          itemHeight: 100,
          borderColor: lightTheme ? '#e5e7eb' : 'rgba(148, 163, 184, 0.2)',
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
              fontSize: 11,
              color: lightTheme ? '#374151' : '#cbd5e1',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
                color: lightTheme ? '#111827' : '#ffffff',
              },
              itemStyle: {
                areaColor: '#38bdf8',
                shadowBlur: 10,
                shadowColor: 'rgba(56, 189, 248, 0.5)',
              },
            },
            itemStyle: {
              areaColor: lightTheme ? '#f3f4f6' : '#1a1f35',
              borderColor: lightTheme ? '#d1d5db' : 'rgba(148, 163, 184, 0.2)',
              borderWidth: 1,
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

      chartInstance.current.on('click', (params) => {
        if (params.name && onProvinceSelect) {
          const data = provinceEmotionData.find(d => d.name === params.name);
          if (data) {
            onProvinceSelect(data);
          }
        }
      });
    };

    fetchMapData();

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [onProvinceSelect, selectedProvince, theme]);

  return (
    <div 
      ref={chartRef} 
      className="w-full aspect-[4/3] bg-bg-card/50 backdrop-blur-lg rounded-2xl border border-border overflow-hidden"
    />
  );
}

function getEmotionColor(emotion, value) {
  const baseColor = emotionColors[emotion] || '#9ca3af';
  const opacity = 0.3 + (value - 50) / 100 * 0.7;
  return hexToRgba(baseColor, opacity);
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export { provinceEmotionData };
