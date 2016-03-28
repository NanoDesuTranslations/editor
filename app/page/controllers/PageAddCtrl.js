'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageAddCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageAddCtrl', function($scope, $routeParams, $location,  SeriesService, PageService){
        //var auth = 'nano';
        var idSeries = $routeParams.idSeries;
        var hierarchy;
        //console.log(idSeries);

        /**
        * redirect into page URL
        */
        $scope.redirect = function(){
            var path = "/page";
            $location.path(path);
        }

        // get configuration of hierarchy from series
        $scope.data = SeriesService.get({'id': idSeries}, function(events){
            hierarchy = events.config.hierarchy;
            //console.log(events.config.hierarchy)
        });
        
        /**
        * This function is active when save button clicked
        * POST the data into API server
        */
        $scope.save = function(){
            var title = $('#title').val();
            var content = simplemde.value();
            var series = $('#idSeries').val();
            var status = $('#status').val();
            var meta = new Object();
            var data = new Object();

            angular.forEach(hierarchy, function(item){
                var key = item;
                meta[key] = $('#'+item).val();
            });
            meta.title = title;
            meta.status = status

            data.series = series;
            data.content = content;
            data.meta = meta
            //console.log(data)
            PageService.save(data, function(success){
                //console.log(response)
                alert("success")
            }, function(error){
                console.log(error)
            });
        }
    });
