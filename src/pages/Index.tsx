import { useState, useEffect } from 'react';
import { VehicleProvider, useVehicles } from '@/contexts/VehicleContext';
import { useWebSocket } from '@/hooks/useWebSocket';
import Header from '@/components/Header';
import MetricsPanel from '@/components/MetricsPanel';
import VehicleList from '@/components/VehicleList';
import FleetMap from '@/components/FleetMap';
import { mockVehicles } from '@/data/mockVehicles';
import { toast } from '@/hooks/use-toast';

const DashboardContent = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>();
  const { setVehicles, updateVehicle } = useVehicles();

  // WebSocket connection
  // Replace with your backend URL: ws://localhost:8000/ws or wss://your-backend.com/ws
  const WEBSOCKET_URL = 'ws://localhost:8000/ws';

  const { isConnected } = useWebSocket({
    url: WEBSOCKET_URL,
    onVehicleUpdate: (update) => {
      updateVehicle(update);
    },
    onConnect: () => {
      toast({
        title: 'Connected',
        description: 'WebSocket connection established',
      });
    },
    onDisconnect: () => {
      toast({
        title: 'Disconnected',
        description: 'WebSocket connection lost. Attempting to reconnect...',
        variant: 'destructive',
      });
    },
    autoReconnect: true,
  });

  // Initialize with mock data
  useEffect(() => {
    setVehicles(mockVehicles);
  }, [setVehicles]);

  return (
    <div className="min-h-screen bg-background">
      <Header isConnected={isConnected} />

      <main className="container mx-auto px-6 py-6 space-y-6">
        <MetricsPanel />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          <div className="lg:col-span-1">
            <VehicleList
              onVehicleSelect={setSelectedVehicleId}
              selectedVehicleId={selectedVehicleId}
            />
          </div>

          <div className="lg:col-span-3">
            <FleetMap
              selectedVehicleId={selectedVehicleId}
              onVehicleClick={setSelectedVehicleId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <VehicleProvider>
      <DashboardContent />
    </VehicleProvider>
  );
};

export default Index;
