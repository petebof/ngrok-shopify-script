# ngrok-shopify-script
With this code you can 
* Start ngrok on your dev Linux machine.
* Auto-configure the URLs at the app setup on Shopify servers - which was a constant pain for me!

Installation
--
1. Install the extension *Tampermonkey* on Chrome (or perhaps *Greasemonkey* on Firefox?) and add a uaer script containing the JavaScript code in file *tampermonkey.js*. Make sure that the @match comment matches your app's setup path at Shopify (and is postfixed by the query param subdomain).
2. On your Linux dev machine run the script *ngrokshopify.sh* 
