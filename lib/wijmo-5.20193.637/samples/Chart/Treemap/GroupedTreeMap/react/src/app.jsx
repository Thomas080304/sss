import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as chart from '@grapecity/wijmo.chart';
import * as wjHierarchical from '@grapecity/wijmo.react.chart.hierarchical';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initTreemap = (sender) => {
            sender.dataLabel.content = "{name}";
        };
        this.getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(chart.Palettes)
                .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return chart.Palettes[palettes[rand]];
        };
        this.state = {
            data: getData(),
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjHierarchical.TreeMap binding="sales" bindingName={['category', 'subCategory']} itemsSource={this.state.data} palette={this.state.palette} initialized={this.initTreemap}></wjHierarchical.TreeMap>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
