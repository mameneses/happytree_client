angular.module('HappyTree')
  .controller('MathAssesmentCtrl', ['$scope','$rootScope','$http', '$auth', 'StudentService', 'UserService','AssesmentService', '$filter', function($scope, $rootScope, $http, $auth, StudentService, UserService, AssesmentService, $filter) {
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    }

    $scope.promptShowing = false

    $scope.hidePrompt = function(){
      $scope.promptShowing = false
    }

    $scope.showPrompt = function () {
      $scope.promptShowing = true
    }

    if ($scope.isAuthenticated() == true) {
      $scope.currentUser = UserService.getCurrentUser()
      $scope.allStudents = StudentService.getAllStudents()
    }

    $scope.selectCursor = function() {
      console.log("cursor selected")
        $(".math-q-container").hover( function() { 
          console.log("hovered")
          if ($scope.sectionNumber == "5") {
            console.log("grab selected")
            $(".math-q-container").css("cursor", "grab")
          } else {
            console.log("brush selected")
            $(".math-q-container").css("cursor", "url('../img/brush_blue.png'), auto")
          }
        })
        console.log("cursor selected2")
    }

    $scope.setCurrentStudents = function() {
      $scope.currentStudents = []
      if ($scope.currentClass == "All Students") {
        $scope.currentStudents = $scope.allStudents
      } else {
        for (var i=0; i < $scope.allStudents.length; i++) {
          if ($scope.allStudents[i].className == $scope.currentClass){
            $scope.currentStudents.push($scope.allStudents[i])
          }
        }
      }
    }

    $scope.selectedStudent = {}  
    $scope.startShowing = true
    $scope.currentColor = ""
    $scope.sectionNumber = ""

    $scope.start = function () {
      $scope.startShowing = false
      $scope.sectionNumber = "1"
      $scope.selectCursor()
    }

    $scope.next = function() {
      var num = parseInt($scope.sectionNumber)
      var nextSection = num + 1
      $scope.sectionNumber = nextSection.toString()
      console.log(nextSection)
    }

    $scope.colorSelect = function (color) {
      $scope.currentColor = color
      $(".math-q-container").css("cursor", "url('../img/brush_" + color + ".png'), auto")
    }

    $scope.paintShape = function (shape) {
      if (shape == 'triangle-eq' || shape == 'triangle-rt') {
        $("#" + shape + $scope.sectionNumber).css("border-bottom", "100px solid " + $scope.currentColor)
      } else if (shape == "hexagon"){
        $("#" + shape + $scope.sectionNumber).css("background", $scope.currentColor)
        $("#" + shape + $scope.sectionNumber).css("border-bottom", "25px solid " + $scope.currentColor)
        $("#" + shape + $scope.sectionNumber).css("border-top", "25px solid " + $scope.currentColor)
      } else {
        $("#" + shape + $scope.sectionNumber).css("background", $scope.currentColor)
      }
    }
  
  }]);