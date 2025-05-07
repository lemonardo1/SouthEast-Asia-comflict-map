import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Slider, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { setDateRange } from '../redux/slices/filtersSlice';
import { format, parseISO, differenceInDays } from 'date-fns';

const TimelineSlider = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state) => state.filters);
  const { items: events } = useSelector((state) => state.events);
  
  const [sliderValue, setSliderValue] = useState(100); // 0-100 percentage
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineRange, setTimelineRange] = useState({
    min: parseISO(dateRange.start),
    max: parseISO(dateRange.end),
  });

  // Update timeline range when events or dateRange changes
  useEffect(() => {
    if (events.length > 0) {
      // Find the earliest and latest event dates
      const dates = events.map(event => new Date(event.date));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      
      setTimelineRange({
        min: minDate,
        max: maxDate,
      });
    } else {
      // Default to the filter date range if no events
      setTimelineRange({
        min: parseISO(dateRange.start),
        max: parseISO(dateRange.end),
      });
    }
  }, [events, dateRange]);

  // Handle timeline playback
  useEffect(() => {
    let intervalId;
    
    if (isPlaying) {
      intervalId = setInterval(() => {
        setSliderValue((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 500);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  // Convert slider value to date
  const sliderValueToDate = (value) => {
    const { min, max } = timelineRange;
    const totalDays = differenceInDays(max, min);
    const daysToAdd = (totalDays * value) / 100;
    
    return new Date(min.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    
    const currentDate = sliderValueToDate(newValue);
    
    // Update the end date in the filter to show events up to this point
    dispatch(
      setDateRange({
        ...dateRange,
        end: currentDate.toISOString(),
      })
    );
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatSliderLabel = (value) => {
    const date = sliderValueToDate(value);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ minWidth: 100 }}>
          {format(timelineRange.min, 'MMM d, yyyy')}
        </Typography>
        
        <IconButton 
          size="small" 
          onClick={togglePlayback}
          color="primary"
          sx={{ mx: 1 }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        
        <Typography variant="body2" sx={{ minWidth: 100, textAlign: 'right' }}>
          {format(timelineRange.max, 'MMM d, yyyy')}
        </Typography>
      </Box>
      
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatSliderLabel}
        min={0}
        max={100}
        sx={{ mt: 1 }}
      />
      
      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        Current: {formatSliderLabel(sliderValue)}
      </Typography>
    </Box>
  );
};

export default TimelineSlider;
