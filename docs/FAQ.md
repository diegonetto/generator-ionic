#Frequently asked questions

##How do I manage libraries with Bower?
Install a new front-end library using `bower install --save` to update your `bower.json` file.

```

bower install --save lodash

```

This way, when the Grunt [`bower-install`](https://github.com/stephenplusplus/grunt-bower-install#grunt-bower-install) task is run it will automatically inject your front-end dependencies inside the `bower:js` block of your `app/index.html`file.

##Can I manually add libraries?
Of course! If a library you wish to include is not registered with Bower or you wish to manually manage third party libraries, simply include any CSS and JavaScript files you need **inside** your `app/index.html` [usemin](https://github.com/yeoman/grunt-usemin#blocks) `build:js` or `build:css` blocks but **outside** the `bower:js` or `bower:css` blocks (since the Grunt task overwrites the Bower blocks' contents).
