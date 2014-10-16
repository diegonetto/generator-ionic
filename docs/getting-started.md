#Getting Started

To help you hit the ground running, let's walk through an example workflow together. We're assuming you've followed the 
[usage](https://github.com/diegonetto/generator-ionic#usage) directions and are inside your app's directory.



We'll start by running our app in a browser so we can make a few changes.

```

grunt serve

```

Play around with livereload by changing some of the styles in `app/styles/main.css` or HTML in one of the files in `app/templates/`. When you're ready, lets go ahead and build the assets for Cordova to consume and also spot check that we didn't bork any code during the build process. We can do that with another handy Grunt task that runs the build process and then launches a `connect` server for use to preview the app with our built assets.

```

grunt serve:dist

```

If everything looks good the next step is to add a platform target and then emulate our app. In order for us to launch the iOS simulator from the command line, we'll have to install the `ios-sim` package. (If you forget to do this, Cordova will kindly remind you).

```

npm install -g ios-sim

grunt platform:add:ios

grunt emulate:ios

```

You may have realized that when the Grunt build process is run, it triggers the Cordova build system as well, so you end up with a beautifully packaged mobile app in a single command.



consolelogs - on serve and emulate

#Android Walkthrough

Check out this [doc](https://github.com/DanielSilv/generator-ionic/blob/master/docs/android.md) if you would like a detailed android walkthrough!

#Testing

Now that you've started, why not learn how to [test](https://github.com/DanielSilv/generator-ionic/blob/master/docs/app-testing.md) your app?
