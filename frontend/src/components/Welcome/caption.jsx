

import React, {useEffect, useState} from 'react'
import fw from "../../assets/wasteFood.png"


const caption = () => {

  const [caption, setCaption] = useState('');
  const captionText = "           36 million tons of food is wasted each year and around 40% of population faces food insecurity ";

  useEffect(() => {
    const delay = 50; // Adjust the delay between each character appearance
    let index = 0;

    const interval = setInterval(() => {
      if (index <= captionText.length) {
        setCaption(captionText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

// f3efea
return (
  <div className='grid mb-20  grid-cols-1 lg:grid-cols-2  gap-20 md:gap-20 place-items-center '>
  <div className=" h-full">
    <div className="w-[400px]  ">
      <img src={fw} alt="Waste Food" />
    </div>
    </div>

    <div className=" max-w-s mb-4  mx-auto text-center md:text-right">
      <div className="mt-2 px-3 text-center md:text-left">
        <p className=" mr-12 font-extrabold text-5xl text-[#d11559] font-sans">
          {caption}
        </p>
      </div>
    </div>
  </div>
);

}

export default caption
