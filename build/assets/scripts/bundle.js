!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){const n=document.getElementById("parallax").children;window.addEventListener("mousemove",e=>{const t=window.innerWidth/2-e.pageX,r=window.innerHeight/2-e.pageY;let o=0;for(let e of n){const n=o/70,i=t*n,l=r*n,c=window.innerHeight/2*n,a=e.firstElementChild;e.style.transform=`translate(${i}px, ${l}px)`,a.style.bottom=`-${c}px`,o++}});const r=document.getElementById("authorisation-btn"),o=document.querySelector(".welcome__flipper"),i=document.querySelector(".back");r.addEventListener("click",e=>{e.preventDefault(),o.style.transform="rotateY(180deg)"}),i.addEventListener("click",e=>{e.preventDefault(),o.style.transform="rotateY(0)"})}]);