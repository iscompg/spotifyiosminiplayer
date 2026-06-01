const song = new Audio("src/assets/songs_mp3/song1.mp3");
const progress= document.getElementById("progress");
const currentTimeEl= document.getElementById("currentTime");
const durationEl=  document.getElementById("duration");

let isPlaying=false;
let playicon = document.getElementById("playicon")

function actionPlayer(action){
    if (action == "pause"){
        if (isPlaying){
            song.pause();
            playicon.src = "src/assets/images/buttons/play.png";
            isPlaying=false;
        }
        else{
            song.play();
            playicon.src = "src/assets/images/buttons/pausee.webp";
            isPlaying=true;
        }
    }
}

song.addEventListener("timeupdate", ()=>{
    progress.value=(song.currentTime/song.duration)*100;
});

progress.addEventListener("input", ()=>{
    song.currentTime= (progress.value/100)*song.duration;
});

song.addEventListener("timeupdate", ()=>{
    progress.value=(song.currentTime/song.duration)*100;

    let currentMinutes= Math.floor(song.currentTime/60);
    let currentSeconds= Math.floor(song.currentTime%60);
    
    if (currentSeconds<10){
        currentSeconds="0"+currentSeconds;
    }

    currentTimeEl.textContent= `${currentMinutes}:${currentSeconds}`;
});

song.addEventListener("loadedmetadata", ()=>{
    let durationMinutes= Math.floor(song.duration/60);
    let durationSeconds= Math.floor(song.duration%60);

    if (durationSeconds<10){
        durationSeconds= "0"+durationSeconds;
    }

    durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
});