import { Car, Navigation, Gauge, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useVehicles } from '@/contexts/VehicleContext';

const MetricsPanel = () => {
  const { vehicles } = useVehicles();

  const metrics = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    offline: vehicles.filter(v => v.status === 'offline').length,
  };

  const metricCards = [
    {
      label: 'Total Vehicles',
      value: metrics.total,
      icon: Car,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active',
      value: metrics.active,
      icon: Navigation,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Idle',
      value: metrics.idle,
      icon: Gauge,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Offline',
      value: metrics.offline,
      icon: Activity,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((metric) => (
        <Card key={metric.label} className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsPanel;
