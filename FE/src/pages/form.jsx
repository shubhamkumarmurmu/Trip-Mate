import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Compass, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx';
import Progress from '../components/progress.jsx';
import BasicInfoForm from '../components/basicInfoForm.jsx';
import  DestinationsForm  from '../components/destinationsFrom.jsx';
import PreferencesForm from '../components/preferencesForm.jsx';
import { ActivitiesForm } from '../components/activitesForm.jsx';

function Form() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [noOfdays, setNoOfdays] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [newDestination, setNewDestination] = useState('');
  const [data, setData] = useState({
   
    destination: '',
    startDate: '',
   
    duration: ''
  });
  const [datas,setDatas]=useState([]);
  const [place,setPlaces]=useState([]);
 
  //showing map
  const showmap=()=>{
        navigate('/itenary', {state: {datas,place}});
  }
 

  //changing datas arr and place arr
  useEffect(()=>{
  console.log(datas)
  console.log(place)
  },[datas,place])
  //calling for navigate to itenary 
  const trynav=async()=>{
   console.log("trynav")
      try {
       console.log("hello g called")
       console.log(data)
      
       console.log("kaise ho")

        const response=await axios.post('http://10.1.8.45:3000/discover/',  JSON.stringify(data), {
         headers: {
           'Content-Type': 'application/json',
         },
       });
      
     setDatas(response.data.placesData);
     setPlaces(response.data.pointsArray);
    //  console.log(datas)
    

     
     } catch (err) {
       console.error(err);
     
     } finally {
       console.log("finally sumbmitted")
     }
   }
  
  //updating data
  useEffect(()=>{
    console.log('Updated data:', data);
     if(currentStep==3){
      trynav();
     }
     if(currentStep==5){
      showmap();
     }
  },[data])

  const steps = [
    { number: 1, title: 'Basic Info', active: true },
    { number: 2, title: 'Destinations', active: false },
    { number: 3, title: 'Activities', active: false },
    { number: 4, title: 'Preferences', active: false },
  ];


  //calling for next continue
  const onContinue=async()=>{

    setCurrentStep(currentStep+1);
    console.log(currentStep);
    console.log(startDate)
    console.log(noOfdays)
    console.log(newDestination)
    
    setData({
      destination:`${newDestination}`,
      duration:`${noOfdays}`,
      startDate:`${startDate}`
  })
  

   
 }
//onback button
 const onBack=()=>{
  setCurrentStep(currentStep-1);
 }
 // navigate


  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto pt-12 px-4">

        {/* Header Section */}
        <Header/>
       

        {/* Progress Steps */}
        <Progress steps={steps} currentStep={currentStep}/>

        {/* Form Section */}
       {currentStep==1 && (
         <BasicInfoForm 
         tripName={tripName}
         setTripName={setTripName}
         startDate={startDate}
         setStartDate={setStartDate}
         noOfdays={noOfdays}
         setNoOfdays={setNoOfdays}
         adults={adults}
         setAdults={setAdults}
         children={children}
         setChildren={setChildren}

        
/>
       )
    }
     {/* newDestination={newDestination}
     setNewDestination={setNewDestination} */}

       {currentStep==2 && (
        <DestinationsForm
        newDestination={newDestination}
        setNewDestination={setNewDestination}
        />
      )
        }

        {currentStep==3 &&(
          <ActivitiesForm/>
        )}

        {currentStep==4 &&(
          <PreferencesForm/>
        )}

      

      </div>
    </div>
    <div className="mt-8 flex mx-auto">
    <button
          className="w-[50px] text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    <Footer/>
    </>
  );
}

export default Form;