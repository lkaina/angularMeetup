angular.module('myApp', [])
.controller('HomeController', function($scope, $http) {
  $scope.user = {
    name: 'Leighton'
  };
  var apiKey = '6bf0a7b18ff0c5e480fd8dff6ea9bd9e';
  $scope.getPhotoUrl = function(photo) {
    return "http://farm"+photo.farm+
    ".static.flickr.com/"+photo.server+
    "/"+photo.id+"_"+photo.secret+".jpg";
  };

  $http({
    method:'GET',
    url: 'http://api.flickr.com/services/rest',
    params: {
      //Flickr API parameters
      method: 'flickr.interestingness.getList',
      api_key: apiKey,
      format: 'json',
      per_page: 3,
      nojsoncallback: 1
    }
  }).then(function(data) {
    $scope.photos = data.data;
  });
});
