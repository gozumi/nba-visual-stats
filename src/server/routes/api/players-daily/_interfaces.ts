export interface IDaily {
  uid: string
  title: string
  deep_link: string
  last_updated: string
  count: number
  items: IDailyItem[]
}

export interface IDailyItem {
  uid: string
  title: string
  deep_link: string
  last_updated: string
  count: number
  templtate: string
  items: ITopStats[] | ILiveStats[]
}

export interface ITopStats {
  title: string
  deep_link: string
  name: string
  timestamp: string
  season: string
  seasontype: string
  gamedate: string
  leagueid: string
  urldate: string
  permode: string
  playerstats?: IPlayerStat[]
  teamstats?: ITeamStat[]
}

export interface ILiveStats {
  title: string
  deep_link: string
  name: string
  timestamp: string
  gamedate: string
  livegamestate: ILiveGameState[]
}

export interface ILiveGameState {
  LEAGUE_ID: string,
  LIVE_GAME_COUNT: number,
  LIVE_GAME_FLAG: string

}

export interface IPlayerStat {
  GAME_ID: string
  PLAYER_ID: string
  PLAYER_NAME: string
  TEAM_ID: string
  TEAM_ABBREVIATION: string
  URL_DATE: string
  URL_TEAMS: string
  PTS?: number
  REB?: number
  AST?: number
  BLK?: number
  STL?: number
  TOV?: number
  FG3M?: number
  FTM?: number
  NBA_FANTASY_PTS?: number
}

export interface ITeamStat {
  GAME_ID: string
  TEAM_ID: string
  TEAM_CITY: string
  TEAM_NAME: string
  TEAM_ABBREVIATION: string
  URL_DATE: string
  URL_TEAMS: string
  PTS?: number
  REB?: number
  AST?: number
  BLK?: number
  STL?: number
  TOV?: number
  FG3M?: number
  FTM?: number
  FG_PCT?: number
  FT_PCT?: number
  NBA_FANTASY_PTS?: number
}
