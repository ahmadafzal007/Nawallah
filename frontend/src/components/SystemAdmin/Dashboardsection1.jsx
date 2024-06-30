import React, { useEffect, useState } from "react";
import "../../styles/font/font.css";
import { Grid, Container, Typography } from "@mui/material";
import { SouthOutlined } from "@mui/icons-material";
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
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config.jsx";
import AdminController from "../../API/Admin.js";

const Dashboardsection1 = () => {
  const [order, setorder] = useState();
  const [donations  ,setDonations] = useState();
  const [revenue, setRevenue] = useState();

  

  const getTotalDonations = async()=>{
      try {
          const response = await AdminController.getTotalDonations();
          console.log("response",response);
          setDonations(response.TotalDonations);
      } catch (error) {
          console.log("error",error);
      }
  }

  const getTotalOrders = async()=>{
      try {
          const response = await AdminController.getTotalOrders();
          console.log("response",response);
          setorder(response.TotalOrders);
          setRevenue(response.TotalPrice);
      } catch (error) {
          console.log("error",error);
      }
  }

 
  
  useEffect(() => {
 
    getTotalDonations();
    getTotalOrders();
  }, []);
  return (
    <div>
      <div className="grid  md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 mx-[25px] my-[17px]  md:gap-5  ">
        <div class=" flex flex-row rounded-xl w-[85%] lg:w-[100%]   justify-center items-center  shadow-md bg-costomFont ">
          <div>
            <div className="flex flex-row  gap-8 lg:gap-4 justify-center items-center  ">
              <div className="justify-center pl-9 md:pl-0 sm:pl-0 items-center">
                <div className="w-[80px] h-[60px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="77"
                    height="69"
                    viewBox="0 0 77 69"
                    fill="none"
                  >
                    <path
                      d="M37.7645 14.4199C36.9973 14.4199 36.3945 13.8122 36.3945 13.0387V9.55802C36.3945 5.80111 33.3804 2.76243 29.7088 2.76243C27.9004 2.76243 26.2564 3.48067 24.9411 4.75139C23.6259 6.02211 22.9683 7.73481 22.9683 9.55802V13.0387C22.9683 13.8122 22.3655 14.4199 21.5983 14.4199C20.8311 14.4199 20.2283 13.8122 20.2283 13.0387V9.55802C20.2283 7.01658 21.2147 4.64089 22.9683 2.81768C24.7767 0.994476 27.1332 0 29.654 0C34.8601 0 39.0797 4.25415 39.0797 9.50277V12.9834C39.1345 13.8122 38.5317 14.4199 37.7645 14.4199Z"
                      fill="#FFD497"
                    />
                    <path
                      d="M59.3008 60.9946H19.3511L12.7202 9.39233H56.506L59.3008 60.9946Z"
                      fill="#FF8A80"
                    />
                    <path
                      d="M19.3511 60.9946L9.87054 59.3371L0.335205 60.9946L3.18485 9.39233H16.5014L19.3511 60.9946Z"
                      fill="#CD4135"
                    />
                    <path
                      d="M36.7231 27.1824C31.517 27.1824 27.2974 22.9282 27.2974 17.6796V14.1989C27.2974 13.4255 27.9002 12.8177 28.6674 12.8177C29.4346 12.8177 30.0374 13.4255 30.0374 14.1989V17.6796C30.0374 21.4365 33.0514 24.42 36.7231 24.42C40.3947 24.42 43.4636 21.3813 43.4636 17.6244V14.1437C43.4636 13.3702 44.0664 12.7625 44.8336 12.7625C45.6008 12.7625 46.2036 13.3702 46.2036 14.1437V17.6244C46.2036 22.9282 41.984 27.1824 36.7231 27.1824Z"
                      fill="white"
                    />
                    <path
                      opacity="0.1"
                      d="M39.1895 53.9226C39.1895 56.464 39.8471 58.895 40.9979 60.9944H59.3561L58.2053 39.7789C56.8353 39.3369 55.4104 39.1159 53.9308 39.1159C45.7655 39.1159 39.1895 45.7458 39.1895 53.9226Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M61.5479 68.7292C69.6591 68.7292 76.2345 62.1001 76.2345 53.9226C76.2345 45.7451 69.6591 39.1159 61.5479 39.1159C53.4367 39.1159 46.8613 45.7451 46.8613 53.9226C46.8613 62.1001 53.4367 68.7292 61.5479 68.7292Z"
                      fill="#FF6154"
                    />
                    <path
                      d="M60.0133 59.6687C59.5749 59.6687 59.1913 59.503 58.8624 59.1715L54.2044 54.4753C53.5468 53.8123 53.5468 52.7626 54.2044 52.1549C54.862 51.4919 55.9032 51.4919 56.506 52.1549L60.0133 55.6908L66.5894 49.061C67.247 48.398 68.2882 48.398 68.891 49.061C69.5486 49.7239 69.5486 50.7737 68.891 51.3814L61.1641 59.1715C60.8353 59.503 60.3969 59.6687 60.0133 59.6687Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col py-[35px] md:py-8 sm:py-8 pr-16 lg:pr-8 md:pr-4 sm:pr-4">
                <h1 className=" text-[46px] selector  font-bold   text-white">
                  {revenue}
                </h1>

                <p class="text-white selector text-lg font-normal  ">
                  Total Revenue
                </p>
                <div className="flex flex-row gap-2 mt-2">
                  <div className=" rounded-full p-1 align-middle bg-[#ff5b5b26] justify-center items-center">
                    <div className="justify-center items-center align-middle">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <path
                          d="M1.01095 3.78625L2.76767 5.55733C2.86179 5.6522 2.98943 5.70549 3.12253 5.70549C3.25562 5.70549 3.38326 5.6522 3.47738 5.55733L5.23411 3.78625C5.32553 3.69081 5.37612 3.56299 5.37498 3.43031C5.37384 3.29764 5.32105 3.17072 5.22799 3.0769C5.13493 2.98308 5.00904 2.92986 4.87744 2.92871C4.74584 2.92755 4.61905 2.97856 4.52439 3.07074L3.62445 3.97803L3.62445 0.645366C3.62445 0.51116 3.57157 0.382451 3.47744 0.287554C3.38331 0.192656 3.25564 0.139343 3.12253 0.139343C2.98941 0.139343 2.86174 0.192656 2.76762 0.287554C2.67349 0.382451 2.62061 0.51116 2.62061 0.645365L2.62061 3.97803L1.72066 3.07074C1.626 2.97856 1.49921 2.92755 1.36761 2.92871C1.23601 2.92986 1.11012 2.98308 1.01706 3.0769C0.924001 3.17072 0.871215 3.29764 0.870072 3.43031C0.868928 3.56299 0.919519 3.69081 1.01095 3.78625Z"
                          fill="#FF6154"
                        />
                      </svg>
                    </div>
                  </div>
                  <p class=" text-xs font-normal selector  text-white ">
                    12% (30 days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class=" flex flex-row rounded-xl w-[85%] lg:w-[100%]   justify-center items-center  shadow-md bg-costomFont ">
          <div>
            <div className="flex flex-row  gap-8 lg:gap-4 justify-center items-center  ">
              <div className="justify-center pl-9 md:pl-0 sm:pl-0 items-center">
                <div className="w-[80px] h-[60px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="84"
                    height="61"
                    viewBox="0 0 84 61"
                    fill="none"
                  >
                    <path
                      d="M9.01807 61C13.4863 61 17.1372 57.3147 17.1372 52.8043V0H64.5444V52.8043C64.5444 57.3147 60.8935 61 56.4253 61"
                      fill="#FF8980"
                    />
                    <path
                      d="M48.3064 52.8044V46.5889H0.89917V52.8044C0.89917 57.3148 4.55007 61.0001 9.01834 61.0001H56.4255C51.9573 61.0001 48.3064 57.3148 48.3064 52.8044Z"
                      fill="#CD4135"
                    />
                    <path
                      d="M31.6867 10.5057H25.6382V13.146H31.6867V10.5057Z"
                      fill="#353535"
                    />
                    <path
                      d="M54.9542 10.5057H36.3728V13.146H54.9542V10.5057Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M31.6867 19.8564H25.6382V22.4967H31.6867V19.8564Z"
                      fill="#353535"
                    />
                    <path
                      d="M54.9542 19.8564H36.3728V22.4967H54.9542V19.8564Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M31.6867 29.2074H25.6382V31.8476H31.6867V29.2074Z"
                      fill="#353535"
                    />
                    <path
                      d="M54.9542 29.2074H36.3728V31.8476H54.9542V29.2074Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M31.6867 38.5581H25.6382V41.1984H31.6867V38.5581Z"
                      fill="#353535"
                    />
                    <path
                      d="M54.9542 38.5581H36.3728V41.1984H54.9542V38.5581Z"
                      fill="#F7C604"
                    />
                    <path
                      opacity="0.1"
                      d="M64.5444 38.9984V7.59079C63.8905 7.48079 63.1821 7.42578 62.4737 7.42578C53.8096 7.42578 46.7803 14.5214 46.7803 23.2671C46.7803 32.0128 53.8096 39.1084 62.4737 39.1084C63.1821 39.1634 63.8905 39.1084 64.5444 38.9984Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M67.9785 35.9734C76.6458 35.9734 83.6721 28.8809 83.6721 20.1319C83.6721 11.3829 76.6458 4.29047 67.9785 4.29047C59.3112 4.29047 52.2849 11.3829 52.2849 20.1319C52.2849 28.8809 59.3112 35.9734 67.9785 35.9734Z"
                      fill="#FF5B5B"
                    />
                    <path
                      d="M70.7569 21.2317V11.3859H65.1988V21.2317H61.4934L67.9778 28.8774L74.4623 21.2317H70.7569Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col py-[35px] md:py-8 sm:py-8 pr-16 lg:pr-8 md:pr-4 sm:pr-4">
                <h1 className=" text-[46px] selector  font-bold   text-white">
                 {order}
                </h1>

                <p class="text-white selector text-lg font-normal  ">
                  Total Orders
                </p>
                <div className="flex flex-row gap-2 mt-2">
                  <div className=" rounded-full p-1 align-middle bg-[#ff5b5b26] justify-center items-center">
                    <div className="justify-center items-center align-middle">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <path
                          d="M1.01095 3.78625L2.76767 5.55733C2.86179 5.6522 2.98943 5.70549 3.12253 5.70549C3.25562 5.70549 3.38326 5.6522 3.47738 5.55733L5.23411 3.78625C5.32553 3.69081 5.37612 3.56299 5.37498 3.43031C5.37384 3.29764 5.32105 3.17072 5.22799 3.0769C5.13493 2.98308 5.00904 2.92986 4.87744 2.92871C4.74584 2.92755 4.61905 2.97856 4.52439 3.07074L3.62445 3.97803L3.62445 0.645366C3.62445 0.51116 3.57157 0.382451 3.47744 0.287554C3.38331 0.192656 3.25564 0.139343 3.12253 0.139343C2.98941 0.139343 2.86174 0.192656 2.76762 0.287554C2.67349 0.382451 2.62061 0.51116 2.62061 0.645365L2.62061 3.97803L1.72066 3.07074C1.626 2.97856 1.49921 2.92755 1.36761 2.92871C1.23601 2.92986 1.11012 2.98308 1.01706 3.0769C0.924001 3.17072 0.871215 3.29764 0.870072 3.43031C0.868928 3.56299 0.919519 3.69081 1.01095 3.78625Z"
                          fill="#FF6154"
                        />
                      </svg>
                    </div>
                  </div>
                  <p class=" text-xs font-normal selector  text-white ">
                    12% (30 days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" flex flex-row rounded-xl  w-[85%] lg:w-[100%]  justify-center items-center  shadow-md bg-costomFont ">
          <div>
            <div className="flex  flex-row  gap-8 lg:gap-4 justify-center items-center  ">
              <div className="justify-center pl-9 md:pl-3 sm:pl-3 items-center">
                <div className="w-[80px] h-[60px] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="79"
                    height="62"
                    viewBox="0 0 79 62"
                    fill="none"
                  >
                    <path
                      d="M31.2011 3.05176e-05L0.00219727 12.8699L31.2011 25.7398L62.4001 12.8699L31.2011 3.05176e-05Z"
                      fill="#FF6154"
                    />
                    <path
                      d="M18.5379 5.25076L12.6658 7.61882L43.8647 20.5402L49.6858 18.1206L18.5379 5.25076Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M0.00219727 12.8701V48.3395L31.2011 61.2093V25.74L0.00219727 12.8701Z"
                      fill="#CD4135"
                    />
                    <path
                      d="M62.4001 12.8701V48.3395L31.2012 61.2093V25.74L62.4001 12.8701Z"
                      fill="#FF8980"
                    />
                    <path
                      opacity="0.1"
                      d="M62.4 30.9909C61.4809 30.7849 60.5618 30.682 59.5916 30.682C52.0344 30.682 45.907 36.8595 45.907 44.4785C45.907 48.0306 47.2346 51.2738 49.4303 53.6933L62.4 48.3394V30.9909Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M43.8647 20.5404V35.4179L49.6858 32.9984V18.1208L43.8647 20.5404Z"
                      fill="#F7C604"
                    />
                    <path
                      d="M65.1573 57.2453C72.7151 57.2453 78.8419 51.0684 78.8419 43.4488C78.8419 35.8292 72.7151 29.6523 65.1573 29.6523C57.5995 29.6523 51.4727 35.8292 51.4727 43.4488C51.4727 51.0684 57.5995 57.2453 65.1573 57.2453Z"
                      fill="#FF6154"
                    />
                    <path
                      d="M63.7281 48.8028C63.3196 48.8028 62.9622 48.6483 62.6558 48.3395L58.3155 43.9637C57.7028 43.3459 57.7028 42.3678 58.3155 41.8016C58.9283 41.1838 59.8984 41.1838 60.4601 41.8016L63.7281 45.0962L69.8556 38.9187C70.4683 38.3009 71.4385 38.3009 72.0002 38.9187C72.6129 39.5365 72.6129 40.5146 72.0002 41.0808L64.8004 48.3395C64.494 48.6483 64.1366 48.8028 63.7281 48.8028Z"
                      fill="white"
                    />
                    <path
                      d="M10.1126 43.5518L6.74251 36.5506L3.57666 40.7204L5.31277 41.4926V46.0228L8.12119 47.3098V42.7281L10.1126 43.5518Z"
                      fill="#F2F5F3"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col py-[35px] md:py-8 sm:py-8 pr-16 lg:pr-8 md:pr-4 sm:pr-4 ">
                <h1 className=" text-[46px] selector  font-bold   text-white">
                 {donations}
                </h1>

                <p class="text-white  selector text-lg font-normal  ">
                  Total Donations
                </p>
                <div className="flex flex-row gap-2 mt-2">
                  <div className=" rounded-full p-1 align-middle bg-[#ff5b5b26] justify-center items-center">
                    <div className="justify-center items-center align-middle">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <path
                          d="M1.01095 3.78625L2.76767 5.55733C2.86179 5.6522 2.98943 5.70549 3.12253 5.70549C3.25562 5.70549 3.38326 5.6522 3.47738 5.55733L5.23411 3.78625C5.32553 3.69081 5.37612 3.56299 5.37498 3.43031C5.37384 3.29764 5.32105 3.17072 5.22799 3.0769C5.13493 2.98308 5.00904 2.92986 4.87744 2.92871C4.74584 2.92755 4.61905 2.97856 4.52439 3.07074L3.62445 3.97803L3.62445 0.645366C3.62445 0.51116 3.57157 0.382451 3.47744 0.287554C3.38331 0.192656 3.25564 0.139343 3.12253 0.139343C2.98941 0.139343 2.86174 0.192656 2.76762 0.287554C2.67349 0.382451 2.62061 0.51116 2.62061 0.645365L2.62061 3.97803L1.72066 3.07074C1.626 2.97856 1.49921 2.92755 1.36761 2.92871C1.23601 2.92986 1.11012 2.98308 1.01706 3.0769C0.924001 3.17072 0.871215 3.29764 0.870072 3.43031C0.868928 3.56299 0.919519 3.69081 1.01095 3.78625Z"
                          fill="#FF6154"
                        />
                      </svg>
                    </div>
                  </div>
                  <p class=" text-xs font-normal selector  text-white ">
                    12% (30 days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class=" flex flex-row rounded-xl  w-[85%] lg:w-[100%]  justify-center items-center  shadow-md bg-costomFont ">
          <div>
            <div className="flex flex-row  gap-8 lg:gap-4 justify-center items-center  ">
              <div className="justify-center pl-9 md:pl-0 sm:pl-0 items-center">
                <div className="w-[80px] h-[60px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="77"
                    height="69"
                    viewBox="0 0 77 69"
                    fill="none"
                  >
                    <path
                      d="M37.7645 14.4199C36.9973 14.4199 36.3945 13.8122 36.3945 13.0387V9.55802C36.3945 5.80111 33.3804 2.76243 29.7088 2.76243C27.9004 2.76243 26.2564 3.48067 24.9411 4.75139C23.6259 6.02211 22.9683 7.73481 22.9683 9.55802V13.0387C22.9683 13.8122 22.3655 14.4199 21.5983 14.4199C20.8311 14.4199 20.2283 13.8122 20.2283 13.0387V9.55802C20.2283 7.01658 21.2147 4.64089 22.9683 2.81768C24.7767 0.994476 27.1332 0 29.654 0C34.8601 0 39.0797 4.25415 39.0797 9.50277V12.9834C39.1345 13.8122 38.5317 14.4199 37.7645 14.4199Z"
                      fill="#FFD497"
                    />
                    <path
                      d="M59.3008 60.9946H19.3511L12.7202 9.39233H56.506L59.3008 60.9946Z"
                      fill="#FF8A80"
                    />
                    <path
                      d="M19.3511 60.9946L9.87054 59.3371L0.335205 60.9946L3.18485 9.39233H16.5014L19.3511 60.9946Z"
                      fill="#CD4135"
                    />
                    <path
                      d="M36.7231 27.1824C31.517 27.1824 27.2974 22.9282 27.2974 17.6796V14.1989C27.2974 13.4255 27.9002 12.8177 28.6674 12.8177C29.4346 12.8177 30.0374 13.4255 30.0374 14.1989V17.6796C30.0374 21.4365 33.0514 24.42 36.7231 24.42C40.3947 24.42 43.4636 21.3813 43.4636 17.6244V14.1437C43.4636 13.3702 44.0664 12.7625 44.8336 12.7625C45.6008 12.7625 46.2036 13.3702 46.2036 14.1437V17.6244C46.2036 22.9282 41.984 27.1824 36.7231 27.1824Z"
                      fill="white"
                    />
                    <path
                      opacity="0.1"
                      d="M39.1895 53.9226C39.1895 56.464 39.8471 58.895 40.9979 60.9944H59.3561L58.2053 39.7789C56.8353 39.3369 55.4104 39.1159 53.9308 39.1159C45.7655 39.1159 39.1895 45.7458 39.1895 53.9226Z"
                      fill="#0C1E5B"
                    />
                    <path
                      d="M61.5479 68.7292C69.6591 68.7292 76.2345 62.1001 76.2345 53.9226C76.2345 45.7451 69.6591 39.1159 61.5479 39.1159C53.4367 39.1159 46.8613 45.7451 46.8613 53.9226C46.8613 62.1001 53.4367 68.7292 61.5479 68.7292Z"
                      fill="#FF6154"
                    />
                    <path
                      d="M60.0133 59.6687C59.5749 59.6687 59.1913 59.503 58.8624 59.1715L54.2044 54.4753C53.5468 53.8123 53.5468 52.7626 54.2044 52.1549C54.862 51.4919 55.9032 51.4919 56.506 52.1549L60.0133 55.6908L66.5894 49.061C67.247 48.398 68.2882 48.398 68.891 49.061C69.5486 49.7239 69.5486 50.7737 68.891 51.3814L61.1641 59.1715C60.8353 59.503 60.3969 59.6687 60.0133 59.6687Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col py-[35px] md:py-8 sm:py-8 pr-16 lg:pr-8 md:pr-4 sm:pr-4">
                <h1 className=" text-[46px] selector  font-bold   text-white">
                  128
                </h1>

                <p class="text-white selector text-lg font-normal  ">
                  Total Revenue
                </p>
                <div className="flex flex-row gap-2 mt-2">
                  <div className=" rounded-full p-1 align-middle bg-[#ff5b5b26] justify-center items-center">
                    <div className="justify-center items-center align-middle">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <path
                          d="M1.01095 3.78625L2.76767 5.55733C2.86179 5.6522 2.98943 5.70549 3.12253 5.70549C3.25562 5.70549 3.38326 5.6522 3.47738 5.55733L5.23411 3.78625C5.32553 3.69081 5.37612 3.56299 5.37498 3.43031C5.37384 3.29764 5.32105 3.17072 5.22799 3.0769C5.13493 2.98308 5.00904 2.92986 4.87744 2.92871C4.74584 2.92755 4.61905 2.97856 4.52439 3.07074L3.62445 3.97803L3.62445 0.645366C3.62445 0.51116 3.57157 0.382451 3.47744 0.287554C3.38331 0.192656 3.25564 0.139343 3.12253 0.139343C2.98941 0.139343 2.86174 0.192656 2.76762 0.287554C2.67349 0.382451 2.62061 0.51116 2.62061 0.645365L2.62061 3.97803L1.72066 3.07074C1.626 2.97856 1.49921 2.92755 1.36761 2.92871C1.23601 2.92986 1.11012 2.98308 1.01706 3.0769C0.924001 3.17072 0.871215 3.29764 0.870072 3.43031C0.868928 3.56299 0.919519 3.69081 1.01095 3.78625Z"
                          fill="#FF6154"
                        />
                      </svg>
                    </div>
                  </div>
                  <p class=" text-xs font-normal selector  text-white ">
                    12% (30 days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboardsection1;
