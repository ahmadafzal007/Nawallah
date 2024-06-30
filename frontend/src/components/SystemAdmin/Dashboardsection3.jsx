import React from 'react'
import "../../styles/font/font.css"
import pfp from "../../assets/placeholder.png"
import pfp1 from "../../assets/placeholder (1).png"
import pfp2 from "../../assets/placeholder (2).png"
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
import { useEffect } from 'react'
import { useState } from 'react'
const dataobject = [{ ind: 1,
img: pfp, name: "Jons Sena" }, { ind: 1,img: pfp1, name: "Alexa Jhons"  }, { ind: 1 ,img: pfp2, name: "Emma Willioms" }];
const Dashboardsection3 = () => {
  const [review,setreview] = useState()
  const getAllReviews = async () => {
      const addUser = query(collection(firestore,   "userReviews"),where("starCounts",  ">=" , 3));
      const getData = await getDocs(addUser);
      // console.log(TableHeader)
     
      setreview(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };

    useEffect(() => {
  
    getAllReviews()
  
  }, []);

  const [rating, setRating] = useState(4); // Replace with user input rating

const renderStars = (star) => {
 
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    // Create a star icon element for each rating
    const starIcon = i <= star ?  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f3da35" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>
    : 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f3da35" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> </svg>
    stars.push(
      <span key={i} style={{ fontSize: '24px' }}>
        {starIcon}
      </span>
    );
  }
  return stars;
};
  return (
    <div className='mx-[25px] my-4'>
    <h1 className='selector text-[#E5E5E5] text-xl font-bold'>User Reviews</h1>
    <div className="grid grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-[16px] ">
    {review?.map((val, ind) => (
              <div
                key={ind}
                class="schedule flex flex-col   p-[30px] w-full h-full sm:w-[85%]  rounded-xl   shadow-md bg-[#a30707] "
              >
                <div className="flex ">
                <img
                      class=" w-12 h-12 rounded-full "
                      src={val.photo}
                      alt="Bonnie image"
                    />
                    
                    <div className="ml-4">
                      <h5 class="text-xl font-medium tracking-tight  text-white selector">
                        {val.userName}
                      </h5>
                      <p class="text-[#7e7e7e] mt-1 text-base font-light selector  " >
                      {val.restaurantName}
                      </p>
                    </div>
                    </div>
                    <div className='mt-5 '>
                       
                     <p className='text-[#E5E5E5] text-base selector font-normal leading-6'>{val.reviewMessage} </p>
                   
<div class="flex items-center mt-5">

{renderStars(val.starCounts)}
    <p class="ml-4 text-base font-bold text-[#E5E5E5] selector ">{val.starCounts}</p>
</div>

                    </div>
              </div>
    ))}
    </div>
    </div>
      
  )
}

export default Dashboardsection3