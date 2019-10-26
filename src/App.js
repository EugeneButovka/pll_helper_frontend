import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import logo from './logo.svg';
import Scheme from "./components/scheme";

class App extends Component {
    render() {
        return (
            <div className="App">
                    <Scheme active={true}/>
            </div>
        );
    }
}

export default App;
