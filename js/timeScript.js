$(document).ready(function () {
    var date = new Date();
    const secSpan = $(".compass-clock__item--second");
    const minSpan = $(".compass-clock__item--minute");
    const hourSpan = $(".compass-clock__item--hour");
    const daySpan = $(".compass-clock__item--day");
    const monthSpan = $(".compass-clock__item--month");
    const weekSpan = $(".compass-clock__item--week");
    set60(secSpan, date.getSeconds());
    set60(minSpan, date.getMinutes()); // Because both second and minute have 60 number, so i use one function
    set24(hourSpan, date.getHours());
    set30(daySpan, date.getDate());
    set12(monthSpan, date.getMonth() + 1);
    set4(weekSpan, getWeek(date));
    const eachSecond = setInterval(() => {
        date = new Date();
        incre60(secSpan, date.getSeconds());
        incre60(minSpan, date.getMinutes());
        incre24(hourSpan, date.getHours());
        incre30(daySpan, date.getDate());
        incre12(monthSpan, date.getMonth() + 1);
        incre4(weekSpan, getWeek(date));
    }, 1000);
});

function setTransition(nodeList) {
    $.each(nodeList, function (index, elem) {
        $(elem).css("transition", "0.5s");
    });
}

function set60(nodeList, second) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6; // (360 / 60)
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });

    // Nếu thêm transition ngay từ đầu thì vừa load trang xong sẽ bu từ 1 cục r tản ra
    // After set correct position, set transition
    // Có thể sử dụng promise mà k cần sử dụng setTimeout, mục đích chính là sau khi sét giờ xong thì nhét transition vào
    setTimeout(() => {
        setTransition(nodeList);
    }, 500);

}

function incre60(nodeList, second) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6; // (360 / 60)
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function set24(nodeList, hour) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (hour - deg) * 15; // (360 / 24);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });

    setTimeout(() => {
        setTransition(nodeList);
    }, 500);
}

function incre24(nodeList, hour) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (hour - deg) * 15; // (360 / 24);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function set30(nodeList, day) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (day - deg) * 12; // (360 / 30);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });

    setTimeout(() => {
        setTransition(nodeList);
    }, 500);
}

function incre30(nodeList, day) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (day - deg) * 12; // (360 / 30);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function set12(nodeList, month) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (month - deg) * 30; // (360 / 12);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });

    setTimeout(() => {
        setTransition(nodeList);
    }, 500);
}

function incre12(nodeList, month) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (month - deg) * 30; // (360 / 12);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function set4(nodeList, week) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (week - deg) * 30; // (360 / 12);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function incre4(nodeList, week) {
    $.each(nodeList, function (index, elem) {
        let deg = parseInt(elem.dataset.value);
        deg = (week - deg) * 30; // (360 / 12);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function getWeek(date) {
    let monthStart = new Date(date);
    monthStart.setDate(0);
    let offset = (monthStart.getDay() + 1) % 7 - 1; // -1 is for a week starting on Monday
    return Math.ceil((date.getDate() + offset) / 7);
}