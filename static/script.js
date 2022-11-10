document.addEventListener("DOMContentLoaded", function() {
    console.log("test");
    populateTracks();
    populatePlaylist();
});

document.getElementById("trackButton").addEventListener('click', trackSearch);
var trackInput = document.getElementById("trackSearch");

trackInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("trackButton").click();
  }
});


function trackSearch() {
    let searchInput = document.getElementById("trackSearch").value;
    fetch('/tracks/search/' + searchInput)
    .then(res => res.json()
    .then(trackIDs => {
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)

        for(let i = 0; i < trackIDs.length; i ++){
            fetch('/tracks/' + trackIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(data);
                
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(`Track Name: ${data.track_title}, Artist Name: ${data.artist_name}, Album Name: ${data.album_title}, Track ID:  ${data.track_id}`));
                l.appendChild(item);
                
            }))
        }
    }))
}


document.getElementById("artistButton").addEventListener('click', artistSearch);
var artistInput = document.getElementById("artistSearch");

artistInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("artistButton").click();
  }
});

function artistSearch() {
    let searchInput = document.getElementById("artistSearch").value;
    fetch('/artists/search/' + searchInput)
    .then(res => res.json()
    .then(artistIDs => {
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)

        let counter = 0;
        for(let i = 0; i < artistIDs.length; i ++){
            if(counter < 20){
                fetch('/artists/' + artistIDs[i])
                .then(res => res.json()
                .then(data => {
                    console.log(data);
                    
                    const item = document.createElement('li');
                    item.appendChild(document.createTextNode(`Artist Name: ${data.artist_name}`));
                    l.appendChild(item); 
                }))
                counter ++;

            } else {
                break;
            }
        }
    }))
}

document.getElementById("searchList").addEventListener('click', playlistSearch);
var playlistInput = document.getElementById("playlistName");

playlistInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchList").click();
  }
});


function playlistSearch() {
    let searchInput = document.getElementById("playlistName").value;
    fetch('/playlists/search/' + searchInput) //Returns array of playlist names
    .then(res => res.json()
    .then(playlistNames => {
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)

        for(let i = 0; i < playlistNames.length; i ++){
            fetch('/playlists/' + playlistNames[i]) //Returns a playlist object
            .then(res => res.json()
            .then(data => {
                console.log(data);
                
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(`Playlist Name: ${data.playlist_name}, Number of Tracks: ${data.tracks_amount}, Playlist duration: ${data.playtime}`));
                const listTracks = document.createElement('ol');

                for(let j = 0; j < data.track_list.length; j ++){
                    console.log(data.track_list[j])
                    fetch('/tracks/' + data.track_list[j]) //Returns a Track object
                    .then(res => res.json()
                    .then(tracks => {
                        const listTracksItem = document.createElement('li');
                        listTracksItem.appendChild(document.createTextNode(`Track Title: ${tracks.track_title}, Artist Name: ${tracks.artist_name}, Album Name: ${tracks.artist_name}, Duration: ${tracks.track_duration}`));
                        listTracks.appendChild(listTracksItem);
                    }))
                }

                item.appendChild(listTracks);
                l.appendChild(item);

            }))
        }

    }))
}

document.getElementById("createList").addEventListener('click', playlistCreate);

function playlistCreate() {
    let searchInput = document.getElementById("playlistName").value;
    fetch('/playlists/' + searchInput, {
        method: 'POST',
    }) //Returns array of playlist names
    .then(res => {
        if(res.ok ){
            res.json()
            .then(data => console.log(data))
            .catch(err => console.log('Failed to get object'))  
        } 
        else {
            console.log('Error: ', res.status)
        }
    })
    .catch()
}

document.getElementById("updateList").addEventListener('click', playlistUpdate);

function playlistUpdate() {
    let playlistName = document.getElementById("playlist").value;
    var tracklistInput = []
    for(var option of document.getElementById("tracks").options){
        if (option.selected) {
            tracklistInput.push(option.value);
        }
    }
    console.log("tracks: "+tracklistInput);
    fetch('/playlists/' + playlistName, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(tracklistInput)
    }) //Returns array of playlist names
    .then(res => {
        if(res.ok ){
            res.json()
            .then(data => console.log(data))
            .catch(err => console.log('Failed to get object'))  
        } 
        else {
            console.log('Error: ', res.status)
        }
    })
    .catch()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function populateTracks(){
    const statusMessage = document.getElementById("status");
    statusMessage.innerHTML = "Loading...";
    fetch('/tracks')
    .then(res => res.json()
    .then(trackData => {
        const l = document.getElementById('tracks');
        trackData.forEach(e => {
            const item = document.createElement('option');
            item.value = e.track_id;
            item.appendChild(document.createTextNode(e.track_id))
            l.appendChild(item);
            
        })
        statusMessage.innerHTML = "Done";
    }))
}

function populatePlaylist(){

    fetch('/playlists')
    .then(res => res.json()
    .then(trackData => {
        const l = document.getElementById('playlist');
        trackData.forEach(e => {
            const item = document.createElement('option');
            item.value = e.playlist_name;
            item.appendChild(document.createTextNode(e.playlist_name))
            l.appendChild(item);
            
        })
    }))
}

