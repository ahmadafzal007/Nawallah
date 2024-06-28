import React from "react";
import AppStoreImg from "../../assets/app_store.png";
import PlayStoreImg from "../../assets/play_store.png";
import BgPng from "../../assets/appStore.png";

const backgroundStyle = {
  backgroundImage: `url(${BgPng})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const AppStore = () => {
  return (
    // <>
    //   <span id="join"></span>
    //   <div className="py-14" style={backgroundStyle}>
    //     <div className="container">
    //       <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-4">
    //         <div
    //           data-aos="fade-up"
    //           data-aos-duration="300"
    //           className="space-y-6 max-w-xl mx-auto"
    //         >
    //           {/* text section */}
    //           <h1 className="text-2xl text-center sm:text-left sm:text-4xl font-semibold text-black/90 pl-3">
    //             Nawalah is available for Android and IOS
    //           </h1>
    //           {/* img section */}
    //           <div className="flex flex-wrap justify-center sm:justify-start items-center">
    //             <a href="#">
    //               <img
    //                 src={PlayStoreImg}
    //                 alt="Play store"
    //                 className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
    //               />
    //             </a>
    //             <a href="#">
    //               <img
    //                 src={AppStoreImg}
    //                 alt="App store"
    //                 className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
    //               />
    //             </a>
    //           </div>
    //         </div>
    //         {/* Empty div */}
    //         <div></div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
    

<div class="w-72 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Order fast from anywhere</h5>
    <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Download the app today to help reduce food waste and support those in need in your community.</p>
    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      
        <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
            <svg class="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
            <div class="text-left rtl:text-right">
                <div class="mb-1 text-xs">Get in on</div>
                <div class="-mt-1 font-sans text-sm font-semibold">Google Play</div>
            </div>
        </a>
    </div>
</div>
</>
  );
};

export default AppStore;
