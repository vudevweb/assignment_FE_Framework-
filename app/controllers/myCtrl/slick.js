app.controller('slickCtrl1', ($scope) => {
    $(document).ready(function () {
        
        // $('.autoplay').slick({
        //     slidesToShow: 4,
        //     slidesToScroll: 1,
        //     autoplay: true,
        //     autoplaySpeed: 2000,
        //     infinite: true,
        //     draggable: true,
        //     pauseOnHover: true,
        // });
    
        $('.slide-hd').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            draggable: true,
            pauseOnHover: true,
        });
    });
})
