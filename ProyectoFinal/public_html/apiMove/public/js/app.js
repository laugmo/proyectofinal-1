/* App Module */

angular.module('app', ['app.home', 'app.user', 'app.events', 'app.login', 'app.register'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({
                redirectTo: '/home',
                controller: 'IndexController'
            });
        })
        .controller('IndexController', function ($scope) {
//                $scope.init = function () {
//                    dpd.users.me(function (user) {
//                        if (user) {
//                            alert("Welcome, " + user.username + "!");
//                            location.href = "partials/_user.html";
//                        } else {
//                            location.href = "partials/_home.html";
//                        }
//                    });
//                };
//                $scope.init();
            dpd.users.me(function (user) {
                if (user) {
                    $scope.userLoaded = true;
                    $scope.currentUser = user;
                } else
                    $scope.userLoaded = false;
            });

            $scope.logout = function () {
                dpd.users.logout(function (res, err) {
                    location.href = "partials/_login.html";
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


