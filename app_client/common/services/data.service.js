(function () {

    angular
        .module('meanApp')
        .service('meanData', meanData);

    meanData.$inject = ['$http', 'authentication'];

    function meanData($http, authentication) {

        var getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var uploadFileToUrl = function (file, uploadUrl) {
            return $http.post('/api/upload');
        };

        return {
            getProfile: getProfile,
            uploadFilToUrl: uploadFileToUrl
        };
    }

})();
