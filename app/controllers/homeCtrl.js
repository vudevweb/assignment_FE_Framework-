app.controller('homeCtrl', function ($rootScope, $scope , $http) {
    $scope.checkLogin();
    $scope.khoahoc = [];
    $http.get('app/db/Khoahoc.js').then(
        function (response) {
            $scope.khoahoc = response.data;
        },
        function (error) {
            alert('lỗi lấy data');
            console.error(error);
        }
    );
})