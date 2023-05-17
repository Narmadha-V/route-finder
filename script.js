const calcButton = document.querySelector(".calculate-btn");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const date = document.querySelector("#start-date");

// create dropdown
var startCity = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Coimbatore",
  "Salem",
  "Chennai",
  "Bangalore",
];
var endCity = [
  "Madurai",
  "Trichy",
  "Coimbatore",
  "Salem",
  "Chennai",
  "Bangalore",
  "Mumbai",
];
function selectList() {
  startCity = startCity.sort();
  endCity = endCity.sort();
  start.innerHTML = '<option value="From" selected>From</option>';
  end.innerHTML = '<option value="To" selected>To</option>';
  startCity.forEach((city) => {
    start.innerHTML += `<option value=${city}>${city}</option>`;
  });
  endCity.forEach((cityend) => {
    end.innerHTML += `<option value=${cityend}>${cityend}</option>`;
  });
}
selectList();

// click
function calculateDeliveryDate(start, end, curDate) {
  const obj1 = [
    { start: "Tirunelveli", end: "Madurai", days: 2 },
    { start: "Madurai", end: "Trichy", days: 2 },
    { start: "Trichy", end: "Chennai", days: 3 },
    { start: "Madurai", end: "Coimbatore", days: 3 },
    { start: "Coimbatore", end: "Chennai", days: 3 },
    { start: "Madurai", end: "Salem", days: 3 },
    { start: "Salem", end: "Bangalore", days: 2 },
    { start: "Chennai", end: "Bangalore", days: 2 },
    { start: "Bangalore", end: "Mumbai", days: 3 },
    { start: "Chennai", end: "Mumbai", days: 5 },
    { start: "Coimbatore", end: "Bangalore", days: 3 },
  ];
  console.log(obj1);
  const matchingRoutes = [];
  let days = 0;
  for (let i = 0; i < obj1.length; i++) {
    const route = obj1[i];
    if (route.start === start && route.end === end) {
      days = route.days;
      matchingRoutes.push(route);
      // alert('Route found')
    }
  }

  if (matchingRoutes.length === 0) {
    // take start location and store it in routes
    const routes = [];
    for (let i = 0; i < obj1.length; i++) {
      const route = obj1[i];
      if (route.start === start) {
        routes.push(route);
      }
    }

    // finding end location of the(start location)
    for (let i = 0; i < routes.length; i++) {
      const route1 = routes[i];
      for (let j = 0; j < obj1.length; j++) {
        const route2 = obj1[j];
        if (route1.end === route2.start && route2.end === end) {
          days = route1.days + route2.days;
          matchingRoutes.push(route1, route2);
          // alert('Route found')
          break;
        }
      }
      if (matchingRoutes.length > 0) {
        break;
      }
      if (matchingRoutes.length === 0) {
        alert("Route not found");
        // clearData()
      }
    }
  }

  const startDate = new Date(curDate);
  // console.log(startDate);
  const curdate = startDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  if (curDate == "") {
    alert("Please select date");
    document.querySelector("#bottom-form").style.display = "none";
  } else {
    // startDate.setDate(startDate.getDate() + 1);
    let remainingDays = days - 1;

    console.log(remainingDays, days);
    while (remainingDays > 0) {
      const dayOfWeek = startDate.getDay();
      console.log(dayOfWeek);
      if (dayOfWeek != 0 && dayOfWeek != 6) {
        remainingDays--;
      }
      startDate.setDate(startDate.getDate() + 1);
    }
  }
  const deliveryDate = startDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let routeStr = matchingRoutes[0].start;
  for (let i = 0; i < matchingRoutes.length; i++) {
    const route = matchingRoutes[i];
    routeStr += " -> " + route.end;
  }
  const result = `
   <p id="result">${routeStr}</p>
   <div class="days">Totally ${days}days. </div>
   <div> ${curdate} Start -> Arrive on ${deliveryDate}</div>
  `;
  return result;
}
//  EVENT HANDLER
calcButton.addEventListener("click", function (e) {
  e.preventDefault();
  const startValue = start.value;
  const endValue = end.value;
  const curDate = date.value;

  if (startValue === endValue) {
    alert("Choose different places");
  } else if (startValue === "From" && endValue === "To") {
    alert("Select start and end city !");
  } else calculateDeliveryDate;

  const result = calculateDeliveryDate(startValue, endValue, curDate);
  document.querySelector("#bottom-form").style.display = "block";
  const deliveryInfoElement = document.getElementById("delivery-info");
  deliveryInfoElement.innerHTML = result;
});
