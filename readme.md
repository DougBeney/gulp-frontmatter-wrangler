gulp-frontmatter-wrangler
---

Temporarily remove YAML frontmatter from a file and put it back whenever you want.

## Installation

`npm install gulp-frontmatter-wrangler --save-dev`

## Example Code

```javascript
var gulp = require('gulp')
var frontmatter = require('gulp-frontmatter-wrangler')

gulp.task('default', function() {
		return gulp.src('*.pug')
		.pipe(frontmatter.take()) // Remove the frontmatter
		
		// Process your files however you want
		
		.pipe(frontmatter.putBack()) // Put the frontmatter back
		.pipe(gulp.dest('dist/'))
		})
```

