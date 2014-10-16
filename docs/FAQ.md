#Frequently asked questions

##How do I manage libraries with Bower?
Install a new front-end library using `bower install --save` to update your `bower.json` file.

```

bower install --save lodash

```

This way, when the Grunt [`bower-install`](https://github.com/stephenplusplus/grunt-bower-install#grunt-bower-install) task is run it will automatically inject your front-end dependencies inside the `bower:js` block of your `app/index.html`file.
