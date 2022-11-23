document.addEventListener("DOMContentLoaded", function() {
    populateTracks();
    populatePlaylist();
    console.log("DOM loaded");
});

document.getElementById("trackButton").addEventListener('click', trackSearch);
var trackInput = document.getElementById("trackSearch");

trackInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("trackButton").click();
  }
});


let resultsData = [];

function sortFunction(a, b) {
    let sortBy = document.getElementById("sortResults").value;    
    if (a[sortBy] === b[sortBy]) {
        return 0;
    }
    else {
        return (a[sortBy] < b[sortBy]) ? -1 : 1;
    }
}

function trackSearch() {
    
    let searchInput = document.getElementById("trackSearch").value;
    resultsData.length = 0;
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
                
                resultsData.push([data.track_title, data.artist_name, data.album_title, data.track_duration, data.track_id])
                
                if(i == trackIDs.length - 1){
                    resultsData.sort(sortFunction);
                    for(let j = 0; j < trackIDs.length; j++){
                        const item = document.createElement('li');
                        console.log(resultsData[j])
                        item.appendChild(document.createTextNode(`Track Name: ${resultsData[j][0]}, Artist Name: ${resultsData[j][1]}, Album Name: ${resultsData[j][2]}, Track Length: ${resultsData[j][3]}, Track ID:  ${resultsData[j][4]}`));
                        l.appendChild(item);
                    }
                }
    
            }))
        }
        
        console.log("done")
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
    resultsData.length = 0;

    let searchInput = document.getElementById("artistSearch").value;
    fetch('/artists/search/' + searchInput)
    .then(res => res.json()
    .then(artistIDs => {
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)

        for(let i = 0; i < 20; i ++){
            fetch('/artists/' + artistIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(data);
                resultsData.push(data.artist_name)
            
                if(i == 19){
                    resultsData.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
                    for(let j = 0; j < 20; j++){
                        const item = document.createElement('li');
                        console.log(resultsData[j])
                        item.appendChild(document.createTextNode(`Artist Name: ${resultsData[j]}`));
                        l.appendChild(item);
                    }
                } 
                
                

            }))
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
    resultsData.length = 0;

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
                const listTracks = document.createElement('ul');

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

