app.controller('khoaHocCtrl', function($scope, $routeParams , $http, $location) {
    $scope.id_khoahoc = $routeParams.id_khoahoc;
    console.log($scope.id_khoahoc);

    $scope.monhoc = [];
    $http.get('app/db/Subjects.js').then(
        function(response) {
            $scope.monhoc = response.data;
            console.log(response.data);

            // Filter the monhoc array based on id_kh
            $scope.monhoc = $scope.monhoc.filter(function(item) {
                return item.id_kh === $scope.id_khoahoc;
            });

        console.log($scope.monhoc);
        },
        function(error) {
            alert('Error fetching khoahoc');
            console.error(error);
        }
    );

});
