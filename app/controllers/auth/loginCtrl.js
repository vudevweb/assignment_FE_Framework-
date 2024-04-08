app.controller('loginCtrl', function($scope, $http , $rootScope) {
    document.getElementById('subLogin').innerText = "Đăng nhập"
    document.getElementById('subLogin').disabled = false;
    $scope.login = function() {
        document.getElementById('subLogin').innerText = "Đang đăng nhập...";
        document.getElementById('subLogin').disabled = true;        
        $http.get(
            `https://script.google.com/macros/s/AKfycbzZQZEf9Ihj65kxx96x2YnPNFmgmiD1YYtHMjBR4lN383Dx9N8m5Bnmn9foLNmy_F21/exec?username=${$scope.username}&password=${$scope.password}`
        )
            .then(
                function(response) {
                    let students = response.data.students;
                    if(students.status == true) {
                        sweetAlert('Good jod!',students.message,'success');
                        sessionStorage.setItem('studentsLogin', JSON.stringify(students.student));
                        document.getElementById('subLogin').innerText = "Đăng nhập"
                        document.getElementById('subLogin').disabled = false;  
                        setTimeout(() => window.location.href = "#!home" , 1500 )
                    } else {
                        sweetAlert('Oops...',students.message,'error');
                        document.getElementById('subLogin').innerText = "Đăng nhập"
                        document.getElementById('subLogin').disabled = false;  
                    }
                },
                function(error) {
                    alert('Lỗi lấy students');
                    console.error(error);
                }
        );
    };
    
});

