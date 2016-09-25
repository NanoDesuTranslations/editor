'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesViewCtrl
 * @description
 * # SeriesViewCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesViewCtrl', function ($route, $scope, $routeParams, $location, $log, alertify, AuthService, PageService, SeriesService, NavService) {
        // TODO: Since this is a must in every controller need better way to avoid this
        $scope.loader = false; 

        var idSeries =  $routeParams.idSeries;

        NavService.setActive("series");

        $scope.admin = AuthService.isAdmin();

        if (AuthService.isAdmin()) {
            $scope.loader = true; 
            SeriesService.get({ id: idSeries }, function (sr) {
                $scope.sr = sr;
                NavService.setSeries(sr);
                $log.debug("success retreive series "+sr.name);
                $scope.loader = false; 
            }, function (error) {
                // TODO: give error message properly into user
            })
        } else {
            $scope.loader = true; 
            PageService.get(function (data){
                var sr = data.series[idSeries];
                $log.debug("Recieved data from PageService.get in SeriesViewCtrl");
                $scope.sr = sr;
                NavService.setSeries(sr);
                $scope.loader = false; 
            }
            ,function (err) {
                // TODO: give error message properly into user
            } )
        }

        //query json data from api -- gets page head data regardless of series.
        PageService.query(function (success) {
            $scope.loader = true; 
            $log.debug("retrieve data pages that not blog and deleted");
            var pages = success.pages;
            $scope.page = [];
            
            // Prevent showing deleted page in ui
            angular.forEach(pages, function(param) {
                var deleted = param.meta.deleted;
                var blog = param.meta.blog;
                if(!deleted && typeof blog !== 'object'){
                    this.push(param);
                }
            }, $scope.page);
            $scope.loader = false; 
        }, function (error) {
            alertify.error("Error! Please Contact Admin");
        });

        /**
        * Make a custom URL
        * @param {int} arg1 id Series
        * @param {int} arg2 id Page
        * @return location path
        */
        $scope.redirect = function (idSeries, idPage) {
            var path = "/page";
            if (idPage != null) {
                // We know idPage: edit the page.
                path = "page/" + idSeries + "/edit/" + idPage;
            } else {
                // We have no idPage, so add a new page.
                path = "page/" + idSeries + "/add";
            }
            //console.log(path)
            $location.path(path);
        }

        /**
        * filter pages by id Series
        */
        $scope.pages = function (param) {
            //console.log(param)
            $scope.idSeries = param;
        }
        //$scope.page = PageService.get_page('nano').get({'id': '4'});

        $scope.delete = function (idPage) {
            alertify.confirm('are you sure?', function(){
                $scope.loader = true; 
                $log.debug("user click ok button");
                PageService.get({'id': idPage}, function(success){
                    var deleted = true;
                    var page = success.page;
                    page.meta.deleted = deleted;
                    
                    PageService.update({ id: idPage }, page, function (success) {
                        $log.debug('Success Delete Page with Id '+ idPage);
                        alertify.success("Success Delete Data");
                        $route.reload();
                    }, function (error) {
                        alertify.error("Error! Please Contact Admin");
                    });
                $scope.loader = false; 
                }, function(error){
                    alertify.error("Error! Please Contact Admin");
                });
            },function(){
                $log.debug("user click cancel button");
            });
        }

        //// Series Properties
        $scope.propsOpen;
        $scope.propsHeaderURL;

        $scope.openProps = function () {
            $log.debug("open form for properties of series");
            $scope.propsOpen = !$scope.propsOpen;
            $log.debug("is properties field already opened "+$scope.propsOpen);
            $log.debug($scope.sr);
            if ($scope.propsOpen) {
                $scope.propsTiers = [];
                // Note: propsTiers holds objects, each with a name and id.  It's not that we actually use the ID,
                // but databinding wasn't accurate when I simplified this array to just strings.
                var status = $scope.sr.config["status"];
                for (var i = 0; i < $scope.sr.config.hierarchy.length; i++) {
                    $scope.propsTiers.push({ id: i, name: $scope.sr.config.hierarchy[i] });
                }
                $scope.propsHeaderURL = $scope.sr.config["header-url"];
                $scope.status = status.toString(); 
            }
        }

        $scope.cancelProps = function () {
            $scope.propsOpen = false;
        }

        $scope.addTier = function () {
            $scope.propsTiers.push({ id: $scope.propsTiers.length })
        }

        $scope.removeTier = function (idx) {
            if (idx < 0 || idx >= $scope.propsTiers.length)
                return;
            var o = $scope.propsTiers.splice(idx, 1);
            $log.debug("Removed element " + idx + " from tiers.  " + o.length + " gone, "+$scope.propsTiers.length+" left.");
        }

        $scope.saveProps = function () {
            $scope.loader = true; 
            $log.debug("edit series properties");
            var sr = $scope.sr;   // Becomes our working copy of series metadata until it's saved.
            sr.config["header-url"] = $scope.propsHeaderURL;
            sr.config["updated"] = $nd.createEpochTime();
            sr.config.hierarchy = [];
            sr.config.status = $nd.string2Int0($scope.status);
            for (var i = 0; i < $scope.propsTiers.length; i++) {
                sr.config.hierarchy.push($scope.propsTiers[i].name);
            }
            // TODO: message that we're saving?
            SeriesService.update({ id: idSeries }, sr, function (success) {
                // sr (param) is the new metadata.  Save it into the model when we know it's been written to the database.
                $scope.sr = sr;
                $scope.propsOpen = false; // Close the series properties.
                // TODO: an MVC-friendly way of displaying this message
                alert("Success save data");
                $scope.loader = false; 
            }, function (error) {
                // properties stay open in case there's something the user can fix.  They can cancel changes if necessary.
                // TODO: an MVC-friendly way of displaying this message
                alert("error, please try again");
            });
        }
    });
