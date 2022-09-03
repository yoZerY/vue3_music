import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('playerStore', {
  state: () => {
    return {
      playing: false,
      fullScreen: false,
      songList: [],
      playList: [],
      currentSong: {}
    }
  },
  actions: {
    playSong(song) {
      this.currentSong = song
      this.playing = true
      this.fullScreen = true
      const existSong = this.playList.find((item) => item.id === song.id)
      if (!existSong) {
        this.playList.push(song)
      }
    }
  }
})
