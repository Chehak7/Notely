import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart,Pie ,PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { LuChartBar } from 'react-icons/lu';

function RechartSetUp({ charts }) {
    if (!charts || charts.length === 0) return null;
    const COLORS = ["#B9AEE0", "#A79CD6", "#F6DDE8", "#6B647F", "#C07B9F"];
    return (
        <div className='space-y-8'>

            {charts.map((chart, index) => (
                <div key={index} className='border border-[#E4DEF3] rounded-xl p-4 bg-[#FBF9F6]'>

                    <h4 className='font-semibold font-[Poppins] text-[#372F52] mb-3 flex items-center gap-2'>
                        <LuChartBar className="text-[#B9AEE0]" /> {chart.title}
                    </h4>

                    <div className='h-72'>

                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart dataKey={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}

                                    </Bar>
                                </BarChart>
                            )}


                            {chart.type === "line" && (
                                <LineChart dataKey={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone"
                                        dataKey="value"
                                        stroke="#B9AEE0"
                                        strokeWidth={3} />
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip />
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
