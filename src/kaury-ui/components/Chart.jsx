import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { theme } from '../theme';

const chartColors = [
  theme.colors.primary[400],
  theme.colors.secondary[400],
  theme.colors.success[400],
  theme.colors.warning[400],
  theme.colors.error[400],
  theme.colors.primary[300],
  theme.colors.secondary[300],
  theme.colors.success[300],
];

export const Chart = ({ 
  type = 'bar',
  data = [],
  height = 300,
  className = '',
  colors = chartColors,
  ...props 
}) => {
  const commonProps = {
    width: '100%',
    height,
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
            />
            <YAxis 
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: `1px solid ${theme.colors.gray[200]}`,
                borderRadius: theme.borderRadius.md,
                boxShadow: theme.shadows.md,
              }}
            />
            <Bar 
              dataKey="value" 
              fill={colors[0]} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
            />
            <YAxis 
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: `1px solid ${theme.colors.gray[200]}`,
                borderRadius: theme.borderRadius.md,
                boxShadow: theme.shadows.md,
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors[0]} 
              strokeWidth={3}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart width="100%" height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: `1px solid ${theme.colors.gray[200]}`,
                borderRadius: theme.borderRadius.md,
                boxShadow: theme.shadows.md,
              }}
            />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};