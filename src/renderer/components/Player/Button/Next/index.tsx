import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'Store/index'

import backIcon from './next.svg'
import styles from './style.scss'

function Next(): JSX.Element {
  const dispatch = useDispatch()
  const playerState = useSelector(({ player }: AppState): playerTypes.State => player)

  function handleClick(e: MouseEvent): void {
    e.stopPropagation()

    const playList = playerState.playList
    const length = playList.length

    /** 前一首歌在歌曲列表中的索引 */
    let previousSongIndex = playerState.currentSongIndex + 1

    if (length <= previousSongIndex) {
      previousSongIndex = 0
    }

    dispatch(playerActions.saveCurrentSongIndex(previousSongIndex))
    dispatch(playerActions.saveCurrentSong(playList[previousSongIndex]))
  }

  return (
    <img
      className={styles.img}
      src={backIcon}
      alt="下一首歌"
      title="下一首歌"
    />
  )
}

export default Next
