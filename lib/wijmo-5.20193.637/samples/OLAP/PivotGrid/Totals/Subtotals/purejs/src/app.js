import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var ng = new wjOlap.PivotEngine({
        itemsSource: getData(1000),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'],
        showRowTotals: 'None',
        showColumnTotals: 'Subtotals',
    });
    var amountField = ng.fields.getField('Amount');
    amountField.format = 'c0';
    var dateField = ng.fields.getField('Date');
    dateField.format = 'yyyy'; // show dates as years
    //
    // show pivot panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show pivot grid
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // toggle showRowTotals
    document.getElementById('showRowTotals').addEventListener('click', function (e) {
        pivotGrid.engine.showRowTotals = e.target.checked ?
            wjOlap.ShowTotals.Subtotals : wjOlap.ShowTotals.None;
    });
    //
    // toggle showColumnTotals
    document.getElementById('showColumnTotals').addEventListener('click', function (e) {
        pivotGrid.engine.showColumnTotals = e.target.checked ?
            wjOlap.ShowTotals.Subtotals : wjOlap.ShowTotals.None;
    });
}
