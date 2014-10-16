#Frequently asked questions

##How do I manage libraries with Bower?
Install a new front-end library using `bower install --save` to update your `bower.json` file.

```

bower install --save lodash

```

This way, when the Grunt [`bower-install`](https://github.com/stephenplusplus/grunt-bower-install#grunt-bower-install) task is run it will automatically inject your front-end dependencies inside the `bower:js` block of your `app/index.html`file.

##Can I manually add libraries?
Of course! If a library you wish to include is not registered with Bower or you wish to manually manage third party libraries, simply include any CSS and JavaScript files you need **inside** your `app/index.html` [usemin](https://github.com/yeoman/grunt-usemin#blocks) `build:js` or `build:css` blocks but **outside** the `bower:js` or `bower:css` blocks (since the Grunt task overwrites the Bower blocks' contents).

##How do I use the Ripple Emulator?
**Be Advised**: [Ripple](http://ripple.incubator.apache.org/) is under active development so expect support for some plugins to be missing or broken.



Add a platform target then run `grunt ripple` to launch the emulator in your browser.

```

grunt platform:add:ios

grunt ripple

```



Now go edit a file and then refresh your browser to see your changes. (Currently experimenting with livereload for Ripple)



**Note**: If you get errors beginning with `Error: static() root path required`, don't fret. Ripple defaults the UI to Android so just switch to an iOS device and you'll be good to go.



![Ripple](http://i.imgur.com/LA4Hip1l.png)
