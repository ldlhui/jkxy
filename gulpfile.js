//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
    htmlmin = require('gulp-htmlmin'),//html压缩
    cssmin = require('gulp-minify-css'),//css压缩
    //jshint = require('gulp-jshint'),//js检查
    uglify = require('gulp-uglify'),//js压缩
    plumber=require('gulp-plumber'),//检测错误
    Replace = require('gulp-replace'),
    processhtml = require('gulp-processhtml'),
    conCat = require('gulp-concat');
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('css')); //将会在src/css下生成index.css
});
var date = new Date().getTime();
function errrHandler( e ){
    // 控制台发声,错误时beep一下
    gutil.beep();
    gutil.log(e);
    this.emit('end');
}
 gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(['*.htm','*.html'])       
        .pipe(plumber({errorHandler:errrHandler}))     
        .pipe(Replace(/_VERSION_/gi, date))
        .pipe(processhtml())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('min'));
});
gulp.task('cssmin', function(){
    gulp.src('css/*.css')
        .pipe(conCat('css/index.min.css'))
        .pipe(plumber({errorHandler:errrHandler}))
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))    
        .pipe(gulp.dest('min'));
         
});
gulp.task('jsmin', function () {
    gulp.src(['js/*.js','!index/**/{text1,text2}.js'])
        .pipe(conCat('js/index.min.js'))
        .pipe(plumber({errorHandler:errrHandler}))
        .pipe(uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']},//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'false' //保留所有注释
        }))
        .pipe(gulp.dest('min'));
}); 
gulp.task('default',['testLess','htmlmin','cssmin','jsmin']);