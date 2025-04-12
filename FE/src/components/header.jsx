import React from 'react'
import { MapPin, Calendar, Users, Compass, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-blue-600 rounded-xl p-8 text-white mb-8">
    <h1 className="text-3xl font-bold mb-3">Plan Your Dream Trip</h1>
    <p className="text-blue-100 mb-8">Fill in the details below to create your personalized travel itinerary</p>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5" />
        <span>Choose Destinations</span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5" />
        <span>Set Dates</span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5" />
        <span>Add Travelers</span>
      </div>
      <div className="flex items-center space-x-2">
        <Compass className="w-5 h-5" />
        <span>Plan Activities</span>
      </div>
    </div>
  </div>
  )
}

export default Header;