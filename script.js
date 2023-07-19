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
let coverAsBackgroundImage = document.querySelector("#container");
const dialogCloseButton = document.getElementById("dialogCloseButton");
let albumCover = document.querySelector("#song");
let trackTitle = document.querySelector("#name");
let trackArtist = document.querySelector("#artist");
let trackAlbumName = document.querySelector("#album");



dialogCloseButton.addEventListener("click", function outsideClickHandler(event) {
  fileList.classList.add("closed");
  setTimeout(function() {
    fileList.close();
    fileList.classList.remove("closed");
  }, 300);
});


  fileList.addEventListener("click", function outsideClickHandler(event) {
    var rect = fileList.getBoundingClientRect();
    var xAchse = event.clientX;
    var yAchse = event.clientY;
  
    if (xAchse < rect.left || xAchse >= rect.right || yAchse < rect.top || yAchse >= rect.bottom) {
      fileList.classList.add("closed");
      setTimeout(function() {
        fileList.close();
        fileList.classList.remove("closed");
      }, 300);
    }
    }
  );
  


let audio = null;
let file = null;
let newIndex = 0;
let newIndexDialog = 0;
const newIndexMinValue = 0;
let previousIndex = [];
let dialogCurrentSongUpdater;
let defaultSongCover = document.querySelector("#song");
defaultSongCover.style.backgroundImage =
  "url('Wallpaper/defaultSongCover.jpg')";
let liedPath = null; 



slider.addEventListener("input", function () {
  const currentSliderValue = this.value;
  const audioSliderValue = audio.duration / audio.duration;
  let inputAnzeige = Math.floor(currentSliderValue * audioSliderValue);
  audio.currentTime = inputAnzeige;
});


