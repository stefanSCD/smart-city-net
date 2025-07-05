import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

// Același design ca în SignIn.jsx
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles?.('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function UserSettings(props) {
  const [formData, setFormData] = React.useState({
    email: 'user@example.com',
    firstName: 'John',
    middleName: 'A.',
    lastName: 'Doe',
    phone: '0722123123',
    oldPassword: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log('Saving user data:', formData);
    // Aici poți apela un API gen `updateUser(formData)`
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="md"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}
      ></Container>
      <Container
        maxWidth="md"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}
      >
        <Typography variant="h4" align="center">User Settings</Typography>
        <Card variant="outlined">
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>First Name</FormLabel>
            <TextField
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Middle Name</FormLabel>
            <TextField
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Last Name</FormLabel>
            <TextField
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Phone</FormLabel>
            <TextField
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Old Password</FormLabel>
            <TextField
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>New Password</FormLabel>
            <TextField
              name="newPassword"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </Card>
      </Container>
      <Footer />
    </AppTheme>
  );
}
