import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'

import { requestSongPlayUrls } from 'Api/playList'
import { AppState } from 'Store/index'
import { types as playerTypes, actions as playerActions } from 'Store/components/Player'

interface Props {
  // actions
  savePercentage: typeof playerActions.savePercentage;
  saveCurrentSongIndex: typeof playerActions.saveCurrentSongIndex;
  saveCurrentSong: typeof playerActions.saveCurrentSong;
}

type EffectCallBack = void | (() => void)

function Audio(props: Props): JSX.Element {
  let audioRef = React.createRef<HTMLAudioElement>()

  const currentSong = useSelector(({ player }: AppState): playerTypes.Song => player.currentSong)
  // 获取当前播放可取的播放 url
  const [playUrl, setPlayUrl] = useState()
  useEffect((): EffectCallBack => {
    async function handleRequestSongPlayUrls(song: playerTypes.Song): Promise<void> {
      try {
        const songPlayUrlDatas = await requestSongPlayUrls(`${song.id}`)
        const songPlayUrlData = songPlayUrlDatas[0]
        const playUrl = songPlayUrlData.url
        setPlayUrl(playUrl)
      } catch (error) {
        console.error(error.message)
      }
    }

    if (currentSong.id) {
      handleRequestSongPlayUrls(currentSong)
    }
  }, [currentSong])

  // 获取当前播放进度百分比
  useEffect((): EffectCallBack => {
    function handleTimeUpdate(e): void {
      const { target } = e
      const { currentTime, duration } = target

      if (!currentTime || !duration) {
        return
      }

      const percentage = currentTime / duration
      props.savePercentage(percentage)
    }

    const audio = audioRef.current

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate)
    }

    return (): void => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  })

  const playList = useSelector(({ player }: AppState): playerTypes.Song[] => player.playList)
  const currentSongIndex = useSelector(({ player }: AppState): number => player.currentSongIndex)
  const percentage = useSelector(({ player }: AppState): number => player.percentage)
  // 当前播放进度为百分百的时候，切换下一首歌
  useEffect((): EffectCallBack => {
    function playNextSong(): void {
      const { saveCurrentSongIndex, saveCurrentSong } = props
      const length = playList.length

      let nextSongIndex = currentSongIndex + 1

      if (length <= nextSongIndex) {
        nextSongIndex = 0
      }

      saveCurrentSongIndex(nextSongIndex)
      saveCurrentSong(playList[nextSongIndex])
    }

    const { savePercentage } = props
    savePercentage(percentage)

    if (percentage === 1) {
      playNextSong() // 播放下一首歌
      savePercentage(0) // 将播放进度百分比重置为 0
    }
  }, [percentage])

  return (
    <div>
      <audio src={playUrl} controls ref={audioRef} autoPlay></audio>
    </div>
  )
}

const mapDispatchToProps = {
  savePercentage: playerActions.savePercentage,
  saveCurrentSongIndex: playerActions.saveCurrentSongIndex,
  saveCurrentSong: playerActions.saveCurrentSong
}

export default connect(undefined, mapDispatchToProps)(Audio)
