(function () {
  'use strict';

  var app = angular.module('tempController',  ["chart.js"]);
  


	// inject the Todo service factory into our controller
	app.controller('tempController', ['$scope','$http','Temps', function($scope, $http, Temps) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Temps.get()
			.success(function(data) {
				$scope.temps = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTemp = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.date != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Temps.create($scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.temps = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTemp = function(id) {
			$scope.loading = true;

			Temps.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.temps = data; // assign our new list of todos
				});
		};
		
		$scope.sendData = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.data != undefined) {
				$scope.loading = true;
			// $http.get('http://rest-service.guides.spring.io/greeting').
				// then(function(response) {
					// alert($scope.formData.data + "::" +response.data.content);
				// });
				
				$http.get('api/temps').
				then(function(response) {
					alert($scope.formData.data + "::" +response.data[0].tempval);
			    });
				
			}
		};

		
		$scope.convertTemp = function(data) {
			var dateIn= new Date(data);
		    var yyyy = dateIn.getFullYear();
		    var mm = dateIn.getMonth()+1; // getMonth() is zero-based
		    var dd  = dateIn.getDate();
			return String(mm + "/" + dd + "/" + yyyy);
		};
		
	}]);
	
	app.controller('StackedBarCtrl', ['$scope','$http','Temps','$interval', function ($scope, $http, Temps,$interval) {
		
		 var timer=$interval(function(){
				Temps.get()
			.success(function(data) {
				
				$scope.labels = [];
				$scope.data = [];
				
				var data1 = [];
				var start=0;
				
				if(data.length-10 >= 0)
				{
					start=data.length-10
				}
				
				for (var i=start; i< data.length; i++) {
					
					var dateIn= new Date(data[i].date);
					var yyyy = dateIn.getFullYear();
					var mm = dateIn.getMonth()+1; // getMonth() is zero-based
					var dd  = dateIn.getDate();
			
					$scope.labels.push(String(mm + "/" + dd + "/" + yyyy));
					
					data1.push(data[i].tempval);
				}
				
				
				//$scope.data.push(data1);
				
				//$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
				$scope.type = 'StackedBar';
				//$scope.series = ['2015', '2016'];
				$scope.series = ['Temprature'];
				$scope.options = {
				  scales: {
					xAxes: [{
					  stacked: true,
					}],
					yAxes: [{
					  stacked: true
					}]
				  }
				};
				
				$scope.data.push(data1);
				
				// $scope.data = [
				  // [65, 59, 90],
				  // [28, 48, 40]
				// ];
			});
			
		
   
       },5000);
	  
	 }]);
	
	
  
})();
	