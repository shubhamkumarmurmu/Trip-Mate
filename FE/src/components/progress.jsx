import React from 'react'
import { MapPin, Calendar, Users, Compass, ChevronDown } from 'lucide-react';

const Progress = ({steps,currentStep}) => {
    console.log(steps)
  return (
    <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.number === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <span className="text-sm mt-2">{step.title}</span>
            </div>
          ))}
        </div>
  )
}

export default Progress;