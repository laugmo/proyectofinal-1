/* App Module */

angular.module('app', ['app.home', 'app.user', 'app.events', 'app.profile'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({
                redirectTo: '/home',
                controller: 'IndexController'
            });
        })
        .controller('IndexController', function ($scope) {
            $scope.currentUser;
            dpd.users.me(function (user) {
                if (user) {
                    $scope.userLoaded = true;
                    $scope.currentUser = user;
                    $scope.includePath = "partials/_user.html";
                    $scope.$apply();

                } else {
                    $scope.userLoaded = false;
                    $scope.includePath = "partials/_home.html";
                    $scope.$apply();

                }
            });
            
            $scope.myProfile = function (user) {
                
                if (user) {
                    $scope.includePath = "partials/_profile.html";
                }

                };

            $scope.logout = function () {
                dpd.users.logout(function (res, err) {
                    $scope.userLoaded = false;
                    $scope.currentUser = null;
                    $scope.includePath = "partials/_home.html";
                    $scope.$apply();
                });
            };
            $scope.submitLogin = function (username, password) {
                dpd.users.login({username: username, password: password}, function (session, error) {
                    if (error) {
                        alert(error.message);
                    } else {
                        location.href = "/index.html";
                    }
                });
                return false;
            };

            $scope.submitRegister = function (username, name, password, corp, confirm) {
                if (!username) {
                    alert("Username is required");
                } else if (!password) {
                    alert("Password is required");
                } else if (password !== confirm) {
                    alert("Passwords do not match");
                } else {
                    dpd.users.post({username: username, password: password, name: name, corporation: corp}, function (user, error) {
                        if (error) {
                            alert(JSON.stringify(error));
                        } else {
                            location.href = "/index.html";
                        }
                    });
                }
                return false;
            };

        });


