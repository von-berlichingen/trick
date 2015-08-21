(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['api'];

  function ProfileController(api) {
    var vm = this;

    api.getProfile()
      .then(function(data) {
        vm.profile = data;
      });
  }
}());
