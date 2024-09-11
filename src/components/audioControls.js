import { elements } from './elements.js';
import { state } from '../services/state.js';
import { SEEK_TIME, MAX_TIME_BEFORE_END, NEAR_END_TIME, ROTATION_ANGLE_FAST_FORWARD, ROTATION_ANGLE_REWIND, ROTATION_DURATION, BUTTON_ANIMATION_DURATION, buttonRotationMap } from '../utils/constants.js';
import { playNewSong, playRandomSong } from '../services/playlistManagement.js';
import { updatePlayPauseButton } from './uiUpdates.js';

export function handleSliderInput() {
  const currentSliderValue = this.value;
  const audioSliderValue = state.audio.duration / state.audio.duration;
  let inputTime = Math.floor(currentSliderValue * audioSliderValue);
  state.audio.currentTime = inputTime;
}

export function playNextSong() {
  if (state.isRandomEnabled === false && state.currentIndex === state.folderTrackCount - 1) return

  if (!state.isRandomEnabled && state.currentIndex < state.folderTrackCount - 1) {
    playNewSong(state.currentIndex + 1);
  } else if (state.isRandomEnabled) {
    playRandomSong();
  }
  animateButtonPreviousNextSong(elements.nextSongButton, "./assets/images/ForwardButtonDouble.svg", "./assets/images/ForwardButton.svg");
}

export function playPreviousSong() {
  if (state.currentIndex === 0) return

  if (state.previousIndices.length >= 1) {
    playNewSong(state.previousIndices.pop(), false);
  }
  animateButtonPreviousNextSong(elements.previousSongButton, "./assets/images/BackButtonDouble.svg", "./assets/images/BackButton.svg");
}

export function fastForwardAudio() {
  const { duration, currentTime } = state.audio;
  if (currentTime === duration) return;

  if (duration - MAX_TIME_BEFORE_END > currentTime) {
    state.audio.currentTime += SEEK_TIME;
  } else if (duration - NEAR_END_TIME > currentTime) {
    state.audio.currentTime = duration - NEAR_END_TIME;
  }
  if (currentTime !== duration) {
    playAudioIfPaused();
    animateButtonFastForwardRewindButton(elements.fastForwardButton, ROTATION_ANGLE_FAST_FORWARD);
  }
}

export function rewindAudio() {
  state.audio.currentTime -= SEEK_TIME;
  playAudioIfPaused();
  animateButtonFastForwardRewindButton(elements.rewindButton, ROTATION_ANGLE_REWIND);
}

export function togglePlayPause(defaultValue = true) {
  if (state.audio.paused && !defaultValue) {
    return;
  } else if (state.audio.paused && defaultValue) {
    state.audio.play();
  } else {
    state.audio.pause();
  }
  updatePlayPauseButton();
}

function playAudioIfPaused() {
  if (state.audio.paused) {
    state.audio.play();
    updatePlayPauseButton();
  }
}

function animateButtonFastForwardRewindButton(buttonElement, rotationAngle) {
  buttonElement.style.transform = `rotate(${rotationAngle}deg)`;
  setTimeout(() => {
    buttonElement.style.transform = `rotate(${buttonRotationMap[buttonElement.id]}deg)`;
  }, ROTATION_DURATION);
}

function animateButtonPreviousNextSong(buttonElement, doubleSrc, normalSrc) {
  buttonElement.setAttribute("src", doubleSrc);
  setTimeout(() => {
    buttonElement.setAttribute("src", normalSrc);
  }, BUTTON_ANIMATION_DURATION);
}