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

    // trang quiz
    $scope.diem = 0;
    $scope.tong_cau_hoi = 0;
    $scope.tien_do = 0;
    var timer;
    $scope.thoi_gian = 500000;
    $scope.so_cau_dung = 0;

    $scope.btn_prev = false;
    $scope.btn_next = true;
    $scope.result = false;
    $scope.quiz = false;
    $scope.status_start = false;
    $scope.cau_hien_tai=0;

    $scope.data_ch = [];
    $scope.tong_cau_hoi = 15;
    // thời gian làm bài 
    $scope.minutes = 15;
    $scope.seconds = 10;

    
    $http.get(`app/db/Quizs/${$scope.id_monhoc.toUpperCase()}.js`).then(
        function (response) {
            $scope.data_ch = response.data.slice(0, $scope.tong_cau_hoi);
            $scope.tien_do = (1 / $scope.tong_cau_hoi) * 100;

            console.log($scope.tong_cau_hoi);
        },
        function (error) {
            alert('Ko lấy được quiz');
            console.error(error);
        }
    );

    $scope.startQuiz = function () { // Renamed function start to startQuiz
        $scope.diem = 0;
        $scope.status_start = false;
        $scope.quiz = true;
        $scope.result = false;
        $scope.startTimer();
    };

    $scope.reset = function () {
        $scope.status_start = true;
        $scope.quiz = false;
        $scope.result = false;
        $scope.stopTimer();
    };

    $scope.show_result = function (type) {
        if (type == "btn") {
            var confirm_m = $window.confirm('Bạn chắc chắn muốn nộp bài ?');
            if (confirm_m) {
                $scope.stopTimer();
                $scope.check_dap_an(); 
                $scope.status_start = false;
                $scope.quiz = false;
                $scope.result = true;
            }
        } else if (type == 'het_time') {
            $scope.stopTimer();
            $scope.check_dap_an();
            $scope.status_start = false;
            $scope.quiz = false;
            $scope.result = true;
        }
    };




    $scope.startTimer = function () {
        timer = $interval(function () {
            if ($scope.seconds === 0 && $scope.minutes > 0) {
                $scope.minutes -= 1;
                $scope.seconds = 60;
            }
            if ($scope.minutes <= 0 && $scope.seconds <= 0) {
                $interval.cancel(timer);
                var confirmed = $window.confirm('Hết thời gian làm bài!');
                if (confirmed) {
                    $scope.show_result('het_time');
                }
            }
            $scope.seconds--;
        }, 1000);
    };

    $scope.stopTimer = function () {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    };

    $scope.check_dap_an = function () {
            $scope.so_cau_dung = 0;
            var test = $('input[type="radio"]:checked');
            test.each(function () {
                if (this.value === this.id) {
                    $scope.so_cau_dung++;
                    $scope.diem = $scope.so_cau_dung * ((1 / $scope.tong_cau_hoi) * 100);
                    $scope.diem = $scope.diem.toFixed(2)
                    console.log($scope.diem);
                } else {
                    console.log($scope.diem);
                }
            })  
    };
    
    
    $scope.prev = function () {
        if($scope.cau_hien_tai>0) {
            $scope.cau_hien_tai --;
            $scope.tien_do -= (($scope.cau_hien_tai + 1) / $scope.tong_cau_hoi) *100;
        }
    };

    $scope.next = function () {
        if( $scope.cau_hien_tai < $scope.tong_cau_hoi - 1) {
            $scope.cau_hien_tai ++;
            $scope.tien_do = (($scope.cau_hien_tai + 1) / $scope.tong_cau_hoi) *100;
        }
    };

    $scope.reset();

});
