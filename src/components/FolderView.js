import React from 'react';
import Folder from './Folder';

import {getFolders, createFolder, deleteFolder} from '../api/index';


class FolderView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            url: [],
        }

        this.onClick = this.onClick.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.onBack = this.onBack.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);

    }

    componentDidMount() {
        getFolders()
        .then(res => {

            let folders = this.state.folders;
            
            res.folderdetails.map(folder=> {
                if(folder.parentname==="/") {
                    folders.push(folder.foldername);
                }
            })
            //console.log(folders);

            this.setState({folders});
            //console.log(this.state.folders);

            }
        )
        
    }

    onClick = (e) => {

        const url = e.target.parentNode.textContent;
        const fullUrl = this.state.url.concat(e.target.parentNode.textContent);
        console.log(fullUrl)

        this.setState(prevState => ({
            ...prevState,
            url: fullUrl,
        }))
        //document.getElementById('file-view-container').innerHTML = '';

        getFolders()
        .then(res => {

            let folders = [];
            
            res.folderdetails.map(folder=> {
                if(folder.parentname===url) {
                    folders.push(folder.foldername);
                }
            })

            this.setState({folders})

            console.log(this.state)

            if (folders.length === 0) {
                document.getElementById('warning').innerText = "No files or folders";
            } else {
                document.getElementById('warning').innerText = "";
            }

            }
        )
    }

    onBack = (e) => {

        const url = this.state.url;
        url.pop();
        const lastParent = url[url.length-1] || '/';
        this.setState(prevState => ({
            ...prevState,
            url: url,
        }))

        getFolders()
        .then(res => {

            let folders = [];
            
            res.folderdetails.map(folder=> {
                if(folder.parentname===lastParent) {
                    folders.push(folder.foldername);
                }
            })

            this.setState({folders})

            console.log(this.state)

            if (folders.length === 0) {
                document.getElementById('warning').innerText = "No files or folders";
            } else {
                document.getElementById('warning').innerText = "";
            }

            }
        )
    }

    createFolder = (e) => {
        const parentName = this.state.url[this.state.url.length-1] || '/';
        const folderName = document.getElementById('folder-name-input').value;
        const children = 0;

        console.log(parentName)

        const folder = {
            foldername: folderName,
            parentname: parentName,
            children,
        }

        createFolder(folder)
        .then(res => console.log(res))
    }

    deleteFolder = (e) => {
        //console.log(e.target.parentNode.children[0].lastChild.innerText);

        const folderName = e.target.parentNode.children[0].lastChild.innerText;

        deleteFolder(folderName)
        .then(res => console.log(res))
    }


    render() {
        const folders = this.state.folders;
        return (
            <div id="file-view-container" >
                <div id="folders">
                {folders.map(folder=>
                    <Folder key={folder} foldername={folder} onClick={this.onClick} onDelete={this.deleteFolder}/>
                )}
                </div>
                <p id="warning"></p>
                <button id="back" onClick={this.onBack}>Back</button>

                <div id="create-folder">
                    <input type="text" id="folder-name-input"></input>
                    <button id="create" onClick={this.createFolder}>Create a folder</button>
                </div>

            </div>
        )
    }
}

export default FolderView;