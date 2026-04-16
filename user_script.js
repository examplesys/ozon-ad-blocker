// ==UserScript==
// @name         OZON AdBlocker
// @version      2026-04-16
// @description
// @author       Me
// @match        https://www.ozon.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ozon.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAdBanners() {
        const banners = document.querySelectorAll('[data-widget=advBanner]');
        for (const banner of banners) {
            banner.style.display = 'none';
        }

        const carousels = document.querySelectorAll('[data-widget=bannerCarousel]');
        for (const carousel of carousels) {
            carousel.style.display = 'none';

            const parent = carousel.parentElement;
            if (!parent) continue;

            const separator = parent.children[1];
            separator.style.display = 'none';
        }

        const chatItem = document.querySelector('[data-perf=chatItem]');
        if (!chatItem) return;

        const chatWidget = chatItem.parentElement;
        if (!chatWidget) return;

        const chatBanner = chatWidget.children[0];
        if (!chatBanner.attributes['data-perf']) {
            chatBanner.remove();
        }
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                removeAdBanners();
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', () => {
        removeAdBanners();
    });
})();
