'use strict';
//var sports = angular.module("app", ["checklist-model"]);
//sports.controller('SportsCtrl', function($scope) {
//    dpd.sports.get(function (result, err) {
//                        if (err) {
//                            // Alert if there's an error
//                            return alert(err.message || "Error al buscar deportes");
//                        }
//                        $scope.sports = result;
//                        $scope.apply();
//                    });
//                
//  $scope.user = {
//    sports: []
//  };
//  $scope.checkAll = function() {
//    $scope.user.sports = angular.copy($scope.sports);
//  };
//  $scope.uncheckAll = function() {
//    $scope.user.sports = [];
//  };
//});

angular.module('app.profile', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/profile', {
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
//                            if(user.city !== ""){
//                                
//                                $scope.currentUser.city =$scope.cities[user.city];
//                                $scope.apply();                            
//                            }
//                            $scope.getSports(user);
                            $scope.apply();
                        }

                    });
                };
                $scope.getSports = function (user) {
                    // sports
                    dpd.sports.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar deportes");
                        }
                        //console.log("getSports");

                        $scope.sports = result;
                        $scope.apply();
                    });

//                    // selected sports
                    $scope.selection = user.sports;
                    console.log(user.sports);
//                    $scope.apply();

                };
                $scope.updateUser = function (name, birthDate, address, neighbourhood, city, phone, sports) {
                    dpd.users.me(function (user) {
                        if (user) {
                            $scope.currentUser = user;
                            dpd.users.post(user.id, {
                                name: name,
                                birthDate: birthDate, //{"date": birthDate},
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

            }]);