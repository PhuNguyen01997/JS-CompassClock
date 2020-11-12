$(document).ready(function () {
    var date = new Date();
    const secSpan = $(".compass-clock__item--second");
    const minSpan = $(".compass-clock__item--minute");
    const hourSpan = $(".compass-clock__item--hour");
    const daySpan = $(".compass-clock__item--day");
    const monthSpan = $(".compass-clock__item--month");
    const dayWeekSpan = $(".compass-clock__item--dayWeek");
    // const nameList = ["sec",];

    setAngle(secSpan, date.getSeconds(), 60); // include 60 second
    setAngle(minSpan, date.getMinutes(), 60); // include 60 minute
    setAngle(hourSpan, date.getHours(), 24); // include 24 hour
    setAngle(daySpan, date.getDate(), 31); // include 31 day
    setAngle(monthSpan, date.getMonth() + 1, 12); // include 12 month
    setAngle(dayWeekSpan, date.getDay(), 7); // include 7 dayWeek

    // Nếu thêm transition ngay từ đầu thì vừa load trang xong sẽ bu từ 1 cục r tản ra
    // After set correct position, set transition
    // Có thể sử dụng promise mà k cần sử dụng setTimeout, mục đích chính là sau khi sét giờ xong thì nhét transition vào
    setTimeout(() => {
        setTransition(secSpan);
        setTransition(minSpan);
        setTransition(hourSpan);
        setTransition(daySpan);
        setTransition(monthSpan);
        setTransition(dayWeekSpan);
    }, 500);

    const eachSecond = setInterval(() => {
        date = new Date();
        setAngle(secSpan, date.getSeconds(), 60); // include 60s
        setAngle(minSpan, date.getMinutes(), 60); // include 60 minute
    }, 1000);

    // When style of minuteSpan change
    $(minSpan[0]).attrchange({
        trackValues: true, // set to true so that the event object is updated with old & new values
        callback: function (e) {
            if (e.attributeName == "style") {
                date = new Date();
                setAngle(hourSpan, date.getHours(), 24); // include 24 hour
                console.log("Trigger minute is changed");
            }
        }
    });

    // When style of hourSpan change
    $(hourSpan[0]).attrchange({
        trackValues: true, // set to true so that the event object is updated with old & new values
        callback: function (e) {
            if (e.attributeName == "style") {
                date = new Date();
                setAngle(daySpan, date.getDate(), 31); // include 31 day
                setAngle(monthSpan, date.getMonth() + 1, 12); // include 12 month
                setAngle(dayWeekSpan, date.getDay(), 7); // include 7 dayWeek
                console.log("Trigger hour is changed");
            }
        }
    });
});

function setTransition(nodeList) {
    $.each(nodeList, function (index, elem) {
        $(elem).css("transition", "0.5s");
    });
}

function setAngle(nodeList, valueNow, amount) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (valueNow - deg) * (360 / amount);
        $(elem).css("transform", "rotate(" + deg + "deg)");

        // Add active class to the now Time
        const unit = elem.dataset.unit;
        const name = "active--" + unit;
        elem.classList.remove("active");
        elem.classList.remove(name);
        if (deg === 0) {
            elem.classList.add("active");
            elem.classList.add(name);
        }
    });
}

function getWeek(date) {
    let monthStart = new Date(date);
    monthStart.setDate(0);
    let offset = (monthStart.getDay() + 1) % 7 - 1; // -1 is for a week starting on Monday
    return Math.ceil((date.getDate() + offset) / 7);
}