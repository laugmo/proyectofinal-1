

'use strict';

/* Home Module
 * 
 * var todoApp = angular.module('todoApp', []);
 
 todoApp.controller('TodoController', function($scope, $http) {
 
 $scope.todos = [];
 
 // Get all todos
 $http.get('/todos')
 .success(function(todos) {
 $scope.loaded = true;
 $scope.todos = todos;
 }).error(function(err) {
 alert(err);
 });
 
 $scope.addTodo = function(title) {
 $http.post('/todos', {
 title: title
 }).success(function(todo) {
 $scope.newTodoTitle = '';
 $scope.todos.push(todo);
 }).error(function(err) {
 // Alert if there's an error
 return alert(err.message || "an error occurred");
 });
 };
 
 $scope.changeCompleted = function(todo) {
 // Update the todo
 $http.put('/todos/' + todo.id, {
 completed: todo.completed
 }).error(function(err) {
 return alert(err.message || (err.errors && err.errors.completed) || "an error occurred");
 });
 };
 
 $scope.removeCompletedItems = function() {
 $http.get('/todos', {
 params: {
 completed: true
 }
 }).success(function(todos) {
 todos.forEach(function(t) { deleteTodo(t); });
 });
 };
 
 function deleteTodo(todo) {
 $http.delete('/todos/' + todo.id, {
 params: {
 completed: true
 }
 }).success(function() {
 // Find the index of an object with a matching id
 var index = $scope.todos.indexOf(
 $scope.todos.filter(function(t) {
 return t.id === todo.id;
 })[0]);
 
 if (index !== -1) {
 $scope.todos.splice(index, 1);
 }
 }).error(function(err) {
 alert(err.message || "an error occurred");
 });
 }
 
 });
 *   */

var moveApp = angular.module('app', []);

angular.module('app.home', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/home', {
                    templateUrl: 'partials/_home.html',
                    controller: 'SearchEventController',
                    controllerAs: 'searcEventCtrl'
                });
            }])
        .controller('SearchEventController', ['$scope', function ($scope) {
                $scope.searchEvent = function (result, err) {
                    if ($scope.searchTerm) {
                        dpd.events.get({$or:
                                    [{name: $scope.searchTerm},
                                        {area: $scope.searchTerm},
                                        {discipline: $scope.searchTerm}]
                        },
                                function (result, err) {
                                    if (err) {
                                        // Alert if there's an error
                                        return alert(err.message || "Error al buscar eventos");
                                    }
                                    $scope.eventos = result;
                                });

                    }
                };

            }]);