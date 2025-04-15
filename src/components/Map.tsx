'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAllLatitudeLongitude } from '@/services/recyclingLocationService';
import Typography from '@mui/joy/Typography';

interface Pin {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

// Corrige ícones do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map() {
  const [isClient, setIsClient] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);

  const center: [number, number] = [-19.912998,-43.940933]; // Centro em São Paulo

  useEffect(() => {
    setIsClient(true);
    getAllLatitudeLongitude().then(data => {
      const transformedPins = data.map(item => ({
        id: Number(item.id),
        latitude: item.latitude ?? 0,
        longitude: item.longitude ?? 0,
        name: item.name ?? 'Local desconhecido',
      }));
      setPins(transformedPins);
    });
  }, []);

  console.log("📍 Pins carregados:", pins);

  return (
    <>
      <Typography level="h2" sx={{ mb: 3, color: 'neutral.100', display: 'flex', justifyContent: 'center' }}>
        Mapa de locais de coleta
      </Typography>
      {isClient ? (
        <MapContainer
          key="map"
          center={center}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map((pin, index) => (
            <Marker key={index} position={[pin.latitude, pin.longitude]}>
              <Popup>Local de reciclagem #{pin.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>⏳ Carregando mapa...</p>
      )}
    </>
  );
}
