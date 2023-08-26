// src/reportWebVitals.js
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const sendToAnalytics = () => {
  // 여기에 성능 데이터를 분석하거나 보내는 로직을 추가할 수 있습니다.
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);

export default sendToAnalytics