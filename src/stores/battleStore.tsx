import { makeAutoObservable, toJS } from 'mobx';
import { RootStore } from './rootStore';
import { Pokemon, Battle } from '../types/types';

export class BattleStore {
   constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  rootStore?: RootStore = undefined;

  private _battle?: Battle = undefined;
  private _gameOver: boolean = false;

  public get battle(): Battle | undefined {
    return toJS(this._battle);
  }
  public set battle(value: Battle | undefined) {
    this._battle = value;
  }

  public get gameOver(): boolean {
    return this._gameOver;
  }
  public set gameOver(value: boolean) {
    this._gameOver = value;
  }

  startBattle = async (playerPokemonId: number) => {
    try {
     
      this.battle = { 
        player : this.rootStore?.uiStore.getPokemonById(playerPokemonId),
        opponent: this.rootStore?.uiStore.getRandomPokemon(),
        opponentTotalScore: 100,
        playerTotalScore: 100,
        opponentCurrentScore: 0,
        playerCurrentScore: 0,
        totalGames: 0,
        totalWins: 0
      }
      
    } catch (e) {
      this.gameOver = false
      console.error(e);
    }
  };

  playerAttack = () => {
    if(this._battle){ 
     this._battle.playerCurrentScore = Math.floor(Math.random() * 6) + 1
     this._battle.opponentCurrentScore = Math.floor(Math.random() * 6) + 1
     this._battle.playerTotalScore -= this._battle.playerCurrentScore
     this._battle.playerTotalScore = this._battle.playerTotalScore < 0 ? 0 : this._battle.playerTotalScore
     this._battle.opponentTotalScore -= this._battle.opponentCurrentScore
     this._battle.opponentTotalScore = this._battle.opponentTotalScore < 0 ? 0 : this._battle.opponentTotalScore
     if(this._battle.opponentTotalScore <= 0 || this._battle.playerTotalScore <= 0){
      this.gameOver = true
     }
    }
  };

  resetBattle = () => {
    this.battle = undefined
    this.gameOver = false
  };

  tryAgain = () => {
    if(this._battle){
      this._battle.playerCurrentScore = 0
      this._battle.opponentCurrentScore = 0
      this._battle.totalGames += 1
      this._battle.totalWins += this._battle.playerTotalScore > 0 ? 1 : 0
      this._battle.playerTotalScore = 100
      this._battle.opponentTotalScore = 100
      this.gameOver = false
    }
  };
}