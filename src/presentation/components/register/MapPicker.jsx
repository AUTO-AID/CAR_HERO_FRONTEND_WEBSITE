import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapPicker = ({ initialPosition, onLocationSelect }) => {
  // Default to Damascus if no position
  const defaultPosition = { lat: 33.5138, lng: 36.2765 };
  const [position, setPosition] = useState(initialPosition || null);

  useEffect(() => {
    if (position) {
      onLocationSelect(`${position.lat},${position.lng}`);
    }
  }, [position, onLocationSelect]);

  const handleLocate = (map) => {
    map.locate();
  };

  return (
    <div className="relative h-full w-full rounded-[24px] overflow-hidden z-10">
      <MapContainer 
        center={initialPosition || defaultPosition} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div className="absolute top-2 right-2 z-[1000] bg-white p-2 rounded shadow-md cursor-pointer pointer-events-none text-xs font-bold text-black text-center">
        انقر على الخريطة لتحديد الموقع
      </div>
    </div>
  );
};

export default MapPicker;
