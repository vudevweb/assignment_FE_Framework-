app.controller('monhocCtrl', function ($scope, $routeParams, $window, $http,$interval) {
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
            console.error('Failed to fetch subject data:', error);
            alert('Failed to fetch subject data!');
        }
    );

    $scope.diem = 0;
    $scope.tong_cau_hoi = 0;
    $scope.id_hien_tai = 0;
    $scope.tien_do = 0;
    $scope.thoi_gian = 300;


    $scope.cau_hoi = '';
    $scope.diem_cau_hoi = '';
    $scope.dap_an_dung = '';
    $scope.dap_an = [];

    $scope.start = function() {
        $scope.status = true;
        $scope.get_cauhoi();
    }

    $scope.reset = function() {
        $scope.status = false;
    }

    $scope.get_cauhoi = function() {
        $scope.fetch_cauhoi().then(function(cauhoi) {
            $scope.tong_cau_hoi = cauhoi.length;
            var data = cauhoi[$scope.id_hien_tai];
            $scope.cau_hoi = data.Text;
            $scope.diem_cau_hoi = data.Marks;
            $scope.dap_an_dung = data.AnswerId;
            $scope.dap_an = data.Answers;
        })
    }

    $scope.check_dap_an = function() {
        if(!$('input[name=flexRadioDefault]:checked').length) return 
        var ans = $('input[name=flexRadioDefault]:checked').val();
        if(ans == $scope.dap_an_dung) {
            $scope.diem += $scope.diem_cau_hoi;
            console.log($scope.diem);
        } else {
            console.log($scope.diem);
        }
    }
    $scope.fetch_cauhoi = function() {
        return $http.get(`app/db/Quizs/${$scope.id_monhoc.toUpperCase()}.js`).then(
            function (response) {
                return response.data;
            },
            function (error) {
                console.error('Failed to fetch quiz questions:', error);
                alert('Failed to fetch quiz questions!');
            }
        );
    }

    $scope.prev = function () {
        if ($scope.id_hien_tai > 0) {
            $scope.check_dap_an();
            $scope.id_hien_tai--;
            $scope.get_cauhoi();
        }
        $scope.tiendo = ($scope.id_hien_tai / $scope.tong_cau_hoi) * 100;
    };

    $scope.next = function () {
        if ($scope.id_hien_tai < $scope.tong_cau_hoi - 1) {
            $scope.check_dap_an();
            $scope.id_hien_tai++;
            $scope.get_cauhoi();
        }
        $scope.tiendo = ($scope.id_hien_tai / $scope.tong_cau_hoi) * 100;
    };

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

    $scope.reset();
});


    // Lấy data câu hỏi

    // =============================================


    // // phân trang
    // $scope.start_v1 = 0;
    // $scope.pageSize = 1;
    // $scope.tiendo = 0;
    // $scope.prev = function () {
    //     if ($scope.start_v1 > 0) {
    //         $scope.start_v1 -= $scope.pageSize;
    //     }
    //     $scope.tiendo = ($scope.start_v1 / $scope.cauhoi.length) * 100;
    // };

    // $scope.next = function () {
    //     if ($scope.start_v1 < ($scope.cauhoi.length - $scope.pageSize)) {
    //         $scope.start_v1 += $scope.pageSize;
    //     }
    //     $scope.tiendo = ($scope.start_v1 / $scope.cauhoi.length) * 100;
    // };

    // // =============================================


    // // thời gian
    // $scope.thoigian = 300;
    // var timer = $interval(function () {
    //     if ($scope.thoigian <= 0) {
    //         $interval.cancel(timer);
    //         var confirmed = $window.confirm('Hết thời gian làm bài!');
    //         if (confirmed) {
    //             $window.location.href = '/android';
    //         }
    //     } else {
    //         $scope.thoigian--;
    //     }
    // }, 1000);
    // // =============================================

    // // Tính điểm
    // $scope.diem = 0;
    // $scope.check_cautraloi = function (id_dapan, id_dapan_dung, diem_cauhoi) {

    //     console.log(id_dapan);
    //     console.log(id_dapan_dung);
    //     console.log(diem_cauhoi);
    //     if (id_dapan === id_dapan_dung) {
    //         $scope.diem += diem_cauhoi;
    //     }
    // };

    // // =============================================
    // const cauhoi_ne = document.querySelectorAll('.cauhoi_ne');
    // cauhoi_ne.forEach(element => {
    //     console.log(element);
    // });


