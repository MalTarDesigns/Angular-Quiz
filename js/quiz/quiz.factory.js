(function(){

angular
    .module('Quiz')
    .factory('quizFactory', QuizFactory);

    function QuizFactory($http) {
        var quizObj = {
            quizActive: false,
            resultsActive: false,
            changeState: changeState,
            getQuestions: getQuestions,
        };
 
        return quizObj;
 
        function changeState(string, state){
            if(string === "quiz") {
                quizObj.quizActive = state;
            }else if(string === "results") {
                quizObj.resultsActive = state;
            }else {
                return false;
            }
        }



        //get the data from the json and return it
        function getQuestions() {
            return $http.get('data/questions.json'); 
        }

    }

})();