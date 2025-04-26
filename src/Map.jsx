import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {useEffect} from 'react'

function FlyToFn({ center, zoom = 8 }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 }); 
  }, [center, zoom, map]);

  return null;
}

const Map = ({ coords, locationText }) => {

  const center = [coords.lat, coords.lng];
  
  return (
    <div>
      <MapContainer
        className="leaflet-map"
        center={center} 
        zoom={11}      
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FlyToFn center={center} zoom={11} />

        <Marker position={center}>
          <Popup>{locationText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;