import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartFinanceModule } from '@grapecity/wijmo.angular2.chart.finance';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
import * as core from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjFinanceChart from '@grapecity/wijmo.chart.finance';
import * as wjChartInteraction from '@grapecity/wijmo.chart.interaction';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    tooltip(ht: wjChart.HitTestInfo) {
        var date = ht.item && ht.item.date ? ht.item.date : null,
            content = '';

        if (core.isDate(date)) {
            date = core.Globalize.formatDate(date, 'MM/dd/yy');
        }

        if (ht && ht.item) {
            content =
               '<b>' + ht.name + '</b><br/>' +
               'Date: ' + date + '<br/>' +
               'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
               'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
               'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
               'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
               'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
        }

        return content;
    }
    //
    rsRendered(rs: wjChartInteraction.RangeSelector, rsChart: wjFinanceChart.FinancialChart) {
        // set range
        if (rs) {
            var range = this.findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
            rs.min = range.min;
            rs.max = range.max;
        }
    }
    //
    rangeChanged(rs: wjChartInteraction.RangeSelector, theChart: wjFinanceChart.FinancialChart, 
            axisY1: wjChart.Axis, axisY2: wjChart.Axis, axisY3: wjChart.Axis) {
        // find visible y-range
        var yRange = this.findYRange(this.data, rs.min, rs.max);
        // update main chart's x & y range
        theChart.axisX.min = rs.min;
        theChart.axisX.max = rs.max;
        [theChart.axisY, axisY1, axisY2, axisY3].forEach(axis => {
            axis.min = yRange.min;
            axis.max = yRange.max;
        });

        theChart.invalidate();
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
          .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjChart.Palettes[palettes[rand]];
    }
    // helper method to calculate (upper) percentage of total range
    // the default will show the top 20% of the available range
    findRange(min: number, max: number, percent?: number) {
        var pctToShow = core.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2,
            range = {
                min: NaN,
                max: NaN
            };

        if (core.isDate(min) && core.isDate(max)) {
            range.max = max.valueOf();
            range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
        } else if (core.isNumber(min) && core.isNumber(max)) {
            range.max = max;
            range.min = (max - min) * (1 - pctToShow) + min;
        }

        return range;
    }
    // assumes High, Low, Open, Close, and Volume data
    // also assumes category axis
    findYRange(data: any[], xmin: number, xmax: number) {
        var item, i, ymin = null, ymax = null;
        //
        for (i = 0; i < data.length; i++) {
            item = data[i];
            if (xmin > i || i > xmax) {
                continue;
            }
            if (ymax === null || item.high > ymax) {
                ymax = item.high;
            }
            if (ymin === null || item.low < ymin) {
                ymin = item.low;
            }
        }
        return {
            min: ymin,
            max: ymax
        };
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartFinanceModule, WjChartInteractionModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

