/**
 * Created by Mohamed.Khalil on 9/15/2016.
 */
app= angular.module('nodeClient', []);
    app.controller('firstController', ['$scope', function($scope) {
        $scope.lastName = 'Nabil';

        $scope.sayHello = function() {
            $scope.greeting = 'Hello ' + $scope.username + '!';
        };
    }]);