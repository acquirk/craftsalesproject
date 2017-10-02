(function () {

        angular
            .module('meanApp')
            .controller('dashboardCtrl', dashboardCtrl);

        dashboardCtrl.$inject = ['$location', 'meanData'];

        function dashboardCtrl($location, meanData, ngfusioncharts) {
            var vm = this;
            //Initialize Arrays
            vm.customers = [];
            vm.names = [];
            vm.sales = [];
            vm.product = [];
            vm.prodSales = {};
            vm.prodSalesAr = [];
            vm.barData = [];
            vm.lineData = [][];

            vm.caption = "Total Sales";

            //Will need this for sorting
            function compareNumbers(a, b) {
                return b[1] - a[1];
            }

            //Grab data from database
            meanData.accountsGrab()
                .success(function (data) {
                        vm.customers = data;
                        var k = 0;
                        var l = 0;
                        var vodkaCount = 0;
                        for (var i = 0; i < vm.customers.length; i++) {
                            vm.names[i] = vm.customers[i].name;
                            vm.lineData[vm.customers[i].sales[j].date.substr(0, 10)] += [vm.customers[i].sales[j].productName, vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6)];

                            l++;
                            vm.product[j] = vm.customers[i].sales[j].productName;


                            if (vm.product[j] in vm.prodSales) {
                                vm.prodSales[vm.product[j]] = vm.prodSales[vm.product[j]] + vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6);
                            } else {
                                vm.prodSales[vm.product[j]] = vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6);
                            };




                            //count the total number of bottles sold for each account
                            var totalCount = vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6);
                            if (vm.sales[k]) {
                                vm.sales[k] = [vm.customers[i].name, vm.sales[k][1] + totalCount];
                            } else {
                                vm.sales[k] = [vm.customers[i].name, totalCount];
                            }
                        }
                        k++;
                    }

                    //create an array version of vm.prodSales
                    for (var product in vm.prodSales) {
                        vm.prodSalesAr.push([product, vm.prodSales[product]]);
                    }
                    for (var product in vm.prodSales) {
                        vm.barData.push({
                            label: product,
                            value: vm.prodSales[product]
                        });
                    }

                    vm.sales = vm.sales.sort(compareNumbers); vm.prodSalesAr = vm.prodSalesAr.sort(compareNumbers);

                    //Create Line Chart
                    FusionCharts.ready(function () {
                        var salesChart = new FusionCharts({
                                type: 'msline',
                                renderAt: 'chart-container1',
                                width: '600',
                                height: '400',
                                dataFormat: 'json',
                                dataSource: {
                                    "chart": {
                                        "caption": "Worldwide Smartphone Sales to End Users from 2011 to 2015",
                                        "subcaption": "By Top 3 Vendors",
                                        "linethickness": "2",
                                        "numberPrefix": "$",
                                        "showvalues": "0",
                                        "formatnumberscale": "1",
                                        "labeldisplay": "ROTATE",
                                        "slantlabels": "1",
                                        "divLineAlpha": "40",
                                        "anchoralpha": "0",
                                        "animation": "1",
                                        "legendborderalpha": "20",
                                        "drawCrossLine": "1",
                                        "crossLineColor": "#0d0d0d",
                                        "crossLineAlpha": "100",
                                        "tooltipGrayOutColor": "#80bfff",
                                        "theme": "zune"
                                    },
                                    "categories": [{
                                        "category": [{
                                            "label": "Q1'12"
          }, {
                                            "label": "Q2'12"
          }, {
                                            "label": "Q3'12"
          }, {
                                            "label": "Q4'12"
          }, {
                                            "label": "Q1'13"
          }, {
                                            "label": "Q2'13"
          }, {
                                            "label": "Q3'13"
          }, {
                                            "label": "Q4'13"
          }, {
                                            "label": "Q1'14"
          }, {
                                            "label": "Q2'14"
          }, {
                                            "label": "Q3'14"
          }, {
                                            "label": "Q4'14"
          }, {
                                            "label": "Q1'15"
          }, {
                                            "label": "Q2'15"
          }, {
                                            "label": "Q3'15"
          }, {
                                            "label": "Q4'15"
          }, {
                                            "label": "Q1'16"
          }, {
                                            "label": "Q2'16"
          }, {
                                            "label": "Q3'16"
          }, {
                                            "label": "Q4'16"
          }]
        }],
                                    "dataset": [{
                                        "seriesname": "Samsung",
                                        "data": [{
                                            "value": "716000"
          }, {
                                            "value": "771700"
          }, {
                                            "value": "687800"
          }, {
                                            "value": "698300"
          }, {
                                            "value": "826100"
          }, {
                                            "value": "938300"
          }, {
                                            "value": "892800"
          }, {
                                            "value": "904300"
          }, {
                                            "value": "979600"
          }, {
                                            "value": "1069600"
          }, {
                                            "value": "1006600"
          }, {
                                            "value": "1075300"
          }, {
                                            "value": "1170500"
          }, {
                                            "value": "1192100"
          }, {
                                            "value": "1100500"
          }, {
                                            "value": "974200"
          }, {
                                            "value": "936200"
          }, {
                                            "value": "979900"
          }, {
                                            "value": "887400"
          }, {
                                            "value": "1020600"
          }]
        }, {
                                        "seriesname": "Nokia",
                                        "data": [{
                                            "value": "1174600"
          }, {
                                            "value": "1222800"
          }, {
                                            "value": "1075600"
          }, {
                                            "value": "978700"
          }, {
                                            "value": "1053500"
          }, {
                                            "value": "1117000"
          }, {
                                            "value": "831600"
          }, {
                                            "value": "834200"
          }, {
                                            "value": "823000"
          }, {
                                            "value": "850500"
          }, {
                                            "value": "632200"
          }, {
                                            "value": "609500"
          }, {
                                            "value": "630600"
          }, {
                                            "value": "635800"
          }, {
                                            "value": "496900"
          }, {
                                            "value": "438100"
          }, {
                                            "value": "431300"
          }, {
                                            "value": "330000"
          }, {
                                            "value": "276900"
          }, {
                                            "value": "302900"
          }]
        }, {
                                        "seriesname": "Apple",
                                        "data": [{
                                            "value": "134800"
          }, {
                                            "value": "160100"
          }, {
                                            "value": "168800"
          }, {
                                            "value": "196300"
          }, {
                                            "value": "173000"
          }, {
                                            "value": "354600"
          }, {
                                            "value": "331200"
          }, {
                                            "value": "289400"
          }, {
                                            "value": "246200"
          }, {
                                            "value": "434600"
          }, {
                                            "value": "383300"
          }, {
                                            "value": "319000"
          }, {
                                            "value": "303300"
          }, {
                                            "value": "502200"
          }, {
                                            "value": "430600"
          }, {
                                            "value": "353500"
          }, {
                                            "value": "381900"
          }, {
                                            "value": "601800"
          }, {
                                            "value": "480900"
          }, {
                                            "value": "460600"
          }]
        }]
                                }
                            })
                            .render();
                    });

                    //Create Bar Chart
                    FusionCharts.ready(function () {
                        // Create a new instance of FusionCharts for rendering inside an HTML
                        // `<div>` element with id `my-chart-container`.
                        var myChart = new FusionCharts({
                            type: 'bar2d',
                            renderAt: 'chart-container2',
                            width: '600',
                            height: '400',
                            dataFormat: 'json',
                            dataSource: {
                                chart: {
                                    "caption": "Total Sales",
                                    "subCaption": "By Spirit",
                                    "yAxisName": "Sales (Per bottle)",
                                    "paletteColors": "#0075c2",
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "showCanvasBorder": "0",
                                    "usePlotGradientColor": "0",
                                    "plotBorderAlpha": "10",
                                    "placeValuesInside": "1",
                                    "valueFontColor": "#ffffff",
                                    "showAxisLines": "1",
                                    "axisLineAlpha": "25",
                                    "divLineAlpha": "10",
                                    "alignCaptionWithCanvas": "0",
                                    "showAlternateVGridColor": "0",
                                    "captionFontSize": "14",
                                    "subcaptionFontSize": "14",
                                    "subcaptionFontBold": "0",
                                    "toolTipColor": "#ffffff",
                                    "toolTipBorderThickness": "0",
                                    "toolTipBgColor": "#000000",
                                    "toolTipBgAlpha": "80",
                                    "toolTipBorderRadius": "2",
                                    "toolTipPadding": "5"
                                },
                                data: vm.barData
                            }
                        });

                        // Render the chart.
                        myChart.render();
                    }); console.log(vm.lineData);
                }) //Else error
        .error(function (e) {
            console.log(e);
        });
    }

})();
