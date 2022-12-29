import { makeAutoObservable, toJS } from 'mobx';
import { RootStore } from './rootStore';
import { Pokemon } from '../types/types';

export class UiStore {
   constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  rootStore?: RootStore = undefined;

  private _pokemons: Pokemon[] = [];
  private _loading: boolean = true;

  public get pokemons(): Pokemon[] {
    return toJS(this._pokemons);
  }
  public set pokemons(value: Pokemon[]) {
    this._pokemons = value;
  }

  public get loading(): boolean {
    return this._loading;
  }
  public set loading(value: boolean) {
    this._loading = value;
  }

  getPokemons = async () => {
    try {
      //better move url to env config file
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      const rawPokemons = await res.json() 
      this.pokemons = rawPokemons.results?.map((raw : any, index: number) =>{
        return { name: raw.name, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
      })
      this.loading = false
      // console.log("store pokemons", this.pokemons)
      
    } catch (e) {
      this.loading = false
      console.error(e);
    }
  };

  getPokemonById = (id: number): Pokemon => {
      if(this.pokemons.length > id && id > 0){
        return this.pokemons[id]
      }
      else {
        //return default pokemon
        return { name: '', image:''}
      }
  };

  getRandomPokemon = (): Pokemon => {
    if(this.pokemons.length > 0){
      return this.pokemons[Math.floor((Math.random()*this.pokemons.length))]
    }
    else {
      //return default pokemon
      return { name: '', image:''}
    }
  };

  initData = () => {
     this.getPokemons();
  };
  
}