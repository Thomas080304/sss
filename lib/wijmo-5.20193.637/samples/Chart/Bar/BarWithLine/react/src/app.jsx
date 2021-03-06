import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: ['rgba(136,189,230,1)', 'rgba(251,178,88,1)', 'rgba(144,205,151,1)', 'rgba(246,170,201,1)',
                'rgba(191,165,84,1)', 'rgba(188,153,199,1)', 'rgba(237,221,70,1)', 'rgba(240,126,110,1)', 'rgba(140,140,140,1)']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Climate of New York" bindingX="month" itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None">
                </wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="Mean Temperature" binding="temperature">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Average Precipitation" binding="precipitation" chartType="Line">
                    <wjChart.FlexChartAxis wjProperty="axisY" position="Right" title="Average Precipitation (mm)" axisLine={true} min={0}>
                    </wjChart.FlexChartAxis>
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartAxis wjProperty="axisY" axisLine={true} origin={-10} title="Mean Temperature (°C)">
                </wjChart.FlexChartAxis>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
