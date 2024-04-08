app.controller('myCtrl', function ($scope, $rootScope, $http , $interval) {
    // $rootScope.studentsLogin = [];
    // $rootScope.studentData = [];
    $scope.checkLogin = function () {
        var login = sessionStorage.getItem('studentsLogin');
        if (login != null) {
            $rootScope.loginStatus = true;
            $rootScope.studentsLogin = JSON.parse(login);
            // console.log($rootScope.studentsLogin);
            $rootScope.studentData = $rootScope.studentsLogin.studentData;
            $rootScope.studentData = JSON.parse($rootScope.studentData)
            // console.log($rootScope.studentData);
    
            $http.get(`https://script.google.com/macros/s/AKfycbzZQZEf9Ihj65kxx96x2YnPNFmgmiD1YYtHMjBR4lN383Dx9N8m5Bnmn9foLNmy_F21/exec?id=${$rootScope.studentsLogin.ID}`)
            .then(
                function(response) {
                    $rootScope.studentsLogin = response.data.students;
                    // console.log($rootScope.studentsLogin);
                    sessionStorage.setItem('studentsLogin', JSON.stringify($rootScope.studentsLogin));
                })
            .catch(function(error) {
                alert('Error fetching student data');
                console.error(error);
            });
        } else {
            $rootScope.loginStatus = false;
        }
    };
    
    $scope.checkLogin()
    $scope.logOut = function () {
        sessionStorage.clear();
        window.location.href = "#!login";
        window.location.reload();
    };
});
