import React from 'react';
import img1 from "../../assets/goals/1.png";
import img2 from "../../assets/goals/2.png";
import img12 from "../../assets/goals/12.png";
import img13 from "../../assets/goals/13.png";
import img17 from "../../assets/goals/17.png";
import { Card, CardContent, Typography } from '@mui/material';

const sdgs = [
  { id: 1, name: 'No Poverty', svg: img1, description: 'End poverty in all its forms everywhere.' },
  { id: 2, name: 'Zero Hunger', svg: img2, description: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture.' },
  { id: 12, name: 'Responsible Consumption and Production', svg: img12, description: 'Ensure sustainable consumption and production patterns.' },
  { id: 13, name: 'Climate Action', svg: img13, description: 'Take urgent action to combat climate change and its impacts.' },
  { id: 17, name: 'Partnership for the Goals', svg: img17, description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development.' },
];

const SDGIcons = () => {
  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <h2 className="text-4xl font-bold mb-8 text-darkBlue font-cursive">SDGs we are covering</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {sdgs.map(sdg => (
          <Card key={sdg.id} className="w-60 h-72 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center">
              <img src={sdg.svg} alt={sdg.name} className="w-16 h-16 mb-4" />
              <Typography variant="h6" component="div" className="text-center font-semibold mb-2">
                {sdg.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="text-center">
                {sdg.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SDGIcons;
