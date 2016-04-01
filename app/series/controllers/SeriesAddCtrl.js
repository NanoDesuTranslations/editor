'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesAddCtrl
 * @description
 * # SeriesAddCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesAddCtrl', function($scope, $location, SeriesService){

        $scope.redirect = function(){
            var path = '/series';
            $location.path(path);
        }

        $scope.save = function(){
            var data = new Object();
            var hierarchy = new Array();
            var name = $('#name').val();
            var hr = $('input[name="fields[]"]')
                                .map(function(){
                                    var value = $(this).val()
                                    //make sure to not include empty string
                                    if(value != ""){
                                        return $(this).val();
                                    }
                                })
                                .get();
            //console.log(hierarchy);
            data.name = name;
            data.config = {hierarchy: hr};
            SeriesService.save(data, function(success){
                alert("Success save data");
            }, function(error){
                alert("error, please try again");
            });
        }
    });
