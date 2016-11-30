(function(){

    angular
        .module("Quiz")
        .controller("quizCtrl", QuizController);

        QuizController.$inject = ['quizFactory']

        function QuizController(quizFactory) {
            //veiw model
            var vm = this;
                vm.quizFactory = quizFactory;
                vm.questionAnswered = questionAnswered;
                vm.setActiveQuestion = setActiveQuestion;
                vm.selectAnswer = selectAnswer;
                vm.finalizeQuiz = finalizeQuiz;
                vm.activeQuestion = 0;
                vm.error = false;
                vm.finalize = false;
                vm.numCorrect = 0;
                vm.correct = false;

            var numQuestionsAnswered = 0; // the veiw doesn't need this
 
            function setActiveQuestion(index){
                var breakOut = false;
                var quizLength = vm.questions.length - 1;
                
                if(index === undefined) {
                    while(!breakOut){
                        vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion:0;
                        if(vm.activeQuestion === 0){
                            vm.error = true;
                        }

                        if(vm.questions[vm.activeQuestion].selected === null){
                            breakOut = true;
                        }
                    }
                }else {
                    vm.activeQuestion = index;
                }
            }
        
            function questionAnswered(){ 
                if(vm.questions[vm.activeQuestion].selected !== null){
                    numQuestionsAnswered++;
                    if(numQuestionsAnswered >= vm.questions.length) {
                        //finalize quiz
                        for(var i = 0; i < vm.questions.length; i++) {
                            if(vm.questions[i].selected === null) {
                                setActiveQuestion(i);
                                return;
                            }
                        }
                        vm.error = false;
                        vm.finalize = true;
                        return;
                    }
                }
                vm.setActiveQuestion();
            }

            function selectAnswer(index) {
                vm.questions[vm.activeQuestion].selected = index;
                console.log(index);
            }

            function finalizeQuiz() {
                console.log('Clicked!');
                vm.finalize = false;
                numQuestionsAnswered = 0;
                vm.activeQuestion = 0;
                quizFactory.changeState("quiz", false);
                quizFactory.changeState("results", true);
                markQuiz();
            }

            function markQuiz() {
                for(var i = 0; i < vm.questions.length; i++) {
                    if(vm.questions[i].selected == vm.questions[i].correct) {
                        vm.correct = true;
                        vm.numCorrect++    
                    }else {
                        vm.correct = false;
                    }
                    
                }
                console.log(vm.numCorrect);
            }

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