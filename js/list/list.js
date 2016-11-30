(function(){

    angular
        .module("Quiz")
        .controller("listCtrl", ListController);
      
        ListController.$inject = ['turtleFactory', 'quizFactory']; //inject the services


        function ListController(turtleFactory, quizFactory) {
            //view model
            var vm = this;
                vm.activeTurtle = {};
                vm.changeActiveTurtle = changeActiveTurtle; // setting changeActiveTurtle to a function which is below
                vm.search = '';
                vm.activeQuiz = activeQuiz;
                
                //get the quizFactory
                vm.quizFactory = quizFactory;
               
            function activeQuiz() {
                quizFactory.changeState("quiz", true);
            }

            //Holds the data that is passed in - used for the Modal    
            function changeActiveTurtle(i) {
                vm.activeTurtle = i;
            }

            //Gets the turtle json data
            turtleFactory.getTurtles()
                .success(function(data) {
                    vm.turtles = data;
                })
                .error(function(error) {
                    console.log(error);
                });

            }


})();
