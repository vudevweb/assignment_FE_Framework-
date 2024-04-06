app.controller('myCtrl', function ($scope, $rootScope, $http) {

    $scope.checkLogin = function () {
        if (sessionStorage.getItem('loginStatus') != false && sessionStorage.getItem('loginUser') != null) {
            $rootScope.loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
            $rootScope.loginID = sessionStorage.getItem('loginUser');
            $http.get('http://localhost/fe_framework/api/students/find.php?id_students='+ $rootScope.loginID)
                .then(
                    function(response) {
                        $rootScope.studentsLogin = response.data;
                        // console.log($rootScope.studentsLogin);
                    },
                    function(error) {
                        alert('lỗi lấy data students');
                        console.error(error);
                    }
                );
        
        } else {
            $rootScope.loginStatus = false;
            $rootScope.loginID = null;
        }
    }

    $scope.checkLogin();
    
    console.log($rootScope.loginID);
    console.log($rootScope.loginStatus);

    $scope.logOut = function () {
        sessionStorage.setItem('loginStatus', false);
        sessionStorage.clear();
        window.location.href = "#!login";
        window.location.reload();
    }
});
