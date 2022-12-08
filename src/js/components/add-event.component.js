function addEventCtrl($http, $timeout,$location) {
  ctrl = this;
ctrl.eventDetails = {
        date: "",
        title: "",
        link: ""
};
ctrl.$onInit = function () {
    console.log("inside on addEvent init");
    localStorage.clear();
    getAllEvent();
//    deleteEvent(eventId);
  };

    ctrl.reDirectToDashboardEvent = function () {
      $location.path('/dashboardEvent');
    };

function getAllEvent() {
          console.log(".....inside get all event..........");
          $http({
            method: "GET",
          url: "http://localhost:8080/UserMyBatis/listOfEvent",
          }).then(
            function successCallback(response) {
              console.log("response from backend---------->", response.data);
              ctrl.eventList = response.data;
              console.log(ctrl.eventList);
              localStorage.setItem('events', JSON.stringify(ctrl.eventList));
              console.log(localStorage.getItem('events'));
              events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
              //generate calender
//              initButtons();
//              load();
            },
            function errorCallback(response) {
              console.log(response.statusText); //http status code response
            }
          );
    }


 // calls the REST API to delete user details
  ctrl.deleteEvent = function (eventId) {
    console.log("Delete Event", eventId);
    $http({
      method: "DELETE",
      url: "http://localhost:8080/UserMyBatis/deleteEvent/" +eventId
    }).then(
      function successCallback(response) {
        if (ctrl.eventList != null && ctrl.eventList.length > 0) {
            // iterate over eventList
             ctrl.eventList.forEach((calenderInfo, index) => {
             // remove the entry from eventlist which is deleted from table
             if (calenderInfo.event_id === eventId) {
                    ctrl.eventList.splice(index, 1);
             }
             });
        }


        $timeout(function () {
          ctrl.successUserAddedMessagebool = false;
        }, 5000);
        console.log("response from backend---------->", response);
      },
    );
  };


    function updateEvent() {
          console.log(".....inside update Event..........");
          $http({
            method: "POST",
          url: "http://localhost:8080/UserMyBatis/updateevent",
          }).then(
            function successCallback(response) {
              console.log("response from backend---------->", response);
              ctrl.eventList = response.data;
            },
            function errorCallback(response) {
              console.log(response.statusText); //http status code response
            }
          );
        };





 // calls the REST API to update user details
//    ctrl.updateEvent = function () {
//      console.log("inside updateEventDetails", ctrl.eventDetails);
//      $http({
//        method: "POST",
//        url: "http://localhost:8080/UserMyBatis/updateEvent",
//        data: ctrl.eventDetails,
//      }).then(
//        function successCallback(response) {
//          ctrl.successUserAddedMessage = "Event updated successfully";
//          ctrl.successUserAddedMessagebool = true;
//          $timeout(function () {
//            ctrl.successUserAddedMessagebool = false;
//          }, 5000);
//          console.log("response from backend---------->", response);
//        },
//        function errorCallback(response) {
//          console.log(response.statusText); //http status code response
//          ctrl.failedUserAddedMessage = "User does not added successfully";
//          ctrl.failedUserAddedMessagebool = true;
//          $timeout(function () {
//            ctrl.failedUserAddedMessagebool = false;
//          }, 5000);
//        }
//      );
//    };



  ctrl.redirectToAddEventPage = function() {
     $location.path('/addEvent');
  };

 ctrl.redirectToDashboard = function() {
     $location.path('/dashboardEvent');
  };

  ctrl.redirectToEditEventPage = function(eventDetails) {
     console.log(".....inside redirectToEditEventPage .........."+ eventDetails.title);
     $location.path('/updateEvent/' + eventDetails.event_id);
  };





  // calls the REST API to save user details
    ctrl.addEvent = function () {
    console.log("inside saveEventDetails", ctrl.eventDetails);
$http({
      method: "POST",
      url: "http://localhost:8080/UserMyBatis/calender",
      data: ctrl.eventDetails,
    }).then(
    function successCallback(response) {
            ctrl.successUserAddedMessage = "Event added successfully";
            ctrl.successUserAddedMessagebool = true;
            $timeout(function () {
                      ctrl.successUserAddedMessagebool = false;
                      $location.path('/dashboard');
                    }, 1000);
                    console.log("response from backend---------->", response);
                  },
                  function errorCallback(response) {
                          console.log(response.statusText); //http status code response
                          ctrl.failedUserAddedMessage = "Event does not added successfully";
                          ctrl.failedUserAddedMessagebool = true;
                          $timeout(function () {
                            ctrl.failedUserAddedMessagebool = false;
//                            $location.path('/addEvent');

                          }, 2000);
                  }
          );
    };

 }




angular.module("eventcalender").component("addEvent", {
  templateUrl: "views/add-event.html",
  controller: addEventCtrl,
  controllerAs: "ctrl"
});
