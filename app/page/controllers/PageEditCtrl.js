'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageEditCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageEditCtrl', function($scope, $routeParams, $location, /* TODO: remove */ SeriesService, PageService){
        var auth = 'nano';
        var hierarchy;
        var idSeries = $routeParams.idSeries;
        var idPage = $routeParams.idPage
        var metaTemp = new Object();
        $scope.config = true;
        $scope.main = false;
            
        /**
        * redirect into page URL
        */
        $scope.redirect = function(){
            var path = "/page";
            $location.path(path);
        }
        
        $scope.back = function(){
            $scope.config = true;
            $scope.main = false;
        }

        $scope.next = function(){
            $scope.config = false;
            $scope.main = true;
        }

        //get configuration of hierarchy from series
        $scope.series = SeriesService.get({'id': idSeries}, function(events){
            hierarchy = events.config.hierarchy;
        });

        //get page data
        PageService.get({'id': idPage}, function(events){
            $scope.data = events.page;
            metaTemp = events.page.meta;
            if (events.series && events.series.length > 0)
                $scope.sr = events.series[0]; // First and only series in the array. Save it in the model.
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

            PageService.update({id: idPage}, data, function(success){
                alert("success")
            }, function(error){
                //console.log(error.status)
            });
            //console.log(data)
        }
        
        // Page Properties:
        $scope.openProps = function () {
            $scope.propsOpen = true;
            // TODO: initialize the page properties for editing--separate copy so the edits can be cancelled.
        }

        $scope.cancelProps = function () {
            $scope.propsOpen = false;
            // TODO: if we're using this to create a series we'll need to do more.
        }

        $scope.saveProps = function () {
            $scope.propsOpen = false;
            // TODO: if we're using this to create a series we'll need to do more.
        }
    });
