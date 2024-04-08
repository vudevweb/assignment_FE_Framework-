app.controller('registerCtrl', function ($scope, $http, $interval) {
    document.getElementById('subRegister').innerText = "Đăng ký";
    document.getElementById('subRegister').disabled = false;
    var allStudents = [];
    $interval(getStudent, 500);
    
    $scope.register = function () {
        document.getElementById('subRegister').innerText = "Đang đăng ký...";
        document.getElementById('subRegister').disabled = true;
        if (!$scope.confirm_web) {
            sweetAlert('Oops...', 'Bạn chưa chấp thuận điều khoản!', 'error');
            return;
        }
        if (allStudents.find(s => s.email === $scope.email)) {
            sweetAlert('Oops...', 'Email đã được sử dụng!', 'error');
            return;
        }
        if (allStudents.find(s => s.username === $scope.username)) {
            sweetAlert('Oops...', 'Tên đăng nhập được sử dụng!', 'error');
            return;
        }

        const NewStudent = {
            username: $scope.username,
            fullname: $scope.fullname,
            email: $scope.email,
            password: $scope.password,
            studentData: {
                gender: "0",
                birthday: "1995-12-21",
                schoolfee: "0",
                marks: "0"
            }
        };
        const formData = new FormData();
        formData.append("entry.844801447", NewStudent.username);
        formData.append("entry.1767309272", NewStudent.fullname);
        formData.append("entry.1548282103", NewStudent.email);
        formData.append("entry.1752634304", NewStudent.password);
        formData.append("entry.1747767736", JSON.stringify(NewStudent.studentData));

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSc6dAVKHWwlZW8P2Iyg7W1gfAimnmkjsMJA7QAS4EMvetxP4A/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors",
        })
        .then(function(response) {
            sweetAlert('Good job!', 'Đăng ký thành công', 'success');
            document.getElementById('subRegister').innerText = "Đăng ký";
            document.getElementById('subRegister').disabled = false;
            setTimeout(function() {
                window.location.reload();
            }, 1500);
        })
        .catch(function(error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            sweetAlert('Oops...', 'Có lỗi xảy ra khi gửi dữ liệu!', 'error');
            document.getElementById('subRegister').innerText = "Đăng ký";
            document.getElementById('subRegister').disabled = false;
        });
    };

    function getStudent() {
        $http.get("https://script.google.com/macros/s/AKfycbzZQZEf9Ihj65kxx96x2YnPNFmgmiD1YYtHMjBR4lN383Dx9N8m5Bnmn9foLNmy_F21/exec")
        .then(
            function(response) {
                allStudents = response.data.students;
            },
            function(error) {
                console.error('Lỗi lấy students:', error);
                sweetAlert('Oops...', 'Có lỗi xảy ra khi lấy dữ liệu students!', 'error');
            }
        );
    }
});
