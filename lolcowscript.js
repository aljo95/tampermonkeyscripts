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
    if (!x) return

        var current = false
        var enableScript = false
        var globalX = 0
        var globalY = 0

        //x.style.width = "60%";
        x.style.margin = "auto";

    //get current ID from localstorage
    current = localStorage.getItem("currElem")
    console.log("start 1: " + current)
    if (current === null) current = false
    console.log("start 2: " + current)



    const getPosAndScroll = (topDiv) => {
        if ((topDiv.id).substring(0, 7) === "thread_") {
            return
        }
        topDiv.scrollIntoView()
        let currentScrollY = window.scrollY
        let newScroll = currentScrollY - 50
        window.scroll(0, newScroll)
    }


    if (typeof current === "string" && current !== "") {
        current = document.getElementById(current)
        x.style.width = "60%";
        enableScript = true
        setTimeout(() => {
                getPosAndScroll(current)
        }, 500)

        current.style.outline = "4px solid pink";
        current.style.borderRadius = "10px";
        current.style.marginTop = "15px";
        current.style.marginBottom = "15px";
        current.style.boxShadow = "0 0 20px pink"

    }





        window.onmouseup = e => {

            if (!enableScript) return;//comment out this for different funcionatlity

            if (globalX !== e.clientX || globalY !== e.clientY) return;
            console.log(current)

            if (current) {
                current.style.outline = "none"
                current.style.borderRadius = "0px";
                current.style.marginTop = "2px";
                current.style.marginBottom = "2px";
                current.style.boxShadow = "0 0 0px"
                localStorage.removeItem("currElem");
            }
            current = e.target
            console.log(current)

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
            //save current in localstorage
            localStorage.setItem("currElem", current.id)
        }
        window.onmousedown = e => {
            globalX = e.clientX
            globalY = e.clientY
        }
        var currentTopDiv = false
        document.addEventListener('keydown', e => {



            if (e.shiftKey && e.key === "½") {
                getPosAndScroll(current)
            }



            if (e.key === "§") {
                enableScript ? currentTopDiv = document.elementFromPoint(685, 40) : currentTopDiv = document.elementFromPoint(230, 40);
                if (enableScript) {

                    x.style.width = "100%";
                    if (current) {
                        //comment out this block for different functionality
                        current.style.outline = "none";
                        current.style.borderRadius = "0px";
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
                getPosAndScroll(currentTopDiv)
            }
        })
})();