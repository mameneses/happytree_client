angular.module('HappyTree')
  .controller('ToolsCtrl', ['$scope', '$auth', function($scope, $auth) { 
    $scope.letterAssesmentDescShowing = false
    $scope.sightWordAssesmentDescShowing = false
    $scope.animalDescShowing = false

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  }]);