(function() {
  angular.module("app", ['ui.router'])
  .controller('mainController', ['AlertsManager', '$state', function(AlertsManager, $state) {

    var vm = this;
    vm.title = "Hello World";

    // Any time we want to flash an alert we import the AlertsManager factory
    // and call Alertsmanager.flashMessage
    // this populates the AlertsManager.alerts array
    AlertsManager.flashMessage('info', 'message');

    // We then put the AlertsManager.alerts array on the controller's scope
    vm.alerts = AlertsManager.alerts;

    // And we define a redirect function that we can use for ngClick in our directive template
    vm.redirect = function() {
      $state.go('/homeyourdrunk');
    };

  }])
  .factory('AlertsManager', function() {
    return {
      test: 'test',
      alerts: [],
      flashMessage: function(type, message) {
        this.alerts.push({type: type, msg: message, linkText: 'view it here'});
        this.alerts.push({type: type, msg: 'hello world', linkText: 'test text'});
      }
    }
  })
  .directive('flashMessage', ['AlertsManager', function(AlertsManager) {
    // Note: the view it here link is broken in this example because we have no /homeyourdrunk
    return {
      template: '<span>Submitted</span>' +
      '<div ng-repeat="alert in main.alerts">' +
      '{{alert.type}}: {{alert.msg}} - ' +
      '<a ng-show="alert.linkText" ng-click="main.redirect()">{{alert.linkText}}</a>' +
      '</div>'
    }
  }]);
})();