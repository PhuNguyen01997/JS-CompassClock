$(document).ready(function () {
    var date = new Date();
    const secSpan = $(".compass-clock__second-item");
    setSecond(secSpan, date.getSeconds());
    const eachSecond = setInterval(() => {
        date = new Date();
        const second = date.getSeconds();
        increSecond(secSpan, second);
    }, 1000);

    
});

function setSecond(secSpan, second){
    // second = 5;
    $.each(secSpan, function (index, elem) { 
        deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6;
        $(elem).css("transform","rotate(" + deg + "deg)");
    });

    // Nếu thêm transition ngay từ đầu thì vừa load trang xong sẽ bu từ 1 cục r tản ra
    // After set correct position, set transition

    setTimeout(()=>{ // Có thể sử dụng promise mà k cần sử dụng setTimeout, mục đích chính là sau khi sét giờ xong thì nhét transition vào
        $.each(secSpan, function (index, elem) { 
            $(elem).css("transition","0.5s");
        });
    }, 500);
}

function increSecond(secSpan, second){
    $.each(secSpan, function (index, elem) { 
        deg = parseInt(elem.dataset.value);
        deg = (second - deg) * 6;
        $(elem).css("transform","rotate(" + deg + "deg)");
        console.log("run");
    });
}