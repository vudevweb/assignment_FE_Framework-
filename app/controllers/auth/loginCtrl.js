app.controller('loginCtrl', function($scope, $rootScope, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.rememberMe = false;

    $http.get('http://localhost/fe_framework/api/students/read.php')
        .then(
            function(response) {
                $scope.students = response.data.students;
                console.log($scope.students);
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
            localStorage.setItem('loginUser', student.id);
            localStorage.setItem('loginStatus', true);
            $rootScope.studentsLogin = student;
            window.location.href = "#!home"; 
        } else {
            alert('Đăng nhập thất bại');
        }
    };
    
});

