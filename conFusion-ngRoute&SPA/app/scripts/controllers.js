'use strict';
angular.module('confusionApp')

    .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory',
        function ($scope, $routeParams, menuFactory) {

            var dish = menuFactory.getDish(parseInt($routeParams.id, 10));
            $scope.dish = dish;
        }])

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        this.tab = 1;
        this.filtText = '';
        $scope.dishes = menuFactory.getDishes();
    }])

    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishController', ['$scope', function ($scope) {
        $scope.submitComment = function () {
            $scope.comment.date = new Date();
            $scope.dish.comments.push($scope.comment);
            $scope.commentForm.$setPristine();
            $scope.comment = { author: "", rating: 5, comment: "", date: new Date() };
        };
    }])

    ;
