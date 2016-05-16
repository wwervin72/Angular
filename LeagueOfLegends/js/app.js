/**
 * Created by ervin on 2016-03-31.
 */
var hash = !window.location.hash?'#/index':window.location.hash;  //当打开index.html的时候，即跳转到登录页面
window.location.hash = hash;
var app=angular.module('app',['ui.router','loginModel','listModel']);
//这里因为在后面几个控制器中都会用到$stateParams，所以把它绑定到$rootScope上
app.run(function ($rootScope,$state,$stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index',{
      url: '/index',
      templateUrl: 'tpls/start.html'
    })
    .state('register',{
      url: '/register',
      templateUrl: 'tpls/register.html'
    })
    .state('main',{
      url: '/main{positionType:[0,9]{1,5}}',
      views: {
        '': {
          templateUrl: 'tpls/main.html'
        },
        'typeList@main': {
          templateUrl: 'tpls/typeList.html'
        },
        'tbHero@main': {
          templateUrl: 'tpls/tbHero.html'
        }
      }
    })
    .state('addHero',{
      url: '/addHero',
      templateUrl: 'tpls/addHero.html'
    })
    .state('find',{
      url: '/findPwd',
      templateUrl: 'tpls/findPwd.html'
    })
    .state('detail',{
      url: '/detail/:id',
      templateUrl: 'tpls/detail.html'
    })
})