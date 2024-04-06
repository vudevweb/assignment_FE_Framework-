
app.controller('registerCtrl', function ($scope, $rootScope, $http) {
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.fullname = '';
    $scope.confirm_web = false;
    $scope.register = function () {
        if (!$scope.confirm_web) {
            alert('Bạn chưa chấp thuận điều khoản!');
            return;
        }

        var Fdata = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            fullname: $scope.fullname,
            gender: 'false',
            birthday: 0,
            schoolfee: 0,
            marks: 0
        };

        $http.post("http://localhost/fe_framework/api/students/create.php", Fdata)
            .then(function (response) {
                console.log(response.data);
                if(response.data.status) {
                    alert('Đăng kí thành công')
                } else {
                    alert('Đăng kí thất bại')
                }
            })
            .catch(function (error) {
                console.error('Lỗi:', error);
            });
    }

});
