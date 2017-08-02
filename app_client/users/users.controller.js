(function () {

    angular
        .module('meanApp')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ['$location', 'authentication', 'meanData'];

    function usersCtrl($location, authentication, meanData) {
        var vm = this;

        vm.users = [];

        vm.usersGrab = function () {
            authentication.usersGrab()
                .success(function (data) {
                    vm.users = data;
                    console.log(data);
                    return data;
                })
                .error(function (e) {
                    console.log(e);
                });
        };
        vm.usersGrab();

        vm.permissions = function (id, type) {
            vm.credentials = {
                id: id,
                admin: type
            };
            authentication.permissions(vm.credentials)
                .success(function (data) {
                    console.log(data);
                    //vm.users = [];
                    vm.usersGrab();
                })
                .error(function (e) {
                    console.log(e);
                });
        };

    }

})();
