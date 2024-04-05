app.controller('myCtrl', function ($scope, $rootScope, $http) {

    $scope.checkLogin = function () {
        if (localStorage.getItem('loginStatus') !== null && localStorage.getItem('loginUser') !== null) {
            $rootScope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
            $rootScope.loginUser = localStorage.getItem('loginUser');
            $http.get('https://script.googleusercontent.com/macros/echo?user_content_key=JEvUjlBG1TF2H6nV77X8pLHBSuYMp6XH80Htuf65FxIKFG0F3nn6iTtuzMlbynOzE0FMQqfIxf5qGQTe-ZQ4aUvmSbt4MNclm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMz4LoX8NF_K-H_k2WBhwUarxTI48_XXpzc73GOdQcSdmV9uPz0aHd3o39o_wP-4lT4hx67IudfHx3CydV6ibpq8cv7vWJ9jUQ&lib=MR0AMw1N36E_iAbBYDudxPmXkymKAe4BL')
                .then(
                    function(response) {
                        $rootScope.studentsLogin = response.data;
                        $rootScope.studentsLogin = $rootScope.studentsLogin.find(function(student) {
                            return student.email === $rootScope.loginUser;
                        });
                        // console.log($rootScope.studentsLogin);
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
