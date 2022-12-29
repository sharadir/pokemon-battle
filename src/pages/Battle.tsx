import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useStores } from '../stores/hooks/hooks';
import './Battle.css';
import { observer } from 'mobx-react';
import {useLocation} from 'react-router-dom';

const Battle = () => {
  const { uiStore } = useStores();
  const location = useLocation();
  console.log("location",location.state)
  if(uiStore.loading){
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (
    <React.Fragment >
      <Box className="Battle-wrapper">
        <header className="Battle-header" >
          <center>Pokemon battle simulator</center>
        </header>
      </Box>
    </React.Fragment>
  );
}

export default observer(Battle);