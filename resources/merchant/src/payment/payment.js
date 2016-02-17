angular.module('app.payment', [
  'ngResource'
])
  .factory('PaymentHistory', PaymentHistory)
  .factory('Payment', Payment);

function PaymentHistory($resource) {
  var PaymentHistory =  new $resource('/api/paymenthistory');
  return PaymentHistory;
}


function Payment($resource) {
  var Payment =  new $resource('/api/payment');
  return Payment;
}

