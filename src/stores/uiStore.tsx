import { makeAutoObservable, toJS } from 'mobx';
import { RootStore } from './rootStore';
import { Pokemon } from '../types/types';

export class UiStore {
   constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.getPokemons()
  }
  rootStore?: RootStore = undefined;

  private _pokemons: Pokemon[] = [];
  public get pokemons(): Pokemon[] {
    return toJS(this._pokemons);
  }
  public set pokemons(value: Pokemon[]) {
    this._pokemons = value;
  }

  getPokemons = async () => {
    try {
      //better move url to env
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      const rawPokemons = await res.json() 
      this.pokemons = rawPokemons.results?.map((raw : any, index: number) =>{
        return { name: raw.name, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
      })

      // console.log("store pokemons", this.pokemons)
      
    } catch (e) {
      console.error(e);
    }
  };

  
}