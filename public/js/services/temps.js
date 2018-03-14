angular.module('tempService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Temps', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/temps');
			},
			create : function(tempData) {
				return $http.post('/api/temps', tempData);
			},
			delete : function(id) {
				return $http.delete('/api/temps/' + id);
			}
		}
	}]);