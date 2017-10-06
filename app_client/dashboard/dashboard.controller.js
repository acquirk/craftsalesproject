(function () {

    angular
        .module('meanApp')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$location', 'meanData'];

    function dashboardCtrl($location, meanData, ngfusioncharts) {
        var vm = this;

        function compareNumbers(a, b) {
            return b[1] - a[1];
        }

        vm.customers = [];
        vm.names = [];
        vm.sales = [];
        vm.product = [];
        vm.prodSales = {};
        vm.prodSalesAr = [];
        vm.barLabels = [];
        vm.barData = [];
        vm.lineData = [];
        vm.lineData1 = [];
        vm.lineData2 = {};
        vm.lineLabels = [];



        meanData.accountsGrab()
            .success(function (data) {
                vm.customers = data;
                var k = 0;
                var l = 0;
                var vodkaCount = 0;
                for (var i = 0; i < vm.customers.length; i++) {
                    vm.names[i] = vm.customers[i].name;
                    for (var j = 0; j < vm.customers[i].sales.length; j++) {

                        vm.lineData1[l] = {
                            key: vm.customers[i].sales[j].productName,
                            value: vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6),
                            date: vm.customers[i].sales[j].date.substr(0, 7)
                        };
                        l++;
                        vm.product[j] = vm.customers[i].sales[j].productName;


                        if (vm.product[j] in vm.prodSales) {
                            vm.prodSales[vm.product[j]] = vm.prodSales[vm.product[j]] + vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6);
                        } else {
                            vm.prodSales[vm.product[j]] = vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount * 6);
                        }




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

                //create an array version of vm.prodSales, vm.barLabels, vm.barData
                for (var product in vm.prodSales) {
                    vm.prodSalesAr.push([product, vm.prodSales[product]]);
                    vm.barLabels.push(product);
                    vm.barData.push(vm.prodSales[product]);
                }
                var insert = 0;
                for (i = 0; i < vm.lineData1.length; i++) {
                    insert = vm.lineLabels.indexOf(vm.lineData1[i].date);
                    if (insert < 0) {
                        vm.lineLabels.push(vm.lineData1[i].date);
                    }
                }
                vm.lineLabels.sort();
                var dates = [];
                var keys = [];
                i = 0;
                while (i < vm.lineData1.length) {
                    if (-1 < (jQuery.inArray(vm.lineData1[i].key, keys))) {
                      console.log(vm.lineData1[i].date);
                      console.log(jQuery.inArray(vm.lineData1[i].date, vm.lineLabels));
                      console.log(dates);
                        vm.lineData2[vm.lineData1[i].key][jQuery.inArray(vm.lineData1[i].date, vm.lineLabels)] += vm.lineData1[i].value;
                    } else {
                        vm.lineData2[vm.lineData1[i].key] = Array.apply(null, Array(vm.lineLabels.length)).map(Number.prototype.valueOf, 0);
                        keys.push(vm.lineData1[i].key);
                        dates.push(vm.lineData1[i].date);
                        console.log(vm.lineData1[i].date);
                        console.log(dates);
                        //vm.lineData2[vm.lineData1.key][vm.lineLabels.indexOf(vm.lineData1.date)] = vm.lineData1.value;
                    }
                    i += 1;
                }
                /*
                    vm.lineData.push({
                        label: product,
                        backgroundColor: "rgba(Math.floor(Math.random()*220),Math.floor(Math.random()*220),Math.floor(Math.random()*220),Math.floor(Math.random()*220))})",
                        data: [],
                        fill: false,
                    })*/

                console.log("prodsales");
                console.log(vm.prodSales);

                console.log("lineData1");
                console.log(vm.lineData1);
                console.log("lineData2");
                console.log(vm.lineData2);
                console.log("lineLabels");
                console.log(vm.lineLabels);
                vm.sales = vm.sales.sort(compareNumbers);
                vm.prodSalesAr = vm.prodSalesAr.sort(compareNumbers);

                //Line Chart
                var ctx1 = document.getElementById('myChart1').getContext('2d');
                var myLineChart = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: vm.lineLabels,
                        datasets: [{
                            label: "first",
                            data: [1, 2, 3]
                        }]
                    },
                    options: {}
                });

                //Bar Chart
                var ctx2 = document.getElementById('myChart2').getContext('2d');
                var myBarChart = new Chart(ctx2, {
                    type: 'horizontalBar',
                    data: {
                        labels: vm.barLabels,
                        datasets: [{
                            label: "Sales by Spirit",
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: vm.barData,
        }]
                    },

                    options: {}
                });
            })
            .error(function (e) {
                console.log(e);
            });
    }

})();
