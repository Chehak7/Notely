import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LuChartBar } from 'react-icons/lu'
import { useTheme } from '../context/ThemeContext'

const COLORS = ['#4ECDC4', '#5B7FFF', '#E9EA6B', '#3DBFB4', '#7C9BFF']

function RechartSetUp({ charts }) {
  const { isDark } = useTheme()

  if (!charts || charts.length === 0) return null

  const themeColors = isDark
    ? {
        axis: '#CBD5E1',
        grid: '#334155',
        tooltipBg: '#0F172A',
        tooltipBorder: '#334155',
        tooltipText: '#F8FAFC',
        cursor: '#243041',
        line: '#5EEAD4',
      }
    : {
        axis: '#6B7280',
        grid: '#E5E7EB',
        tooltipBg: '#FFFFFF',
        tooltipBorder: '#E5E7EB',
        tooltipText: '#1A1A2E',
        cursor: '#F8FAFC',
        line: '#4ECDC4',
      }

  const tooltipStyle = {
    backgroundColor: themeColors.tooltipBg,
    border: `1px solid ${themeColors.tooltipBorder}`,
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
    color: themeColors.tooltipText,
  }

  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={themeColors.axis}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        fontSize={12}
        fontWeight={600}
      >
        {`${name} ${Math.round(percent * 100)}%`}
      </text>
    )
  }

  return (
    <div className='space-y-8'>
      {charts.map((chart, index) => (
        <div key={index} className='border border-ds-border rounded-[24px] p-6 bg-ds-surface shadow-sm'>
          <h4 className='font-semibold font-heading text-ds-text mb-4 flex items-center gap-2 text-lg'>
            <LuChartBar className='text-ds-accent' /> {chart.title}
          </h4>

          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              {chart.type === 'bar' && (
                <BarChart data={chart.data}>
                  <CartesianGrid stroke={themeColors.grid} vertical={false} />
                  <XAxis dataKey='name' stroke={themeColors.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={themeColors.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: themeColors.cursor }}
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: themeColors.tooltipText, fontWeight: 600 }}
                    itemStyle={{ color: themeColors.tooltipText }}
                  />
                  <Bar dataKey='value' radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, itemIndex) => (
                      <Cell key={itemIndex} fill={COLORS[itemIndex % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {chart.type === 'line' && (
                <LineChart data={chart.data}>
                  <CartesianGrid stroke={themeColors.grid} vertical={false} />
                  <XAxis dataKey='name' stroke={themeColors.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={themeColors.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: themeColors.tooltipText, fontWeight: 600 }}
                    itemStyle={{ color: themeColors.tooltipText }}
                  />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke={themeColors.line}
                    strokeWidth={3}
                    dot={{ fill: themeColors.line, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: themeColors.line }}
                  />
                </LineChart>
              )}

              {chart.type === 'pie' && (
                <PieChart>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: themeColors.tooltipText, fontWeight: 600 }}
                    itemStyle={{ color: themeColors.tooltipText }}
                  />
                  <Pie
                    data={chart.data}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={100}
                    labelLine={false}
                    label={renderPieLabel}
                  >
                    {chart.data.map((_, itemIndex) => (
                      <Cell key={itemIndex} fill={COLORS[itemIndex % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RechartSetUp
