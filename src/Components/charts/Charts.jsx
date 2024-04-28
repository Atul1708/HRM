import './Charts.scss'
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "jan", Total: 1100
    },
    {
        name: "feb", Total: 900
    },
    {
        name: "mar", Total: 1300
    },
    {
        name: "may", Total: 700
    },
    {
        name: "apr", Total: 800
    },
    {
        name: "jun", Total: 1200
    },
]

const Charts = ({ aspect, title }) => {
    return (
        <div className='chart'>
            <div className='title'>{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke='gray' />
                    {/* <YAxis /> */}
                    <CartesianGrid strokeDasharray="3 3" className='chartsGrid' />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Charts
