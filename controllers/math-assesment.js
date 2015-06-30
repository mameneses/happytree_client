angular.module('HappyTree')
  .controller('MathAssesmentCtrl', ['$scope','$rootScope','$http', '$auth', 'StudentService', 'UserService','AssesmentService', '$filter', function($scope, $rootScope, $http, $auth, StudentService, UserService, AssesmentService, $filter) {
    
    $scope.currentColor = ""

    $scope.sectionNumber = "2"

    $scope.colorSelect = function (color) {
      $scope.currentColor = color
      $(".math-q-container").css("cursor", "url('../img/brush_" + color + ".png'), auto")
    }

    $scope.paintShape = function (shape) {
      if (shape == 'triangle-eq' || shape == 'triangle-rt') {
        $("#" + shape + $scope.sectionNumber).css("border-bottom", "100px solid " + $scope.currentColor)
      } else {
        $("#" + shape + $scope.sectionNumber).css("background", $scope.currentColor)
      }
    }
  
  }]);