import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CountTracker = ({ gameId }) => {
    const [counts, setCounts] = useState([]);

    useEffect(() => {
        const countsRef = firebase.firestore().collection(`gameId/${gameId}/DifficultPages`);
        const unsubscribe = countsRef.onSnapshot((snapshot) => {
            const newCounts = snapshot.docs.map((doc) => ({
                name: doc.id,
                count: doc.data().count,
            }));
            setCounts(newCounts);
        });
        return unsubscribe;
    }, [gameId]);

    const maxY = Math.max(...counts.map((count) => count.count)) || 1;
    const yTicks = Array.from({ length: Math.ceil(maxY) + 1 }, (_, i) => i);

    const CustomYAxisTick = ({ x, y, payload }) => (
        <text x={x} y={y} dy={16} textAnchor="end" fill="#666" fontSize={14}>
            {payload.value}
        </text>
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = `Page ${label}`;
            const count = payload[0].value;
            return (
                <div className="custom-tooltip">
                    <p className="label">{value}</p>
                    <p className="count">{count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <div style={{ float: 'left',marginBottom: '10px',textAlign: 'left', fontWeight: "bold", fontSize: "20px", width: '100%' }}>
                Page Difficulty:
            </div>
            <div style={{ width: '600px', margin: '0 auto' }}>
                
                <BarChart width={600} height={450} data={counts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: 'Page Number', position: 'insideBottom', offset: -5, style: { fontSize: 14 } }} />
                    <YAxis
                        ticks={yTicks}
                        label={{
                            value: 'frequency',
                            angle: -90,
                            position: 'insideLeft',
                            fill: '#666',
                            fontSize: 14,
                        }}
                        tick={<CustomYAxisTick />}
                    />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: 'white', color: '#666', fontWeight: 'bold', fontSize: '14px' }} />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default CountTracker;
