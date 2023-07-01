const jsmediatags = window.jsmediatags;

const test = document.querySelector("#test");
const pauseButton = document.getElementById("stopp");
const anfang = document.getElementById("anfang");
const ende = document.getElementById("ende");
const input = document.querySelector("#input");
const slider = document.querySelector("input[type='range']");

let fileLoaded = false;

let audio = null;
let previousFile = null;
let defaultSongCover = document.querySelector("#song");
defaultSongCover.style.backgroundImage =
  "url('Wallpaper/defaultSongCover.jpg')";

slider.addEventListener("input", function () {
  const currentSliderValue = this.value;
  const audioSliderValue = audio.duration / audio.duration;
  let inputAnzeige = Math.floor(currentSliderValue * audioSliderValue);
  audio.currentTime = inputAnzeige;
});

input.addEventListener("change", (event) => {
  document
    .getElementById("weiter")
    .setAttribute("src", "Wallpaper/ForwardButton.svg");
  currentValue = 0;
  const file = event.target.files[0];
  const musikName = file.name;

  if (file) {
    fileLoaded = true;
  }

  if (previousFile !== null) {

    if (file.name !== previousFile.name) {
      audio.pause();
      setTimeout(() => {
        pauseButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
      }, 100);
           pauseButton.addEventListener("click", function play() {
        if (audio.paused) {
          audio.play();
          setTimeout(() => {
            pauseButton.setAttribute("src", "Wallpaper/PauseButton.svg");
          }, 100);
        } else {
          audio.pause();
          setTimeout(() => {
            pauseButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
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
        ende.innerHTML = `${minutes}:${seconds}`;
      };

      setInterval(function aktuelleZeit() {
        const Minuten = Math.floor(audio.currentTime / 60);
        let Sekunden = Math.floor(audio.currentTime % 60);
        Sekunden = Sekunden < 10 ? "0" + Sekunden : Sekunden;
        anfang.textContent = `${Minuten}:${Sekunden}`;
      }, 1);

      document
        .getElementById("stopp")
        .addEventListener("click", function play() {
          if (audio.paused) {
            sliderUpdater()
            audio.play();
            setTimeout(() => {
              pauseButton.setAttribute("src", "Wallpaper/PauseButton.svg");
            }, 100);
          } else {
            1;
            audio.pause();
            setTimeout(() => {
              pauseButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
            }, 100);
          }
        });


      document.getElementById("weiter").addEventListener("click", function () {
        if (this.click) {
          sliderUpdater()
          audio.pause();
          audio.playbackRate = 10;
          audio.play();
          setTimeout(() => {
            document
              .getElementById("weiter")
              .setAttribute("src", "Wallpaper/ForwardButtonDouble.svg");
            pauseButton.setAttribute("src", "Wallpaper/PauseButton.svg");
            this.click = false;
          }, 100);
        } else {
          audio.playbackRate = 1;
          audio.play();
          setTimeout(() => {
            document
              .getElementById("weiter")
              .setAttribute("src", "Wallpaper/ForwardButton.svg");
            pauseButton.setAttribute("src", "Wallpaper/PauseButton.svg");
            this.click = true;
          }, 100);
        }
      });



      //ZURÜCK GEHT BEI JEDEM LIED WECHSEL IMMER 10 MEHR ZURÜCK
      document.getElementById("zuruck").addEventListener("click", function () {
        if (audio) {
          audio.pause();
          audio.currentTime -= 10;
          audio.play();
          setTimeout(() => {
            document
              .getElementById("zuruck")
              .setAttribute("src", "Wallpaper/BackButtonDouble.svg");
            pauseButton.setAttribute("src", "Wallpaper/PauseButton.svg");
          }, 100);
          setTimeout(() => {
            document
              .getElementById("zuruck")
              .setAttribute("src", "Wallpaper/BackButton.svg");
          }, 1000);
        }
      });
    },
    onError: function (error) {
      console.log(error);
    },
  });
});

function sliderUpdater() {
setInterval(function sliderChanger(){ 
  slider.value = Math.floor(audio.currentTime);
  slider.setAttribute("max", Math.floor(audio.duration));
}, 1);
};
