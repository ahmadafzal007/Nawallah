// import React from 'react';
import img1 from "../../assets/goals/1.png";
import img2 from "../../assets/goals/2.png";
import img12 from "../../assets/goals/12.png";
import img13 from "../../assets/goals/13.png";
import img17 from "../../assets/goals/17.png";
import ocean from "../../assets/ocean1.png"
import {  CardContent, Typography } from '@mui/material';

// const sdgs = [
//   { id: 1, name: 'No Poverty', svg: img1, description: 'End poverty in all its forms everywhere.' },
//   { id: 2, name: 'Zero Hunger', svg: img2, description: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture.' },
//   { id: 12, name: 'Responsible Consumption and Production', svg: img12, description: 'Ensure sustainable consumption and production patterns.' },
//   { id: 13, name: 'Climate Action', svg: img13, description: 'Take urgent action to combat climate change and its impacts.' },
//   { id: 17, name: 'Partnership for the Goals', svg: img17, description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development.' },
// ];

// const SDGIcons = () => {
//   return (
//     <div className="flex flex-col items-center py-10 ">
//       <h2 className="text-4xl font-bold mb-8 text-darkBlue font-cursive">SDGs we are covering</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//         {sdgs.map(sdg => (
//           <Card key={sdg.id} className="w-60 h-72 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardContent className="flex flex-col items-center">
//               <img src={sdg.svg} alt={sdg.name} className="w-16 h-16 mb-4" />
//               <Typography variant="h6" component="div" className="text-center font-semibold mb-2">
//                 {sdg.name}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" className="text-center">
//                 {sdg.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SDGIcons;





const cardStyle = {
  position: 'relative',
  width: '220px',
  height: '250px',
  color: 'white',
  cursor: 'pointer',
  transition: 'transform 1s ease-in-out',
  transformStyle: 'preserve-3d',
  margin: '0 24px', // Vertical margin of 80px, no horizontal margin
};

const cardFaceStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transition: 'transform 1s ease-in-out',
  WebkitBoxReflect: 'below 0 linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4))',
};

const frontFaceStyle = {
  ...cardFaceStyle,
};

const backFaceStyle = {
  ...cardFaceStyle,
  transform: 'rotateY(0.5turn)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '#333', // Optional: Background color for the back face
  padding: '20px',
};

const imgStyle = {
  width: '220px',
  height: '250px',
  objectFit: 'cover',
};

const Card = ({ frontImage, backText }) => (
  <div
    className="group"
    style={{
      ...cardStyle,
      fontFamily: 'serif'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(0.5turn)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(0turn)'}
  >
    <div style={frontFaceStyle}>
      <img src={frontImage} alt="Front" style={imgStyle} />
    </div>
    <div style={backFaceStyle}>
      {backText}
    </div>
  </div>
);

const SDGIcons = () => {
  return (
    <div className="bg-transparent relative">


 


      <div className="bg-[#ffadf9]">
      <div className=" text-center pt-16 container mb-20  sm:pb-0">
        <h1 className="text-6xl text-white font-bold font-cursive ">
          Sustainable Development Goals
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center  w-full">
        <div className="scene flex justify-between space-x-4  mb-20 perspective-800">
          <Card 
            frontImage={img1}
            backText="End poverty in all its forms everywhere."
          />
          <Card 
            frontImage={img2}
            backText="End hunger, achieve food security and improved nutrition and promote sustainable agriculture."
          />
          <Card 
            frontImage={img12}
            backText="Ensure sustainable consumption and production patterns."
          />
            <Card 
            frontImage={img13}
            backText="Take urgent action to combat climate change and its impacts."
          />
          <Card 
            frontImage={img17}
            backText="Strengthen the means of implementation and revitalize the global partnership for sustainable development."
          />
        </div>
        <br />
        {/* <div className="scene flex justify-center space-x-4 perspective-800">
          <Card 
            frontImage={img13}
            backText="Take urgent action to combat climate change and its impacts."
          />
          <Card 
            frontImage={img17}
            backText="Strengthen the means of implementation and revitalize the global partnership for sustainable development."
          />
        </div> */}
      </div>
      </div>

     
      <div className="bg-transparent">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
          <path
             fill="#ffadf9"
            fillOpacity="1"
            d="M0,96L40,96C80,96,160,96,240,112C320,128,400,160,480,154.7C560,149,640,107,720,96C800,85,880,107,960,122.7C1040,139,1120,149,1200,149.3C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>



      


    </div>
     
   
 
  );
}

export default SDGIcons;