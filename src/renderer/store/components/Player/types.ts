// state type

/** 歌单歌曲数据 */
export interface PlayListItem {
  name: string;
  id: number;
}

/** 歌手 */
interface Artist {
  name: string;
  id: number;
}

/** 专辑 */
interface Album {
  id: number;
  name: string;
}

export interface Song {
  id: number;
  name: string;
  ar: Artist[];
  al: Album;
}

export interface State {
  playList: PlayListItem[]; // 歌单歌曲列表
  currentSong: Song; // 当前在播放的歌曲
  percentage: number; // 当前播放进度百分比
  playState: boolean; // 播放器播放状态
}

// action type

export const SAVE_PLAY_LIST = 'COMPONENTS_PLAYER/SAVE_PLAY_LIST_DETAIL'
export interface SavePlayListAction {
  type: typeof SAVE_PLAY_LIST;
  payload: {
    playList: PlayListItem[];
  };
}

export const SAVE_CURRENT_SONG = 'COMPONENTS_PLAYER/SAVE_CURRENT_SONG'
export interface SaveCurrentSongAction {
  type: typeof SAVE_CURRENT_SONG;
  payload: {
    currentSong: Song;
  };
}

export const SAVE_PERCENTAGE = 'COMPONENTS_PLAYER/SAVE_PERCENTAGE'
export interface SavePercentageAction {
  type: typeof SAVE_PERCENTAGE;
  payload: {
    percentage: number;
  };
}

export const SAVE_PLAY_STATE = 'COMPONENTS_PLAYER/SAVE_PLAY_STATE'
export interface SavePlayStateAction {
  type: typeof SAVE_PLAY_STATE;
  payload: {
    playState: boolean;
  };
}

export type ActionTypes = SavePlayListAction | SaveCurrentSongAction
| SavePercentageAction | SavePlayStateAction
