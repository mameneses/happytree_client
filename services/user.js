angular.module('HappyTree')
  .factory('UserService', ['$http', '$window', '$auth', '$rootScope', function($http, $window, $auth, $rootScope) { 
    var apiAddress = "https://happytree-server.herokuapp.com/api/"

    return {

      getCurrentUser: function(){
        return JSON.parse($window.localStorage.currentUser)
      },

      updateUser: function(user){
        $http.put(apiAddress + "users/" + user._id, user).
          success(function(data, status, headers, config) {
            $window.localStorage.currentUser = JSON.stringify(data);
            $rootScope.$broadcast('userUpdated')
          }).
          error(function(data, status, headers, config) {

          })
      },

      deleteUser: function(user){
        $http.delete(apiAddress + "users/" + user._id).
          success(function(data, status, headers, config) {
            delete $window.localStorage.currentUser;
            $rootScope.$broadcast('userDeleted')
          }).
          error(function(data, status, headers, config) {

          })
      }
    }

  }]);