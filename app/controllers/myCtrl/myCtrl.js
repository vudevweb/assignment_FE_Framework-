app.controller('myCtrl', function ($scope, $rootScope, $http) {

    $scope.checkLogin = function () {
        if (localStorage.getItem('loginStatus') != 'false' && localStorage.getItem('loginUser') !== null) {
            $rootScope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
            $rootScope.loginUser = localStorage.getItem('loginUser');
            $http.get('https://api.vudevweb.com/api/students/read.php')
                .then(
                    function(response) {
                        $rootScope.studentsLogin = response.data.students;
                        $rootScope.studentsLogin = $rootScope.studentsLogin.find(function(student) {
                            return student.id === $rootScope.loginUser;
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
    }

    $scope.checkLogin();
    
    console.log($rootScope.loginUser);
    console.log($rootScope.loginStatus);

    $scope.logOut = function () {
        localStorage.setItem('loginStatus', 'false');
        localStorage.clear();
        window.location.href = "#!login";
        window.location.reload();
    }
});
