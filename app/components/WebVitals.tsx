'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Replace this with your analytics service
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value}`);
    
    // Color code the console output based on rating
    const rating = metric.rating || 'good';
    const colors = {
      good: 'color: green',
      'needs-improvement': 'color: orange',
      poor: 'color: red'
    };
    
    console.log(
      `%c${metric.name} (${rating}): ${metric.value.toFixed(2)}`,
      colors[rating]
    );
  }
  
  // In production, send to your analytics service
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.delta),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating
    });
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaced FID in web-vitals v5
    onLCP(sendToAnalytics);
    
    // Other Web Vitals
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}