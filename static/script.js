document.addEventListener("DOMContentLoaded", function() {
    populateTracks();
    populatePlaylist();
    console.log("DOM loaded");
});

document.getElementById("searchButton").addEventListener('click', trackSearch);
document.getElementById("searchButton").addEventListener('click', artistSearch);
document.getElementById("searchButton").addEventListener('click', playlistSearch);

var userInput = document.getElementById("userSearch");

userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});



function sortFunction(a, b) {
    let sortBy = document.getElementById("sortResults").value;    
    if(sortBy == 4){
        return 0;
    }
    if (a[sortBy] === b[sortBy]) {
        return 0;
    }
    else {
        return (a[sortBy] < b[sortBy]) ? -1 : 1;
    }
}

let tracksByRelevance = [];
let tracksByOther = [];

function trackSearch() {
    
    let searchInput = document.getElementById("userSearch").value;
    tracksByRelevance.length = 0;
    tracksByOther.length = 0;


    fetch('/tracks/search/' + searchInput)
    .then(res => res.json()
    .then(trackIDs => {
        

        for(let i = 0; i < trackIDs.length; i++){
            fetch('/tracks/' + trackIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(data);
                
                tracksByRelevance.push([data.track_title, data.artist_name, data.album_title, data.track_duration, data.track_id])
                
                if(i == trackIDs.length - 1){
                    showTracks();
                }
    
            }))
        }    
        console.log("done")
    }))
}

function showTracks(){
    const l = document.getElementById('trackResults');
    removeAllChildNodes(l)
    tracksByRelevance.forEach(cloneArray);
    function cloneArray(value) {
        tracksByOther.push(value); 
    }
    tracksByOther.sort(sortFunction);
    for(let j = 0; j < trackIDs.length; j++){
        const item = document.createElement('li');
        console.log(tracksByRelevance[j])
        var button = document.createElement("button");
        button.innerHTML = "▶";
        button.setAttribute('onclick',`window.open("https://www.youtube.com/results?search_query=${tracksByRelevance[j][0]}", "_blank")`);

        item.appendChild(document.createTextNode(`Track Name: ${tracksByRelevance[j][0]}, Artist Name: ${tracksByRelevance[j][1]}, Album Name: ${tracksByRelevance[j][2]}, Track Length: ${tracksByRelevance[j][3]}, Track ID:  ${tracksByRelevance[j][4]}`));
        item.appendChild(button);
        l.appendChild(item);
    }
}


let artistsRelevance = [];

function artistSearch() {
    artistsRelevance.length = 0;
    counter = 0;
    let searchInput = document.getElementById("artistSearch").value;
    fetch('/artists/search/' + searchInput)
    .then(res => res.json()
    .then(artistIDs => {
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)
        for(let i = 0; i < artistIDs.length; i ++){
            
            fetch('/artists/' + artistIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(data);
                artistsRelevance.push(data.artist_name)
                

                if(i == artistIDs.length-1){
                    artistsRelevance.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
                    for(let j = 0; j < artistIDs.length; j++){
                        const item = document.createElement('li');
                        console.log(artistsRelevance[j])
                        item.appendChild(document.createTextNode(`Artist Name: ${artistsRelevance[j]}`));
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
    tracksByRelevance.length = 0;

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
                
                const item = document.createElement('div');
                item.className = "playlist-result";
                const header = document.createElement('h1')
                header.className = "playlist-name";
                
                header.appendChild(document.createTextNode(`${data.playlist_name}`))
                item.appendChild(header);

                const playlistAbout = document.createElement('p');
                playlistAbout.className = "playlist-about";
                item.appendChild(playlistAbout)
                playlistAbout.appendChild(document.createTextNode(`${data.tracks_amount} tracks    |    Playlist duration: ${data.playtime}`));
                
                const listTracks = document.createElement('ul')

                for(let j = 0; j < data.track_list.length; j++){
                    console.log(data.track_list[j])
                    fetch('/tracks/' + data.track_list[j]) //Returns a Track object
                    .then(res => res.json()
                    .then(tracks => {
                        
                        const listTracksItem = document.createElement('li');
                        listTracksItem.appendChild(document.createTextNode(`Track Title: ${tracks.track_title}, Artist Name: ${tracks.artist_name}, Album Name: ${tracks.artist_name}, Duration: ${tracks.track_duration}`));
                        var button = document.createElement("button");
                        button.innerHTML = "▶";
                        listTracks.appendChild(listTracksItem)
                        .appendChild(button);
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

    //MAKE THESE VARIABLES IN FRONT END HTML
    let playlistDescription = document.getElementById("description").value;
    var reqBody = {playlist_name: playlistName, track_list: tracklistInput, description: playlistDescription}

    fetch('/playlists/' + playlistName, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(reqBody)
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

