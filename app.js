const searchSongs = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    displaySpinner()
        //load data
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.total == 0) {
            checkError()
        } else {
            displaySongs(data.data)
        }

    } catch (error) {
        checkError()
    }
}

const checkError = () => {
    const message = document.getElementById('notification')
    message.innerText = "Sorry, we are unable to find that."
}

const displaySongs = songs => {
    displaySpinner()
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
         <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
            `;
        songContainer.appendChild(songDiv)
    })

}

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    displaySpinner()
    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.lyrics == "") {
            checkError()
        } else {
            displayLyrics(data.lyrics)
        }
    } catch (error) {
        checkError()
    }
}

const displayLyrics = lyrics => {
    displaySpinner()
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
}
const displaySpinner = () => {
    const spinner = document.getElementById('loading-spinner')
    spinner.classList.toggle('d-none')
}

document.getElementById("search-field").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchSongs()
    }
});