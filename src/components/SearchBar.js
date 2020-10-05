import React from 'react';
import {getFolders} from '../api/index';


class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchterm: ''
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick = (e) => {
        const searchValue = document.getElementById('search-box').value;
        getFolders()
        .then (res => {
            res.folderdetails.map(folder => {
                if (folder.foldername === searchValue) {
                    document.getElementById('file-view-container').innerHTML = '';
                    const folderUI = document.createElement('div');
                    folderUI.innerHTML = folder.foldername;
                    document.getElementById('file-view-container').appendChild(folderUI);
                }
            })
        })
    }

    render() {
        return(
            <div id="search-bar">
                <input type="text" id="search-box"/>
                <button onClick={this.onClick}>Search</button>
            </div>
        )
    }
}

export default SearchBar;