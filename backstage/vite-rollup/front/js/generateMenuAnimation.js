/**
*
* Copyright 2017 Google Inc. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
// https://developer.chrome.com/blog/performant-expand-and-collapse
document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Define the variables for elements
    const _menu = document.querySelector('#footer-right');
    const _menuContents = _menu.querySelector('#issues-menu');
    const _menuToggleButton = _menu.querySelector('.toggle-button');

    let _expanded = true;
    let _animate = false;

    const _duration = 200;
    const _frameTime = 1000 / 60;
    const _nFrames = Math.round(_duration / _frameTime);
    let _collapsed;

    function calculateScales() {
        let _menuTitle = _menu.querySelector('.toggle-button');
        const collapsed = _menuTitle.getBoundingClientRect();
        const expanded = _menu.getBoundingClientRect();

        _collapsed = {
            x: collapsed.width / expanded.width,
            y: collapsed.height / expanded.height
        };
    }

    function createEaseAnimations() {
        let menuEase = document.querySelector('.menu-ease');
        if (menuEase)
            return menuEase;

        menuEase = document.createElement('style');

        const menuExpandAnimation = [];
        const menuExpandContentsAnimation = [];
        const menuCollapseAnimation = [];
        const menuCollapseContentsAnimation = [];

        const percentIncrement = 100 / _nFrames;

        for (let i = 0; i <= _nFrames; i++) {
            const step = ease(i / _nFrames).toFixed(5);
            const percentage = (i * percentIncrement).toFixed(5);
            const startX = _collapsed.x;
            const startY = _collapsed.y;
            const endX = 1;
            const endY = 1;

            // Expand animation.
            append({
                percentage,
                step,
                startX,
                startY,
                endX,
                endY,
                outerAnimation: menuExpandAnimation,
                innerAnimation: menuExpandContentsAnimation
            });

            // Collapse animation.
            append({
                percentage,
                step,
                startX: 1,
                startY: 1,
                endX: _collapsed.x,
                endY: _collapsed.y,
                outerAnimation: menuCollapseAnimation,
                innerAnimation: menuCollapseContentsAnimation
            });
        }

        menuEase.textContent = `
        @keyframes menuExpandAnimation {${menuExpandAnimation.join('')}}
        @keyframes menuExpandContentsAnimation {${menuExpandContentsAnimation.join('')}}
        @keyframes menuCollapseAnimation {${menuCollapseAnimation.join('')}}
        @keyframes menuCollapseContentsAnimation {${menuCollapseContentsAnimation.join('')}}
    `;

        return document.head.appendChild(menuEase);
    }

    function append({ percentage, step, startX, startY, endX, endY, outerAnimation, innerAnimation }) {
        const xScale = (startX + (endX - startX) * step).toFixed(5);
        const yScale = (startY + (endY - startY) * step).toFixed(5);

        const invScaleX = (1 / xScale).toFixed(5);
        const invScaleY = (1 / yScale).toFixed(5);

        outerAnimation.push(`
            ${percentage}% { transform: scale(${xScale}, ${yScale}); }
        `);

        innerAnimation.push(`
            ${percentage}% { transform: scale(${invScaleX}, ${invScaleY}); }
        `);
    }

    function ease(v, pow = 4) {
        v = Math.max(0, Math.min(1, v));

        return 1 - Math.pow(1 - v, pow);
    }

    /* calc done, below is toggle*/
    function toggle() {
        if (_expanded)
            return collapse();

        expand();
    }

    function collapse() {
        if (!_expanded)
            return;

        _expanded = false;

        const { x, y } = _collapsed;
        const invX = 1 / x;
        const invY = 1 / y;

        _menu.style.transform = `scale(${x}, ${y})`;
        _menuContents.style.transform = `scale(${invX}, ${invY})`;

        if (!_animate) {
            return;
        }

        applyAnimation({ expand: false });
    }

    function expand() {
        if (_expanded)
            return;

        _expanded = true;

        _menu.style.transform = `scale(1, 1)`;
        _menuContents.style.transform = `scale(1, 1)`;

        if (!_animate)
            return;

        applyAnimation({ expand: true });
    }

    function applyAnimation({ expand } = opts) {
        _menu.classList.remove('menu--expanded');
        _menu.classList.remove('menu--collapsed');
        _menuContents.classList.remove('menu__contents--expanded');
        _menuContents.classList.remove('menu__contents--collapsed');

        // Force a recalc styles here so the classes take hold.
        window.getComputedStyle(_menu).transform;

        if (expand) {
            _menu.classList.add('menu--expanded');
            _menuContents.classList.add('menu__contents--expanded');
            return;
        }

        _menu.classList.add('menu--collapsed');
        _menuContents.classList.add('menu__contents--collapsed');
    }

    calculateScales()
    createEaseAnimations()
    _menuToggleButton.addEventListener('click', toggle)
    // collapse()

    // customized for page use
    if (window.innerWidth < 768)
        collapse()

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768)
            collapse()
        else {
            expand()
        }
    }
    );

    setTimeout(() => {
        _menu.classList.add('menu--active');
        _animate = true;
    }, 0);

});
