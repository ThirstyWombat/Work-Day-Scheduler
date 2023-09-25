$(function () {
  var today = dayjs();
  let currentHour = dayjs().hour();
  let alldivs = [
    $("#hour-9"),
    $("#hour-10"),
    $("#hour-11"),
    $("#hour-12"),
    $("#hour-1"),
    $("#hour-2"),
    $("#hour-3"),
    $("#hour-4"),
    $("#hour-5"),
  ];

  for (let i = 0; i < alldivs.length; i++) {
    let id = alldivs[i].attr("id");

    let stringArray = id.split("-");

    let idNumber = parseInt(stringArray[1]);

    if (idNumber < 6) {
      idNumber += 12;
    }
    if (idNumber < currentHour) {
      alldivs[i].addClass("past");
    } else if (idNumber == currentHour) {
      alldivs[i].addClass("present");
    } else {
      alldivs[i].addClass("future");
    }
  }

  $("#currentDay").text(today.format("MMM D, YYYY"));
  let savedSchedule = JSON.parse(localStorage.getItem("fullSchedule"));

  let fullSchedule = {};
  if (savedSchedule !== null) {
    fullSchedule = savedSchedule;

    for (const key in fullSchedule) {
      let hourID = `#${key}`;

      $(hourID)[0].children[1].value = fullSchedule[key];
    }
  }

  $("button").click(function () {
    let scheduleElement = $(this).parent();

    let scheduleHour = scheduleElement[0].id;

    let newscheduleItem = $(this).siblings("textarea").val();

    fullSchedule[scheduleHour] = newscheduleItem;

    localStorage.setItem("fullSchedule", JSON.stringify(fullSchedule));
  });
});
