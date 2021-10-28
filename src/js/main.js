$(document).ready(function () {

    $(function(){
        $(".black-square").click(function() {
            $(".header__menu").fadeToggle();
            $(".black-square__img").css({"src": "none"})
        });
    });

    $(window).resize(function() {
        if ($(window).width() >= '769'){
            $(".header__menu").css({"display": "flex"});
        } else if ($(window).width() <= '768') {
            $(".header__menu").css({"display": "none"});
            $(".black-square__img").attr("src", "dist/img/line3.png");
            flag = 0;
        }

    });

    flag = 0;

    $(".black-square").on("click", function() {

        if (flag == 0) {
            $(".black-square__img").attr("src", "dist/img/line.png");
            flag = 1;
        } else {
            $(".black-square__img").attr("src", "dist/img/line3.png");
            flag = 0;
        }

        console.log(flag);
    });


});