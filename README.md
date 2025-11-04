# FleetView Monitor - Real-time Vehicle Simulation Dashboard

![FleetView Monitor](https://img.shields.io/badge/Status-Demo-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> **⚠️ Important Notice**: This is a **generic, open-source demonstration project** created for technical interviews. It is inspired by real-world fleet monitoring solutions but **does not contain any proprietary or confidential code**. All implementation details are publicly available and designed for educational purposes.

## 🎯 Project Overview

FleetView Monitor is a modern, real-time vehicle tracking dashboard built to demonstrate proficiency in:

- ✅ **Frontend Architecture**: React.js with TypeScript
- ✅ **Real-time Communication**: WebSocket integration
- ✅ **Interactive Maps**: Leaflet.js for geospatial visualization
- ✅ **Modern UI/UX**: Responsive design with Tailwind CSS
- ✅ **State Management**: Context API with custom hooks
- ✅ **Type Safety**: Full TypeScript implementation

### Backend Integration (Separate Repository)

This frontend is designed to connect to a **FastAPI backend** with:

- 🐍 **Python FastAPI** - High-performance async API
- 📡 **WebSocket Server** - Real-time vehicle updates
- 🔄 **Celery Workers** - Simulated GPS data processing
- 📦 **Redis** - Message broker and caching
- 🗄️ **PostgreSQL** - Vehicle and telemetry data storage
- 🐳 **Docker Compose** - Complete local infrastructure

> **Note**: The backend is developed separately. This repository contains only the frontend application.

## 🚀 Features

### Current Implementation

- 🗺️ **Interactive Map**: Real-time vehicle positions with Leaflet.js
- 📊 **Metrics Dashboard**: Fleet statistics (total, active, idle, offline)
- 🚗 **Vehicle List**: Searchable list with status indicators
- 🔌 **WebSocket Client**: Ready to connect to backend API
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Modern UI**: Dark theme with tech-inspired design system

### Vehicle Status Indicators

- 🟢 **Active**: Vehicle in motion
- 🟡 **Idle**: Vehicle stopped with engine on
- 🔴 **Offline**: No telemetry data

## 🛠️ Tech Stack

### Frontend (This Repository)

| Technology | Purpose |
|------------|---------|
| React 18.3 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Leaflet.js | Interactive maps |
| WebSocket API | Real-time communication |
| Lucide React | Icon library |
| Shadcn/ui | UI components |

### Expected Backend Stack

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API & WebSocket server |
| Celery | Async task processing |
| Redis | Message broker |
| PostgreSQL | Data persistence |
| Docker Compose | Local orchestration |

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fleetview-monitor.git
cd fleetview-monitor
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

### 4. Connect to Backend (Optional)

To connect to a real backend, update the WebSocket URL in `src/pages/Index.tsx`:

```typescript
const WEBSOCKET_URL = 'ws://localhost:8000/ws';
// or for production:
// const WEBSOCKET_URL = 'wss://your-backend.com/ws';
```

## 📡 WebSocket Protocol

### Expected Message Format

#### Vehicle Update (Server → Client)

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

### Connection Endpoints

- **Development**: `ws://localhost:8000/ws`
- **Production**: Configure based on your deployment

## 🏗️ Project Structure

```
fleetview-monitor/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with connection status
│   │   ├── MetricsPanel.tsx # Fleet metrics cards
│   │   ├── VehicleList.tsx  # Searchable vehicle list
│   │   └── FleetMap.tsx     # Leaflet map component
│   ├── contexts/            # React Context providers
│   │   └── VehicleContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useWebSocket.ts  # WebSocket management
│   ├── types/               # TypeScript definitions
│   │   └── vehicle.ts
│   ├── data/                # Mock data
│   │   └── mockVehicles.ts
│   └── pages/               # Page components
│       └── Index.tsx        # Main dashboard
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🎨 Design System

The application uses a tech-inspired dark theme:

- **Primary**: Cyan/Teal (`hsl(175 70% 45%)`)
- **Background**: Dark blue-gray (`hsl(220 25% 10%)`)
- **Success**: Green (`hsl(142 76% 36%)`)
- **Warning**: Orange (`hsl(38 92% 50%)`)
- **Destructive**: Red (`hsl(0 72% 51%)`)

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Vehicle Properties

1. Update `src/types/vehicle.ts`
2. Modify `src/components/VehicleList.tsx` to display new fields
3. Update map popup in `src/components/FleetMap.tsx`

## 🔒 Security Considerations

- WebSocket connections should use WSS (WebSocket Secure) in production
- Implement authentication/authorization on backend
- Validate all incoming WebSocket messages
- Use environment variables for configuration

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Deploy Options

- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment from Git
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Docker**: Containerized deployment

## 🤝 Integration with Backend

### Expected Backend Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/ws` | WebSocket | Real-time vehicle updates |
| `/api/vehicles` | GET | Fetch all vehicles |
| `/api/vehicles/:id` | GET | Fetch single vehicle |

### Environment Variables

Create a `.env` file for configuration:

```env
VITE_WS_URL=ws://localhost:8000/ws
VITE_API_URL=http://localhost:8000/api
```

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Celery Documentation](https://docs.celeryq.dev/)
- [Leaflet.js Guide](https://leafletjs.com/)
- [WebSocket MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## 📝 Interview Talking Points

When presenting this project in interviews, highlight:

1. **Architecture Decisions**: Why Context API vs Redux, WebSocket vs polling
2. **Performance**: Map marker optimization, memo usage, efficient re-renders
3. **Type Safety**: TypeScript benefits in large-scale apps
4. **Real-time Data**: Challenges with WebSocket reconnection, data synchronization
5. **Scalability**: How to handle 1000+ vehicles (virtualization, clustering)
6. **Testing Strategy**: Unit tests for hooks, integration tests for WebSocket

## 🐛 Troubleshooting

### WebSocket Won't Connect

- Verify backend is running
- Check CORS configuration
- Ensure correct WebSocket URL
- Check browser console for errors

### Map Not Displaying

- Verify Leaflet CSS is imported
- Check browser console for tile loading errors
- Ensure coordinates are valid

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Your Name**
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)

---

**Disclaimer**: This project is for demonstration purposes only. It does not contain any proprietary code from real fleet management systems. All code is original and open-source.
