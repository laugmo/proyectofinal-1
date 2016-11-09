/* App Module */

angular.module('app', ['app.home', 'app.user', 'app.events', 'app.login', 'app.register'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({redirectTo: '/home'});
        })
        .controller('IndexController', function ($scope) {
                $scope.init = function () {
                    dpd.users.me(function (user) {
                        if (user) {
                            alert("Welcome, " + user.username + "!");
                        } else {
                            location.href = "partials/_login.html";
                        }
                    });
                };
                $scope.init();
                
                $scope.logout = function () {
                    dpd.users.logout(function (res, err) {
                        location.href = "partials/_login.html";
                    });
                };
            });

        
