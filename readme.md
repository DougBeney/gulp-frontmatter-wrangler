gulp-frontmatter-wrangler
---

Temporarily remove YAML frontmatter from a file and put it back whenever you want.

## Installation

`npm install gulp-frontmatter-wrangler --save-dev`

## Function Documentation

`frontmatter.take(UNIQUE_NAMESPACE_STRING)`
`frontmatter.putBack(UNIQUE_NAMESPACE_STRING)`

UNIQUE_NAMESPACE_STRING: A string to identify your specific task. Ex. "pug", "sass", or "my blog posts".

## Example Code

```javascript
var gulp = require('gulp')
var frontmatter = require('gulp-frontmatter-wrangler')

gulp.task('default', function() {
  return gulp.src('*.pug')
    .pipe(frontmatter.take("pug")) // Remove the frontmatter
    
    // Process your files however you want

    .pipe(frontmatter.putBack("pug")) // Put the frontmatter back
    .pipe(gulp.dest('dist/'))
  })
```

