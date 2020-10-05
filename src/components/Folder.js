import React from 'react';
import FolderIcon from '../folder-icon.png';

class Folder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            <div onClick={this.props.onClick} id="folder-selection">
                <img src={FolderIcon} alt={this.props.foldername}/>
                <h1>{this.props.foldername}</h1>
            </div>
            <button onClick={this.props.onDelete} id="delete-button">Delete</button>
            </div>
        )
    }
}

export default Folder;