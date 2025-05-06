const playerContainer = document.getElementById('player-container');
const trackId = localStorage.getItem('currentTrackId');
const track = tracks.find(t => t.id == trackId) || tracks[0];

playerContainer.innerHTML = `
    <div style="background:#223a5e;padding:32px 24px;border-radius:16px;max-width:400px;margin:auto;text-align:center;box-shadow:0 2px 12px rgba(30,46,77,0.08);">
        <h2 style="color:#5ec6fa;">${track.title}</h2>
        <p style="color:#b3d6f2;">by ${track.artist}</p>
        <audio controls autoplay src="${track.url}" style="width:100%;margin-top:18px;"></audio>
    </div>
`;

// Track details section
const detailsSection = document.getElementById('track-details');
detailsSection.innerHTML = `
    <div style="margin:32px auto 0 auto;max-width:400px;text-align:center;">
        <h3 style="color:#5ec6fa;margin-bottom:8px;">Now Playing</h3>
        <div style="color:#e0e8f0;font-size:1.1em;">
            <strong>${track.title}</strong> by <span style="color:#b3d6f2;">${track.artist}</span>
        </div>
        <div style="margin-top:10px;color:#b3d6f2;font-size:0.98em;">
            Track ID: ${track.id}
        </div>
    </div>
`;

// Playlist section
const playlistSection = document.getElementById('playlist-section');
playlistSection.innerHTML = `
    <div style="margin:40px auto 0 auto;max-width:420px;">
        <h3 style="color:#5ec6fa;margin-bottom:14px;">Playlist</h3>
        <ul style="list-style:none;padding:0;margin:0;">
            ${tracks.map(t => `
                <li style="margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;background:#223a5e;border-radius:10px;padding:10px 18px;">
                    <span style="color:#5ec6fa;font-weight:500;">${t.title}</span>
                    <button onclick="playTrack(${t.id})" style="background:#5ec6fa;color:#193a5a;font-weight:bold;padding:6px 18px;border:none;border-radius:16px;cursor:pointer;font-size:0.97em;">Play</button>
                </li>
            `).join('')}
        </ul>
    </div>
`;

// Allow playlist play button to work
window.playTrack = function(id) {
    localStorage.setItem('currentTrackId', id);
    location.reload();
};