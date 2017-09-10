(function () {

    angular
        .module('meanApp')
        .controller('reportsCtrl', reportsCtrl);

    reportsCtrl.$inject = ['$location', 'meanData'];

    function reportsCtrl($location, meanData, ngCsvImport) {
        var vm = this;

        vm.converting = false;
        vm.load = false;
        vm.customers = [];
        vm.names = [];
        vm.sales = [];
        vm.myDate;
        vm.date = {
          month: "",
          day: "",
          year: ""
        };
        vm.months=[1,2,3,4,5,6,7,8,9,10,11,12];
        vm.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        vm.years=[];
        vm.currentYear = new Date().getFullYear();
        for (i = 99; i >= 0; i--) {
          y = vm.currentYear - i;
          vm.years[i] = y;
        }
        meanData.salesGrab()
            .success(function (data) {
                vm.customers = data;
                var k = 0;
                for (var i = 0; i < vm.customers.length; i++) {
                    vm.names[i] = vm.customers[i].name;
                    for (var j = 0; j < vm.customers[i].sales.length; j++) {
                        vm.sales[k] = [vm.customers[i].sales[j], vm.customers[i].name];
                        k++;
                    }
                }
                console.log(data);
                console.log(vm.names);
            })
            .error(function (e) {
                console.log(e);
            });

        vm.uploadFile = function () {
            var file = vm.myFile;
            console.log('file is ' + file);
            console.log(file);
            var uploadUrl = "/fileUpload";
            meanData.upload(file, uploadUrl);
        };


        vm.credentials = {
            email: "",
            name: "",
            city: "",
            street: "",
            state: "",
            zip: "",
            phone: "",
            customerType: "",
            saleType: "",
            accountManager: "",
            productName: "",
            caseCount: "",
            bottleCount: "",
            reportID: "",
            date: "",
            json: ""
        };
        
        vm.switch = function (x) {
          if (x) { x = false }
          else { x = true }
        };

        vm.onRegister = function () {
            console.log('Submitting registration');
            meanData
                .register(vm.credentials)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    $location.path('dashboard');
                });
        };

        vm.onAdd = function () {
            console.log('Submitting additional sales');
            meanData
                .addSale(vm.credentials)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    $location.path('dashboard');
                });
        };

        vm.CSVToArray = function (strData, strDelimiter) {
            // Check to see if the delimiter is defined. If not,
            // then default to comma.
            strDelimiter = (strDelimiter || ",");
            // Create a regular expression to parse the CSV values.
            var objPattern = new RegExp((
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
            // Create an array to hold our data. Give the array
            // a default empty first row.
            var arrData = [[]];
            // Create an array to hold our individual pattern
            // matching groups.
            var arrMatches = null;
            // Keep looping over the regular expression matches
            // until we can no longer find a match.
            while (arrMatches = objPattern.exec(strData)) {
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[1];
                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push([]);
                }
                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[2]) {
                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[2].replace(
                        new RegExp("\"\"", "g"), "\"");
                } else {
                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[3];
                }
                // Now that we have our value string, let's add
                // it to the data array.
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            // Return the parsed data.
            return (arrData);
        };

        vm.CSV2JSON = function (csv) {
            var array = vm.CSVToArray(csv);
            var objArray = [];
            for (var i = 1; i < array.length; i++) {
                objArray[i - 1] = {};
                for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                    var key = array[0][k];
                    objArray[i - 1][key] = array[i][k];
                }
            }

            var json = JSON.stringify(objArray);
            var str = json.replace(/},/g, "},\r\n");

            return str;
        };

        vm.convert1 = function () {
            var csv = vm.csv;
            vm.json = vm.CSV2JSON(csv);
            vm.options = eval(vm.json);
            vm.example = JSON.stringify(vm.options[0]);
            console.log("options: " + JSON.stringify(vm.options[0]));
            vm.converting = true;
            vm.credentials.reportID = Date.now();
        };

        vm.convert2 = function (x) {
            var json = eval(vm.options);
            vm.load = true;
            vm.credentials.json = {
                json: json[x]
            };
            console.log(vm.credentials);
            meanData.upload(vm.credentials).success(function (data) {
                vm.convert2(x + 1);
            }).error(function (e) {
                vm.load = false;
                console.log(e);
            });
            console.log(vm.credentials.json);
        };

        vm.test = function () {
            console.log(vm.credentials);
        };


        var app = angular.module('angularjs-starter', []);

        app.controller('MainCtrl', function ($scope) {

            $scope.choices = [{
                id: 'choice1'
            }, {
                id: 'choice2'
            }];

            $scope.addNewChoice = function () {
                var newItemNo = $scope.choices.length + 1;
                $scope.choices.push({
                    'id': 'choice' + newItemNo
                });
            };

            $scope.removeChoice = function () {
                var lastItem = $scope.choices.length - 1;
                $scope.choices.splice(lastItem);
            };

        });



    }

})();
