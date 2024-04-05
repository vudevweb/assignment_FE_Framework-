app.controller('registerCtrl', function ($scope, $rootScope, $http) {
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.fullname = '';
    $scope.confirmPassword = '';
    $scope.confirm_web = false;

    $scope.post_google = function (data) {
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfjK3fnVikH1sBxcD6_2MXENj-HKd3taRmMT_idmLmYBLfsyw/formResponse';
        const formData = new URLSearchParams();
        formData.append('entry.299610788', data.username);
        formData.append('entry.586450425', data.password);
        formData.append('entry.39357315', data.fullname);
        formData.append('entry.260274691', data.email);

        fetch(formUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi submit data');
                }
                console.log('Tạo tài khoản thành công');
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
    };

    $scope.register = function () {
        if (!$scope.confirm_web) {
            alert('Bạn chưa đồng ý với điều khoản dịch vụ của chúng tôi!');
            return;
        }

        // Create data object
        var data = {
            username: $scope.username,
            password: $scope.password,
            fullname: $scope.fullname,
            email: $scope.email
        };
        console.log(data);
        $scope.post_google(data);
        alert('Tạo tài khoản thành công');
        window.location.reload();
    };
});
