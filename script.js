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
const fileList = document.getElementById("fileList");
const fileListAuflistung = document.getElementById("fileListAuflistung");
const fileListAuflistungBild = document.getElementById("fileListAuflistungBild");
const fileListAuflistungTitel = document.getElementById("fileListAuflistungTitel");



  fileList.addEventListener("click", function outsideClickHandler(event) {
    var rect = fileList.getBoundingClientRect();
    var xAchse = event.clientX;
    var yAchse = event.clientY;
  
    if (xAchse < rect.left || xAchse >= rect.right || yAchse < rect.top || yAchse >= rect.bottom) {
      fileList.close();
    }
  });
  


let audio = null;
let file = null;
let previousFile = null;
let newIndex = 0;
let newIndexDialog = 0;
const newIndexMinValue = 0;
let previousIndex = [];
let letztesIndexPreviousIndex = previousIndex.length - 1;
let letztesIndexPreviousIndex2 = previousIndex.length - 2;
let defaultSongCover = document.querySelector("#song");
defaultSongCover.style.backgroundImage =
  "url('Wallpaper/defaultSongCover.jpg')";



slider.addEventListener("input", function () {
  const currentSliderValue = this.value;
  const audioSliderValue = audio.duration / audio.duration;
  let inputAnzeige = Math.floor(currentSliderValue * audioSliderValue);
  audio.currentTime = inputAnzeige;
});


/*function waitForMetadata(file) {
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
*/

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
      if(audio.duration-12 > audio.currentTime){
      audio.currentTime += 10;
      if(audio.paused) {
        audio.play();
        pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
      }    
    } else if (audio.duration-2 > audio.currentTime) {
      audio.currentTime = audio.duration-2;
      if(audio.paused) {
        audio.play();
        pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
      }    
    }
    });


