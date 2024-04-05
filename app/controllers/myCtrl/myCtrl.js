app.controller('myCtrl', function ($scope, $rootScope, $http) {
    // $rootScope.studentsLogin = []
    if (localStorage.getItem('loginStatus') !== null && localStorage.getItem('loginUser') !== null) {
        $rootScope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        $rootScope.loginUser = localStorage.getItem('loginUser');
        $http.get('https://script.google.com/macros/s/AKfycbzw7jDynEFui86xZR0cFibv15BeVDcpp-Vuw2sWtqnTj4lN8Oka2LyINjTI4yoUVWMD/exec')
            .then(
                function(response) {
                    $rootScope.studentsLogin = response.data;
                    $rootScope.studentsLogin = $rootScope.studentsLogin.find(function(student) {
                        return student.email === $rootScope.loginUser;
                    });
                    console.log($rootScope.studentsLogin);
                },
                function(error) {
                    alert('lỗi lấy data students');
                    console.error(error);
                }
            );
    
    } else {
        $rootScope.loginStatus = false;
        $rootScope.loginUser = false;
    }
    
    console.log($rootScope.loginUser);
    console.log($rootScope.loginStatus);

    $scope.logOut = function () {
        localStorage.setItem('loginStatus', 'false');
        localStorage.clear();
        window.location.href = "#!login";
        window.location.reload();
    }
});
