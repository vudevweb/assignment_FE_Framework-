app.controller('activeLinkCtrl', function($scope, $location, $window) {
    var actlinks = document.querySelectorAll('.navlink_cus');
    for (var i = 0; i < actlinks.length; i++) {
        actlinks[i].addEventListener('click', function() {
            for (var j = 0; j < actlinks.length; j++) {
                actlinks[j].classList.remove('active');
            }
            this.classList.add('active');
            if ($window.scrollY > 0) {
                $window.scrollTo(0,0);
            }
        });
    }
});
