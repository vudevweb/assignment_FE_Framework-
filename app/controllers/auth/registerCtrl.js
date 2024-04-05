
app.controller('registerCtrl', function ($scope, $rootScope, $http) {
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.fullname = '';
    $scope.password_2 = '';
    $scope.confirm_web = false;
    $scope.register = function () {
        if (!$scope.confirm_web) {
            alert('Bạn chưa chấp thuận điều khoản!');
            return;
        }

        var requestData = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            fullname: $scope.fullname,
            gender: false,
            birthday: 0,
            schoolfee: 0,
            marks: 0
        };
        const postData = async () => {
            try {
                const response = await fetch(`http://localhost/fe_framework/api/students/create.php`, {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
                const responseData = await response.json();
                console.log(responseData);
                return responseData
            } catch (error) {
                console.log(error);
            }
        }
        postData()
        // $http.post("", requestData)
        //     .then(function (response) {
        //         console.log(response.data); // Log the response data
        //     })
        //     .catch(function (error) {
        //         console.error('Error occurred:', error); // Log any errors
        //     });
    }

});
