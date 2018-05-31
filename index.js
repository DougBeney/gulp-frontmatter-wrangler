var through = require('through2')
var PluginError = require('plugin-error')
var frontMatter = require('front-matter')

// consts
const PLUGIN_NAME = 'gulp-frontmatter-wrangler'

// exporting the plugin main function
module.exports = {
	frontmatter: {},
	getFrontMatter: function(contents){
		var frontMatterObject = frontMatter(contents);
		var attributes = frontMatterObject['attributes'];
		var numOfAttributes = Object.keys(attributes).length;
		var frontMatter_string = "";
		if (numOfAttributes > 0) {
			frontMatter_string += "---\n";
			frontMatter_string += frontMatterObject['frontmatter'];
			frontMatter_string += "\n---\n\n";
		}
		return {
			frontmatter: frontMatter_string,
			body: frontMatterObject['body'],
		}
	},
	take: function(namespace) {
		var PluginObject = this
		var stream = through.obj(function(file, enc, cb) {
			if (file.isStream()) {
				this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'))
				return cb()
			}
			if (file.isBuffer()) {
				const contents = String(file.contents)
				const frontMatterObject = PluginObject.getFrontMatter(contents)
				PluginObject.frontmatter[namespace] = frontMatterObject['frontmatter']
				file.contents = new Buffer(frontMatterObject['body'])
			}
			// make sure the file goes through the next gulp plugin
			this.push(file)

			// tell the stream engine that we are done with this file
			cb()
		})

		// returning the file stream
		return stream
	},
	putBack: function(namespace) {
		var PluginObject = this
		var stream = through.obj(function(file, enc, cb) {
			if (file.isStream()) {
				this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'))
				return cb()
			}
			if (file.isBuffer()) {
				const contents = String(file.contents)
				file.contents = new Buffer(PluginObject.frontmatter[namespace] + contents)
			}

			this.push(file)

			// tell the stream engine that we are done with this file
			cb()
		})

		// returning the file stream
		return stream
	}
}
