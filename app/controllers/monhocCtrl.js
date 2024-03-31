app.controller('monhocCtrl', function ($scope, $routeParams, $http, $location) {
    $scope.id_monhoc = $routeParams.id_monhoc;
    $scope.id_khoahoc = $routeParams.id_khoahoc;

    console.log($scope.id_monhoc);
    console.log($scope.id_khoahoc);

    $scope.ctmonhoc = [];
    $scope.name = '';

    $http.get('app/db/Subjects.js').then(
        function (response) {
            $scope.ctmonhoc = response.data;
            $scope.ctmonhoc = $scope.ctmonhoc.filter(function (item) {
                return item.id === $scope.id_monhoc.toUpperCase();
            });
            $scope.ctmonhoc.forEach(element => {
                $scope.ctmonhoc = element;
            });
            $scope.name = $scope.ctmonhoc.name;
            console.log($scope.name);
            console.log($scope.render_slug($scope.name));
        },
        function (error) {
            alert('Error fetching khoahoc');
            console.error(error);
        }
    );


});
