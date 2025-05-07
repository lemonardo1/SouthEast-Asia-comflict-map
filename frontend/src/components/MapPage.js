import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Paper, Drawer } from '@mui/material';
import { fetchEvents } from '../redux/slices/eventsSlice';
import { setMapCenter, setZoom } from '../redux/slices/uiSlice';
import FilterPanel from './FilterPanel';
import TimelineSlider from './TimelineSlider';
import SidePanel from './SidePanel';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons for different event types
const eventIcons = {
  military: new L.Icon({
    iconUrl: '/icons/military.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10],
  }),
  diplomatic: new L.Icon({
    iconUrl: '/icons/diplomatic.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10],
  }),
  protest: new L.Icon({
    iconUrl: '/icons/protest.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10],
  }),
  humanitarian: new L.Icon({
    iconUrl: '/icons/humanitarian.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10],
  }),
  // Default icon for other event types
  default: new L.Icon.Default(),
};

// Component to sync map state with Redux
const MapController = () => {
  const dispatch = useDispatch();
  const map = useMap();
  
  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      dispatch(setMapCenter([center.lat, center.lng]));
      dispatch(setZoom(map.getZoom()));
    };
    
    map.on('moveend', handleMoveEnd);
    
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [dispatch, map]);
  
  return null;
};

const MapPage = () => {
  const dispatch = useDispatch();
  const { items: events, status, error } = useSelector((state) => state.events);
  const filters = useSelector((state) => state.filters);
  const { currentMapCenter, currentZoom, sidebarOpen } = useSelector((state) => state.ui);
  
  useEffect(() => {
    // Fetch events when component mounts or filters change
    dispatch(fetchEvents(filters));
  }, [dispatch, filters]);

  const getEventIcon = (eventType) => {
    return eventIcons[eventType] || eventIcons.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <MapContainer
        center={currentMapCenter}
        zoom={currentZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {events.map((event) => (
          <Marker
            key={event._id}
            position={[event.location.coordinates[1], event.location.coordinates[0]]}
            icon={getEventIcon(event.type)}
          >
            <Popup className="event-popup">
              <div className="event-popup-title">{event.title}</div>
              <div className="event-popup-date">{formatDate(event.date)}</div>
              <div className="event-popup-description">{event.description}</div>
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} />
              )}
              <div className="event-popup-source">
                Source: <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">{event.source}</a>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapController />
      </MapContainer>
      
      {/* Control Panel */}
      <Paper className="control-panel">
        <FilterPanel />
      </Paper>
      
      {/* Timeline */}
      <Paper className="timeline-container">
        <TimelineSlider />
      </Paper>
      
      {/* Side Panel */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => dispatch({ type: 'ui/setSidebarOpen', payload: false })}
      >
        <SidePanel />
      </Drawer>
    </Box>
  );
};

export default MapPage;
