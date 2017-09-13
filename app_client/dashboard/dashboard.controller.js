(function () {

    angular
        .module('meanApp')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$location', 'meanData'];

    function dashboardCtrl($location, meanData) {
        var vm = this;
        
        vm.customers = [];
        vm.names = [];
        vm.sales = [];
        vm.product = [];
        vm.prodSales = {};
        vm.prodSalesAr = [];
        vm.barData = [];
        
    

    // Line Graph
    function lineGraph() {
        function compareNumbers(a, b) {
            return b[1] - a[1];
        }
        
        vm.sales = vm.sales.sort(compareNumbers);
        vm.prodSalesAr = vm.prodSalesAr.sort(compareNumbers);
        
        
        var data = vm.customers;

         var data = [
            {key: "Vodka", value: 60, date: "2014/01/01" },
            {key: "Vodka", value: 58, date: "2014/01/02" },
            {key: "Vodka", value: 59, date: "2014/01/03" },
            {key: "Vodka", value: 56, date: "2014/01/04" },
            {key: "Vodka", value: 57, date: "2014/01/05" },
            {key: "Vodka", value: 55, date: "2014/01/06" },
            {key: "Vodka", value: 56, date: "2014/01/07" },
            {key: "Vodka", value: 52, date: "2014/01/08" },
            {key: "Vodka", value: 54, date: "2014/01/09" },
            {key: "Vodka", value: 57, date: "2014/01/10" },
            {key: "Vodka", value: 56, date: "2014/01/11" },
            {key: "Vodka", value: 59, date: "2014/01/12" },
            {key: "Vodka", value: 56, date: "2014/01/13" },
            {key: "Vodka", value: 52, date: "2014/01/14" },
            {key: "Vodka", value: 48, date: "2014/01/15" },
            {key: "Vodka", value: 47, date: "2014/01/16" },
            {key: "Vodka", value: 48, date: "2014/01/17" },
            {key: "Vodka", value: 45, date: "2014/01/18" },
            {key: "Vodka", value: 43, date: "2014/01/19" },
            {key: "Vodka", value: 41, date: "2014/01/20" },
            {key: "Vodka", value: 37, date: "2014/01/21" },
            {key: "Vodka", value: 36, date: "2014/01/22" },
            {key: "Vodka", value: 39, date: "2014/01/23" },
            {key: "Vodka", value: 41, date: "2014/01/24" },
            {key: "Vodka", value: 42, date: "2014/01/25" },
            {key: "Vodka", value: 40, date: "2014/01/26" },
            {key: "Vodka", value: 43, date: "2014/01/27" },
            {key: "Vodka", value: 41, date: "2014/01/28" },
            {key: "Vodka", value: 39, date: "2014/01/29" },
            {key: "Vodka", value: 40, date: "2014/01/30" },
            {key: "Vodka", value: 39, date: "2014/01/31" }
        ];
        
        
        
        var w = 1400;
        var h = 570;
        var margin = {
            top: 58,
            bottom: 100,
            left: 80,
            right: 40
        };
        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

        var svg = d3.select("#line").append("svg")
                    .attr("id", "chart")
                    .attr("width", w)
                    .attr("height", h);
        var chart = svg.append("g")
                    .classed("display", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var dateParser = d3.time.format("%Y/%m/%d").parse;
        var x = d3.time.scale()
                .domain(d3.extent(data, function(d){
                    var date = dateParser(d.date);
                    return date;
                }))
                .range([0,width]);
        var y = d3.scale.linear()
                .domain([0, d3.max(data, function(d){
                    return d.value;
                })])
                .range([height,0]);
        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(d3.time.days, 7)
                    .tickFormat(d3.time.format("%m/%d"));
        var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(5);
        var line = d3.svg.line()
                    .x(function(d){
                        var date = dateParser(d.date);
                        return x(date);
                    })
                    .y(function(d){
                        return y(d.value);
                    });
        var area = d3.svg.area()
                    .x(function(d){
                        var date = dateParser(d.date);
                        return x(date);
                    })
                    .y0(height)
                    .y1(function(d){
                        return y(d.value);
                    })
        function plot(params){
            this.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(0," + height + ")")
                .call(params.axis.x);
            this.append("g")
                .classed("y axis", true)
                .attr("transform", "translate(0,0)")
                .call(params.axis.y);
            //enter()
            this.selectAll(".area")
                .data([params.data])
                .enter()
                    .append("path")
                    .classed("area", true);
            this.selectAll(".trendline")
                .data([params.data])
                .enter()
                    .append("path")
                    .classed("trendline", true);
            this.selectAll(".point")
                .data(params.data)
                .enter()
                    .append("circle")
                    .classed("point", true)
                    .attr("r", 2);
            //update
            this.selectAll(".area")
                .attr("d", function(d){
                    return area(d);
                })
            this.selectAll(".trendline")
                .attr("d", function(d){
                    return line(d);
                })
            this.selectAll(".point")
                .attr("cx", function(d){
                    var date = dateParser(d.date);
                    return x(date);
                })
                .attr("cy", function(d){
                    return y(d.value);
                })
            //exit()
            this.selectAll(".area")
                .data([params.data])
                .exit()
                .remove();
            this.selectAll(".trendline")
                .data([params.data])
                .exit()
                .remove();
            this.selectAll(".point")
                .data(params.data)
                .exit()
                .remove();
        }
        plot.call(chart, {
            data: data,
            axis: {
                x: xAxis,
                y: yAxis
            }
        });
        
    }
    
    //Bar Graph
    function barGraph() {
        var data = vm.barData;
        console.log(data);

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format("20");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Bottle Sales:</strong> <span style='color:red'>" + d.value + "</span><br/><strong>" + d.label + "</strong>";
  });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// The following code was contained in the callback function.
x.domain(data.map(function(d) { return d.label; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.label); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

function type(d) {
  d.value = +d.value;
  return d;
}
    }
        
    //Progress Graph
    function progressGraph() {
        var wrapper = document.getElementById('progress');
        var start = 0;
        var end = parseFloat(wrapper.dataset.percentage);

        var colours = {
          fill: '#' + wrapper.dataset.fillColour,
          track: '#' + wrapper.dataset.trackColour,
          text: '#' + wrapper.dataset.textColour,
          stroke: '#' + wrapper.dataset.strokeColour,
        }

        var radius = 150;
        var border = wrapper.dataset.trackWidth;
        var strokeSpacing = wrapper.dataset.strokeSpacing;
        var endAngle = Math.PI * 2;
        var formatText = d3.format('.0%');
        var boxSize = radius * 2;
        var count = end;
        var progress = start;
        var step = end < start ? -0.01 : 0.01;

        //Define the circle
        var circle = d3.svg.arc()
          .startAngle(0)
          .innerRadius(radius)
          .outerRadius(radius - border);

        //setup SVG wrapper
        var svg = d3.select(wrapper)
          .append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);

        // ADD Group container
        var g = svg.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

        //Setup track
        var track = g.append('g').attr('class', 'radial-progress');
        track.append('path')
          .attr('class', 'radial-progress__background')
          .attr('fill', colours.track)
          .attr('stroke', colours.stroke)
          .attr('stroke-width', strokeSpacing + 'px')
          .attr('d', circle.endAngle(endAngle));

        //Add colour fill
        var value = track.append('path')
          .attr('class', 'radial-progress__value')
          .attr('fill', colours.fill)
          .attr('stroke', colours.stroke)
          .attr('stroke-width', strokeSpacing + 'px');

        //Add text value
        var numberText = track.append('text')
          .attr('class', 'radial-progress__text')
          .attr('fill', colours.text)
          .attr('text-anchor', 'middle')
          .attr('dy', '.5rem');

        function update(progress) {
          //update position of endAngle
          value.attr('d', circle.endAngle(endAngle * progress));
          //update text value
          numberText.text(formatText(progress));
        }

        (function iterate() {
          //call update to begin animation
          update(progress);
          if (count > 0) {
            //reduce count till it reaches 0
            count--;
            //increase progress
            progress += step;
            //Control the speed of the fill
            setTimeout(iterate, 6);
          }
        })();
    }
    
 
    meanData.accountsGrab()
      .success(function(data) {
        vm.customers = data;
        var k = 0;
        var vodkaCount = 0;
        for (var i = 0; i < vm.customers.length; i++) {
          vm.names[i] = vm.customers[i].name;
          for (var j = 0; j < vm.customers[i].sales.length; j++) {

            
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
        console.log("SALES");
        console.log(vm.sales);
        
        //create an array version of vm.prodSales
        for (var product in vm.prodSales) {
            vm.prodSalesAr.push([product, vm.prodSales[product]]);
        }
        for (var product in vm.prodSales) {
            vm.barData.push({"label":product, "value":vm.prodSales[product]})
        }
        console.log(vm.prodSales);
        console.log(vm.prodSalesAr);
        console.log(vm.barData);
        console.log(vm.customers);

        console.log("create d3 graphs");
        lineGraph();
        console.log("line Graph");
        barGraph();
        console.log("bar Graph");
        progressGraph();
        console.log("prog Graph");
      })
      .error(function (e) {
        console.log(e);
      });
}
        
})();
