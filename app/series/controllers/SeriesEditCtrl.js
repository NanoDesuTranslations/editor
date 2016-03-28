'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesEditCtrl
 * @description
 * # SeriesEditCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesEditCtrl', function($scope, $routeParams, $location, SeriesService){
        var idSeries = $routeParams.idSeries;  

        $scope.redirect = function(){
            var path = '/series';
            $location.path(path);
        }
        
        $scope.data = SeriesService.get({'id': idSeries}, function(success){
                alert("success");
            }, function(error){
                alert("error");
            });

        $scope.edit = function(){
            var data = new Object();
            var hierarchy = new Array();
            var name = $('#name').val();
            var id = $('#idSeries').val();
            var hr = $('input[name="fields[]"]')
                                .map(function(){
                                    var value = $(this).val()
                                    //make sure to not include empty string
                                    if(value != ""){
                                        return $(this).val();
                                    }
                                })
                                .get();
            data.name = name;
            data.config = {hierarchy: hr};
            
            SeriesService.update({id: idSeries}, data, function(success){
                alert("success");
            }, function(error){
                alert("error");
            });
        }
    });
