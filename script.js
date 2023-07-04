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

let audio = null;
let previousFile = null;
let newIndex = 0;
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


nachstesLiedButton.addEventListener("click", function () {
  sliderUpdater();
  newIndex++;
  input.dispatchEvent(new Event("change"));
    nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButtonDouble.svg");
  setTimeout(() => {
    nachstesLiedButton.setAttribute("src", "Wallpaper/ForwardButton.svg");
  }, 100);
  setTimeout(() => {
    audio.play();
    pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
  }, 100);
});

vorherigesLiedButton.addEventListener("click", function () {
  if (audio) {
    newIndex--;
    input.dispatchEvent(new Event("change"));
    setTimeout(() => {
       vorherigesLiedButton.setAttribute("src", "Wallpaper/BackButtonDouble.svg");
      setTimeout(() => {
        vorherigesLiedButton.setAttribute("src", "Wallpaper/BackButton.svg");
      }, 100);
  });
  setTimeout(() => {
    audio.play();
    pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
  }, 100);
}});


function autoPlayButtonActive () {
        audio.pause();
        newIndex++;
        input.dispatchEvent(new Event("change"));
        setTimeout(() => {
          audio.play();
          pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
        }, 100);
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
    } else {
      // Autoplay Off
      checkRandomSongButton = false;
      sliderUpdater();
      isClickedrandomButton = false;
    }
  });




















input.addEventListener("change", (event) => {
  document
    .getElementById("weiter")
    .setAttribute("src", "Wallpaper/ForwardButton.svg");

  let file = event.target.files[newIndex];

  /*test.textContent = `Track Anzahl : ${event.target.files.length} & Track Index ${newIndex}`;*/
  folderTrackCount = event.target.files.length;


  if (previousFile !== null) {

    if (file.name !== previousFile.name) {
      audio.pause();
      setTimeout(() => {
        pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
      }, 100);
           pausePlayButton.addEventListener("click", function play() {
        if (audio.paused) {
          audio.play();
          setTimeout(() => {
            pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
          }, 100);
        } else {
          audio.pause();
          setTimeout(() => {
            pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
          }, 100);
        }
      });
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

      document
        .getElementById("stopp")
        .addEventListener("click", function play() {
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
    },
    onError: function (error) {
      console.log(error);
    },
  });
});




function sliderUpdater() {
  setInterval(function sliderChanger() { 
    slider.value = Math.floor(audio.currentTime);
    slider.setAttribute("max", Math.floor(audio.duration));
    if (checkAutoPlayButton === true) {
      if (audio.ended) {
        autoPlayButtonActive();
      }
    } else if (checkAutoPlayButton === false) {
      if (audio.ended) {
        audio.pause();
      }
    }
  }, 1000);
};