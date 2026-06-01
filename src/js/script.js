const song = new Audio("src/assets/songs_mp3/song1.mp3");
const progress= document.getElementById("progress");

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

    song.addEventListener("timeupdate", ()=>{
        progress.value=(song.currentTime/song.duration)*100;
    });

    progress.addEventListener("input", ()=>{
        song.currentTime= (progress.value/100)*song.duration;
    });
}