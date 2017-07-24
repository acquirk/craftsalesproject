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


    }

})();
