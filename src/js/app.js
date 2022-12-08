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

             .when('/dashboardEvent', {
                                       template: '<dashboard-event></dashboard-event>'
                                    })

             .when('/updateEvent/:eventId', {
                                        template: '<update-event></update-event>'
                                   })

              .when('/deleteEvent', {
                                          template: '<delete-event></delete-event>'
                                     })

    .otherwise({ redirectTo: '/dashboardEvent' });
     }
    ])
