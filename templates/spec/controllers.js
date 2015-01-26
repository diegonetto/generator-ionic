'use strict';

describe('Controller: TestCtrl', function () {

  var should = chai.should();
  var scope;
  var TestCtrl;

  // load the controller's module
  beforeEach(module('<%= appName %>'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestCtrl = $controller('TestCtrl', {
      $scope: scope
    });
  }));

  it('Should attach a list of things to the scope', function () {
    scope.things.should.have.length(4);
  });

});