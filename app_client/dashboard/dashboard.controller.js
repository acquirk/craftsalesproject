(function () {

    angular
        .module('meanApp')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$location', 'meanData'];

    function dashboardCtrl($location, meanData, ngfusioncharts) {
        var vm = this;
        
        vm.customers = [];
        vm.names = [];
        vm.sales = [];
        vm.product = [];
        vm.prodSales = {};
        vm.prodSalesAr = [];
        vm.barData = [];
        vm.lineData = [];
        
        vm.caption = "Total Sales";

 
    meanData.accountsGrab()
      .success(function(data) {
        vm.customers = data;
        var k = 0;
        var l = 0;
        var vodkaCount = 0;
        for (var i = 0; i < vm.customers.length; i++) {
          vm.names[i] = vm.customers[i].name;
          for (var j = 0; j < vm.customers[i].sales.length; j++) {

            vm.lineData[l] = {key: vm.customers[i].sales[j].productName, value: vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount*6), date: vm.customers[i].sales[j].date.substr(0,9) };
            l++;
            vm.product[j] = vm.customers[i].sales[j].productName;
            
            
            if (vm.product[j] in vm.prodSales) {
                vm.prodSales[vm.product[j]] = vm.prodSales[vm.product[j]] + vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount*6);
            }
            else {
                vm.prodSales[vm.product[j]] = vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount*6);
            }  ;
            
              
              
              
            //count the total number of bottles sold for each account
            var totalCount = vm.customers[i].sales[j].bottleCount + (vm.customers[i].sales[j].caseCount*6);
            if (vm.sales[k]) {
              vm.sales[k] = [vm.customers[i].name, vm.sales[k][1] + totalCount];
            }
            else {
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
            vm.barData.push({label : product, value : vm.prodSales[product]});
        }
        console.log("barData");
        console.log(vm.barData);
        FusionCharts.ready(function () {
    // Create a new instance of FusionCharts for rendering inside an HTML
    // `<div>` element with id `my-chart-container`.
    var myChart = new FusionCharts({
        type: 'column2d',
        renderAt: 'chart-container',

        dataFormat: 'json',
        dataSource: {
            chart: {
        "caption": "Total Sales",
        "subCaption": "By Spirit",
        "yAxisName": "Sales (In USD)",
        "numberPrefix": "$",
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
            data:vm.barData
        }
    });

    // Render the chart.
    myChart.render();
});

      })
      .error(function (e) {
        console.log(e);
      });
      
}
        
})();
