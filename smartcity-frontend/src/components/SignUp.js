import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { Link as RouterLink } from 'react-router-dom';
import { Man } from '@mui/icons-material';
import { register } from '../api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  // minHeight: '100%',
  padding: theme.spacing(2),
  overflow: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // 'error' or 'success'
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [fnameError, setfNameError] = React.useState(false);
  const [fnameErrorMessage, setfNameErrorMessage] = React.useState('');
  const [lnameError, setlNameError] = React.useState(false);
  const [lnameErrorMessage, setlNameErrorMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const phone = document.getElementById('phone');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setfNameError(true);
      setfNameErrorMessage('First Name is required.');
      isValid = false;
    } else {
      setfNameError(false);
      setfNameErrorMessage('');
    }

    if (!lname.value || lname.value.length < 1) {
      setlNameError(true);
      setlNameErrorMessage('Last Name is required.');
      isValid = false;
    } else {
      setlNameError(false);
      setlNameErrorMessage('');
    }

    if (!phone.value || phone.value.length < 1) {
      setPhoneError(true);
      setPhoneErrorMessage('Phone Number is required.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    return isValid;
  };

  const showSnackbar = (message, severity = 'success') => {
  setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = validateInputs();
    if (!isValid) return;

    const data = new FormData(event.currentTarget);
    const Email = data.get('email');
    const Password = data.get('password');
    const First_Name = data.get('fname');
    const Middle_Name = data.get('mname');
    const Last_Name = data.get('lname');
    const Phone = data.get('phone');
    const Department_Id = null;
    const User_Type = 'user';

    try{
      const response = await register({Email, Password, First_Name, Middle_Name, Last_Name, Phone, Department_Id, User_Type});
      console.log('Registration success:', response.data);

      form.reset();
      showSnackbar('Account created successfully!', 'success');

      setEmailError(false);
      setPasswordError(false);
      setfNameError(false);
      setlNameError(false);
      setPhoneError(false);
    }catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);

      form.password.value = '';
      setPasswordError(true);
      setPasswordErrorMessage('Registration failed. Try again.');

      showSnackbar(error.response?.data?.message || 'Registration failed!', 'error');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
             <FormControl>
              <FormLabel htmlFor="fname">First name</FormLabel>
              <TextField
                autoComplete="fname"
                name="fname"
                required
                fullWidth
                id="fname"
                placeholder="Jon"
                error={fnameError}
                helperText={fnameErrorMessage}
                color={fnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mname">Middle name</FormLabel>
              <TextField
                autoComplete="mname"
                name="mname"
                required
                fullWidth
                id="mname"
                placeholder="Johny"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lname">Last name</FormLabel>
              <TextField
                autoComplete="lname"
                name="lname"
                required
                fullWidth
                id="lname"
                placeholder="Snow"
                error={lnameError}
                helperText={lnameErrorMessage}
                color={lnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <TextField
                autoComplete="phone"
                name="phone"
                required
                fullWidth
                id="phone"
                placeholder="Phone"
                error={phoneError}
                helperText={phoneErrorMessage}
                color={phoneError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Have an account?{' '}
              <Link
                component={RouterLink}
                to="/signin"  // aici pui ruta ta dorită
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign-in
              </Link>
            </Typography>
          </Box>
          
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </SignUpContainer>
    </AppTheme>
  );
}