import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapSectionProps {
  shift: string;
  year: number;
  weeks: number[];
  eventType: string;
}

const MapSection: React.FC<MapSectionProps> = ({ shift, year, weeks, eventType }) => {
  const [markers, setMarkers] = useState<[number, number][]>([]);

  useEffect(() => {
    // dummy data: replace with your fetch logic
    const newMarkers: [number, number][] = weeks.map((w, i) => [20 + i*2, i*2]);
    setMarkers(newMarkers);
  }, [shift, year, weeks, eventType]);

  return (
    <div className="h-96 w-full rounded-lg shadow-md bg-white overflow-hidden">
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((pos, idx) => (
          <Marker position={pos} key={idx}>
            <Popup>
              Shift: {shift}<br/>
              Year: {year}<br/>
              Weeks: {weeks.join(", ")}<br/>
              Event: {eventType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
