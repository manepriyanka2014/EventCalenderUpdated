function deleteEventCtrl($http, $timeout,$location){
ctrl = this;
ctrl.eventDetails = {
        date: "",
        title: "",
        link: ""
};
 ctrl.$onInit = function () {
    console.log("inside on deleteEvent init");
  };

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
               // remove the entry from eventList which is deleted from table
               if (calenderInfo.eventId === eventId) {
                      ctrl.eventList.splice(index, 1);
               }
               });
          }
          $timeout(function () {
            ctrl.successUserAddedMessagebool = false;
          }, 5000);
          console.log("response from backend---------->", response);
        }
      );
    };
}

angular.module("eventcalender").component("deleteEvent", {
templateUrl: "views/delete-event.html",
controller: deleteEventCtrl,
controllerAs: "ctrl"
});