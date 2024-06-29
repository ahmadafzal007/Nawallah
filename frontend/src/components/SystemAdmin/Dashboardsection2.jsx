import React, { useEffect } from 'react'
import "../../styles/font/font.css"
import ApexCharts from 'apexcharts'
import "../../styles/chart.css"
import ReactApexChart from 'react-apexcharts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar, Area, ComposedChart  } from 'recharts';
import { useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
 
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
const data = [
  {
    name: "Jan",
    2023: 20,
    pv: 40,
    2022: 10
  },
  {
    name: "Feb",
    2023: 30,
    pv: 40,
    2022: 20
  },
  {
    name: "Mar",
    2023: 10,
    pv: 40,
    2022: 20
  },
  {
    name: "Apr",
    2023: 30,
    pv: 40,
    2022: 30
  },
  {
    name: "May",
    2023: 40,
    pv: 40,
    2022: 20
  },
  {
    name: "Jun",
    2023: 20,
    pv: 40,
    2022: 30
  },
  {
    name: "Jul",
    2023: 30,
    pv: 40,
    2022: 20
  },
  {
    name: "Aug",
    2023: 40,
    pv: 40,
    2022: 20
  },
  {
    name: "Sep",
    2023: 30,
    pv: 40,
    2022: 10
  },
  {
    name: "Oct",
    2023: 10,
    pv: 40,
    2022: 30
  },
  {
    name: "Nov",
    2023: 30,
    pv: 40,
    2022: 30
  },
  {
    name: "Dec",
    2023: 30,
    pv: 40,
    2022: 20
  }
];


  const Dashboardsection2 = () => {
      const [order,setorder] = useState()
      const [orders,setorders] = useState()
  const getAllOrders= async () => {
    const startDate = new Timestamp(1672531263,0);
  const endDate =  new Timestamp(1704049140,999999999);
    const addOrder = query(collection(firestore,   "orders"));
    const getData = await getDocs(addOrder);
    // console.log(TableHeader)
   
    setorder(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


    };

    const getAllOrders2022= async () => {
      const startDate = new Timestamp(1640995200, 0);
    const endDate =  new Timestamp(1672531199, 999999999);
      const addOrder = query(collection(firestore,   "orders"),where('timestamp', '>=', startDate), where('timestamp', '<=', endDate));
      const getData = await getDocs(addOrder);
      // console.log(TableHeader)
     
      setorders(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
  
      };

   
    useEffect(() => {
      getAllOrders()
      getAllOrders2022()
   
   
   }, []);

   const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   const datee= (unix)=>{
   if (unix) {
    const date = unix.toDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    return { month, year };
  }

  // Handle the case where the timestamp is undefined or null
  return 'Invalid Timestamp';
};
const transformOrderData = (orderData) => {
  const monthlyData = {};

  // Initialize data for all 12 months
  for (let i = 1; i <= 12; i++) {
    monthlyData[i] = { month: getMonthLabel(i), totalPrice2023: 0, totalPrice2024: 0 };
  }

  // Loop through the orders and accumulate total prices for each month and year
  orderData?.forEach((order) => {
    const { month, year } = datee(order.timestamp);

    if (monthlyData[month]) {
     
      if (year === 2023) {
        monthlyData[month].totalPrice2023 += order.totalPrice;
      } else if (year === 2024) {
        monthlyData[month].totalPrice2024 += order.totalPrice;
      }
    }
  });

  // Convert the data into an array of objects
  const monthlyChartData = Object.values(monthlyData);

  return monthlyChartData;
};
const getMonthLabel = (monthNumber) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return monthNames[monthNumber - 1]; // Adjust monthNumber to 0-based index
};
  //  const transformOrderData = (orderData) => {
  //   const monthlyData = {};
  
  //   // Loop through the orders and group them by month
  //   order?.forEach((order) => {
  //     const { month, year } = datee(order.timestamp);
  //   const monthYear = `${year}-${month}`; // Format as "YYYY-MM"

      
  
  //     if (!monthlyData[monthYear]) {
  //       monthlyData[monthYear] = 0;
  //     }
  
  //     monthlyData[monthYear] += order.totalPrice; // Accumulate total prices for the month
  //   });
  
  //   // Convert the data into an array of objects
  //   const monthlyChartData = Object.keys(monthlyData).map((monthYear) =>  {
  //     const [year, month] = monthYear.split('-');
  //     return {
  //       monthA: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       monthYear,
  //       year,
  //        month,
  //       totalPrice: monthlyData[monthYear],
  //       pv: monthlyData[monthYear],
  //     };
  //   });
  // console.log(monthlyChartData)
  //   return monthlyChartData;
  // };


 const monthlyChartData = transformOrderData(order);


 const transformOrderData2022 = (orderData) => {
   
  const monthlyData = {};

  // Loop through the orders and group them by month
  orders?.forEach((order) => {
      const month = datee(order.timestamp)
  
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += order.totalPrice; // Accumulate total prices for the month
  });

  // Convert the data into an array of objects
  const monthlyChartData = Object.keys(monthlyData).map((month) => ({
    
    totalPrice: monthlyData[month],
  }));
 
  return monthlyChartData;
};


const monthlyChartData2022 = transformOrderData(orders);
      return (
        <div className='w-full'>
<div className=' mx-[25px]  my-[25px] lg:w-[96%] w-[80%] py-10 rounded-[14px] bg-costomFont '>
<div className='flex px-[80px] py-[25px] flex-row justify-between'>
<h1 className='text-white selector text-[22px] font-bold'>Total Revenue</h1>
<div className='flex flex-row gap-6'>
    <div className='flex flex-row gap-1'>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
  <circle cx="7.5" cy="7.5" r="7.5" fill="#2D9CDB"/>
</svg></div>
        <h1 className='text-white selector text-sm font-normal'>2023</h1>
    </div>
    <div className='flex flex-row'>
    <div className='flex flex-row gap-1'>
        <div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
  <circle cx="7.5" cy="7.5" r="7.5" fill="#FF6154"/>
</svg></div>
        <h1 className='text-white selector text-sm font-normal'>2024</h1>
    </div>
</div>
</div>
</div>


  <div id="chart" className='mx-20 md:mx-5 sm:mx-3' >
  <div style={{  height: 300 ,  }} className='md:w-full w-full'>
  <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
          
             
          data={monthlyChartData}
              margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="month" />
              <YAxis 
  axisLine={{ stroke: 'white' }} // Example: Red axis line
  tickLine={{ stroke: 'white' }} // Example: Red tick lines
  tick={{ fill: 'white' }} // Example: Red tick labels
/>
              <Tooltip />
             
              <Line
                type="monotone"
                strokeWidth={4}
                dataKey="totalPrice2024"
                stroke="white"
                activeDot={{ r: 8 }}
                // data={monthlyChartData.filter(data => data.year == 2023)}
    
     
              />
                 <Bar dataKey="pv" barSize={2} fill="#FFFFFF" />
               <Line
                type="monotone"
                dataKey="totalPrice2023"
                stroke="white"
                strokeWidth={4}
                // data={monthlyChartData.filter(data => data.year == 2022)}
    
     
              /> 
            </ComposedChart>
          </ResponsiveContainer>
          </div>
  {/* <Chart type='bar' data={data} height={100} className='h-[250px] lg:h-[200px]' />; */}
{/* <ReactApexChart className="" options={this.state.options} series={this.state.series} type="line" height={350}   /> */}
</div>
</div>

</div>
      );
    }
  

  export default Dashboardsection2