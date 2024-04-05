app.config(function ($routeProvider) {
    $routeProvider
    // auth
        .when("/login", { templateUrl: "app/page/login.html", controller: 'loginCtrl' })
        .when("/register", { templateUrl: "app/page/register.html", controller: 'registerCtrl' })
    // page
        .when("/", { templateUrl: "app/page/home.html", controller: 'homeCtrl' })
        .when("/home", { templateUrl: "app/page/home.html", controller: 'homeCtrl'})
        .when("/about", { templateUrl: "app/page/about.html", controller: 'myCtrl'})
        .when("/khoahoc", { templateUrl: "app/page/khoahoc.html", controller: 'homeCtrl'})
        .when("/contact", { templateUrl: "app/page/contact.html", controller: 'contactCtrl'})
        .when("/hoidap", { templateUrl: "app/page/hoidap.html", controller: 'myCtrl'})
        .when("/info", { templateUrl: "app/page/info.html", controller: 'infoCtrl'})

        .when("/khoahoc/:id_khoahoc", { templateUrl: "app/page/monhoc.html", controller: 'khoaHocCtrl' })
        .when("/khoahoc/:id_khoahoc/:id_monhoc/quiz", { templateUrl: "app/page/quiz.html", controller: 'monhocTestCtrl' })
});
