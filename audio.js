let data = {
    title: [
        "XXXTENTACION-ATTENTION",
        "XXXTENTACION-MOONLIGHT", 
        "XXXTENTACION-BROKEN-HEART"
    ],
    song: [
        "music/tentacion.mp3",
        "music/tentacion-moonlight.mp3", 
        "music/tentacion-broken-heart.mp3"
    ],
    poster: ['https://cdnb.artstation.com/p/assets/images/images/016/133/157/large/zachary-wolfe-x-01.jpg?1551036698&dl=1',
            "https://i1.sndcdn.com/artworks-000676912237-hnstdx-t500x500.jpg",
            "https://wallpapercave.com/uwp/uwp1469284.jpeg"]
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
    currentTime.textContent += " / " + min + ":" + sec
    
};


function next() {
    currentSong ++;
    if (currentSong >= data.song.length) {
    currentSong = 0
    }
    playSong ();
    play.src = "images/pause.png"
    }

function pre() {
    currentSong --;
    if (currentSong < 0) {
    currentSong = data.song.length - 1;
    }
    playSong ();
    play.src = "images/pause.png"
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