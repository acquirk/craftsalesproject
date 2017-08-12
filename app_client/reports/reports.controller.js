(function () {

    angular
        .module('meanApp')
        .controller('reportsCtrl', reportsCtrl);

    reportsCtrl.$inject = ['$location', 'meanData'];

    function reportsCtrl($location, meanData) {
        var vm = this;
        
        vm.converting = false;

        vm.customers = [];
        vm.names = [];
        vm.sales = [];
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
            bottleCount: ""
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
        
        vm.CSVToArray = function(strData, strDelimiter) {
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

        vm.CSV2JSON = function(csv) {
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

  vm.convert1 = function() {
    var csv = vm.csv;
    var json = eval(vm.CSV2JSON(csv));
    vm.options = json[0];
    vm.converting = true;
};

vm.convert2 = function() {
    for (var i = 0; i < json.length; i++) {
      vm.credentials.json = {json: json[i]};
      console.log(vm.credentials);
      meanData.upload(vm.credentials).error(function (e) {
                console.log(e);
            });
    }
};


        var app = angular.module('angularjs-starter', []);

          app.controller('MainCtrl', function($scope) {

            $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];

            $scope.addNewChoice = function() {
              var newItemNo = $scope.choices.length+1;
              $scope.choices.push({'id':'choice'+newItemNo});
            };

            $scope.removeChoice = function() {
              var lastItem = $scope.choices.length-1;
              $scope.choices.splice(lastItem);
            };

          });

    }

})();
