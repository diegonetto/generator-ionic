# Why a vendor folder?

In the past week, I had two independent occasions, where I needed to manually add JS / CSS files. The first time, with [MomentJS](http://momentjs.com/) the repo was even available through bower, but it included distinct versions of the library: a regular, a minified version, a version with languages, languages minified, and bower does not seem to have the option to choose one.

The second time it was with a ionic specific repo, [ionic-contrib-frosted-glass](https://github.com/driftyco/ionic-contrib-frosted-glass) That one basically did not have a bower version.

To make it easy, I added a vendor folder with Grunt support.

## How does it work

Really simple :) Both JS and CSS files can be added here. The CSS files will be copied to .tmp folder by the copy:vendor Grunt task. There, they will be processed by the autoprefixer task. The JS files are not processed at the moment. The files need to be inserted manually into index.html, I created wrappers.

## How to disable

When there is no file in the vendor folder, nothing happens. The Grunt task copy:vendor can also be removed from grunt serve and grunt build tasks.