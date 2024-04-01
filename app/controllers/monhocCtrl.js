app.controller('monhocCtrl', function ($scope, $routeParams,$window, $http, $location, $interval) {
    $scope.id_monhoc = $routeParams.id_monhoc;
    $scope.id_khoahoc = $routeParams.id_khoahoc;

    console.log($scope.id_monhoc);
    console.log($scope.id_khoahoc);

    $scope.ctmonhoc = [];
    $scope.name_monhoc = '';

        $http.get('app/db/Subjects.js').then(
        function (response) {
            $scope.ctmonhoc = response.data;
            $scope.ctmonhoc = $scope.ctmonhoc.filter(function (item) {
                return item.id === $scope.id_monhoc.toUpperCase();
            });
            $scope.ctmonhoc.forEach(element => {
                $scope.ctmonhoc = element;
            });
            $scope.name_monhoc = $scope.ctmonhoc.name;
            // console.log($scope.ctmonhoc);
            // console.log($scope.render_slug($scope.name));
        },
        function (error) {
            alert('Error fetching khoahoc');
            console.error(error);
        }
    );


    // quiz
    $scope.cauhoi = [];

    $http.get(`app/db/Quizs/${$scope.id_monhoc.toUpperCase()}.js`).then(
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
        console.log(id_dapan);
        console.log(id_dapan_dung);
        console.log(diem_cauhoi);
        
        if (id_dapan === id_dapan_dung) {
            $scope.diem += diem_cauhoi;
        }
    };

});
