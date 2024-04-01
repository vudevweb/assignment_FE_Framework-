app.controller('quizCtrl', function ($scope, $http, $window, $routeParams, $interval) {
    $scope.id_monhoc = $routeParams.id_monhoc.toUpperCase();
    $scope.id_khoahoc = $routeParams.id_khoahoc;

    console.log($scope.id_monhoc);
    $scope.cauhoi = [];

    $http.get(`app/db/Quizs/${$scope.id_monhoc}.js`).then(
        function (response) {
            $scope.cauhoi = response.data;
            console.log($scope.cauhoi);
        },
        function (error) {
            console.error('Error fetching quiz data:', error);
            alert('Error fetching quiz data');
        }
    );

    $scope.start = 0;
    $scope.pageSize = 1;

    $scope.prev = function () {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
        }
    };

    $scope.next = function () {
        if ($scope.start < ($scope.cauhoi.length - $scope.pageSize)) {
            $scope.start += $scope.pageSize;
        }
    };

    $scope.thoigian = 300; // 300 seconds = 5 minutes
    var timer = $interval(function () {
        if ($scope.thoigian <= 0) {
            $interval.cancel(timer);
            var confirmed = $window.confirm('Hết thời gian làm bài!');
            if (confirmed) {
                $window.location.href = '/android';
            }
        } else {
            $scope.thoigian--;
        }
    }, 1000);

    $scope.diem = 0;
    $scope.check_cautraloi = function (id_dapan, id_dapan_dung, diem_cauhoi) {
        console.log('test');
        
        if (id_dapan === id_dapan_dung) {
            $scope.diem += diem_cauhoi;
        }
    };
});