let songChange = null;
let timeout;
nachstesLiedButton.addEventListener("click", async function() {
  if (checkRandomSongButton === false || checkRandomSongButton === null) {
    if (folderTrackCount - 2 >= newIndex) {
      clearTimeout(timeout);
      audio.pause();
      previousIndex.push(newIndex);
      newIndex++;
      inputFileCompleted();
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
    inputFileCompleted();
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

    let seperatepreviousIndex = null;
    let seperatepreviousIndexValue = null;
    vorherigesLiedButton.addEventListener("click", async function () {
      if(previousIndex.length >= 1) {
        clearTimeout(timeout);
        audio.pause();
        seperatepreviousIndex = previousIndex.map(function(number) {
          return number * 1;
        });
        seperatepreviousIndex.push(newIndex);
        seperatepreviousIndexValue = seperatepreviousIndex[seperatepreviousIndex.length - 1];
        boi = newIndex = previousIndex.pop();
        inputFileCompleted();
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
      inputFileCompleted();
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


let inputFileCompleted;
input.addEventListener("change", (event) => {
  inputFileCompleted = function inputFileCompleted() {
  document.getElementById("weiter").setAttribute("src", "Wallpaper/ForwardButton.svg");

  file = event.target.files[newIndex];


  test.textContent = `Track Anzahl : ${event.target.files.length} & Track Index ${newIndex}`;
  folderTrackCount = event.target.files.length;




  liedPath = URL.createObjectURL(file);
  audio = new Audio(liedPath);
  mp3FileReader();
  dialogCurrentSongUpdater(); 




}
if (event) {
  inputFileCompleted();
}
});





function mp3FileReader () {
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      const album = tag.tags.album;
      const artist = tag.tags.artist;
      const title = tag.tags.title;
  
      if (title){
        trackTitle.textContent = title;
      } else if (!title){
        trackTitle.textContent = file.name;
      }
      if (artist){
        trackArtist.textContent = artist;
      } else if (!artist){
        trackArtist.textContent = "";
      }
      if (album){
        trackAlbumName.textContent = album;
      } else if (!album){
        trackAlbumName.textContent = "";
      }

      let data = null;

      if (typeof tag !== 'undefined' && typeof tag.tags !== 'undefined' && typeof tag.tags.picture !== 'undefined') {
        data = tag.tags.picture.data;
      } else {
          coverAsBackgroundImage.style.setProperty("--background-image", "url('Wallpaper/defaultSongCover.jpg')");
          albumCover.style.backgroundImage = "url('Wallpaper/defaultSongCover.jpg')";
      } 

      const format = tag.tags.picture.format;
      let base64String = "";
  
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      
      let albumBild = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;
  

      if (data === tag.tags.picture.data) {
        coverAsBackgroundImage.style.setProperty("--background-image", albumBild);
        albumCover.style.backgroundImage = albumBild;
      }
    
      
  },
  onError: function (error){
      trackTitle.textContent = file.name;
      trackArtist.textContent = "";
      trackAlbumName.textContent = "";
      coverAsBackgroundImage.style.setProperty("--background-image", "url('Wallpaper/defaultSongCover.jpg')");
      albumCover.style.backgroundImage = "url('Wallpaper/defaultSongCover.jpg')";
  }
  })


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
  }




  input.addEventListener("change", (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
  
      (function(index) {
        jsmediatags.read(file, {
          onSuccess: function (tag) {
            let album = tag.tags.album;
            let artist = tag.tags.artist;
            let title = tag.tags.title;
  
            if (!title) {
              title = file.name;
            }
            if (!artist) {
              artist = "";
            }
            if (!album) {
              album = "";
            }
  
            let data = null;
            let albumBild = "";
  
            if (typeof tag !== 'undefined' && typeof tag.tags !== 'undefined' && typeof tag.tags.picture !== 'undefined') {
              data = tag.tags.picture.data;
  
              const format = tag.tags.picture.format;
              let base64String = "";
  
              for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
              }
  
              albumBild = `url(data:${format};base64,${window.btoa(base64String)})`;
            } else {
              albumBild = "url('Wallpaper/defaultSongCover.jpg')";
            }
  
            const container = document.createElement("div");
            container.setAttribute("data-index", index);
  
            container.style.display = "flex";
            container.style.justifyContent = "space-between";
            container.style.boxShadow = "0 0px 3px rgba(0, 0, 0, 0.1)";
            container.style.borderRadius = "5px";
            container.style.transition = "all ease 0.5s";
  
            const albumBildListe = document.createElement("img");
            albumBildListe.style.backgroundImage = albumBild;
            albumBildListe.style.height = "200px";
            albumBildListe.style.width = "200px";
            albumBildListe.style.backgroundSize = "cover";
  
            const albumTitelText = document.createElement("p");
            albumTitelText.textContent = `${artist} - ${title} - ${album} - ${index}`;
            albumTitelText.style.flexGrow = "1";
            albumTitelText.style.fontFamily = "Graphik0";
            albumTitelText.style.display = "flex";
            albumTitelText.style.alignItems = "center";
            albumTitelText.style.justifyContent = "center";
            albumTitelText.style.textAlign = "center";
  
            container.appendChild(albumBildListe);
            container.appendChild(albumTitelText);
  
            fileListAuflistung.appendChild(container);
  
            container.addEventListener("click", () => {
              clearTimeout(timeout);
              audio.pause();
              previousIndex.push(newIndex);
              newIndex = index;
              inputFileCompleted();
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
              }, 1000);
            });
  
            let oneBeforePreviousIndex = null;
            let oneBeforePreviousIndexValue  = null;
            function waitForMetadata(file) {
              return new Promise(resolve => {
                if (oneBeforePreviousIndexValue !== newIndex) {
                  resolve();
                };
              });
            }
            
            async function playAudioWithMetadata(file) {
              await waitForMetadata(file);
              return true;
            }
            
            async function dialogUpdater() {
              if (await playAudioWithMetadata(file)) {
                oneBeforePreviousIndex = previousIndex.length - 1;
                oneBeforePreviousIndexValue = previousIndex[oneBeforePreviousIndex];
                const containerWithMatchingIndex = document.querySelector(`div[data-index="${newIndex}"]`).style.backgroundColor = "rgba(0, 0, 0, 0.198)";
                document.querySelector(`div[data-index="${oneBeforePreviousIndexValue}"]`).style.backgroundColor = "";
                vorherigesLiedButton.addEventListener("click", (event)=> {
                if (event){
                  document.querySelector(`div[data-index="${seperatepreviousIndexValue}"]`).style.backgroundColor = "";
                  document.querySelector(`div[data-index="${oneBeforePreviousIndexValue}"]`).style.backgroundColor = "";
              } 
              })
              }
            }
            
    
            dialogCurrentSongUpdater = function dialogCurrentSongUpdater() {
              oneBeforePreviousIndex = previousIndex.length - 1;
              oneBeforePreviousIndexValue = previousIndex[oneBeforePreviousIndex];
              if (oneBeforePreviousIndexValue !== newIndex) {
              dialogUpdater();
            }
          }
  
            inputFileCompleted();
          },
          onError: function (error) {
            const track = file.name;
            const artist = "";
            const album = "";
            const albumBild = "url('Wallpaper/defaultSongCover.jpg')";
          
            const container = document.createElement("div");
            container.setAttribute("data-index", index);
          
            container.style.display = "flex";
            container.style.justifyContent = "space-between";
            container.style.boxShadow = "0 0px 3px rgba(0, 0, 0, 0.1)";
            container.style.borderRadius = "5px";
            container.style.transition = "all ease 0.5s";
          
            const albumBildListe = document.createElement("img");
            albumBildListe.style.backgroundImage = albumBild;
            albumBildListe.style.height = "200px";
            albumBildListe.style.width = "200px";
            albumBildListe.style.backgroundSize = "cover";
          
            const albumTitelText = document.createElement("p");
            albumTitelText.textContent = `${artist} - ${track} - ${album} - ${index}`;
            albumTitelText.style.flexGrow = "1";
            albumTitelText.style.fontFamily = "Graphik0";
            albumTitelText.style.display = "flex";
            albumTitelText.style.alignItems = "center";
            albumTitelText.style.justifyContent = "center";
            albumTitelText.style.textAlign = "center";
          
            container.appendChild(albumBildListe);
            container.appendChild(albumTitelText);
          
            fileListAuflistung.appendChild(container);

            container.addEventListener("click", () => {
              clearTimeout(timeout);
              audio.pause();
              previousIndex.push(newIndex);
              newIndex = index;
              inputFileCompleted();
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
              }, 1000);
            });
          }
        });
      })(i);
    }
    if (event) {
      dialogCurrentSongUpdater();
    }
  });
  

  

  
  pausePlayButton.addEventListener("click", function() {
    if (audio.paused) {
      if (audio.readyState >= 2) {
        audio.play();
        pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
      } else {
        audio.addEventListener("canplay", function() {
          audio.play();
          pausePlayButton.setAttribute("src", "Wallpaper/PauseButton.svg");
        }, { once: true });
      }
    } else {
      audio.pause();
      pausePlayButton.setAttribute("src", "Wallpaper/PlayButton2.svg");
    }
  });
  

function sliderUpdater() {

  setInterval(function sliderChanger() { 
    if (audio){
    slider.value = Math.floor(audio.currentTime);
    slider.setAttribute("max", Math.floor(audio.duration));
  }
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