export type VehicleStatus = 'active' | 'idle' | 'offline';

export interface Position {
  lat: number;
  lng: number;
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  driver: string;
  status: VehicleStatus;
  position: Position;
  speed: number;
  heading: number;
  lastUpdate: string;
  odometer: number;
  fuel: number;
}

export interface VehicleUpdate {
  vehicleId: string;
  position: Position;
  speed: number;
  heading: number;
  status: VehicleStatus;
  timestamp: string;
}
