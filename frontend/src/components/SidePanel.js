import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';

const SidePanel = () => {
  const { items: events } = useSelector((state) => state.events);
  const { selectedEvent } = useSelector((state) => state.events);

  // Sort events by date (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy HH:mm');
  };

  return (
    <Box sx={{ width: 320, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Events
      </Typography>

      {selectedEvent && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {selectedEvent.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatDate(selectedEvent.date)}
          </Typography>
          {selectedEvent.imageUrl && (
            <Box sx={{ my: 2 }}>
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                style={{ width: '100%', borderRadius: 4 }}
              />
            </Box>
          )}
          <Typography variant="body2" paragraph>
            {selectedEvent.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Source:{' '}
            <a
              href={selectedEvent.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedEvent.source}
            </a>
          </Typography>
        </Paper>
      )}

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {sortedEvents.map((event) => (
          <React.Fragment key={event._id}>
            <ListItem alignItems="flex-start" button>
              <ListItemText
                primary={event.title}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {formatDate(event.date)}
                    </Typography>
                    {` — ${event.description.substring(0, 100)}...`}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SidePanel;
