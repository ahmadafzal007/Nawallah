import React, { useEffect, useState } from 'react';
import "../../styles/font/font.css";
import "../../styles/chart.css";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
import Admin from '../../API/Admin';
import { Timestamp as FirestoreTimestamp } from 'firebase/firestore';

const Dashboardsection2 = () => {
  const [order, setOrder] = useState([]); // Initialize order state
  const [orders, setOrders] = useState([]);

  const getTotalOrders = async () => {
    try {
      const response = await Admin.getTotalOrders();
      console.log("response", response);
      if (response.orders) {
        const data = transformRawData(response);
        setOrders(data);
      } else {
        console.error("Error: 'orders' is undefined in the response");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const transformRawData = (response) => {
    return response.orders.map(order => ({
      id: generateUniqueId(),
      totalPrice: order.totalPrice,
      timestamp: new FirestoreTimestamp(order.orderedAt._seconds, order.orderedAt._nanoseconds),
    }));
  }

  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  useEffect(() => {
    getTotalOrders();
  }, []); // Empty dependency array to run only once on component mount

  const datee = (timestamp) => {
    if (timestamp instanceof FirestoreTimestamp) {
      const date = timestamp.toDate();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-based in JS
      return { month, year };
    }
    return { month: 'Invalid', year: 'Invalid' };
  };

  const getMonthLabel = (monthNumber) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthNumber - 1];
  };

  const transformOrderData = (orderData) => {
    const monthlyData = {};

    for (let i = 1; i <= 12; i++) {
      monthlyData[i] = { month: getMonthLabel(i), totalPrice2023: 0, totalPrice2024: 0 };
    }

    orderData.forEach((order) => {
      const { month, year } = datee(order.timestamp);

      if (monthlyData[month]) {
        if (year === 2023) {
          monthlyData[month].totalPrice2023 += order.totalPrice;
        } else if (year === 2024) {
          monthlyData[month].totalPrice2024 += order.totalPrice;
        }
      }
    });

    return Object.values(monthlyData);
  };

  const monthlyChartData = transformOrderData(orders);

  return (
    <div className='w-full'>
      <div className='mx-[25px] my-[25px] lg:w-[96%] w-[80%] py-10 rounded-[14px] bg-costomFont'>
        <div className='flex px-[80px] py-[25px] flex-row justify-between'>
          <h1 className='text-white selector text-[22px] font-bold'>Total Revenue</h1>
          <div className='flex flex-row gap-6'>
            <div className='flex flex-row gap-1'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#2D9CDB" />
                </svg>
              </div>
              <h1 className='text-white selector text-sm font-normal'>2023</h1>
            </div>
            <div className='flex flex-row gap-1'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#FF6154" />
                </svg>
              </div>
              <h1 className='text-white selector text-sm font-normal'>2024</h1>
            </div>
          </div>
        </div>

        <div id="chart" className='mx-20 md:mx-5 sm:mx-3'>
          <div style={{ height: 300 }} className='md:w-full w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyChartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis
                  axisLine={{ stroke: 'white' }}
                  tickLine={{ stroke: 'white' }}
                  tick={{ fill: 'white' }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  strokeWidth={4}
                  dataKey="totalPrice2024"
                  stroke="#FF6154"
                  activeDot={{ r: 8 }}
                />
                <Bar dataKey="pv" barSize={2} fill="#FFFFFF" />
                <Line
                  type="monotone"
                  dataKey="totalPrice2023"
                  stroke="white"
                  strokeWidth={4}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboardsection2;
