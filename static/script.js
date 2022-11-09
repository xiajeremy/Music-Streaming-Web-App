document.getElementById("genreButton").addEventListener('click', genreSearch);

function genreSearch() {
    fetch('/genres')
    .then(res => res.json()
    .then(data => {
        console.log(data);
        const l = document.getElementById('searchResults');
        removeAllChildNodes(l)
        data.forEach(e => {
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`Genre Name: ${e.title} Genre ID: ${e.genre_id} Parent ID: ${e.parent} `));
            l.appendChild(item);
        })
    }))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}