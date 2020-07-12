import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FontTypes from './components/fonts/Types';
import OpenFolder from '../renderer-process/open-folder';

class App extends Component {
    constructor(props) {
        super(props);
        OpenFolder.onFolderOpened(this.showFileTree);
    }

    handleOpenFolder = () => {
        OpenFolder.open()
    }

    showFileTree = (fileTree) => {
        console.log('fileTree', fileTree);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React
                    </a>

                    <FontTypes />

                    <button onClick={this.handleOpenFolder}>Open Folder</button>
                </header>
            </div>
        );
    }
}

export default App;
