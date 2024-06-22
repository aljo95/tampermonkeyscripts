// ==UserScript==
// @name         lolcow-KekScript
// @namespace    http://tampermonkey.net/
// @version      2024-06-21
// @description  ke jaanait achi je hamra nahi bujhal achi ahaan ke pata achi je o sab nai janait achi aa kiyo janait achi
// @author       somebuddy
// @match        https://lolcow.farm/*
// @icon
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let x = document.querySelector('form[name="postcontrols"]');
    //setTimeout(() => {
    if (!x) return

        var current = false
        var enableScript = false
        var globalX = 0
        var globalY = 0

        //x.style.width = "60%";
        x.style.margin = "auto";

        window.onmouseup = e => {

            if (!enableScript) return;

            if (globalX !== e.clientX || globalY !== e.clientY) return;

            if (current) {
                current.style.outline = "none"
                current.style.borderRadius = "0";
                current.style.marginTop = "2px";
                current.style.marginBottom = "2px";
                current.style.boxShadow = "0 0 0px"
            }
            current = e.target

            if (current.className === "post reply") {
                current.style.outline = "4px solid pink";
                current.style.borderRadius = "10px";
                current.style.marginTop = "15px";
                current.style.marginBottom = "15px";
                current.style.boxShadow = "0 0 20px pink"
            }
            else if (current.className === "intro" || current.className === "body") {
                current = current.parentElement;
                current.style.outline = "4px solid pink";
                current.style.borderRadius = "10px";
                current.style.marginTop = "15px";
                current.style.marginBottom = "15px";
                current.style.boxShadow = "0 0 20px pink"
            }
        }
        window.onmousedown = e => {
            //console.log(e.clientX);
            //console.log(e.clientY);
            globalX = e.clientX
            globalY = e.clientY

        }
        var currentTopDiv = false
        document.addEventListener('keydown', e => {

            enableScript ? currentTopDiv = document.elementFromPoint(685, 40) : currentTopDiv = document.elementFromPoint(230, 40);

            if (e.key === "§") {
                if (enableScript) {

                    x.style.width = "100%";
                    if (current) {
                        current.style.outline = "none";
                        current.style.borderRadius = "0";
                        current.style.marginTop = "2px";
                        current.style.marginBottom = "2px";
                        current.style.boxShadow = "0 0 0px"
                    }
                    enableScript = false;
                } else if (!enableScript) {
                    x.style.width = "60%";
                    if (current.className === "post reply") {
                        current.style.outline = "4px solid pink";
                        current.style.borderRadius = "10px";
                        current.style.marginTop = "15px";
                        current.style.marginBottom = "15px";
                        current.style.boxShadow = "0 0 20px pink"
                    }
                    else if (current.className === "intro" || current.className === "body") {
                        current = current.parentElement;
                        current.style.outline = "4px solid pink";
                        current.style.borderRadius = "10px";
                        current.style.marginTop = "15px";
                        current.style.marginBottom = "15px";
                        current.style.boxShadow = "0 0 20px pink"
                    }
                    enableScript = true;
                }
            }
            getPosAndScroll(currentTopDiv)
        })
    const getPosAndScroll = (topDiv) => {
        if ((topDiv.id).substring(0, 7) === "thread_") {
            return
        }
        //console.log(topDiv)
        topDiv.scrollIntoView()
    }
})();