app.controller('monhocTestCtrl', function ($scope, $routeParams, $window, $http, $interval) {
    $scope.id_monhoc = $routeParams.id_monhoc;
    $scope.id_khoahoc = $routeParams.id_khoahoc;

    $scope.ctmonhoc = {};
    $scope.name_monhoc = '';

    $http.get('app/db/Subjects.js').then(
        function (response) {
            $scope.ctmonhoc = response.data.find(function (item) {
                return item.id === $scope.id_monhoc.toUpperCase();
            });

            if ($scope.ctmonhoc) {
                $scope.name_monhoc = $scope.ctmonhoc.name;
            } else {
                console.error('Subject not found');
            }
        },
        function (error) {
            console.error('Lấy data môn học thất bại:', error);
            alert('Lấy data môn học thất bại!');
        }
    );
    // ===========================================================================================


    // trang quiz
    $scope.diem = 0;
    $scope.tong_cau_hoi = 0;
    $scope.start = 0;
    $scope.tien_do = 0;
    var timer;
    $scope.thoi_gian = 500000;
    $scope.so_cau_dung = 0;

    $scope.btn_prev = false;
    $scope.btn_next = true;
    $scope.result = false;
    $scope.quiz = false;
    $scope.status_start = false;

    $scope.start = 0;
    $scope.pageSize = 1;

    $scope.data_ch = []

    $http.get(`app/db/Quizs/${$scope.id_monhoc.toUpperCase()}.js`).then(
        function (response) {
            $scope.data_ch = response.data.slice(0, 5);;
            $scope.tong_cau_hoi = $scope.data_ch.length
            $scope.tien_do = (1 / $scope.tong_cau_hoi) * 100;

            console.log($scope.data_ch);
        },
        function (error) {
            alert('Ko lấy được quiz');
            console.error(error);
        }
    );

    
    $scope.start = function () {
        $scope.diem = 0;
        $scope.status_start = false;
        $scope.quiz = true;
        $scope.result = false;
        $scope.startTimer();
    }

    $scope.reset = function () {
        $scope.status_start = true;
        $scope.quiz = false;
        $scope.result = false;
        $scope.stopTimer();
    }

    $scope.show_result = function (type) {
        if (type == "btn") {
            var confirm_m = $window.confirm('Bạn chắc chắn muốn nộp bài ?');
            if (confirm_m) {
                $scope.stopTimer();
                $scope.check_dap_an()
                $scope.status_start = false;
                $scope.quiz = false;
                $scope.result = true;
            }
        } else if (type == 'het_time') {
            $scope.stopTimer();
            $scope.check_dap_an()
            $scope.status_start = false;
            $scope.quiz = false;
            $scope.result = true;
        }
    };

    $scope.startTimer = function () {
        timer = $interval(function () {
            if ($scope.thoi_gian <= 0) {
                $interval.cancel(timer);
                var confirmed = $window.confirm('Hết thời gian làm bài!');
                if (confirmed) {
                    $scope.show_result('het_time');
                }
            } else {
                $scope.thoi_gian--;
            }
        }, 1000);
    }

    $scope.stopTimer = function () {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }


    // $scope.check_dap_an = function () {
    //     if (!$(`input[name=dap_an_cau_hoi]:checked`).length) return
    //     var ans = $(`input[name=dap_an_cau_hoi]:checked`).val();
    //     if (ans == $scope.dap_an_dung) {
    //         $scope.diem += $scope.diem_cau_hoi;
    //         $scope.so_cau_dung++;
    //         console.log($scope.diem);
    //     } else {
    //         console.log($scope.diem);
    //     }
    // }

    $scope.prev = function () {
        if ($scope.start > 0) {
            $scope.start -= $scope.pageSize;
            $scope.tien_do = (($scope.start+1) / $scope.tong_cau_hoi) * 100;
        }
    };

    $scope.next = function () {
        if ($scope.start < $scope.tong_cau_hoi - $scope.pageSize) {
            $scope.start += $scope.pageSize;
            $scope.tien_do = (($scope.start+1) / $scope.tong_cau_hoi) * 100;
        }
    };

    $scope.reset();

});

