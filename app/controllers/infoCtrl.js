app.controller('infoCtrl', function ($scope, $rootScope, $http, $interval) {

    $scope.checkLogin()
    $scope.infoData = [];
    $scope.dataV = [];

    $scope.updateInfo = function () {
        document.getElementById('subUpdate').innerText = "Đang lưu thông tin...";
        document.getElementById('subUpdate').disabled = true;
        const NewStudent = {
            username: $rootScope.studentsLogin.username,
            fullname:  $rootScope.studentsLogin.fullname,
            email:  $rootScope.studentsLogin.email,
            PUT:  $rootScope.studentsLogin.ID,
            studentData: {
                gender: $rootScope.studentData.gender,
                birthday: $rootScope.studentData.birthday,
                schoolfee: "0",
                marks: "0"
            }
        };
        const formData = new FormData();
        formData.append("entry.844801447", NewStudent.username);
        formData.append("entry.1767309272", NewStudent.fullname);
        formData.append("entry.1548282103", NewStudent.email);
        formData.append("entry.2146709005", NewStudent.PUT);
        formData.append("entry.1747767736", JSON.stringify(NewStudent.studentData));

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSc6dAVKHWwlZW8P2Iyg7W1gfAimnmkjsMJA7QAS4EMvetxP4A/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors",
        })
            .then(function (response) {
                $http.get(`https://script.google.com/macros/s/AKfycbzZQZEf9Ihj65kxx96x2YnPNFmgmiD1YYtHMjBR4lN383Dx9N8m5Bnmn9foLNmy_F21/exec?id=${$rootScope.studentsLogin.ID}`)
                .then(
                    function(response) {
                        $rootScope.studentsLogin = response.data.students;
                        sessionStorage.setItem('studentsLogin', JSON.stringify($rootScope.studentsLogin));
                    })
                .catch(function(error) {
                    alert('lỗi lấy student data');
                    console.error(error);
                });

                sweetAlert('Good job!', 'Cập nhật thành công', 'success');
                document.getElementById('subUpdate').innerText = "Lưu";
                document.getElementById('subUpdate').disabled = false;
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
                sweetAlert('Oops...', 'Có lỗi xảy ra khi gửi dữ liệu!', 'error');
                document.getElementById('subUpdate').innerText = "Lưu";
                document.getElementById('subUpdate').disabled = false;
            });
        
    }
    $scope.updatePass = function () {
        console.log($scope.passOld);
        console.log($scope.passNew);
        document.getElementById('subChangePass').innerText = "Đang thay đổi mật khẩu..";
        document.getElementById('subChangePass').disabled = true;

        fetch(`https://script.google.com/macros/s/AKfycbzZQZEf9Ihj65kxx96x2YnPNFmgmiD1YYtHMjBR4lN383Dx9N8m5Bnmn9foLNmy_F21/exec?id_change=${$rootScope.studentsLogin.ID}&passOld=${$scope.passOld}&passNew=${$scope.passNew}`, {
            method: "GET",
            mode: "cors"
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Lỗi change password');
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data.students);
            if(data.students.status == true) {
                sweetAlert('Good job!', data.students.message, 'success');
                document.getElementById('subChangePass').innerText = "Lưu";
                document.getElementById('subChangePass').disabled = false;
            } else {
                sweetAlert('Oops...', data.students.message, 'error');
                document.getElementById('subChangePass').innerText = "Lưu";
                document.getElementById('subChangePass').disabled = false;
            }
        })
        .catch(function(error) {
            console.error('Error changing password:', error);
            alert('Error changing password');
            document.getElementById('subChangePass').innerText = "Lưu";
            document.getElementById('subChangePass').disabled = false;
        });
    }

})