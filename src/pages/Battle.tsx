import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useStores } from '../stores/hooks/hooks';
import './Battle.css';
import { observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import ProgressBar from "../components/ProgressBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Battle = () => {
  const { battleStore } = useStores();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    battleStore.startBattle(location.state?.itemId);
  }, []);

  if(!location.state.itemId){
    navigate("/");
  }

  const handleAttack = () => {
    battleStore.playerAttack();
  }

  const tryAgain = () => {
    battleStore.tryAgain();
  }

  const anotherPokemon = () => {
    battleStore.resetBattle()
    navigate("/");
  }
 
  return (
      <Box className="grid-container">
        <header className="header" >
          <center>Pokemon battle simulator</center>
        </header>
          <Box className="player">
            <span style={{ color:"#2196F3" }}>Player</span>
            <ProgressBar bgcolor={"#2196F3"} completed={battleStore.battle?.playerTotalScore}/>
            <img
              width={200}
              height={200}
              src={`${battleStore.battle?.player?.image}?w=328&h=328&fit=crop&auto=format`}
              srcSet={`${battleStore.battle?.player?.image}?w=328&h=328&fit=crop&auto=format&dpr=2 2x`}
              title={battleStore.battle?.player?.name}
              alt={battleStore.battle?.player?.name}
              loading="lazy" />
          </Box>
          <Box className="score">
            <div className="score-container">
              <TextField
                disabled
                id="outlined-disabled"
                label="Your score"
                value={battleStore.battle?.playerCurrentScore || 0}
              />
              <TextField
                style={{ marginLeft: 10 }}
                disabled
                id="outlined-disabled"
                label="Opponent score"
                value={battleStore.battle?.opponentCurrentScore || 0}
              />
            </div>
            { !battleStore.gameOver && <Button  onClick={() => handleAttack()}  style={{ marginTop: 10 }} variant="contained">Attack!</Button>}
            { battleStore.battle && battleStore.battle.totalGames > 0 && <div style={{ color:"#2196F3", marginTop: 10 }}>{`You won ${battleStore.battle.totalWins} from ${battleStore.battle.totalGames}`} </div>}
            { battleStore.gameOver && <div style={{ color:"#2196F3", marginTop: 10 }}>Game Over!!! You { battleStore.battle && battleStore.battle?.playerTotalScore > 0 ? 'Won' : battleStore.battle && battleStore.battle?.opponentTotalScore > 0 ? 'Lost' : 'Drown'}</div>}
            { battleStore.gameOver && <Button  onClick={() => tryAgain()}  style={{ marginTop: 10 }} variant="contained">Try Again!</Button>}
            { battleStore.gameOver && <Button  color="success" onClick={() => anotherPokemon()}  style={{ marginTop: 10, marginLeft: 10 }} variant="contained">Try Another Pokemon</Button>}

          </Box>
          <Box className="opponent">
            <span style={{ color:"#2196F3" }}>Opponent</span>
            <ProgressBar bgcolor={"#2196F3"} completed={battleStore.battle?.opponentTotalScore}/>
            <img
              width={200}
              height={200}
              src={`${battleStore.battle?.opponent?.image}?w=328&h=328&fit=crop&auto=format`}
              srcSet={`${battleStore.battle?.opponent?.image}?w=328&h=328&fit=crop&auto=format&dpr=2 2x`}
              title={battleStore.battle?.opponent?.name}
              alt={battleStore.battle?.opponent?.name}
              loading="lazy" />
          </Box>
       
      </Box>
  );
}

export default observer(Battle);