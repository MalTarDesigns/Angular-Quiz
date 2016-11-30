(function(){

    angular
        .module("Quiz")
        .controller("resultsCtrl", ResultsController);

        ResultsController.$inject = ['quizFactory']

        function ResultsController(quizFactory) {
            //veiw model
            var vm = this;
                vm.quizFactory = quizFactory;
               
              
            
            //Gets the quiz json data
            quizFactory.getQuestions()
                .success(function(data) {
                    vm.questions = data;
                })
                .error(function(error) {
                    console.log(error);
                });
        }

})();