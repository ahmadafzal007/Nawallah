import React from "react";
import AppStoreImg from "../../assets/app_store.png";
import PlayStoreImg from "../../assets/play_store.png";
import BgPng from "../../assets/appStore.png";
import Mobile from "../../assets/mob.png";

const backgroundStyle = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const AppStore = () => {
  return (
    <>
      <span id="join"></span>
      <div className="z-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2" >
        <div className="container pl-40 pt-36">
          <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-4">
            <div
              data-aos="fade-up"
              data-aos-duration="300"
              className="space-y-6 max-w-xl mx-auto"
            >
              {/* text section */}
              <h1 className="text-2xl font-mono   sm:text-4xl font-semibold text-gray-800/90 pl-3">
                Nawalah is now available on Android and IOS
              </h1>
              {/* img section */}
              <div className="flex  justify-center sm:justify-start items-center">
                <a href="#">
                  <img
                    src={PlayStoreImg}
                    alt="Play store"
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                  />
                </a>
                <a href="#">
                  <img
                    src={AppStoreImg}
                    alt="App store"
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                  />
                </a>
              </div>
            </div>
            {/* Empty div */}
            <div></div>
          </div>
        </div>
        <div className="pb-16 mt-4 ">
          <img src={Mobile} alt="" />
        </div>
      </div>
    </>
  );
};

export default AppStore;
