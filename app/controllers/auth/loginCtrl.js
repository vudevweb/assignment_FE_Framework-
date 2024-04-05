app.controller('loginCtrl', function($scope, $rootScope, $http ) {
    $scope.email = '';
    $scope.password = '';
    $scope.rememberMe = false;

    $http.get('https://script.google.com/macros/s/AKfycbzw7jDynEFui86xZR0cFibv15BeVDcpp-Vuw2sWtqnTj4lN8Oka2LyINjTI4yoUVWMD/exec')
    .then(
        function(response) {
            $scope.students = response.data; 
            // console.log($scope.students);
        },
        function(error) {
            alert('Error fetching students');
            console.error(error);
        }
    );    

    $scope.login = () => {
        const student = $scope.students.find(s => s.email === $scope.email);
        if (student && student.password === $scope.password) {
            alert('Đăng nhập thành công');
            localStorage.setItem('loginUser', `${student.email}`);
            localStorage.setItem('loginStatus', 'true');
            $rootScope.studentsLogin = student
            window.location.href="#!home";
            window.location.reload();

        } else {
            alert('Đăng nhập thất bại');
        }
    };
});
