angular.module('myApp', ['ngRoute']) //module dependences
.provider('Flickr', function() {
  var apiKey = '6bf0a7b18ff0c5e480fd8dff6ea9bd9e';
  this.setApiKey = function(key) {
  apikey = key || apiKey;
 };
 this.$get = function($http) { //why get here?
  this.getPhotos = function(){
    return $http({
      method:'GET',
      url: 'http://api.flickr.com/services/rest',
      params: {
        //Flickr API parameters
        method: 'flickr.interestingness.getList',
        api_key: apiKey,
        format: 'json',
        nojsoncallback: 1
      }
    }).then(function(data) {
      return data.data.photos.photo;
    });
  }
  return this;
 };
})
.config(function(FlickrProvider) {  //FlickrProvider available only during config, automatically added by angular
  FlickrProvider.setApiKey('6bf0a7b18ff0c5e480fd8dff6ea9bd9e');
})
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.controller('HomeController', function($scope, Flickr) {
  $scope.user = {
    name: 'Leighton'
  };
  $scope.getPhotoUrl = function(photo) {
    return "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
  };
  Flickr.getPhotos().then(function(data) {
    $scope.photos = data;
  })
});
