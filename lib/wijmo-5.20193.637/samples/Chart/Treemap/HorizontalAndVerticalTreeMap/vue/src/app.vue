<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-menu :header="'Type'" :value="type" :itemClicked="menuItemClicked">
                <wj-menu-item :value="'Squarified'">Squarified</wj-menu-item>
                <wj-menu-item :value="'Horizontal'">Horizontal</wj-menu-item>
                <wj-menu-item :value="'Vertical'">Vertical</wj-menu-item>
            </wj-menu>
            <wj-tree-map binding="sales" :bindingName="['category', 'subCategory']" :itemsSource="data" :type="type" labelContent="{name}" :palette="palette">
            </wj-tree-map>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart.hierarchical';
    import { getData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                type: 'Squarified'
            }
        },
        methods: {
            menuItemClicked: function(menu) {
                this.type = menu.selectedValue;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
