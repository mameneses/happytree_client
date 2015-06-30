angular.module('HappyTree')
  .controller('HomeCtrl', ['$scope', '$rootScope', '$window', '$auth', '$filter','AssesmentService','$location', function($scope, $rootScope, $window, $auth, $filter, AssesmentService, $location) { 

    $scope.signUp = function(){
      $location.path("/signup")
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.goToStudents = function(){
      $location.path("/students")
    }

    $scope.goToTools = function(){
      $location.path("/tools")
    }

    $scope.goToTracker = function(){
      $location.path("/tracker")
    }

    $scope.setHeight = function() {
      var windowHeight = ""
      if ($window.innerHeight > 500 ) {
      var windowInt = $window.innerHeight
        windowHeight = windowInt.toString() + "px"
      } else {
        windowHeight = "600px"
      }
      $scope.windowHeight = {"height":windowHeight }
    }

    $scope.showHowPanel = function(panelName) {
      var panel = "#" + panelName
      var showing = $(panel).css('display')
      if(showing == 'none') {
        $(panel).slideDown();
      } else {
        $(panel).slideUp();
      }
    }

    $scope.setFeatureBtnHeight = function() {
      if ($window.innerHeight < 600) {
        var margin = 50
        var featMargin = margin.toString() + "px"

        $scope.featureBtnMargin = {"margin-top": featMargin}
      } else {
        var margin = $window.innerHeight - 450
        var featMargin = margin.toString() + "px"

        $scope.featureBtnMargin = {"margin-top": featMargin}
      }
    }

    $scope.setHeight()
    $scope.setFeatureBtnHeight()

  }] );