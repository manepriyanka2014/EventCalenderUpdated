function updateEventCtrl($http, $timeout,$location,$routeParams){
ctrl = this;
ctrl.eventId;
ctrl.eventDetails = {
        event_id:0,
        date: "",
        title: "",
        link: ""
};
 ctrl.$onInit = function () {
    console.log("inside on editEvent init");
    console.log($routeParams.eventId);
    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
    console.log(events);
    let eventForDay = events.find(e => e.event_id == $routeParams.eventId);
    console.log("event"+eventForDay);
    ctrl.eventDetails = eventForDay;

  };

  ctrl.redirectToAddEventPage = function() {
       $location.path('/addEvent');
    };

     ctrl.reDirectToDashboardEvent = function () {
          $location.path('/dashboardEvent');
        };

  // calls the REST API to update user details
      ctrl.updateEvents = function () {
        console.log("inside updateEventDetails:", ctrl.eventDetails);
        $http({
          method: "PUT",
          url: "http://localhost:8080/UserMyBatis/editEvent",
          data: ctrl.eventDetails,
        }).then(
          function successCallback(response) {
            ctrl.successUserAddedMessage = "Event updated successfully";
            ctrl.successUserAddedMessagebool = true;
            $location.path('/addEvent');
            $timeout(function () {
              ctrl.successUserAddedMessagebool = false;
            }, 5000);
            console.log("response from backend---------->", response);
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
            ctrl.failedUserAddedMessage = "Event does not updated successfully";
            ctrl.failedUserAddedMessagebool = true;
            $timeout(function () {
              ctrl.failedUserAddedMessagebool = false;
            }, 5000);
          }
        );
      };
 }



angular.module("eventcalender").component("updateEvent", {
templateUrl: "views/update-event.html",
controller: updateEventCtrl,
controllerAs: "ctrl"
});