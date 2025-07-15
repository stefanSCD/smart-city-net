import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { getProblems } from '../api';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          <Avatar alt="Anonymous User" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
        </AvatarGroup>
        <Typography variant="caption">Anonymous User</Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search' }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [problems, setProblems] = React.useState([]);

  React.useEffect(() => {
    const fetchProblems = async () => {
      const response = await getProblems();
      setProblems(response.data);
    };
    fetchProblems();
  }, []);

  function getRandomProblems(arr, count = 4) {
    if (!arr.length) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  const cardData = getRandomProblems(problems);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Reports
        </Typography>
        <Typography>Check the latest reports</Typography>
      </div>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'row', gap: 1, width: { xs: '100%', md: 'fit-content' }, overflow: 'auto' }}>
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, width: '100%', justifyContent: 'space-between', alignItems: { xs: 'start', md: 'center' }, gap: 4, overflow: 'auto' }}>
        <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip onClick={handleClick} size="medium" label="Police" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Garbage" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Town Hall" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Other" sx={{ backgroundColor: 'transparent', border: 'none' }} />
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', gap: 1, width: { xs: '100%', md: 'fit-content' }, overflow: 'auto' }}>
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
      >
          {cardData.map((problem, index) => (
            <SyledCard
              key={problem.id}
              variant="outlined"
              sx={{
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                alt="problem"
                image={`http://localhost:5009${problem.imagePath}`}
                sx={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {problem.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {problem.name}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {problem.description}
                </StyledTypography>
              </SyledCardContent>
              <Author />
            </SyledCard>
          ))}
        </Box>
    </Box>
  );
}
