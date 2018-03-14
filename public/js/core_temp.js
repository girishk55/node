var app1=angular.module('scotchTemp', ['ngRoute','tempController', 'tempService']);

app1.config(function($routeProvider) {
    $routeProvider
    .when("/", {
       templateUrl : "tempchart.html",
        controller : "StackedBarCtrl"
    })
	.when("/tempchart", {
		templateUrl : "tempchart.html",
        controller : "tempController"
    })
    .when("/tempadd", {
		templateUrl : "tempadd.html",
        controller : "tempController"
    })
	.when("/senddata", {
		templateUrl : "senddata.html",
        controller : "tempController"
    });
});
 


