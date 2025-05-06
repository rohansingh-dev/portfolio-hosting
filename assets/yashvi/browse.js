const trackList = document.getElementById('track-list');
tracks.forEach(track => {
    const div = document.createElement('div');
    div.className = 'track-item';
    div.style.background = "#223a5e";
    div.style.borderRadius = "10px";
    div.style.padding = "18px 24px";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "16px";
    div.innerHTML = `
        <span class="track-title" style="color:#5ec6fa;font-weight:bold;">${track.title} - ${track.artist}</span>
        <button onclick="playTrack(${track.id})" style="background:#5ec6fa;color:#193a5a;font-weight:bold;padding:8px 22px;border:none;border-radius:20px;cursor:pointer;">Play</button>
    `;
    trackList.appendChild(div);
});

function playTrack(id) {
    localStorage.setItem('currentTrackId', id);
    window.location.href = 'player.html';
}