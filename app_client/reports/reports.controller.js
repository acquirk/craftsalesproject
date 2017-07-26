(function () {

    angular
        .module('meanApp')
        .controller('reportsCtrl', reportsCtrl);

    reportsCtrl.$inject = ['$location', 'meanData'];

    function reportsCtrl($location, meanData) {
        var vm = this;

        vm.uploadFile = function () {
            var file = vm.myFile;
            console.log('file is ');
            console.dir(file);
            var uploadUrl = "/fileUpload";
            meanData.uploadFileToUrl(file, uploadUrl);
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


    }

})();
