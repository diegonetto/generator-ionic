## Testing Your App

To lessen the pain of testing your application, this generator configures your project with a handful of libraries that will hopefully make testing your application, dare I say, more enjoyable.



![Comic](http://dilbert.com/dyn/str_strip/000000000/00000000/0000000/100000/10000/6000/600/116640/116640.strip.gif)



### Unit Tests

The foundation of our testing solution is built using [Karma](http://karma-runner.github.io/) which was created by the AngularJS team and is all around awesome. Inside of your generated `karma.conf.js` file you will find some basic configuration settings. Notice that we're using [Mocha](http://visionmedia.github.io/mocha/) to structure our tests and pulling in [Chai](http://chaijs.com/), a slick assertion library. You can easily drop Chai and replace Mocha with [Jasmine](http://jasmine.github.io/) depending on your preference.



Your generated `Gruntfile.js` also contains a `karma` task that provides further configuration. Any properties specified via this task will override the values inside `karma.conf.js` when run via `grunt`. If you look closely at this task, you'll notice that we're using [PhantomJS](http://phantomjs.org/) for both Karma targets, but you can easily update the `karma:unit` target to run tests inside of real browsers.



Ok, now that you have some context (and links to read up on the bundled testing libraries), go ahead and run `grunt test` and open up one of the included unit tests - `test/spec/controllers.js`. In your editor of choice, change this line - `scope.pets.should.have.length(4);` to any number other than four and watch what happens. Since your test files are being watched for changes, Grunt knows to go ahead and re-run your test suite, which in this cause should have errored out with a failure message being displayed in your terminal.



Undo your modification and ensure that all tests are passing before continuing on.



**Note** Depending on which starter template you picked, your tests may start off failing.



### End2End Tests

Coming soon!



### Code Coverage

So you've finished writing your tests, why not showoff just how watertight your application has become? Using [Istanbul](http://gotwarlost.github.io/istanbul/) - which was built at Yahoo - we can generate visually engaging code coverage reports that do just that!



Our beloved generator has done all the hard work for you, so go ahead and see these coverage reports in action by running `grunt coverage`.



If this is your first time using Istanbul, take a look around. It will help you spot gaps in your unit tests and lets face it, the more visual gratification we can get during our testing stage, the greater the likelihood of us sitting down and writing these tests to begin with!
