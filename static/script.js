
document.getElementById("trackButton").addEventListener('click', trackSearch);
var input = document.getElementById("trackSearch");

input.addEventListener("keypress", function(event) {
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
                item.appendChild(document.createTextNode(`Track Name: ${data.track_title}, Artist Name: ${data.artist_name}, Album Name: ${data.artist_name}, Track ID:  ${data.track_id}`));
                l.appendChild(item);
                
            }))
        }
    }))
}


document.getElementById("artistButton").addEventListener('click', artistSearch);
var input = document.getElementById("artistSearch");

input.addEventListener("keypress", function(event) {
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    your_function();
  });