
export interface Pokemon {
  name: string;
  image: string;
}

export interface Battle {
  player?: Pokemon;
  opponent?: Pokemon;
  playerTotalScore: number;
  opponentTotalScore: number;
  playerCurrentScore: number;
  opponentCurrentScore: number;
  totalGames: number;
  totalWins: number;
}


