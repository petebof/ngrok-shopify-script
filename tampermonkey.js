// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://partners.shopify.com/123456/apps/*/edit?subdomain=*
// @grant        none
// ==/UserScript==

(function() {
    var comps = window.top.location.href.split('=');
    if (comps.length != 2 || !comps[0].endsWith('subdomain') || !comps[1]) {
        alert('Wrong query in URL... Expected subdomain=smth');
        return;
    }

    ["info_form_application_url", "info_form_redirect_url_whitelist"].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) {
            alert('Cannot find text input with id ' + id);
            return;
        }
        var val = el.value
        var start = val.indexOf('https://') + 8;
        var end = val.indexOf('.ngrok.io');
        el.value = val.substring(0,8) + comps[1] + val.substring(end);
        el.dispatchEvent(new Event('change'));
    });

    var btn = document.querySelectorAll("header button.ui-button--primary");
    if (btn.length != 1) {
        alert('"Save button" not found or ambiguous.');
        return;
    }
    btn[0].dispatchEvent(new Event('click'));
})();
