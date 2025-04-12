import React from 'react';
import { ChevronDown } from 'lucide-react';

const BasicInfoForm=({
  tripName,
  setTripName,
  startDate,
  setStartDate,
  noOfdays,
  setNoOfdays,
  adults,
  setAdults,
  children,
  setChildren

 
}) =>{
  
  

  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Tell us about your trip</h2>
      <p className="text-gray-600 mb-8">Enter the basic details to get started with your itinerary</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
          <input
            type="text"
            placeholder="e.g. Summer Vacation 2025"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <p className="mt-1 text-sm text-gray-500">Give your trip a memorable name</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No of Days</label>
            <input
              type="number"
              min={1}
              max={7}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={noOfdays}
              onChange={(e) => setNoOfdays(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-1 text-sm text-gray-500">Travelers aged 13+</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-1 text-sm text-gray-500">Travelers aged 0-12</p>
          </div>
        </div>
       
      

      </div>

      
    </div>
  );
}

export default BasicInfoForm