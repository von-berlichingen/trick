(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['api'];

  function HomeController(api) {
    var vm = this;

    api.getHome()
      .then(function(data) {
        vm.home = data;
      });
  }
}());
