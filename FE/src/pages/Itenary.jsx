import React, { useState } from 'react';

import MapView from './MapView';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



//make pdf
// const makePdf=async()=>{
//    axios.post('', {
//     key1: 'value1',
//     key2: 'value2'
//   })
//   .then(response => {
//     console.log('Success:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
  
// }




const Imagecard=({imgarr})=>{
  return (
   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300" >

   {/* Displaying the image */}
   <img
     src={imgarr}
     alt="as"
     className="w-full h-48 object-cover rounded-lg mb-4"
   />

 </div>
  )
}


// Activity Card Component
const ActivityCard = ({ activity }) => {
  return (
    <a
    href={activity.moreInfo}
    // target="_blank"
    rel="noopener noreferrer"
    className="block rounded-2xl shadow-lg p-6 bg-white hover:bg-gray-100 transition duration-200"
  >
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
   
      {/* Displaying the image */}
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{activity.title}</h3>
      <p className="text-gray-600 mb-3">{activity.description}</p>
      <p className="text-sm text-gray-500">Duration: {activity.duration}</p>
    </div>
  </a>

  ); 
};



// Day Card Component
const DayCard = ({ day }) => {
  return (
  
    <div className="w-full p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 hover:border-gray-400 transition duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{`Day ${day.day}: ${day.date}`}</h2>
        <div className="grid grid-cols-1  min-[800px]:grid-cols-1 sm:grid-cols-2 gap-4">
          {day.activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

// Main Component
const Itenary = () => {
  //  const [places,setPlaces]=useState([]);
  const [istrue,settrue]=useState(false)
  const [myarr,setarr]=useState([]);
  //  setPlaces()
   const location=useLocation();
   const days=location.state.datas;
   console.log(days);
   const place=location.state.place;
  const places=place.filter(obj => Object.keys(obj).length > 0);

   console.log(places);
   
   const imgagecall=async()=>{
  
    console.log("hello hi")
    try {
      const response = await axios.get('http://10.1.8.45:3000/discover/moreimages',{
        place:"mumbai"
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    
     console.log(response.data.moreimages)
     setarr(response.data.moreimages)
      // console.log(response.data.pointArray)
     
      // if(!response.data.success){
      //   setError(response.data.message);
      //   return;
      // }
  
      // Navigate to the result page with the itinerary data
    }catch(err){
        console.log(err);
    }finally{
      settrue(true);
    }
  }

  return (
    <div>
      {/* <div>
        <button className='border rounded px-3 py-2' onClick={makePdf}>download as pdf</button>
      </div> */}
    <div className='flex  md:flex-row flex-col'>
    <div className="flex flex-wrap justify-center md:w-1/2">
      {days.map((day, index) => (
        <DayCard key={index} day={day} />
      ))}

      <div>
        <button onClick={imgagecall}>hello</button>
        {
          istrue ?

          <div>
            {
            myarr.map((imgarr)=>{
              return (
                <Imagecard imgarr={imgarr}/>
              )
            })
           
          }
          </div>
       
        :
        <div></div>
        }

    
      </div>
    </div>
      <div className='map-container h-[100vh] md:w-1/2 w-full  py-4 shadow-lg mx-2 mr-2 lg:fixed lg:right-0'>
        <MapView places={places}/>
      </div>
    </div>
    </div>
  );
};

export default Itenary;
