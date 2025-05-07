import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  setDateRange,
  setEventTypes,
  setRegions,
  setSearchQuery,
  resetFilters,
} from '../redux/slices/filtersSlice';

const eventTypeOptions = [
  { value: 'military', label: 'Military Clashes' },
  { value: 'diplomatic', label: 'Diplomatic Events' },
  { value: 'protest', label: 'Protests' },
  { value: 'humanitarian', label: 'Humanitarian' },
  { value: 'other', label: 'Other' },
];

const regionOptions = [
  { value: 'kashmir', label: 'Kashmir' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'sindh', label: 'Sindh' },
  { value: 'balochistan', label: 'Balochistan' },
  { value: 'gilgit', label: 'Gilgit-Baltistan' },
  { value: 'loc', label: 'Line of Control' },
];

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { dateRange, eventTypes, regions, searchQuery } = useSelector(
    (state) => state.filters
  );

  const handleDateRangeChange = (type, newDate) => {
    dispatch(
      setDateRange({
        ...dateRange,
        [type]: newDate.toISOString(),
      })
    );
  };

  const handleEventTypesChange = (event) => {
    dispatch(setEventTypes(event.target.value));
  };

  const handleRegionsChange = (event) => {
    dispatch(setRegions(event.target.value));
  };

  const handleSearchQueryChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ mb: 2 }}>
          <DatePicker
            label="Start Date"
            value={new Date(dateRange.start)}
            onChange={(newValue) => handleDateRangeChange('start', newValue)}
            slotProps={{ textField: { fullWidth: true, size: "small", sx: { mb: 2 } } }}
          />
          <DatePicker
            label="End Date"
            value={new Date(dateRange.end)}
            onChange={(newValue) => handleDateRangeChange('end', newValue)}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
          />
        </Box>
      </LocalizationProvider>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="event-types-label">Event Types</InputLabel>
        <Select
          labelId="event-types-label"
          id="event-types"
          multiple
          value={eventTypes}
          onChange={handleEventTypesChange}
          input={<OutlinedInput id="select-multiple-chip" label="Event Types" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={eventTypeOptions.find((option) => option.value === value)?.label || value}
                  size="small"
                />
              ))}
            </Box>
          )}
          size="small"
        >
          {eventTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="regions-label">Regions</InputLabel>
        <Select
          labelId="regions-label"
          id="regions"
          multiple
          value={regions}
          onChange={handleRegionsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Regions" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={regionOptions.find((option) => option.value === value)?.label || value}
                  size="small"
                />
              ))}
            </Box>
          )}
          size="small"
        >
          {regionOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        size="small"
        sx={{ mb: 2 }}
      />

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleResetFilters}
        fullWidth
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel;
