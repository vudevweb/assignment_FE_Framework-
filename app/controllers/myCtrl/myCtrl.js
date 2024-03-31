app.controller('myCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.render_slug = function(title) {
        var slug;
        slug = title.toLowerCase();
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');

        return slug;
    }


    $scope.khoahoc = [];
    $http.get('https://script.googleusercontent.com/macros/echo?user_content_key=40wtY-CTBaU3bKMsfUgW5axr9o_PKKgP4qhQIVzzDTBtSZxVaI1USnT9fGGVjQq41VmVqVSd9JLFgc3irHC43UKyXKxTfxJTm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGXd75cnz04Fq-bBtwUBw8fNm8mByv7zK_CdwSinDguGigDaxHJ654BhZjrEWDx0VPjPWDJPuN_TmudY1aI7_ELqwxorvrx5x9z9Jw9Md8uu&lib=MNM_ZoxDfXITvFMNBZVKziwQP310mW9BT').then(
        function (response) {
            $scope.khoahoc = response.data;
            console.log(response.data);
        },
        function (error) {
            alert('Error fetching khoahoc');
            console.error(error);
        }
    );
});
