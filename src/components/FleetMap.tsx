import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useVehicles } from '@/contexts/VehicleContext';
import { Vehicle, VehicleStatus } from '@/types/vehicle';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FleetMapProps {
  selectedVehicleId?: string;
  onVehicleClick?: (vehicleId: string) => void;
}

const FleetMap = ({ selectedVehicleId, onVehicleClick }: FleetMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const { vehicles } = useVehicles();

  const getMarkerColor = (status: VehicleStatus): string => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'idle':
        return '#f59e0b';
      case 'offline':
        return '#ef4444';
    }
  };

  const createCustomIcon = (vehicle: Vehicle) => {
    const color = getMarkerColor(vehicle.status);
    const isSelected = vehicle.id === selectedVehicleId;
    
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          transform: rotate(${vehicle.heading}deg);
        ">
          <div style="
            width: ${isSelected ? '32px' : '24px'};
            height: ${isSelected ? '32px' : '24px'};
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
          ">
            <svg width="${isSelected ? '16' : '12'}" height="${isSelected ? '16' : '12'}" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L4 8v12h16V8l-8-6z"/>
            </svg>
          </div>
          ${isSelected ? `
            <div style="
              position: absolute;
              top: -35px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              white-space: nowrap;
              font-size: 12px;
            ">
              ${vehicle.name}
            </div>
          ` : ''}
        </div>
      `,
      className: 'custom-vehicle-marker',
      iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
      iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12],
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('fleet-map', {
        zoomControl: true,
      }).setView([-23.5505, -46.6333], 12); // São Paulo coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const currentMarkers = new Set<string>();

    vehicles.forEach((vehicle) => {
      currentMarkers.add(vehicle.id);
      let marker = markersRef.current.get(vehicle.id);

      if (marker) {
        // Update existing marker
        marker.setLatLng([vehicle.position.lat, vehicle.position.lng]);
        marker.setIcon(createCustomIcon(vehicle));
      } else {
        // Create new marker
        marker = L.marker([vehicle.position.lat, vehicle.position.lng], {
          icon: createCustomIcon(vehicle),
        });

        marker.on('click', () => {
          onVehicleClick?.(vehicle.id);
        });

        marker.addTo(map);
        markersRef.current.set(vehicle.id, marker);
      }

      // Update popup
      marker.bindPopup(`
        <div style="font-family: system-ui; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${vehicle.name}</h3>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Plate:</strong> ${vehicle.plate}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Driver:</strong> ${vehicle.driver}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Speed:</strong> ${vehicle.speed} km/h</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Status:</strong> <span style="color: ${getMarkerColor(vehicle.status)}">${vehicle.status}</span></p>
        </div>
      `);
    });

    // Remove markers for vehicles that no longer exist
    markersRef.current.forEach((marker, id) => {
      if (!currentMarkers.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Fit bounds to show all vehicles
    if (vehicles.length > 0) {
      const bounds = L.latLngBounds(
        vehicles.map((v) => [v.position.lat, v.position.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [vehicles, selectedVehicleId, onVehicleClick]);

  // Center on selected vehicle
  useEffect(() => {
    if (selectedVehicleId && mapRef.current) {
      const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
      if (vehicle) {
        mapRef.current.setView([vehicle.position.lat, vehicle.position.lng], 16, {
          animate: true,
        });
      }
    }
  }, [selectedVehicleId, vehicles]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <div id="fleet-map" className="w-full h-full" />
    </div>
  );
};

export default FleetMap;
