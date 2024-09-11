import { elements } from './elements.js';
import { state } from '../services/state.js';
import { formatTime, arrayBufferToBase64 } from '../utils/utils.js';
import { readID3Tags } from '../services/id3TagsHandler.js';
import { playNewSong, handleSongEnd } from '../services/playlistManagement.js';

export function loadAndPlayFile(shouldPlay = true) {
  state.currentFile = state.playlist[state.currentIndex];
  const filePath = URL.createObjectURL(state.currentFile);
  state.audio = new Audio(filePath);
  state.audio.addEventListener('ended', handleSongEnd);
  state.audio.addEventListener('loadedmetadata', updateTotalTime);
  state.audio.addEventListener('timeupdate', updateCurrentTime);
  readID3Tags();
  shouldPlay && state.audio.play();
  updatePlayPauseButton();
}

export function updateTotalTime() {
  const duration = state.audio.duration;
  elements.totalTimeDisplay.textContent = formatTime(duration);
}

export function updateCurrentTime() {
  const currentTime = state.audio.currentTime;
  elements.currentTimeDisplay.textContent = formatTime(currentTime);
  elements.slider.value = currentTime;
  elements.slider.max = state.audio.duration;
}

export function updateTrackInfo(tags = {}) {
  elements.songTitle.textContent = tags.title || state.currentFile.name;
  elements.artistName.textContent = tags.artist || "";
  elements.albumName.textContent = tags.album || "";
  updateAlbumArt(tags.picture);
  elements.testElement.textContent = `Track Anzahl: ${state.folderTrackCount} & Aktueller Track: ${state.currentIndex + 1}`;
}

function updateAlbumArt(pictureData) {
  if (pictureData) {
    const { data, format } = pictureData;
    const base64String = arrayBufferToBase64(data);
    const albumArt = `url(data:${format};base64,${base64String})`;
    elements.playerContainer.style.setProperty("--background-image", albumArt);
    elements.currentSongCover.style.backgroundImage = albumArt;
  } else {
    const defaultCover = "url('./assets/images/defaultSongCover.jpg')";
    elements.playerContainer.style.setProperty("--background-image", defaultCover);
    elements.currentSongCover.style.backgroundImage = defaultCover;
  }
}

export function updateFileList() {
  elements.fileListContent.innerHTML = '';
  state.playlist.forEach((file, index) => {
    const listItem = createFileListItem(file, index);
    elements.fileListContent.appendChild(listItem);
  });
}

function createFileListItem(file, index) {
  const container = document.createElement("div");
  container.setAttribute("data-index", index);
  container.setAttribute("file-name", file.name);
  container.style.display = "flex";
  container.style.justifyContent = "space-between";
  container.style.boxShadow = "0 0px 3px rgba(0, 0, 0, 0.1)";
  container.style.borderRadius = "5px";
  container.style.transition = "all ease 0.5s";

  const albumArt = document.createElement("img");
  albumArt.style.height = "150px";
  albumArt.style.width = "150px";
  albumArt.style.backgroundSize = "cover";

  const titleText = document.createElement("p");
  titleText.style.flexGrow = "1";
  titleText.style.fontFamily = "Graphik0";
  titleText.style.display = "flex";
  titleText.style.alignItems = "center";
  titleText.style.justifyContent = "center";
  titleText.style.textAlign = "center";

  container.appendChild(albumArt);
  container.appendChild(titleText);

  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const { title, artist, album, picture } = tag.tags;
      titleText.textContent = `${artist || ''} - ${title || file.name} - ${album || ''} - ${index}`;
      if (picture) {
        const { data, format } = picture;
        const base64String = arrayBufferToBase64(data);
        albumArt.style.backgroundImage = `url(data:${format};base64,${base64String})`;
      } else {
        albumArt.style.backgroundImage = "url('./assets/images/defaultSongCover.jpg')";
      }
    },
    onError: function(error) {
      titleText.textContent = `${file.name} - ${index}`;
      albumArt.style.backgroundImage = "url('./assets/images/defaultSongCover.jpg')";
    }
  });

  container.addEventListener("click", () => playNewSong(index));

  return container;
}

export function dialogUpdater() {
  state.oneBeforePreviousIndex = state.previousIndices.length - 1;
  state.oneBeforePreviousIndexValue = state.previousIndices[state.oneBeforePreviousIndex];
  
  const newIndexContainer = document.querySelector(`div[data-index="${state.currentIndex}"]`);
  if (newIndexContainer) {
    newIndexContainer.style.backgroundColor = "rgba(0, 0, 0, 0.198)";
  }
  if (state.currentIndex === state.oneBeforePreviousIndexValue) return;
  
  const previousContainer = document.querySelector(`div[data-index="${state.oneBeforePreviousIndexValue}"]`);
  if (previousContainer) {
    previousContainer.style.backgroundColor = "";
  }
}

export function handlePreviousSongClick() {
  if (state.currentIndex === state.oneBeforePreviousIndexValue) return;
  const oneBeforePreviousContainer = document.querySelector(`div[data-index="${state.indexBeforePreviousButtonArrayPop}"]`);
  if (oneBeforePreviousContainer) {
    oneBeforePreviousContainer.style.backgroundColor = "";
  }
}

export function updatePlayPauseButton() {
  const iconSrc = state.audio.paused ? "./assets/images/playButton2.svg" : "./assets/images/PauseButton.svg";
  elements.pausePlayButton.setAttribute("src", iconSrc);
}

export function updateAutoPlayButton() {
  if (state.isAutoPlayEnabled) {
    elements.autoPlayButton.classList.remove("autoPlayButton");
    elements.autoPlayIcon.classList.remove("autoPlayButtonImage");
    elements.autoPlayButton.classList.add("autoPlayButtonOn");
    elements.autoPlayIcon.classList.add("autoPlayButtonImageOn");
    elements.autoPlayIcon.setAttribute("src", "./assets/images/autoplayButtonOn.svg");
  } else {
    elements.autoPlayButton.classList.remove("autoPlayButtonOn");
    elements.autoPlayIcon.classList.remove("autoPlayButtonImageOn");
    elements.autoPlayButton.classList.add("autoPlayButton");
    elements.autoPlayIcon.classList.add("autoPlayButtonImage");
    elements.autoPlayIcon.setAttribute("src", "./assets/images/autoplayButtonOff.svg");
  }
}

export function updateRandomPlayButton() {
  if (state.isRandomEnabled) {
    elements.randomSongIcon.classList.remove("randomSong");
    elements.randomSongButton.classList.remove("randomSongBackground");
    elements.randomSongIcon.classList.add("randomSongOn");
    elements.randomSongButton.classList.add("randomSongBackgroundOn");
    elements.randomSongIcon.setAttribute("src", "./assets/images/shuffleButton.svg");
  } else {
    elements.randomSongIcon.classList.remove("randomSongOn");
    elements.randomSongButton.classList.remove("randomSongBackgroundOn");
    elements.randomSongIcon.classList.add("randomSong");
    elements.randomSongButton.classList.add("randomSongBackground");
    elements.randomSongIcon.setAttribute("src", "./assets/images/unshuffleButton2.svg");
  }
}