app.controller('activeLinkCtrl', ['$scope', '$location', function($scope, $location) {
    // $scope.loadActive = function() {
    //     let baseUrl = $location.path().replace(/\//g, "");
    //     let a = document.getElementsByClassName('navlink_cus');
    //     for (let i = 0; i < a.length; i++) {
    //         let url_cus = a[i].getAttribute('href');
    //         let hashIndex = url_cus.indexOf("!") + 1;
    //         let link = hashIndex !== -1 ? url_cus.slice(hashIndex) : '';
    //         if (link === baseUrl) {
    //             a[i].classList.add('active');
    //         } else {}
    //     }
    // }
}]);
