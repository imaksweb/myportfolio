'use strict';

const parallax = require('./modules/parallax');
const flip = require('./modules/flip');

const menu = require('./modules/hamburger');
const blog = require('./modules/blog');
const mobileBlog = require('./modules/blog-mobile');
const slider = require('./modules/slider');
// const blur = require('./modules/blur');

parallax();
flip();
menu();
blog();
mobileBlog();
slider();
// blur();

