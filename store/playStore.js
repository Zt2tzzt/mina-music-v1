import { HYEventStore } from 'hy-event-store'
import { getSongs, getSongLyric } from '../services/modules/player'
import parseLyric from '../utils/parse-lyric'
import { historyCollection } from '../database/index'

export const audioContext = wx.createInnerAudioContext()

export default new HYEventStore({
  state: {
    
    id: 0, // 歌曲 id

    songs: [], // 歌曲列表
    song: {}, // 歌曲
    songIndex: 0, // 歌曲索引
    lyrics: [], // 所有歌词
    lyric: '', // 一句歌词
    lyricIndex: -1, // 一句歌词的索引

    nowTime: 0, // 当前时间
    durationTime: 0, // 歌曲时长

    isFirstPlay: true,
    isPlaying: true,
    modeIndex: 0 // 0: 顺序播放；1：单曲循环；2：随机播放。

  },
  actions: {
    // 播放歌曲
    playSongAction(ctx, id) {
      // 同一首歌不需要重新加载
      if (id === ctx.id) return

      // 重置原来的数据
      ctx.song = {}
      ctx.lyricIndex = 0
      ctx.lyric = ''
      ctx.lyrics = []
      ctx.durationTime = 0

      // 保存 id
      ctx.id = id
      ctx.isPlaying = true

      // 根据 id 获取歌曲的信息
      getSongs(id).then(res => {
        console.log('song info res:', res)
        ctx.song = res.songs[0],
        ctx.durationTime = res.songs[0].dt
        historyCollection.insert(ctx.song)
      })

      // 根据 id 获取歌词的信息
      getSongLyric(id).then(res => {
        console.log('song lyric res:', res);
        const lyrics = parseLyric(res.lrc.lyric)
        console.log('lyrics:', lyrics);
        ctx.lyrics = lyrics
      })

      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      if (!ctx.isFirstPlay) return
      ctx.isFirstPlay = false

      // 监听歌曲播放进度
      audioContext.onTimeUpdate(() => {
        ctx.nowTime = audioContext.currentTime * 1000
        // 匹配正确的歌词
        const lyrics = ctx.lyrics
        const lyricLength = lyrics.length
        if (lyricLength === 0) return
        let lyricIndex = lyrics.findIndex(item => item.time > audioContext.currentTime * 1000)
        lyricIndex = lyricIndex === -1 ? lyricLength - 1 : lyricIndex - 1

        // 拿到歌词对应的时间，文本
        if (lyricIndex === ctx.lyricIndex) return
        console.log('set lyric');
        const lyric = ctx.lyrics[lyricIndex].text
        ctx.lyric = lyric
        ctx.lyricIndex = lyricIndex
      })

      audioContext.onWaiting(() => {
        audioContext.pause()
      })

      audioContext.onCanplay(() => {
        audioContext.play()
      })

      audioContext.onEnded(() => {
        // 如果是单曲循环，不需要切换下一首歌
        if (audioContext.loop) return
        // 切换下一首歌
        this.dispatch('playNewSongAction')
      })
    },

    playNewSongAction(ctx, isNext = true) {
      // 1. 获取歌曲列表和当前歌曲索引
      const length = ctx.songs.length
      let songIndex = ctx.songIndex
      // 2.计算索引
      const nexIndex = songIndex + 1
      const preIndex = songIndex - 1
      switch (ctx.modeIndex) {
        case 0:
        case 1:
          songIndex = isNext
            ? nexIndex === length
              ? 0
              : nexIndex
            : preIndex === -1
              ? length - 1
              : preIndex
          break
        case 2:
          const randomIndex = () => {
            let index = Math.floor(Math.random() * length)
            return index !== songIndex
              ? index
              : randomIndex()
          }
          songIndex = randomIndex()
          break
      }
      // 3. 播放新歌
      const song = ctx.songs[songIndex]
      this.dispatch('playSongAction', song.id)
      ctx.songIndex = songIndex
    },

    playOrPauseChangeAction(ctx) {
      const isPlaying = !audioContext.paused
      if (isPlaying) {
        audioContext.pause()
      } else {
        audioContext.play()
      }
      ctx.isPlaying = !isPlaying
    },

    modeChangeAction(ctx) {
      // 1.计算新的模式
      let modeIndex = ctx.modeIndex + 1
      ctx.modeIndex = modeIndex === 3 ? 0 : modeIndex
      // 2.设置是否单曲循环
      audioContext.loop = modeIndex === 1
    },
  }
})