function addEventCtrl($http, $timeout,$location) {
  ctrl = this;
ctrl.eventDetails = {
        date: "",
        title: "",
        link: ""
};
ctrl.$onInit = function () {
    console.log("inside on addEvent init");
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
                      $location.path('/dashboardUser');
                    }, 1000);
                    console.log("response from backend---------->", response);
                  },
                  function errorCallback(response) {
                          console.log(response.statusText); //http status code response
                          ctrl.failedUserAddedMessage = "Event does not added successfully";
                          ctrl.failedUserAddedMessagebool = true;
                          $timeout(function () {
                            ctrl.failedUserAddedMessagebool = false;
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
