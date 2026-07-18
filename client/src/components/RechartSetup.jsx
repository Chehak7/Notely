import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart,Pie ,PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { LuChartBar } from 'react-icons/lu';

function RechartSetUp({ charts }) {
    if (!charts || charts.length === 0) return null;
    const COLORS = ["#4ECDC4", "#3B5FE3", "#E9EA6B", "#3DBFB4", "#5B7FFF"];
    return (
        <div className='space-y-8'>

            {charts.map((chart, index) => (
                <div key={index} className='border border-ds-border rounded-[24px] p-6 bg-white shadow-sm'>

                    <h4 className='font-semibold font-heading text-ds-text mb-4 flex items-center gap-2 text-lg'>
                        <LuChartBar className="text-ds-accent" /> {chart.title}
                    </h4>

                    <div className='h-72'>

                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Bar>
                                </BarChart>
                            )}


                            {chart.type === "line" && (
                                <LineChart data={chart.data}>
                                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                    <Line type="monotone"
                                        dataKey="value"
                                        stroke="#4ECDC4"
                                        strokeWidth={3}
                                        dot={{fill: '#4ECDC4', strokeWidth: 2, r: 4}}
                                        activeDot={{r: 6, strokeWidth: 0}} />
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                    <Pie data={chart.data}

                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label>
                                            {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Pie> 
                                </PieChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            ))
            }
        </div >
    )
}
export default RechartSetUp
