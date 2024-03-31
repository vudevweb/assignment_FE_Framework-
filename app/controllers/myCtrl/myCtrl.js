app.controller('myCtrl', function($scope, $rootScope, $http, $location) {
    $scope.khoahoc = [];

    $http.get('app/db/Khoahoc.js').then(
        function(response) {
            $scope.khoahoc = response.data;
            console.log(response.data);
        },
        function(error) {
            alert('Error fetching khoahoc');
            console.error(error);
        }
    );
});
