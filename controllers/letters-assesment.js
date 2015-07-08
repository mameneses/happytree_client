angular.module('HappyTree')
  .controller('LettersAssesmentCtrl', ['$scope','$rootScope','$http', '$auth', 'StudentService', 'UserService','AssesmentService', '$filter', function($scope, $rootScope, $http, $auth, StudentService, UserService, AssesmentService, $filter) {
    var letters = [ 
                    { upper: "A", lower: "a", find_audio:"audio/a.m4a", sound_audio:"audio/a_sound.m4a", selected: true},
                    { upper: "B", lower: "b", find_audio:"audio/b.m4a", sound_audio:"audio/b_sound.m4a", selected: true},
                    { upper: "C", lower: "c", find_audio:"audio/c.m4a", sound_audio:"audio/c_sound.m4a", selected: true},
                    { upper: "D", lower: "d", find_audio:"audio/d.m4a", sound_audio:"audio/d_sound.m4a", selected: true},
                    { upper: "E", lower: "e", find_audio:"audio/e.m4a", sound_audio:"audio/e_sound.m4a", selected: true},
                    { upper: "F", lower: "f", find_audio:"audio/f.m4a", sound_audio:"audio/f_sound.m4a", selected: true},
                    { upper: "G", lower: "g", find_audio:"audio/g.m4a", sound_audio:"audio/g_sound.m4a", selected: true},
                    { upper: "H", lower: "h", find_audio:"audio/h.m4a", sound_audio:"audio/h_sound.m4a", selected: true},
                    { upper: "I", lower: "i", find_audio:"audio/i.m4a", sound_audio:"audio/i_sound.m4a", selected: true},
                    { upper: "J", lower: "j", find_audio:"audio/j.m4a", sound_audio:"audio/j_sound.m4a", selected: true},
                    { upper: "K", lower: "k", find_audio:"audio/k.m4a", sound_audio:"audio/k_sound.m4a", selected: true},
                    { upper: "L", lower: "l", find_audio:"audio/l.m4a", sound_audio:"audio/l_sound.m4a", selected: true},
                    { upper: "M", lower: "m", find_audio:"audio/m.m4a", sound_audio:"audio/m_sound.m4a", selected: true},
                    { upper: "N", lower: "n", find_audio:"audio/n.m4a", sound_audio:"audio/n_sound.m4a", selected: true},
                    { upper: "O", lower: "o", find_audio:"audio/o.m4a", sound_audio:"audio/o_sound.m4a", selected: true},
                    { upper: "P", lower: "p", find_audio:"audio/p.m4a", sound_audio:"audio/p_sound.m4a", selected: true},
                    { upper: "Q", lower: "q", find_audio:"audio/q.m4a", sound_audio:"audio/q_sound.m4a", selected: true},
                    { upper: "R", lower: "r", find_audio:"audio/r.m4a", sound_audio:"audio/r_sound.m4a", selected: true},
                    { upper: "S", lower: "s", find_audio:"audio/s.m4a", sound_audio:"audio/s_sound.m4a", selected: true},
                    { upper: "T", lower: "t", find_audio:"audio/t.m4a", sound_audio:"audio/t_sound.m4a", selected: true},
                    { upper: "U", lower: "u", find_audio:"audio/u.m4a", sound_audio:"audio/u_sound.m4a", selected: true},
                    { upper: "V", lower: "v", find_audio:"audio/v.m4a", sound_audio:"audio/v_sound.m4a", selected: true},
                    { upper: "W", lower: "w", find_audio:"audio/w.m4a", sound_audio:"audio/w_sound.m4a", selected: true},
                    { upper: "X", lower: "x", find_audio:"audio/x.m4a", sound_audio:"audio/x_sound.m4a", selected: true},
                    { upper: "Y", lower: "y", find_audio:"audio/y.m4a", sound_audio:"audio/y_sound.m4a", selected: true},
                    { upper: "Z", lower: "z", find_audio:"audio/z.m4a", sound_audio:"audio/z_sound.m4a", selected: true}
                  ];

      var shuffle = function(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };

      $scope.toPercentage =  function (input, decimals) {
        return $filter('number')(input * 100, decimals);
      };

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.setSelectedLetters = function () {
        $scope.selectedLetters = []
        for (var i = 0; i < $scope.letterList.length; i++) {
          if ($scope.letterList[i].selected )
            $scope.selectedLetters.push($scope.letterList[i])
        }
      }

      $scope.letterSelect = angular.copy(letters)

      var letterList = $scope.letterList

      $scope.startButton = true

      $scope.finish = false

      $scope.allStudents = StudentService.getAllStudents()

      $scope.selectedStudent = {}

      $scope.promptShowing = false

      if ($scope.isAuthenticated() == true) {
        $scope.currentUser = UserService.getCurrentUser()
      }

      $scope.showLetterSelect = function() {
         var panel = '.letter-select-container'
        var showing = $(panel).css('display')
        if(showing == 'none') {
          $(panel).slideDown();
        } else {
          $(panel).slideUp();
        }
      } 

      $scope.toggleSelectLetter = function(letter){
        if (letter.selected == true) {
          letter.selected = false
          console.log(letter.selected)
        } else {
          letter.selected = true
          console.log(letter.selected)
        }
      }

      $scope.unselectAll = function() {
        for (var i = 0; i < $scope.letterSelect.length; i ++) {
          $scope.letterSelect[i].selected = false
        }
      }

       $scope.selectAll = function() {
        for (var i = 0; i < $scope.letterSelect.length; i ++) {
          $scope.letterSelect[i].selected = true
        }
      }

      $scope.selectRecentMissed = function(type) {
        if ($scope.selectedStudent.firstName) {
          var studentAssesments = AssesmentService.getStudentAssesments($scope.selectedStudent)
          $scope.currentLettersSelected = null

            for (var j = studentAssesments.letter.length - 1; j >= 0; j--) {
              console.log( studentAssesments.letter[j].name )
              if (studentAssesments.letter[j].name == type) {
                $scope.currentLettersSelected = studentAssesments.letter[j].missed
              }
              if ($scope.currentLettersSelected) {
                break
              }
            }


          if ($scope.currentLettersSelected) {
            if ($scope.currentLettersSelected.length < 1) {
              alert($scope.selectedStudent.firstName + " " + $scope.selectedStudent.lastName + " did not miss any letters on their last " + type + " Assesment.")
            } else {
              $scope.unselectAll()
              for (var i = 0; i < $scope.letterSelect.length; i ++) {
                for (var x = 0; x < $scope.currentLettersSelected.length; x++) {
                  if ($scope.letterSelect[i].upper == $scope.currentLettersSelected[x]) {
                    $scope.letterSelect[i].selected = true
                  }
                }
              }
            }
          } else {
            alert($scope.selectedStudent.firstName + " " + $scope.selectedStudent.lastName + " has not taken a " + type + " Assesment.")
          }

        } else {
          alert("Please select a student.")
        }
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

      $scope.showPrompt = function() {
        $scope.promptShowing = true
      }

      $scope.hidePrompt = function() {
        $scope.promptShowing = false
      }

      var removeCorrectLetter = function (letterObject) {
        return letterObject.upper != $scope.correctLetter.upper
      }

      $scope.makeNewBoard = function () {
        $scope.newBoardLetters = angular.copy($scope.letterList).filter(removeCorrectLetter)
        $scope.shuffledLetterList = shuffle($scope.newBoardLetters)
        $scope.letterBoard = $scope.shuffledLetterList.splice(0,8)
        //remove confusion of letter "c" sound
        if ($scope.correctLetter.upper == "C") {
          for (var i=0; i < $scope.letterBoard.length; i++) {
            if ($scope.letterBoard[i].upper == "K" || $scope.letterBoard[i].upper == "S" ) {
              $scope.letterBoard.splice(i,1)
              var newLetter = $scope.shuffledLetterList.shift()
              if (newLetter == "K" || newLetter == "S") {
                do {
                  newLetter = $scope.shuffledLetterList.shift()
                } while (newLetter == "K" || newLetter == "S")
              }  
              $scope.letterBoard.push(newLetter)  
            }
          }
        }
        //remove confusion of letter "s" sound 
        if ($scope.correctLetter.upper == "S") {
          for (var i=0; i < $scope.letterBoard.length; i++) {
            if ($scope.letterBoard[i].upper == "C" ) {
              $scope.letterBoard.splice(i,1)
              var newLetter = $scope.shuffledLetterList.shift()
              $scope.letterBoard.push(newLetter)  
            }
          }
        }
        //remove confusion of letter "k" sound 
        if ($scope.correctLetter.upper == "K") {
          for (var i=0; i < $scope.letterBoard.length; i++) {
            if ($scope.letterBoard[i].upper == "C" ) {
              $scope.letterBoard.splice(i,1)
              var newLetter = $scope.shuffledLetterList.shift()
              $scope.letterBoard.push(newLetter)  
            }
          }
        }
        $scope.letterBoard.push($scope.correctLetter)
        $scope.letterBoard = shuffle($scope.letterBoard)
      }

      $scope.changeCorrectLetter = function () {
        if ($scope.correctLetterIndexCounter == ($scope.selectedLetters.length - 1)) {
          $scope.finishAssesment()
        } else {
          $scope.correctLetterIndexCounter++
          $scope.correctLetter = $scope.selectedLetters[$scope.correctLetterIndexCounter]
          $scope.playCorrectAudio()
        }
      }

      $scope.recordAnswer = function (guess) {
        if (guess.upper == $scope.correctLetter.upper) {
          $scope.correctAnswers.push($scope.correctLetter.upper)
        } else {
          $scope.incorrectAnswers.push($scope.correctLetter.upper)
        }
      }

      $scope.playCorrectAudio = function () {
        var correctAudio 
        if ($scope.sound == true) {
          correctAudio = new Audio($scope.correctLetter.sound_audio)
        } else {
          correctAudio = new Audio($scope.correctLetter.find_audio)
        }
        correctAudio.play()
      }

      $scope.playDoneAudio = function () {
        var doneAudio = new Audio("audio/done.mp3")
        doneAudio.play()
      }

      $scope.letterGuess = function (guessedLetter) {
        $scope.recordAnswer(guessedLetter)
        $scope.changeCorrectLetter()
        $scope.makeNewBoard()  
      }

      $scope.resetAssesment = function () {
        $scope.correctLetterIndexCounter = 0
        $scope.incorrectAnswers = []
        $scope.correctAnswers = []  
        $scope.startButton = true
        $scope.upper = false
        $scope.lower = false
        $scope.sound = false
      }

      $scope.startLetterAssesment = function (type) {
        if ($scope.selectedStudent.firstName || !$scope.isAuthenticated()) {
          StudentService.setCurrentStudent($scope.selectedStudent)
          $scope.resetAssesment()
          $scope.letterList = shuffle(angular.copy($scope.letterSelect));
          $scope.setSelectedLetters()
          $scope.correctLetter = $scope.selectedLetters[0]
          $scope.makeNewBoard()
          $scope.startButton = false
          if (type == 1) {
            $scope.upper = true
          } else if (type == 2) {
            $scope.lower = true 
          } else if (type == 3) {
            $scope.sound = true
            $scope.upper = true
          }
          $scope.playCorrectAudio()
        } else {
          alert("Don't forget to choose a student!")
        }

      }

      $scope.finishAssesment = function () {
        $scope.playDoneAudio()
        if($scope.isAuthenticated() && $scope.selectedStudent.firstName) {
          $scope.save()
        }
        $scope.resetAssesment()
        $scope.finish = true
      }

      $scope.hideFinish = function () {
        $scope.finish = false
      }

      $scope.save =  function () {
        $rootScope.loading = true
        var assesmentName = ""
        if ($scope.upper == true && $scope.sound != true) {
          assesmentName = "Uppercase"
        } else if ($scope.lower == true && $scope.sound != true) {
          assesmentName = "Lowercase"
        } else if ($scope.sound == true) {
          assesmentName = "Sound"
        }
        var student = StudentService.getCurrentStudent()
        var teacher = UserService.getCurrentUser()
        var assesment = {
          teacherID: teacher._id,
          studentID: student._id,
          studentName: student.firstName + " " + student.lastName,
          name: assesmentName,
          type: "Letter",
          date: new Date(),
          percentCorrect: $scope.toPercentage($scope.correctAnswers.length/$scope.selectedLetters.length, 0),
          correctCount: $scope.correctAnswers.length.toString(),
          incorrectCount: $scope.incorrectAnswers.length.toString(),
          correct: $scope.correctAnswers,
          missed: $scope.incorrectAnswers
        }

        AssesmentService.save(assesment)    
      }

  }]);


