'use strict';

angular.module('app.profile', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/profile', {
                    redirectTo: '/profile',
                    controller: 'ProfileController',
                    templateUrl: 'partials/_profile.html'
                });
            }])
        .controller('UpdateProfile', ['$scope', function ($scope) {
                $scope.cities = [
                    {value: 'Montevideo', label: 'Montevideo'},
                    {value: 'Canelones', label: 'Canelones'},
                    {value: 'Ciudad de la Costa', label: 'Ciudad de la Costa'},
                    {value: 'Salto', label: 'Salto'},
                    {value: 'Paysandú', label: 'Paysandú'},
                    {value: 'Rivera', label: 'Rivera'},
                    {value: 'Piriápolis', label: 'Piriápolis'},
                    {value: 'Punta del Este', label: 'Punta del Este'},
                    {value: 'Melo', label: 'Melo'},
                    {value: 'Mercedez', label: 'Mercedez'},
                    {value: 'Artigas', label: 'Artigas'},
                    {value: 'Treinta y Tres', label: 'Treinta y Tres'},
                    {value: 'Rocha', label: 'Rocha'},
                    {value: 'La Paloma', label: 'La Paloma'},
                    {value: 'Minas', label: 'Minas'},
                    {value: 'Tacuarembó', label: 'Tacuarembó'},
                    {value: 'Paso de los Toros', label: 'Paso de los Toros'},
                    {value: 'Colonia', label: 'Colonia'},
                    {value: 'Nueva Helvecia', label: 'Nueva Helvecia'},
                    {value: 'Trinidad', label: 'Trinidad'},
                    {value: 'San José', label: 'San José'},
                    {value: 'Durazno', label: 'Durazno'},
                    {value: 'Fray Bentos', label: 'Fray Bentos'},
                    {value: 'Florida', label: 'Florida'}
                ];

                $scope.loadProfileFields = function () {
                    dpd.users.me(function (user) {
                        if (user) {
                            $scope.currentUser = user;
                            $scope.$apply();
                        }
                        var date_input = $('input[name="date"]');
                        var options = {
                            format: 'dd-mm-yyyy',
                            todayHighlight: true,
                            autoclose: true
                        };
                        date_input.datepicker(options);
                    });
                };
                $scope.validDates = function (days, year, month) {

                    var filtered = [];
                    var now = new Date();
                    var over18Day = now.getUTCDate();
                    var over18Month = now.getUTCMonth() + 1;
                    var over18Year = now.getUTCFullYear() - 18;
                    if (year === over18Year && month.id === over18Month) {
                        angular.forEach(days, function (day) {
                            if (day <= over18Day) {
                                filtered.push(day);
                            }
                        });
                    } else {
                        angular.forEach(days, function (day) {
                            filtered.push(day);
                        });
                    }
                    return filtered;
                };

                $scope.getSports = function (user) {
                    // sports
                    dpd.sports.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar deportes");
                        }

                        $scope.sportsList = result;
                        $scope.$apply();
                    });

//                    // selected sports
                    $scope.selection = user.sports;
//                    $scope.apply();

                };

                // parse a date in dd-mm-yyyy format
//                function parseDate(currentDob) {
//                    var dateParts = currentDob.split("-");
//                    var month = dateParts[1]-1;
//                    var day = dateParts[0];
//                    var year = dateParts[2];
//                    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
//                    return new Date(month, day, year); // months are 0-based
//                }
                $scope.selectedDate = function (user) {
                    var currentDob = $("#date").val();
                    var dateParts = currentDob.split("-");
                    dpd.users.post(user.id, {
                        birthDate: currentDob,
                        age: calculateAge(dateParts[1], dateParts[0], dateParts[2])
                    });

                };
                $scope.updateUser = function (name, address, neighbourhood, city, phone, sports) {
                    dpd.users.me(function (user) {
                        if (user) {
                            $scope.selectedDate(user);
                            $scope.currentUser = user;
                            dpd.users.post(user.id, {
                                name: name,
                                address: address,
                                neighbourhood: neighbourhood,
                                city: city.label,
                                country: "Uruguay",
                                phone: phone,
                                sports: sports
                            }, function (result, error) {
                                if (error) {
                                    // Alert if there's an error
                                    return alert(error.message || "Error al actualizar el Perfil");
                                } else {
                                    return alert("Gracias" + result.name + "! Tu perfil ha sido actualizado ;-)");
                                }
                            });
//                            location.reload();
                        }
                    });
                };
                function calculateAge(birthMonth, birthDay, birthYear)
                {
                    var todayDate = new Date();
                    var todayYear = todayDate.getFullYear();
                    var todayMonth = todayDate.getMonth();
                    var todayDay = todayDate.getDate();
                    var age = todayYear - birthYear;

                    if (todayMonth < birthMonth - 1)
                    {
                        age--;
                    }

                    if (birthMonth - 1 === todayMonth && todayDay < birthDay)
                    {
                        age--;
                    }
                    return age;
                }

            }]);
