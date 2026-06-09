const image=document.getElementById("image");
const title=document.getElementById("title");
const artist=document.getElementById("artist");

const songs = [
    {
        title: "Liquid Smooth",
        artist: "Mitski", 
        file: "src/assets/songs_mp3/song1.mp3",
        image:"src/assets/images/songs/song1.png"
    },
    {
        title: "Sweeter Weather",
        artist: "The Neighbourhood", 
        file: "src/assets/songs_mp3/song2.mp3",
        image:"src/assets/images/songs/song2.png"
    },
    {
        title: "Apocalypse",
        artist: "Cigarettes after Sex", 
        file: "src/assets/songs_mp3/song3.mp3",
        image:"src/assets/images/songs/song3.png"
    }
]

let currentSong=0;
const song= new Audio(songs[currentSong].file)
const progress= document.getElementById("progress");
const currentTimeEl= document.getElementById("currentTime");
const durationEl=  document.getElementById("duration");

let isPlaying=false;
let playicon = document.getElementById("playicon")

function loadSong(index){
    song.src= songs[index].file;
    image.src= songs[index].image;
    title.textContent=songs[index].title;
    artist.textContent=songs[index].artist;
}

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
    else if(action=="forward"){
        currentSong++;
        if (currentSong>=songs.length){
            currentSong=0;
        }
        loadSong(currentSong);
        song.play();
        isPlaying=true;
        playicon.src = "src/assets/images/buttons/pausee.webp";
    }
    else if (action=="back"){
        currentSong--;
        if (currentSong<0){
            currentSong=songs.length-1;
        }
        loadSong(currentSong);
        song.play();
        isPlaying=true;
        playicon.src = "src/assets/images/buttons/pausee.webp";
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