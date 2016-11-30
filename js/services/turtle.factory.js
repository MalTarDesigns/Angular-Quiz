(function(){

angular
    .module('Quiz')
    .factory('turtleFactory', function($http) {
         
        //get the data from the json and return it
        function getTurtles() {
            return $http.get('data/turtles.json'); 
        }

        //send out the getTurtles function as getTurtles
        return {
            getTurtles: getTurtles
        }

    });


})();