import { useState } from 'react';
import { Search, Circle, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVehicles } from '@/contexts/VehicleContext';
import { VehicleStatus } from '@/types/vehicle';
import VehicleDetailsModal from './VehicleDetailsModal';

interface VehicleListProps {
  onVehicleSelect: (vehicleId: string) => void;
  selectedVehicleId?: string;
}

const VehicleList = ({ onVehicleSelect, selectedVehicleId }: VehicleListProps) => {
  const { vehicles, getVehicleById } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'all'>('all');
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<string | null>(null);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    offline: vehicles.filter(v => v.status === 'offline').length,
  };

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'idle':
        return 'text-warning';
      case 'offline':
        return 'text-destructive';
    }
  };

  const getStatusBadge = (status: VehicleStatus) => {
    const variants = {
      active: 'default',
      idle: 'secondary',
      offline: 'destructive',
    } as const;

    return (
      <Badge variant={variants[status]} className="gap-1">
        <Circle className={`h-2 w-2 fill-current ${getStatusColor(status)}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <Card className="h-full flex flex-col bg-gradient-card border-border/50">
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Fleet Vehicles</h2>
            {statusFilter !== 'all' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStatusFilter('all')}
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear Filter
              </Button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
              className="flex-1 text-xs h-8"
            >
              <Filter className="h-3 w-3 mr-1" />
              All ({statusCounts.all})
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
              className="flex-1 text-xs h-8"
            >
              Active ({statusCounts.active})
            </Button>
            <Button
              variant={statusFilter === 'idle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('idle')}
              className="flex-1 text-xs h-8"
            >
              Idle ({statusCounts.idle})
            </Button>
            <Button
              variant={statusFilter === 'offline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('offline')}
              className="flex-1 text-xs h-8"
            >
              Offline ({statusCounts.offline})
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-glow ${
                  selectedVehicleId === vehicle.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-secondary/50 border-border/50'
                }`}
                onClick={() => onVehicleSelect(vehicle.id)}
                onDoubleClick={() => setSelectedVehicleForDetails(vehicle.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{vehicle.name}</h3>
                    <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
                  </div>
                  {getStatusBadge(vehicle.status)}
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Driver:</span>
                    <span className="text-foreground">{vehicle.driver}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Speed:</span>
                    <span className="text-foreground">{vehicle.speed} km/h</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Fuel:</span>
                    <span className="text-foreground">{vehicle.fuel}%</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVehicleForDetails(vehicle.id);
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}

            {filteredVehicles.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No vehicles found
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <VehicleDetailsModal
        vehicle={selectedVehicleForDetails ? getVehicleById(selectedVehicleForDetails) || null : null}
        isOpen={!!selectedVehicleForDetails}
        onClose={() => setSelectedVehicleForDetails(null)}
        onTrackOnMap={onVehicleSelect}
      />
    </>
  );
};

export default VehicleList;
