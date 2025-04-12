import React, { useState } from 'react';
import { MapPin, Calendar, Users, Compass, ChevronDown } from 'lucide-react';
import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx';
import Progress from '../components/progress.jsx';
import BasicInfoForm from '../components/basicInfoForm.jsx';
import  DestinationsForm  from '../components/destinationsFrom.jsx';

function Form() {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [noOfdays, setNoOfdays] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [newDestination, setNewDestination] = useState('');

  const steps = [
    { number: 1, title: 'Basic Info', active: true },
    { number: 2, title: 'Destinations', active: false },
    { number: 3, title: 'Activities', active: false },
    { number: 4, title: 'Preferences', active: false },
  ];
  const onContinue=()=>{
    setCurrentStep(currentStep+1);
    console.log(startDate)
    console.log(noOfdays)
    console.log(newDestination)
 }

 const onBack=()=>{
  setCurrentStep(currentStep-1);
 }

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

      </div>
    </div>
    <div className="mt-8 flex">
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