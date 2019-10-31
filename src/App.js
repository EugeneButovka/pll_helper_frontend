import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import logo from './logo.svg';
import SchemeContainer from "./components/SchemeContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                    <SchemeContainer active={true}/>
            </div>
        );
    }
}

export default App;
