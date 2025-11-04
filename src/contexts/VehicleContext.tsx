import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Vehicle, VehicleUpdate } from '@/types/vehicle';

interface VehicleContextType {
  vehicles: Vehicle[];
  updateVehicle: (update: VehicleUpdate) => void;
  setVehicles: (vehicles: Vehicle[]) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehiclesState] = useState<Vehicle[]>([]);

  const updateVehicle = useCallback((update: VehicleUpdate) => {
    setVehiclesState(prev => 
      prev.map(vehicle => 
        vehicle.id === update.vehicleId
          ? {
              ...vehicle,
              position: update.position,
              speed: update.speed,
              heading: update.heading,
              status: update.status,
              lastUpdate: update.timestamp,
            }
          : vehicle
      )
    );
  }, []);

  const setVehicles = useCallback((newVehicles: Vehicle[]) => {
    setVehiclesState(newVehicles);
  }, []);

  const getVehicleById = useCallback((id: string) => {
    return vehicles.find(v => v.id === id);
  }, [vehicles]);

  return (
    <VehicleContext.Provider value={{ vehicles, updateVehicle, setVehicles, getVehicleById }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within VehicleProvider');
  }
  return context;
};
