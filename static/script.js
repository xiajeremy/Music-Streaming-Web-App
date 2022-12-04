document.addEventListener("DOMContentLoaded", function() {
    populateTracks();
    populatePlaylist();
    console.log("DOM loaded");
});

document.getElementById("searchButton").addEventListener('click', trackSearch);
document.getElementById("searchButton").addEventListener('click', artistSearch);
document.getElementById("searchButton").addEventListener('click', playlistSearch);

document.getElementById("searchBy").addEventListener('change', searchBy);
document.getElementById("sortResults").addEventListener('change', searchBy);

function searchBy(){
    let searchByValue = document.getElementById("searchBy").value;
    if(searchByValue == 0){
        showTracks();
    }else if(searchByValue == 1){
        showArtists();
    }else {
        showPlaylists();
    }
}

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


    fetch('/tracks/search/' + searchInput)
    .then(res => res.json()
    .then(trackIDs => {
        

        for(let i = 0; i < trackIDs.length; i++){
            fetch('/tracks/' + trackIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(i+": "+data);
                
                tracksByRelevance[i] = [data.track_title, data.artist_name, data.album_title, data.track_duration, data.track_id];
                
                if(i == trackIDs.length - 1){
                    searchBy();
                }
    
            }))
        }    
        console.log("done")
    }))
}

function showTracks(){
    tracksByOther.length = 0;
    const l = document.getElementById('searchResults');
    removeAllChildNodes(l)
    tracksByRelevance.forEach(cloneArray);
    function cloneArray(value) {
        tracksByOther.push(value); 
    }
    tracksByOther.sort(sortFunction);
    for(let j = 0; j < tracksByRelevance.length; j++){
        const item = document.createElement('li');
        console.log(tracksByOther[j])
        var button = document.createElement("button");
        button.innerHTML = "▶";
        button.setAttribute('onclick',`window.open("https://www.youtube.com/results?search_query=${tracksByOther[j][0]}", "_blank")`);

        item.appendChild(document.createTextNode(`Track Name: ${tracksByOther[j][0]}, Artist Name: ${tracksByOther[j][1]}, Album Name: ${tracksByOther[j][2]}, Track Length: ${tracksByOther[j][3]}, Track ID:  ${tracksByOther[j][4]}`));
        item.appendChild(button);
        l.appendChild(item);
    }
}

let artistsByRelevance = [];
let artistsByOther = [];

function artistSearch() {

    let searchInput = document.getElementById("userSearch").value;

    artistsByRelevance.length = 0;

    fetch('/artists/search/' + searchInput)
    .then(res => res.json()
    .then(artistIDs => {
       

        for(let i = 0; i < artistIDs.length; i ++){
            fetch('/artists/' + artistIDs[i])
            .then(res => res.json()
            .then(data => {
                console.log(i+": "+data);

                artistsByRelevance[i] = data.artist_name;
                

                if(i == artistIDs.length-1){
                    searchBy();
                } 

            }))
            
        }
    }))
}

function showArtists (){
    artistsByOther.length = 0;

    const l = document.getElementById('searchResults');
    removeAllChildNodes(l)
    artistsByRelevance.forEach(cloneArray);
    function cloneArray(value) {
        artistsByOther.push(value); 
    }
    if(document.getElementById("sortResults").value == 1){
        artistsByOther.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
    }
    for(let j = 0; j < artistsByRelevance.length; j++){
        const item = document.createElement('li');
        console.log(artistsByOther[j])
        item.appendChild(document.createTextNode(`Artist Name: ${artistsByOther[j]}`));
        l.appendChild(item);
    }
}

let playlistsByRelevance = [];
let playlistsByOther = [];

function playlistSearch() {
    playlistsByRelevance.length = 0;

    let searchInput = document.getElementById("userSearch").value;

    fetch('/playlists/search/' + searchInput) //Returns array of playlist names
    .then(res => res.json()
    .then(playlistNames => {
        

        for(let i = 0; i < playlistNames.length; i ++){
            fetch('/playlists/' + playlistNames[i]) //Returns a playlist object
            .then(res => res.json()
            .then(data => {
                console.log(i+": "+data);

                playlistsByRelevance[i] = [data.playlist_name, data.tracks_amount, data.playtime, data.track_list, data.last_edit, data.description];

                if(i == playlistNames.length-1){
                    searchBy();
                } 
            }))
        }

    }))
}

function showPlaylists() {
    playlistsByOther.length = 0;

    const l = document.getElementById('searchResults');
    removeAllChildNodes(l)
    playlistsByRelevance.forEach(cloneArray);
    function cloneArray(value) {
        playlistsByOther.push(value); 
    }
    playlistsByOther.sort((a, b) => {
        if(a[4] === b[4]){
            return 0;
        } else {
            return (a[4] < b[4]) ? -1 : 1;
        }
    });
    for(let j = 0; j < playlistsByRelevance.length; j++){
        const item = document.createElement('li');
        const listTracks = document.createElement('ul');
        console.log(playlistsByOther[j])
        item.appendChild(document.createTextNode(`Playlist Name: ${playlistsByOther[j][0]}, Number of Tracks: ${playlistsByOther[j][1]}, Playlist duration: ${playlistsByOther[j][2]}, Description: ${playlistsByOther[j][5]}, Last Edited: ${playlistsByOther[j][4]}`));
        for(let i = 0; i < playlistsByOther[j][3].length; i ++){
            console.log(playlistsByOther[j][3])
            fetch('/tracks/' + playlistsByOther[j][3][i]) //Returns a Track object
            .then(res => res.json()
            .then(tracks => {
                const listTracksItem = document.createElement('li');
                listTracksItem.appendChild(document.createTextNode(`Track Title: ${tracks.track_title}, Artist Name: ${tracks.artist_name}, Album Name: ${tracks.artist_name}, Duration: ${tracks.track_duration}`));
                listTracks.appendChild(listTracksItem);
            }))
        }
        item.appendChild(listTracks);
        l.appendChild(item);
        
    }

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

