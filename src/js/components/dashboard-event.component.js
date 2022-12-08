    function dashboardEventCtrl($http,$location) {
     let nav = 0;
     let clicked = null;
     let events = [];

     const calendar = document.getElementById('calendar');
     const newEventModal = document.getElementById('newEventModal');
     const deleteEventModal = document.getElementById('deleteEventModal');
     const backDrop = document.getElementById('modalBackDrop');
     const eventTitleInput = document.getElementById('eventTitleInput');
     const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

     ctrl = this;
     ctrl.eventList = [];
     ctrl.eventDetails = {
          date: "",
          title: "",
          link: ""
     };

  ctrl.$onInit = function () {
      console.log("inside on dashboard Event init");
      localStorage.clear();
      getAllEvent();
  };

  load = function () {
      const dt = new Date();

      if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
      }

      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

      document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

      calendar.innerHTML = '';

      for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
          daySquare.innerText = i - paddingDays;
          const eventForDay = events.find(e => e.date === dayString);

          if (i - paddingDays === day && nav === 0) {
            daySquare.id = 'currentDay';
          }
          // to attach event
          if (eventForDay) {
            const eventInfoDiv = document.createElement('div');
            const eventDiv = document.createElement('div');
            const linkDiv = document.createElement('div');
            eventInfoDiv.classList.add('event');
            eventDiv.innerText = eventForDay.title;
            linkDiv.innerText = eventForDay.link;
            //linkDiv.title = eventForDay.link;
            eventInfoDiv.appendChild(eventDiv);
            eventInfoDiv.appendChild(linkDiv);
            daySquare.appendChild(eventInfoDiv);
          }

          daySquare.addEventListener('click', () => openModal(dayString));
        } else {
          daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
      }
    }


 closeModal = function() {
   eventTitleInput.classList.remove('error');
   newEventModal.style.display = 'none';
   deleteEventModal.style.display = 'none';
   backDrop.style.display = 'none';
   eventTitleInput.value = '';
   clicked = null;
   load();
 }

 initButtons = function () {
   document.getElementById('nextButton').addEventListener('click', () => {
     nav++;
     load();
   });

   document.getElementById('backButton').addEventListener('click', () => {
     nav--;
     load();
   });

//   document.getElementById('saveButton').addEventListener('click', saveEvent);
//   document.getElementById('cancelButton').addEventListener('click', closeModal);
//   document.getElementById('deleteButton').addEventListener('click', deleteEvent);
//   document.getElementById('closeButton').addEventListener('click', closeModal);
 }

 ctrl.redirectToAddEventPage = function() {
     $location.path('/addEvent');
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

              events.forEach((event) => {
                  let dayString= event.date.split("-");
                   event.date= dayString[1]+"/"+dayString[2]+"/"+dayString[0];
              });
               console.log(events);
              //generate calender
              initButtons();
              load();
            },
            function errorCallback(response) {
              console.log(response.statusText); //http status code response
            }
          );
    }
  }



angular.module("eventcalender").component("dashboardEvent", {
      templateUrl: "views/dashboard-event.html",
      controller: dashboardEventCtrl,
      controllerAs: "ctrl"
    });
