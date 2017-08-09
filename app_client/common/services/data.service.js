(function () {

    angular
        .module('meanApp')
        .service('meanData', meanData);

    meanData.$inject = ['$http', '$window'];

    function meanData($http, authentication) {

        var getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        register = function (customer) {
            return $http.post('/api/reports', customer).success(function (data) {});
        };

        addSale = function (customer) {
            return $http.post('/api/addSale', customer).success(function (data) {});
        };

        accountsGrab = function (customer) {
            return $http.post('/api/accountsGrab', customer).success(function (data) {});
        };

        salesGrab = function (customer) {
            return $http.post('/api/salesGrab', customer).success(function (data) {});
        };

        upload = function (file, uploadUrl) {
            return $http.post('/api/upload', file, uploadUrl).success(function (data) {});
        };

        return {
            getProfile: getProfile,
            register: register,
            addSale: addSale,
            accountsGrab: accountsGrab,
            salesGrab: salesGrab,
            upload: upload
        };
    }

})();
