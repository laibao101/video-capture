// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('starter', ['ionic'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       // for form inputs)
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       // Don't remove this line unless you know what you are doing. It stops the viewport
//       // from snapping when text inputs are focused. Ionic handles this internally for
//       // a much nicer keyboard experience.
//       cordova.plugins.Keyboard.disableScroll(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })

// var app=angular.module('starter',['ionic','ngCordova']);

// app.controller('VideoCtrl', ['$scope','$cordovaCapture', function($scope,$cordovaCapture){
//   $scope.data={
//     videoPath:""
//   };

//   $scope.captureVideo=function () {
//     console.log(1)
//     var options={limit:3,duration:15};
//     $cordovaCapture.captureVideo(options).then(function (videoData) {
//       $scope.data.videoPath="file:/"+videoData[0].fullPath;
//     },function (err) {
//       console.log(err);
//     });
//   }


// }]);


// app.directive('cordovaVideo', [function(){
//   // Runs during compile
//   return {
//     // name: '',
//     // priority: 1,
//     // terminal: true,
//      scope: {src:'='}, // {} = isolate, true = child, false/undefined = no change
//     // controller: function($scope, $element, $attrs, $transclude) {},
//     // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
//     restrict: 'AEC', // E = Element, A = Attribute, C = Class, M = Comment
//     // template: '',
//     // templateUrl: '',
//     // replace: true,
//     // transclude: true,
//     // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
//     link: function(scope, element, attrs, controller) {
//       scope.$watch('src', function(newValue, oldValue, scope) {
//         if(scope.src!=''){
//           var div=document.createElement('div');
//           div.innerHTML= "<video id=\"myCordovaVideo\"\
//                  controls>"+
//                                  "<source src=\"" + scope.src +
//                                  "\" type=\"video/quicktime\">"+
//                                  "</video>";
//           var previousDiv=document.getElementById('myCordovaVideo');
//           if(previousDiv) previousDiv.remove();
//           console.log(div);
//           element.append(div);

//         }
//       });
//     }
//   };
// }]);





var app = angular.module('starter', ['ionic', 'ngCordova']);

app.controller('VideoCtrl', function($scope, $cordovaCapture) {
  $scope.data = {
    videoPath: ""
  };

  $scope.captureVideo = $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
      $scope.data.videoPath = "file:/" + videoData[0].fullPath;
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }
});

app.directive("cordovaVideo", function () {
  return {
    restrict: 'AEC',
    scope: {src: '='},
    // Using replace template doesn't work because the DOM didn't get re-evaluate
    // Therefore the src value doesn't get updated
    // replace: true,
    // template: "<video width=\"320\" height=\"240\" controls>"+
    //           "<source src=\"{{ src | trusted }}\" type=\"video/quicktime\">"+
    //           "</video>",
    link: function(scope, element, attrs) {
      scope.$watch('src', function(newVal, oldVal) {
        if (scope.src != "") {
          // Create a div object
          var div = document.createElement('div');
          div.innerHTML = "<video id=\"myCordovaVideo\" controls>"+
                          "<source src=\"" + scope.src + "\" type=\"video/quicktime\">"+
                          "</video>";
          
          // Delete previous video if exists
          var previousDiv = document.getElementById('myCordovaVideo');
          if (previousDiv)
            previousDiv.remove();

          // Append new <video> tag into the DOM
          element.append(div);
        }

      });
    }
  }
});







