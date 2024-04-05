app.controller('loginCtrl', function($scope, $rootScope, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.rememberMe = false;

    $http.get('https://script.googleusercontent.com/macros/echo?user_content_key=JEvUjlBG1TF2H6nV77X8pLHBSuYMp6XH80Htuf65FxIKFG0F3nn6iTtuzMlbynOzE0FMQqfIxf5qGQTe-ZQ4aUvmSbt4MNclm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMz4LoX8NF_K-H_k2WBhwUarxTI48_XXpzc73GOdQcSdmV9uPz0aHd3o39o_wP-4lT4hx67IudfHx3CydV6ibpq8cv7vWJ9jUQ&lib=MR0AMw1N36E_iAbBYDudxPmXkymKAe4BL')
        .then(
            function(response) {
                $scope.students = response.data;
                // console.log($scope.students);
            },
            function(error) {
                alert('Lỗi lấy students');
                console.error(error);
            }
    );

    $scope.login = function() {
        const student = $scope.students.find(s => s.username === $scope.username);
        if (student && student.password == $scope.password) {
            alert('Đăng nhập thành công');
            localStorage.setItem('loginUser', student.username);
            localStorage.setItem('loginStatus', true);
            $rootScope.studentsLogin = student;
            window.location.href = "#!home";
        } else {
            alert('Đăng nhập thất bại');
        }
    };
});

