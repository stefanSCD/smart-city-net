import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(4),
  gap: theme.spacing(4),
  margin: 'auto',
  width: '100%',
  maxWidth: '1000px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles?.('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function SetMapCenter({ lat, lng }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function DetailedReportPage(props) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState({ lat: 44.4268, lng: 26.1025 });
  const [description, setDescription] = React.useState('');
  const [issueType, setIssueType] = React.useState('');

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Detailed Report:', {
      image: selectedFile,
      location: userLocation,
      description,
      issueType,
    });
    // Poți trimite datele către backend aici
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}></Container>
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}>
        <Typography variant="h4" align="center">Detailed Report</Typography>
        <Card variant="outlined">
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Upload a picture of the issue</Typography>
            <Button variant="outlined" component="label">
              Upload Image
              <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            </Button>
            {previewUrl && (
              <Box component="img" src={previewUrl} alt="Uploaded preview" sx={{ width: '100%', borderRadius: 2, maxHeight: 300, objectFit: 'contain' }} />
            )}
            <TextField
                id="description"
                type="description"
                name="description"
                placeholder="Describe the issue in detail"
                autoFocus
                fullWidth
                variant="outlined"
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="issue-type-label">Issue Type</InputLabel>
              <Select
                labelId="issue-type-label"
                id="issue-type-select"
                value={issueType}
                label="Issue Type"
                onChange={(e) => setIssueType(e.target.value)}
              >
                <MenuItem value="trash">Gunoi</MenuItem>
                <MenuItem value="graffiti">Graffiti</MenuItem>
                <MenuItem value="illegal_parking">Parcare Ilegală</MenuItem>
                <MenuItem value="pothole">Groapă</MenuItem>
                <MenuItem value="other">Altele</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Select your location</Typography>
            <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden' }}>
              <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationSelector setLocation={setUserLocation} />
                <SetMapCenter lat={userLocation.lat} lng={userLocation.lng} />
                <Marker position={[userLocation.lat, userLocation.lng]} icon={markerIcon} />
              </MapContainer>
            </Box>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              * Click on the map to move the pin and update the report location.
            </Typography>
            <Button variant="contained" onClick={handleSubmit}>Submit Report</Button>
          </Box>
        </Card>
      </Container>
      <Footer />
    </AppTheme>
  );
}
