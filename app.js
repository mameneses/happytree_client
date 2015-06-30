angular.module('HappyTree', ['ngRoute', 'satellizer', 'chart.js', 'ui.calendar','smoothScroll'])
  .config(function($routeProvider, $authProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/tools', {
        templateUrl: 'views/tools.html',
        controller: 'ToolsCtrl'
      })
      .when('/animal_alphabet', {
        templateUrl: 'views/animal_alphabet.html',
        controller: 'AnimalAlphabetCtrl'
      })
      .when('/sight_words', {
        templateUrl: 'views/sight_words.html',
        controller: 'SightWordsCtrl'
      })
      .when('/letters_assessment', {
        templateUrl: 'views/letters_assesment.html',
        controller: 'LettersAssesmentCtrl'
      })
      .when('/math_assessment', {
        templateUrl: 'views/math_assesment.html',
        controller: 'MathAssesmentCtrl'
      })
      .when('/students', {
        templateUrl: 'views/students.html',
        controller: 'StudentsCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/tracker', {
        templateUrl: 'views/tracker.html',
        controller: 'TrackerCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/onboard.html',
        controller: 'OnboardCtrl'
      })
      .otherwise('/')

    $authProvider.loginUrl = 'https://happytree-server.herokuapp.com/auth/login';
    $authProvider.signupUrl = 'https://happytree-server.herokuapp.com/auth/signup';

  })
  .filter('percentage', ['$filter', function ($filter) {
      return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }]);