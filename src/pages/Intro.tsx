import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useStores } from '../stores/hooks/hooks';
import './Intro.css';
import { observer } from 'mobx-react';

const Intro = () => {
  const { uiStore } = useStores();
  if(uiStore.loading){
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (
    <React.Fragment>
      <header className="Intro-header" >
        <center>Ready to rumble? Please select a pokemon...</center>
      </header>
      <ImageList sx={{ width: '80%', height: '80%', paddingTop: '3rem' }} cols={5} rowHeight={'auto'}>
      {uiStore.pokemons.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            title={item.name}
            alt={item.name}
            loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
    </React.Fragment>
  );
}

export default observer(Intro);