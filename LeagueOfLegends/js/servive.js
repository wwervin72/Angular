/**
 * Created by ervin on 2016-04-01.
 */
app.factory('requestService',function ($http,$q) {
  return {
    getParam: function (element){
      var param = '';
      //var param={};
      var elements = document.querySelectorAll(element+' [name]');
      Array.prototype.forEach.call(elements, function (item) {
        param +='&'+item.name+'='+$(item).val();
        //param[item.name]=$(item).val();
      })
      return param;
    },
    getData: function (element,url1,hand){
      var param = '?handle='+hand+this.getParam(element);
      return $http.get(url1+param).success(function (res) {
        return $q.when(res);
      }, function (res) {
        return $q.reject(res);
      })
    }
  }
})