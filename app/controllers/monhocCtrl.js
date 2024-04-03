app.controller('monhocCtrl', function ($scope, $routeParams, $window, $http, $interval) {
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
    $scope.id_hien_tai = 0;
    $scope.tien_do = 0;
    $scope.thoi_gian = 10;
    $scope.so_cau_dung = 0;

    $scope.btn_prev = false;
    $scope.btn_next = true;
    $scope.result = false;
    $scope.quiz = false;
    $scope.status_start = false;

    $scope.cau_hoi = '';
    $scope.diem_cau_hoi = '';
    $scope.dap_an_dung = '';
    $scope.dap_an = [];

    var timer;

    $scope.start = function () {
        $scope.diem = 0;
        $scope.status_start = false;
        $scope.quiz = true;
        $scope.result = false;
        $scope.get_cauhoi();
        $scope.startTimer();
        $scope.tien_do = ((1 / $scope.tong_cau_hoi) * 100);
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
                // console.log($scope.thoi_gian);
            }
        }, 1000);
    }

    $scope.stopTimer = function () {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }

    $scope.get_cauhoi = function () {
        if ($scope.id_hien_tai > 0) {
            $scope.btn_prev = true;
        } else { $scope.btn_prev = false; }

        if ($scope.id_hien_tai + 1 == $scope.tong_cau_hoi) {
            $scope.btn_next = false;
        } else { $scope.btn_next = true; }

        $http.get(`app/db/Quizs/${$scope.id_monhoc.toUpperCase()}.js`).then(
            function (response) {
                var data_chvip = response.data.slice(0, 5);;
                $scope.tong_cau_hoi = data_chvip.length
                var data = data_chvip[$scope.id_hien_tai];
                $scope.cau_hoi = data.Text;
                $scope.diem_cau_hoi = data.Marks;
                $scope.dap_an_dung = data.AnswerId;
                $scope.dap_an = data.Answers;

                // console.log(data.Text);
            },
            function (error) {
                alert('Ko lấy được khóa học');
                console.error(error);
            }
        );
    }

    $scope.check_dap_an = function () {
        if (!$('input[name=flexRadioDefault]:checked').length) return
        var ans = $('input[name=flexRadioDefault]:checked').val();
        if (ans == $scope.dap_an_dung) {
            $scope.diem += $scope.diem_cau_hoi;
            $scope.so_cau_dung++;
            console.log($scope.diem);
        } else {
            console.log($scope.diem);
        }
    }

    $scope.prev = function () {
        if ($scope.id_hien_tai > 0) {
            $scope.check_dap_an();
            $scope.id_hien_tai--;
            $scope.get_cauhoi();
        }
    };

    $scope.next = function () {
        if ($scope.id_hien_tai < $scope.tong_cau_hoi) {
            $scope.check_dap_an();
            $scope.id_hien_tai++;
            $scope.get_cauhoi();
        }
        $scope.tien_do = ($scope.id_hien_tai / $scope.tong_cau_hoi) * 100;
    };

    $scope.reset();

});

