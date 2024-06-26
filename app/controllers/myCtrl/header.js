
        app.controller('headerCtrl', ($scope, $rootScope) => {
            let htmlElement = document.documentElement;
            let theme_web = localStorage.getItem('theme') || 'light';
            htmlElement.setAttribute('data-bs-theme', theme_web);

            // dark mode
            $scope.setTheme = () => {
                console.log(theme_web);
                if (theme_web === 'light') {
                    document.getElementById('icon_theme').classList.toggle("bi-brightness-high");
                    document.getElementById('icon_theme').classList.toggle("bi-moon-stars");
                    theme_web = 'dark';
                } else {
                    document.getElementById('icon_theme').classList.toggle("bi-moon-stars");
                    document.getElementById('icon_theme').classList.toggle("bi-brightness-high");
                    theme_web = 'light';
                }
                localStorage.setItem('theme', theme_web);
                htmlElement.setAttribute('data-bs-theme', theme_web);
            }
            
            // fixed header
                function handleScroll() {
                    if (window.scrollY > 10) {
                        document.querySelector('.header_cus').classList.toggle('header_cus_fixed', true);
                    } else {
                        document.querySelector('.header_cus').classList.toggle('header_cus_fixed', false);
                    }
                }
                window.addEventListener('scroll', handleScroll);
        } );

