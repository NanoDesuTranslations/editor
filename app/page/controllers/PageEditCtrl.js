'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageEditCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageEditCtrl', function($scope, $routeParams, SeriesService, PageService){
        var auth = 'nano';
        var hierarchy;
        var idSeries = $routeParams.idSeries;
        var idPage = $routeParams.idPage
        var metaTemp = new Object();
            
        //get configuration of hierarchy from series
        $scope.series = SeriesService.get_all(auth).get({'id': idSeries}, function(events){
            hierarchy = events.config.hierarchy;
        });

        //get page data
        PageService.get_all(auth).get({'id': idPage}, function(events){
            $scope.data = events.page;
            metaTemp = events.page.meta;
            simplemde.value($scope.data.content);
        });
        
        /**
        * get value from hierarchy like volume, part, etc
        */
        $scope.hrValue = function(param){
            return metaTemp[param];
        }

        /**
        * This function is active when save button clicked
        * PUT the data into API server
        */
        $scope.save = function(){
            var title = $('#title').val();
            var content = simplemde.value();
            var id = $('#idPage').val();
            var status = $('#status').val();
            var meta = new Object();
            var data = new Object();

            angular.forEach(hierarchy, function(item){
                var key = item;
                meta[key] = $('#'+item).val();
            });
            meta.title = title;
            meta.status = status;

            data.content = content;
            data.meta = meta;

            PageService.update_data(auth).update({id: idPage}, data, function(success){
                alert("success")
            }, function(error){
                //console.log(error.status)
            });
            //console.log(data)
        }
        
    });
