/* App Module */

angular.module('app', ['app.home', 'app.user', 'app.events', 'app.login', 'app.register'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({redirectTo: '/home'});
        })
        .controller('IndexController', ['$scope', function ($scope) {
                var init = function () {
                    dpd.users.me(function (user) {
                        if (user) {
                            alert("Welcome, " + user.username + "!");
                        } else {
                            location.href = "partials/_login.html";
                        }
                    });
                };
                init();
                
                $scope.logout = function () {
                    dpd.users.logout(function (res, err) {
                        location.href = "partials/_login.html";
                    });
                };
            }]);

        
