(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        initQuestions();

        function initQuestions() {
            // get current user data in the API
            QuestionService.GetAll().then(function (data) {
                vm.questions = data;
            });
            
        }

        function saveQuestion() {
            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question Saved');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion(question) {
            console.log(question);
            QuestionService.Delete(question._id)
                .then(function () {
                    // log user out
                    FlashService.Success('Question Deleted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();