/**
 * Created by ervin on 2016-03-31.
 */
//登录模块
var loginModel = angular.module('loginModel',[]);
loginModel.controller('loginCtrl',['$scope','$http','$location', function ($scope, $http,$location) {
  $scope.uname = '';
  $scope.upwd = '';
  $scope.login = function () {
    if(!$scope.uname){
      $scope.unameIsEmpty = true;
      $scope.upwdIsEmpty = false;
    }else if($scope.uname&&!$scope.upwd){
      $scope.unameIsEmpty = false;
      $scope.upwdIsEmpty = true;
      $scope.loginFalse = false;
    }else{
      $scope.unameIsEmpty = false;
      $scope.upwdIsEmpty = false;
      $http.get('data/login.php?handle=login&uname='+$scope.uname+'&upwd='+$scope.upwd).success(function (res) {
        if(res==='true')$location.url('main0');  //跳转
        else if(res==='该用户名不存在'){
          $scope.loginFalse = false;
          $scope.unameNotExist=true;
          $scope.upwdIsEmpty=false;
        }
        else if(res==='密码输入错误'){
          $scope.loginFalse = true;
          $scope.unameNotExist=false;
        }
      }).error(function (res) {
        alert('请求错误');
      })
    }
  };
}])

//注册
loginModel.controller('registerCtrl',['$scope','$http','$location','requestService', function ($scope, $http,$location,requestService) {
  $scope.register= function () {
    requestService.getData('#regForm','data/login.php','register').then(function (res) {
      alert('注册成功');
      history.go(0);
    }, function (res) {
      alert('请求失败');
    });
  };
  $scope.searchName= function () {
    $http.get('data/login.php?handle=login&uname='+$scope.userName).success(function (data) {
      console.log(data);
    })
  }
  $scope.$watch('userName', function () {
    var reg=/^[a-zA-Z]\d{3,8}$/;
    if(reg.test($scope.userName)){
      $http.get('data/login.php?handle=login&uname='+$scope.userName).success(function (data) {
        if(data.indexOf('该用户名不存在') === -1){
          $scope.userNameExist = true;
        }else{
          $scope.userNameExist = false;
        }
      });
    }else{
      $scope.userNameExist = false;
    }
  })

  //找回密码
  $scope.$watch('updateName', function () {
    $http.get('data/login.php?handle=login&uname='+$scope.updateName).success(function (data) {
      if(data.indexOf('该用户名不存在') !== -1) $scope.iptCorrect = true;
      else $scope.iptCorrect = false;
    });
  });
  $scope.code = false;
  $scope.number = false;
  $scope.selArr=['身份证','手机'];
  $scope.selectType = function () {
    switch ($scope.selected){
      case '身份证':
        $scope.code = true;  //使用身份证验证
        $scope.number = false;
        break;
      case '手机':
        $scope.number = true;  //使用手机验证
        $scope.code = false;
        break;
    }
  };
  $scope.$watch('userCode', function () {  //当输入格式正确，请求后台验证输入是否正确
    var codeReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if(codeReg.test($scope.userCode)){
      $http.get('data/login.php?handle=updateCode&uname='+$scope.updateName+'&userCode='+$scope.userCode).success(function (data) {
        if(data === 'true') {
          $scope.codeCorrect = true;
          $('.nextBtn').removeClass('ng-hide');
        } else {
          $scope.codeCorrect = false;
          $('.nextBtn').addClass('ng-hide');
        }
      })
    }else $('.nextBtn').addClass('ng-hide');
  });
  //提交数据 修改密码
  $scope.updatePwd = function () {
    $http.get('data/login.php?handle=updatePwd&pwd='+$scope.newPwd+'&uname='+$scope.updateName).success(function (data) {
      if(data==='true')alert('修改成功...');
      else alert('修改失败...');
      $('#rootwizard input').val('');
      $('#rootwizard .form-group span').addClass('ng-hide');
      $('.submitBtn').addClass('ng-hide');
    })
  }
  $scope.$watch('userPhone', function () {
    var phoneReg =  /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
    if(phoneReg.test($scope.userPhone)){
      $http.get('data/login.php?handle=updatePhone&uname='+$scope.updateName+'&userPhone='+$scope.userPhone).success(function (data) {
        if(data === 'true') {
          $scope.phoneCorrect = true;
          $('.nextBtn').removeClass('ng-hide');
        }else {
          $scope.phoneCorrect = false;
          $('.nextBtn').addClass('ng-hide');
        }
      })
    }else $('.nextBtn').addClass('ng-hide');
  });
  $('#rootwizard').bootstrapWizard({   //当点击下一步 或上一步的时候，判断当前显示的是第几步，并且判断当前是否能进行下一步
    'tabClass': 'bwizard-steps',
    onNext: function(tab, navigation, index) {
      switch (index){
        case 1:
        if($scope.userCode !== undefined || $scope.userPhone !== undefined)
        $('.nextBtn').removeClass('ng-hide');
        else $('.nextBtn').addClass('ng-hide');
        break;
        case 2:
        if($scope.userCode !== undefined || $scope.userPhone !== undefined) {
          $('.nextBtn').removeClass('ng-hide');
        } else $('.nextBtn').addClass('ng-hide');
        break;
      }
    },
    onPrevious: function(tab, navigation, index) {
      switch (index){
        case 0:
          if($scope.updateName === '')
          $('.nextBtn').addClass('ng-hide');
          else $('.nextBtn').removeClass('ng-hide');
          break;
        case 1:
          if($scope.userCode===''||$scope.userPhone==='')
          $('.nextBtn').addClass('ng-hide');
          else $('.nextBtn').removeClass('ng-hide');
          break;
      }
    }
  });
}]);



