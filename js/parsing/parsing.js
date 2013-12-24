/*jslint browser:true, sloppy:true */
window.data = '';

function slug(name) {
    'use strict';
    return name.toLowerCase().replace(/\s/g, '-');
}

function kb(bytes) {
    'use strict';
    return (bytes / 1024).toFixed(1);
}

function id(i) {
    return document.getElementById(i);
}

function setText(id, str) {
    var el = document.getElementById(id);
    if (typeof el.innerText === 'string') {
        el.innerText = str;
    } else {
        el.textContent = str;
    }
}

function load(test, callback) {
    var xhr = new XMLHttpRequest(),
        src = test + '.js';

    try {
        xhr.timeout = 30000;
        xhr.open('GET', src, true);

        xhr.ontimeout = function () {
            setText('status', 'Error: time out while loading ' + test);
            callback.apply();
        };

        xhr.onreadystatechange = function () {
            var success = false,
                size = 0;

            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    window.data = this.responseText;
                    size = this.responseText.length;
                    success = true;
                }
            }

            if (success) {
                setText('status', 'Test data ' + test + ' is loaded: ' + kb(size) + ' KB.');
            } else {
                setText('status', 'Error loading ' + src);
            }

            callback.apply();
        };

        xhr.send(null);
    } catch (e) {
        setText('status', 'Please wait. Error loading ' + src);
        callback.apply();
    }
}

function runEsprima() {
    var test = 'Esprima', fn, benchmark;

    // Force the result to be held in this array, thus defeating any
    // possible "dead code elimination" optimization.
    window.tree = [];

    fn = function () {
        var syntax = window.esprima.parse(window.data, { range: true, comment: true });
        window.tree.push(syntax.body.length);
    };

    setText('esprima', 'Please wait. Parsing with Esprima (location info + comments)...');

    benchmark = new window.Benchmark(test, fn, {
        'onComplete': function () {
            setText('esprima', 'Esprima: ' + (1000 * this.stats.mean).toFixed(1) + ' ms');
        }
    });

    setTimeout(function () {
        benchmark.run();
    }, 200);
}

function runOther() {
    var test = 'parse-js', fn, benchmark;

    // Force the result to be held in this array, thus defeating any
    // possible "dead code elimination" optimization.
    window.tree = [];

    fn = function () {
        var syntax = UglifyJS.parse(window.data);
        window.tree.push(syntax.body.length);
    };

    setText('other', 'Please wait. Parsing with UglifyJS2 parser...');

    benchmark = new window.Benchmark(test, fn, {
        'onComplete': function () {
            setText('other', 'UglifyJS2 parser: ' + (1000 * this.stats.mean).toFixed(1) + ' ms');
            setTimeout(runEsprima, 200);
        }
    });

    setTimeout(function () {
        benchmark.run();
    }, 200);
}

window.onload = function () {
    load('dynarchlib-full', function () {
        if (window.data.length > 0) {
            id('run').disabled = false;
            id('run').onclick = function () {
                setTimeout(runOther, 200);
            };
        }
    });
};


