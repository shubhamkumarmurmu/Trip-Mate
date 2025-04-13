import React from 'react';
import { Plus,Check } from 'lucide-react';
import { useState } from 'react';

const activityCategories = [
  {
    title: 'Cultural',
    activities: ['Museums', 'Historical Sites', 'Art Galleries', 'Local Markets', 'Cultural Shows'],
  },
  {
    title: 'Nature',
    activities: ['Hiking', 'Beaches', 'National Parks', 'Wildlife Safaris', 'Gardens'],
  },
  {
    title: 'Adventure',
    activities: ['Water Sports', 'Zip Lining', 'Rock Climbing', 'Bungee Jumping', 'Skydiving'],
  },
  {
    title: 'Food & Drink',
    activities: ['Food Tours', 'Cooking Classes', 'Winery Tours', 'Local Cuisine', 'Food Markets'],
  },
  {
    title: 'Relaxation',
    activities: ['Spa Treatments', 'Yoga Classes', 'Beach Days', 'Hot Springs', 'Meditation Retreats'],
  },
];

export function ActivitiesForm({ onBack, onContinue }) {

  const [selectedActivities, setSelectedActivities] = useState(new Set());

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activity)) {
        newSet.delete(activity);
      } else {
        newSet.add(activity);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Plan Your Activities</h2>
      <p className="text-gray-600 mb-8">Add activities you'd like to do in each destination</p>

      <div className="mb-8">
        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium mb-4">
          Tokyo, Japan
        </div>
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Add activity in Tokyo, Japan"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Add
          </button> */}
        </div>

        <h3 className="text-lg font-semibold mb-4">Suggested Activities</h3>
        {activityCategories.map((category) => (
          <div key={category.title} className="mb-6">
            <h4 className="text-gray-600 mb-3">{category.title}</h4>
            <div className="flex flex-wrap gap-2">
              {category.activities.map((activity) => {
                 const isSelected = selectedActivities.has(activity);
                return(
                  <button
                  onClick={() => toggleActivity(activity)}
                  key={activity}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-colors ${
                    isSelected
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {activity}
                </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {/* <button
          className="px-6 py-3 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={onContinue}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
}