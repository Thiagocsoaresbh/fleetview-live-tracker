import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Circle, User, Gauge, Fuel, MapPin, Clock } from 'lucide-react';
import { Vehicle, VehicleStatus } from '@/types/vehicle';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackOnMap: (vehicleId: string) => void;
}

const VehicleDetailsModal = ({ vehicle, isOpen, onClose, onTrackOnMap }: VehicleDetailsModalProps) => {
  if (!vehicle) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{vehicle.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{vehicle.plate}</p>
            </div>
            {getStatusBadge(vehicle.status)}
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Driver</p>
                <p className="font-semibold">{vehicle.driver}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Gauge className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Speed</p>
                <p className="font-semibold">{vehicle.speed} km/h</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Fuel className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Fuel Level</p>
                <p className="font-semibold">{vehicle.fuel}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Last Update</p>
                <p className="font-semibold text-xs">
                  {new Date(vehicle.lastUpdate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </h4>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Latitude</p>
              <p className="font-mono">{vehicle.position.lat.toFixed(6)}</p>
              <p className="text-sm text-muted-foreground mt-2">Longitude</p>
              <p className="font-mono">{vehicle.position.lng.toFixed(6)}</p>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => {
              onTrackOnMap(vehicle.id);
              onClose();
            }}
          >
            Track on Map
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailsModal;
