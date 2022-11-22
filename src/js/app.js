angular.module('eventcalender', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/addEvent', {
                           template: '<add-event></add-event>'
                        })
    .otherwise({ redirectTo: '/dashboard' });
     }
    ])
