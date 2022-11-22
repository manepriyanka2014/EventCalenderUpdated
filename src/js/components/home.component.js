function homeCtrl($location){
    ctrl = this;
    ctrl.$onInit =function(){
        console.log("...inside home init.....");
    };


}

angular.module("eventcalender").component("home", {
    templateUrl: 'views/dashboard.html',
    controller: homeCtrl,
    controllerAs: 'ctrl'
});