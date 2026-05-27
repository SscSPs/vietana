import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix for Leaflet default icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DESTINATIONS = [
  { id: 1, t: 'Ho Chi Minh City', pos: [10.8231, 106.6297] as [number, number], type: 'Hub' },
  { id: 2, t: 'Da Nang', pos: [16.0544, 108.2022] as [number, number], type: 'Coastal' },
  { id: 3, t: 'Hanoi', pos: [21.0285, 105.8542] as [number, number], type: 'Capital' },
  { id: 4, t: 'Hoi An', pos: [15.8801, 108.3384] as [number, number], type: 'Ancient' },
  { id: 5, t: 'Ha Long Bay', pos: [20.9101, 107.1839] as [number, number], type: 'Nature' },
  { id: 6, t: 'Nha Trang', pos: [12.2388, 109.1967] as [number, number], type: 'Beach' },
  { id: 7, t: 'Phu Quoc', pos: [10.2289, 103.9572] as [number, number], type: 'Island' }
];

const FLIGHT_PATHS = [
  { from: [10.8231, 106.6297], to: [16.0544, 108.2022] },
  { from: [16.0544, 108.2022], to: [21.0285, 105.8542] },
  { from: [21.0285, 105.8542], to: [10.8231, 106.6297] }
];

const Map: React.FC = () => {
  return (
    <section id="map" className="map-section">
      <div className="sh r">
        <span className="lbl">Interactive Journey</span>
        <h2>Explore Vietnam</h2>
        <p>Your journey is more than just a destination. See how we connect the dots across this beautiful country.</p>
      </div>

      <div className="map-container r">
        <MapContainer center={[15.8, 108]} zoom={5} scrollWheelZoom={false} style={{ height: '500px', width: '100%', borderRadius: '22px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {DESTINATIONS.map(dest => (
            <Marker key={dest.id} position={dest.pos}>
              <Popup>
                <div className="map-popup">
                  <strong>{dest.t}</strong><br />
                  <span>{dest.type}</span>
                </div>
              </Popup>
            </Marker>
          ))}
          {FLIGHT_PATHS.map((path, idx) => (
            <Polyline 
              key={idx} 
              positions={[path.from as [number, number], path.to as [number, number]]} 
              color="var(--gold)" 
              weight={2} 
              dashArray="5, 10" 
              opacity={0.6}
            />
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;
