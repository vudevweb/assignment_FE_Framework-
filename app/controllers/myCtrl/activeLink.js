app.controller('activeLinkCtrl', function($scope, $location, $window) {
    $scope.loadActive = function() {
        if($window.scrollY > 0) {
            // Scroll back to the top
            $window.scrollTo(0, 0);
        }
    }
});

