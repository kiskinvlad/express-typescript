const { task, gulp, src, dest } = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const paths = {
    pages: ['src/static/*.html'],
    env: ['.env']
};

const copyHtml = function () {
    return src(paths.pages)
        .pipe(dest("dist"));
};

const copyEnv = function () {
    return src(paths.env)
        .pipe(dest("dist"));
};


function defaultTask(cb) {
    copyHtml();
    copyEnv();
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(dest("dist"));
    cb();
}

exports.default = defaultTask