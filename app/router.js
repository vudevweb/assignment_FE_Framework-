app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "app/page/home.html", controller: 'myCtrl' })
        .when("/home", { templateUrl: "app/page/home.html", controller: 'myCtrl'})
        .when("/about", { templateUrl: "app/page/about.html", controller: 'myCtrl'})
        .when("/khoahoc", { templateUrl: "app/page/khoahoc.html" , controller: 'myCtrl'})
        .when("/contact", { templateUrl: "app/page/contact.html" , controller: 'myCtrl'})
        .when("/hoidap", { templateUrl: "app/page/hoidap.html" , controller: 'myCtrl'})
        .when("/info", { templateUrl: "app/page/info.html", controller: 'myCtrl'})
        .when("/dangky", { templateUrl: "app/page/register.html", controller: 'myCtrl'})
        .when("/dangnhap", { templateUrl: "app/page/login.html", controller: 'myCtrl'})
        .when("/khoahoc/:id_khoahoc", { templateUrl: "app/page/monhoc.html", controller: 'khoaHocCtrl' })
        .when("/khoahoc/:id_khoahoc/:id_monhoc", { templateUrl: "app/page/ctmonhoc.html", controller: 'monhocCtrl' })

        .when("/khoahoc/:id_khoahoc/:id_monhoc/quiz", { templateUrl: "app/page/quiz.html", controller: 'monhocCtrl' })
        .when("/khoahoc/:id_khoahoc/:id_monhoc/test", { templateUrl: "app/page/quiztest.html", controller: 'monhocTestCtrl' })

});

