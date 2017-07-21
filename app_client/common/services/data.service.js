(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    insertData = function(file) {
      return $http.post('/api/reports', file);
    };

    return {
      insertData : insertData
    };
  }

})();