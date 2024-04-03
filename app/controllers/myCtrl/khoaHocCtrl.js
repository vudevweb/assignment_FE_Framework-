app.controller('khoaHocCtrl', function($scope, $routeParams , $http, $location) {
    $scope.id_khoahoc = $routeParams.id_khoahoc;
    // console.log($scope.id_khoahoc);

    $scope.monhoc = [];
    $http.get('app/db/Subjects.js').then(
        function(response) {
            $scope.monhoc = response.data;
            // console.log(response.data);
            $scope.monhoc = $scope.monhoc.filter(function(item) {
                return item.id_kh === $scope.id_khoahoc.toUpperCase();
            });
        },
        function(error) {
            alert('lỗi lấy khóa học');
            console.error(error);
        }
    );

});
