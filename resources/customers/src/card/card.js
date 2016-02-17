angular.module('app.card', [
  'ngResource'
])
  .factory('Card', Card);

function Card($resource) {
  var Card =  new $resource('/api/creditcards/:id', {id: "@id"}, {
      update: {method:'PUT'}
  });
  return Card;
}
