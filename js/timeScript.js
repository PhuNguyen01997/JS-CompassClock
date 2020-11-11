$(document).ready(function () {
    var date = new Date();
    const secSpan = $(".compass-clock__item--second");
    const minSpan = $(".compass-clock__item--minute");
    const hourSpan = $(".compass-clock__item--hour");
    set60(secSpan, date.getSeconds());
    set60(minSpan, date.getMinutes()); // Because both second and minute have 60 number, so i use one function
    set24(hourSpan, date.getHours());
    const eachSecond = setInterval(() => {
        date = new Date();
        incre60(secSpan, date.getSeconds());
        incre60(minSpan, date.getMinutes());
    }, 1000);
    const eachMinute = setInterval(() => {
        date = new Date();
        incre24(hourSpan, date.getHours());
    }, 1000*60);
});

function setTransition(nodeList) {
    $.each(nodeList, function (index, elem) {
        $(elem).css("transition", "0.5s");
    });
}

function set60(nodeList, second) {
    $.each(nodeList, function (index, elem) {
        deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6; // (360 / 60)
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });

    // Nếu thêm transition ngay từ đầu thì vừa load trang xong sẽ bu từ 1 cục r tản ra
    // After set correct position, set transition
    // Có thể sử dụng promise mà k cần sử dụng setTimeout, mục đích chính là sau khi sét giờ xong thì nhét transition vào
    setTimeout(()=>{
        setTransition(nodeList);
    },500);

}

function incre60(nodeList, second) {
    $.each(nodeList, function (index, elem) {
        deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6; // (360 / 60)
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}

function set24(nodeList, hour){
    $.each(nodeList, function(index, elem){
        deg = parseInt(elem.dataset.value);
        deg = (hour - deg) * 15; // (360 / 24);
        $(elem).css("transform", "rotate(" + deg + "deg)");
        console.log(elem)
    });

    setTimeout(()=>{
        setTransition(nodeList);
    },500);
}

function incre24(nodeList, second) {
    $.each(nodeList, function (index, elem) {
        deg = parseInt(elem.dataset.value);
        deg = (hour - deg) * 15; // (360 / 24);
        $(elem).css("transform", "rotate(" + deg + "deg)");
    });
}