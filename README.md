# FleetView Live Tracker

A modern, real-time vehicle tracking and fleet management dashboard built with cutting-edge web technologies.

## Overview

FleetView Live Tracker is a comprehensive fleet monitoring solution that provides real-time vehicle tracking, status monitoring, and fleet analytics. The platform leverages WebSocket technology for instant updates and interactive mapping for geospatial visualization.

## Technology Stack

### Frontend
- **React 18.3** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first styling
- **Leaflet.js** - Interactive mapping
- **Shadcn/ui** - Premium UI components
- **Lucide React** - Icon system

### Backend Architecture
- **FastAPI** - High-performance async API
- **WebSocket Server** - Real-time vehicle updates
- **Celery** - Distributed task processing
- **Redis** - Message broker and caching layer
- **PostgreSQL** - Persistent data storage
- **Docker Compose** - Infrastructure orchestration

## Key Features

**Real-Time Tracking**
Live vehicle position updates with sub-second latency via WebSocket connections.

**Fleet Analytics**
Comprehensive dashboard displaying fleet metrics including total vehicles, active units, idle vehicles, and offline status monitoring.

**Interactive Mapping**
Dynamic map interface with real-time vehicle markers, route visualization, and geofencing capabilities.

**Vehicle Management**
Searchable vehicle directory with detailed status indicators and telemetry data.

**Responsive Design**
Fully responsive interface optimized for desktop, tablet, and mobile devices.

**Status Monitoring**
- Active: Vehicle in motion
- Idle: Vehicle stopped with engine running
- Offline: No recent telemetry data

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## Installation

```bash
# Clone the repository
git clone https://github.com/Thiagocsoaresbh/fleetview-live-tracker.git
cd fleetview-live-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Configuration

### WebSocket Connection

Update the WebSocket URL in `src/pages/Index.tsx`:

```typescript
const WEBSOCKET_URL = 'ws://localhost:8000/ws';
// Production: wss://your-backend.com/ws
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_WS_URL=ws://localhost:8000/ws
VITE_API_URL=http://localhost:8000/api
```

## Project Structure

```
fleetview-live-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Application header
│   │   ├── MetricsPanel.tsx # Fleet metrics display
│   │   ├── VehicleList.tsx  # Vehicle directory
│   │   └── FleetMap.tsx     # Map component
│   ├── contexts/            # State management
│   │   └── VehicleContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useWebSocket.ts
│   ├── types/               # TypeScript definitions
│   │   └── vehicle.ts
│   ├── data/                # Data models
│   │   └── mockVehicles.ts
│   └── pages/               # Page components
│       └── Index.tsx
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## WebSocket Protocol

### Message Format

```json
{
  "type": "vehicle_update",
  "data": {
    "vehicleId": "v1",
    "position": {
      "lat": -23.5505,
      "lng": -46.6333
    },
    "speed": 45,
    "heading": 90,
    "status": "active",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ws` | WebSocket | Real-time vehicle updates |
| `/api/vehicles` | GET | Retrieve all vehicles |
| `/api/vehicles/:id` | GET | Retrieve specific vehicle |

## Development

```bash
# Start development server with hot reload
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Build

```bash
npm run build
```

Optimized production files will be generated in the `dist/` directory.

## Deployment

### Recommended Platforms
- **Vercel** - Zero-configuration deployment
- **Netlify** - Continuous deployment from Git
- **AWS S3 + CloudFront** - Static hosting with CDN
- **Docker** - Containerized deployment

## Security Considerations

- Use WSS (WebSocket Secure) in production environments
- Implement proper authentication and authorization
- Validate all incoming WebSocket messages
- Use environment variables for sensitive configuration
- Enable CORS only for trusted domains

## Customization

### Adding Vehicle Properties

1. Update type definitions in `src/types/vehicle.ts`
2. Modify `src/components/VehicleList.tsx` to display new fields
3. Update map popups in `src/components/FleetMap.tsx`

### Theming

The application uses a modern dark theme. Color palette:
- Primary: `hsl(175 70% 45%)`
- Background: `hsl(220 25% 10%)`
- Success: `hsl(142 76% 36%)`
- Warning: `hsl(38 92% 50%)`
- Destructive: `hsl(0 72% 51%)`

## Troubleshooting

**WebSocket Connection Failed**
- Verify backend server is running
- Check CORS configuration on backend
- Ensure correct WebSocket URL in configuration
- Review browser console for connection errors

**Map Not Displaying**
- Verify Leaflet CSS is properly imported
- Check browser console for tile loading errors
- Ensure valid coordinate values

## License

MIT License - See LICENSE file for details.

## Contact

Thiago Soares
- GitHub: [@Thiagocsoaresbh](https://github.com/Thiagocsoaresbh)
- Project: [FleetView Live Tracker](https://github.com/Thiagocsoaresbh/fleetview-live-tracker)
- Twitter/X: @thiagocsoares