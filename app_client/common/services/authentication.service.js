(function () {

    angular
        .module('meanApp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];

    function authentication($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                console.log(payload);
                console.log(payload.exp);
                console.log(payload.email);
                console.log(payload.admin);
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var isAdminLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                if (payload.admin == 2) {
                    return payload.exp > Date.now() / 1000;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        };

        var hasPermission = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                if (payload.admin >= 1) {
                    return payload.exp > Date.now() / 1000;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email: payload.email,
                    admin: payload.admin
                };
            }
        };

        register = function (user) {
            return $http.post('/api/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
            });
        };

        logout = function () {
            $window.localStorage.removeItem('mean-token');
        };

        usersGrab = function () {
            return $http.post('/api/users');
        };

        permissions = function (user) {
            return $http.post('api/permissions', user);
        }

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            isAdminLoggedIn: isAdminLoggedIn,
            hasPermission: hasPermission,
            register: register,
            login: login,
            logout: logout,
            usersGrab: usersGrab,
            permissions: permissions
        };
    }


})();
