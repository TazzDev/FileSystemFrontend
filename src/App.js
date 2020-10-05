import React from 'react';
import ReactDOM from 'react-dom';

//importing components

import Header from './components/Header';
import FolderView from './components/FolderView';

//importing the style.scss file

import './styles/style.scss';
import SearchBar from './components/SearchBar';

const App = () => {
    return(
        <div>
            <Header/>
            <SearchBar/>
            <FolderView/>
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'));