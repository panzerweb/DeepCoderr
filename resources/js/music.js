console.log("Script from music.js")

const musicContainer = document.getElementById("music-list-container");

let songList = [
    {
        title: "Himala",
        artist: "Ace Banzuelo",
        path: "../../assets/music/himala_ace-banzuelo.mp3",
        genre: ["OPM", "P-Pop", "Pinoy R&B", "Harana", "Kundiman"]
    },
    {
        title: "Someone you loved",
        artist: "Lewis Capaldi",
        path: "../../assets/music/someone_you_loved_lewis.mp3",
        genre: ["Classical", "Alternative", "Indie"]
    },
    {
        title: "Multo",
        artist: "Cup of Joe",
        path: "../../assets/music/multo_cup-of-joe.mp3",
        genre: ["OPM", "Harana", "P-pop", "Kundiman"]
    },
    {
        title: "Bulong",
        artist: "December Avenue",
        path: "../../assets/music/bulong_december-avenue.mp3",
        genre: ["OPM", "P-Pop", "Pinoy R&B", "Harana", "Kundiman", "Pinoy Rock"]
    },
    {
        title: "Here Tonight",
        artist: "Hale",
        path: "../../assets/music/here-tonight_hale.mp3",
        genre: ["OPM", "P-Pop", "Pinoy R&B", "Harana", "Kundiman"]
    },
];

// For the current song playing
// Would be used for tracking the current playing song
let currentSong = {
    title: "",
    artist: "",
    path: "",
    genre: []
}

function renderMusic(){
    musicContainer.innerHTML = "";
    songList.map((song, index) => {
        musicContainer.innerHTML += 
        `
            <div class="card mb-3 shadow-sm" style="max-width: 600px;">
                <div class="row g-0 align-items-center">
                    
                    <!-- Album Cover -->
                    <div class="col-4 col-md-3 d-flex justify-content-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-apple-music" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073"/>
                        </svg>
                        </div>
                    </div>

                    <!-- Song Info -->
                    <div class="col-8 col-md-7">
                        <div class="card-body">
                            <h5 class="card-title mb-1">${song.title}</h5>
                            <p class="card-text text-muted mb-2">
                                ${song.artist}
                            </p>

                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-outline-primary btn-sm play-btn" data-index="${index}" 
                                    data-title="${song.title}" 
                                    data-artist="${song.artist}"
                                    data-genre="${song.genre}"
                                    data-path="${song.path}"
                                >
                                    <i class="bi bi-play-fill"></i>
                                </button>

                                <!-- Seek bar -->
                                <input type="range" class="form-range mt-2 seek-bar"
                                    data-index="${index}" min="0" max="100" value="0">

                                <audio id="audio-${index}" 
                                    src="${song.path}" 
                                    data-title="${song.title}" 
                                    data-artist="${song.artist}"
                                    data-genre="${song.genre}"
                                    data-path="${song.path}"
                                >
                                </audio>

                                <!-- <button class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-skip-backward-fill"></i>
                                </button>

                                <button class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-skip-forward-fill"></i>
                                </button> -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
        `;
    });

    attachPlayEvents();
    attachSeekEvents();
}

function attachPlayEvents() {
    const playButtons = document.querySelectorAll(".play-btn");

    playButtons.forEach(btn => {
        btn.addEventListener("click", function () {

            const index = this.getAttribute("data-index");
            const audio = document.getElementById(`audio-${index}`);
            const icon = this.querySelector("i");

            const audioTitle = audio.getAttribute("data-title");
            const audioArtist = audio.getAttribute("data-artist");
            const audioPath = audio.getAttribute("data-path");
            const audioGenre = audio.getAttribute("data-genre");

            // If it's paused → play
            if (audio.paused) {
                audio.play();
                icon.classList.remove("bi-play-fill");
                icon.classList.add("bi-pause-fill");

                currentSong.title = audioTitle;
                currentSong.artist = audioArtist;
                currentSong.path = audioPath;
                currentSong.genre = audioGenre;

                console.log(currentSong);
                localStorage.setItem("current-song", JSON.stringify(currentSong));
                updateCurrentSongBadge(currentSong);
                // Pause other songs
                pauseOthers(index);
            } 
            else {
                audio.pause();
                localStorage.removeItem("current-song");
                icon.classList.remove("bi-pause-fill");
                icon.classList.add("bi-play-fill");

                updateCurrentSongBadge(null);
            }

            // Reset icon when song ends
            audio.onended = () => {
                icon.classList.remove("bi-pause-fill");
                icon.classList.add("bi-play-fill");
            };
        });
    });
}

function updateCurrentSongBadge(song) {
    const badgeDisplay = document.getElementById("current_played_song");

    if (!song) {
        badgeDisplay.textContent = "None";   // or "" depending on your UI
        return;
    }
    
    badgeDisplay.textContent = `${song.title} — ${song.artist}`;
}
document.addEventListener("DOMContentLoaded", () => {
    renderMusic();
    attachPlayEvents();

    // Load previous song on page load
    const stored = localStorage.getItem("current-song");
    if (stored) updateCurrentSongBadge(JSON.parse(stored));
});


function attachSeekEvents(){
    const seekBars = document.querySelectorAll(".seek-bar");

    seekBars.forEach(bar => {
        const index = bar.getAttribute("data-index");
        const audio = document.getElementById(`audio-${index}`);

        // Update seek bar while playing
        audio.addEventListener("timeupdate", () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            bar.value = percent || 0;
        });

        // Seek when dragging
        bar.addEventListener("input", function () {
            const newTime = (bar.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });
    });
}

function pauseOthers(currentIndex) {
    songList.forEach((_, idx) => {
        if (idx !== parseInt(currentIndex)) {
            const audio = document.getElementById(`audio-${idx}`);
            const btn = document.querySelector(`button[data-index="${idx}"] i`);
            
            if (audio && !audio.paused) {
                audio.pause();
                btn.classList.remove("bi-pause-fill");
                btn.classList.add("bi-play-fill");
            }
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
    renderMusic();
})