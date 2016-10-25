

'use strict';

/* Home Module */

angular.module('app.events', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/home', {
                    controller: 'EventController',
                    templateUrl: 'partials/_home.html'
                });
            }]);

angular.module('app.events')
        .controller('EventController', ['$scope', function($scope) {
                dpd.events.get(function (result, err) {
                    if (err) {
                        // Alert if there's an error
                        return alert(err.message || "Error al buscar eventos");
                    }
                    $scope.eventos = result;
                    
                      function removeCompletedItems() {
    // Get all completed todos
    dpd.todos.get({completed: true}, function(todos) {
      todos.forEach(function(t) {
        // Delete it; "completed: true" is a failsafe
        dpd.todos.del({id: t.id, completed: true}, function() {
          // Now that's it's deleted from the server, remove the element, too
          $('#' + t.id).remove();
          
          if (!$('#todos').children().length) {
            $('#empty').show();
          }
        });
      });
    });
    return false;
}
                    
                    
                });
            }]);