//列表模块
var listModel = angular.module('listModel',['ngGrid']);
listModel.controller('listCtrl',['$scope','$http','$state','$stateParams', function ($scope, $http, $state, $stateParams) {

  $scope.pagingOptions = {
    pageSizes: [5,15,20],
    pageSize: 5,
    currentPage: 1
  };

  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: true
  };

  $scope.totalServerItems = 0;
  $scope.getDates = function (pageSize,page,/*optional*/searchText) {
    setTimeout(function () {
      if(searchText){
        searchText = searchText.toLowerCase();
        $http.get('data/hero.php?param='+$stateParams.positionType).success(function (data) {
          var data = data.filter(function (item) {
            return JSON.stringify(item).indexOf(searchText) != -1;
          })
          data.forEach(function (item,i) {
            item.index = i+1;
          });
          $scope.totalServerItems = data.length;
          $scope.datas=data.slice((page-1)*pageSize,page*pageSize);
        }).error(function (data) {
          alert('请求错误...');
        })
      }else{
        $http.get('data/hero.php?param='+$stateParams.positionType).success(function (data) {
          data.forEach(function (item,i) {
            item.index = i+1;
          });
          $scope.totalServerItems = data.length;
          $scope.datas = data.slice((page-1)*pageSize,page*pageSize);
        }).error(function (data) {
          alert('请求错误...');
        })
      }
    },100);
  };
  $scope.getDates($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);
  $scope.$watch('pagingOptions', function () {
    $scope.getDates($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);
  },true);
  $scope.$watch('filterOptions', function () {
    $scope.getDates($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage,$scope.filterOptions.filterText);
  },true);

  $scope.gridOptions = {
    data: 'datas',
    multiSelect: false,
    enableRowSelection: false,
    enableCellSelection: true,
    enableCellEdit: false,
    enablePinning: true,
    columnDefs: [
      {
        field: 'index',
        width: 80,
        display: '序号',
        pinnable: true,
        sortable: true
      },
      {
        field: 'name',
        displayName: '姓名',
        width: 120,
        sortable: true,
        pinnable: true
      },
      {
        field:'alias',
        displayName:'别名',
        width: 60,
        sortable: true,
        pinnable: true
      },
      {
        field:'position',
        displayName: '定位',
        width: 70,
        sortable: true,
        pinnable: true
      },
      {
        field:'equip',
        displayName: '装备',
        width: 500,
        sortable: true,
        pinnable: true
      },
      {
        field:'id',
        displayName: '详细攻略',
        sortable: false,
        pinnable: true,
        cellTemplate:'<div class="cellDetail"><a ui-sref="detail({id:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
      }
    ],
    enablePaging: true,
    showFooter: true,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions
  }
}])

//添加英雄
listModel.controller('addHero',['$scope','$http','requestService', function ($scope,$http,requestService) {
  $scope.positionArr = ['法师','打野','射手','上单','辅助'];
  $scope.addHero = function () {
    requestService.getData('#addHeroForm','data/login.php','addHero').then(function (res) {
      if(res==='true'){
        alert('添加成功...');
        history.go(0);
      }
    }, function (res) {
      alert('添加失败...');
    })
  }
}])