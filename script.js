const jsmediatags = window.jsmediatags;

const nachstesLiedButton = document.getElementById("weiter");
const vorherigesLiedButton = document.getElementById("zuruck");
const test = document.querySelector("#test");
const pausePlayButton = document.getElementById("stopp");
const liedAnfangszeit = document.getElementById("anfang");
const liedGesamtZeit = document.getElementById("ende");
const input = document.querySelector("#input");
const slider = document.querySelector("input[type='range']");
const autoPlayButton = document.getElementById("autoPlayCheckbox");
const autoPlayButtonDesign = document.getElementById("AutoplayButton");
const autpPlayButtonBackground = document.getElementById("autoPlayButtonBackgroundOff");
const randomSong = document.getElementById("randomSong");
const randomSongBackground = document.getElementById("randomSongBackground");
const randomSongButtonOff = document.getElementById("randomSongButtonOff");
const zuruckspulen = document.getElementById("zuruckspulen");
const vorspulen = document.getElementById("vorspulen");


let audio = null;
let file = null;
let previousFile = null;
let newIndex = 0;
const newIndexMinValue = 0;
let previousIndex = [];
let folderTrackCount = null;
let defaultSongCover = document.querySelector("#song");
defaultSongCover.style.backgroundImage =
  "url('Wallpaper/defaultSongCover.jpg')";



slider.addEventListener("input", function () {
  const currentSliderValue = this.value;
  const audioSliderValue = audio.duration / audio.duration;
  let inputAnzeige = Math.floor(currentSliderValue * audioSliderValue);
  audio.currentTime = inputAnzeige;
});


function waitForMetadata(file) {
  return new Promise(resolve => {
    liedPath = URL.createObjectURL(file);
      audio = new Audio(liedPath);
      audio.addEventListener("loadedmetadata", () => {
      resolve();
    });
  });
}

async function playAudioWithMetadata(file) {
  await waitForMetadata(file);

  return true; // Metadaten erfolgreich geladen
}


  if (await playAudioWithMetadata(file)) {
    Funktion die man ausgeführt haben möchte, wenn die Promise erfüllt ist
  }


let songChange = null;
let timeout;
nachstesLiedButton.addEventListener("click", async function() {
  if (checkRandomSongButton === false || checkRandomSongButton === null) {
    if (folderTrackCount - 2 >= newIndex) {
      clearTimeout(timeout);
      audio.pause();
      previousIndex.push(newIndex);
      newIndex++;
      input.dispatchEvent(new Event("change"));
      nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButtonDouble.svg");
      timeout = setTimeout(() => {
        nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButton.svg");
        songChange = true;
      }, 1000);
      let songChangeInterval = setInterval(() => {
        if (songChange) {
          setTimeout(() => {
            audio.play();
            pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
            songChange = false;
          }, 100);
        }
        },1000)
    }
  } else if (checkRandomSongButton === true) {
    clearTimeout(timeout);
    audio.pause();
    previousIndex.push(newIndex);
    let createRandomSongIndex = Math.floor(Math.random() * folderTrackCount);
    newIndex = createRandomSongIndex;
    input.dispatchEvent(new Event("change"));
    nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButtonDouble.svg");
    timeout = setTimeout(() => {
      nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButton.svg");
      songChange = true;
    }, 1000);
    let songChangeInterval = setInterval(() => {
      if (songChange) {
        setTimeout(() => {
          audio.play();
          pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
          songChange = false;
        }, 100);
      }
      },1000)
  }
});


vorspulen.addEventListener("click", function() {
      audio.currentTime += 30;
    });


zuruckspulen.addEventListener("click", function() {
      audio.currentTime -= 10;
    });


vorherigesLiedButton.addEventListener("click", async function () {
  if(previousIndex.length >= 1) {
    clearTimeout(timeout);
    audio.pause();
    newIndex = previousIndex.pop();
    input.dispatchEvent(new Event("change"));
    timeout = setTimeout(() => {
    vorherigesLiedButton.setAttribute("src", "Wallpaper/BackButtonDouble.svg");
    songChange = true;
  }, 1000);
    let songChangeInterval = setInterval(() => {
      if (songChange) {
        setTimeout(() => {
          audio.play();
    vorherigesLiedButton.setAttribute("src", "Wallpaper/BackButton.svg");
    pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
    songChange = false;
  }, 100);
}
},1000)
}
});


