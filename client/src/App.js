import React from 'react';

const App = () => {
    return (
        <div>
            <h1>SE 3316 Lab 4</h1>
            <h2>By Jeremy Xia, Malay Patel and Derin Yilmaz</h2>
            <p id="status"> </p>
        
        
                <div className ="search-container">
                    <form>
                        <div className  = "track-search"> 
                            <input type="text" placeholder="Search Tracks" id="userSearch" />
                            <button type="button" id="searchButton">Search</button>
                
                        </div>
        
                        <div className ="playlist-tab">
                            <div className ="create-playlist">
                                <input type="text" placeholder="Playlist Name" id="playlistName" />
                                <button type="button" id="createList">Create</button>
                            </div>
        
                            <div className ="sort-by">
                                Select Playlist
                                <select name="playlist" id="playlist">
                                </select>
        
                                        
                                Sort by: 
        
                                <select name="sortResults" id="sortResults">
                                    <option value="0">Track</option>
                                    <option value="1">Artist</option>
                                    <option value="2">Album</option>
                                    <option value="3">Length</option>
                                    <option value="4" selected="selected">Relevance</option>
                                </select>
                                Search by:
                                
                                <select name="searchBy" id="searchBy">
                                    <option value="0" selected="selected">Track</option>
                                    <option value="1">Artist</option>
                                    <option value="2">Playlist</option>
        
                                </select>
                            </div>
                        
                            <button type="button" id="updateList">Update</button>
                        </div>
                    </form>
                </div>
                <div className ="results-list">
                    <ol id="searchResults"></ol>
        
                </div>
        </div>
    )
}

export default App;