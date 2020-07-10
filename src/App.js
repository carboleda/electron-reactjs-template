import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileManager from './utilities/FileManager';
const remote = window.require('electron').remote;
const { dialog } = remote;

class App extends Component {
    constructor(props) {
        super(props);
    }

    handleOpenFolder = async () => {
        const directory = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        console.log('directory', directory);

        if (directory && directory.filePaths[0]) {
            const fileManager = new FileManager();
            const fileTree = fileManager.walkSync(directory.filePaths[0]);
            console.log('fileTree', fileTree);
        }
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

                    <button onClick={this.handleOpenFolder}>Open Folder</button>
                </header>
            </div>
        );
    }
}

export default App;