function autoPlayButtonActive () {
      if (checkAutoPlayButton === true && checkRandomSongButton === null || checkRandomSongButton === false) {
        audio.pause();
        newIndex++;
        previousIndex.push(newIndex);
        input.dispatchEvent(new Event("change"));
        setTimeout(() => {
          audio.play();
          pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
        }, 100);
      } else if (checkAutoPlayButton === true && checkRandomSongButton === true) {
        audio.pause();
        newIndex = Math.floor(Math.random() * folderTrackCount);
        previousIndex.push(newIndex);
        input.dispatchEvent(new Event("change"));
        setTimeout(() => {
          audio.play();
          pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
        }, 100);
      }
  };


  let checkAutoPlayButton = null;
  let isClicked = false;
  
  autoPlayButton.addEventListener("click", (event) => {
    if (!isClicked) {
      // Autoplay On
      checkAutoPlayButton = true;
      sliderUpdater();
      isClicked = true;
      autoPlayButtonDesign.classList.remove("AutoplayButtonOn");
      autpPlayButtonBackground.classList.remove("autoPlayButtonBackgroundOn");
      autoPlayButtonDesign.classList.add("AutoplayButtonOn");
      autpPlayButtonBackground.classList.add("autoPlayButtonBackgroundOn");
    } else {
      // Autoplay Off
      checkAutoPlayButton = false;
      sliderUpdater();
      isClicked = false;
      autoPlayButtonDesign.classList.remove("AutoplayButtonOn");
      autpPlayButtonBackground.classList.remove("autoPlayButtonBackgroundOn");
      autoPlayButtonDesign.classList.add("AutoplayButtonOff");
      autpPlayButtonBackground.classList.add("autoPlayButtonBackgroundOff");
    }
  });


  let checkRandomSongButton = null;
  let isClickedrandomButton = false;
  randomSong.addEventListener("click", (event) => {
    if (!isClickedrandomButton) {
      folderTrackCount;
      checkRandomSongButton = true;
      sliderUpdater();
      isClickedrandomButton = true;
      randomSongBackground.classList.remove("randomSongBackground");
      randomSongButtonOff.classList.remove("randomSongButtonOff");
      randomSongButtonOff.classList.add("randomSongButtonOn");
      randomSongBackground.classList.add("randomSongBackgroundOn");
    } else {
      // Autoplay Off
      checkRandomSongButton = false;
      sliderUpdater();
      isClickedrandomButton = false;
      randomSongButtonOff.classList.remove("randomSongButtonOn");
      randomSongBackground.classList.remove("randomSongBackgroundOn");
      randomSongButtonOff.classList.add("randomSongButtonOff");
      randomSongBackground.classList.add("randomSongBackground");
    }
  });




input.addEventListener("change", (event) => {
  document
    .getElementById("weiter")
    .setAttribute("src", "Wallpaper/ForwardButton.svg");

  file = event.target.files[newIndex];


  test.textContent = `Track Anzahl : ${event.target.files.length} & Track Index ${newIndex}`;
  folderTrackCount = event.target.files.length;


     if (previousFile !== null) {

 if (file.name !== previousFile.name) {
      audio.pause();
      setTimeout(() => {
        pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
      }, 100);
    }
  }
  
  previousFile = file;

  jsmediatags.read(file, {
    onSuccess: function (tag) {
      const album = tag.tags.album;
      const artist = tag.tags.artist;
      const title = tag.tags.title;
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }

      const albumBild = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;

      document
        .querySelector("#container")
        .style.setProperty("--background-image", albumBild);
      document.querySelector("#song").style.backgroundImage = albumBild;
      document.querySelector("#name").textContent = title;
      document.querySelector("#artist").textContent = artist;
      document.querySelector("#album").textContent = album;

      const liedPath = URL.createObjectURL(file);
      audio = new Audio(liedPath);


      audio.onloadedmetadata = function () {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        liedGesamtZeit.innerHTML = `${minutes}:${seconds}`;
      };

      setInterval(function aktuelleZeit() {
        const Minuten = Math.floor(audio.currentTime / 60);
        let Sekunden = Math.floor(audio.currentTime % 60);
        Sekunden = Sekunden < 10 ? "0" + Sekunden : Sekunden;
        liedAnfangszeit.textContent = `${Minuten}:${Sekunden}`;
      }, 1);
    },
    onError: function (error) {
      console.log(error);
    },
  });
});


pausePlayButton.addEventListener("click", function play() {
  if (audio.paused) {
    sliderUpdater()
    audio.play();
    setTimeout(() => {
      pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
    }, 100);
  } else {
    1;
    audio.pause();
    setTimeout(() => {
      pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
    }, 100);
  }
});



function sliderUpdater() {
  setInterval(function sliderChanger() { 
    slider.value = Math.floor(audio.currentTime);
    slider.setAttribute("max", Math.floor(audio.duration));
  }, 100);
    let sliderUpdaterInterval = setInterval(() => {
    if (checkAutoPlayButton === true && checkRandomSongButton === true) {
      if (audio.ended) {
        clearInterval(sliderUpdaterInterval);
        previousIndex.push(newIndex);
        autoPlayButtonActive();
      }
    } else if (checkAutoPlayButton === true) {
          if (audio.ended) {
          clearInterval(sliderUpdaterInterval);
          autoPlayButtonActive();
        }
    } else if (checkAutoPlayButton === false || checkAutoPlayButton === null && checkRandomSongButton === false) {
      if (audio.ended) {
        audio.pause();
        }
    } else if (checkAutoPlayButton === false || checkAutoPlayButton === null) {
      if (audio.ended) {
        audio.pause();
      }
    }
  }, 1000);
};