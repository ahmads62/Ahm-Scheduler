$(document).ready(function() {

    const hourlyTask  = window.localStorage;    //store hours and task 
    const container   = $(".container-fluid");  //main Div to be used to append child elements
    const now         = moment();               //current system date    
    const currentTime = {text: moment().format("h:00 A"), hour: moment().hour()}; //object to store hours string and hour
    var startHour     = 8;
    var hoursArray    = [];
    //show current date on the page header 
    $("#day").text(now.format("dddd MMMM DD, YYYY"));
    // function to populate hoursArray to be used later to add DOM elements 
    function popHoursArray() {
        var text;
        var hour;
        for (var i = 1; i <= 11; i++) {
            text = moment().hour(startHour).format("h:00 A");
            hour = moment().hour(startHour);
            hoursArray[i] = {text, hour};
            startHour++;
        }
        return { text, hour };
    }
    //
    popHoursArray();
    //based on the time return past, present and future colors 
    function color(time) {
    return time.text === currentTime.text
        ? "present"
        : time.hour < now
        ? "past"
        : "future";
    }
    //
    hoursArray.forEach(function(hr) {
        const hourRow = $(`<div id="${hr.text}" data-name="${hr.text}" class="row"></div>`);
        const timeCol = $(`<div class="col-sm-1 hour">${hr.text}</div>`);
        const textCol = $(`<textarea name="${hr.text}" class="col-sm-10 description ${color(hr)}"> ${hourlyTask.getItem(hr.text) || ""} </textarea>`);
        const saveBtn = $(`<button class="btn saveBtn col-sm-1"><i class="fas fa-save text-xl"></i></button>`);
        //
        saveBtn.click((e) => {
            const taskValue = $(`textarea[name="${hr.text}"]`).val();
            hourlyTask.setItem(hr.text, taskValue);
            // Show notification that item was saved to localStorage by adding class 'show'
            $('.notification').addClass('show');  
            // Timeout to remove 'show' class after 5 seconds
            setTimeout(function() { $('.notification').removeClass('show'); }, 5000);
        });
        //append row and columns 
        hourRow.append(timeCol);
        hourRow.append(textCol);
        hourRow.append(saveBtn);
        //add row to the container 
        container.append(hourRow);
    });
});