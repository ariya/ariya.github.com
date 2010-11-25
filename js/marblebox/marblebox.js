/*
  This file is part of the Ofi Labs X2 project.

  Copyright (C) 2010 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function Box(width, height) {
    this.width = width;
    this.height = height;
    this.dim = 15;
    this.marbles = [];

    var extra = 100;
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-extra, -extra);
    worldAABB.maxVertex.Set(width + extra, height + extra);
    this.world = new b2World(worldAABB, new b2Vec2(0, 1000), true);

    var createSlab = function (world, x, y, w, h) {
        var boxSd = new b2BoxDef();
        boxSd.extents.Set(w, h);
        var boxBd = new b2BodyDef();
        boxBd.AddShape(boxSd);
        boxBd.position.Set(x, y);
        world.CreateBody(boxBd);
    }

    createSlab(this.world, 0, height + extra - this.dim, width, extra);
    createSlab(this.world, 0, -extra - this.dim, width, extra);

    createSlab(this.world, -extra - this.dim, 0, extra, height);
    createSlab(this.world, width + extra - this.dim, 0, extra, height);

    return this;
};

Box.prototype.addMarble = function(x, y, c) {
    x += Math.random() * 10 - 5;
    var circleSd = new b2CircleDef();
    circleSd.density = 1.0;
    circleSd.radius = this.dim;
    circleSd.restitution = 0.6;
    circleSd.friction = 0;
    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(x, y);

    var marble = {};
    marble.body = this.world.CreateBody(circleBd);
    marble.radius = circleSd.radius;
    marble.color = c;
    marble.id = 'm' + (this.marbles.length + 1);
    this.marbles.push(marble);
    return marble;
};

Box.prototype.run = function(update) {
    var frameRate = 30;
    var that = this;

    window.setInterval(function() {
        that.world.Step(1 / frameRate, 1);
        that.marbles.forEach(function(m) {
            m.x = Math.round(m.body.m_position.x);
            m.y = Math.round(m.body.m_position.y);
            update(m);
        });
    }, 1000 / frameRate);
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */

function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
}

function randomColor() {
    var rgb = hslToRgb(Math.random(), 0.8, 0.5);
    return 'rgba(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ', 1)';
}

window.setTimeout(function() {
    var b = new Box(window.innerWidth, window.innerHeight);
    b.addMarble(b.width / 2, b.height / 2, 'yellow');

    if ('ontouchstart' in window) {
        var el = document.getElementById('text');
        el.addEventListener('touchstart', function (e) {
            if (e.targetTouches.length >= 1) {
                var x = e.targetTouches[0].clientX;
                var y = e.targetTouches[0].clientY;
                b.addMarble(x, y, randomColor());
            }
            e.preventDefault();
            e.stopPropagation();
        }, false);
    } else {
        window.addEventListener('mousedown', function (e) {
            b.addMarble(e.clientX, e.clientY, randomColor());
            e.preventDefault();
            e.stopPropagation();
        }, false);
    }

    if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', function (e) {
            b.world.m_gravity.x = e.gamma * 8;
            b.world.m_gravity.y = e.beta * 14;
        }, false);
    } else {
        if ('ondevicemotion' in window) {
            window.addEventListener('devicemotion', function (e) {
                b.world.m_gravity.x = e.accelerationIncludingGravity.x * 40;
                b.world.m_gravity.y = -e.accelerationIncludingGravity.y * 40;
            }, false);
        }
    }

    b.run(function(m) {
        var el = document.getElementById(m.id);
        if (el === null) {
            var el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.left = m.x + 'px';
            el.style.top = m.y + 'px';
            el.style.width = 2 * m.radius + 'px';
            el.style.height = 2 * m.radius + 'px';
            el.style.backgroundColor = m.color;
            el.style.webkitBorderRadius = m.radius + 'px';
            el.style.borderRadius = m.radius + 'px';
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.id = m.id;
            document.body.appendChild(el);
        } else {
            el.style.left = Math.round(m.x) + 'px';
            el.style.top = Math.round(m.y) + 'px';
        }
    });
}, 0);
