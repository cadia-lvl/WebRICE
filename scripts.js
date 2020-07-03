import {MainButtons} from "./resources/modules/mainButtons.mjs";
import { Settings } from "./resources/modules/settings.mjs"

const mainButtonClass = new MainButtons(document.getElementById("webrice"));
mainButtonClass.createMainButtons();

const SettingsId = "settingsCont";
const settingsMod = new Settings(document.getElementById("webrice"), SettingsId);

function makeSettings(){
    settingsMod.createSettings();
    document.getElementById("closeSettings").addEventListener("click", function() {
        settingsMod.destroySettings();
    });
}

//Creates the settings when settings button is pushed
document.querySelector("#SettingButton").addEventListener("click", function() {
    document.getElementById(SettingsId) ? settingsMod.destroySettings() : makeSettings();
});// Contains functionality!

// TODO: create a player class
let audioContent = ["example_voice_files/content-1.mp3",
                    "example_voice_files/content-2.mp3",
                    "example_voice_files/content-3.mp3",
                    "example_voice_files/content-4.mp3",
                    "example_voice_files/content-5.mp3"];

let WRPlayer = document.getElementById('player');

let listenBtn = document.getElementById("ListenButton");
let pauseBtn = document.getElementById("PauseButton");
let speedBtn = document.getElementById("SpeedButton");
let downBtn = document.getElementsByClassName("DownloadButton");
let stopBtn = document.getElementById("StopButton");

let playerStarted = false;
let playerPaused = true;
let playbackRate = 1.0;

WRPlayer.onplay = function() {
    listenBtn.style.display = "none";
    pauseBtn.style.display = "unset";
};
WRPlayer.onpause = function() {
    listenBtn.style.display = "unset";
    pauseBtn.style.display = "none";
};
WRPlayer.onratechange = function() {
    playbackRate = this.playbackRate;
};

function initReader() {
    playerStarted = false;
    playerPaused = true;
    WRPlayer.onended = null;
}

// Play functionality for whole page
function playPause() {
    if (!WRPlayer.paused) {
        WRPlayer.pause();
        playerPaused = true;
        return;
    }
    if (playerStarted) {
        if (!WRPlayer.ended) {
            WRPlayer.play();
            playerPaused = false;
        }
        return;
    }

    var i = 0;
    WRPlayer.src = audioContent[i];
    WRPlayer.onended = function() {
        if (++i !== audioContent.length) {
            this.src = audioContent[i];
            this.playbackRate = playbackRate;
            if (!playerPaused)
                this.play();
        } else {
            initReader();
        }
    };
    WRPlayer.playbackRate = playbackRate;
    WRPlayer.play();
    playerStarted = true;
    playerPaused = false;
}


function stop() {
    WRPlayer.pause();
    initReader();
}

function download() {
    //temporary 
    console.log("no clip but if there was it would have been downloaded")
}


function fasterOrSlower() {
    const el = document.createElement("input");
    el.type = "number";
    el.defaultValue = playbackRate;
    el.placeholder = "speeeed";
    el.style.width = "100px";
    el.style.height = "10px";
    let timerId = undefined;
    el.onchange = function(event) {
        WRPlayer.playbackRate = event.target.value;
        window.clearTimeout(timerId);
        timerId = window.setTimeout(function() { el.remove(); }, 1000);
    };
    el.onkeyup = function(event) {
        if (event.key === "Enter") {
            this.remove();
        }
    };
    speedBtn.after(el);
}

listenBtn.onclick = playPause;
pauseBtn.onclick = playPause;
stopBtn.onclick = stop;
speedBtn.onclick = fasterOrSlower;
downBtn.onClick = download;

// Keyboard shortcuts
// TODO: make sure they conform to accessibility settings
//Thanks! https://stackoverflow.com/questions/9507200/why-keydown-listener-doesnt-work-in-ie
//Manipulate the audio using keystrokes
try {
    if (window.addEventListener) {
        window.addEventListener("keydown", onKeyDown, true);
    } else if (window.attachEvent) { // IE
        alert(window);
        document.attachEvent("onkeydown", onKeyDown);
    } else {
        document.addEventListener("keydown", onKeyDown, true);
    }
} catch (e) {
  alert(e);
}


function onKeyDown(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    console.log(unicode);
    var aud = document.getElementById("player");
    // numpad right arrow
    if (unicode == 39) {
      aud.currentTime += 5;
    // numpad back arrow
    } else if (unicode == 37) {
      aud.currentTime -= 5;
    // numpad Del
    } else if (unicode == 46) {
      fasterOrSlower();
    // numpad Ins
    } else if (unicode == 45) {
      playPause();
    }
}

// TODO: Play functionality for selected text
