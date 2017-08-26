(function () {

    angular.module('meanApp', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/test/test.html',
                controller: 'testCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm',
                css: '/public/stylesheets/main.css'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm',
                css: ['/public/stylesheets/main.css', '/public/stylesheets/login.css']
            })
            .when('/users', {
                templateUrl: '/users/users.view.html',
                controller: 'usersCtrl',
                controllerAs: 'vm',
                css: ['/public/stylesheets/main.css', '/public/stylesheets/users.css']
            })
            .when('/settings', {
                templateUrl: '/settings/settings.html',
                controller: 'settingsCtrl',
                controllerAs: 'vm',
                css: '/public/stylesheets/main.css'
            })
            .when('/reports', {
                templateUrl: '/reports/reports.html',
                controller: 'reportsCtrl',
                controllerAs: 'vm',
                css: ['/public/stylesheets/main.css', '/public/stylesheets/reports.css']
            })
            .when('/dashboard', {
                templateUrl: '/dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'vm',
                css: ['/public/stylesheets/main.css', '/public/stylesheets/dashboard.css']
            })
            .when('/splash', {
                templateUrl: '/splash/splash.view.html',
                controllerAs: 'vm',
                css: '/public/stylesheets/main.css'
            })
            .otherwise({
                redirectTo: '/'
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if ($location.path() === '/users' && !authentication.isAdminLoggedIn()) {
                $location.path('/splash');
            }
            if ($location.path() === '/settings' && !authentication.isLoggedIn()) {
                $location.path('/splash');
            }
            if ($location.path() === '/reports' && !authentication.isAdminLoggedIn()) {
                $location.path('/splash');
            }
            if ($location.path() === '/dashboard' && !authentication.hasPermission()) {
                $location.path('/splash');
            }
        });
    };

    angular
        .module('meanApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();