zuruckspulen.addEventListener("click", function() {
      audio.currentTime -= 10;
      if (audio.paused){
        audio.play();
        pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
      }
    });



    vorherigesLiedButton.addEventListener("click", async function () {
      if(previousIndex.length >= 1) {
        clearTimeout(timeout);
        audio.pause();
        newIndex = previousIndex.pop();
        input.dispatchEvent(new Event("change"));
        vorherigesLiedButton.setAttribute("src", "Wallpaper/BackButtonDouble.svg");
        timeout = setTimeout(() => {
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
        if (folderTrackCount - 2 >= newIndex) {
        audio.pause();
        if (checkAutoPlayButton === true && checkRandomSongButton === null || checkRandomSongButton === false) {
        newIndex++;
      } 
        else if (checkAutoPlayButton === true && checkRandomSongButton === true) {
        newIndex = Math.floor(Math.random() * folderTrackCount);
      }
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
        } else {
          if (audio.ended){
          pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
        }
      }
      };


  let checkAutoPlayButton = null;
  let isClicked = false;
  
  autoPlayButton.addEventListener("click", (event) => {
    if (!isClicked) {
      // Autoplay On
      checkAutoPlayButton = true;
      pressedButtonsChecker();
      isClicked = true;
      autoPlayButtonDesign.classList.remove("AutoplayButtonOn");
      autpPlayButtonBackground.classList.remove("autoPlayButtonBackgroundOn");
      autoPlayButtonDesign.classList.add("AutoplayButtonOn");
      autpPlayButtonBackground.classList.add("autoPlayButtonBackgroundOn");
    } else {
      // Autoplay Off
      checkAutoPlayButton = false;
      pressedButtonsChecker();
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
      pressedButtonsChecker();
      isClickedrandomButton = true;
      randomSongBackground.classList.remove("randomSongBackground");
      randomSongButtonOff.classList.remove("randomSongButtonOff");
      randomSongButtonOff.classList.add("randomSongButtonOn");
      randomSongBackground.classList.add("randomSongBackgroundOn");
    } else {
      // Autoplay Off
      checkRandomSongButton = false;
      pressedButtonsChecker();
      isClickedrandomButton = false;
      randomSongButtonOff.classList.remove("randomSongButtonOn");
      randomSongBackground.classList.remove("randomSongBackgroundOn");
      randomSongButtonOff.classList.add("randomSongButtonOff");
      randomSongBackground.classList.add("randomSongBackground");
    }
  });



let isInputChangeHandled = false;
input.addEventListener("change", (event) => {
  document.getElementById("weiter").setAttribute("src", "Wallpaper/ForwardButton.svg");

  file = event.target.files[newIndex];


  /*test.textContent = `Track Anzahl : ${event.target.files.length} & Track Index ${newIndex}`;*/
  folderTrackCount = event.target.files.length;

  
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

      document.querySelector("#container").style.setProperty("--background-image", albumBild);
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





      if (!isInputChangeHandled) {
        isInputChangeHandled = true;
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        (function(index) {
        jsmediatags.read(file, {
          onSuccess: function (tag) {
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String = "";
      
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }

            const albumBild = `url(data:${format};base64,${window.btoa(base64String)})`;
            const liedName = tag.tags.title;
            const artistName = tag.tags.artist;
            const albumName = tag.tags.album;
      
            const container = document.createElement("div");
            container.setAttribute("data-index", index); // Index als Attribut hinzufügen
            container.style.display = "flex";
            container.style.justifyContent = "space-between";
            container.style.border = "1px solid black";
      
            const albumBildListe = document.createElement("img");
            albumBildListe.style.backgroundImage = albumBild;
            albumBildListe.style.height = "100px";
            albumBildListe.style.width = "100px";
            albumBildListe.style.backgroundSize = "cover";

      
            const albumTitelText = document.createElement("p");
            albumTitelText.textContent = `${artistName} - ${liedName} - ${albumName} - ${index}`;
            albumTitelText.style.flexGrow = "1";
      
            container.appendChild(albumBildListe);
            container.appendChild(albumTitelText);
      
            fileListAuflistung.appendChild(container);

            container.addEventListener("click", () => {
              clearTimeout(timeout);
              audio.pause();
              previousIndex.push(newIndex);
              newIndex = index;
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
            })


            


audio.addEventListener("playing", (event) => {
  setInterval(() => {
  const containerWithMatchingIndex = document.querySelector(`div[data-index="${newIndex}"]`);

  if (containerWithMatchingIndex) {
    containerWithMatchingIndex.style.backgroundColor = "grey";
  } 
  
    if (containerWithMatchingIndex && containerWithMatchingIndex !== document.activeElement) {
      containerWithMatchingIndex.style.backgroundColor = "grey";
    } else {
      containerWithMatchingIndex.style.backgroundColor = ""; // Setze den Hintergrund zurück, wenn der Index nicht übereinstimmt oder der Container nicht aktiv ist
    }
  }, 100);
});

            
          }
        });
    })(i);
  }

};





    },
    onError: function (error) {
      console.log(error);
    },
  });
});


pausePlayButton.addEventListener("click", function play() {
  if (audio.paused) {
    // sliderUpdater()
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


function sliderUpdater() {
  setInterval(function sliderChanger() { 
    slider.value = Math.floor(audio.currentTime);
    slider.setAttribute("max", Math.floor(audio.duration));
  }, 100);
};
sliderUpdater()


function pressedButtonsChecker() {
    let sliderUpdaterInterval = setInterval(() => {
    if (checkAutoPlayButton === true && checkRandomSongButton === true) {
      if (audio.ended) {
        let autoPlayRandomSongInterval = setInterval(() => {
        clearInterval(autoPlayRandomSongInterval);
        previousIndex.push(newIndex);
        autoPlayButtonActive();
      })
    }
    } else if (checkAutoPlayButton === true && checkRandomSongButton === false || checkAutoPlayButton === true && checkRandomSongButton === null) {
          if (audio.ended) {
            let autoPlayInterval = setInterval(() => {
          clearInterval(autoPlayInterval);
          previousIndex.push(newIndex);
          autoPlayButtonActive();
        })
        }
    } else {
      if (audio.ended || audio.currentTime === audio.duration) {
        audio.pause();
        pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
        }
    }
  }, 1000);
};
