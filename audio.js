let data = {
    title: [
        "XXXTENTACION-ATTENTION",
        "XXXTENTACION-MOONLIGHT", 
        "XXXTENTACION-BROKEN HEART",
        "XXXTENTACION-NIGHTMARES",
        "XXXTENTACION-JOCELYN FLORES"
    ],
    song: [
        "music/tentacion.mp3",
        "music/tentacion-moonlight.mp3", 
        "music/tentacion-broken-heart.mp3",
        "music/XXXTENTACION-everybody dies.mp3",
        "music/xxxtentacion-jocelyn_flores.mp3"
    ],
    poster: ['https://cdnb.artstation.com/p/assets/images/images/016/133/157/large/zachary-wolfe-x-01.jpg?1551036698&dl=1',
"https://i1.sndcdn.com/artworks-000676912237-hnstdx-t500x500.jpg",
"https://wallpapercave.com/uwp/uwp1469284.jpeg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwX-vcWiJ5IeD4w2wBNppE9FSod2HD_ImWTWWQ83Om9OpUjXm-alyjt2GbxKOrDW2p5c&usqp=CAU",
"https://w0.peakpx.com/wallpaper/320/303/HD-wallpaper-xxxtentacion-american-rapper-blue-neon-lights-superstars-creative-blue-backgrounds-american-celebrity-jahseh-dwayne-ricardo-onfroy-music-stars-xxxtentacion.jpg"]
};


let song = new Audio();

window.onload = function (){
     playSong();
}

var currentSong = 0

function playSong() {
    song.src = data.song[currentSong];
    console.log(song.src);

    let songTitle = document.getElementById("songTitle");
    songTitle.textContent = data.title[currentSong];

    let img = document.getElementById("row1");
    img.style.backgroundImage = "url(" + data.poster[currentSong] + ")";

    let main = document.getElementById("main")
    main.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    song.play();
}

function playOrPause() {
    let play = document.getElementById("play")
    //console.log(play);
    
    if (song.paused) {
        song.play();
        play.src = "images/pause.png" //pause
    } else {
        song.pause();
        play.src = "images/play-button-arrowhead.png" //play
    }
}

song.addEventListener("timeupdate", function () {
    // console.log(song.currentTime);
    // console.log(song.duration);
    let fill = document.getElementById("fill")
   console.log(fill);
    let position = song.currentTime / song.duration;
    console.log(position);
    
    fill.style.width = position * 100 + "%"; // fill
    
    convertTime(song.currentTime) // cur. time
    
    if (song.ended) {
    next()
    }
})

function convertTime(seconds) {

    let currentTime = document.getElementById ("currentTime")
    
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)
    
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    
    
    currentTime.textContent = min + ":" + sec
    totalTime(Math.round(song.duration))
    console.log(seconds);
    console.log(min);
    
};


function totalTime(seconds) {
    var min = Math.floor(seconds / 60)
    var sec = Math.floor(seconds % 60)
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    if(isNaN(min) || isNaN(sec)){
        return false
    }else{

        currentTime.textContent += " / " + min + ":" + sec
    }



    
};


function next() {
    currentSong ++;
    if (currentSong >= data.song.length) {
    currentSong = 0
    }
    playSong ();
    play.src = "images/pause.png";


    }

function pre() {
    currentSong --;
    if (currentSong < 0) {
    currentSong = data.song.length - 1;
    }
    playSong ();
    play.src = "images/pause.png";
};

function muted() {
    var mute = document.getElementById ("mute")
    if (song.muted) {
    song.muted = false
    mute.src = "images/volume.png" //mute
    } else {
    song.muted = true
    mute.src = "images/volume-mute.png"
    //unmute
    }
};

function increase() {
    song.volume += 0.1;
}
    
function decrease() {
    song.volume -= 0.1;
};





const progress = document.getElementById('fill');
const progressContainer = document.getElementById('handle');


function updateProgress(e) {
const { duration, currentTime } = e.srcElement;
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = song.duration;

song.currentTime = (clickX / width) * duration;
}

// Time/song update
song.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);