import React from 'react'
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView = (places) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRefs = useRef([]);
  
    useEffect(() => {
      mapInstanceRef.current = new maplibregl.Map({
        container: mapRef.current,
        style: '', // free style
        center: [places[0]?.lng || 0, places[0]?.lat || 0],
        zoom: 13,
      });
  
      return () => {
        mapInstanceRef.current.remove();
      };
    }, []);
  
    useEffect(() => {
      if (!mapInstanceRef.current) return;
  
      markerRefs.current.forEach(marker => marker.remove());
      markerRefs.current = [];
  
      places.forEach((place, index) => {
        const el = document.createElement('div');
        el.className = `w-4 h-4 rounded-full ${
          index === highlightedIndex ? 'bg-red-500 scale-125' : 'bg-blue-500'
        } border border-white`;
  
        const marker = new maplibregl.Marker(el)
          .setLngLat([place.lng, place.lat])
          .setPopup(new maplibregl.Popup().setText(place.name))
          .addTo(mapInstanceRef.current);
  
        markerRefs.current.push(marker);
      });
    }, [places, highlightedIndex]);
  
    return <div ref={mapRef} className="w-full h-full" />;
}

export default MapView
