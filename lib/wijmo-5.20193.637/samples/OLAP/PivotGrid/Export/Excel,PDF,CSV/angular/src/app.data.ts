import { Injectable } from '@angular/core';
import * as wjCore from '@grapecity/wijmo';
//
export interface DataItem {
    date: Date;
    buyer: string;
    type: string;
    amount: number;
}
//
function randomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}
//
@Injectable()
export class DataService {
    getData(cnt: number): DataItem[] {
        let today = new Date(),
            buyers = ['Mom', 'Dad', 'Kelly', 'Sheldon'],
            types = ['Food', 'Clothes', 'Fuel', 'Books', 'Sports', 'Music'],
            data = [];
        //
        for (let i = 0; i < cnt; i++) {
            data.push({
                date: wjCore.DateTime.addDays(today, -Math.random() * 365 * 3),
                buyer: randomItem(buyers),
                type: randomItem(types),
                amount: 20 + Math.random() * 1000
            });
        }
        //
        return data;
    }
}