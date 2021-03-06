import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.state = {
            dateSamples: [
                { format: 'd', description: 'Short Date Pattern' },
                { format: 'D', description: 'Long Date Pattern' },
                { format: 'f', description: 'Full Date/Time Pattern (short time)' },
                { format: 'F', description: 'Full Date/Time Pattern (long time)' },
                { format: 't', description: 'Short Time Pattern' },
                { format: 'T', description: 'Long Time Pattern' },
                { format: "'Q'Q yyyy", description: 'Quarter/Year' },
                { format: 'MMMM dd, yyyy', description: 'Custom format' }
            ],
            numberSamples: [
                { specifier: 'n*', description: 'Number' },
                { specifier: 'n*,', description: 'Number (thousands)' },
                { specifier: 'n*,,', description: 'Number (millions)' },
                { specifier: 'f*', description: 'Fixed-point' },
                { specifier: 'g*', description: 'General (no trailing zeros)' },
                { specifier: 'd*', description: 'Decimal (integers)' },
                { specifier: 'x*', description: 'Hexadecimal (integers)' },
                { specifier: 'c*', description: 'Currency' },
                {
                    specifier: 'c*€',
                    description: 'Currency (explicit currency symbol)'
                },
                { specifier: 'c* ', description: 'Currency (no currency symbol)' },
                { specifier: 'p*', description: 'Percent' }
            ],
            numValue: 1234.5678,
            precision: 2,
            selectedValue: 'en'
        };
    }
    render() {
        return <div className="container-fluid">
            <p>
                <wjInput.Menu header='Culture' value={this.state.selectedValue} itemClicked={this._selectedCultureChanged.bind(this)}>
                    <wjInput.MenuItem value="en">English (US)</wjInput.MenuItem>
                    <wjInput.MenuItem value="en-GB">English (UK)</wjInput.MenuItem>
                    <wjInput.MenuItem value="es">Spanish</wjInput.MenuItem>
                    <wjInput.MenuItem value="de">German</wjInput.MenuItem>
                    <wjInput.MenuItem value="it">Italian</wjInput.MenuItem>
                    <wjInput.MenuItem value="fr">French</wjInput.MenuItem>
                    <wjInput.MenuItem value="pt">Portuguese</wjInput.MenuItem>
                    <wjInput.MenuItem value="ru">Russian</wjInput.MenuItem>
                    <wjInput.MenuItem value="ja">Japanese</wjInput.MenuItem>
                    <wjInput.MenuItem value="ko">Korean</wjInput.MenuItem>
                    <wjInput.MenuItem value="zh">Chinese</wjInput.MenuItem>
                </wjInput.Menu>
            </p>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Dates</h4>
                </div>
                <div className="panel-body">
                    <table className="table table-condensed">
                        <thead>
                            <th>format</th>
                            <th>description</th>
                            <th>result</th>
                        </thead>
                        <tbody>
                            {this.state.dateSamples.map((item) => {
            return <tr key={item.id}>
                                        <td>
                                            <b>{item.format}</b>
                                        </td>
                                        <td>{item.description}</td>
                                        <td>{this._formatDate(item.format)}</td>
                                    </tr>;
        })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Numbers</h4>
                </div>
                <div className="panel-body input-numbers">
                    <div className="form-group">
                        <label htmlFor="theValue">Value</label>
                        <wjInput.InputNumber id="theValue" value={this.state.numValue} step={1} valueChanged={this._numberValueChanged.bind(this)}>
                        </wjInput.InputNumber>
                    </div>
                    <div className="form-group">
                        <label htmlFor="thePrecision">Precision</label>
                        <wjInput.InputNumber id="thePrecision" step={1} min={0} max={10} value={this.state.precision} valueChanged={this._precisionValueChanged.bind(this)}>
                        </wjInput.InputNumber>
                    </div>
                </div>
                <div className="panel-body">
                    <table className="table table-condensed">
                        <thead>
                            <th>specifier</th>
                            <th>description</th>
                            <th className="text-right">result</th>
                        </thead>
                        <tbody>
                            {this.state.numberSamples.map((item) => {
            return <tr key={item.id}>
                                        <td>
                                            <b>{item.specifier}</b>
                                        </td>
                                        <td>{item.description}</td>
                                        <td className="text-right">{this._formatNumber(item.specifier)}</td>
                                    </tr>;
        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
    _formatDate(format) {
        return wijmo.Globalize.format(new Date(), format);
    }
    _formatNumber(specifier) {
        let format = specifier.replace('*', this.state.precision.toString());
        return wijmo.Globalize.format(this.state.numValue, format);
    }
    _loadCulture(culture) {
        // apply new culture to page
        let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${culture}.js`, scripts = document.getElementsByTagName('script');
        //
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                script.parentElement.removeChild(script);
                break;
            }
        }
        //
        let script = document.createElement('script');
        script.onload = () => {
            wijmo.Control.refreshAll(document.querySelector('.input-numbers'));
            this.forceUpdate();
        };
        //
        script.src = url;
        //
        document.head.appendChild(script);
    }
    _selectedCultureChanged(sender) {
        if (sender.selectedValue) {
            this.setState({ selectedValue: sender.selectedValue });
            this._loadCulture(sender.selectedValue);
        }
    }
    _numberValueChanged(sender) {
        this.setState({ numValue: sender.value });
    }
    _precisionValueChanged(sender) {
        this.setState({ precision: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
