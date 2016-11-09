'use strict';

/* Register Module */

angular.module('app.register', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/register', {
                    controller: 'RegisterController',
                    templateUrl: 'partials/_register.html'
                });
            }])
        .controller('RegisterController', ['$scope', function ($scope) {
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

                $scope.login = function () {
                    location.href = "partials/_login.html";
                };
            }]);