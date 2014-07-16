'use strict';

// Declare app level module which depends on filters, and services
angular.module('spirograph', [
    'ngRoute',
    'spirograph.filters',
    'spirograph.services',
    'spirograph.directives',
    'spirograph.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html', controller: 'MainController' });
    //$routeProvider.when('/view1', { templateUrl: 'views/view1.html', controller: 'MyController1' });
    //$routeProvider.when('/view2', { templateUrl: 'views/view2.html', controller: 'MyController2' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
