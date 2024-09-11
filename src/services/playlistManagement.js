import { state } from './state.js';
import { loadAndPlayFile, updateFileList, updateTrackInfo, dialogUpdater, updateAutoPlayButton, updateRandomPlayButton, updatePlayPauseButton } from '../components/uiUpdates.js';
import { playNextSong } from "../components/audioControls.js";

export function playNewSong(index, shouldPushToPrevious = true) {
  state.audio.pause();
  shouldPushToPrevious && state.previousIndices.push(state.currentIndex);
  if (!shouldPushToPrevious) state.indexBeforePreviousButtonArrayPop = state.currentIndex;
  state.currentIndex = index;
  loadAndPlayFile();
  dialogUpdater(state.playlist[index]);
}

export function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * state.folderTrackCount);
  playNewSong(randomIndex);
}

export function toggleAutoPlay() {
  state.isAutoPlayEnabled = !state.isAutoPlayEnabled;
  updateAutoPlayButton();
  state.audio.paused && handleSongEnd();
}

export function toggleRandomPlay() {
  state.isRandomEnabled = !state.isRandomEnabled;
  updateRandomPlayButton();
}

export function handleFileInputChange(event) {
  if (event.target.files.length < 1) return;
  
  state.playlist = Array.from(event.target.files);
  state.folderTrackCount = state.playlist.length;
  state.currentIndex = 0;
  state.previousIndices = [];
  loadAndPlayFile(false);
  updateFileList();
  updateTrackInfo();
  dialogUpdater(state.playlist[state.currentIndex]);
}

export function handleSongEnd() {
  if (state.isAutoPlayEnabled) {
    if (state.isRandomEnabled) {
      playRandomSong();
    } else if (state.currentIndex < state.folderTrackCount - 1) {
      playNextSong();
    }
  } else {
    updatePlayPauseButton();
  }
}