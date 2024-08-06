document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const playlistList = document.getElementById('playlist-list');
    const trackForm = document.getElementById('track-form');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackUrl = document.getElementById('track-url');
    const trackList = document.getElementById('track-list');
    const audioPlayer = document.getElementById('audio-player');

    let playlists = {};
    let currentPlaylist = null;

    createPlaylistBtn.addEventListener('click', () => {
        const playlistName = prompt('Enter playlist name:');
        if (playlistName) {
            playlists[playlistName] = [];
            updatePlaylistList();
        }
    });

    function updatePlaylistList() {
        playlistList.innerHTML = '';
        Object.keys(playlists).forEach(playlist => {
            const li = document.createElement('li');
            li.textContent = playlist;
            li.addEventListener('click', () => {
                currentPlaylist = playlist;
                updateTrackList();
            });
            playlistList.appendChild(li);
        });
    }

    function updateTrackList() {
        if (!currentPlaylist) return;
        trackList.innerHTML = '';
        playlists[currentPlaylist].forEach(track => {
            const li = document.createElement('li');
            li.textContent = `${track.title} by ${track.artist}`;
            li.addEventListener('click', () => {
                audioPlayer.src = track.url;
                audioPlayer.play();
            });
            trackList.appendChild(li);
        });
    }

    trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentPlaylist) {
            alert('Please select a playlist first.');
            return;
        }
        const newTrack = {
            title: trackTitle.value,
            artist: trackArtist.value,
            url: trackUrl.value
        };
        playlists[currentPlaylist].push(newTrack);
        updateTrackList();
        trackTitle.value = '';
        trackArtist.value = '';
        trackUrl.value = '';
    });
});
