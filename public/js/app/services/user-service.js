(function() {
  'use strict';
  angular
    .module('app')
    .factory('api', apiFactory);


  apiFactory.$inject = ['$http'];

  function apiFactory($http) {
    return {
      getProfile: getProfile,
      getHome: getHome
    };

    function getProfile() {
      return $http.get('/users/profile')
        .then(function(response) {
          return response.data;
        });
    }

    function getHome() {
      return $http.get('/users/account')
        .then(function(response) {
          return response.data;
        });
    }
  }
}());
