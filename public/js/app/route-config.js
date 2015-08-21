(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: '/js/app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/home', {
        templateUrl: '/js/app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
  }
}());
