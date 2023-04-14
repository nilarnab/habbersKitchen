import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { WebView } from 'react-native-webview'

import InfiniteList from './InfiniteList';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import Header from './UniversalHeader';
import { SideBar } from './SideBar';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const htmlCont = require('../post_content_1.html')

const HTML = `
<!doctype html>
<html lang="en-US">

<head>
  <meta charset="UTF-8" />
  <script>if (navigator.userAgent.match(/MSIE|Internet Explorer/i) || navigator.userAgent.match(/Trident\/7\..*?rv:11/i)) { var href = document.location.href; if (!href.match(/[?&]nowprocket/)) { if (href.indexOf("?") == -1) { if (href.indexOf("#") == -1) { document.location.href = href + "?nowprocket=1" } else { document.location.href = href.replace("#", "?nowprocket=1#") } } else { if (href.indexOf("#") == -1) { document.location.href = href + "&nowprocket=1" } else { document.location.href = href.replace("#", "&nowprocket=1#") } } } }</script>
  <script>class RocketLazyLoadScripts { constructor() { this.triggerEvents = ["keydown", "mousedown", "mousemove", "touchmove", "touchstart", "touchend", "wheel"], this.userEventHandler = this._triggerListener.bind(this), this.touchStartHandler = this._onTouchStart.bind(this), this.touchMoveHandler = this._onTouchMove.bind(this), this.touchEndHandler = this._onTouchEnd.bind(this), this.clickHandler = this._onClick.bind(this), this.interceptedClicks = [], window.addEventListener("pageshow", t => { this.persisted = t.persisted }), window.addEventListener("DOMContentLoaded", () => { this._preconnect3rdParties() }), this.delayedScripts = { normal: [], async: [], defer: [] }, this.trash = [], this.allJQueries = [] } _addUserInteractionListener(t) { if (document.hidden) { t._triggerListener(); return } this.triggerEvents.forEach(e => window.addEventListener(e, t.userEventHandler, { passive: !0 })), window.addEventListener("touchstart", t.touchStartHandler, { passive: !0 }), window.addEventListener("mousedown", t.touchStartHandler), document.addEventListener("visibilitychange", t.userEventHandler) } _removeUserInteractionListener() { this.triggerEvents.forEach(t => window.removeEventListener(t, this.userEventHandler, { passive: !0 })), document.removeEventListener("visibilitychange", this.userEventHandler) } _onTouchStart(t) { "HTML" !== t.target.tagName && (window.addEventListener("touchend", this.touchEndHandler), window.addEventListener("mouseup", this.touchEndHandler), window.addEventListener("touchmove", this.touchMoveHandler, { passive: !0 }), window.addEventListener("mousemove", this.touchMoveHandler), t.target.addEventListener("click", this.clickHandler), this._renameDOMAttribute(t.target, "onclick", "rocket-onclick"), this._pendingClickStarted()) } _onTouchMove(t) { window.removeEventListener("touchend", this.touchEndHandler), window.removeEventListener("mouseup", this.touchEndHandler), window.removeEventListener("touchmove", this.touchMoveHandler, { passive: !0 }), window.removeEventListener("mousemove", this.touchMoveHandler), t.target.removeEventListener("click", this.clickHandler), this._renameDOMAttribute(t.target, "rocket-onclick", "onclick"), this._pendingClickFinished() } _onTouchEnd(t) { window.removeEventListener("touchend", this.touchEndHandler), window.removeEventListener("mouseup", this.touchEndHandler), window.removeEventListener("touchmove", this.touchMoveHandler, { passive: !0 }), window.removeEventListener("mousemove", this.touchMoveHandler) } _onClick(t) { t.target.removeEventListener("click", this.clickHandler), this._renameDOMAttribute(t.target, "rocket-onclick", "onclick"), this.interceptedClicks.push(t), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), this._pendingClickFinished() } _replayClicks() { window.removeEventListener("touchstart", this.touchStartHandler, { passive: !0 }), window.removeEventListener("mousedown", this.touchStartHandler), this.interceptedClicks.forEach(t => { t.target.dispatchEvent(new MouseEvent("click", { view: t.view, bubbles: !0, cancelable: !0 })) }) } _waitForPendingClicks() { return new Promise(t => { this._isClickPending ? this._pendingClickFinished = t : t() }) } _pendingClickStarted() { this._isClickPending = !0 } _pendingClickFinished() { this._isClickPending = !1 } _renameDOMAttribute(t, e, r) { t.hasAttribute && t.hasAttribute(e) && (event.target.setAttribute(r, event.target.getAttribute(e)), event.target.removeAttribute(e)) } _triggerListener() { this._removeUserInteractionListener(this), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this._loadEverythingNow.bind(this)) : this._loadEverythingNow() } _preconnect3rdParties() { let t = []; document.querySelectorAll("script[type=rocketlazyloadscript]").forEach(e => { if (e.hasAttribute("src")) { let r = new URL(e.src).origin; r !== location.origin && t.push({ src: r, crossOrigin: e.crossOrigin || "module" === e.getAttribute("data-rocket-type") }) } }), t = [...new Map(t.map(t => [JSON.stringify(t), t])).values()], this._batchInjectResourceHints(t, "preconnect") } async _loadEverythingNow() { this.lastBreath = Date.now(), this._delayEventListeners(this), this._delayJQueryReady(this), this._handleDocumentWrite(), this._registerAllDelayedScripts(), this._preloadAllScripts(), await this._loadScriptsFromList(this.delayedScripts.normal), await this._loadScriptsFromList(this.delayedScripts.defer), await this._loadScriptsFromList(this.delayedScripts.async); try { await this._triggerDOMContentLoaded(), await this._triggerWindowLoad() } catch (t) { console.error(t) } window.dispatchEvent(new Event("rocket-allScriptsLoaded")), this._waitForPendingClicks().then(() => { this._replayClicks() }), this._emptyTrash() } _registerAllDelayedScripts() { document.querySelectorAll("script[type=rocketlazyloadscript]").forEach(t => { t.hasAttribute("data-rocket-src") ? t.hasAttribute("async") && !1 !== t.async ? this.delayedScripts.async.push(t) : t.hasAttribute("defer") && !1 !== t.defer || "module" === t.getAttribute("data-rocket-type") ? this.delayedScripts.defer.push(t) : this.delayedScripts.normal.push(t) : this.delayedScripts.normal.push(t) }) } async _transformScript(t) { return new Promise((await this._littleBreath(), navigator.userAgent.indexOf("Firefox/") > 0 || "" === navigator.vendor) ? e => { let r = document.createElement("script");[...t.attributes].forEach(t => { let e = t.nodeName; "type" !== e && ("data-rocket-type" === e && (e = "type"), "data-rocket-src" === e && (e = "src"), r.setAttribute(e, t.nodeValue)) }), t.text && (r.text = t.text), r.hasAttribute("src") ? (r.addEventListener("load", e), r.addEventListener("error", e)) : (r.text = t.text, e()); try { t.parentNode.replaceChild(r, t) } catch (i) { e() } } : async e => { function r() { t.setAttribute("data-rocket-status", "failed"), e() } try { let i = t.getAttribute("data-rocket-type"), n = t.getAttribute("data-rocket-src"); t.text, i ? (t.type = i, t.removeAttribute("data-rocket-type")) : t.removeAttribute("type"), t.addEventListener("load", function r() { t.setAttribute("data-rocket-status", "executed"), e() }), t.addEventListener("error", r), n ? (t.removeAttribute("data-rocket-src"), t.src = n) : t.src = "data:text/javascript;base64," + window.btoa(unescape(encodeURIComponent(t.text))) } catch (s) { r() } }) } async _loadScriptsFromList(t) { let e = t.shift(); return e && e.isConnected ? (await this._transformScript(e), this._loadScriptsFromList(t)) : Promise.resolve() } _preloadAllScripts() { this._batchInjectResourceHints([...this.delayedScripts.normal, ...this.delayedScripts.defer, ...this.delayedScripts.async], "preload") } _batchInjectResourceHints(t, e) { var r = document.createDocumentFragment(); t.forEach(t => { let i = t.getAttribute && t.getAttribute("data-rocket-src") || t.src; if (i) { let n = document.createElement("link"); n.href = i, n.rel = e, "preconnect" !== e && (n.as = "script"), t.getAttribute && "module" === t.getAttribute("data-rocket-type") && (n.crossOrigin = !0), t.crossOrigin && (n.crossOrigin = t.crossOrigin), t.integrity && (n.integrity = t.integrity), r.appendChild(n), this.trash.push(n) } }), document.head.appendChild(r) } _delayEventListeners(t) { let e = {}; function r(t, r) { !function t(r) { !e[r] && (e[r] = { originalFunctions: { add: r.addEventListener, remove: r.removeEventListener }, eventsToRewrite: [] }, r.addEventListener = function () { arguments[0] = i(arguments[0]), e[r].originalFunctions.add.apply(r, arguments) }, r.removeEventListener = function () { arguments[0] = i(arguments[0]), e[r].originalFunctions.remove.apply(r, arguments) }); function i(t) { return e[r].eventsToRewrite.indexOf(t) >= 0 ? "rocket-" + t : t } }(t), e[t].eventsToRewrite.push(r) } function i(t, e) { let r = t[e]; Object.defineProperty(t, e, { get: () => r || function () { }, set(i) { t["rocket" + e] = r = i } }) } r(document, "DOMContentLoaded"), r(window, "DOMContentLoaded"), r(window, "load"), r(window, "pageshow"), r(document, "readystatechange"), i(document, "onreadystatechange"), i(window, "onload"), i(window, "onpageshow") } _delayJQueryReady(t) { let e; function r(r) { if (r && r.fn && !t.allJQueries.includes(r)) { r.fn.ready = r.fn.init.prototype.ready = function (e) { return t.domReadyFired ? e.bind(document)(r) : document.addEventListener("rocket-DOMContentLoaded", () => e.bind(document)(r)), r([]) }; let i = r.fn.on; r.fn.on = r.fn.init.prototype.on = function () { if (this[0] === window) { function t(t) { return t.split(" ").map(t => "load" === t || 0 === t.indexOf("load.") ? "rocket-jquery-load" : t).join(" ") } "string" == typeof arguments[0] || arguments[0] instanceof String ? arguments[0] = t(arguments[0]) : "object" == typeof arguments[0] && Object.keys(arguments[0]).forEach(e => { delete Object.assign(arguments[0], { [t(e)]: arguments[0][e] })[e] }) } return i.apply(this, arguments), this }, t.allJQueries.push(r) } e = r } r(window.jQuery), Object.defineProperty(window, "jQuery", { get: () => e, set(t) { r(t) } }) } async _triggerDOMContentLoaded() { this.domReadyFired = !0, await this._littleBreath(), document.dispatchEvent(new Event("rocket-DOMContentLoaded")), await this._littleBreath(), window.dispatchEvent(new Event("rocket-DOMContentLoaded")), await this._littleBreath(), document.dispatchEvent(new Event("rocket-readystatechange")), await this._littleBreath(), document.rocketonreadystatechange && document.rocketonreadystatechange() } async _triggerWindowLoad() { await this._littleBreath(), window.dispatchEvent(new Event("rocket-load")), await this._littleBreath(), window.rocketonload && window.rocketonload(), await this._littleBreath(), this.allJQueries.forEach(t => t(window).trigger("rocket-jquery-load")), await this._littleBreath(); let t = new Event("rocket-pageshow"); t.persisted = this.persisted, window.dispatchEvent(t), await this._littleBreath(), window.rocketonpageshow && window.rocketonpageshow({ persisted: this.persisted }) } _handleDocumentWrite() { let t = new Map; document.write = document.writeln = function (e) { let r = document.currentScript; r || console.error("WPRocket unable to document.write this: " + e); let i = document.createRange(), n = r.parentElement, s = t.get(r); void 0 === s && (s = r.nextSibling, t.set(r, s)); let a = document.createDocumentFragment(); i.setStart(a, 0), a.appendChild(i.createContextualFragment(e)), n.insertBefore(a, s) } } async _littleBreath() { Date.now() - this.lastBreath > 45 && (await this._requestAnimFrame(), this.lastBreath = Date.now()) } async _requestAnimFrame() { return document.hidden ? new Promise(t => setTimeout(t)) : new Promise(t => requestAnimationFrame(t)) } _emptyTrash() { this.trash.forEach(t => t.remove()) } static run() { let t = new RocketLazyLoadScripts; t._addUserInteractionListener(t) } } RocketLazyLoadScripts.run();</script>

  <style id="wpr-usedcss">
    .sc_fs_card__animate summary {
      display: block;
      cursor: pointer;
      position: relative;
      padding: 1em 1em 1em 2em
    }

    .sc_fs_card__animate summary:before {
      content: "";
      position: absolute;
      top: 1.5em;
      left: 1em;
      transform: rotate(0);
      transform-origin: .2rem 50%;
      transition: .25s transform ease;
      border: .4rem solid transparent;
      border-left-color: inherit
    }

    .sc_fs_card__animate[open]>summary:before {
      transform: rotate(90deg)
    }

    .sc_fs_card__animate {
      padding: 0
    }

    .sc_fs_card__animate .sc_fs_faq__content {
      padding: 0 1em 1em
    }

    .sc_fs_card__animate .sc_fs_faq__content>:first-child {
      margin-top: 0
    }

    :where(.wp-block-button__link) {
      box-shadow: none;
      text-decoration: none;
      border-radius: 9999px;
      padding: calc(.667em + 2px) calc(1.333em + 2px)
    }

    :where(.wp-block-columns.has-background) {
      padding: 1.25em 2.375em
    }

    :where(.wp-block-post-comments input[type=submit]) {
      border: none
    }

    :where(.wp-block-file__button) {
      border-radius: 2em;
      padding: .5em 1em
    }

    :where(.wp-block-file__button):is(a):active,
    :where(.wp-block-file__button):is(a):focus,
    :where(.wp-block-file__button):is(a):hover,
    :where(.wp-block-file__button):is(a):visited {
      box-shadow: none;
      color: #fff;
      opacity: .85;
      text-decoration: none
    }

    .wp-block-gallery:not(.has-nested-images) {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      padding: 0;
      margin: 0
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item {
      margin: 0 1em 1em 0;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      position: relative;
      width: calc(50% - 1em)
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item:nth-of-type(2n) {
      margin-right: 0
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item figure {
      margin: 0;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item img {
      display: block;
      max-width: 100%;
      height: auto;
      width: auto
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item figcaption {
      position: absolute;
      bottom: 0;
      width: 100%;
      max-height: 100%;
      overflow: auto;
      padding: 3em .77em .7em;
      color: #fff;
      text-align: center;
      font-size: .8em;
      background: linear-gradient(0deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, .3) 70%, transparent);
      box-sizing: border-box;
      margin: 0;
      z-index: 2
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item figcaption img {
      display: inline
    }

    .wp-block-gallery:not(.has-nested-images) figcaption {
      flex-grow: 1
    }

    .wp-block-gallery:not(.has-nested-images) .blocks-gallery-item:last-child {
      margin-right: 0
    }

    .wp-block-gallery:not(.is-cropped) .blocks-gallery-item {
      align-self: flex-start
    }

    .wp-block-image img {
      height: auto;
      max-width: 100%;
      vertical-align: bottom
    }

    .wp-block-image img {
      box-sizing: border-box
    }

    .wp-block-image figcaption {
      margin-top: .5em;
      margin-bottom: 1em
    }

    .wp-block-image :where(.has-border-color) {
      border-style: solid
    }

    .wp-block-image :where([style*=border-top-color]) {
      border-top-style: solid
    }

    .wp-block-image :where([style*=border-right-color]) {
      border-right-style: solid
    }

    .wp-block-image :where([style*=border-bottom-color]) {
      border-bottom-style: solid
    }

    .wp-block-image :where([style*=border-left-color]) {
      border-left-style: solid
    }

    .wp-block-image :where([style*=border-width]) {
      border-style: solid
    }

    .wp-block-image :where([style*=border-top-width]) {
      border-top-style: solid
    }

    .wp-block-image :where([style*=border-right-width]) {
      border-right-style: solid
    }

    .wp-block-image :where([style*=border-bottom-width]) {
      border-bottom-style: solid
    }

    .wp-block-image :where([style*=border-left-width]) {
      border-left-style: solid
    }

    .wp-block-image figure {
      margin: 0
    }

    ol,
    ul {
      box-sizing: border-box
    }

    :where(.wp-block-navigation .wp-block-navigation__submenu-container .wp-block-navigation-item a:not(.wp-element-button)),
    :where(.wp-block-navigation .wp-block-navigation__submenu-container .wp-block-navigation-submenu a:not(.wp-element-button)),
    :where(.wp-block-navigation.has-background .wp-block-navigation-item a:not(.wp-element-button)),
    :where(.wp-block-navigation.has-background .wp-block-navigation-submenu a:not(.wp-element-button)) {
      padding: .5em 1em
    }

    :where(p.has-text-color:not(.has-link-color)) a {
      color: inherit
    }

    :where(.wp-block-search__button) {
      border: 1px solid #ccc;
      padding: .375em .625em
    }

    :where(.wp-block-search__button-inside .wp-block-search__inside-wrapper) {
      padding: 4px;
      border: 1px solid #949494
    }

    :where(.wp-block-search__button-inside .wp-block-search__inside-wrapper) .wp-block-search__input {
      border-radius: 0;
      border: none;
      padding: 0 0 0 .25em
    }

    :where(.wp-block-search__button-inside .wp-block-search__inside-wrapper) .wp-block-search__input:focus {
      outline: 0
    }

    :where(.wp-block-search__button-inside .wp-block-search__inside-wrapper) :where(.wp-block-search__button) {
      padding: .125em .5em
    }

    :root {
      --wp--preset--font-size--normal: 16px;
      --wp--preset--font-size--huge: 42px
    }

    .screen-reader-text {
      border: 0;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      word-wrap: normal !important
    }

    .screen-reader-text:focus {
      background-color: #ddd;
      clip: auto !important;
      clip-path: none;
      color: #444;
      display: block;
      font-size: 1em;
      height: auto;
      left: 5px;
      line-height: normal;
      padding: 15px 23px 14px;
      text-decoration: none;
      top: 5px;
      width: auto;
      z-index: 100000
    }

    html :where(.has-border-color) {
      border-style: solid
    }

    html :where([style*=border-top-color]) {
      border-top-style: solid
    }

    html :where([style*=border-right-color]) {
      border-right-style: solid
    }

    html :where([style*=border-bottom-color]) {
      border-bottom-style: solid
    }

    html :where([style*=border-left-color]) {
      border-left-style: solid
    }

    html :where([style*=border-width]) {
      border-style: solid
    }

    html :where([style*=border-top-width]) {
      border-top-style: solid
    }

    html :where([style*=border-right-width]) {
      border-right-style: solid
    }

    html :where([style*=border-bottom-width]) {
      border-bottom-style: solid
    }

    html :where([style*=border-left-width]) {
      border-left-style: solid
    }

    html :where(img[class*=wp-image-]) {
      height: auto;
      max-width: 100%
    }

    figure {
      margin: 0 0 1em
    }

    body {
      --wp--preset--color--black: #000000;
      --wp--preset--color--cyan-bluish-gray: #abb8c3;
      --wp--preset--color--white: #ffffff;
      --wp--preset--color--pale-pink: #f78da7;
      --wp--preset--color--vivid-red: #cf2e2e;
      --wp--preset--color--luminous-vivid-orange: #ff6900;
      --wp--preset--color--luminous-vivid-amber: #fcb900;
      --wp--preset--color--light-green-cyan: #7bdcb5;
      --wp--preset--color--vivid-green-cyan: #00d084;
      --wp--preset--color--pale-cyan-blue: #8ed1fc;
      --wp--preset--color--vivid-cyan-blue: #0693e3;
      --wp--preset--color--vivid-purple: #9b51e0;
      --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%);
      --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg, rgb(122, 220, 180) 0%, rgb(0, 208, 130) 100%);
      --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg, rgba(252, 185, 0, 1) 0%, rgba(255, 105, 0, 1) 100%);
      --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg, rgba(255, 105, 0, 1) 0%, rgb(207, 46, 46) 100%);
      --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg, rgb(238, 238, 238) 0%, rgb(169, 184, 195) 100%);
      --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%);
      --wp--preset--gradient--blush-light-purple: linear-gradient(135deg, rgb(255, 206, 236) 0%, rgb(152, 150, 240) 100%);
      --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg, rgb(254, 205, 165) 0%, rgb(254, 45, 45) 50%, rgb(107, 0, 62) 100%);
      --wp--preset--gradient--luminous-dusk: linear-gradient(135deg, rgb(255, 203, 112) 0%, rgb(199, 81, 192) 50%, rgb(65, 88, 208) 100%);
      --wp--preset--gradient--pale-ocean: linear-gradient(135deg, rgb(255, 245, 203) 0%, rgb(182, 227, 212) 50%, rgb(51, 167, 181) 100%);
      --wp--preset--gradient--electric-grass: linear-gradient(135deg, rgb(202, 248, 128) 0%, rgb(113, 206, 126) 100%);
      --wp--preset--gradient--midnight: linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 116, 252) 100%);
      --wp--preset--duotone--dark-grayscale: url('#wp-duotone-dark-grayscale');
      --wp--preset--duotone--grayscale: url('#wp-duotone-grayscale');
      --wp--preset--duotone--purple-yellow: url('#wp-duotone-purple-yellow');
      --wp--preset--duotone--blue-red: url('#wp-duotone-blue-red');
      --wp--preset--duotone--midnight: url('#wp-duotone-midnight');
      --wp--preset--duotone--magenta-yellow: url('#wp-duotone-magenta-yellow');
      --wp--preset--duotone--purple-green: url('#wp-duotone-purple-green');
      --wp--preset--duotone--blue-orange: url('#wp-duotone-blue-orange');
      --wp--preset--font-size--small: 11px;
      --wp--preset--font-size--medium: 20px;
      --wp--preset--font-size--large: 32px;
      --wp--preset--font-size--x-large: 42px;
      --wp--preset--font-size--regular: 15px;
      --wp--preset--font-size--larger: 50px;
      --wp--preset--spacing--20: 0.44rem;
      --wp--preset--spacing--30: 0.67rem;
      --wp--preset--spacing--40: 1rem;
      --wp--preset--spacing--50: 1.5rem;
      --wp--preset--spacing--60: 2.25rem;
      --wp--preset--spacing--70: 3.38rem;
      --wp--preset--spacing--80: 5.06rem
    }

    :where(.is-layout-flex) {
      gap: .5em
    }

    :where(.wp-block-columns.is-layout-flex) {
      gap: 2em
    }

    .tdn_block_newsletter_subscribe .tdn-email-bar {
      display: flex
    }

    .tdn_block_newsletter_subscribe .tdn-input-wrap {
      flex: 1
    }

    .tdn_block_newsletter_subscribe .tdn-btn-wrap {
      display: flex;
      min-width: 100px
    }

    .tdn_block_newsletter_subscribe button,
    .tdn_block_newsletter_subscribe input[type=email] {
      min-height: 42px;
      height: auto;
      font-size: 12px;
      transition: all .2s ease-in-out
    }

    .tdn_block_newsletter_subscribe input[type=email] {
      padding-left: 12px;
      padding-right: 12px
    }

    .tdn_block_newsletter_subscribe button {
      -webkit-appearance: none;
      outline: 0;
      width: 100%;
      padding: 3px 18px;
      background-color: #4db2ec;
      color: #fff;
      border: 0
    }

    .tdn_block_newsletter_subscribe button:hover {
      background-color: #222
    }

    .clearfix:after,
    .clearfix:before {
      display: table;
      content: '';
      line-height: 0
    }

    .tdm-descr {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 16px;
      line-height: 28px;
      color: #666;
      margin-bottom: 30px
    }

    @media(max-width:1018px) {
      .tdm-descr {
        font-size: 15px;
        line-height: 24px
      }
    }

    @media(min-width:768px) and (max-width:1018px) {
      .tdm-descr {
        margin-bottom: 25px
      }

      .tdc-row.stretch_row_1200>.td-pb-row {
        margin-right: 0;
        margin-left: 0
      }
    }

    [data-mfp-src] {
      cursor: pointer
    }

    @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5Vvl4jL.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: Gelasio;
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/gelasio/v10/cIf9MaFfvUQxTTqS9C6hYQ.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: 'Nunito Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/nunitosans/v12/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-stretch: 100%;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-stretch: 100%;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 700;
      font-stretch: 100%;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: Roboto;
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: Roboto;
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/worksans/v18/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXBi8Jpg.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
    }

    html {
      font-family: sans-serif;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%
    }

    body {
      margin: 0
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    main,
    menu,
    summary {
      display: block
    }

    audio,
    progress,
    video {
      display: block;
      vertical-align: baseline
    }

    audio:not([controls]) {
      display: none;
      height: 0
    }

    [hidden],
    template {
      display: none
    }

    a {
      background-color: transparent
    }

    a:active,
    a:hover {
      outline: 0
    }

    b,
    strong {
      font-weight: 700
    }

    mark {
      background: #ff0;
      color: #000
    }

    small {
      font-size: 80%
    }

    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline
    }

    sup {
      top: -.5em
    }

    sub {
      bottom: -.25em
    }

    img {
      border: 0
    }

    svg:not(:root) {
      overflow: hidden
    }

    figure {
      margin: 0
    }

    hr {
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      height: 0
    }

    code {
      font-family: monospace, monospace;
      font-size: 1em
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      color: inherit;
      font: inherit;
      margin: 0
    }

    button {
      overflow: visible
    }

    button,
    select {
      text-transform: none
    }

    button,
    html input[type=button],
    input[type=reset],
    input[type=submit] {
      -webkit-appearance: button;
      cursor: pointer
    }

    button[disabled],
    html input[disabled] {
      cursor: default
    }

    button::-moz-focus-inner,
    input::-moz-focus-inner {
      border: 0;
      padding: 0
    }

    input {
      line-height: normal
    }

    input[type=checkbox],
    input[type=radio] {
      box-sizing: border-box;
      padding: 0
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      height: auto
    }

    input[type=search] {
      -webkit-appearance: textfield;
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box;
      box-sizing: content-box
    }

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
      -webkit-appearance: none
    }

    fieldset {
      border: 1px solid silver;
      margin: 0 2px;
      padding: .35em .625em .75em
    }

    legend {
      border: 0;
      padding: 0
    }

    textarea {
      overflow: auto
    }

    optgroup {
      font-weight: 700
    }

    table {
      border-collapse: collapse;
      border-spacing: 0
    }

    td,
    th {
      padding: 0
    }

    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box
    }

    :after,
    :before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box
    }

    img {
      max-width: 100%;
      height: auto
    }

    .td-main-content-wrap {
      background-color: #fff
    }

    .td-page-meta {
      display: none
    }

    .td-container,
    .tdc-row {
      width: 1068px;
      margin-right: auto;
      margin-left: auto
    }

    .td-container:after,
    .td-container:before,
    .tdc-row:after,
    .tdc-row:before {
      display: table;
      content: '';
      line-height: 0
    }

    .td-container:after,
    .tdc-row:after {
      clear: both
    }

    .tdc-row[class*=stretch_row]>.td-pb-row>.td-element-style {
      width: 100vw !important;
      left: 50% !important;
      transform: translateX(-50%) !important
    }

    .td-md-is-ios .tdc-row[class*=stretch_row]>.td-pb-row>.td-element-style {
      width: calc(100vw + 1px) !important
    }

    @media(max-width:767px) {
      .tdm-descr {
        margin-bottom: 20px
      }

      .td-pb-row>.td-element-style {
        width: 100vw !important;
        left: 50% !important;
        transform: translateX(-50%) !important
      }

      .td-md-is-ios .td-pb-row>.td-element-style {
        width: calc(100vw + 1px) !important
      }
    }

    .tdc-row.stretch_row_1200 {
      width: auto !important;
      max-width: 1240px
    }

    @media(min-width:1141px) {
      .tdc-row.stretch_row_1200 {
        padding-left: 24px;
        padding-right: 24px
      }
    }

    @media(min-width:1019px) and (max-width:1140px) {
      .tdc-row.stretch_row_1200 {
        padding-left: 20px;
        padding-right: 20px
      }
    }

    .tdc-row.stretch_row_1400 {
      width: auto !important;
      max-width: 1440px
    }

    @media(min-width:1141px) {
      .tdc-row.stretch_row_1400 {
        padding-left: 24px;
        padding-right: 24px
      }
    }

    @media(min-width:1019px) and (max-width:1140px) {
      .tdc-row.stretch_row_1400 {
        padding-left: 20px;
        padding-right: 20px
      }
    }

    .tdc-row.stretch_row_content {
      width: 100% !important
    }

    @media(max-width:767px) {
      .tdc-row.td-stretch-content {
        padding-left: 20px;
        padding-right: 20px
      }
    }

    .td-pb-row {
      margin-right: -24px;
      margin-left: -24px;
      position: relative
    }

    .td-pb-row:after,
    .td-pb-row:before {
      display: table;
      content: ''
    }

    .td-pb-row:after {
      clear: both
    }

    .td-pb-row [class*=td-pb-span] {
      display: block;
      min-height: 1px;
      float: left;
      padding-right: 24px;
      padding-left: 24px;
      position: relative
    }

    @media(min-width:1019px) and (max-width:1140px) {
      .td-pb-row [class*=td-pb-span] {
        padding-right: 20px;
        padding-left: 20px
      }
    }

    @media(min-width:768px) and (max-width:1018px) {
      .tdc-row.stretch_row_1400>.td-pb-row {
        margin-right: 0;
        margin-left: 0
      }

      .td-pb-row [class*=td-pb-span] {
        padding-right: 14px;
        padding-left: 14px
      }
    }

    .td-ss-main-sidebar,
    .td-ss-row .td-pb-span4 .wpb_wrapper {
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000
    }

    .td-pb-span3 {
      width: 25%
    }

    .td-pb-span4 {
      width: 33.33333333%
    }

    .td-pb-span6 {
      width: 50%
    }

    .td-pb-span12 {
      width: 100%
    }

    .wpb_row {
      margin-bottom: 0
    }

    .vc_row .vc_column-inner {
      padding-left: 0;
      padding-right: 0
    }

    @media(min-width:1019px) and (max-width:1140px) {

      .td-container,
      .tdc-row {
        width: 980px
      }

      .td-pb-row {
        margin-right: -20px;
        margin-left: -20px
      }
    }

    @media(min-width:768px) and (max-width:1018px) {

      .td-container,
      .tdc-row {
        width: 740px
      }

      .td-pb-row {
        margin-right: -14px;
        margin-left: -14px
      }
    }

    .td-header-wrap {
      position: relative;
      z-index: 2000
    }

    @media(max-width:767px) {
      .td-pb-row [class*=td-pb-span] {
        padding-right: 0;
        padding-left: 0;
        float: none;
        width: 100%
      }

      .td-container,
      .tdc-row {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px
      }

      .td-pb-row {
        width: 100%;
        margin-left: 0;
        margin-right: 0
      }

      #td-header-search-button {
        display: none
      }
    }

    @media(min-width:768px) {
      .td-drop-down-search .td-search-form {
        margin: 20px
      }
    }

    .td-header-wrap .td-drop-down-search {
      position: absolute;
      top: 100%;
      right: 0;
      visibility: hidden;
      opacity: 0;
      -webkit-transition: .4s;
      transition: all .4s ease;
      transform: translate3d(0, 20px, 0);
      -webkit-transform: translate3d(0, 20px, 0);
      background-color: #fff;
      -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
      box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
      border-top: 0;
      width: 342px;
      pointer-events: none
    }

    .td-header-wrap .td-drop-down-search.td-drop-down-search-open {
      visibility: visible;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      pointer-events: auto
    }

    .td-header-wrap .td-drop-down-search .btn {
      position: absolute;
      height: 32px;
      min-width: 67px;
      line-height: 17px;
      padding: 7px 15px 8px;
      text-shadow: none;
      vertical-align: top;
      right: 20px;
      margin: 0 !important;
      -webkit-transition: background-color .4s;
      transition: background-color .4s
    }

    .td-header-wrap .td-drop-down-search .btn:hover {
      background-color: #4db2ec
    }

    .td-header-wrap .td-drop-down-search:before {
      position: absolute;
      top: -9px;
      right: 19px;
      display: block;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5.5px 6px;
      border-color: transparent transparent #4db2ec
    }

    .td-header-wrap .td-drop-down-search:after {
      position: absolute;
      top: -3px;
      display: block;
      content: '';
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 100%;
      height: 3px;
      background-color: #4db2ec
    }

    .td-header-wrap #td-header-search {
      width: 235px;
      height: 32px;
      margin: 0;
      border-right: 0;
      line-height: 17px;
      border-color: #eaeaea !important
    }

    .td-header-wrap .td-post-category {
      z-index: 2;
      position: relative
    }

    .td-header-menu-wrap-full {
      z-index: 9998;
      position: relative
    }

    @media(max-width:767px) {
      .td-header-wrap #td-header-search {
        width: 91%;
        font-size: 16px
      }

      .td-header-wrap .td-header-menu-wrap,
      .td-header-wrap .td-header-menu-wrap-full {
        background-color: #222 !important;
        height: 54px !important
      }

      .sf-menu {
        display: none
      }
    }

    .td-header-wrap .td-header-menu-wrap-full {
      background-color: #fff
    }

    .sf-menu,
    .sf-menu li,
    .sf-menu ul {
      margin: 0;
      list-style: none
    }

    .sf-menu ul {
      position: absolute;
      top: -999em;
      width: 10em
    }

    .sf-menu ul li {
      width: 100%
    }

    .sf-menu li:hover {
      visibility: inherit
    }

    .sf-menu li {
      float: left;
      position: relative
    }

    .sf-menu li.sfHover ul,
    .sf-menu li:hover ul {
      left: 0;
      top: auto;
      z-index: 99
    }

    ul.sf-menu li.sfHover li ul,
    ul.sf-menu li:hover li ul {
      top: -999em
    }

    ul.sf-menu li li.sfHover ul,
    ul.sf-menu li li:hover ul {
      left: 10em;
      top: 0 !important
    }

    ul.sf-menu li li.sfHover li ul,
    ul.sf-menu li li:hover li ul {
      top: -999em
    }

    .sf-menu>.current-menu-item {
      z-index: 0
    }

    .sf-menu>li>a {
      padding: 0 14px;
      line-height: 48px;
      font-size: 14px;
      color: #000;
      font-weight: 700;
      text-transform: uppercase;
      -webkit-backface-visibility: hidden
    }

    .sf-menu>.current-menu-item>a,
    .sf-menu>.sfHover,
    .sf-menu>.sfHover>a,
    .sf-menu>li>a:hover {
      z-index: 999
    }

    .sf-menu>.current-menu-item>a,
    .sf-menu>.sfHover>a,
    .sf-menu>li>a:hover {
      background-color: transparent
    }

    .td-affix .sf-menu>.current-menu-item>a,
    .td-affix .sf-menu>.sfHover>a,
    .td-affix .sf-menu>li>a:hover {
      background-color: transparent
    }

    .sf-menu>li>a:after {
      background-color: transparent;
      content: '';
      width: 0;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      -webkit-transition: width .2s;
      transition: width .2s ease
    }

    .sf-menu>.current-menu-item>a:after,
    .sf-menu>.sfHover>a:after,
    .sf-menu>li:hover>a:after {
      background-color: #4db2ec;
      width: 100%
    }

    #td-header-menu {
      display: inline-block;
      vertical-align: top
    }

    .sf-menu ul {
      background-color: #fff
    }

    .sf-menu ul .td-icon-menu-down {
      float: right;
      top: 0;
      font-size: 7px
    }

    .sf-menu ul .current-menu-item>a,
    .sf-menu ul .sfHover>a {
      color: #4db2ec
    }

    .sf-menu a:active,
    .sf-menu a:focus,
    .sf-menu a:hover,
    .sf-menu li.sfHover,
    .sf-menu li:hover {
      outline: 0
    }

    .sf-menu .td-icon-menu-down {
      position: absolute;
      top: 50%;
      margin-top: -5px;
      padding-left: 7px;
      font-size: 9px
    }

    .sf-menu .sub-menu {
      -webkit-backface-visibility: hidden
    }

    .sf-menu .sub-menu .td-icon-menu-down {
      position: absolute;
      top: 50%;
      right: 19px;
      margin-top: -9px;
      line-height: 19px
    }

    .sf-menu a.sf-with-ul {
      padding-right: 31px;
      min-width: 1px
    }

    @media(min-width:768px) and (max-width:1018px) {
      .sf-menu>li>a {
        padding: 0 9px;
        font-size: 11px
      }

      .sf-menu .td-icon-menu-down {
        padding-left: 6px
      }

      .sf-menu a.sf-with-ul {
        padding-right: 22px
      }
    }

    a.sf-with-ul i.td-icon-menu-down:before {
      content: '\e808'
    }

    ul.sf-js-enabled>li>a>i.td-icon-menu-down:before {
      content: '\e806' !important
    }

    #td-outer-wrap {
      overflow: hidden
    }

    #td-top-mobile-toggle {
      display: none
    }

    #td-top-mobile-toggle a {
      display: inline-block
    }

    #td-top-mobile-toggle i {
      font-size: 27px;
      width: 64px;
      line-height: 54px;
      height: 54px;
      display: inline-block;
      padding-top: 1px;
      color: #fff
    }

    .admin-bar #td-mobile-nav {
      padding-top: 32px
    }

    @media(max-width:767px) {
      #td-outer-wrap {
        margin: auto;
        width: 100%;
        -webkit-transition: transform .7s;
        transition: transform .7s ease;
        -webkit-transform-origin: 50% 200px 0;
        transform-origin: 50% 200px 0
      }

      #td-top-mobile-toggle {
        display: inline-block;
        position: relative
      }

      .admin-bar #td-mobile-nav {
        padding-top: 46px
      }
    }

    .td-menu-background {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top;
      position: fixed;
      top: 0;
      display: block;
      width: 100%;
      height: 113%;
      z-index: 9999;
      visibility: hidden;
      transform: translate3d(-100%, 0, 0);
      -webkit-transform: translate3d(-100%, 0, 0)
    }

    .td-menu-background:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .98;
      background: #313b45;
      background: -webkit-gradient(left top, left bottom, color-stop(0, #313b45), color-stop(100%, #3393b8));
      background: linear-gradient(to bottom, #313b45 0, #3393b8 100%)
    }

    #td-mobile-nav {
      padding: 0;
      position: fixed;
      width: 100%;
      height: calc(100% + 1px);
      top: 0;
      z-index: 9999;
      visibility: hidden;
      transform: translate3d(-99%, 0, 0);
      -webkit-transform: translate3d(-99%, 0, 0);
      left: -1%;
      font-family: -apple-system, ".sfnstext-regular", 'san francisco', roboto, 'segoe ui', 'helvetica neue', 'lucida grande', sans-serif
    }

    #td-mobile-nav .td_display_err {
      text-align: center;
      color: #fff;
      border: none;
      -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .16);
      box-shadow: 0 0 8px rgba(0, 0, 0, .16);
      margin: -9px -30px 24px;
      font-size: 14px;
      border-radius: 0;
      padding: 12px;
      position: relative;
      background-color: rgba(255, 255, 255, .06);
      display: none
    }

    #td-mobile-nav input:invalid {
      box-shadow: none !important
    }

    .td-js-loaded #td-mobile-nav,
    .td-js-loaded .td-menu-background {
      visibility: visible !important;
      -webkit-transition: transform .5s cubic-bezier(.79, .14, .15, .86);
      transition: transform .5s cubic-bezier(.79, .14, .15, .86)
    }

    #td-mobile-nav {
      height: 1px;
      overflow: hidden
    }

    #td-mobile-nav .td-menu-socials {
      padding: 0 65px 0 20px;
      overflow: hidden;
      height: 60px
    }

    #td-mobile-nav .td-social-icon-wrap {
      margin: 20px 5px 0 0;
      display: inline-block
    }

    #td-mobile-nav .td-social-icon-wrap i {
      border: none;
      background-color: transparent;
      font-size: 14px;
      width: 40px;
      height: 40px;
      line-height: 38px;
      color: #fff;
      vertical-align: middle
    }

    #td-mobile-nav .td-social-icon-wrap .td-icon-instagram {
      font-size: 16px
    }

    .td-mobile-close {
      position: absolute;
      right: 1px;
      top: 0;
      z-index: 1000
    }

    .td-mobile-close .td-icon-close-mobile {
      height: 70px;
      width: 70px;
      line-height: 70px;
      font-size: 21px;
      color: #fff;
      top: 4px;
      position: relative
    }

    .td-mobile-content {
      padding: 20px 20px 0
    }

    .td-mobile-container {
      padding-bottom: 20px;
      position: relative
    }

    .td-mobile-content ul {
      list-style: none;
      margin: 0;
      padding: 0
    }

    .td-mobile-content li {
      float: none;
      margin-left: 0;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none
    }

    .td-mobile-content li a {
      display: block;
      line-height: 21px;
      font-size: 21px;
      color: #fff;
      margin-left: 0;
      padding: 12px 30px 12px 12px;
      font-weight: 700
    }

    .td-mobile-content .td_mobile_submenu>a .td-icon-menu-right {
      display: inline-block
    }

    .td-mobile-content .td-icon-menu-right {
      display: none;
      position: absolute;
      cursor: pointer;
      top: 10px;
      right: -4px;
      z-index: 1000;
      font-size: 14px;
      padding: 6px 12px;
      float: right;
      color: #fff;
      -webkit-transform-origin: 50% 48% 0;
      transform-origin: 50% 48% 0;
      -webkit-transition: transform .3s;
      transition: transform .3s ease;
      transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg)
    }

    .td-mobile-content .td-icon-menu-right:before {
      content: '\e83d'
    }

    .td-mobile-content .td-sub-menu-open>a i {
      transform: rotate(0);
      -webkit-transform: rotate(0)
    }

    .td-mobile-content .td-sub-menu-open>ul {
      display: block;
      max-height: 2000px;
      opacity: .9
    }

    .td-mobile-content .sub-menu {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      -webkit-transition: max-height .5s cubic-bezier(.77, 0, .175, 1), opacity .5s cubic-bezier(.77, 0, .175, 1);
      transition: max-height .5s cubic-bezier(.77, 0, .175, 1), opacity .5s cubic-bezier(.77, 0, .175, 1)
    }

    .td-mobile-content .sub-menu .td-icon-menu-right {
      font-size: 11px;
      right: -2px;
      top: 8px;
      color: #fff
    }

    .td-mobile-content .sub-menu a {
      padding: 9px 26px 9px 36px !important;
      line-height: 19px;
      font-size: 16px;
      font-weight: 400
    }

    .td-mobile-content .sub-menu .sub-menu a {
      padding-left: 55px !important
    }

    .td-mobile-content .sub-menu .sub-menu .sub-menu a {
      padding-left: 74px !important
    }

    .td-mobile-content .current-menu-item>a {
      color: #73c7e3
    }

    .td-mobile-content .menu-item-has-children a {
      width: 100%;
      z-index: 1
    }

    .td-mobile-content .td-link-element-after {
      position: relative
    }

    .rtl .td-mobile-content .td-icon-menu-right {
      right: auto;
      left: -4px;
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg)
    }

    .rtl .td-mobile-content .td-sub-menu-open>a i {
      transform: rotate(0);
      -webkit-transform: rotate(0)
    }

    .td-menu-mob-open-menu #td-outer-wrap {
      position: fixed;
      transform: scale3d(.9, .9, .9);
      -webkit-transform: scale3d(.9, .9, .9);
      -webkit-box-shadow: 0 0 46px #000;
      box-shadow: 0 0 46px #000
    }

    .td-menu-mob-open-menu #td-mobile-nav {
      height: calc(100% + 1px);
      overflow: auto;
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      left: 0
    }

    .td-menu-mob-open-menu #td-mobile-nav label {
      -webkit-transition: .2s;
      transition: all .2s ease
    }

    .td-menu-mob-open-menu #td-mobile-nav .td-login-animation {
      -webkit-transition: .5s .5s;
      transition: all .5s ease .5s
    }

    .td-menu-mob-open-menu .td-menu-background {
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0)
    }

    .td-menu-mob-open-menu .td-mobile-container {
      -webkit-transition: .5s .5s;
      transition: all .5s ease .5s
    }

    .td-mobile-container {
      opacity: 1
    }

    .td-hide-menu-content .td-mobile-container {
      opacity: 0;
      visibility: hidden;
      -webkit-transition: .5s;
      transition: all .5s ease 0s
    }

    .td-hide-menu-content .td-mobile-content {
      display: none
    }

    #td-mobile-nav .td-login-animation {
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%
    }

    #td-mobile-nav .td-login-hide {
      -webkit-transition: .5s;
      transition: all .5s ease 0s;
      visibility: hidden !important
    }

    #td-mobile-nav .td-login-show {
      visibility: visible !important;
      opacity: 1;
      pointer-events: auto
    }

    .td-search-wrap-mob {
      padding: 0;
      position: absolute;
      width: 100%;
      height: auto;
      top: 0;
      text-align: center;
      z-index: 9999;
      visibility: hidden;
      color: #fff;
      font-family: -apple-system, ".sfnstext-regular", 'san francisco', roboto, 'segoe ui', 'helvetica neue', 'lucida grande', sans-serif
    }

    .td-search-wrap-mob .td-drop-down-search {
      opacity: 0;
      visibility: hidden;
      -webkit-transition: .5s;
      transition: all .5s ease 0s;
      -webkit-backface-visibility: hidden;
      position: relative
    }

    .td-search-wrap-mob #td-header-search-mob {
      color: #fff;
      font-weight: 700;
      font-size: 26px;
      height: 40px;
      line-height: 36px;
      border: 0;
      background: 0 0;
      outline: 0;
      margin: 8px 0;
      padding: 0;
      text-align: center
    }

    .td-search-wrap-mob .td-search-input {
      margin: 0 5%;
      position: relative
    }

    .td-search-wrap-mob .td-search-input span {
      opacity: .8;
      font-size: 12px
    }

    .td-search-wrap-mob .td-search-input:after,
    .td-search-wrap-mob .td-search-input:before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 1px;
      background-color: #fff;
      bottom: 0;
      left: 0;
      opacity: .2
    }

    .td-search-wrap-mob .td-search-input:after {
      opacity: .8;
      transform: scaleX(0);
      -webkit-transform: scaleX(0);
      -webkit-transition: transform .5s .8s;
      transition: transform .5s ease .8s
    }

    .td-search-wrap-mob .td_module_wrap {
      text-align: left
    }

    .td-search-wrap-mob .td_module_wrap .entry-title {
      font-size: 16px;
      line-height: 20px
    }

    .td-search-wrap-mob .td_module_wrap .entry-title a {
      color: #fff
    }

    .td-search-wrap-mob .td_module_wrap:hover .entry-title a {
      color: #fff
    }

    .td-search-wrap-mob .td-post-date {
      color: #ddd;
      opacity: .8
    }

    .td-search-wrap-mob .td-search-form {
      margin-bottom: 30px
    }

    .td-search-wrap-mob .td-aj-search-results {
      margin: 0 5%;
      text-align: left
    }

    .td-search-wrap-mob .td-module-thumb {
      top: auto;
      left: auto
    }

    .td-search-wrap-mob .result-msg {
      margin: 0 5%
    }

    .td-search-wrap-mob .result-msg a {
      display: block;
      text-align: center;
      width: 100%;
      text-transform: uppercase;
      line-height: 50px;
      color: #000;
      border: none;
      -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .36);
      box-shadow: 0 0 8px rgba(0, 0, 0, .36);
      margin: 10px 0 40px;
      font-size: 17px;
      border-radius: 0;
      background-color: #fff;
      opacity: .8
    }

    .td-search-background {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top;
      position: fixed;
      top: 0;
      display: block;
      width: 100%;
      height: 113%;
      z-index: 9999;
      -webkit-transition: .5s cubic-bezier(.79, .14, .15, .86);
      transition: all .5s cubic-bezier(.79, .14, .15, .86);
      transform: translate3d(100%, 0, 0);
      -webkit-transform: translate3d(100%, 0, 0);
      visibility: hidden
    }

    .td-search-background:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .98;
      background: #313b45;
      background: -webkit-gradient(left top, left bottom, color-stop(0, #313b45), color-stop(100%, #3393b8));
      background: linear-gradient(to bottom, #313b45 0, #3393b8 100%)
    }

    .td-search-close {
      text-align: right;
      z-index: 1000
    }

    .td-search-close .td-icon-close-mobile {
      height: 70px;
      width: 70px;
      line-height: 70px;
      font-size: 21px;
      color: #fff;
      position: relative;
      top: 4px;
      right: 0
    }

    .td-search-opened #td-outer-wrap {
      position: fixed;
      transform: scale3d(.9, .9, .9);
      -webkit-transform: scale3d(.9, .9, .9);
      -webkit-box-shadow: 0 0 46px;
      box-shadow: 0 0 46px
    }

    .td-search-opened .td-search-wrap-mob .td-drop-down-search {
      opacity: 1;
      visibility: visible !important;
      -webkit-transition: .5s .3s;
      transition: all .5s ease .3s
    }

    .td-search-opened .td-search-background {
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      visibility: visible !important
    }

    .td-search-opened .td-search-input:after {
      transform: scaleX(1);
      -webkit-transform: scaleX(1)
    }

    .admin-bar .td-search-wrap-mob {
      padding-top: 32px
    }

    #td-mobile-nav label {
      position: absolute;
      top: 26px;
      left: 10px;
      font-size: 17px;
      color: #fff;
      opacity: .6;
      pointer-events: none
    }

    body {
      font-family: Verdana, BlinkMacSystemFont, -apple-system, 'segoe ui', Roboto, Oxygen, Ubuntu, Cantarell, 'open sans', 'helvetica neue', sans-serif;
      font-size: 14px;
      line-height: 21px
    }

    p {
      margin-top: 0;
      margin-bottom: 21px
    }

    a:active,
    a:focus {
      outline: 0
    }

    a {
      color: #4db2ec;
      text-decoration: none
    }

    code {
      position: relative;
      top: -1px;
      border: none;
      background-color: #f1f1f1;
      padding: 2px 6px
    }

    cite {
      font-family: roboto, sans-serif;
      font-size: 13px;
      font-style: italic;
      font-weight: 400;
      text-transform: none;
      color: #000
    }

    cite a {
      color: #000
    }

    cite a:hover {
      color: #4db2ec
    }

    ol,
    ul {
      padding: 0
    }

    ol li,
    ul li {
      line-height: 24px;
      margin-left: 21px
    }

    address {
      font-size: inherit !important;
      line-height: inherit !important;
      margin-bottom: 21px
    }

    embed {
      width: 100%
    }

    table {
      width: 100%
    }

    table th {
      text-align: left;
      border: 1px solid #ededed;
      padding: 2px 8px
    }

    table td {
      border: 1px solid #ededed;
      padding: 2px 8px
    }

    table .odd td {
      background-color: #fcfcfc
    }

    h1,
    h2,
    h3,
    h4 {
      font-family: roboto, sans-serif;
      color: #111;
      font-weight: 400;
      margin: 6px 0
    }

    h1>a,
    h2>a,
    h3>a,
    h4>a {
      color: #111
    }

    div.td-block-title {
      font-family: roboto, sans-serif;
      color: #111
    }

    p.td-module-title {
      font-family: roboto, sans-serif;
      color: #111
    }

    p.td-module-title>a {
      color: #111
    }

    h1 {
      font-size: 32px;
      line-height: 40px;
      margin-top: 33px;
      margin-bottom: 23px
    }

    h2 {
      font-size: 27px;
      line-height: 38px;
      margin-top: 30px;
      margin-bottom: 20px
    }

    h3 {
      font-size: 22px;
      line-height: 30px;
      margin-top: 27px;
      margin-bottom: 17px
    }

    h4 {
      font-size: 19px;
      line-height: 29px;
      margin-top: 24px;
      margin-bottom: 14px
    }

    .video-player {
      width: 100% !important
    }

    textarea {
      font-size: 12px;
      line-height: 21px;
      color: #444;
      border: 1px solid #e1e1e1;
      width: 100%;
      max-width: 100%;
      height: 168px;
      min-height: 168px;
      padding: 6px 9px
    }

    textarea:active,
    textarea:focus {
      border-color: #b0b0b0 !important
    }

    input:focus,
    input[type]:focus,
    textarea:focus {
      outline: 0
    }

    input[type=submit] {
      font-family: roboto, sans-serif;
      font-size: 13px;
      background-color: #222;
      border-radius: 0;
      color: #fff;
      border: none;
      padding: 8px 15px;
      font-weight: 500;
      -webkit-transition: background-color .4s;
      transition: background-color .4s
    }

    input[type=submit]:hover {
      background-color: #4db2ec
    }

    input[type=email],
    input[type=text],
    input[type=url] {
      font-size: 12px;
      line-height: 21px;
      color: #444;
      border: 1px solid #e1e1e1;
      width: 100%;
      max-width: 100%;
      height: 34px;
      padding: 3px 9px
    }

    @media(max-width:767px) {
      .admin-bar .td-search-wrap-mob {
        padding-top: 46px
      }

      textarea {
        font-size: 16px
      }

      input[type=email],
      input[type=text],
      input[type=url] {
        font-size: 16px
      }
    }

    input[type=email]:active,
    input[type=email]:focus,
    input[type=text]:active,
    input[type=text]:focus,
    input[type=url]:active,
    input[type=url]:focus {
      border-color: #b0b0b0 !important
    }

    input[type=password] {
      width: 100%;
      position: relative;
      top: 0;
      display: inline-table;
      vertical-align: middle;
      font-size: 12px;
      line-height: 21px;
      color: #444;
      border: 1px solid #ccc;
      max-width: 100%;
      height: 34px;
      padding: 3px 9px;
      margin-bottom: 10px
    }

    .tagdiv-type {
      font-size: 15px;
      line-height: 1.74;
      color: #222
    }

    .tagdiv-type img {
      margin-bottom: 21px
    }

    .tagdiv-type figure img {
      margin-bottom: 0
    }

    .tagdiv-type .alignnone {
      display: inline-block;
      margin: 0 5px
    }

    .tagdiv-type a:hover {
      text-decoration: underline
    }

    .tagdiv-type ol,
    .tagdiv-type ul {
      margin-bottom: 26px
    }

    .tagdiv-type ol li:not(.blocks-gallery-item):not(.wp-block-navigation-item),
    .tagdiv-type ul li:not(.blocks-gallery-item):not(.wp-block-navigation-item) {
      line-height: inherit;
      margin-bottom: 10px
    }

    .tagdiv-type ol li:not(.blocks-gallery-item):not(.wp-block-navigation-item):last-child,
    .tagdiv-type ul li:not(.blocks-gallery-item):not(.wp-block-navigation-item):last-child {
      margin-bottom: 0
    }

    .tagdiv-type li ol,
    .tagdiv-type li ul {
      margin-bottom: 0
    }

    .tagdiv-type p {
      margin-bottom: 26px
    }

    .tagdiv-type embed,
    .tagdiv-type iframe,
    .tagdiv-type object {
      max-width: 100% !important
    }

    @media(max-width:767px) {
      input[type=password] {
        font-size: 16px
      }

      .tagdiv-type .alignnone {
        margin: 0 10px 0 0
      }

      .td-md-is-ios .tagdiv-type figure {
        width: auto
      }
    }

    .alignnone {
      margin-top: 0
    }

    .alignnone img {
      width: 100%
    }

    .screen-reader-text {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute !important;
      width: 1px
    }

    .entry-title a:hover,
    .td-post-category:hover,
    .td_block_wrap a:hover,
    .widget a:hover {
      text-decoration: none !important
    }

    .td_module_wrap {
      position: relative;
      padding-bottom: 35px
    }

    .td_module_wrap .entry-title {
      font-size: 21px;
      line-height: 25px;
      margin: 0 0 6px
    }

    .td_module_wrap:hover .entry-title a {
      color: #4db2ec
    }

    .entry-title {
      word-wrap: break-word
    }

    .td-module-thumb {
      position: relative;
      margin-bottom: 13px
    }

    .td-module-thumb .entry-thumb {
      display: block
    }

    .td-module-meta-info {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 11px;
      margin-bottom: 7px;
      line-height: 1;
      min-height: 17px
    }

    .td-post-author-name {
      font-weight: 700;
      display: inline-block;
      position: relative;
      top: 2px
    }

    .td-post-author-name a {
      color: #000
    }

    .td-post-author-name span {
      color: #ccc;
      margin: 0 2px;
      font-weight: 400
    }

    .td-post-author-name div {
      display: inline;
      margin-right: 2px
    }

    .td-post-date {
      color: #767676;
      display: inline-block;
      position: relative;
      top: 2px
    }

    .td-post-category {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 10px;
      font-weight: 600;
      line-height: 1;
      background-color: #222;
      color: #fff;
      margin-right: 5px;
      padding: 3px 6px 4px;
      display: block;
      vertical-align: top;
      transition: all .2s ease;
      -webkit-transition: .2s
    }

    .td-post-category:hover {
      background-color: #4db2ec
    }

    .td-module-meta-info .td-post-category {
      display: inline-block
    }

    .block-title {
      font-family: roboto, sans-serif;
      font-size: 14px;
      line-height: 1;
      margin-top: 0;
      margin-bottom: 26px;
      border-bottom: 2px solid #222
    }

    .block-title a,
    .block-title label,
    .block-title span {
      line-height: 17px;
      display: inline-block;
      padding: 7px 12px 4px;
      background-color: #222;
      color: #fff
    }

    .td-block-title a,
    .td-block-title span {
      display: inline-block
    }

    .td_block_template_1 .block-title {
      text-align: left
    }

    .td-main-content-wrap {
      padding-bottom: 40px
    }

    .td-pb-span4 .wpb_wrapper,
    .td-ss-main-sidebar {
      perspective: unset !important
    }

    .td-crumb-container {
      min-height: 35px;
      margin-bottom: 9px;
      padding-top: 21px
    }

    @media(min-width:768px) and (max-width:1018px) {
      .td-crumb-container {
        padding-top: 16px
      }
    }

    @media(max-width:767px) {
      .td-main-content-wrap {
        padding-bottom: 26px
      }

      .td-crumb-container {
        padding-top: 11px
      }

      .single-post .td-bred-no-url-last {
        display: none
      }
    }

    .entry-crumbs {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 12px;
      color: #c3c3c3;
      line-height: 18px;
      padding-top: 1px;
      padding-bottom: 2px
    }

    .entry-crumbs a {
      color: #c3c3c3
    }

    .entry-crumbs a:hover {
      color: #777
    }

    .entry-crumbs .td-bread-sep {
      font-size: 8px;
      margin: 0 5px
    }

    .post {
      background-color: #fff
    }

    .post header .entry-title {
      margin-top: 0;
      margin-bottom: 7px;
      word-wrap: break-word;
      font-size: 41px;
      line-height: 50px
    }

    header .td-module-meta-info {
      margin-bottom: 16px
    }

    header .td-post-author-name {
      font-weight: 400;
      color: #444;
      float: left
    }

    header .td-post-author-name a {
      font-weight: 700;
      margin-right: 3px
    }

    header .td-post-date {
      margin-left: 4px;
      color: #767676;
      float: left
    }

    header .td-post-comments {
      float: right;
      position: relative;
      top: 2px
    }

    header .td-post-comments a {
      color: #444
    }

    header .td-post-comments i {
      vertical-align: middle
    }

    header .td-icon-comments {
      margin-right: 5px;
      font-size: 9px
    }

    .post footer {
      clear: both
    }

    .td-post-source-tags {
      font-size: 11px
    }

    .td-post-source-tags a {
      font-size: 11px
    }

    .td-author-name {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 15px;
      line-height: 21px;
      font-weight: 700;
      margin: 7px 0 8px
    }

    .td-author-name a {
      color: #222
    }

    .td-author-name a:hover {
      color: #4db2ec
    }

    .td-post-content p:empty {
      display: none
    }

    .td-post-content {
      margin-top: 21px;
      padding-bottom: 16px
    }

    @media(max-width:767px) {
      .post header .entry-title {
        margin-top: 3px;
        margin-bottom: 9px
      }

      .td-post-content {
        margin-top: 16px
      }
    }

    .td-post-content p {
      word-wrap: break-word
    }

    .td-post-content img {
      display: block
    }

    .td-post-content table {
      margin-bottom: 21px
    }

    .td-post-template-default .td-post-title .td-post-comments {
      margin-left: 22px
    }

    @media(max-width:1018px) {
      .post header .entry-title {
        font-size: 32px;
        line-height: 36px
      }

      .td-post-template-default .td-post-header header .entry-title {
        font-size: 32px;
        line-height: 36px
      }
    }

    .td-post-template-default .wpb_video_wrapper {
      margin-bottom: 26px
    }

    .td-post-template-default .wpb_video_wrapper iframe {
      display: block
    }

    .td-post-template-default .wpb_video_wrapper video {
      max-width: 100%
    }

    .comment {
      list-style: none;
      margin-left: 0;
      padding-bottom: 13px;
      border-bottom: 1px dashed #ededed;
      margin-bottom: 21px
    }

    .comment:first-child {
      border-top: none
    }

    .comment cite {
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      line-height: 1
    }

    .comment .comment-content,
    .comment .comment-meta,
    .comment .comment-respond {
      margin-left: 56px;
      display: table-row
    }

    .comment .comment-content {
      margin-top: 7px
    }

    .comment .comment-content p {
      margin-bottom: 21px
    }

    .comment .comment-content p:last-child {
      margin-bottom: 0
    }

    .comment p {
      margin-bottom: 0;
      word-wrap: break-word
    }

    .comment .children {
      margin-left: 70px;
      padding-top: 16px;
      border-top: 1px dashed #ededed;
      margin-top: 13px
    }

    .comment .children .children {
      margin-left: 56px
    }

    .comment .children .comment:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none
    }

    .comment .children .comment .comment-content,
    .comment .children .comment .comment-meta,
    .comment .children .comment .comment-respond {
      margin-left: 56px
    }

    .td-comments-title-wrap {
      transform: translateZ(0);
      -webkit-transform: translateZ(0)
    }

    .comment-link {
      font-size: 11px;
      line-height: 1;
      color: #747474;
      padding-left: 10px
    }

    @media(max-width:500px) {
      .comment cite {
        font-size: 16px
      }

      .comment cite a {
        display: block
      }

      .comment .children {
        margin-left: 34px
      }

      .comment .children .children {
        margin-left: 0
      }

      .comment-link {
        padding-left: 0;
        margin-bottom: 5px;
        margin-top: 5px;
        display: block
      }
    }

    .comment-meta {
      margin-top: 3px
    }

    .comment-respond {
      margin-bottom: 21px
    }

    .comment-reply-link {
      font-size: 11px;
      color: #747474
    }

    .comment-reply-link:hover {
      color: #4db2ec
    }

    .single .comments {
      margin-bottom: 48px;
      padding-top: 10px;
      margin-top: -10px
    }

    #reply-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 7px;
      margin-top: 10px
    }

    #cancel-comment-reply-link {
      font-size: 12px;
      font-weight: 400;
      color: #111;
      margin-left: 10px
    }

    #cancel-comment-reply-link:hover {
      color: #4db2ec
    }

    .comment .comment-form-input-wrap {
      margin-top: 0;
      margin-bottom: 21px
    }

    .comments {
      clear: both
    }

    .comment-form .td-warning-author,
    .comment-form .td-warning-captcha,
    .comment-form .td-warning-captcha-score,
    .comment-form .td-warning-comment,
    .comment-form .td-warning-email,
    .comment-form .td-warning-email-error {
      display: none
    }

    .comment-form textarea {
      display: block
    }

    .td-comment-form-warnings .td-warning-author,
    .td-comment-form-warnings .td-warning-captcha,
    .td-comment-form-warnings .td-warning-captcha-score,
    .td-comment-form-warnings .td-warning-comment,
    .td-comment-form-warnings .td-warning-email,
    .td-comment-form-warnings .td-warning-email-error {
      margin-bottom: -11px;
      color: #ff7a7a;
      font-size: 11px;
      font-style: italic;
      line-height: 15px
    }

    .td-form-author,
    .td-form-comment,
    .td-form-email,
    .td-form-url {
      margin-top: 0;
      margin-bottom: 21px
    }

    @media(max-width:767px) {
      .comment-respond {
        margin-left: 0 !important
      }

      .comments .comment-form .submit {
        width: 100%;
        font-size: 15px;
        font-weight: 700;
        padding: 15px 0;
        text-transform: uppercase
      }

      .comment-pagination {
        margin-bottom: 25px;
        margin-left: -3%;
        margin-right: -3%;
        text-align: center
      }

      .comment-pagination a {
        background-color: #222;
        color: #fff;
        padding: 14px 0;
        display: inline-block;
        width: 45%;
        text-align: center;
        line-height: 1;
        margin: 0 2%;
        font-size: 13px
      }

      .comment-list li:last-child {
        border: none
      }
    }

    .comment-form-cookies-consent label {
      margin-left: 8px
    }

    .comment-form-cookies-consent * {
      vertical-align: middle
    }

    .wp-block-image {
      margin-bottom: 21px
    }

    .wp-block-image figcaption {
      font-family: Verdana, BlinkMacSystemFont, -apple-system, 'segoe ui', Roboto, Oxygen, Ubuntu, Cantarell, 'open sans', 'helvetica neue', sans-serif;
      text-align: left;
      margin: 6px 0 0;
      font-size: 11px;
      font-style: italic;
      font-weight: 400;
      line-height: 17px;
      color: #444
    }

    .wp-block-gallery {
      margin-bottom: 26px
    }

    .wp-block-gallery figcaption {
      font-family: Verdana, BlinkMacSystemFont, -apple-system, 'segoe ui', Roboto, Oxygen, Ubuntu, Cantarell, 'open sans', 'helvetica neue', sans-serif;
      font-size: 11px;
      line-height: 17px
    }

    .wp-block-gallery .blocks-gallery-item figcaption {
      font-family: Verdana, BlinkMacSystemFont, -apple-system, 'segoe ui', Roboto, Oxygen, Ubuntu, Cantarell, 'open sans', 'helvetica neue', sans-serif;
      font-size: 11px;
      line-height: 17px
    }

    .wp-block-gallery.alignnone {
      display: flex
    }

    @font-face {
      font-family: newspaper;
      src: url(https://hebbarskitchen.com/wp-content/themes/Newspaper/images/icons/newspaper.eot?22);
      src: url(https://hebbarskitchen.com/wp-content/themes/Newspaper/images/icons/newspaper.eot?22#iefix) format('embedded-opentype'), url(https://hebbarskitchen.com/wp-content/themes/Newspaper/images/icons/newspaper.woff?221) format('woff'), url(https://hebbarskitchen.com/wp-content/themes/Newspaper/images/icons/newspaper.ttf?22) format('truetype'), url(https://hebbarskitchen.com/wp-content/themes/Newspaper/images/icons/newspaper.svg?22#newspaper) format('svg');
      font-weight: 400;
      font-style: normal;
      font-display: swap
    }

    [class*=" td-icon-"]:before,
    [class^=td-icon-]:before {
      font-family: newspaper;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
    }

    [class*=td-icon-] {
      line-height: 1;
      text-align: center;
      display: inline-block
    }

    .td-icon-right:before {
      content: '\e803'
    }

    .td-icon-menu-down:before {
      content: '\e806'
    }

    .td-icon-right-arrow:before {
      content: '\e808'
    }

    .td-icon-menu-up:before {
      content: '\e809'
    }

    .td-icon-search:before {
      content: '\e80a'
    }

    .td-icon-menu-right:before {
      content: '\e80d'
    }

    .td-icon-mail:before {
      content: '\e810'
    }

    .td-icon-facebook:before {
      content: '\e818'
    }

    .td-icon-instagram:before {
      content: '\e81d'
    }

    .td-icon-mail-1:before {
      content: '\e820'
    }

    .td-icon-pinterest:before {
      content: '\e825'
    }

    .td-icon-rss:before {
      content: '\e828'
    }

    .td-icon-twitter:before {
      content: '\e831'
    }

    .td-icon-youtube:before {
      content: '\e836'
    }

    .td-icon-read-down:before {
      content: '\e83d'
    }

    .td-icon-comments:before {
      content: "\e83b"
    }

    .td-icon-mobile:before {
      content: '\e83e'
    }

    .td-icon-whatsapp:before {
      content: '\f232'
    }

    .td-icon-close-mobile:before {
      content: '\e900'
    }

    .td-icon-modal-close:before {
      content: '\e902'
    }

    .td-icon-plus:before {
      content: '\ea0a'
    }

    .td-icon-minus:before {
      content: '\ea0b'
    }

    .td-social-icon-wrap:hover .td-icon-font {
      -webkit-transition: color .3s;
      transition: color .3s;
      color: #fff
    }

    .td-social-icon-wrap:hover i.td-icon-facebook {
      color: #3b5998
    }

    .td-social-icon-wrap:hover i.td-icon-instagram {
      color: #3f729b
    }

    .td-social-icon-wrap:hover i.td-icon-mail {
      color: #000
    }

    .td-social-icon-wrap:hover i.td-icon-pinterest {
      color: #cb2027
    }

    .td-social-icon-wrap:hover i.td-icon-rss {
      color: #f36f24
    }

    .td-social-icon-wrap:hover i.td-icon-twitter {
      color: #00aced
    }

    .td-social-icon-wrap:hover i.td-icon-youtube {
      color: #b00
    }

    .td-social-icon-wrap:hover i.td-icon-whatsapp {
      color: #7bbf6a
    }

    .widget {
      font-family: 'open sans', 'open sans regular', sans-serif;
      margin-bottom: 38px
    }

    .widget a {
      color: #111
    }

    .widget a:hover {
      color: #4db2ec
    }

    .widget ul {
      list-style: none;
      box-shadow: none
    }

    .widget li {
      line-height: 30px;
      list-style: none;
      margin-left: 12px
    }

    .widget li li {
      margin-left: 21px
    }

    .widget select {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      margin-top: 13px;
      padding: 0 5px
    }

    .widget .block-title {
      margin-bottom: 13px
    }

    .widget .block-title span a {
      padding: 0;
      color: inherit
    }

    .widget_text ul {
      margin-bottom: 21px
    }

    .widget_text ul li {
      list-style: disc;
      list-style-position: inside
    }

    .widget_text ol {
      margin-bottom: 21px
    }

    .widget_text ol li {
      list-style-type: decimal;
      margin: 0 0 0 21px;
      line-height: 24px
    }

    .widget_text a {
      color: #4db2ec
    }

    .widget_text a:hover {
      text-decoration: underline !important
    }

    .widget_text .block-title {
      margin-bottom: 26px
    }

    @media print {

      body,
      html {
        background-color: #fff;
        color: #000;
        margin: 0;
        padding: 0
      }

      body {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        zoom: 80%
      }

      img {
        max-width: 100%;
        display: block;
        text-align: center;
        margin-left: auto;
        margin-right: auto
      }

      h1,
      h2,
      h3,
      h4 {
        page-break-after: avoid
      }

      li,
      ol,
      ul {
        page-break-inside: avoid
      }

      table,
      td,
      tr {
        page-break-before: avoid
      }

      .single #comments,
      .single #td-theme-settings,
      .single .td-crumb-container,
      .single .td-header-menu-wrap,
      .single .td-main-sidebar,
      .single .td-menu-background,
      .single .td-more-articles-box,
      .single .td-post-comments,
      .single .td-post-sharing,
      .single .td-post-source-tags,
      .single .td-scroll-up,
      .single iframe {
        display: none !important
      }

      .td-header-desktop-wrap {
        display: block !important
      }

      .td-footer-template-wrap,
      .td_block_wrap:not(.tdb_breadcrumbs):not(.tdb_header_logo):not(.tdb_single_categories):not(.tdb-single-title):not(.tdb_single_author):not(.tdb_single_date):not(.tdb_single_comments_count):not(.tdb_single_post_views):not(.tdb_single_featured_image):not(.tdb_single_content):not(.td_woo_breadcrumbs):not(.td-woo-product-title):not(.td_woo_product_description):not(.td_woo_add_to_cart):not(.td_woo_product_sku):not(.td_woo_product_image):not(.td_woo_product_tabs):not(.td_woo_product_categories):not(.td_woo_product_tags):not(.td_woo_product_image_bg):not(.td_woo_product_price):not(.td_woo_product_rating) {
        display: none !important
      }

      .body.td-animation-stack-type0 img {
        opacity: 1 !important
      }

      .backstretch {
        display: none
      }

      .td-main-content,
      .td-main-content-wrap .tdc-column,
      header {
        width: 100% !important
      }
    }

    @media (max-width:767px) {
      .td-header-desktop-wrap {
        display: none
      }
    }

    @media (min-width:767px) {
      .td-header-mobile-wrap {
        display: none
      }
    }

    .clearfix:after,
    .clearfix:before {
      display: table;
      content: "";
      line-height: 0
    }

    .clearfix:after {
      clear: both
    }

    .td-sp {
      background-image: url(https://hebbarskitchen.com/wp-content/plugins/td-composer/legacy/Newspaper/assets/images/sprite/elements.png);
      background-repeat: no-repeat;
      display: block
    }

    .td-sp-video-play {
      width: 42px;
      height: 42px;
      background-position: -20px -488px
    }

    .td-sp-video-pause {
      width: 42px;
      height: 42px;
      background-position: -20px -612px
    }

    .td-sp-facebook {
      width: 32px;
      height: 32px;
      background-position: -20px -20px
    }

    .td-sp-instagram {
      width: 32px;
      height: 32px;
      background-position: -20px -228px
    }

    .td-sp-youtube {
      width: 32px;
      height: 32px;
      background-position: -20px -384px
    }

    .tdc_zone {
      margin: 0
    }

    .td-main-content-wrap .tdc_zone {
      z-index: 0
    }

    .td-header-template-wrap {
      z-index: 100
    }

    .td-header-desktop-wrap {
      width: 100%
    }

    .td-header-desktop-sticky-wrap,
    .td-header-mobile-sticky-wrap {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;
      visibility: hidden;
      opacity: 0
    }

    .td-header-desktop-sticky-wrap.td-header-active,
    .td-header-mobile-sticky-wrap.td-header-active {
      visibility: visible
    }

    .td-header-desktop-sticky-wrap.td-header-stop-transition,
    .td-header-mobile-sticky-wrap.td-header-stop-transition {
      -webkit-transition: none;
      transition: none
    }

    @media(min-width:767px) {
      .admin-bar .td-header-desktop-sticky-wrap {
        margin-top: 32px
      }
    }

    .tdb-mega-menu .td-post-category {
      transition: none;
      -webkit-transition: none
    }

    .tdb-hover .td-post-category {
      transition: all .2s ease;
      -webkit-transition: .2s
    }

    .rtl .td-mobile-main-menu {
      display: flex;
      flex-direction: column-reverse
    }

    #td-mobile-nav .td-login-form-mobile-fb-open .td-login-close,
    #td-mobile-nav .td-login-form-mobile-fb-open .td-register-close {
      opacity: .5;
      pointer-events: none
    }

    .td-ajax-search-flex .td_module_flex_1 {
      padding-bottom: 25px
    }

    .td-ajax-search-flex .td_module_flex_1 .td-module-container {
      flex-direction: row
    }

    .td-ajax-search-flex .td_module_flex_1 .td-image-container {
      flex: 0 0 30%;
      width: 30%
    }

    .td-ajax-search-flex .td_module_flex_1 .td-image-wrap {
      padding-bottom: 70%
    }

    .td-ajax-search-flex .td_module_flex_1 .td-module-meta-info {
      padding: 0 0 0 15px
    }

    .td-ajax-search-flex .td_module_flex_1 .entry-title {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500
    }

    .td-ajax-search-flex .td_module_flex_1 .td-post-author-name,
    .td-ajax-search-flex .td_module_flex_1 .td-post-category {
      display: none
    }

    .td_block_wrap {
      margin-bottom: 48px;
      position: relative;
      clear: both
    }

    @media(max-width:767px) {
      .td_block_wrap {
        margin-bottom: 32px
      }
    }

    .td_block_wrap .td-subcat-item .td-cur-simple-item {
      color: #000
    }

    .td-block-title-wrap {
      position: relative
    }

    .td-fix-index {
      transform: translateZ(0);
      -webkit-transform: translateZ(0)
    }

    .td_block_wrap .td-subcat-item .td-cur-simple-item {
      color: #4db2ec
    }

    .td_block_inner_overflow {
      overflow: hidden
    }

    .td-load-more-infinite-wrap {
      display: none
    }

    .td-subcat-filter {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: auto 0;
      opacity: 0;
      z-index: 2;
      line-height: 30px;
      text-align: right
    }

    .td-subcat-filter ul {
      margin: 0
    }

    .td-js-loaded .td-subcat-filter {
      opacity: 1;
      -webkit-transition: opacity .3s;
      transition: opacity .3s
    }

    .td-h-effect-up-shadow .entry-thumb:not(.td-animation-stack-type0-2):not(.td-animation-stack-type1-2):not(.td-animation-stack-type2-2),
    .td-h-effect-up-shadow .td-module-thumb a:after {
      -webkit-transition: box-shadow .3s, transform .3s;
      transition: box-shadow .3s ease, transform .3s ease
    }

    .td-h-effect-up-shadow .entry-thumb.td-animation-stack-type0-2 {
      transition: box-shadow .3s ease, transform .3s ease, opacity .3s cubic-bezier(.39, .76, .51, .56)
    }

    .td-h-effect-up-shadow .entry-thumb.td-animation-stack-type1-2 {
      transition: box-shadow .3s ease, transform .3s ease, opacity .3s cubic-bezier(.39, .76, .51, .56) 0s
    }

    .td-h-effect-up-shadow .entry-thumb.td-animation-stack-type2-2 {
      transition: box-shadow .3s ease, transform .3s ease, opacity .4s cubic-bezier(.13, .43, .57, .88)
    }

    .td-h-effect-up-shadow .entry-thumb {
      -webkit-box-shadow: 0 3px 12px -1px rgba(7, 10, 25, .2), 0 22px 27px -20px rgba(7, 10, 25, .2);
      box-shadow: 0 3px 12px -1px rgba(7, 10, 25, .2), 0 22px 27px -20px rgba(7, 10, 25, .2)
    }

    .td-h-effect-up-shadow .td_module_wrap:hover .entry-thumb,
    .td-h-effect-up-shadow .td_module_wrap:hover .td-module-thumb a:after,
    .td-h-effect-up-shadow.td_module_wrap:hover .entry-thumb,
    .td-h-effect-up-shadow.td_module_wrap:hover .td-module-thumb a:after {
      transform: translate(0, -2px) !important;
      -webkit-transform: translate(0, -2px) !important
    }

    .td-h-effect-up-shadow .td_module_wrap:hover .entry-thumb,
    .td-h-effect-up-shadow.td_module_wrap:hover .entry-thumb {
      -webkit-box-shadow: 0 15px 45px -5px rgba(7, 10, 25, .25);
      box-shadow: 0 15px 45px -5px rgba(7, 10, 25, .25)
    }

    [class*=td_flex_block_] .td-post-vid-time {
      padding: 3px 6px 4px;
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-size: 10px;
      font-weight: 600;
      line-height: 1
    }

    .td-post-vid-time {
      pointer-events: none
    }

    html[class*=ie] [class*='tdb_header_mega_menu '] .td-module-container,
    html[class*=ie] [class*=td_flex_block_5] .td-module-container {
      display: block
    }

    html[class*=ie] [class*='tdb_header_mega_menu '] .td-image-container,
    html[class*=ie] [class*=td_flex_block_5] .td-image-container {
      height: auto;
      flex: initial
    }

    .td_module_flex_1,
    .td_module_flex_5 {
      display: inline-block;
      width: 100%;
      padding-bottom: 0
    }

    .td_module_flex_1 .td-module-container,
    .td_module_flex_5 .td-module-container {
      display: flex;
      flex-direction: column;
      position: relative
    }

    .td_module_flex_1 .td-module-container:before,
    .td_module_flex_5 .td-module-container:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px
    }

    .td_module_flex_1 .td-image-wrap,
    .td_module_flex_5 .td-image-wrap {
      display: block;
      position: relative
    }

    .td_module_flex_1 .td-image-container,
    .td_module_flex_5 .td-image-container {
      position: relative;
      flex: 0 0 auto;
      width: 100%;
      height: 100%
    }

    .td_module_flex_1 .td-module-thumb,
    .td_module_flex_5 .td-module-thumb {
      margin-bottom: 0
    }

    .td_module_flex_1 .td-module-meta-info,
    .td_module_flex_5 .td-module-meta-info {
      width: 100%;
      margin-bottom: 0;
      z-index: 1;
      border: 0 solid #eaeaea;
      min-height: 0
    }

    .td_module_flex_1 .td-thumb-css,
    .td_module_flex_5 .td-thumb-css {
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: cover;
      background-position: center center
    }

    .td_module_flex_1 .td-post-vid-time,
    .td_module_flex_5 .td-post-vid-time {
      position: absolute;
      z-index: 2;
      bottom: 0
    }

    .td_module_flex_1 .td-post-vid-time,
    .td_module_flex_5 .td-post-vid-time {
      right: 0;
      background-color: #000;
      color: #fff
    }

    .td-mc1-wrap .td_module_wrap:after,
    .td-mc1-wrap:after {
      content: '';
      display: table;
      clear: both
    }

    .td_module_flex_1 .td-image-wrap,
    .td_module_flex_5 .td-image-wrap {
      padding-bottom: 50%
    }

    .td_module_flex_1 .td-module-meta-info,
    .td_module_flex_5 .td-module-meta-info {
      padding: 13px 0 0
    }

    .td_flex_block_5 .td-module-meta-info-top {
      padding: 0
    }

    a[href^=tel] {
      color: inherit
    }

    .td-image-gradient:before {
      bottom: 0;
      content: "";
      display: block;
      height: 50%;
      width: 100%;
      position: absolute;
      z-index: 1;
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, .8)));
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .8) 100%)
    }

    @media(max-width:1018px) {
      .td-image-gradient:before {
        height: 100%
      }
    }

    .ie10 .entry-thumb:after,
    .ie10 .entry-thumb:before,
    .ie11 .entry-thumb:after,
    .ie11 .entry-thumb:before,
    .ie8 .entry-thumb:after,
    .ie8 .entry-thumb:before,
    .ie9 .entry-thumb:after,
    .ie9 .entry-thumb:before {
      display: none !important
    }

    .td_block_wrap p:empty:before {
      display: none
    }

    .rtl .td-element-style {
      right: auto
    }

    [class*=" td-icons"]:before,
    [class^=td-icons]:before {
      font-family: newspaper-icons;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
    }

    [class*=td-icons] {
      line-height: 1;
      text-align: center;
      display: inline-block;
      cursor: default
    }

    .rain-d:before {
      content: '\e800';
      display: none
    }

    .rain-n:before {
      content: '\e801';
      display: none
    }

    .mist-d:before {
      content: '\e802';
      display: none
    }

    .mist-n:before {
      content: '\e802';
      display: none
    }

    .scattered-clouds-d:before {
      content: '\e803';
      display: none
    }

    .scattered-clouds-n:before {
      content: '\e803';
      display: none
    }

    .shower-rain-d:before {
      content: '\e804';
      display: none
    }

    .shower-rain-n:before {
      content: '\e804';
      display: none
    }

    .snow-d:before {
      content: '\e805';
      display: none
    }

    .snow-n:before {
      content: '\e805';
      display: none
    }

    .thunderstorm-d:before {
      content: '\e806';
      display: none
    }

    .thunderstorm-n:before {
      content: '\e806';
      display: none
    }

    .broken-clouds-d:before {
      content: '\e807';
      display: none
    }

    .broken-clouds-n:before {
      content: '\e807';
      display: none
    }

    .clear-sky-d:before {
      content: '\e808';
      display: none
    }

    .clear-sky-n:before {
      content: '\e809';
      display: none
    }

    .few-clouds-d:before {
      content: '\e80a';
      display: none
    }

    .few-clouds-n:before {
      content: '\e80b';
      display: none
    }

    .td-icons-location:before {
      content: '\e811'
    }

    .mfp-bg {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1042;
      overflow: hidden;
      position: fixed;
      background: #0b0b0b;
      opacity: .8
    }

    .mfp-wrap {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1043;
      position: fixed;
      outline: 0 !important;
      -webkit-backface-visibility: hidden
    }

    .mfp-container {
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      padding: 0 8px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box
    }

    .mfp-container:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle
    }

    .mfp-align-top .mfp-container:before {
      display: none
    }

    .mfp-content {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin: 0 auto;
      text-align: left;
      z-index: 1045
    }

    .mfp-ajax-holder .mfp-content,
    .mfp-inline-holder .mfp-content {
      width: 100%;
      cursor: auto
    }

    .mfp-ajax-cur {
      cursor: progress
    }

    .mfp-zoom-out-cur {
      cursor: -webkit-zoom-out;
      cursor: zoom-out
    }

    .mfp-zoom {
      cursor: pointer;
      cursor: -webkit-zoom-in;
      cursor: zoom-in
    }

    .mfp-auto-cursor .mfp-content {
      cursor: auto
    }

    .mfp-arrow,
    .mfp-close,
    .mfp-counter,
    .mfp-preloader {
      -webkit-user-select: none;
      user-select: none
    }

    .mfp-loading.mfp-figure {
      display: none
    }

    .mfp-hide {
      display: none !important
    }

    .mfp-preloader {
      color: #ccc;
      position: absolute;
      top: 50%;
      width: auto;
      text-align: center;
      margin-top: -.8em;
      left: 8px;
      right: 8px;
      z-index: 1044
    }

    .mfp-preloader a {
      color: #ccc
    }

    .mfp-preloader a:hover {
      color: #fff
    }

    .mfp-s-ready .mfp-preloader {
      display: none
    }

    .mfp-s-error .mfp-content {
      display: none
    }

    button.mfp-arrow,
    button.mfp-close {
      overflow: visible;
      cursor: pointer;
      background: 0 0;
      border: 0;
      -webkit-appearance: none;
      display: block;
      outline: 0;
      padding: 0;
      z-index: 1046;
      -webkit-box-shadow: none;
      box-shadow: none
    }

    button::-moz-focus-inner {
      padding: 0;
      border: 0
    }

    .mfp-close {
      width: 44px;
      height: 44px;
      line-height: 44px;
      position: absolute;
      right: 0;
      top: 0;
      text-decoration: none;
      text-align: center;
      opacity: .65;
      padding: 0 0 18px 10px;
      color: #fff;
      font-style: normal;
      font-size: 28px;
      font-family: Arial, Baskerville, monospace
    }

    .mfp-close:focus,
    .mfp-close:hover {
      opacity: 1
    }

    .mfp-close:active {
      top: 1px
    }

    .mfp-close-btn-in .mfp-close {
      color: #333
    }

    .mfp-iframe-holder .mfp-close,
    .mfp-image-holder .mfp-close {
      color: #fff;
      right: -6px;
      text-align: right;
      padding-right: 6px;
      width: 100%
    }

    .mfp-counter {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #ccc;
      padding-right: 15px;
      font-size: 11px;
      line-height: 18px
    }

    .mfp-arrow {
      font-family: newspaper, sans-serif;
      font-size: 30px;
      position: absolute;
      opacity: .65;
      margin: 0;
      top: 50%;
      margin-top: -55px;
      padding: 0;
      width: 90px;
      height: 110px;
      -webkit-tap-highlight-color: transparent
    }

    .mfp-arrow:active {
      margin-top: -54px
    }

    .mfp-arrow:focus,
    .mfp-arrow:hover {
      opacity: 1
    }

    .mfp-arrow .mfp-a,
    .mfp-arrow .mfp-b {
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 0;
      margin-top: 35px;
      margin-left: 35px
    }

    .mfp-arrow-left {
      left: 0
    }

    .mfp-arrow-left:before {
      content: '\e807';
      color: #fff
    }

    .mfp-arrow-right {
      right: 0
    }

    .mfp-arrow-right:before {
      content: '\e808';
      color: #fff
    }

    .mfp-iframe-holder {
      padding-top: 40px;
      padding-bottom: 40px
    }

    .mfp-iframe-holder .mfp-content {
      line-height: 0;
      width: 100%;
      max-width: 900px
    }

    .mfp-iframe-holder .mfp-close {
      top: -40px
    }

    .mfp-iframe-scaler {
      width: 100%;
      height: 0;
      overflow: hidden;
      padding-top: 56.25%
    }

    .mfp-iframe-scaler iframe {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 8px rgba(0, 0, 0, .6);
      background: #000
    }

    img.mfp-img {
      width: auto;
      max-width: 100%;
      height: auto;
      display: block;
      line-height: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 40px 0;
      margin: 0 auto
    }

    .mfp-figure {
      line-height: 0
    }

    .mfp-figure:before {
      bottom: 40px;
      content: "";
      display: block;
      height: 20%;
      width: 100%;
      position: absolute;
      z-index: 0;
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, .7)));
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
      opacity: 0;
      -webkit-transition: opacity 1s;
      transition: opacity 1s ease
    }

    .mfp-ready .mfp-s-ready .mfp-figure:before {
      opacity: 1
    }

    .mfp-figure:after {
      content: '';
      position: absolute;
      left: 0;
      top: 40px;
      bottom: 40px;
      display: block;
      right: 0;
      width: auto;
      height: auto;
      z-index: -1;
      box-shadow: 0 0 8px rgba(0, 0, 0, .6);
      background: #444
    }

    .mfp-figure small {
      color: #bdbdbd;
      display: block;
      font-size: 12px;
      line-height: 14px
    }

    .mfp-figure figure {
      margin: 0
    }

    .mfp-bottom-bar {
      font-size: 11px;
      line-height: 18px;
      margin-bottom: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      cursor: auto;
      padding: 0 65px 0 15px;
      z-index: 1
    }

    .mfp-title {
      text-align: left;
      line-height: 18px;
      color: #f3f3f3;
      word-wrap: break-word
    }

    .mfp-image-holder .mfp-content {
      max-width: 100%
    }

    .mfp-gallery .mfp-image-holder .mfp-figure {
      cursor: pointer
    }

    @media screen and (max-width:800px) and (orientation:landscape),
    screen and (max-height:300px) {
      .mfp-img-mobile .mfp-image-holder {
        padding-left: 0;
        padding-right: 0
      }

      .mfp-img-mobile img.mfp-img {
        padding: 0
      }

      .mfp-img-mobile .mfp-figure:before {
        bottom: 0
      }

      .mfp-img-mobile .mfp-figure:after {
        top: 0;
        bottom: 0
      }

      .mfp-img-mobile .mfp-figure small {
        display: inline;
        margin-left: 5px
      }

      .mfp-img-mobile .mfp-bottom-bar {
        background: rgba(0, 0, 0, .6);
        bottom: 0;
        margin: 0;
        top: auto;
        padding: 3px 5px;
        position: fixed;
        -webkit-box-sizing: border-box;
        box-sizing: border-box
      }

      .mfp-img-mobile .mfp-bottom-bar:empty {
        padding: 0
      }

      .mfp-img-mobile .mfp-counter {
        right: 5px;
        top: 3px
      }

      .mfp-img-mobile .mfp-close {
        top: 0;
        right: 0;
        width: 35px;
        height: 35px;
        line-height: 35px;
        background: rgba(0, 0, 0, .6);
        position: fixed;
        text-align: center;
        padding: 0
      }
    }

    @media all and (max-width:900px) {
      .mfp-arrow {
        -webkit-transform: scale(.75);
        transform: scale(.75)
      }

      .mfp-arrow-left {
        -webkit-transform-origin: 0;
        transform-origin: 0
      }

      .mfp-arrow-right {
        -webkit-transform-origin: 100%;
        transform-origin: 100%
      }

      .mfp-container {
        padding-left: 6px;
        padding-right: 6px
      }
    }

    .mfp-ie7 .mfp-img {
      padding: 0
    }

    .mfp-ie7 .mfp-bottom-bar {
      width: 600px;
      left: 50%;
      margin-left: -300px;
      margin-top: 5px;
      padding-bottom: 5px
    }

    .mfp-ie7 .mfp-container {
      padding: 0
    }

    .mfp-ie7 .mfp-content {
      padding-top: 44px
    }

    .mfp-ie7 .mfp-close {
      top: 0;
      right: 0;
      padding-top: 0
    }

    .mfp-with-zoom .mfp-container,
    .mfp-with-zoom.mfp-bg {
      opacity: .001;
      -webkit-backface-visibility: hidden;
      -webkit-transition: .3s ease-out;
      -moz-transition: .3s ease-out;
      -o-transition: .3s ease-out;
      transition: all .3s ease-out
    }

    .mfp-with-zoom.mfp-ready .mfp-container {
      opacity: 1
    }

    .mfp-with-zoom.mfp-ready.mfp-bg {
      opacity: .8
    }

    .mfp-with-zoom.mfp-removing .mfp-container,
    .mfp-with-zoom.mfp-removing.mfp-bg {
      opacity: 0
    }

    .mfp-bg {
      z-index: 10000
    }

    .mfp-wrap {
      z-index: 10000
    }

    .mfp-content .td-login-wrap {
      position: relative
    }

    .mfp-content .td-login-wrap.td-login-wrap-fb-open #register-link,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open .td-back-button,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open .td-login-info-text,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open .td-login-panel-descr,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open .td-login-panel-title,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open .td-login-social,
    .mfp-content .td-login-wrap.td-login-wrap-fb-open form {
      opacity: .5;
      pointer-events: none
    }

    .mfp-content #login-form .td-login-wrap-fb-open+.mfp-close {
      opacity: .5;
      pointer-events: none
    }

    .mfp-content .td-back-button {
      visibility: hidden;
      opacity: 0;
      -webkit-transition: .5s cubic-bezier(.79, .14, .15, .86);
      transition: all .5s cubic-bezier(.79, .14, .15, .86) 0s;
      position: absolute;
      top: 13px;
      left: 8px;
      color: #fff;
      width: 50px;
      height: 50px;
      z-index: 99
    }

    .mfp-content .td-back-button i {
      line-height: 50px;
      font-size: 16px
    }

    .mfp-content .td-login-inputs {
      width: 100%;
      display: inline-block;
      position: relative;
      margin-bottom: 30px;
      font-size: 15px;
      font-weight: 400;
      color: #fff
    }

    .mfp-content .td-login-inputs label {
      position: absolute;
      top: 8px;
      left: 0;
      text-transform: uppercase;
      -webkit-transition: .2s;
      transition: all .2s ease;
      pointer-events: none
    }

    .mfp-content .td-login-inputs:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #fff;
      opacity: .3
    }

    .mfp-content .td-login-input {
      position: relative;
      background-color: transparent !important;
      height: 40px;
      margin: 0 !important;
      padding: 0;
      box-shadow: none !important;
      font-size: 15px;
      color: #fff;
      outline: 0;
      border: 0
    }

    .mfp-content .td-login-input:focus~label,
    .mfp-content .td-login-input:valid~label {
      top: -18px;
      font-size: 11px;
      opacity: .6
    }

    .mfp-content .td-login-input:invalid {
      font-style: italic
    }

    .mfp-content .td-login-button {
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 5px 12px 6px;
      margin-top: 20px;
      margin-bottom: 0;
      text-transform: uppercase;
      text-shadow: none;
      font-size: 13px;
      font-weight: 600;
      color: #000;
      -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
      border: 0;
      border-radius: 0;
      -webkit-transition: background-color .2s !important;
      transition: background-color .2s ease !important
    }

    .mfp-content .td-login-button:active,
    .mfp-content .td-login-button:hover {
      -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
      background-color: #deea4b
    }

    .mfp-content .td-login-social {
      width: 100%;
      margin-top: 15px;
      margin-bottom: 8px
    }

    .mfp-content .td-login-info-text {
      display: block;
      margin-top: 3px;
      font-size: 11px;
      color: #fff
    }

    .mfp-content .td-login-info-text a {
      color: inherit
    }

    .mfp-content .td-login-info-text a:hover {
      text-decoration: underline
    }

    .mfp-content #register-link {
      width: 100%;
      display: block;
      padding: 13px;
      margin-top: 24px;
      font-size: 13px;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      position: relative
    }

    .mfp-content #register-link:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #fff;
      opacity: 0;
      -webkit-transition: opacity .2s;
      transition: opacity .2s ease
    }

    .mfp-content #register-link:hover:before {
      opacity: .2
    }

    .mfp-content .td-login-form-div {
      padding: 0 20%
    }

    @media(max-width:480px) {
      .mfp-content .td-login-form-div {
        padding: 0 5%
      }
    }

    .mfp-content #td-login-div {
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      -webkit-transition: .5s cubic-bezier(.79, .14, .15, .86);
      transition: all .5s cubic-bezier(.79, .14, .15, .86) 0s
    }

    .mfp-content #td-login-div.td-display-none {
      display: none;
      visibility: hidden;
      opacity: 0;
      -webkit-transition: .3s cubic-bezier(.79, .14, .15, .86);
      transition: all .3s cubic-bezier(.79, .14, .15, .86) 0s
    }

    .mfp-content .td-login-animation #td-login-div {
      transform: translate3d(-300px, 0, 0);
      -webkit-transform: translate3d(-300px, 0, 0)
    }

    .mfp-content .td-login-animation .td-back-button {
      visibility: visible;
      opacity: 1
    }

    .mfp-content #td-forgot-pass-div,
    .mfp-content #td-register-div {
      display: none;
      visibility: hidden;
      opacity: 0;
      -webkit-transition: .5s cubic-bezier(.79, .14, .15, .86);
      transition: all .5s cubic-bezier(.79, .14, .15, .86) 0s;
      transform: translate3d(300px, 0, 0);
      -webkit-transform: translate3d(300px, 0, 0)
    }

    .mfp-content #td-forgot-pass-div.td-display-block,
    .mfp-content #td-register-div.td-display-block {
      display: block;
      visibility: visible;
      opacity: 1;
      -webkit-transition: .3s cubic-bezier(.79, .14, .15, .86);
      transition: all .3s cubic-bezier(.79, .14, .15, .86) 0s;
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0)
    }

    .mfp-content #login-form .mfp-close {
      position: absolute;
      top: 26px;
      width: 20px;
      height: 20px;
      line-height: 0;
      font-size: 0;
      color: #fff;
      font-family: newspaper, sans-serif
    }

    .mfp-content #login-form .mfp-close:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
      -webkit-transform: translate(-50%, 50%);
      font-size: 16px;
      vertical-align: bottom;
      color: #fff
    }

    .mfp-content #login-form #login-link {
      position: absolute;
      left: 26px;
      top: 28px;
      cursor: pointer
    }

    .mfp-content #login-form .mfp-close {
      right: 27px;
      left: auto;
      opacity: 1
    }

    .mfp-content #login-form .mfp-close:before {
      content: '\e902'
    }

    .mfp-content .td-login-panel-title {
      padding: 26px 0 22px;
      line-height: 20px;
      font-size: 17px;
      text-transform: uppercase;
      color: #fff;
      pointer-events: none
    }

    .mfp-content .td-login-panel-descr {
      margin-bottom: 77px;
      font-size: 13px;
      line-height: 1
    }

    .mfp-content .td_display_err {
      color: #fff;
      padding: 14px 30px;
      display: none;
      position: absolute;
      top: 93px;
      left: 0;
      right: 0;
      font-size: 11px;
      text-transform: uppercase;
      margin: 0 -40%;
      line-height: 1
    }

    .mfp-content .td_display_err:before {
      content: '';
      width: 100%;
      height: 100%;
      background-color: #000;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .8;
      z-index: -1
    }

    .mfp-content .td_display_msg_ok:before {
      background-color: #fff;
      opacity: .1
    }

    .mpf-td-login-effect.mfp-bg {
      opacity: 0;
      transition: all .3s ease-out
    }

    .mpf-td-login-effect.mfp-ready.mfp-bg {
      opacity: .8
    }

    .mpf-td-login-effect.mfp-removing.mfp-bg {
      opacity: 0
    }

    #login_pass,
    #login_pass-mob {
      display: none !important
    }

    .mfp-ready #login_pass,
    .td-login-show #login_pass-mob {
      display: inline-block !important
    }

    @media only screen and (-webkit-min-device-pixel-ratio:2),
    only screen and (min--moz-device-pixel-ratio:2),
    only screen and (min-device-pixel-ratio:2) {
      .td-sp {
        background-image: url(https://hebbarskitchen.com/wp-content/plugins/td-composer/legacy/Newspaper/assets/images/sprite/elements@2x.png) !important;
        background-size: 90px 2100px !important
      }
    }

    .tdc-placeholder-title {
      font-family: 'open sans', 'open sans regular', sans-serif;
      height: 50px;
      border: 1px solid #ebebeb;
      text-align: center;
      font-size: 12px;
      line-height: 50px;
      display: block;
      color: #666;
      margin-left: auto;
      margin-right: auto;
      position: relative
    }

    .td-spot-id-video_modal .tdc-placeholder-title {
      border-color: #ebebeb;
      max-width: 728px;
      height: 90px;
      margin-left: auto;
      margin-right: auto;
      position: relative
    }

    @media(min-width:768px) and (max-width:1018px) {
      .td-spot-id-video_modal .tdc-placeholder-title {
        width: 468px;
        height: 60px
      }
    }

    @media(max-width:767px) {
      .td-spot-id-video_modal .tdc-placeholder-title {
        position: relative;
        width: 320px;
        height: 50px
      }
    }

    .td-spot-id-video_modal .tdc-placeholder-title:before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      margin: auto;
      display: table;
      width: 100%
    }

    .td-spot-id-video_modal .tdc-placeholder-title:before {
      content: 'Video modal ad' !important
    }

    .td-container-wrap {
      background-color: #fff;
      margin-left: auto;
      margin-right: auto
    }

    .backstretch {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -99999;
      top: 0
    }

    body .td-backstretch {
      max-width: none;
      opacity: 0;
      transition: opacity 2s;
      display: block
    }

    body .td-stretch-width {
      height: auto;
      width: 100.03%;
      margin: 0;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%)
    }

    body .td-stretch-height {
      position: relative;
      height: 100%;
      width: auto;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%)
    }

    .td-js-loaded .td-scroll-up {
      display: block !important
    }

    .td-scroll-up {
      cursor: pointer;
      position: fixed;
      bottom: 4px;
      right: 5px;
      width: 40px;
      height: 40px;
      background-color: #4db2ec;
      z-index: 9999;
      transform: translate3d(0, 70px, 0);
      -webkit-transform: translate3d(0, 70px, 0);
      -webkit-transition: transform .4s cubic-bezier(.55, 0, .1, 1);
      transition: transform .4s cubic-bezier(.55, 0, .1, 1) 0s
    }

    .td-scroll-up .td-icon-menu-up {
      position: relative;
      color: #fff;
      font-size: 20px;
      display: block;
      text-align: center;
      width: 40px;
      top: 7px
    }

    .td-scroll-up-visible {
      transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0)
    }

    .admin-bar .td-vm-close {
      top: 72px
    }

    @media(max-width:767px) {
      .td-scroll-up.td-hide-scroll-up-on-mob {
        display: none !important
      }

      .admin-bar .td-vm-close {
        top: 71px
      }
    }

    @-webkit-keyframes fullspin {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
      }
    }

    @keyframes fullspin {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
      }
    }

    .td_wrapper_video_playlist.td-video-fixed,
    .wpb_video_wrapper.td-video-fixed {
      position: fixed !important;
      right: 0 !important;
      top: 300px !important;
      bottom: auto !important;
      left: auto !important;
      z-index: 9999 !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, .2);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, .2)
    }

    .td_wrapper_video_playlist.td-video-fixed-left,
    .wpb_video_wrapper.td-video-fixed-left {
      left: 0 !important;
      right: auto !important
    }

    .td_wrapper_video_playlist.td-video-fixed-bottom,
    .wpb_video_wrapper.td-video-fixed-bottom {
      top: auto !important;
      bottom: 300px !important
    }

    .td-close-video-fixed {
      display: none;
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: #4db2ec;
      color: #fff;
      padding: 7px;
      cursor: pointer;
      z-index: 1
    }

    .td-close-video-fixed i {
      font-size: 11px
    }

    .td-video-fixed .td-close-video-fixed {
      display: flex !important;
      justify-content: center;
      align-items: center
    }

    .td-sticky-video .td-footer-template-wrap {
      z-index: -1
    }

    .wpb_button {
      display: inline-block;
      font-family: 'open sans', 'open sans regular', sans-serif;
      font-weight: 600;
      line-height: 24px;
      text-shadow: none;
      border: none;
      transition: none;
      border-radius: 0;
      margin-bottom: 21px
    }

    .wpb_button:hover {
      text-shadow: none;
      text-decoration: none !important
    }

    .widget {
      overflow: hidden
    }

    .td-element-style {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      pointer-events: none
    }

    .td-stretch-content .td-module-thumb .entry-thumb {
      min-width: 100%
    }

    .td_animated {
      -webkit-animation-duration: .3s;
      animation-duration: .3s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both
    }

    .td_animated_long {
      -webkit-animation-duration: .5s;
      animation-duration: .5s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both
    }

    .td_animated_xlong {
      -webkit-animation-duration: .8s;
      animation-duration: .8s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both
    }

    @-webkit-keyframes td_fadeInRight {
      0% {
        opacity: .05;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }
    }

    @keyframes td_fadeInRight {
      0% {
        opacity: .05;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }
    }

    .td_fadeInRight {
      -webkit-animation-name: td_fadeInRight;
      animation-name: td_fadeInRight
    }

    @-webkit-keyframes td_fadeInLeft {
      0% {
        opacity: .05;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }
    }

    @keyframes td_fadeInLeft {
      0% {
        opacity: .05;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }
    }

    .td_fadeInLeft {
      -webkit-animation-name: td_fadeInLeft;
      animation-name: td_fadeInLeft
    }

    @-webkit-keyframes td_fadeInDown {
      0% {
        opacity: .05;
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
      }
    }

    @keyframes td_fadeInDown {
      0% {
        opacity: .05;
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
      }
    }

    .td_fadeInDown {
      -webkit-animation-name: td_fadeInDown;
      animation-name: td_fadeInDown
    }

    @-webkit-keyframes td_fadeInUp {
      0% {
        opacity: .05;
        -webkit-transform: translateY(20px);
        transform: translateY(20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
      }
    }

    @keyframes td_fadeInUp {
      0% {
        opacity: .05;
        -webkit-transform: translateY(20px);
        transform: translateY(20px)
      }

      100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
      }
    }

    .td_fadeInUp {
      -webkit-animation-name: td_fadeInUp;
      animation-name: td_fadeInUp
    }

    @-webkit-keyframes td_fadeIn {
      0% {
        opacity: 0
      }

      100% {
        opacity: 1
      }
    }

    @keyframes td_fadeIn {
      0% {
        opacity: 0
      }

      100% {
        opacity: 1
      }
    }

    .td_fadeIn {
      -webkit-animation-name: td_fadeIn;
      animation-name: td_fadeIn
    }

    @-webkit-keyframes td_fadeOut_to_1 {
      0% {
        opacity: 1
      }

      100% {
        opacity: .1
      }
    }

    @keyframes td_fadeOut_to_1 {
      0% {
        opacity: 1
      }

      100% {
        opacity: .1
      }
    }

    .td_fadeOut_to_1 {
      -webkit-animation-name: td_fadeOut_to_1;
      animation-name: td_fadeOut_to_1
    }

    @-webkit-keyframes td_fadeOutRight {
      0% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }

      100% {
        opacity: 0;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
      }
    }

    @keyframes td_fadeOutRight {
      0% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }

      100% {
        opacity: 0;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
      }
    }

    .td_fadeOutRight {
      -webkit-animation-name: td_fadeOutRight;
      animation-name: td_fadeOutRight
    }

    @-webkit-keyframes td_fadeOutLeft {
      0% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }

      100% {
        opacity: 0;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
      }
    }

    @keyframes td_fadeOutLeft {
      0% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
      }

      100% {
        opacity: 0;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
      }
    }

    .td_fadeOutLeft {
      -webkit-animation-name: td_fadeOutLeft;
      animation-name: td_fadeOutLeft
    }

    .td-lb-box {
      position: absolute;
      width: 19px;
      height: 19px
    }

    .td-lb-box-2 {
      top: 0;
      left: 20px
    }

    .td-lb-box-3 {
      top: 0;
      left: 40px
    }

    .td-lb-box-4 {
      top: 20px;
      right: 0
    }

    .td-lb-box-5 {
      bottom: 0;
      right: 0
    }

    .td-lb-box-6 {
      bottom: 0;
      left: 20px
    }

    .td-lb-box-7 {
      bottom: 0;
      left: 0
    }

    .td-lb-box-8 {
      top: 20px;
      left: 0
    }

    .td-loader-gif {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 59px;
      height: 59px;
      margin-top: -29.5px;
      margin-left: -29.5px;
      -webkit-transition: .4s cubic-bezier(.55, 0, .1, 1);
      transition: all .4s cubic-bezier(.55, 0, .1, 1)
    }

    @media(max-width:767px) {
      .td-loader-gif {
        top: 200px
      }
    }

    .td-loader-infinite {
      top: auto;
      bottom: 0
    }

    .td-loader-infinite .td-lb-box {
      position: absolute;
      width: 10px;
      height: 10px
    }

    .td-loader-infinite .td-lb-box-2 {
      top: 0;
      left: 11px
    }

    .td-loader-infinite .td-lb-box-3 {
      top: 0;
      left: 22px
    }

    .td-loader-infinite .td-lb-box-4 {
      top: 11px;
      right: 0
    }

    .td-loader-infinite .td-lb-box-5 {
      bottom: 0;
      right: 0
    }

    .td-loader-infinite .td-lb-box-6 {
      bottom: 0;
      left: 11px
    }

    .td-loader-infinite .td-lb-box-7 {
      bottom: 0;
      left: 0
    }

    .td-loader-infinite .td-lb-box-8 {
      top: 11px;
      left: 0
    }

    .td-loader-infinite.td-loader-gif {
      width: 32px;
      height: 32px;
      margin-top: -16px;
      margin-left: -16px
    }

    .td-loader-blocks-load-more {
      top: auto;
      bottom: 48px
    }

    .td-loader-animation-start {
      opacity: 0;
      transform: perspective(600px) scale(.4);
      -webkit-transform: perspective(600px) scale(.4)
    }

    .td-loader-animation-mid {
      opacity: 1;
      transform: perspective(600px) scale(1);
      -webkit-transform: perspective(600px) scale(1)
    }

    .td-loader-animation-end {
      opacity: 0
    }

    body.td-animation-stack-type0 .post img:not(.woocommerce-product-gallery img):not(.rs-pzimg),
    body.td-animation-stack-type0 .td-animation-stack .entry-thumb,
    body.td-animation-stack-type0 .td-animation-stack .td-lazy-img {
      opacity: 0
    }

    .td-animation-stack-type0-2:not(.woocommerce-product-gallery img) {
      opacity: 1 !important;
      transition: opacity .3s;
      transition-timing-function: cubic-bezier(.39, .76, .51, .56)
    }

    body.td-animation-stack-type1 .post .entry-thumb,
    body.td-animation-stack-type1 .post a.td-sml-link-to-image>img,
    body.td-animation-stack-type1 .post img[class*=wp-image-],
    body.td-animation-stack-type1 .td-animation-stack .entry-thumb,
    body.td-animation-stack-type1 .td-animation-stack .td-lazy-img {
      opacity: 0;
      transform: scale(.95)
    }

    .td-animation-stack-type1-2 {
      opacity: 1 !important;
      transform: scale(1) !important;
      -webkit-transform: scale(1) !important;
      -webkit-transition: transform .5s, opacity .3s cubic-bezier(.39, .76, .51, .56);
      transition: transform .5s ease, opacity .3s cubic-bezier(.39, .76, .51, .56) 0s
    }

    body.td-animation-stack-type2 .post .entry-thumb,
    body.td-animation-stack-type2 .post a.td-sml-link-to-image>img,
    body.td-animation-stack-type2 .post img[class*=wp-image-],
    body.td-animation-stack-type2 .td-animation-stack .entry-thumb,
    body.td-animation-stack-type2 .td-animation-stack .td-lazy-img {
      opacity: 0;
      transform: translate(0, 10px);
      -webkit-transform: translate(0, 10px)
    }

    .td-animation-stack-type2-2 {
      opacity: 1 !important;
      transform: scale(1) !important;
      -webkit-transform: scale(1) !important;
      -webkit-transition: transform .4s cubic-bezier(.13, .43, .57, .88), opacity .4s cubic-bezier(.13, .43, .57, .88);
      transition: transform .4s cubic-bezier(.13, .43, .57, .88), opacity .4s cubic-bezier(.13, .43, .57, .88)
    }

    .ie10 .td-post-content p,
    .ie11 .td-post-content p,
    .ie8 .td-post-content p,
    .ie9 .td-post-content p {
      letter-spacing: -.2px
    }

    .ie10 .td-affix .td-main-menu-logo img,
    .ie11 .td-affix .td-main-menu-logo img,
    .ie8 .td-affix .td-main-menu-logo img,
    .ie9 .td-affix .td-main-menu-logo img {
      top: -2px
    }

    .ie8 .td-trending-now-post {
      -ms-filter: "alpha(opacity=0)"
    }

    .ie8 .td-trending-now-post:first-child {
      -ms-filter: "alpha(opacity=100)"
    }

    .ie8 .td-post-source-tags {
      display: none
    }

    .ie8 .td-stretch-height,
    .ie8 .td-stretch-width {
      left: 0 !important
    }

    .ie8 .td_social_type .td-sp {
      width: 0
    }

    .ie8 .td-social-facebook .td-social-but-text {
      border-left: 1px solid #7f9edf
    }

    .ie8 .td-social-twitter .td-social-but-text {
      border-left: 1px solid #8fe2fc
    }

    .ie8 .td-menu-background {
      left: -100%
    }

    .ie9 .td-stretch-height,
    .ie9 .td-stretch-width {
      left: 0 !important;
      -webkit-transform: none;
      ms-transform: none;
      transform: none
    }

    .ie9 #td-mobile-nav,
    .ie9 .td-menu-background {
      left: -100%
    }

    .ie9 .td-menu-mob-open-menu #td-mobile-nav,
    .ie9 .td-menu-mob-open-menu .td-menu-background {
      left: 0
    }

    .ie9 .td-search-background {
      right: 100%
    }

    .ie9 .td-search-opened .td-search-background {
      right: 0
    }

    .ie9 .td-scroll-up {
      bottom: -70px
    }

    .ie9 .td-scroll-up-visible {
      bottom: 5px
    }

    .td-md-is-android .sf-menu .sub-menu .td-icon-menu-down {
      margin-top: -8px
    }

    .td-md-is-android .td-trending-now-wrapper .td-trending-now-nav-left {
      padding-right: 1px
    }

    .td-md-is-android .block-title a,
    .td-md-is-android .block-title label,
    .td-md-is-android .block-title span {
      padding: 8px 12px 3px
    }

    .td-md-is-android input[type=submit] {
      padding: 9px 15px 8px
    }

    .td-md-is-android .td-scroll-up .td-icon-menu-up {
      padding-top: 1px
    }

    .td-md-is-ios body {
      -webkit-font-smoothing: antialiased
    }

    .td-md-is-ios .sf-menu .sub-menu .td-icon-menu-down {
      margin-top: -9px;
      line-height: 20px
    }

    .td-md-is-ios .td-trending-now-wrapper .td-trending-now-nav-left {
      padding-right: 1px
    }

    .td-md-is-ios input[type=submit] {
      padding: 7px 15px 8px
    }

    @media(min-width:1140px) {

      .ie10,
      .ie11,
      .ie8,
      .ie9 {
        margin-left: -1px
      }

      .ie10 .td-affix,
      .ie11 .td-affix,
      .ie8 .td-affix,
      .ie9 .td-affix {
        margin-left: 1px
      }

      .ie11 {
        margin-left: -1px
      }

      .ie11 .td-affix {
        margin-left: 1px
      }

      .td-md-is-safari {
        margin-left: -1px
      }

      .td-md-is-safari .td-affix {
        margin-left: 1px
      }
    }

    .td-md-is-chrome .td_block_inner_overflow .td_module_wrap {
      position: relative
    }

    .mfp-figure.td-caption-align-left figcaption .mfp-title {
      text-align: left
    }

    .mfp-figure.td-caption-align-center figcaption .mfp-title {
      text-align: center
    }

    .mfp-figure.td-caption-align-right figcaption .mfp-title {
      text-align: right
    }

    .tdb-s-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #0489fc;
      min-width: 100px;
      padding: 14px 24px 16px;
      font-size: 1em;
      line-height: 1;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      color: #fff;
      border: 0;
      border-radius: 5px;
      outline: transparent solid 3px;
      transition: background-color .2s ease-in-out, color .2s ease-in-out, border-color .2s ease-in-out, outline-color .2s ease-in-out;
      -webkit-appearance: none;
      cursor: pointer
    }

    .tdb-s-btn svg {
      position: relative;
      width: .9em;
      height: auto;
      margin-right: .5em
    }

    .tdb-s-btn:active,
    .tdb-s-btn:hover {
      background-color: #152bf7
    }

    .tdb-s-btn:active:not(:disabled) {
      outline-color: rgba(21, 43, 247, .2)
    }

    .tdb-s-btn:disabled {
      background-color: #9acffd;
      pointer-events: none
    }

    .tdb-s-btn.tdb-s-btn-saving:after {
      content: '';
      position: relative;
      width: 12px;
      height: 12px;
      margin-left: 15px;
      border: 1px solid #fff;
      border-left-color: transparent;
      border-right-color: transparent;
      border-radius: 50%;
      -webkit-animation: 1s ease-out infinite fullspin;
      animation: 1s ease-out infinite fullspin;
      z-index: 2;
      transition: border-top-color .2s ease-in-out, border-bottom-color .2s ease-in-out
    }

    .tdb-s-btn.tdb-s-btn-saved {
      background-color: #9acffd;
      pointer-events: none
    }

    .tdb-s-btn.tdb-s-btn-saved:after {
      content: url(data:image/svg+xml;utf8;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTIiIGhlaWdodD0iOC44NzUiIHZpZXdCb3g9IjAgMCAxMiA4Ljg3NSI+PHBhdGggZD0iTTcuMTI1LDEzLjg3NWExLDEsMCwwLDEtLjcwNy0uMjkzTDMuMjkzLDEwLjQ1N0ExLDEsMCwwLDEsNC43MDcsOS4wNDNsMi40MTgsMi40MTgsNi4xNjgtNi4xNjhhMSwxLDAsMCwxLDEuNDE0LDEuNDE0TDcuODMyLDEzLjU4MkExLDEsMCwwLDEsNy4xMjUsMTMuODc1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTUpIiBmaWxsPSIjZmZmIi8+PC9zdmc+);
      width: 14px;
      height: auto;
      border: 0;
      -webkit-animation: none;
      animation: none
    }

    .tdb-s-btn-sm {
      min-width: 76px;
      padding: 10px 19px 12px;
      font-size: .929em
    }

    .tdb-s-btn-sm svg {
      top: 1px
    }

    .tdb-s-btn-sm.tdb-s-btn-saving:after {
      width: 11px;
      height: 11px;
      margin-left: 13px
    }

    .tdb-s-btn-sm.tdb-s-btn-saving:not(.tdb-s-btn-saved):after {
      top: 1px
    }

    .tdb-s-btn-sm.tdb-s-btn-saved:after {
      content: url(data:image/svg+xml;utf8;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAiIGhlaWdodD0iNy41IiB2aWV3Qm94PSIwIDAgMTAgNy41Ij48cGF0aCBkPSJNNi41LDEyLjVhMSwxLDAsMCwxLS43MDctLjI5M2wtMi41LTIuNUExLDEsMCwwLDEsNC43MDcsOC4yOTNMNi41LDEwLjA4Nmw0Ljc5My00Ljc5M2ExLDEsMCwwLDEsMS40MTQsMS40MTRsLTUuNSw1LjVBMSwxLDAsMCwxLDYuNSwxMi41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTUpIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48L3N2Zz4=);
      top: -2px
    }

    .tdb-s-btn-sm.tdb-s-btn-hollow {
      min-width: 72px;
      padding: 8px 17px 10px
    }

    .tdb-s-btn-sm.tdb-s-btn-hollow.tdb-s-btn-saved:after {
      content: url(data:image/svg+xml;utf8;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAiIGhlaWdodD0iNy41IiB2aWV3Qm94PSIwIDAgMTAgNy41Ij48cGF0aCBkPSJNNi41LDEyLjVhMSwxLDAsMCwxLS43MDctLjI5M2wtMi41LTIuNUExLDEsMCwwLDEsNC43MDcsOC4yOTNMNi41LDEwLjA4Nmw0Ljc5My00Ljc5M2ExLDEsMCwwLDEsMS40MTQsMS40MTRsLTUuNSw1LjVBMSwxLDAsMCwxLDYuNSwxMi41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTUpIiBmaWxsPSIjQjNCM0IzIiBvcGFjaXR5PSIwLjgiLz48L3N2Zz4=)
    }

    .tdb-s-btn-red {
      background-color: #ff3838
    }

    .tdb-s-btn-red:active,
    .tdb-s-btn-red:hover {
      background-color: #e20000
    }

    .tdb-s-btn-red:active:not(:disabled) {
      outline-color: rgba(226, 0, 0, .15)
    }

    .tdb-s-btn-red:disabled {
      background-color: #ffa4a4
    }

    .tdb-s-btn-red.tdb-s-btn-saved {
      background-color: #ffa4a4
    }

    .tdb-s-btn-hollow {
      min-width: 96px;
      padding: 12px 22px 14px;
      background-color: transparent;
      color: #444;
      border: 2px solid #a8aab8
    }

    .tdb-s-btn-hollow:active,
    .tdb-s-btn-hollow:hover {
      background-color: transparent;
      color: #0489fc;
      border-color: #0489fc
    }

    .tdb-s-btn-hollow:active:not(:disabled) {
      outline-color: rgba(4, 137, 252, .2)
    }

    .tdb-s-btn-hollow:disabled {
      background-color: transparent;
      color: #b3b3b3;
      border-color: #d3d4db
    }

    .tdb-s-btn-hollow.tdb-s-btn-saving:after {
      border-top-color: #444;
      border-bottom-color: #444
    }

    .tdb-s-btn-hollow.tdb-s-btn-saving:hover:after {
      border-top-color: #0489fc;
      border-bottom-color: #0489fc
    }

    .tdb-s-btn-hollow.tdb-s-btn-saved {
      background-color: transparent;
      color: #b3b3b3
    }

    .tdb-s-btn-hollow.tdb-s-btn-saved:after {
      content: url(data:image/svg+xml;utf8;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTIiIGhlaWdodD0iOC44NzUiIHZpZXdCb3g9IjAgMCAxMiA4Ljg3NSI+PHBhdGggZD0iTTcuMTI1LDEzLjg3NWExLDEsMCwwLDEtLjcwNy0uMjkzTDMuMjkzLDEwLjQ1N0ExLDEsMCwwLDEsNC43MDcsOS4wNDNsMi40MTgsMi40MTgsNi4xNjgtNi4xNjhhMSwxLDAsMCwxLDEuNDE0LDEuNDE0TDcuODMyLDEzLjU4MkExLDEsMCwwLDEsNy4xMjUsMTMuODc1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTUpIiBmaWxsPSIjQjNCM0IzIi8+PC9zdmc+)
    }

    .tdb-s-btn-simple {
      padding: 0;
      background-color: transparent;
      min-width: 0;
      color: #0489fc;
      border-radius: 0;
      outline: 0
    }

    .tdb-s-btn-simple:active,
    .tdb-s-btn-simple:hover {
      color: #152bf7;
      background-color: transparent
    }

    .tdb-s-btn-simple:disabled {
      background-color: transparent;
      color: #9acffd
    }

    .tdb-s-btn-simple.tdb-s-btn-saving:after {
      margin-left: 10px;
      border: 1px solid #0489fc;
      border-left-color: transparent;
      border-right-color: transparent
    }

    .tdb-s-btn-simple.tdb-s-btn-saved {
      background-color: transparent;
      color: #9acffd
    }

    .tdb-s-btn-simple.tdb-s-btn-saved:after {
      content: url(data:image/svg+xml;utf8;base64,IDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTIiIGhlaWdodD0iOC44NzUiIHZpZXdCb3g9IjAgMCAxMiA4Ljg3NSI+PHBhdGggZD0iTTcuMTI1LDEzLjg3NWExLDEsMCwwLDEtLjcwNy0uMjkzTDMuMjkzLDEwLjQ1N0ExLDEsMCwwLDEsNC43MDcsOS4wNDNsMi40MTgsMi40MTgsNi4xNjgtNi4xNjhhMSwxLDAsMCwxLDEuNDE0LDEuNDE0TDcuODMyLDEzLjU4MkExLDEsMCwwLDEsNy4xMjUsMTMuODc1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTUpIiBmaWxsPSIjOUFDRkZEIi8+PC9zdmc+)
    }

    body div .tdb-s-fc-inner {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -13px
    }

    body div .tdb-s-fc-inner:not(:last-child) {
      margin-bottom: 28px
    }

    body div .tdb-s-fc-inner:not(:last-child):after {
      content: '';
      display: block;
      margin: 28px 13px 0;
      width: 100%;
      height: 1px;
      background-color: #efefef
    }

    body div .tdb-s-fc-inner .tdb-s-notif {
      width: 100%;
      margin-left: 13px;
      margin-right: 13px
    }

    body div .tdb-s-form-label {
      position: relative;
      display: block;
      margin-bottom: 8px;
      font-size: .929em;
      line-height: 1;
      font-weight: 600;
      color: #666
    }

    body div .tdb-s-form-input {
      margin: 0;
      padding: 0 15px 1px;
      width: 100%;
      height: 44px;
      min-height: 44px;
      font-size: 1em;
      line-height: 1.3;
      font-weight: 600;
      color: #444;
      border: 2px solid #d7d8de;
      border-radius: 5px;
      outline: transparent solid 3px;
      box-shadow: none;
      transition: border-color .2s ease-in-out, color .2s ease-in-out, outline-color .2s ease-in-out
    }

    body div .tdb-s-form-input:-webkit-autofill,
    body div .tdb-s-form-input:-webkit-autofill:active,
    body div .tdb-s-form-input:-webkit-autofill:focus,
    body div .tdb-s-form-input:-webkit-autofill:hover {
      -webkit-text-fill-color: #444;
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important
    }

    body div .tdb-s-form-input::placeholder {
      color: #888;
      transition: color .2s ease-in-out
    }

    body div .tdb-s-form-input::-webkit-input-placeholder {
      color: #888;
      transition: color .2s ease-in-out
    }

    body div .tdb-s-form-input::-moz-placeholder {
      color: #888;
      transition: color .2s ease-in-out
    }

    body div .tdb-s-form-input:-ms-input-placeholder {
      color: #888;
      transition: color .2s ease-in-out
    }

    body div .tdb-s-form-input:-moz-placeholder {
      color: #888;
      transition: color .2s ease-in-out
    }

    body div .tdb-s-form-input:hover {
      color: inherit
    }

    body div .tdb-s-form-input:focus {
      box-shadow: none
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:focus:not([readonly]) {
      border-color: #0489fc !important;
      outline-width: 3px;
      outline-style: solid;
      outline-color: rgba(4, 137, 252, .1)
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date) {
      background-color: #fff;
      color: #bebebe;
      border-color: #e8e9ec;
      outline: 0
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled::placeholder,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date)::placeholder {
      color: #bebebe
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled::-webkit-input-placeholder,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date)::-webkit-input-placeholder {
      color: #bebebe
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled::-moz-placeholder,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date)::-moz-placeholder {
      color: #bebebe
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled:-ms-input-placeholder,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date):-ms-input-placeholder {
      color: #bebebe
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input:disabled:-moz-placeholder,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-input[readonly]:not(.tdb-s-form-input-date):-moz-placeholder {
      color: #bebebe
    }

    body div textarea.tdb-s-form-input {
      display: block;
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      min-height: 76px;
      padding-top: 8px;
      padding-bottom: 8px;
      line-height: 1.5
    }

    body div .tdb-s-form-select-wrap {
      position: relative
    }

    body div .tdb-s-form-select-wrap .tdb-s-form-input {
      max-width: 100%;
      padding-right: 34px;
      background: #fff;
      -webkit-appearance: none;
      cursor: pointer
    }

    body div .tdb-s-form-select-wrap .tdb-s-form-input::-webkit-calendar-picker-indicator {
      opacity: 0
    }

    body div .tdb-s-form-select-wrap .tdb-s-form-input[multiple] {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 15px;
      height: 100px;
      min-height: 100px;
      overflow-y: auto
    }

    body div .tdb-s-form-select-wrap .tdb-s-form-input[multiple]+.tdb-s-form-select-icon {
      display: none
    }

    body div .tdb-s-form-select-wrap .tdb-s-form-select-icon {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      pointer-events: none;
      fill: #444;
      transition: fill .2s ease-in-out
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-select-wrap .tdb-s-form-input:disabled+.tdb-s-form-select-icon,
    body div .tdb-s-form-group:not(.tdb-s-fg-error) .tdb-s-form-select-wrap .tdb-s-form-input[readonly]+.tdb-s-form-select-icon {
      fill: #bebebe
    }

    body div .tdb-s-form-select-wrap .select2-hidden-accessible {
      display: none
    }

    body div .tdb-s-form-select-wrap .select2-selection {
      display: flex;
      align-items: center;
      padding: 0 15px 1px;
      width: 100%;
      height: 44px;
      font-size: 1em;
      line-height: 1.3;
      font-weight: 600;
      color: #444;
      border: 2px solid #d7d8de;
      border-radius: 5px;
      outline: transparent solid 3px;
      cursor: pointer;
      transition: border-color .2s ease-in-out, color .2s ease-in-out, outline-color .2s ease-in-out
    }

    body div .tdb-s-form-group:not(.tdb-s-fg-error) .select2-container--open .select2-selection {
      border-color: #0489fc !important;
      outline-width: 3px;
      outline-style: solid;
      outline-color: rgba(4, 137, 252, .1)
    }

    body div .tdb-s-fg-error .tdb-s-form-select-wrap .select2-selection {
      border-color: red !important;
      outline: rgba(255, 0, 0, .1) solid 3px
    }

    body div .tdb-s-form-check input {
      display: none
    }

    body div .tdb-s-form-check label {
      display: flex;
      align-items: flex-start;
      position: relative;
      top: 1px;
      cursor: pointer
    }

    body div .tdb-s-form-check .tdb-s-fc-check {
      position: relative;
      margin-right: 10px;
      width: 19px;
      height: 19px;
      background-color: #fff;
      border: 2px solid #d7d8de;
      outline: transparent solid 3px;
      transition: border-color .2s ease-in-out, outline-color .2s ease-in-out;
      cursor: pointer
    }

    body div .tdb-s-form-check .tdb-s-fc-check:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 9px;
      height: 9px;
      background-color: #0489fc;
      opacity: 0;
      transition: opacity .2s ease-in-out
    }

    body div .tdb-s-form-check .tdb-s-fc-title {
      flex: 1;
      font-size: 1em;
      line-height: 1.3;
      font-weight: 600;
      word-break: break-all;
      color: #444;
      cursor: pointer
    }

    body div .tdb-s-form-check input[type=checkbox]+.tdb-s-fc-check {
      border-radius: 5px
    }

    body div .tdb-s-form-check input[type=checkbox]+.tdb-s-fc-check:after {
      border-radius: 3px
    }

    body div .tdb-s-form-check input[type=radio]+.tdb-s-fc-check,
    body div .tdb-s-form-check input[type=radio]+.tdb-s-fc-check:after {
      border-radius: 100%
    }

    body div .tdb-s-form-check input:checked+.tdb-s-fc-check {
      border-color: #0489fc;
      outline-color: rgba(4, 137, 252, .1)
    }

    body div .tdb-s-form-check input:checked+.tdb-s-fc-check:after {
      opacity: 1
    }

    body div .tdb-s-form-check input[disabled]+.tdb-s-fc-check,
    body div .tdb-s-form-check input[disabled]+.tdb-s-fc-check+.tdb-s-fc-title {
      pointer-events: none
    }

    body div .tdb-s-form-check input[disabled]+.tdb-s-fc-check {
      border-color: #e8e9ec
    }

    body div .tdb-s-form-check input[disabled]+.tdb-s-fc-check+.tdb-s-fc-title {
      color: #bebebe
    }

    body div .tdb-s-form-check input[disabled]:checked+.tdb-s-fc-check {
      outline-color: rgba(4, 137, 252, .08)
    }

    body div .tdb-s-form-check input[disabled]:checked+.tdb-s-fc-check:after {
      background-color: #9acffd
    }

    body div .tdb-s-form-checkboxes-wrap {
      display: flex;
      flex-wrap: wrap;
      margin-left: -13px;
      margin-right: -13px
    }

    body div .tdb-s-form-checkboxes-wrap .tdb-s-form-check {
      margin-bottom: 7px;
      padding-left: 13px;
      padding-right: 13px
    }

    body div .tdb-s-form-checkboxes-wrap .tdb-s-form-check:last-child {
      margin-bottom: 0
    }

    body div .tdb-s-form-file {
      display: block;
      position: relative
    }

    body div .tdb-s-btn.tdb-s-ffp-remove {
      min-width: auto;
      padding: 8px 10px 12px
    }

    body div .tdb-s-btn.tdb-s-ffp-remove:active:not(:disabled) {
      outline-color: transparent
    }

    body div .tdb-s-btn.tdb-s-ffp-remove svg {
      margin-right: 0;
      width: 14px
    }

    body div .tdb-s-form-file-box .tdb-s-btn.tdb-s-ffp-remove,
    body div .tdb-s-form-file-preview-image .tdb-s-btn.tdb-s-ffp-remove,
    body div .tdb-s-form-file-preview-video .tdb-s-btn.tdb-s-ffp-remove {
      position: absolute;
      right: 15px
    }

    body div .tdb-s-form-file-box .tdb-s-btn.tdb-s-ffp-remove,
    body div .tdb-s-form-file-preview-image .tdb-s-btn.tdb-s-ffp-remove {
      bottom: 15px
    }

    body div .tdb-s-form-file-preview-video .tdb-s-btn.tdb-s-ffp-remove {
      top: 15px
    }

    body div .tdb-s-form-file-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 35px 15px;
      font-size: 1em;
      line-height: 1.3;
      font-weight: 600;
      color: #444;
      border: 2px solid #d7d8de;
      border-radius: 5px;
      outline: transparent solid 3px;
      transition: border-color .2s ease-in-out, color .2s ease-in-out, outline-color .2s ease-in-out
    }

    body div .tdb-s-ffu-ico {
      width: 40px;
      margin-bottom: 10px;
      stroke: #bfbfbf;
      transition: stroke .2s ease-in-out
    }

    body div .tdb-s-ffu-txt {
      text-align: center
    }

    body div .tdb-s-form-file-preview-image {
      position: relative
    }

    body div .tdb-s-form-file-preview-image .tdb-s-ffip-img {
      padding-bottom: 30%;
      background-color: #eee;
      border-radius: 5px;
      background-size: cover;
      background-position: center
    }

    body div .tdb-s-form-file-preview-audio {
      display: flex;
      align-items: center;
      min-height: 54px
    }

    body div .tdb-s-form-file-preview-audio audio {
      flex: 1;
      margin-right: 26px
    }

    body div .tdb-s-form-file-preview-video {
      min-height: 54px
    }

    body div .tdb-s-form-file-preview-video video {
      width: 100%;
      border-radius: 5px
    }

    body div .tdb-s-form-file-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer
    }

    body div .tdb-s-form-group {
      position: relative;
      width: 100%;
      padding: 0 13px
    }

    body div .tdb-s-form-group:not(:last-child) {
      margin-bottom: 28px
    }

    body div .tdb-s-form-group-sm .tdb-s-form-label {
      font-size: .857em;
      margin-bottom: 6px
    }

    body div .tdb-s-form-group-sm .tdb-s-form-input {
      padding: 0 10px 2px;
      height: 36px;
      min-height: 36px;
      font-size: .929em
    }

    body div .tdb-s-form-group-sm textarea.tdb-s-form-input {
      min-height: 76px;
      padding-top: 6px;
      padding-bottom: 6px;
      line-height: 1.5
    }

    body div .tdb-s-form-group-sm .tdb-s-form-select-wrap .select2-selection {
      height: 36px;
      font-size: .929em
    }

    body div .tdb-s-form-group-sm .tdb-s-form-check .tdb-s-fc-check {
      width: 17px;
      height: 17px
    }

    body div .tdb-s-form-group-sm .tdb-s-form-check .tdb-s-fc-check:after {
      top: 2px;
      left: 2px
    }

    body div .tdb-s-form-group-sm .tdb-s-form-check .tdb-s-fc-title {
      font-size: 13px;
      line-height: 1.2
    }

    body div .tdb-s-fg-error .tdb-s-form-input,
    body div .tdb-s-fg-error .tdb-s-form-input:focus:not([readonly]) {
      border-color: red !important;
      outline: rgba(255, 0, 0, .1) solid 3px
    }

    body div .tdb-s-fg-error-msg {
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      width: 100%;
      padding: 0 13px;
      font-size: .786em;
      line-height: 1.3;
      color: #ff3838
    }

    body div .tdb-s-form-content .tdb-s-notif {
      margin-top: 32px
    }

    body div .tdb-s-form-footer {
      display: flex;
      align-items: center;
      margin-top: 40px
    }

    body div .tdb-s-form-footer .tdb-s-btn {
      margin-right: 26px
    }

    body div .tdb-s-form-footer .tdb-s-btn:last-of-type {
      margin-right: 0
    }

    body .tdb-s-select2 .select2-results,
    body .tdb-s-select2 .select2-search,
    body .tdb-s-select2.select2-dropdown,
    body>.select2-container {
      display: block
    }

    body>.select2-container {
      z-index: 10005
    }

    body.admin-bar .tdb-s-select2.select2-dropdown {
      margin-top: 36px
    }

    body .tdb-s-select2.select2-dropdown {
      margin-top: 4px;
      background-color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'helvetica neue', sans-serif;
      font-size: 14px;
      border: 2px solid #d7d8de;
      border-radius: 5px;
      outline-width: 3px;
      outline-style: solid;
      outline-color: rgba(215, 216, 222, .18)
    }

    body .tdb-s-select2 .select2-search {
      padding: 6px
    }

    body .tdb-s-select2 .select2-search__field {
      padding: 0 10px 2px;
      width: 100%;
      height: 36px;
      min-height: 36px;
      font-size: .929em;
      line-height: 1.3;
      font-weight: 600;
      color: #444;
      border: 2px solid #d7d8de;
      border-radius: 5px;
      outline: transparent solid 3px;
      box-shadow: none;
      transition: border-color .2s ease-in-out, color .2s ease-in-out, outline-color .2s ease-in-out;
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box;
      box-sizing: border-box
    }

    body .tdb-s-select2 .select2-results__options {
      list-style-type: none;
      margin: 0;
      padding: 0 0 4px;
      max-height: 277px;
      font-size: .929em;
      font-weight: 600;
      color: #444;
      overflow-y: auto
    }

    body .tdb-s-select2 .select2-results__options li {
      margin: 0;
      padding: 2px 10px 4px;
      cursor: pointer
    }

    body .tdb-s-select2 .select2-results__options li:hover {
      background-color: #f8f8f8
    }

    .tdb-s-notif {
      position: relative;
      padding: 25px;
      border-radius: 3px
    }

    .tdb-s-notif,
    .tdb-s-notif :not(.tdb-s-btn) {
      font-size: 1em;
      line-height: 1.4
    }

    .tdb-s-notif b {
      font-weight: 600
    }

    .tdb-s-notif-descr:not(:last-child) {
      margin-bottom: 6px
    }

    .tdb-s-notif-list {
      list-style-type: none;
      margin: 0
    }

    .tdb-s-notif-list:not(:last-child) {
      margin: 0 0 10px
    }

    .tdb-s-notif-list li {
      margin-left: 0 !important
    }

    .tdb-s-notif-list li:not(:last-child) {
      margin-bottom: 6px
    }

    .tdb-s-notif-list li:last-child {
      margin-bottom: 0
    }

    .tdb-s-notif-success {
      background-color: rgba(38, 98, 28, .1);
      color: #26621c
    }

    .tdb-s-notif-error {
      background-color: rgba(255, 56, 56, .12);
      color: #ff3838
    }

    .tdb-s-notif-xsm {
      padding: 10px 15px
    }

    .tdb-s-notif-xsm,
    .tdb-s-notif-xsm :not(.tdb-s-btn) {
      font-size: .929em;
      line-height: 1.4
    }

    .tdb-s-notif-sm {
      padding: 18px
    }

    .tdb-s-notif-sm,
    .tdb-s-notif-sm :not(.tdb-s-btn) {
      font-size: .929em;
      line-height: 1.4
    }

    .tdb-s-table-header {
      font-size: .857em;
      line-height: 1;
      font-weight: 600;
      text-align: left;
      color: #555d66;
      border-bottom: 2px solid #d7d8de
    }

    @media(max-width:1018px) {
      .tdb-s-table-header {
        display: none
      }
    }

    .tdb-s-modal-bg {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity .2s ease-in
    }

    .tdb-s-modal-bg {
      position: absolute;
      background-color: rgba(107, 114, 128, .75)
    }

    .tdb-s-modal {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      min-width: 400px;
      max-width: 650px;
      max-height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'helvetica neue', sans-serif;
      font-size: 14px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12);
      border-radius: 3px;
      opacity: 0;
      transform: scale(.95);
      transition: opacity .2s ease-in, transform .2s ease-in;
      z-index: 1
    }

    @media(max-width:767px) {
      .tdb-s-modal {
        min-width: 0
      }
    }

    .tdb-s-modal-footer,
    .tdb-s-modal-header {
      display: flex;
      align-items: center
    }

    .tdb-s-modal-header {
      padding: 19px 25px 16px;
      border-bottom: 1px solid #ebebeb
    }

    .tdb-s-modal-header .tdb-s-modal-close {
      margin-left: auto;
      fill: #878d93;
      cursor: pointer;
      transition: transform .2s ease-in-out, fill .2s ease-in-out
    }

    .tdb-s-modal-header .tdb-s-modal-close:hover {
      fill: #000;
      transform: rotate(90deg)
    }

    body h3.tdb-s-modal-title {
      margin: 0;
      padding: 0;
      font-family: inherit;
      font-size: 1.286em;
      line-height: 1.2;
      font-weight: 600;
      color: #1d2327
    }

    .tdb-s-modal-body {
      padding: 30px 25px;
      overflow: auto
    }

    .tdb-s-modal-body .tdb-s-notif:not(:first-child) {
      margin-top: 30px
    }

    .tdb-s-modal-txt {
      font-size: 1em;
      line-height: 1.6;
      color: #59626b
    }

    .tdb-s-modal-footer {
      justify-content: flex-end;
      padding: 18px 25px;
      border-top: 1px solid #ebebeb
    }

    .tdb-s-modal-footer:empty {
      display: none
    }

    .tdb-s-modal-footer .tdb-s-btn:not(:last-of-type) {
      margin-right: 16px
    }

    .tdb-s-modal-open {
      pointer-events: auto
    }

    .tdb-s-modal-open,
    .tdb-s-modal-open .tdb-s-modal-bg {
      opacity: 1;
      transition: opacity .2s ease-out
    }

    .tdb-s-modal-open .tdb-s-modal {
      opacity: 1;
      transform: scale(1);
      transition: opacity .2s ease-out, transform .2s ease-out
    }

    .tdb-s-pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.2em;
      min-height: 2.2em;
      margin: 0;
      padding: 0 8px;
      font-size: 1em;
      line-height: 1;
      font-weight: 600;
      border-radius: 3px;
      transition: background-color .2s ease-in-out, color .2s ease-in-out
    }

    .tdb-s-pagination-item:not(:last-child) {
      margin-right: 8px
    }

    .tdb-s-pagination-item:not(.tdb-s-pagination-dots):not(.tdb-s-pagination-active) {
      cursor: pointer
    }

    .tdb-s-pagination-item:hover:not(.tdb-s-pagination-dots):not(.tdb-s-pagination-active) {
      background-color: #ebebeb
    }

    .tdb-s-pagination-item:not(.tdb-s-pagination-active) {
      background-color: #f1f1f1;
      color: #1d2327
    }

    @-webkit-keyframes tdb-fullspin-anim {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
      }
    }

    @keyframes tdb-fullspin-anim {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
      }
    }

    .tdb-s-content {
      position: relative;
      min-height: 50px;
      transition: opacity .2s ease-in-out
    }

    .tdb-s-content:before {
      content: '';
      position: absolute;
      opacity: 0;
      transition: opacity .2s ease-in-out;
      pointer-events: none
    }

    .tdb-s-content:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      margin-top: -23px;
      margin-left: -23px;
      width: 40px;
      height: 40px;
      border: 3px solid #888;
      border-left-color: transparent;
      border-right-color: transparent;
      border-radius: 50%;
      -webkit-animation: 1s ease-out infinite tdb-fullspin-anim;
      animation: 1s ease-out infinite tdb-fullspin-anim;
      opacity: 0;
      z-index: 101;
      pointer-events: none
    }

    .tdb-s-content-disabled,
    .tdb-s-content-loading {
      pointer-events: none;
      opacity: .3
    }

    .tdb-s-content-loading:after {
      opacity: 1;
      pointer-events: auto
    }

    .tdb-s-modal-confirm .tdb-s-modal {
      min-width: 500px;
      max-width: 500px
    }

    .wprm-comment-ratings-container svg .wprm-star-full {
      fill: #343434
    }

    .wprm-comment-ratings-container svg .wprm-star-empty {
      stroke: #343434
    }

    :root {
      --blck-custom-color-1: #052c54;
      --blck-custom-color-2: #f83aff;
      --blck-custom-color-3: #7c89a0;
      --blck-custom-color-4: #5325ea
    }

    body,
    p {
      font-family: "Work Sans";
      font-size: 18px
    }

    .tdi_2 {
      min-height: 0
    }

    .tdi_2>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000)
    }

    .td-header-mobile-wrap {
      position: relative;
      width: 100%
    }

    .tdi_4 {
      min-height: 0
    }

    #tdi_3.tdc-row[class*=stretch_row]>.td-pb-row>.td-element-style {
      width: 100% !important
    }

    .tdi_4 {
      display: block
    }

    .tdi_6 {
      vertical-align: baseline
    }

    .tdi_6>.wpb_wrapper,
    .tdi_6>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_6>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_6>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_6>.wpb_wrapper {
      width: auto;
      height: auto
    }

    @media (max-width:767px) {
      @media (min-width:768px) {
        .tdi_4 {
          margin-left: 0;
          margin-right: 0
        }

        .tdi_4 .vc_column {
          padding-left: 0;
          padding-right: 0
        }
      }

      .tdi_6 {
        vertical-align: middle
      }

      .tdi_6 {
        width: 20% !important;
        display: inline-block !important
      }

      .tdi_7 {
        margin-left: -12px !important
      }
    }

    .tdb-header-align {
      vertical-align: middle
    }

    .tdb_mobile_menu {
      margin-bottom: 0;
      clear: none
    }

    .tdb_mobile_menu a {
      display: inline-block !important;
      position: relative;
      text-align: center;
      color: #4db2ec
    }

    .tdb_mobile_menu a>span {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .tdb_mobile_menu svg {
      height: auto
    }

    .tdb_mobile_menu svg,
    .tdb_mobile_menu svg * {
      fill: #4db2ec
    }

    #tdc-live-iframe .tdb_mobile_menu a {
      pointer-events: none
    }

    .td-menu-mob-open-menu {
      overflow: hidden
    }

    .td-menu-mob-open-menu #td-outer-wrap {
      position: static
    }

    .tdi_7 {
      display: inline-block
    }

    .tdi_7 .tdb-mobile-menu-button i {
      font-size: 22px;
      width: 55px;
      height: 55px;
      line-height: 55px
    }

    .tdi_7 .tdb-mobile-menu-button svg {
      width: 22px
    }

    .tdi_7 .tdb-mobile-menu-button {
      color: #fff
    }

    .tdi_7 .tdb-mobile-menu-button svg,
    .tdi_7 .tdb-mobile-menu-button svg * {
      fill: #ffffff
    }

    .tdi_9 {
      vertical-align: baseline
    }

    .tdi_9>.wpb_wrapper,
    .tdi_9>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_9>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_9>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_9>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdb_header_logo {
      margin-bottom: 0;
      clear: none
    }

    .tdb_header_logo .tdb-logo-a,
    .tdb_header_logo h1 {
      display: flex;
      pointer-events: auto;
      align-items: flex-start
    }

    .tdb_header_logo h1 {
      margin: 0;
      line-height: 0
    }

    .tdb_header_logo .tdb-logo-text-wrap {
      display: flex
    }

    .tdb_header_logo .tdb-logo-text-tagline,
    .tdb_header_logo .tdb-logo-text-title {
      -webkit-transition: .2s;
      transition: all .2s ease
    }

    .tdb_header_logo .tdb-logo-text-title {
      background-size: cover;
      background-position: center center;
      font-size: 75px;
      font-family: serif;
      line-height: 1.1;
      color: #222;
      white-space: nowrap
    }

    .tdb_header_logo .tdb-logo-text-tagline {
      margin-top: 2px;
      font-size: 12px;
      font-family: serif;
      letter-spacing: 1.8px;
      line-height: 1;
      color: #767676
    }

    .tdi_10 .tdb-logo-a,
    .tdi_10 h1 {
      flex-direction: row;
      align-items: center;
      justify-content: center
    }

    .tdi_10 .tdb-logo-text-tagline {
      margin-top: 2px;
      margin-left: 0;
      display: block
    }

    .tdi_10 .tdb-logo-text-title {
      display: block;
      color: #fff
    }

    .tdi_10 .tdb-logo-text-wrap {
      flex-direction: column;
      align-items: flex-start
    }

    @media (max-width:767px) {
      .tdi_7 .tdb-mobile-menu-button i {
        font-size: 26px;
        width: 49.4px;
        height: 49.4px;
        line-height: 49.4px
      }

      .tdi_7 .tdb-mobile-menu-button svg {
        width: 26px
      }

      .tdi_9 {
        vertical-align: middle
      }

      .tdi_9 {
        width: 60% !important;
        display: inline-block !important
      }

      .tdb_header_logo .tdb-logo-text-title {
        font-size: 36px
      }

      .tdb_header_logo .tdb-logo-text-tagline {
        font-size: 11px
      }

      .tdi_10 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 28px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important
      }
    }

    .tdi_12 {
      vertical-align: baseline
    }

    .tdi_12>.wpb_wrapper,
    .tdi_12>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_12>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_12>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_12>.wpb_wrapper {
      width: auto;
      height: auto
    }

    @media (max-width:767px) {
      .tdi_12 {
        vertical-align: middle
      }

      .tdi_12 {
        width: 20% !important;
        display: inline-block !important
      }

      .tdi_13 {
        margin-right: -14px !important;
        margin-bottom: 0 !important
      }
    }

    .tdb_mobile_search {
      margin-bottom: 0;
      clear: none
    }

    .tdb_mobile_search a {
      display: inline-block !important;
      position: relative;
      text-align: center;
      color: #4db2ec
    }

    .tdb_mobile_search a>span {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .tdb_mobile_search svg {
      height: auto
    }

    .tdb_mobile_search svg,
    .tdb_mobile_search svg * {
      fill: #4db2ec
    }

    #tdc-live-iframe .tdb_mobile_search a {
      pointer-events: none
    }

    .td-search-opened {
      overflow: hidden
    }

    .td-search-opened #td-outer-wrap {
      position: static
    }

    .td-search-opened .td-search-wrap-mob {
      position: fixed
    }

    .tdi_13 {
      display: inline-block;
      float: right;
      clear: none
    }

    .tdi_13 .tdb-header-search-button-mob i {
      font-size: 22px;
      width: 55px;
      height: 55px;
      line-height: 55px
    }

    .tdi_13 .tdb-header-search-button-mob svg {
      width: 22px
    }

    .tdi_13 .tdb-header-search-button-mob .tdb-mobile-search-icon-svg {
      width: 55px;
      height: 55px;
      display: flex;
      justify-content: center
    }

    .tdi_13 .tdb-header-search-button-mob {
      color: #fff
    }

    .tdi_13 .tdb-header-search-button-mob svg,
    .tdi_13 .tdb-header-search-button-mob svg * {
      fill: #ffffff
    }

    @media (max-width:767px) {
      .tdi_13 .tdb-header-search-button-mob i {
        font-size: 23px;
        width: 50.6px;
        height: 50.6px;
        line-height: 50.6px
      }

      .tdi_13 .tdb-header-search-button-mob svg {
        width: 23px
      }

      .tdi_13 .tdb-header-search-button-mob .tdb-mobile-search-icon-svg {
        width: 50.6px;
        height: 50.6px;
        display: flex;
        justify-content: center
      }

      @media (min-width:768px) {
        .tdi_17 {
          margin-left: 0;
          margin-right: 0
        }

        .tdi_17 .vc_column {
          padding-left: 0;
          padding-right: 0
        }
      }
    }

    .tdi_15 {
      min-height: 0
    }

    .tdi_15>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000)
    }

    .td-header-mobile-sticky-wrap.td-header-active {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0)
    }

    .td-header-mobile-sticky-wrap {
      transform: translateY(-120%);
      -webkit-transform: translateY(-120%);
      -moz-transform: translateY(-120%);
      -ms-transform: translateY(-120%);
      -o-transform: translateY(-120%);
      -webkit-transition: .5s ease-in-out;
      -moz-transition: .5s ease-in-out;
      -o-transition: .5s ease-in-out;
      transition: all .5s ease-in-out
    }

    .tdi_17 {
      min-height: 0
    }

    #tdi_16.tdc-row[class*=stretch_row]>.td-pb-row>.td-element-style {
      width: 100% !important
    }

    .tdi_17 {
      display: block
    }

    .tdi_19 {
      vertical-align: baseline
    }

    .tdi_19>.wpb_wrapper,
    .tdi_19>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_19>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_19>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_19>.wpb_wrapper {
      width: auto;
      height: auto
    }

    @media (max-width:767px) {
      .tdi_19 {
        vertical-align: middle
      }

      .tdi_19 {
        width: 20% !important;
        display: inline-block !important
      }

      .tdi_20 {
        margin-left: -12px !important
      }
    }

    .tdi_20 {
      display: inline-block
    }

    .tdi_20 .tdb-mobile-menu-button i {
      font-size: 22px;
      width: 55px;
      height: 55px;
      line-height: 55px
    }

    .tdi_20 .tdb-mobile-menu-button svg {
      width: 22px
    }

    .tdi_20 .tdb-mobile-menu-button {
      color: #fff
    }

    .tdi_20 .tdb-mobile-menu-button svg,
    .tdi_20 .tdb-mobile-menu-button svg * {
      fill: #ffffff
    }

    .tdi_22 {
      vertical-align: baseline
    }

    .tdi_22>.wpb_wrapper,
    .tdi_22>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_22>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_22>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_22>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_23 .tdb-logo-a,
    .tdi_23 h1 {
      flex-direction: row;
      align-items: center;
      justify-content: center
    }

    .tdi_23 .tdb-logo-text-tagline {
      margin-top: 2px;
      margin-left: 0;
      display: block
    }

    .tdi_23 .tdb-logo-text-title {
      display: block;
      color: #fff
    }

    .tdi_23 .tdb-logo-text-wrap {
      flex-direction: column;
      align-items: flex-start
    }

    @media (max-width:767px) {
      .tdi_20 .tdb-mobile-menu-button i {
        font-size: 26px;
        width: 49.4px;
        height: 49.4px;
        line-height: 49.4px
      }

      .tdi_20 .tdb-mobile-menu-button svg {
        width: 26px
      }

      .tdi_22 {
        vertical-align: middle
      }

      .tdi_22 {
        width: 60% !important;
        display: inline-block !important
      }

      .tdi_23 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 28px !important;
        font-weight: 800 !important;
        letter-spacing: 1px !important
      }
    }

    .tdi_25 {
      vertical-align: baseline
    }

    .tdi_25>.wpb_wrapper,
    .tdi_25>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_25>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_25>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_25>.wpb_wrapper {
      width: auto;
      height: auto
    }

    @media (max-width:767px) {
      .tdi_25 {
        vertical-align: middle
      }

      .tdi_25 {
        width: 20% !important;
        display: inline-block !important
      }

      .tdi_26 {
        margin-right: -14px !important;
        margin-bottom: 0 !important
      }
    }

    .tdi_26 {
      display: inline-block;
      float: right;
      clear: none
    }

    .tdi_26 .tdb-header-search-button-mob i {
      font-size: 22px;
      width: 55px;
      height: 55px;
      line-height: 55px
    }

    .tdi_26 .tdb-header-search-button-mob svg {
      width: 22px
    }

    .tdi_26 .tdb-header-search-button-mob .tdb-mobile-search-icon-svg {
      width: 55px;
      height: 55px;
      display: flex;
      justify-content: center
    }

    .tdi_26 .tdb-header-search-button-mob {
      color: #fff
    }

    .tdi_26 .tdb-header-search-button-mob svg,
    .tdi_26 .tdb-header-search-button-mob svg * {
      fill: #ffffff
    }

    @media (max-width:767px) {
      .tdi_26 .tdb-header-search-button-mob i {
        font-size: 23px;
        width: 50.6px;
        height: 50.6px;
        line-height: 50.6px
      }

      .tdi_26 .tdb-header-search-button-mob svg {
        width: 23px
      }

      .tdi_26 .tdb-header-search-button-mob .tdb-mobile-search-icon-svg {
        width: 50.6px;
        height: 50.6px;
        display: flex;
        justify-content: center
      }
    }

    .tdi_28 {
      min-height: 0
    }

    .tdi_28>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000)
    }

    .td-header-desktop-wrap {
      position: relative
    }

    .tdi_28 {
      z-index: 999 !important
    }

    .tdi_30 {
      min-height: 0
    }

    .tdi_30:before {
      display: block;
      width: 100vw;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 25px 0 rgba(94, 106, 135, .2);
      z-index: 20;
      pointer-events: none;
      top: 0
    }

    .tdi_30 {
      display: block
    }

    @media (min-width:768px) {
      .tdi_30 {
        margin-left: -5px;
        margin-right: -5px
      }

      .tdi_30 .vc_column {
        padding-left: 5px;
        padding-right: 5px
      }
    }

    @media (min-width:767px) {
      .tdi_30.tdc-row-content-vert-center {
        display: flex;
        align-items: center;
        flex: 1
      }

      .tdi_30.tdc-row-content-vert-center .td_block_wrap {
        vertical-align: middle
      }
    }

    .tdi_30 {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      position: relative
    }

    .tdi_30 .td_block_wrap {
      text-align: left
    }

    .tdi_29_rand_style {
      background-color: #fff !important
    }

    .tdi_32 {
      vertical-align: baseline
    }

    .tdi_32>.wpb_wrapper,
    .tdi_32>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_32>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_32>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_32>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_32 {
      width: 14% !important
    }

    .tdi_33 {
      display: inline-block
    }

    .tdi_33 .tdb-logo-a,
    .tdi_33 h1 {
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start
    }

    .tdi_33 .tdb-logo-text-tagline {
      margin-top: 2px;
      margin-left: 0
    }

    .tdi_33 .tdb-logo-text-title {
      display: block;
      font-family: 'Work Sans' !important;
      font-size: 30px !important;
      font-weight: 900 !important;
      letter-spacing: 1px !important
    }

    .tdi_33 .tdb-logo-text-wrap {
      flex-direction: column;
      align-items: flex-start
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_33 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 26px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important
      }

      .tdi_36 {
        display: inline-block !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_30 {
        padding-top: 8px !important;
        padding-bottom: 8px !important
      }

      .tdi_32 {
        width: 16% !important
      }

      .tdi_33 {
        padding-left: 5px !important
      }

      .tdi_33 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 20px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important
      }
    }

    @media (max-width:767px) {
      .tdi_33 .tdb-logo-text-tagline {
        display: none
      }
    }

    .tdi_35 {
      vertical-align: baseline
    }

    .tdi_35>.wpb_wrapper,
    .tdi_35>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_35>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_35>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_35>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_35 {
      width: 80% !important
    }

    @media(min-width:1141px) {
      .tdi_36 {
        display: inline-block !important
      }
    }

    .tdb_header_menu {
      margin-bottom: 0;
      z-index: 999;
      clear: none
    }

    .tdb_header_menu .tdb-main-sub-icon-fake,
    .tdb_header_menu .tdb-sub-icon-fake {
      display: none
    }

    .rtl .tdb_header_menu .tdb-menu {
      display: flex
    }

    .tdb_header_menu .tdb-menu {
      display: inline-block;
      vertical-align: middle;
      margin: 0
    }

    .tdb_header_menu .tdb-menu .tdb-mega-menu-inactive,
    .tdb_header_menu .tdb-menu .tdb-menu-item-inactive {
      pointer-events: none
    }

    .tdb_header_menu .tdb-menu .tdb-mega-menu-inactive>ul,
    .tdb_header_menu .tdb-menu .tdb-menu-item-inactive>ul {
      visibility: hidden;
      opacity: 0
    }

    .tdb_header_menu .tdb-menu .sub-menu {
      font-size: 14px;
      position: absolute;
      top: -999em;
      background-color: #fff;
      z-index: 99
    }

    .tdb_header_menu .tdb-menu .sub-menu>li {
      list-style-type: none;
      margin: 0;
      font-family: 'Open Sans', 'Open Sans Regular', sans-serif
    }

    .tdb_header_menu .tdb-menu>li {
      float: left;
      list-style-type: none;
      margin: 0
    }

    .tdb_header_menu .tdb-menu>li>a {
      position: relative;
      display: inline-block;
      padding: 0 14px;
      font-weight: 700;
      font-size: 14px;
      line-height: 48px;
      vertical-align: middle;
      text-transform: uppercase;
      -webkit-backface-visibility: hidden;
      color: #000;
      font-family: 'Open Sans', 'Open Sans Regular', sans-serif
    }

    .tdb_header_menu .tdb-menu>li>a:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 3px;
      background-color: #4db2ec;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      -webkit-transition: width .2s;
      transition: width .2s ease
    }

    .tdb_header_menu .tdb-menu>li>a>.tdb-menu-item-text {
      display: inline-block
    }

    .tdb_header_menu .tdb-menu>li>a .tdb-menu-item-text,
    .tdb_header_menu .tdb-menu>li>a span {
      vertical-align: middle;
      float: left
    }

    .tdb_header_menu .tdb-menu>li>a .tdb-sub-menu-icon {
      margin: 0 0 0 7px
    }

    .tdb_header_menu .tdb-menu>li.current-menu-item>a:after,
    .tdb_header_menu .tdb-menu>li.tdb-hover>a:after,
    .tdb_header_menu .tdb-menu>li:hover>a:after {
      width: 100%
    }

    .tdb_header_menu .tdb-menu>li.tdb-hover>ul,
    .tdb_header_menu .tdb-menu>li:hover>ul {
      top: auto;
      display: block !important
    }

    .tdb_header_menu .tdb-menu-item-text {
      word-wrap: break-word
    }

    .tdb_header_menu .tdb-menu-item-text,
    .tdb_header_menu .tdb-sub-menu-icon {
      vertical-align: middle
    }

    .tdb_header_menu .tdb-sub-menu-icon {
      position: relative;
      top: 0;
      padding-left: 0
    }

    .tdb_header_menu .tdb-normal-menu {
      position: relative
    }

    .tdb_header_menu .tdb-normal-menu ul {
      left: 0;
      padding: 15px 0;
      text-align: left
    }

    .tdb_header_menu .tdb-normal-menu ul ul {
      margin-top: -15px
    }

    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item {
      position: relative;
      list-style-type: none
    }

    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item>a {
      position: relative;
      display: block;
      padding: 7px 30px;
      font-size: 12px;
      line-height: 20px;
      color: #111
    }

    .tdb_header_menu .td-pulldown-filter-list .tdb-menu-item>a .tdb-sub-menu-icon,
    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item>a .tdb-sub-menu-icon {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 0;
      padding-right: inherit;
      font-size: 7px;
      line-height: 20px
    }

    .tdb_header_menu .td-pulldown-filter-list .tdb-menu-item>a .tdb-sub-menu-icon svg,
    .tdb_header_menu .td-pulldown-filter-list .tdb-menu-item>a .tdb-sub-menu-icon svg * {
      fill: #000
    }

    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item.tdb-hover>ul,
    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item:hover>ul {
      top: 0;
      display: block !important
    }

    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item.current-menu-item>a,
    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item.tdb-hover>a,
    .tdb_header_menu .tdb-normal-menu ul .tdb-menu-item:hover>a {
      color: #4db2ec
    }

    .tdb_header_menu .tdb-normal-menu>ul {
      left: -15px
    }

    .tdb-menu .tdb-mega-menu .sub-menu {
      -webkit-transition: opacity .3s;
      transition: opacity .3s ease;
      width: 1114px !important
    }

    .tdb-menu .tdb-mega-menu .sub-menu,
    .tdb-menu .tdb-mega-menu .sub-menu>li {
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%)
    }

    .tdb-menu .tdb-mega-menu .sub-menu>li {
      top: 0;
      width: 100%;
      max-width: 1114px !important;
      height: auto;
      background-color: #fff;
      border: 1px solid #eaeaea;
      overflow: hidden
    }

    .tdc-dragged .tdb-block-menu ul {
      visibility: hidden !important;
      opacity: 0 !important;
      -webkit-transition: .3s;
      transition: all .3s ease
    }

    .tdb-mm-align-parent .tdb-menu .tdb-mega-menu {
      position: relative
    }

    .tdi_36 {
      float: right;
      clear: none
    }

    .tdi_36 .tdb-menu>li {
      margin-right: 10px
    }

    .tdi_36 .tdb-menu>li:last-child {
      margin-right: 0
    }

    .tdi_36 .tdb-menu>li>a {
      padding: 0 10px
    }

    .tdi_36 .tdb-menu>li>a .tdb-sub-menu-icon {
      font-size: 13px;
      margin-left: 8px;
      top: 1px
    }

    .tdi_36 .tdb-menu>li>a {
      font-family: 'Work Sans' !important;
      font-size: 18px !important;
      line-height: 2.4 !important;
      font-weight: 600 !important;
      text-transform: none !important
    }

    .tdi_36 .tdb-menu .tdb-normal-menu ul .tdb-menu-item>a {
      padding: 10px 25px
    }

    .tdi_36 .td-pulldown-filter-list .tdb-menu-item>a .tdb-sub-menu-icon,
    .tdi_36 .tdb-normal-menu ul .tdb-menu-item>a .tdb-sub-menu-icon {
      right: 0;
      margin-top: 1px
    }

    .tdi_36 .td-pulldown-filter-list,
    .tdi_36 .td-pulldown-filter-list .sub-menu,
    .tdi_36 .tdb-menu .tdb-normal-menu ul {
      box-shadow: 0 2px 20px 0 rgba(94, 106, 135, .2)
    }

    .tdi_36 .td-pulldown-filter-list li a,
    .tdi_36 .tdb-menu .tdb-normal-menu ul .tdb-menu-item>a {
      font-family: 'Work Sans' !important;
      font-size: 14px !important;
      line-height: 2 !important;
      font-weight: 600 !important
    }

    .tdi_36 .tdb-mega-menu .sub-menu>li,
    .tdi_36:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
      max-width: 900px !important
    }

    .tdi_36 .tdb-mega-menu .sub-menu {
      left: 0;
      transform: none;
      -webkit-transform: none;
      -moz-transform: none
    }

    .tdi_36 .tdb-mega-menu .sub-menu>li {
      margin-left: -10px
    }

    .tdi_36 .tdb-menu .tdb-mega-menu .sub-menu>li {
      border-width: 0;
      box-shadow: 0 4px 30px 0 rgba(94, 106, 135, .2)
    }

    @media (max-width:1140px) {
      .tdb-menu .tdb-mega-menu .sub-menu>li {
        width: 100% !important
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_36 .tdb-menu>li {
        margin-right: 8px
      }

      .tdi_36 .tdb-menu>li:last-child {
        margin-right: 0
      }

      .tdi_36 .tdb-menu>li>a {
        padding: 0 8px
      }

      .tdi_36 .tdb-menu>li>a .tdb-sub-menu-icon {
        font-size: 9px
      }

      .tdi_36 .tdb-menu>li>a {
        font-family: 'Work Sans' !important;
        font-size: 16px !important;
        line-height: 2.2 !important;
        font-weight: 600 !important;
        text-transform: none !important
      }

      .tdi_36 .tdb-mega-menu .sub-menu>li,
      .tdi_36:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
        max-width: 650px !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_35 {
        width: 78% !important
      }

      .tdi_36 {
        display: inline-block !important
      }

      .tdi_36 .tdb-menu>li {
        margin-right: 6px
      }

      .tdi_36 .tdb-menu>li:last-child {
        margin-right: 0
      }

      .tdi_36 .tdb-menu>li>a {
        padding: 0 6px
      }

      .tdi_36 .tdb-menu>li>a .tdb-sub-menu-icon {
        font-size: 8px;
        margin-left: 6px
      }

      .tdi_36 .tdb-menu>li>a {
        font-family: 'Work Sans' !important;
        font-size: 12px !important;
        line-height: 2.2 !important;
        font-weight: 600 !important;
        text-transform: none !important
      }

      .tdi_36 .tdb-mega-menu .sub-menu>li,
      .tdi_36:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
        max-width: 500px !important
      }
    }

    .tdi_36 .tdb-menu>li>a:after {
      background: -webkit-linear-gradient(0deg, #000, #fff);
      background: linear-gradient(0deg, #000, #fff);
      height: 2px;
      bottom: 0
    }

    .tdi_36 .tdb-menu>li.current-menu-item>a:after,
    .tdi_36 .tdb-menu>li.tdb-hover>a:after,
    .tdi_36 .tdb-menu>li:hover>a:after {
      width: 82%
    }

    .tdi_36 .tdb-menu ul .tdb-normal-menu.current-menu-item>a,
    .tdi_36 .tdb-menu ul .tdb-normal-menu.tdb-hover>a,
    .tdi_36 .tdb-menu ul .tdb-normal-menu:hover>a {
      color: #000
    }

    .tdi_40 {
      vertical-align: baseline
    }

    .tdi_40>.wpb_wrapper,
    .tdi_40>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_40>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_40>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_40>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_40 {
      width: 6% !important
    }

    .tdb_module_search .td-post-author-name {
      white-space: normal
    }

    .tdb_header_search {
      margin-bottom: 0;
      clear: none
    }

    .tdb_header_search .tdb-block-inner {
      position: relative;
      display: inline-block;
      width: 100%
    }

    .tdb_header_search .tdb-search-form {
      position: relative;
      padding: 20px;
      border-width: 3px 0 0;
      border-style: solid;
      border-color: #4db2ec;
      pointer-events: auto
    }

    .tdb_header_search .tdb-search-form:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff
    }

    .tdb_header_search .tdb-search-form-inner {
      position: relative;
      display: flex;
      background-color: #fff
    }

    .tdb_header_search .tdb-search-form-inner:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid #e1e1e1;
      pointer-events: none
    }

    .tdb_header_search .tdb-head-search-form-btn,
    .tdb_header_search .tdb-head-search-form-input {
      height: auto;
      min-height: 32px
    }

    .tdb_header_search .tdb-head-search-form-input {
      color: #444;
      flex: 1;
      background-color: transparent;
      border: 0
    }

    .tdb_header_search .tdb-head-search-form-input.tdb-head-search-nofocus {
      color: transparent;
      text-shadow: 0 0 0 #444
    }

    .tdb_header_search .tdb-head-search-form-btn {
      margin-bottom: 0;
      padding: 0 15px;
      background-color: #222;
      font-family: Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      -webkit-transition: .3s;
      transition: all .3s ease;
      z-index: 1
    }

    .tdb_header_search .tdb-head-search-form-btn:hover {
      background-color: #4db2ec
    }

    .tdb_header_search .tdb-head-search-form-btn i,
    .tdb_header_search .tdb-head-search-form-btn span {
      display: inline-block;
      vertical-align: middle
    }

    .tdb_header_search .tdb-head-search-form-btn i {
      font-size: 12px
    }

    .tdb_header_search .tdb-head-search-form-btn svg {
      width: 12px;
      height: auto
    }

    .tdb_header_search .tdb-head-search-form-btn svg,
    .tdb_header_search .tdb-head-search-form-btn svg * {
      fill: #fff;
      -webkit-transition: .3s;
      transition: all .3s ease
    }

    .tdb_header_search .result-msg {
      padding: 4px 0 6px;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      font-style: italic;
      background-color: #fff
    }

    .tdb_header_search .result-msg a {
      color: #222
    }

    .tdb_header_search .result-msg a:hover {
      color: #4db2ec
    }

    .tdb_header_search .td-module-meta-info {
      text-align: left
    }

    .tdb_header_search .td_module_wrap:hover .entry-title a {
      color: #4db2ec
    }

    .tdb_header_search .tdb-aj-cur-element .entry-title a {
      color: #4db2ec
    }

    .tdc-dragged .tdb-drop-down-search,
    .tdc-dragged .tdb-head-search-btn:after {
      visibility: hidden !important;
      opacity: 0 !important;
      -webkit-transition: .3s;
      transition: all .3s ease
    }

    .tdb-header-search-trigger-enabled {
      z-index: 1000
    }

    .tdb-header-search-trigger-enabled .tdb-head-search-btn {
      display: flex;
      align-items: center;
      position: relative;
      text-align: center;
      color: #4db2ec
    }

    .tdb-header-search-trigger-enabled .tdb-head-search-btn:after {
      visibility: hidden;
      opacity: 0;
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6.5px 7px;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
      -webkit-transition: .4s;
      transition: all .4s ease;
      border-color: transparent transparent #4db2ec
    }

    .tdb-header-search-trigger-enabled .tdb-drop-down-search-open+.tdb-head-search-btn:after {
      visibility: visible;
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }

    .tdb-header-search-trigger-enabled .tdb-search-icon,
    .tdb-header-search-trigger-enabled .tdb-search-icon-svg svg * {
      -webkit-transition: .3s ease-in-out;
      transition: all .3s ease-in-out
    }

    .tdb-header-search-trigger-enabled .tdb-search-icon-svg {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .tdb-header-search-trigger-enabled .tdb-search-icon-svg svg {
      height: auto
    }

    .tdb-header-search-trigger-enabled .tdb-search-icon-svg svg,
    .tdb-header-search-trigger-enabled .tdb-search-icon-svg svg * {
      fill: #4db2ec
    }

    .tdb-header-search-trigger-enabled .tdb-drop-down-search {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: 100%;
      left: 0;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
      -webkit-transition: .4s;
      transition: all .4s ease;
      pointer-events: none;
      z-index: 10
    }

    .tdb-header-search-trigger-enabled .tdb-drop-down-search-open {
      visibility: visible;
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }

    .tdb-header-search-trigger-enabled .tdb-drop-down-search-inner {
      position: relative;
      max-width: 300px;
      pointer-events: all
    }

    .rtl .tdb-header-search-trigger-enabled .tdb-drop-down-search-inner {
      margin-left: 0;
      margin-right: auto
    }

    .tdi_41 .tdb-head-search-btn i {
      font-size: 26px;
      width: 46.8px;
      height: 46.8px;
      line-height: 46.8px;
      color: #000
    }

    .tdi_41 .tdb-head-search-btn svg {
      width: 26px
    }

    .tdi_41 .tdb-search-icon-svg {
      width: 46.8px;
      height: 46.8px
    }

    .tdi_41 .tdb-head-search-btn {
      justify-content: flex-end
    }

    .tdi_41 .tdb-drop-down-search-inner {
      left: 20px;
      box-shadow: 0 4px 30px 0 rgba(94, 106, 135, .2)
    }

    .tdi_41 .tdb-drop-down-search .tdb-drop-down-search-inner {
      max-width: 390px
    }

    .tdi_41 .tdb-search-form {
      border-width: 0
    }

    .tdi_41 .tdb-drop-down-search {
      left: auto;
      right: 0
    }

    .tdi_41 .tdb-aj-search,
    .tdi_41 .tdb-search-form,
    body .tdi_41 .tdb-drop-down-search-inner {
      margin-left: auto;
      margin-right: 0
    }

    .tdi_41 .tdb-head-search-form-input {
      padding: 5px 10px
    }

    .tdi_41 .tdb-search-form-inner:after {
      border-width: 0
    }

    .tdi_41 .result-msg {
      padding: 10px;
      text-align: center;
      font-family: Roboto !important;
      font-size: 11px !important;
      font-style: normal !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important
    }

    .tdi_41 .tdb-head-search-btn svg,
    .tdi_41 .tdb-head-search-btn svg * {
      fill: #000000
    }

    .tdi_41 .tdb-head-search-btn:after {
      border-bottom-color: #fff
    }

    .tdi_41 .tdb-search-form-inner {
      background-color: #eff5ff
    }

    .tdi_41 .tdb-head-search-form-btn {
      color: #fff;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000);
      font-size: 12px !important;
      font-weight: 400 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important
    }

    .tdi_41 .tdb-head-search-form-btn svg,
    .tdi_41 .tdb-head-search-form-btn svg * {
      fill: #ffffff
    }

    .tdi_41 .tdb-head-search-form-btn:hover {
      color: #fff;
      background-color: #000
    }

    .tdi_41 .tdb-head-search-form-btn:hover svg,
    .tdi_41 .tdb-head-search-form-btn:hover svg * {
      fill: #ffffff
    }

    .tdi_41 .result-msg,
    .tdi_41 .result-msg a {
      color: #2d80ed
    }

    .tdi_41 .result-msg a:hover {
      color: #000
    }

    .tdi_41 .tdb-head-search-form-input {
      font-family: Gelasio !important;
      font-size: 16px !important;
      line-height: 28px !important
    }

    .tdi_41 .td_module_wrap {
      width: 100%;
      float: left;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 10px;
      margin-bottom: 10px
    }

    .tdi_41 .td_module_wrap:nth-last-child(-n+1) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_41 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
      display: none
    }

    .tdi_41 .td-module-container:before {
      bottom: -10px;
      border-color: #eaeaea
    }

    .tdi_41 .td-module-container {
      border-color: #eaeaea;
      flex-direction: row
    }

    .tdi_41 .entry-thumb {
      background-position: center 50%
    }

    .tdi_41 .td-image-container {
      flex: 0 0 30%;
      width: 30%;
      display: block;
      order: 1
    }

    .ie10 .tdi_41 .td-image-container,
    .ie11 .tdi_41 .td-image-container {
      flex: 0 0 auto
    }

    .tdi_41 .td-module-meta-info {
      flex: 1;
      padding: 0;
      border-color: #eaeaea
    }

    .tdi_41 .td-post-vid-time {
      display: block
    }

    .tdi_41 .entry-title {
      margin: 0;
      font-family: 'Work Sans' !important;
      font-size: 16px !important;
      line-height: 1.5 !important
    }

    .tdi_41 .td-post-category:not(.td-post-extra-category) {
      display: none
    }

    .tdi_41 .td-author-date {
      display: none
    }

    .tdi_41 .td-post-author-name {
      display: none
    }

    .tdi_41 .td-post-author-name span,
    .tdi_41 .td-post-date {
      display: none
    }

    .tdi_41 .td-module-title a {
      color: #000
    }

    .tdi_41 .tdb-aj-cur-element .entry-title a,
    body .tdi_41 .td_module_wrap:hover .td-module-title a {
      color: #2d80ed !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_41 .tdb-head-search-btn i {
        font-size: 22px;
        width: 39.6px;
        height: 39.6px;
        line-height: 39.6px
      }

      .tdi_41 .tdb-head-search-btn svg {
        width: 22px
      }

      .tdi_41 .tdb-search-icon-svg {
        width: 39.6px;
        height: 39.6px
      }

      .tdi_41 .tdb-drop-down-search-inner {
        left: 0
      }

      .tdi_41 .tdb-drop-down-search .tdb-drop-down-search-inner {
        max-width: 370px
      }

      .tdi_41 .td_module_wrap {
        padding-bottom: 7.5px !important;
        margin-bottom: 7.5px !important;
        padding-bottom: 7.5px;
        margin-bottom: 7.5px
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_41 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_41 .td-module-container:before {
        bottom: -7.5px
      }

      .tdi_41 .entry-title {
        font-family: 'Work Sans' !important;
        font-size: 18px !important;
        line-height: 1.5 !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_41 .tdb-head-search-btn i {
        font-size: 18px;
        width: 32.4px;
        height: 32.4px;
        line-height: 32.4px
      }

      .tdi_41 .tdb-head-search-btn svg {
        width: 18px
      }

      .tdi_41 .tdb-search-icon-svg {
        width: 32.4px;
        height: 32.4px
      }

      .tdi_41 .tdb-drop-down-search-inner {
        left: 0
      }

      .tdi_41 .tdb-drop-down-search .tdb-drop-down-search-inner {
        max-width: 340px
      }

      .tdi_41 .result-msg {
        padding: 7px
      }

      .tdi_41 .tdb-head-search-form-input {
        font-family: Gelasio !important;
        font-size: 16px !important;
        line-height: 25px !important
      }

      .tdi_41 .td_module_wrap {
        padding-bottom: 7.5px !important;
        margin-bottom: 7.5px !important;
        padding-bottom: 7.5px;
        margin-bottom: 7.5px
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_41 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_41 .td-module-container:before {
        bottom: -7.5px
      }
    }

    @media (max-width:767px) {
      .tdi_41 .td_module_wrap {
        padding-bottom: 10px !important;
        margin-bottom: 10px !important;
        padding-bottom: 10px;
        margin-bottom: 10px
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_41 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_41 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_41 .td-module-container:before {
        bottom: -10px
      }
    }

    .tdi_43 {
      min-height: 0
    }

    .tdi_43>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000)
    }

    .td-header-desktop-sticky-wrap.td-header-active {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0)
    }

    .td-header-desktop-sticky-wrap {
      transform: translateY(-120%);
      -webkit-transform: translateY(-120%);
      -moz-transform: translateY(-120%);
      -ms-transform: translateY(-120%);
      -o-transform: translateY(-120%);
      -webkit-transition: .5s ease-in-out;
      -moz-transition: .5s ease-in-out;
      -o-transition: .5s ease-in-out;
      transition: all .5s ease-in-out
    }

    .tdi_45 {
      min-height: 0
    }

    .tdi_45:before {
      display: block;
      width: 100vw;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 25px 0 rgba(94, 106, 135, .2);
      z-index: 20;
      pointer-events: none;
      top: 0
    }

    .tdi_45 {
      display: block
    }

    @media (min-width:768px) {
      .tdi_45 {
        margin-left: -5px;
        margin-right: -5px
      }

      .tdi_45 .vc_column {
        padding-left: 5px;
        padding-right: 5px
      }
    }

    @media (min-width:767px) {
      .tdi_45.tdc-row-content-vert-center {
        display: flex;
        align-items: center;
        flex: 1
      }

      .tdi_45.tdc-row-content-vert-center .td_block_wrap {
        vertical-align: middle
      }
    }

    .tdi_45 {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      position: relative
    }

    .tdi_45 .td_block_wrap {
      text-align: left
    }

    .tdi_44_rand_style {
      background-color: #fff !important
    }

    .tdi_47 {
      vertical-align: baseline
    }

    .tdi_47>.wpb_wrapper,
    .tdi_47>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_47>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_47>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_47>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_47 {
      width: 14% !important
    }

    .tdi_48 {
      display: inline-block
    }

    .tdi_48 .tdb-logo-a,
    .tdi_48 h1 {
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start
    }

    .tdi_48 .tdb-logo-text-tagline {
      margin-top: 2px;
      margin-left: 0;
      display: none
    }

    .tdi_48 .tdb-logo-text-title {
      display: block;
      font-family: 'Work Sans' !important;
      font-size: 30px !important;
      font-weight: 900 !important;
      letter-spacing: 1px !important
    }

    .tdi_48 .tdb-logo-text-wrap {
      flex-direction: column;
      align-items: flex-start
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_48 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 26px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important
      }

      .tdi_51 {
        display: inline-block !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_45 {
        padding-top: 8px !important;
        padding-bottom: 8px !important
      }

      .tdi_47 {
        width: 16% !important
      }

      .tdi_48 {
        padding-left: 5px !important
      }

      .tdi_48 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 20px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important
      }
    }

    .tdi_50 {
      vertical-align: baseline
    }

    .tdi_50>.wpb_wrapper,
    .tdi_50>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_50>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_50>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_50>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_50 {
      width: 80% !important
    }

    @media(min-width:1141px) {
      .tdi_51 {
        display: inline-block !important
      }
    }

    .tdi_51 {
      float: right;
      clear: none
    }

    .tdi_51 .tdb-menu>li {
      margin-right: 10px
    }

    .tdi_51 .tdb-menu>li:last-child {
      margin-right: 0
    }

    .tdi_51 .tdb-menu>li>a {
      padding: 0 10px
    }

    .tdi_51 .tdb-menu>li>a .tdb-sub-menu-icon {
      font-size: 13px;
      margin-left: 8px;
      top: 1px
    }

    .tdi_51 .tdb-menu>li>a {
      font-family: 'Work Sans' !important;
      font-size: 18px !important;
      line-height: 2.4 !important;
      font-weight: 600 !important;
      text-transform: none !important
    }

    .tdi_51 .tdb-menu .tdb-normal-menu ul .tdb-menu-item>a {
      padding: 10px 25px
    }

    .tdi_51 .td-pulldown-filter-list .tdb-menu-item>a .tdb-sub-menu-icon,
    .tdi_51 .tdb-normal-menu ul .tdb-menu-item>a .tdb-sub-menu-icon {
      right: 0;
      margin-top: 1px
    }

    .tdi_51 .td-pulldown-filter-list,
    .tdi_51 .td-pulldown-filter-list .sub-menu,
    .tdi_51 .tdb-menu .tdb-normal-menu ul {
      box-shadow: 0 2px 20px 0 rgba(94, 106, 135, .2)
    }

    .tdi_51 .td-pulldown-filter-list li a,
    .tdi_51 .tdb-menu .tdb-normal-menu ul .tdb-menu-item>a {
      font-family: 'Work Sans' !important;
      font-size: 14px !important;
      line-height: 2 !important;
      font-weight: 600 !important
    }

    .tdi_51 .tdb-mega-menu .sub-menu>li,
    .tdi_51:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
      max-width: 900px !important
    }

    .tdi_51 .tdb-mega-menu .sub-menu {
      left: 0;
      transform: none;
      -webkit-transform: none;
      -moz-transform: none
    }

    .tdi_51 .tdb-mega-menu .sub-menu>li {
      margin-left: -10px
    }

    .tdi_51 .tdb-menu .tdb-mega-menu .sub-menu>li {
      border-width: 0;
      box-shadow: 0 4px 30px 0 rgba(94, 106, 135, .2)
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_51 .tdb-menu>li {
        margin-right: 8px
      }

      .tdi_51 .tdb-menu>li:last-child {
        margin-right: 0
      }

      .tdi_51 .tdb-menu>li>a {
        padding: 0 8px
      }

      .tdi_51 .tdb-menu>li>a .tdb-sub-menu-icon {
        font-size: 9px
      }

      .tdi_51 .tdb-menu>li>a {
        font-family: 'Work Sans' !important;
        font-size: 16px !important;
        line-height: 2.2 !important;
        font-weight: 600 !important;
        text-transform: none !important
      }

      .tdi_51 .tdb-mega-menu .sub-menu>li,
      .tdi_51:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
        max-width: 650px !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_50 {
        width: 78% !important
      }

      .tdi_51 {
        display: inline-block !important
      }

      .tdi_51 .tdb-menu>li {
        margin-right: 6px
      }

      .tdi_51 .tdb-menu>li:last-child {
        margin-right: 0
      }

      .tdi_51 .tdb-menu>li>a {
        padding: 0 6px
      }

      .tdi_51 .tdb-menu>li>a .tdb-sub-menu-icon {
        font-size: 8px;
        margin-left: 6px
      }

      .tdi_51 .tdb-menu>li>a {
        font-family: 'Work Sans' !important;
        font-size: 12px !important;
        line-height: 2.2 !important;
        font-weight: 600 !important;
        text-transform: none !important
      }

      .tdi_51 .tdb-mega-menu .sub-menu>li,
      .tdi_51:not(.tdb-mm-align-screen) .tdb-mega-menu .sub-menu {
        max-width: 500px !important
      }
    }

    .tdi_51 .tdb-menu>li>a:after {
      background-color: #000;
      height: 2px;
      bottom: 0
    }

    .tdi_51 .tdb-menu>li.current-menu-item>a:after,
    .tdi_51 .tdb-menu>li.tdb-hover>a:after,
    .tdi_51 .tdb-menu>li:hover>a:after {
      width: 82%
    }

    .tdi_51 .tdb-menu ul .tdb-normal-menu.current-menu-item>a,
    .tdi_51 .tdb-menu ul .tdb-normal-menu.tdb-hover>a,
    .tdi_51 .tdb-menu ul .tdb-normal-menu:hover>a {
      color: #000
    }

    .tdi_55 {
      vertical-align: baseline
    }

    .tdi_55>.wpb_wrapper,
    .tdi_55>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_55>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_55>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_55>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_55 {
      width: 6% !important
    }

    .tdi_56 .tdb-head-search-btn i {
      font-size: 26px;
      width: 46.8px;
      height: 46.8px;
      line-height: 46.8px;
      color: #000
    }

    .tdi_56 .tdb-head-search-btn svg {
      width: 26px
    }

    .tdi_56 .tdb-search-icon-svg {
      width: 46.8px;
      height: 46.8px
    }

    .tdi_56 .tdb-head-search-btn {
      justify-content: flex-end
    }

    .tdi_56 .tdb-drop-down-search-inner {
      left: 20px;
      box-shadow: 0 4px 30px 0 rgba(94, 106, 135, .2)
    }

    .tdi_56 .tdb-drop-down-search .tdb-drop-down-search-inner {
      max-width: 390px
    }

    .tdi_56 .tdb-search-form {
      border-width: 0
    }

    .tdi_56 .tdb-drop-down-search {
      left: auto;
      right: 0
    }

    .tdi_56 .tdb-aj-search,
    .tdi_56 .tdb-search-form,
    body .tdi_56 .tdb-drop-down-search-inner {
      margin-left: auto;
      margin-right: 0
    }

    .tdi_56 .tdb-head-search-form-input {
      padding: 5px 10px
    }

    .tdi_56 .tdb-search-form-inner:after {
      border-width: 0
    }

    .tdi_56 .result-msg {
      padding: 10px;
      text-align: center;
      font-family: 'Work Sans' !important;
      font-size: 11px !important;
      font-style: normal !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important
    }

    .tdi_56 .tdb-head-search-btn svg,
    .tdi_56 .tdb-head-search-btn svg * {
      fill: #000000
    }

    .tdi_56 .tdb-head-search-btn:after {
      border-bottom-color: #fff
    }

    .tdi_56 .tdb-search-form-inner {
      background-color: #eff5ff
    }

    .tdi_56 .tdb-head-search-form-btn {
      color: #fff;
      background: -webkit-linear-gradient(-90deg, #2d80ed, #000);
      background: linear-gradient(-90deg, #2d80ed, #000);
      font-size: 12px !important;
      font-weight: 400 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important
    }

    .tdi_56 .tdb-head-search-form-btn svg,
    .tdi_56 .tdb-head-search-form-btn svg * {
      fill: #ffffff
    }

    .tdi_56 .tdb-head-search-form-btn:hover {
      color: #fff;
      background-color: #000
    }

    .tdi_56 .tdb-head-search-form-btn:hover svg,
    .tdi_56 .tdb-head-search-form-btn:hover svg * {
      fill: #ffffff
    }

    .tdi_56 .result-msg,
    .tdi_56 .result-msg a {
      color: #2d80ed
    }

    .tdi_56 .result-msg a:hover {
      color: #000
    }

    .tdi_56 .tdb-head-search-form-input {
      font-family: Gelasio !important;
      font-size: 16px !important;
      line-height: 28px !important
    }

    .tdi_56 .td_module_wrap:nth-last-child(-n+1) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_56 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
      display: none
    }

    .tdi_56 .td_module_wrap {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 10px;
      margin-bottom: 10px
    }

    .tdi_56 .td-module-container:before {
      bottom: -10px;
      border-color: #eaeaea
    }

    .tdi_56 .td-module-container {
      border-color: #eaeaea;
      flex-direction: row
    }

    .tdi_56 .entry-thumb {
      background-position: center 50%
    }

    .tdi_56 .td-image-container {
      flex: 0 0 30%;
      width: 30%;
      display: block;
      order: 1
    }

    .ie10 .tdi_56 .td-image-container,
    .ie11 .tdi_56 .td-image-container {
      flex: 0 0 auto
    }

    .tdi_56 .td-module-meta-info {
      flex: 1;
      padding: 0;
      border-color: #eaeaea
    }

    .tdi_56 .td-post-vid-time {
      display: none
    }

    .tdi_56 .entry-title {
      margin: 0;
      font-family: 'Work Sans' !important;
      font-size: 16px !important;
      line-height: 1.5 !important
    }

    .tdi_56 .td-post-category:not(.td-post-extra-category) {
      display: none
    }

    .tdi_56 .td-author-date {
      display: none
    }

    .tdi_56 .td-post-author-name {
      display: none
    }

    .tdi_56 .td-post-author-name span,
    .tdi_56 .td-post-date {
      display: none
    }

    .tdi_56 .td-module-title a {
      color: #000
    }

    .tdi_56 .tdb-aj-cur-element .entry-title a,
    body .tdi_56 .td_module_wrap:hover .td-module-title a {
      color: #2d80ed !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_56 .tdb-head-search-btn i {
        font-size: 22px;
        width: 39.6px;
        height: 39.6px;
        line-height: 39.6px
      }

      .tdi_56 .tdb-head-search-btn svg {
        width: 22px
      }

      .tdi_56 .tdb-search-icon-svg {
        width: 39.6px;
        height: 39.6px
      }

      .tdi_56 .tdb-drop-down-search-inner {
        left: 0
      }

      .tdi_56 .tdb-drop-down-search .tdb-drop-down-search-inner {
        max-width: 370px
      }

      .tdi_56 .td_module_wrap {
        padding-bottom: 7.5px !important;
        margin-bottom: 7.5px !important;
        padding-bottom: 7.5px;
        margin-bottom: 7.5px
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_56 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_56 .td-module-container:before {
        bottom: -7.5px
      }

      .tdi_56 .entry-title {
        font-family: 'Work Sans' !important;
        font-size: 18px !important;
        line-height: 1.5 !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_56 .tdb-head-search-btn i {
        font-size: 18px;
        width: 32.4px;
        height: 32.4px;
        line-height: 32.4px
      }

      .tdi_56 .tdb-head-search-btn svg {
        width: 18px
      }

      .tdi_56 .tdb-search-icon-svg {
        width: 32.4px;
        height: 32.4px
      }

      .tdi_56 .tdb-drop-down-search-inner {
        left: 0
      }

      .tdi_56 .tdb-drop-down-search .tdb-drop-down-search-inner {
        max-width: 340px
      }

      .tdi_56 .result-msg {
        padding: 7px
      }

      .tdi_56 .tdb-head-search-form-input {
        font-family: Gelasio !important;
        font-size: 16px !important;
        line-height: 25px !important
      }

      .tdi_56 .td_module_wrap {
        padding-bottom: 7.5px !important;
        margin-bottom: 7.5px !important;
        padding-bottom: 7.5px;
        margin-bottom: 7.5px
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_56 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_56 .td-module-container:before {
        bottom: -7.5px
      }
    }

    @media (max-width:767px) {
      .tdi_56 .td_module_wrap {
        padding-bottom: 10px !important;
        margin-bottom: 10px !important;
        padding-bottom: 10px;
        margin-bottom: 10px
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_56 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_56 .td_module_wrap:nth-last-child(-n+1) .td-module-container:before {
        display: none !important
      }

      .tdi_56 .td-module-container:before {
        bottom: -10px
      }

      .td_block_template_5 .td-related-title a {
        font-size: 15px
      }
    }

    .td_block_template_5 .td-block-title {
      font-size: 16px;
      font-weight: 500;
      margin-top: 0;
      margin-bottom: 26px;
      line-height: 25px;
      color: #000;
      text-align: left
    }

    .td_block_template_5 .td-block-title>* {
      padding: 0 12px;
      border-width: 0 0 0 4px;
      border-style: solid;
      border-color: #4db2ec
    }

    .td_block_template_5 .td-subcat-filter {
      line-height: 25px
    }

    .td_block_template_5 .td-related-title:last-child {
      border: none
    }

    .td_block_template_5 .td-related-title .td-cur-simple-item {
      color: #4db2ec
    }

    .tdi_57 {
      margin-bottom: -15px !important
    }

    body .tdi_57 .td-block-title a,
    body .tdi_57 .td-block-title span {
      font-family: Roboto !important;
      font-size: 26px !important;
      line-height: 1.5 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0 !important
    }

    @media (min-width:1019px) and (max-width:1140px) {

      body .tdi_57 .td-block-title a,
      body .tdi_57 .td-block-title span {
        font-family: Roboto !important;
        font-size: 22px !important;
        line-height: 1.5 !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0 !important
      }
    }

    .tdi_58 {
      margin-bottom: 20px !important
    }

    .tdi_58 .td_module_wrap {
      width: 33.33333333%;
      float: left;
      padding-left: 7.5px;
      padding-right: 7.5px;
      padding-bottom: 18px;
      margin-bottom: 18px;
      display: flex
    }

    .tdi_58 .td_module_wrap:nth-child(3n+1) {
      clear: both
    }

    .tdi_58 .td_module_wrap:nth-last-child(-n+3) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_58 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
      display: none
    }

    .tdi_58 .td_block_inner {
      margin-left: -7.5px;
      margin-right: -7.5px;
      display: flex;
      flex-wrap: wrap
    }

    .tdi_58 .td-module-container:before {
      bottom: -18px;
      border-width: 0 0 1px;
      border-style: dotted;
      border-color: #eaeaea;
      border-color: #000
    }

    .tdi_58 .td-module-container {
      border-color: #eaeaea;
      flex-grow: 1
    }

    body .tdi_58 .td_block_inner .td_module_wrap .td-module-container:before {
      display: block !important
    }

    .tdi_58 .entry-thumb {
      background-position: center 56%
    }

    .tdi_58 .td-image-wrap {
      padding-bottom: 75%
    }

    .tdi_58 .td-post-vid-time {
      display: none
    }

    .tdi_58 .td-module-meta-info {
      border-color: #eaeaea
    }

    .tdi_58 .entry-title {
      margin: 8px 0 0;
      font-family: 'Work Sans' !important;
      font-size: 16px !important;
      line-height: 1.2 !important;
      font-weight: 700 !important;
      text-transform: capitalize !important
    }

    .tdi_58 .td-post-category:not(.td-post-extra-category) {
      display: inline-block
    }

    .tdi_58 .td-post-category {
      margin: 2px 6px 0 0;
      padding: 0 6px 0 0;
      border-width: 0 1px 0 0;
      border-style: solid;
      border-color: #000;
      background-color: rgba(0, 0, 0, 0);
      color: var(--blck-custom-color-4);
      border-color: #aaa;
      font-family: 'Work Sans' !important;
      font-size: 11px !important;
      line-height: 1 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important
    }

    .tdi_58 .td-author-date {
      display: inline
    }

    .tdi_58 .td-post-author-name {
      display: none
    }

    .tdi_58 .td-post-author-name span,
    .tdi_58 .td-post-date {
      display: none
    }

    .tdi_58 .td_module_wrap:hover .td-module-title a {
      color: #266fef !important
    }

    .tdi_58 .td-post-category:hover {
      color: #000
    }

    .tdi_58 .td-post-author-name a {
      color: #666
    }

    .tdi_58 .td-post-author-name:hover a {
      color: #000
    }

    .tdi_58 .td-editor-date,
    .tdi_58 .td-editor-date .entry-date,
    .tdi_58 .td-editor-date .td-post-author-name a {
      font-family: Rubik !important;
      font-size: 11px !important;
      font-weight: 400 !important
    }

    .tdi_58 .td-image-container {
      flex: 0 0 0
    }

    html:not([class*=ie]) .tdi_58 .td-module-container:hover .entry-thumb:before {
      opacity: 0
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_58 {
        margin-bottom: 15px !important
      }

      .tdi_58 .td_module_wrap {
        clear: none !important;
        padding-bottom: 18px !important;
        margin-bottom: 18px !important;
        padding-bottom: 18px;
        margin-bottom: 18px
      }

      .tdi_58 .td_module_wrap:nth-child(3n+1) {
        clear: both !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+3) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_58 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
        display: none !important
      }

      .tdi_58 .td-module-container:before {
        bottom: -18px
      }

      .tdi_58 .entry-title {
        font-family: 'Work Sans' !important;
        font-size: 14px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
        text-transform: capitalize !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {

      body .tdi_57 .td-block-title a,
      body .tdi_57 .td-block-title span {
        font-family: Roboto !important;
        font-size: 20px !important;
        line-height: 1.5 !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0 !important
      }

      .tdi_58 {
        margin-bottom: 15px !important
      }

      .tdi_58 .td_module_wrap {
        clear: none !important;
        padding-bottom: 18px !important;
        margin-bottom: 18px !important;
        padding-bottom: 18px;
        margin-bottom: 18px
      }

      .tdi_58 .td_module_wrap:nth-child(3n+1) {
        clear: both !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+3) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_58 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
        display: none !important
      }

      .tdi_58 .td-module-container:before {
        bottom: -18px
      }

      .tdi_58 .entry-title {
        font-family: 'Work Sans' !important;
        font-size: 14px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
        text-transform: capitalize !important
      }
    }

    @media (max-width:767px) {
      .tdi_57 {
        margin-right: -15px !important;
        margin-left: -15px !important
      }

      body .tdi_57 .td-block-title a,
      body .tdi_57 .td-block-title span {
        font-family: Roboto !important;
        font-size: 22px !important;
        line-height: 1.5 !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0 !important
      }

      .tdi_58 {
        margin-right: -10px !important;
        margin-bottom: 15px !important;
        margin-left: -10px !important
      }

      .tdi_58 .td_module_wrap {
        width: 50%;
        float: left;
        clear: none !important;
        padding-bottom: 18px !important;
        margin-bottom: 18px !important;
        padding-bottom: 18px;
        margin-bottom: 18px
      }

      .tdi_58 .td_module_wrap:nth-child(odd) {
        clear: both !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+2) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_58 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_58 .td_module_wrap:nth-last-child(-n+2) .td-module-container:before {
        display: none !important
      }

      .tdi_58 .td-module-container:before {
        bottom: -18px
      }

      .tdi_58 .td-image-wrap {
        padding-bottom: 66%
      }

      .tdi_58 .entry-title {
        font-family: 'Work Sans' !important;
        font-size: 14px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
        text-transform: capitalize !important
      }
    }

    #wprm-recipe-user-rating-0 .wprm-rating-star.wprm-rating-star-full svg * {
      fill: #000000
    }

    #wprm-recipe-user-rating-0 .wprm-rating-star.wprm-rating-star-33 svg * {
      fill: url(#wprm-recipe-user-rating-0-33)
    }

    #wprm-recipe-user-rating-0 .wprm-rating-star.wprm-rating-star-50 svg * {
      fill: url(#wprm-recipe-user-rating-0-50)
    }

    #wprm-recipe-user-rating-0 .wprm-rating-star.wprm-rating-star-66 svg * {
      fill: url(#wprm-recipe-user-rating-0-66)
    }

    linearGradient#wprm-recipe-user-rating-0-33 stop {
      stop-color: #000000
    }

    linearGradient#wprm-recipe-user-rating-0-50 stop {
      stop-color: #000000
    }

    linearGradient#wprm-recipe-user-rating-0-66 stop {
      stop-color: #000000
    }

    .tdi_60 {
      min-height: 0
    }

    .tdi_62 {
      min-height: 0
    }

    .tdi_62>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background-color: #f9f9f9 !important
    }

    .tdi_62 {
      display: block
    }

    .tdi_62 {
      padding-top: 30px !important
    }

    .tdi_62 .td_block_wrap {
      text-align: left
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_62 {
        padding-top: 15px !important
      }
    }

    .tdi_63 {
      margin-bottom: 0 !important
    }

    body .tdi_63 .td-block-title a,
    body .tdi_63 .td-block-title span {
      font-family: Roboto !important;
      font-size: 17px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important
    }

    .tdi_65 {
      margin-bottom: 10px !important
    }

    @media (max-width:767px) {
      .tdi_62 {
        padding-top: 0 !important
      }

      .tdi_63 {
        margin-right: -15px !important;
        margin-left: -15px !important
      }

      .tdi_65 {
        margin-bottom: 10px !important
      }
    }

    .td-big-grid-flex {
      width: 100%;
      padding-bottom: 0
    }

    .td-big-grid-flex .td_block_inner .td-big-grid-flex-post:after,
    .td-big-grid-flex .td_block_inner:after {
      content: '';
      display: table;
      clear: both
    }

    .td-big-grid-flex .td-big-grid-flex-post {
      position: relative;
      float: left;
      padding-bottom: 0
    }

    .td-big-grid-flex .td-image-container {
      position: relative;
      flex: 0 0 100%;
      width: 100%;
      height: 100%
    }

    .td-big-grid-flex .td-image-wrap {
      position: relative;
      display: block;
      overflow: hidden
    }

    .td-big-grid-flex .td-image-wrap:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-transition: background-color .3s;
      transition: background-color .3s ease;
      z-index: 1
    }

    .td-big-grid-flex .td-module-thumb {
      position: relative;
      margin-bottom: 0
    }

    .td-big-grid-flex .td-module-thumb:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%
    }

    .td-big-grid-flex .td-thumb-css {
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: cover;
      background-position: center center
    }

    .td-big-grid-flex .td-module-thumb .td-thumb-css {
      transition: opacity .3s, transform .3s;
      -webkit-transition: opacity .3s, transform .3s
    }

    .td-big-grid-flex .td-post-category {
      transition: background-color .2s ease;
      -webkit-transition: background-color .2s;
      padding: 3px 7px;
      background-color: rgba(0, 0, 0, .7);
      font-family: Roboto, sans-serif;
      line-height: 13px;
      font-weight: 500;
      text-transform: uppercase;
      pointer-events: auto
    }

    .td-big-grid-flex .td-module-meta-info {
      position: absolute;
      left: 0;
      margin-bottom: 0;
      width: 100%;
      pointer-events: none;
      z-index: 1
    }

    .td-big-grid-flex .td-module-container:hover .entry-title a,
    .td-big-grid-flex .td-module-title a,
    .td-big-grid-flex .td-post-author-name a,
    .td-big-grid-flex .td-post-author-name span,
    .td-big-grid-flex .td-post-date {
      color: #fff
    }

    .td-big-grid-flex .td-module-title {
      margin: 0
    }

    .td-big-grid-flex .td-module-title a {
      text-shadow: 1px 1px 3px rgba(0, 0, 0, .2)
    }

    .td-big-grid-flex .td-editor-date {
      display: inline-block
    }

    .td-big-grid-flex .td-post-author-name a,
    .td-big-grid-flex .td-post-author-name span,
    .td-big-grid-flex .td-post-date {
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .3)
    }

    .td_block_big_grid_flex_1 .td-module-container {
      position: relative
    }

    .td_block_big_grid_flex_1 .td-image-wrap {
      padding-bottom: 75%
    }

    .td_block_big_grid_flex_1 .td-module-meta-info {
      padding: 22px 20px
    }

    .td_block_big_grid_flex_1 .td-module-title {
      font-family: Roboto, sans-serif;
      font-size: 27px;
      font-weight: 500;
      line-height: 34px;
      margin: 0 0 9px
    }

    .td_block_big_grid_flex_1 .td-editor-date {
      display: inline-block
    }

    body .tdi_65 .entry-thumb {
      background-position: center 50%
    }

    body .tdi_65 .td-image-wrap {
      padding-bottom: 57%
    }

    body .tdi_65 .td-module-meta-info {
      bottom: 0
    }

    body .tdi_65 .td-post-category {
      margin: 0 0 5px;
      padding: 0;
      background-color: rgba(0, 0, 0, 0);
      color: #fff;
      font-family: Roboto !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important
    }

    body .tdi_65 .td-post-category:not(.td-post-extra-category) {
      display: inline-block
    }

    body .tdi_65 .td-editor-date {
      display: inline
    }

    body .tdi_65 .td-post-author-name {
      display: none
    }

    body .tdi_65 .td-post-author-name span,
    body .tdi_65 .td-post-date {
      display: none
    }

    body .tdi_65 .td-big-grid-flex-post:nth-child(odd) {
      clear: both
    }

    body .tdi_65 .td-image-wrap:before {
      content: '';
      background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0));
      background: linear-gradient(0deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0))
    }

    body .tdi_65 .entry-title {
      margin: 2px 0 6px;
      font-family: Roboto !important;
      font-size: 22px !important;
      line-height: 1.2 !important;
      font-weight: 500 !important;
      text-transform: capitalize !important
    }

    body .tdi_65 .td-editor-date,
    body .tdi_65 .td-editor-date .entry-date {
      font-weight: 400 !important
    }

    body .tdi_65 .td-post-author-name a {
      font-weight: 400
    }

    html:not([class*=ie]) body .tdi_65 .td-module-container:hover .entry-thumb:before {
      opacity: 0
    }

    @media (max-width:767px) {
      .td-big-grid-flex .td_block_inner {
        margin-left: -20px;
        margin-right: -20px
      }

      .td_block_big_grid_flex_1 .td-big-grid-flex-post {
        width: 100%
      }

      body .tdi_65 .td-big-grid-flex-post {
        margin-bottom: 4px
      }

      body .tdi_65 .td-big-grid-flex-post:last-child {
        margin-bottom: 0
      }
    }

    @media (min-width:767px) {
      body .tdi_65 .td-module-container:hover .td-thumb-css {
        transform: scale3d(1.1, 1.1, 1);
        -webkit-transform: scale3d(1.1, 1.1, 1)
      }

      body .tdi_65 .td-big-grid-flex-post {
        width: 50%
      }

      body .tdi_65 .td-big-grid-flex-post {
        padding-left: 2px;
        padding-right: 2px
      }

      body .tdi_65 .td_block_inner {
        margin-left: -2px;
        margin-right: -2px
      }

      body .tdi_65 .td-big-grid-flex-post:nth-last-child(-n+2) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      body .tdi_65 .td-big-grid-flex-post .td-module-container:before {
        display: block !important
      }

      body .tdi_65 .td-big-grid-flex-post:nth-last-child(-n+2) .td-module-container:before {
        display: none !important
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      body .tdi_65 .td-module-meta-info {
        padding: 18px 16px
      }

      body .tdi_65 .td-big-grid-flex-post {
        clear: none !important
      }

      body .tdi_65 .td-big-grid-flex-post:nth-child(odd) {
        clear: both !important
      }

      body .tdi_65 .entry-title {
        font-family: Roboto !important;
        font-size: 20px !important;
        line-height: 1.2 !important;
        font-weight: 500 !important;
        text-transform: capitalize !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_65 {
        margin-bottom: 12px !important
      }

      body .tdi_65 .td-module-meta-info {
        padding: 18px 16px
      }

      body .tdi_65 .td-big-grid-flex-post {
        clear: none !important
      }

      body .tdi_65 .td-big-grid-flex-post:nth-child(odd) {
        clear: both !important
      }

      body .tdi_65 .entry-title {
        font-family: Roboto !important;
        font-size: 15px !important;
        line-height: 1.2 !important;
        font-weight: 500 !important;
        text-transform: capitalize !important
      }

      body .tdi_65 .td-editor-date,
      body .tdi_65 .td-editor-date .entry-date {
        font-size: 10px !important;
        font-weight: 400 !important
      }

      .tdi_66 {
        margin-bottom: 30px !important
      }
    }

    .tdi_66 {
      margin-bottom: 30px !important
    }

    .tdi_66 .td-image-wrap {
      padding-bottom: 57%
    }

    .tdi_66 .entry-thumb {
      background-position: center 50%
    }

    .tdi_66 .td-module-container {
      flex-direction: column;
      border-width: 0;
      border-style: solid;
      border-color: #000;
      border-style: dashed !important;
      border-color: #eaeaea !important
    }

    .tdi_66 .td-image-container {
      display: block;
      order: 0
    }

    .ie10 .tdi_66 .td-module-meta-info,
    .ie11 .tdi_66 .td-module-meta-info {
      flex: auto
    }

    .tdi_66 .td-module-meta-info {
      border-style: dashed;
      border-color: #eaeaea
    }

    .tdi_66 .td_module_wrap {
      width: 33.33333333%;
      float: left;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px
    }

    .rtl .tdi_66 .td_module_wrap {
      float: right
    }

    .tdi_66 .td_block_inner {
      margin-left: -10px;
      margin-right: -10px
    }

    .tdi_66 .td-module-container:before {
      bottom: -10px;
      border-color: #eaeaea
    }

    .tdi_66 .td-post-vid-time {
      display: none
    }

    .tdi_66 .td-post-category {
      padding: 0;
      background-color: rgba(0, 0, 0, 0);
      color: var(--blck-custom-color-4);
      font-size: 11px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important
    }

    .tdi_66 .td-post-category:not(.td-post-extra-category) {
      display: inline-block
    }

    .tdi_66 .td-author-date {
      display: inline
    }

    .tdi_66 .td-post-author-name {
      display: none
    }

    .tdi_66 .td-post-author-name span,
    .tdi_66 .td-post-date {
      display: none
    }

    .tdi_66 .td_module_wrap:nth-child(3n+1) {
      clear: both
    }

    .tdi_66 .td_module_wrap:nth-last-child(-n+3) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_66 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
      display: none
    }

    .tdi_66 .td-post-category:hover {
      color: #000
    }

    .tdi_66 .td-module-title a {
      color: #000;
      box-shadow: inset 0 0 0 0 #000
    }

    .tdi_66 .td_module_wrap:hover .td-module-title a {
      color: #d33 !important;
      box-shadow: inset 0 -1px 0 0 #000
    }

    .tdi_66 .entry-title {
      margin: 6px 0 4px;
      font-family: Roboto !important;
      font-size: 15px !important;
      line-height: 1.4 !important;
      font-weight: 500 !important
    }

    .tdi_66 .td-editor-date,
    .tdi_66 .td-editor-date .entry-date,
    .tdi_66 .td-editor-date .td-post-author-name a {
      font-weight: 400 !important
    }

    html:not([class*=ie]) .tdi_66 .td-module-container:hover .entry-thumb:before {
      opacity: 0
    }

    @media (min-width:768px) {
      .tdi_66 .td-module-title a {
        transition: all .2s ease;
        -webkit-transition: .2s
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_66 .td_module_wrap {
        padding-bottom: 10px;
        margin-bottom: 10px;
        clear: none !important;
        padding-bottom: 10px !important;
        margin-bottom: 10px !important
      }

      .tdi_66 .td-module-container:before {
        bottom: -10px
      }

      .tdi_66 .td_module_wrap:nth-child(3n+1) {
        clear: both !important
      }

      .tdi_66 .td_module_wrap:nth-last-child(-n+3) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_66 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_66 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
        display: none !important
      }

      .tdi_66 .td-module-title a {
        box-shadow: inset 0 0 0 0 #000
      }

      .tdi_66 .td_module_wrap:hover .td-module-title a {
        box-shadow: inset 0 -1px 0 0 #000
      }

      @media (min-width:768px) {
        .tdi_66 .td-module-title a {
          transition: all .2s ease;
          -webkit-transition: .2s
        }
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_66 .td_module_wrap {
        padding-left: 6px;
        padding-right: 6px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        clear: none !important;
        padding-bottom: 10px !important;
        margin-bottom: 10px !important
      }

      .tdi_66 .td_block_inner {
        margin-left: -6px;
        margin-right: -6px
      }

      .tdi_66 .td-module-container:before {
        bottom: -10px
      }

      .tdi_66 .td_module_wrap:nth-child(3n+1) {
        clear: both !important
      }

      .tdi_66 .td_module_wrap:nth-last-child(-n+3) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_66 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_66 .td_module_wrap:nth-last-child(-n+3) .td-module-container:before {
        display: none !important
      }

      .tdi_66 .td-module-title a {
        box-shadow: inset 0 0 0 0 #000
      }

      .tdi_66 .td_module_wrap:hover .td-module-title a {
        box-shadow: inset 0 -1px 0 0 #000
      }

      .tdi_66 .entry-title {
        font-family: Roboto !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        font-weight: 500 !important
      }

      .tdi_66 .td-editor-date,
      .tdi_66 .td-editor-date .entry-date,
      .tdi_66 .td-editor-date .td-post-author-name a {
        font-size: 10px !important;
        font-weight: 400 !important
      }

      @media (min-width:768px) {
        .tdi_66 .td-module-title a {
          transition: all .2s ease;
          -webkit-transition: .2s
        }
      }
    }

    @media (max-width:767px) {
      body .tdi_65 .td-editor-date {
        display: none
      }

      body .tdi_65 .td-big-grid-flex-post {
        clear: none !important
      }

      body .tdi_65 .td-big-grid-flex-post:nth-child(odd) {
        clear: both !important
      }

      body .tdi_65 .entry-title {
        font-family: Roboto !important;
        font-size: 17px !important;
        line-height: 1.2 !important;
        font-weight: 500 !important;
        text-transform: capitalize !important
      }

      body .tdi_65 .td-editor-date,
      body .tdi_65 .td-editor-date .entry-date {
        font-size: 10px !important;
        font-weight: 400 !important
      }

      .tdi_66 {
        margin-right: -15px !important;
        margin-bottom: 10px !important;
        margin-left: -15px !important
      }

      .tdi_66 .td-image-wrap {
        padding-bottom: 80%
      }

      .tdi_66 .td-image-container {
        flex: 0 0 40%;
        width: 40%;
        display: block;
        order: 0
      }

      .ie10 .tdi_66 .td-image-container,
      .ie11 .tdi_66 .td-image-container {
        flex: 0 0 auto
      }

      .tdi_66 .td-module-container {
        flex-direction: row
      }

      .ie10 .tdi_66 .td-module-meta-info,
      .ie11 .tdi_66 .td-module-meta-info {
        flex: 1
      }

      .tdi_66 .td-module-meta-info {
        margin: 5px 0 0;
        padding: 0 0 0 12px;
        border-width: 0 0 2px
      }

      .tdi_66 .td_module_wrap {
        width: 100%;
        float: left;
        padding-bottom: 10px;
        margin-bottom: 10px;
        padding-bottom: 10px !important;
        margin-bottom: 10px !important
      }

      .rtl .tdi_66 .td_module_wrap {
        float: right
      }

      .tdi_66 .td-module-container:before {
        bottom: -10px
      }

      .tdi_66 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_66 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_66 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_66 .td-module-title a {
        box-shadow: inset 0 0 0 0 #000
      }

      .tdi_66 .td_module_wrap:hover .td-module-title a {
        box-shadow: inset 0 -1px 0 0 #000
      }

      .tdi_66 .td-post-category {
        font-family: Roboto !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important
      }

      .tdi_66 .td-editor-date,
      .tdi_66 .td-editor-date .entry-date,
      .tdi_66 .td-editor-date .td-post-author-name a {
        font-size: 10px !important;
        font-weight: 400 !important
      }

      @media (min-width:768px) {
        .tdi_66 .td-module-title a {
          transition: all .2s ease;
          -webkit-transition: .2s
        }
      }
    }

    .td-post-sharing {
      margin-left: -3px;
      margin-right: -3px;
      font-family: 'Open Sans', 'Open Sans Regular', sans-serif;
      z-index: 2;
      white-space: nowrap;
      opacity: 0
    }

    .td-post-sharing.td-social-show-all {
      white-space: normal
    }

    .td-js-loaded .td-post-sharing {
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      opacity: 1
    }

    .td-post-sharing-bottom {
      border-style: solid;
      border-color: #ededed;
      border-width: 1px 0;
      padding: 21px 0;
      margin-bottom: 42px
    }

    .td-post-sharing-bottom .td-post-sharing {
      margin-bottom: -7px
    }

    .td-post-sharing-visible,
    .td-social-sharing-hidden {
      display: inline-block
    }

    .td-social-sharing-hidden ul {
      display: none
    }

    .td-social-show-all .td-pulldown-filter-list {
      display: inline-block
    }

    .td-social-handler,
    .td-social-network {
      position: relative;
      display: inline-block;
      margin: 0 3px 7px;
      height: 40px;
      min-width: 40px;
      font-size: 11px;
      text-align: center;
      vertical-align: middle
    }

    .td-social-network {
      color: #000;
      overflow: hidden
    }

    .td-social-network .td-social-but-icon {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px
    }

    .td-social-network .td-social-but-text {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px
    }

    .td-social-network:hover {
      opacity: .8 !important
    }

    .td-social-handler {
      color: #444;
      border: 1px solid #e9e9e9;
      border-radius: 2px
    }

    .td-social-handler .td-social-but-text {
      font-weight: 700
    }

    .td-social-handler .td-social-but-text:before {
      background-color: #000;
      opacity: .08
    }

    .td-social-share-text {
      margin-right: 18px
    }

    .td-social-share-text:after,
    .td-social-share-text:before {
      content: '';
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      left: 100%;
      width: 0;
      height: 0;
      border-style: solid
    }

    .td-social-share-text:before {
      border-width: 9px 0 9px 11px;
      border-color: transparent transparent transparent #e9e9e9
    }

    .td-social-share-text:after {
      border-width: 8px 0 8px 10px;
      border-color: transparent transparent transparent #fff
    }

    .td-social-but-icon,
    .td-social-but-text {
      display: inline-block;
      position: relative
    }

    .td-social-but-icon {
      padding-left: 13px;
      padding-right: 13px;
      line-height: 40px;
      z-index: 1
    }

    .td-social-but-icon i {
      position: relative;
      top: -1px;
      vertical-align: middle
    }

    .td-social-but-text {
      margin-left: -6px;
      padding-left: 12px;
      padding-right: 17px;
      line-height: 40px
    }

    .td-social-but-text:before {
      content: '';
      position: absolute;
      top: 12px;
      left: 0;
      width: 1px;
      height: 16px;
      background-color: #fff;
      opacity: .2;
      z-index: 1
    }

    .td-social-facebook i,
    .td-social-handler i {
      font-size: 14px
    }

    .td-social-mail i,
    .td-social-print i {
      font-size: 15px
    }

    .td-social-twitter .td-icon-twitter {
      font-size: 12px
    }

    .td-social-pinterest .td-icon-pinterest {
      font-size: 13px
    }

    .td-social-whatsapp .td-icon-whatsapp {
      font-size: 18px
    }

    .td-social-copy_url {
      position: relative
    }

    .td-social-copy_url-disabled {
      pointer-events: none
    }

    .td-social-expand-tabs i {
      top: -2px;
      left: -1px;
      font-size: 16px
    }

    .td-ps-border .td-social-network .td-social-but-icon,
    .td-ps-border .td-social-network .td-social-but-text {
      line-height: 38px;
      border-width: 1px;
      border-style: solid
    }

    .td-ps-border .td-social-network .td-social-but-text {
      border-left-width: 0
    }

    .td-ps-border .td-social-network .td-social-but-text:before {
      background-color: #000;
      opacity: .08
    }

    .td-ps-border.td-ps-padding .td-social-network .td-social-but-icon {
      border-right-width: 0
    }

    .td-ps-border.td-ps-padding .td-social-network.td-social-expand-tabs .td-social-but-icon {
      border-right-width: 1px
    }

    .td-ps-border-grey .td-social-but-icon,
    .td-ps-border-grey .td-social-but-text {
      border-color: #e9e9e9
    }

    .td-ps-icon-color .td-social-facebook .td-social-but-icon {
      color: #516eab
    }

    .td-ps-icon-color .td-social-twitter .td-social-but-icon {
      color: #29c5f6
    }

    .td-ps-icon-color .td-social-pinterest .td-social-but-icon {
      color: #ca212a
    }

    .td-ps-icon-color .td-social-whatsapp .td-social-but-icon {
      color: #7bbf6a
    }

    .td-ps-icon-color .td-social-copy_url .td-social-but-icon,
    .td-ps-icon-color .td-social-mail .td-social-but-icon {
      color: #000
    }

    .td-ps-icon-color .td-social-print .td-social-but-icon {
      color: #333
    }

    .td-ps-padding .td-social-network .td-social-but-icon {
      padding-left: 17px;
      padding-right: 17px
    }

    .td-ps-padding .td-social-handler .td-social-but-icon {
      width: 40px
    }

    .td-ps-padding .td-social-expand-tabs .td-social-but-icon {
      padding-right: 13px
    }

    .td-ps-padding .td-social-expand-tabs .td-social-but-icon {
      padding-left: 13px
    }

    .td-ps-rounded .td-social-network .td-social-but-icon {
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px
    }

    .td-ps-rounded .td-social-network .td-social-but-text {
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px
    }

    .td-ps-rounded .td-social-expand-tabs {
      border-radius: 100px
    }

    @media (max-width:767px) {
      .td-post-sharing-style18 .td-social-share-text {
        display: none !important
      }
    }

    .td_block_social_counter {
      font-family: 'Open Sans', arial, sans-serif;
      font-weight: 700;
      font-size: 11px;
      color: #fff;
      margin-bottom: 47px
    }

    .td_block_social_counter .td-sp {
      position: relative
    }

    .td_block_social_counter .td-sp:after {
      content: '';
      width: 1px;
      height: 16px;
      background-color: rgba(255, 255, 255, .1);
      position: absolute;
      right: -1px;
      top: 8px
    }

    .td-social-list:after,
    .td-social-list:before {
      display: table;
      content: '';
      line-height: 0
    }

    .td-social-list:after {
      clear: both
    }

    .td_social_type {
      width: 100%;
      margin-bottom: 10px;
      -webkit-transition: background-color .2s cubic-bezier(0, 0, .58, 1);
      transition: background-color .2s cubic-bezier(0, 0, .58, 1) 0s
    }

    .td_social_type:last-child {
      margin-bottom: 0
    }

    .td_social_type:hover .td-social-box {
      background-color: #222
    }

    .td_social_type .td_social_info {
      padding: 0 0 0 9px;
      position: relative;
      top: -12px
    }

    .td_social_type .td-social-box {
      height: 32px;
      position: relative;
      overflow: hidden
    }

    .td_social_type .td-social-box .td-sp {
      display: inline-block
    }

    .td_social_type .td_social_button {
      float: right;
      border-left: 1px solid rgba(255, 255, 255, .1);
      padding: 0 14px;
      margin-top: 8px;
      top: 9px;
      height: 16px;
      line-height: 15px;
      text-transform: uppercase
    }

    .td_social_type .td_social_button a {
      color: #fff
    }

    .td_social_type .td_social_button a:after {
      content: '';
      display: block;
      height: 32px;
      position: absolute;
      right: 0;
      top: 0;
      width: 324px
    }

    .td_social_type .td_social_button a:hover {
      color: inherit;
      text-decoration: none !important
    }

    .td_social_type a {
      color: #fff
    }

    .td_social_facebook .td-social-box {
      background-color: #516eab
    }

    .td_social_youtube .td-social-box {
      background-color: #e14e42
    }

    .td_social_instagram .td-social-box {
      background-color: #417096
    }

    .td-social-boxed .td_social_type {
      text-align: center;
      width: 33.3333%;
      margin: 0;
      float: left
    }

    .td-social-boxed .td_social_type .td-social-box {
      height: 100px
    }

    .td-social-boxed .td_social_type span {
      display: block;
      width: 100%;
      padding: 0
    }

    .td-social-boxed .td-sp {
      margin-top: 10px
    }

    .td-social-boxed .td-sp::after {
      display: none
    }

    .td-social-boxed .td_social_info {
      font-size: 17px;
      top: 0
    }

    .td-social-boxed .td_social_info_name {
      font-size: 13px;
      font-weight: 400
    }

    .td-social-boxed .td_social_button {
      opacity: 0;
      position: absolute;
      height: 100%;
      margin-top: 0;
      top: 0
    }

    .td-social-boxed .td_social_button a:after {
      width: 100%;
      height: 100%
    }

    .td-social-font-icons .td-sp {
      background: 0 0;
      font-family: newspaper, sans-serif;
      font-size: 14px;
      text-align: center;
      font-weight: 400
    }

    .td-social-font-icons .td-sp:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      line-height: 30px
    }

    .td-social-font-icons .td_social_facebook .td-sp:before {
      content: '\e818';
      color: #516eab
    }

    .td-social-font-icons .td_social_youtube .td-sp:before {
      content: '\e836';
      color: #e14e42
    }

    .td-social-font-icons .td_social_instagram .td-sp:before {
      content: '\e81d';
      color: #417096
    }

    .td_block_social_counter.td-social-style8 {
      color: #000
    }

    .td_block_social_counter.td-social-style8 .td-social-list {
      margin-left: -8px;
      margin-right: -8px
    }

    .td_block_social_counter.td-social-style8 .td_social_type .td-social-box {
      background-color: transparent;
      border: 1px solid #ededed;
      margin: 0 8px 16px
    }

    .td_block_social_counter.td-social-style8 .td_social_type .td_social_button {
      margin-top: 7px
    }

    .td_block_social_counter.td-social-style8 .td_social_type a {
      color: #000
    }

    .td_block_social_counter.td-social-style8 .td_social_type:hover {
      color: #555
    }

    .td_block_social_counter.td-social-style8 .td_social_type:hover .td_social_type a {
      color: #555
    }

    .td_block_social_counter.td-social-style8 .td-sp {
      font-size: 28px
    }

    .td_block_social_counter.td-social-style8 .td-sp:after {
      top: 7px;
      background-color: #000;
      opacity: .1
    }

    .td_block_social_counter.td-social-style8 .td_social_button {
      border-color: #ededed
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .td_social_type .td_social_button a:after {
        width: 300px
      }

      @media (min-width:768px) {
        .tdi_73 {
          margin-left: -10px;
          margin-right: -10px
        }

        .tdi_73 .vc_column {
          padding-left: 10px;
          padding-right: 10px
        }
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .td_social_type .td_social_button a:after {
        width: 228px
      }

      .td-social-boxed .td_social_type .td-social-box {
        height: 70px
      }

      .td-social-boxed .td-sp {
        margin-top: 4px
      }

      .td-social-boxed .td_social_info {
        font-size: 13px;
        top: -12px
      }

      .td-social-boxed .td_social_info_name {
        top: -17px;
        font-size: 10px
      }

      .td_block_social_counter.td-social-style8 .td_social_type .td-social-box {
        margin: 0 2px 4px
      }

      .td_block_social_counter.td-social-style8 .td-sp {
        font-size: 21px
      }
    }

    .td_block_text_with_title {
      margin-bottom: 44px;
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }

    .td_block_text_with_title p:last-child {
      margin-bottom: 0
    }

    .tdi_71 {
      min-height: 0
    }

    .tdi_71>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background-color: #fff !important
    }

    .tdi_73 {
      min-height: 0
    }

    .tdi_73 {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-end
    }

    .tdi_75 {
      vertical-align: baseline
    }

    .tdi_75>.wpb_wrapper,
    .tdi_75>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_75>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_75>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_75>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_75 {
      padding-bottom: 50px !important
    }

    @media (max-width:767px) {
      .td_social_type .td_social_button a:after {
        width: 100%
      }

      .td_block_social_counter.td-social-style8 .td-social-list {
        margin-left: -2px;
        margin-right: -2px
      }

      .td_block_social_counter.td-social-style8 .td_social_type .td-social-box {
        margin: 0 2px 4px
      }

      .td_block_social_counter.td-social-style8 .td-sp {
        font-size: 28px
      }

      .tdi_73 {
        flex-direction: column;
        align-items: flex-start
      }

      .tdi_73 {
        margin-top: 0 !important
      }

      .tdi_75 {
        padding-bottom: 30px !important
      }

      .td_block_template_2 .td-related-title a {
        font-size: 15px
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_75 {
        padding-bottom: 40px !important
      }
    }

    .td_block_template_2.widget>ul>li {
      margin-left: 0 !important
    }

    .td_block_template_2 .td-block-title {
      font-size: 17px;
      font-weight: 500;
      margin-top: 0;
      margin-bottom: 16px;
      line-height: 31px;
      text-align: left
    }

    .td_block_template_2 .td-block-title>* {
      color: #000
    }

    .td_block_template_2 .td-related-title a {
      padding: 0 20px 0 0
    }

    .td_block_template_2 .td-related-title .td-cur-simple-item {
      color: #4db2ec
    }

    .td-theme-wrap .tdi_76 .td-block-title>*,
    .td-theme-wrap .tdi_76 .td-pulldown-filter-link:hover,
    .td-theme-wrap .tdi_76 .td-subcat-item .td-cur-simple-item,
    .td-theme-wrap .tdi_76 .td-subcat-item a:hover {
      color: #000
    }

    .td-theme-wrap .tdi_76 .td_module_wrap:hover .entry-title a {
      color: #000
    }

    .td-theme-wrap .tdi_76 .td-post-category:hover {
      background-color: #000
    }

    .tdi_76 {
      margin-bottom: 24px !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_76 {
        margin-bottom: 20px !important
      }
    }

    body .tdi_76 .td-block-title a,
    body .tdi_76 .td-block-title span {
      font-family: 'Fira Sans' !important;
      font-size: 36px !important;
      line-height: 1 !important;
      font-weight: 800 !important
    }

    @media (min-width:1019px) and (max-width:1140px) {

      body .tdi_76 .td-block-title a,
      body .tdi_76 .td-block-title span {
        font-family: 'Fira Sans' !important;
        font-size: 32px !important;
        line-height: 1 !important;
        font-weight: 800 !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_75 {
        padding-bottom: 30px !important
      }

      .tdi_76 {
        margin-bottom: 18px !important
      }

      body .tdi_76 .td-block-title a,
      body .tdi_76 .td-block-title span {
        font-family: 'Fira Sans' !important;
        font-size: 24px !important;
        line-height: 1 !important;
        font-weight: 800 !important
      }
    }

    @media (max-width:767px) {
      .tdi_76 {
        margin-top: 15px !important;
        margin-bottom: 16px !important
      }

      body .tdi_76 .td-block-title a,
      body .tdi_76 .td-block-title span {
        font-family: 'Fira Sans' !important;
        font-size: 24px !important;
        line-height: 1 !important;
        font-weight: 800 !important
      }
    }

    .tdi_77 {
      margin-bottom: 30px !important;
      width: 94% !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_77 {
        margin-bottom: 25px !important;
        width: 70% !important
      }
    }

    .tdm_block.tdm_block_inline_text {
      margin-bottom: 0;
      vertical-align: top
    }

    .tdm_block.tdm_block_inline_text .tdm-descr {
      margin-bottom: 0;
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }

    .tdi_77 {
      text-align: left !important
    }

    .tdi_77 .tdm-descr {
      color: rgba(0, 0, 0, .7);
      font-family: 'Fira Sans' !important;
      font-size: 16px !important;
      line-height: 1.8 !important;
      font-weight: 400 !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_77 .tdm-descr {
        font-family: 'Fira Sans' !important;
        font-size: 15px !important;
        line-height: 1.8 !important;
        font-weight: 400 !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_77 {
        margin-bottom: 20px !important;
        width: 90% !important
      }

      .tdi_77 .tdm-descr {
        font-family: 'Fira Sans' !important;
        font-size: 14px !important;
        line-height: 1.7 !important;
        font-weight: 400 !important
      }
    }

    @media (max-width:767px) {
      .tdi_77 {
        margin-bottom: 25px !important;
        width: 100% !important
      }

      .tdi_78 {
        margin-bottom: 15px !important;
        text-align: left !important
      }
    }

    .tdm_block.tdm_block_socials {
      margin-bottom: 0
    }

    .tdm-social-wrapper:after,
    .tdm-social-wrapper:before {
      display: table;
      content: '';
      line-height: 0
    }

    .tdm-social-wrapper:after {
      clear: both
    }

    .tdm-social-item-wrap {
      display: inline-block
    }

    .tdm-social-item {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      -webkit-transition: .2s;
      transition: all .2s;
      text-align: center;
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }

    .tdm-social-item i {
      font-size: 14px;
      color: #4db2ec;
      -webkit-transition: .2s;
      transition: all .2s
    }

    .tdm-social-text {
      display: none;
      margin-top: -1px;
      vertical-align: middle;
      font-size: 13px;
      color: #4db2ec;
      -webkit-transition: .2s;
      transition: all .2s
    }

    .tdm-social-item-wrap:hover .tdm-social-text,
    .tdm-social-item-wrap:hover i {
      color: #000
    }

    .tdm-social-item-wrap:last-child .tdm-social-text {
      margin-right: 0 !important
    }

    .tds-social3 .tdm-social-item {
      background-color: #4db2ec
    }

    .tds-social3 .tdm-social-item:hover {
      background-color: #000
    }

    .tds-social3 .tdm-social-item i {
      color: #fff
    }

    .tdi_79 .tdm-social-item i {
      font-size: 15px;
      vertical-align: middle
    }

    .tdi_79 .tdm-social-item i.td-icon-pinterest,
    .tdi_79 .tdm-social-item i.td-icon-twitter {
      font-size: 12px
    }

    .tdi_79 .tdm-social-item {
      width: 34.5px;
      height: 34.5px;
      line-height: 34.5px;
      margin: 5px 10px 5px 0;
      border-radius: 100px
    }

    .tdi_79 .tdm-social-item-wrap:last-child .tdm-social-item {
      margin-right: 0 !important
    }

    body .tdi_79 .tdm-social-item {
      background: -webkit-linear-gradient(0deg, #8224e3, #000);
      background: linear-gradient(0deg, #8224e3, #000)
    }

    body .tdi_79 .tdm-social-item-wrap:hover .tdm-social-item {
      background-color: #db4e5a
    }

    .tdi_79 .tdm-social-text {
      margin-left: 0;
      margin-right: 0;
      display: none
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_79 .tdm-social-item i {
        font-size: 14px;
        vertical-align: middle
      }

      .tdi_79 .tdm-social-item i.td-icon-pinterest,
      .tdi_79 .tdm-social-item i.td-icon-twitter {
        font-size: 11.2px
      }

      .tdi_79 .tdm-social-item {
        width: 30.8px;
        height: 30.8px;
        line-height: 30.8px
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_79 .tdm-social-item i {
        font-size: 13px;
        vertical-align: middle
      }

      .tdi_79 .tdm-social-item i.td-icon-pinterest,
      .tdi_79 .tdm-social-item i.td-icon-twitter {
        font-size: 10.4px
      }

      .tdi_79 .tdm-social-item {
        width: 28.6px;
        height: 28.6px;
        line-height: 28.6px
      }
    }

    .tdi_81 {
      vertical-align: baseline
    }

    .tdi_81>.wpb_wrapper,
    .tdi_81>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_81>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_81>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_81>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_83>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background-color: #f4f7f7
    }

    .tdi_83 {
      position: relative !important;
      top: 0;
      transform: none;
      -webkit-transform: none
    }

    .tdi_83 {
      display: block
    }

    .tdi_83 {
      padding-top: 100px !important;
      padding-right: 100px !important;
      padding-bottom: 100px !important;
      padding-left: 100px !important;
      position: relative
    }

    .tdi_83 .td_block_wrap {
      text-align: left
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_83 {
        padding-top: 80px !important;
        padding-right: 60px !important;
        padding-bottom: 80px !important;
        padding-left: 60px !important
      }

      @media (min-width:768px) {
        .tdi_89 {
          margin-left: -10px;
          margin-right: -10px
        }

        .tdi_89 .vc_column {
          padding-left: 10px;
          padding-right: 10px
        }
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_83 {
        padding-top: 70px !important;
        padding-right: 30px !important;
        padding-bottom: 70px !important;
        padding-left: 30px !important
      }
    }

    @media (max-width:767px) {
      .tdi_83 {
        padding-top: 40px !important;
        padding-right: 0 !important;
        padding-bottom: 60px !important;
        padding-left: 0 !important
      }
    }

    .tdi_82_rand_style {
      background-color: #fff !important
    }

    .tdi_85 {
      vertical-align: baseline
    }

    .tdi_85 .vc_column-inner>.wpb_wrapper,
    .tdi_85 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_85 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    .tdi_86 {
      margin-bottom: 0 !important
    }

    .tdi_87 button,
    .tdi_87 input[type=email] {
      font-family: Montserrat !important;
      font-size: 11px !important
    }

    .tdi_87 .tdn-email-bar {
      flex-direction: column
    }

    .tdi_87 .tdn-input-wrap {
      margin-bottom: 13px
    }

    .tdi_87 input {
      color: #000;
      border-width: 2px;
      border-color: #000
    }

    .tdi_87 input::placeholder {
      color: #5b6b75
    }

    .tdi_87 input:-ms-input-placeholder {
      color: #5b6b75 !important
    }

    .tdi_87 input:focus {
      border-color: #5b6b75 !important
    }

    .tdi_87 button {
      background-color: #000;
      border-width: 0;
      border-style: solid;
      border-color: #e1e1e1;
      font-family: Montserrat !important;
      font-size: 11px !important;
      text-transform: uppercase !important
    }

    .tdi_87 button:hover {
      background-color: #db4e5a
    }

    .tdi_89 {
      min-height: 0
    }

    .tdi_89>.td-element-style:after {
      content: '' !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 0 !important;
      display: block !important;
      background-color: #f4f7f7
    }

    .tdi_89 {
      display: block
    }

    .tdi_89 {
      padding-top: 50px !important
    }

    .tdi_89 .td_block_wrap {
      text-align: left
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_89 {
        padding-top: 30px !important
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_89 {
        padding-top: 40px !important
      }
    }

    .tdi_91 {
      vertical-align: baseline
    }

    .tdi_91>.wpb_wrapper,
    .tdi_91>.wpb_wrapper>.tdc-elements {
      display: block
    }

    .tdi_91>.wpb_wrapper>.tdc-elements {
      width: 100%
    }

    .tdi_91>.wpb_wrapper>.vc_row_inner {
      width: auto
    }

    .tdi_91>.wpb_wrapper {
      width: auto;
      height: auto
    }

    .tdi_92 {
      display: inline-block
    }

    .tdi_92 .tdb-logo-a,
    .tdi_92 h1 {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start
    }

    .tdi_92 .tdb-logo-text-tagline {
      margin-top: 5px;
      margin-left: 0;
      display: block;
      background: -webkit-linear-gradient(-90deg, #db4e5a, #000);
      background: linear-gradient(-90deg, #db4e5a, #000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Fira Sans' !important;
      font-size: 12px !important;
      line-height: 1 !important;
      font-weight: 700 !important;
      text-transform: capitalize !important;
      letter-spacing: 0 !important
    }

    .tdi_92 .tdb-logo-text-title {
      display: block;
      background: -webkit-linear-gradient(-90deg, #2828ff, #000);
      background: linear-gradient(-90deg, #2828ff, #000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Work Sans' !important;
      font-size: 25px !important;
      line-height: 1 !important;
      font-weight: 800 !important;
      letter-spacing: 1px !important
    }

    .tdi_92 .tdb-logo-text-wrap {
      flex-direction: column;
      align-items: flex-start
    }

    html[class*=ie] .tdi_92 .tdb-logo-text-title {
      background: 0 0;
      color: #000
    }

    .tdi_92 .tdb-logo-a:hover .tdb-logo-text-title {
      color: #219caf;
      background: 0 0;
      -webkit-text-fill-color: initial;
      background-position: center center
    }

    html[class*=ie] .tdi_92 .tdb-logo-text-tagline {
      background: 0 0;
      color: #000
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_92 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 20px !important;
        line-height: 1 !important;
        font-weight: 800 !important;
        letter-spacing: 1px !important
      }

      .tdi_92 .tdb-logo-text-tagline {
        font-family: 'Fira Sans' !important;
        font-size: 8px !important;
        line-height: 1 !important;
        font-weight: 700 !important;
        text-transform: capitalize !important;
        letter-spacing: -.2px !important
      }
    }

    @media (max-width:767px) {
      .tdi_89 {
        padding-top: 0 !important
      }

      .tdi_92 .tdb-logo-text-tagline {
        margin-top: 10px;
        margin-left: 0;
        font-family: 'Fira Sans' !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 700 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }

      .tdi_92 .tdb-logo-text-title {
        font-family: 'Work Sans' !important;
        font-size: 25px !important;
        line-height: 1 !important;
        font-weight: 800 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }

      .td_block_template_16 .td-related-title a {
        font-size: 15px
      }
    }

    .tdi_94 {
      position: relative !important;
      top: 0;
      transform: none;
      -webkit-transform: none
    }

    .tdi_94 {
      display: block
    }

    @media (min-width:768px) {
      .tdi_94 {
        margin-left: -40px;
        margin-right: -40px
      }

      .tdi_94 .vc_column_inner {
        padding-left: 40px;
        padding-right: 40px
      }
    }

    @media (min-width:1019px) and (max-width:1140px) {
      @media (min-width:768px) {
        .tdi_94 {
          margin-left: -30px;
          margin-right: -30px
        }

        .tdi_94 .vc_column_inner {
          padding-left: 30px;
          padding-right: 30px
        }
      }
    }

    .tdi_94 {
      margin-top: 20px !important;
      margin-bottom: 20px !important
    }

    .tdi_94 .td_block_wrap {
      text-align: left
    }

    @media (min-width:768px) and (max-width:1018px) {
      @media (min-width:768px) {
        .tdi_94 {
          margin-left: -10px;
          margin-right: -10px
        }

        .tdi_94 .vc_column_inner {
          padding-left: 10px;
          padding-right: 10px
        }
      }

      .tdi_94 {
        margin-top: 15px !important;
        margin-bottom: 15px !important
      }
    }

    .tdi_96 {
      vertical-align: baseline
    }

    .tdi_96 .vc_column-inner>.wpb_wrapper,
    .tdi_96 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_96 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    .td_block_template_16.widget>ul>li {
      margin-left: 0 !important
    }

    .td_block_template_16 .td-block-title {
      font-size: 17px;
      font-weight: 500;
      margin-top: -15px;
      margin-bottom: 26px;
      padding: 0;
      line-height: 47px;
      position: relative;
      overflow: hidden;
      text-align: left
    }

    .td_block_template_16 .td-block-title:after,
    .td_block_template_16 .td-block-title:before {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      background-color: #ddd
    }

    .td_block_template_16 .td-block-title:before {
      bottom: 4px
    }

    .td_block_template_16 .td-block-title:after {
      bottom: 0
    }

    .td_block_template_16 .td-block-title-wrap .td-subcat-filter {
      line-height: 47px;
      display: table
    }

    .td_block_template_16 .td-related-title a {
      margin-right: 20px
    }

    .td_block_template_16 .td-related-title .td-cur-simple-item {
      color: #4db2ec
    }

    .tdi_97 {
      margin-bottom: 0 !important
    }

    .tdi_97 .td-image-wrap {
      padding-bottom: 130%
    }

    .tdi_97 .entry-thumb {
      background-position: center 50%;
      background-image: none !important
    }

    .tdi_97 .td-image-container {
      flex: 0 0 30%;
      width: 30%;
      display: none
    }

    .ie10 .tdi_97 .td-image-container,
    .ie11 .tdi_97 .td-image-container {
      flex: 0 0 auto
    }

    .tdi_97 .td-module-meta-info {
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-color: #eaeaea
    }

    .tdi_97 .td-category-pos-above .td-post-category {
      align-self: flex-start
    }

    .tdi_97 .td_module_wrap {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      margin-bottom: 0
    }

    .tdi_97 .td_block_inner {
      margin-left: 0;
      margin-right: 0
    }

    .tdi_97 .td-module-container:before {
      bottom: 0;
      border-color: #eaeaea
    }

    .tdi_97 .td-module-container {
      border-width: 0 0 1px;
      border-style: solid;
      border-color: #000;
      border-style: dashed !important;
      border-color: rgba(0, 0, 0, .46) !important
    }

    .tdi_97 .td-post-vid-time {
      display: none
    }

    .tdi_97 .td-post-category {
      margin: 0 0 5px;
      padding: 0;
      background-color: rgba(255, 255, 255, 0);
      color: #8224e3;
      font-family: 'Fira Sans' !important;
      font-weight: 500 !important;
      text-transform: capitalize !important;
      letter-spacing: 1px !important
    }

    .tdi_97 .td-author-date {
      display: none
    }

    .tdi_97 .td-post-author-name {
      display: none
    }

    .tdi_97 .td-post-author-name span,
    .tdi_97 .td-post-date {
      display: none
    }

    .tdi_97 .td_module_wrap:nth-last-child(1) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_97 .td_module_wrap:nth-last-child(1) .td-module-container:before {
      display: none
    }

    .tdi_97 .td-post-category:hover {
      background-color: rgba(255, 255, 255, 0) !important;
      color: #ea1717
    }

    .tdi_97 .td-module-title a {
      color: #000
    }

    .tdi_97 .td_module_wrap:hover .td-module-title a {
      color: #db4e5a !important
    }

    .tdi_97 .entry-title {
      margin: 0;
      font-family: 'Fira Sans' !important;
      font-size: 14px !important;
      line-height: 1.3 !important;
      font-weight: 400 !important;
      text-transform: capitalize !important;
      letter-spacing: 1px !important
    }

    .tdi_97 .td-block-title a,
    .tdi_97 .td-block-title span {
      font-family: 'Fira Sans' !important;
      font-weight: 700 !important
    }

    .tdi_97 .td-editor-date,
    .tdi_97 .td-editor-date .entry-date,
    .tdi_97 .td-editor-date .td-post-author-name a {
      font-family: Montserrat !important;
      text-transform: uppercase !important
    }

    html:not([class*=ie]) .tdi_97 .td-module-container:hover .entry-thumb:before {
      opacity: 0
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_97 .td-image-container {
        display: none
      }

      .tdi_97 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_97 .td-module-container:before {
        bottom: 0
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_97 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_97 .entry-title {
        font-family: 'Fira Sans' !important;
        font-size: 13px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_97 .td-image-wrap {
        padding-bottom: 140%
      }

      .tdi_97 .td-image-container {
        display: none
      }

      .tdi_97 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_97 .td-module-container:before {
        bottom: 0
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_97 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_97 .entry-title {
        font-family: 'Fira Sans' !important;
        font-size: 12px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }
    }

    @media (max-width:767px) {
      .tdi_97 {
        margin-bottom: 40px !important
      }

      .tdi_97 .td-image-container {
        display: none
      }

      .tdi_97 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_97 .td-module-container:before {
        bottom: 0
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_97 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_97 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_100 {
        margin-bottom: 40px !important
      }
    }

    .tdi_99 {
      vertical-align: baseline
    }

    .tdi_99 .vc_column-inner>.wpb_wrapper,
    .tdi_99 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_99 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    .tdi_100 .td-image-wrap {
      padding-bottom: 130%
    }

    .tdi_100 .entry-thumb {
      background-position: center 50%;
      background-image: none !important
    }

    .tdi_100 .td-image-container {
      flex: 0 0 30%;
      width: 30%;
      display: none
    }

    .ie10 .tdi_100 .td-image-container,
    .ie11 .tdi_100 .td-image-container {
      flex: 0 0 auto
    }

    .tdi_100 .td-module-meta-info {
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-color: #eaeaea
    }

    .tdi_100 .td-category-pos-above .td-post-category {
      align-self: flex-start
    }

    .tdi_100 .td_module_wrap {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      margin-bottom: 0
    }

    .tdi_100 .td_block_inner {
      margin-left: 0;
      margin-right: 0
    }

    .tdi_100 .td-module-container:before {
      bottom: 0;
      border-color: #eaeaea
    }

    .tdi_100 .td-module-container {
      border-width: 0 0 1px;
      border-style: solid;
      border-color: #000;
      border-style: dashed !important;
      border-color: rgba(0, 0, 0, .46) !important
    }

    .tdi_100 .td-post-vid-time {
      display: none
    }

    .tdi_100 .td-post-category {
      margin: 0 0 5px;
      padding: 0;
      background-color: rgba(255, 255, 255, 0);
      color: #8224e3;
      font-family: 'Fira Sans' !important;
      font-weight: 500 !important;
      text-transform: capitalize !important;
      letter-spacing: 1px !important
    }

    .tdi_100 .td-author-date {
      display: none
    }

    .tdi_100 .td-post-author-name {
      display: none
    }

    .tdi_100 .td-post-author-name span,
    .tdi_100 .td-post-date {
      display: none
    }

    .tdi_100 .td_module_wrap:nth-last-child(1) {
      margin-bottom: 0;
      padding-bottom: 0
    }

    .tdi_100 .td_module_wrap:nth-last-child(1) .td-module-container:before {
      display: none
    }

    .tdi_100 .td-post-category:hover {
      background-color: rgba(255, 255, 255, 0) !important;
      color: #ea1717
    }

    .tdi_100 .td-module-title a {
      color: #000
    }

    .tdi_100 .td_module_wrap:hover .td-module-title a {
      color: #db4e5a !important
    }

    .tdi_100 .entry-title {
      margin: 0;
      font-family: 'Fira Sans' !important;
      font-size: 14px !important;
      line-height: 1.3 !important;
      font-weight: 400 !important;
      text-transform: capitalize !important;
      letter-spacing: 1px !important
    }

    .tdi_100 .td-block-title a,
    .tdi_100 .td-block-title span {
      font-family: 'Fira Sans' !important;
      font-weight: 700 !important
    }

    .tdi_100 .td-editor-date,
    .tdi_100 .td-editor-date .entry-date,
    .tdi_100 .td-editor-date .td-post-author-name a {
      font-family: Montserrat !important;
      text-transform: uppercase !important
    }

    html:not([class*=ie]) .tdi_100 .td-module-container:hover .entry-thumb:before {
      opacity: 0
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_100 .td-image-container {
        display: none
      }

      .tdi_100 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_100 .td-module-container:before {
        bottom: 0
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_100 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_100 .entry-title {
        font-family: 'Fira Sans' !important;
        font-size: 13px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_100 .td-image-wrap {
        padding-bottom: 140%
      }

      .tdi_100 .td-image-container {
        display: none
      }

      .tdi_100 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_100 .td-module-container:before {
        bottom: 0
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_100 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }

      .tdi_100 .entry-title {
        font-family: 'Fira Sans' !important;
        font-size: 12px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        text-transform: capitalize !important;
        letter-spacing: 1px !important
      }
    }

    @media (max-width:767px) {
      .tdi_100 .td-image-container {
        display: none
      }

      .tdi_100 .td_module_wrap {
        padding-bottom: 0;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important
      }

      .tdi_100 .td-module-container:before {
        bottom: 0
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important
      }

      .tdi_100 .td_module_wrap .td-module-container:before {
        display: block !important
      }

      .tdi_100 .td_module_wrap:nth-last-child(1) .td-module-container:before {
        display: none !important
      }
    }

    .tdi_102 {
      vertical-align: baseline
    }

    .tdi_102 .vc_column-inner>.wpb_wrapper,
    .tdi_102 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_102 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    body .tdi_103 .td-block-title a,
    body .tdi_103 .td-block-title span {
      font-family: 'Fira Sans' !important;
      font-weight: 700 !important
    }

    .tdb_search_form {
      margin-bottom: 40px
    }

    .tdb_search_form .tdb-search-form-inner {
      position: relative;
      display: flex;
      background-color: #fff
    }

    .tdb_search_form .tdb-search-form-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid #e1e1e1;
      pointer-events: none;
      transition: all .3s ease
    }

    .tdb_search_form .tdb-search-form-input:focus+.tdb-search-form-border {
      border-color: #b0b0b0
    }

    .tdb_search_form .tdb-search-form-btn,
    .tdb_search_form .tdb-search-form-input {
      height: auto;
      min-height: 32px
    }

    .tdb_search_form .tdb-search-form-input {
      position: relative;
      flex: 1;
      background-color: transparent;
      line-height: 19px;
      border: 0
    }

    .tdb_search_form .tdb-search-form-btn {
      text-shadow: none;
      padding: 7px 15px 8px;
      line-height: 16px;
      margin: 0;
      background-color: #222;
      font-family: Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      z-index: 1;
      -webkit-transition: .3s;
      transition: all .3s ease
    }

    .tdb_search_form .tdb-search-form-btn:hover {
      background-color: #4db2ec
    }

    .tdb_search_form .tdb-search-form-btn i,
    .tdb_search_form .tdb-search-form-btn span {
      display: inline-block;
      vertical-align: middle
    }

    .tdb_search_form .tdb-search-form-btn i {
      position: relative;
      font-size: 12px
    }

    .tdb_search_form .tdb-search-form-btn svg {
      width: 12px;
      height: auto
    }

    .tdb_search_form .tdb-search-form-btn svg,
    .tdb_search_form .tdb-search-form-btn svg * {
      fill: #fff;
      -webkit-transition: .3s;
      transition: all .3s ease
    }

    .td-theme-wrap .tdi_104 {
      text-align: left
    }

    .tdi_106 {
      vertical-align: baseline
    }

    .tdi_106 .vc_column-inner>.wpb_wrapper,
    .tdi_106 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_106 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    .tdi_107 {
      margin-top: -3px !important;
      margin-bottom: 0 !important
    }

    .td_block_list_menu ul {
      flex-wrap: wrap;
      margin-left: 12px
    }

    .td_block_list_menu ul li {
      margin-left: 0
    }

    .td_block_list_menu .sub-menu {
      padding-left: 22px
    }

    .td_block_list_menu .sub-menu li {
      font-size: 13px
    }

    .td_block_list_menu li.current-menu-item>a {
      color: #4db2ec
    }

    .tdi_107 ul {
      margin: 0;
      text-align: left;
      justify-content: flex-start
    }

    .tdi_107 a {
      color: #000
    }

    body .tdi_107 a:hover,
    body .tdi_107 li.current-menu-item>a {
      color: #219caf
    }

    .tdi_107 .td-block-title a,
    .tdi_107 .td-block-title span {
      font-family: 'Fira Sans' !important
    }

    .tdi_107 li {
      font-family: 'Nunito Sans' !important;
      font-size: 14px !important;
      line-height: 2.2 !important;
      font-weight: 700 !important
    }

    @media (min-width:1019px) and (max-width:1140px) {
      .tdi_107 li {
        font-family: 'Nunito Sans' !important;
        font-size: 13px !important;
        line-height: 2.2 !important;
        font-weight: 700 !important
      }

      .hebba-hebbars_kn_top_ad {
        min-height: 110px !important
      }

      .hebba-content_para1 {
        min-height: 110px !important
      }

      .hebba-content_para2 {
        min-height: 110px !important
      }

      .hebba-content_h21 {
        min-height: 110px !important
      }

      .hebba-content_h22 {
        min-height: 110px !important
      }

      .hebba-content_h23 {
        min-height: 110px !important
      }

      .hebba-hebbars_bw_steps_1 {
        min-height: 110px !important
      }

      .hebba-hebbars_bw_steps_2 {
        min-height: 110px !important
      }
    }

    .tdi_109 {
      position: relative !important;
      top: 0;
      transform: none;
      -webkit-transform: none
    }

    .tdi_109 {
      display: block
    }

    .tdi_109 {
      padding-top: 12px !important;
      padding-bottom: 12px !important;
      border-color: #e5e5e5 !important;
      border-style: solid !important;
      border-width: 1px 0 0 !important
    }

    .tdi_109 .td_block_wrap {
      text-align: left
    }

    @media (min-width:768px) and (max-width:1018px) {
      .tdi_107 li {
        font-family: 'Nunito Sans' !important;
        font-size: 12px !important;
        line-height: 2.2 !important;
        font-weight: 700 !important
      }

      .tdi_109 {
        padding-top: 10px !important;
        padding-bottom: 10px !important
      }
    }

    .tdi_111 {
      vertical-align: baseline
    }

    .tdi_111 .vc_column-inner>.wpb_wrapper,
    .tdi_111 .vc_column-inner>.wpb_wrapper .tdc-elements {
      display: block
    }

    .tdi_111 .vc_column-inner>.wpb_wrapper .tdc-elements {
      width: 100%
    }

    @media (max-width:767px) {
      .tdi_112 {
        justify-content: center !important;
        text-align: center !important
      }
    }

    .tdi_112 {
      text-align: center !important;
      margin-right: auto;
      margin-left: auto
    }

    .tdi_112 .tdm-descr {
      color: rgba(0, 0, 0, .7);
      font-family: 'Fira Sans' !important;
      font-size: 12px !important;
      line-height: 1.2 !important;
      font-weight: 600 !important
    }

    .tdi_112 .tdm-descr a {
      color: #8224e3
    }

    .tdi_112 .tdm-descr a:hover {
      color: #219caf
    }

    .tdc-footer-template .td-main-content-wrap {
      padding-bottom: 0
    }

    #cat {
      color: #000
    }

    .tagdiv-type {
      font-size: 18px !important
    }

    .lwptoc_i {
      text-transform: capitalize
    }

    .btn {
      box-sizing: border-box;
      display: inline-block;
      text-align: left;
      white-space: nowrap;
      text-decoration: none;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid #ddd;
      padding: 4px 8px;
      margin: 5px auto;
      border-radius: 4px;
      color: #fff;
      fill: #fff;
      background: #000;
      line-height: 1em;
      min-width: 190px;
      height: 45px;
      transition: .2s ease-out;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
      -webkit-tap-highlight-color: transparent;
      font-weight: 500;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -moz-font-feature-settings: 'liga', 'kern'
    }

    .btn:focus,
    .btn:hover {
      background: #111;
      color: #fff;
      fill: #fff;
      border-color: #fff;
      -webkit-transform: scale(1.01) translate3d(0, -1px, 0);
      transform: scale(1.01) translate3d(0, -1px, 0);
      box-shadow: 0 4px 8px rgba(0, 0, 0, .2)
    }

    .btn:active {
      outline: 0;
      background: #353535;
      transition: none
    }

    .widget li {
      font-size: large;
      font-weight: 500
    }

    .td-aj-search-results .entry-title .td-module-title {
      font-size: 14px;
      line-height: 20px
    }

    .tagdiv-type ol li:not(.blocks-gallery-item),
    .tagdiv-type ul li:not(.blocks-gallery-item) {
      margin-bottom: 0
    }

    .td-post-template-default .wpb_video_wrapper {
      display: none
    }

    .tagdiv-type figure img {
      margin-bottom: 0;
      width: 200px;
      height: 200px
    }

    #Notes,
    #recipe-about,
    #recipe-card,
    #recipe-step-by-step,
    #recipe-video {
      font-family: Roboto !important;
      font-size: 24px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      margin-top: 30px !important;
      margin-bottom: 30px !important;
      line-height: 1.5;
      color: #000;
      text-align: left;
      padding: 0 12px;
      border-width: 0 0 0 4px;
      border-style: solid;
      border-color: #8224e3
    }

    @media (min-width:1141px) {
      .hebba-hebbars_kn_top_ad {
        min-height: 110px !important
      }

      .hebba-content_para1 {
        min-height: 110px !important
      }

      .hebba-content_para2 {
        min-height: 110px !important
      }

      .hebba-content_h21 {
        min-height: 110px !important
      }

      .hebba-content_h22 {
        min-height: 110px !important
      }

      .hebba-content_h23 {
        min-height: 110px !important
      }

      .hebba-hebbars_bw_steps_1 {
        min-height: 110px !important
      }

      .hebba-hebbars_bw_steps_2 {
        min-height: 110px !important
      }
    }

    body:not(:hover) fieldset.wprm-comment-ratings-container:focus-within span {
      outline: #4d90fe solid 1px
    }

    .comment-form-wprm-rating {
      text-align: left;
      margin-top: 5px;
      margin-bottom: 20px
    }

    .comment-form-wprm-rating .wprm-rating-stars {
      vertical-align: middle
    }

    fieldset.wprm-comment-ratings-container {
      position: relative;
      display: inline-block;
      padding: 0;
      margin: 0;
      border: 0;
      background: 0 0
    }

    fieldset.wprm-comment-ratings-container legend {
      position: absolute;
      opacity: 0
    }

    fieldset.wprm-comment-ratings-container br {
      display: none
    }

    fieldset.wprm-comment-ratings-container input[type=radio] {
      float: left;
      margin: 0 !important;
      padding: 0 !important;
      width: 16px;
      height: 16px;
      min-width: 0;
      min-height: 0;
      opacity: 0;
      border: 0;
      cursor: pointer
    }

    fieldset.wprm-comment-ratings-container input[type=radio]:first-child {
      margin-left: -16px
    }

    fieldset.wprm-comment-ratings-container span {
      position: absolute;
      pointer-events: none;
      width: 80px;
      height: 16px;
      top: 0;
      left: 0;
      opacity: 0;
      font-size: 0
    }

    fieldset.wprm-comment-ratings-container span svg {
      width: 100% !important;
      height: 100% !important
    }

    fieldset.wprm-comment-ratings-container input:checked+span,
    fieldset.wprm-comment-ratings-container input:hover+span {
      opacity: 1
    }

    fieldset.wprm-comment-ratings-container input:hover+span~span {
      display: none
    }

    .rtl .comment-form-wprm-rating {
      text-align: right
    }

    .rtl fieldset.wprm-comment-ratings-container span {
      left: inherit;
      right: 0
    }

    .rtl fieldset.wprm-comment-ratings-container span svg {
      transform: scale(-1, 1)
    }

    .wprm-rating-star svg {
      display: inline;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      margin: 0
    }

    .wprm-recipe-container {
      outline: 0
    }

    .wprm-recipe {
      overflow: hidden;
      zoom: 1;
      text-align: left;
      clear: both
    }

    .wprm-recipe * {
      box-sizing: border-box
    }

    .wprm-recipe ol,
    .wprm-recipe ul {
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
      -webkit-padding-start: 0;
      margin: 0;
      padding: 0
    }

    .wprm-recipe li {
      font-size: 1em;
      margin: 0 0 0 32px;
      padding: 0
    }

    .wprm-recipe p {
      font-size: 1em;
      margin: 0;
      padding: 0
    }

    .wprm-recipe li,
    .wprm-recipe li.wprm-recipe-instruction {
      list-style-position: outside
    }

    .wprm-recipe li:before {
      display: none
    }

    .wprm-recipe h1,
    .wprm-recipe h2,
    .wprm-recipe h3,
    .wprm-recipe h4 {
      clear: none;
      font-variant: normal;
      text-transform: none;
      letter-spacing: normal;
      margin: 0;
      padding: 0
    }

    .wprm-recipe a.wprm-recipe-link,
    .wprm-recipe a.wprm-recipe-link:hover {
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none
    }

    body:not(.wprm-print) .wprm-recipe p:first-letter {
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      margin: inherit;
      padding: inherit;
      font-family: inherit
    }

    .rtl .wprm-recipe {
      text-align: right
    }

    .rtl .wprm-recipe li {
      margin: 0 32px 0 0
    }

    .wprm-screen-reader-text {
      border: 0;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute !important;
      width: 1px;
      word-wrap: normal !important
    }

    .wprm-call-to-action.wprm-call-to-action-simple {
      margin-top: 10px;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: middle
    }

    .wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-icon {
      font-size: 2.2em;
      margin: 5px .5em 5px 0
    }

    .wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-icon svg {
      margin-top: 0
    }

    .wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container {
      margin: 5px 0
    }

    .wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container .wprm-call-to-action-header {
      display: block;
      font-weight: 700;
      font-size: 1.3em
    }

    @media all and (max-width:450px) {
      .wprm-call-to-action.wprm-call-to-action-simple {
        flex-wrap: wrap
      }

      .wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container {
        text-align: center
      }
    }

    .wprm-recipe-details-container-table {
      display: flex;
      border: 1px dotted #666;
      padding: 5px;
      margin: 5px 0
    }

    .wprm-recipe-details-container-table .wprm-recipe-block-container-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center
    }

    @media all and (min-width:451px) {
      .wprm-recipe-table-borders-inside .wprm-recipe-block-container-table {
        border-top: none !important;
        border-bottom: none !important;
        border-right: none !important
      }

      .wprm-recipe-table-borders-inside .wprm-recipe-block-container-table:first-child {
        border-left: none !important
      }

      .rtl .wprm-recipe-table-borders-inside .wprm-recipe-block-container-table {
        border-left: none !important
      }

      .rtl .wprm-recipe-table-borders-inside .wprm-recipe-block-container-table:first-child {
        border-right: none !important
      }
    }

    @media all and (max-width:450px) {
      .wprm-recipe-details-container-table {
        display: block;
        border: none !important;
        padding: 0;
        margin: 5px 0
      }

      .wprm-recipe-details-container-table.wprm-recipe-table-borders-none {
        display: flex;
        flex-wrap: wrap
      }

      .wprm-recipe-details-container-table.wprm-recipe-table-borders-none .wprm-recipe-block-container-table {
        min-width: 120px;
        max-width: 100%
      }

      .wprm-recipe-details-container-table .wprm-recipe-block-container-table {
        padding: 5px
      }
    }

    .wprm-recipe-details-unit {
      font-size: .8em
    }

    @media only screen and (max-width:600px) {
      .wprm-recipe-details-unit {
        font-size: 1em
      }
    }

    .wprm-container-columns-spaced,
    .wprm-container-columns-spaced-middle {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between
    }

    .wprm-container-columns-spaced-middle.wprm-container-columns-spaced-middle,
    .wprm-container-columns-spaced.wprm-container-columns-spaced-middle {
      align-items: center
    }

    .wprm-container-columns-spaced-middle>*,
    .wprm-container-columns-spaced>* {
      flex: 1
    }

    .wprm-container-columns-spaced-middle.wprm-container-columns-gutter,
    .wprm-container-columns-spaced.wprm-container-columns-gutter {
      margin-left: -8px;
      margin-right: -8px
    }

    .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>*,
    .wprm-container-columns-spaced.wprm-container-columns-gutter>* {
      margin-left: 8px !important;
      margin-right: 8px !important
    }

    .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>.wprm-recipe-grow-container,
    .wprm-container-columns-spaced.wprm-container-columns-gutter>.wprm-recipe-grow-container {
      margin-left: 0 !important;
      margin-right: 0 !important
    }

    .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>.wprm-recipe-grow-container a,
    .wprm-container-columns-spaced.wprm-container-columns-gutter>.wprm-recipe-grow-container a {
      margin-left: 8px !important;
      margin-right: 8px !important
    }

    @media all and (max-width:450px) {

      .wprm-container-columns-spaced,
      .wprm-container-columns-spaced-middle {
        display: block
      }

      .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>*,
      .wprm-container-columns-spaced.wprm-container-columns-gutter>* {
        margin-bottom: 16px !important
      }

      .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>.wprm-recipe-grow-container,
      .wprm-container-columns-spaced.wprm-container-columns-gutter>.wprm-recipe-grow-container {
        margin-bottom: 0 !important
      }

      .wprm-container-columns-spaced-middle.wprm-container-columns-gutter>.wprm-recipe-grow-container a,
      .wprm-container-columns-spaced.wprm-container-columns-gutter>.wprm-recipe-grow-container a {
        margin-bottom: 16px !important
      }
    }

    .wprm-container-float-right {
      float: right;
      margin: 0 0 10px 10px;
      text-align: center;
      position: relative;
      z-index: 1
    }

    .rtl .wprm-container-float-right {
      float: left;
      margin: 0 10px 10px 0
    }

    @media only screen and (max-width:640px) {

      .rtl .wprm-container-float-right,
      .wprm-container-float-right {
        float: none;
        margin-left: 0;
        margin-right: 0
      }
    }

    .wprm-icon-decoration-line {
      display: flex;
      flex-wrap: wrap;
      align-items: center
    }

    .wprm-icon-decoration-line.wprm-align-left .wprm-decoration-line {
      margin-left: 15px
    }

    .wprm-icon-decoration-line.wprm-align-center .wprm-decoration-line:first-child {
      margin-right: 15px
    }

    .wprm-icon-decoration-line.wprm-align-center .wprm-decoration-line:last-child {
      margin-left: 15px
    }

    .wprm-decoration-line {
      flex: auto;
      height: 1px;
      border-bottom: 1px solid #000
    }

    .wprm-block-text-normal {
      font-weight: 400;
      font-style: normal;
      text-transform: none
    }

    .wprm-block-text-bold {
      font-weight: 700 !important
    }

    .wprm-block-text-uppercase {
      text-transform: uppercase !important
    }

    .wprm-block-text-faded {
      opacity: .6
    }

    .wprm-block-text-faded .wprm-block-text-faded {
      opacity: 1
    }

    .wprm-align-left {
      text-align: left
    }

    .wprm-align-center {
      text-align: center
    }

    .wprm-recipe-header .wprm-recipe-icon {
      margin-right: 5px
    }

    .wprm-recipe-header.wprm-header-has-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center
    }

    .wprm-recipe-header .wprm-recipe-adjustable-servings-container,
    .wprm-recipe-header .wprm-unit-conversion-container {
      text-transform: none;
      font-style: normal;
      font-weight: 400;
      opacity: 1;
      font-size: 16px
    }

    .wprm-recipe-icon svg {
      display: inline;
      vertical-align: middle;
      margin-top: -.15em;
      width: 1.3em;
      height: 1.3em;
      overflow: visible
    }

    .wprm-icon-shortcode {
      font-size: 16px;
      height: 16px
    }

    .wprm-icon-shortcode .wprm-recipe-icon svg {
      display: inline;
      vertical-align: middle;
      margin-top: 0;
      width: 1em;
      height: 1em;
      overflow: visible
    }

    .wprm-recipe-image img {
      display: block;
      margin: 0 auto
    }

    .wprm-recipe-image picture {
      border: none !important
    }

    .wprm-recipe-ingredients-container .wprm-recipe-ingredient-group-name {
      margin-top: .8em !important
    }

    .wprm-recipe-ingredients-container .wprm-recipe-ingredient-notes-faded {
      opacity: .7
    }

    .wprm-recipe-instructions-container .wprm-recipe-instruction-media {
      max-width: 100%;
      margin: 5px 0 15px
    }

    .wprm-recipe-link {
      cursor: pointer;
      text-decoration: none
    }

    .wprm-recipe-link.wprm-recipe-link-wide-button {
      display: block;
      width: auto;
      margin: 5px 0;
      text-align: center
    }

    .wprm-recipe-link.wprm-recipe-link-wide-button {
      border-width: 1px;
      border-style: solid;
      padding: 5px
    }

    .wprm-nutrition-label-container-grouped {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start
    }

    .wprm-nutrition-label-container-grouped .wprm-nutrition-label-text-nutrition-container {
      white-space: nowrap;
      padding-right: 10px
    }

    .rtl .wprm-nutrition-label-container-grouped .wprm-nutrition-label-text-nutrition-container {
      padding-left: 10px;
      padding-right: 0
    }

    .wprm-recipe-rating {
      white-space: nowrap
    }

    .wprm-recipe-rating svg {
      vertical-align: middle;
      margin-top: -.15em !important;
      width: 1.1em;
      height: 1.1em;
      margin: 0
    }

    .wprm-recipe-rating.wprm-recipe-rating-inline .wprm-recipe-rating-details {
      display: inline-block;
      margin-left: 10px
    }

    .wprm-recipe-rating .wprm-recipe-rating-details {
      font-size: .8em
    }

    .wprm-spacer {
      display: block !important;
      background: 0 0 !important;
      font-size: 0;
      line-height: 0;
      width: 100%;
      height: 10px
    }

    .wprm-spacer+.wprm-spacer {
      display: none !important
    }

    .wprm-recipe-summary .wprm-spacer {
      display: block !important
    }

    .wprm-toggle-switch-container {
      display: flex;
      align-items: center;
      margin: 10px 0
    }

    .wprm-toggle-switch-container label {
      cursor: pointer;
      margin: 0;
      font-size: 1em;
      flex-shrink: 0
    }

    .wprm-toggle-switch-container .wprm-prevent-sleep-description {
      margin-left: 10px;
      font-size: .8em;
      line-height: 1.1em
    }

    .wprm-toggle-switch {
      position: relative;
      display: inline-block
    }

    .wprm-toggle-switch input {
      opacity: 0;
      width: 0;
      min-width: 0;
      height: 0;
      margin: 0;
      padding: 0
    }

    .wprm-toggle-switch .wprm-toggle-switch-slider {
      width: 40px;
      height: 20px;
      position: absolute;
      cursor: pointer;
      top: 50%;
      margin-top: -10px;
      left: 0;
      right: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s
    }

    .wprm-toggle-switch .wprm-toggle-switch-slider:before {
      position: absolute;
      content: "";
      height: 80%;
      left: 7%;
      right: 50%;
      bottom: 10%;
      background-color: #fff;
      -webkit-transition: .4s;
      transition: .4s
    }

    .wprm-toggle-switch input:checked+.wprm-toggle-switch-slider {
      background-color: #333 !important
    }

    .wprm-toggle-switch input:focus+.wprm-toggle-switch-slider {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, .12)
    }

    .wprm-toggle-switch input:checked+.wprm-toggle-switch-slider:before {
      left: 50%;
      right: 7%
    }

    .wprm-toggle-switch .wprm-toggle-switch-label {
      margin-left: 50px
    }

    .wprm-toggle-switch-rounded .wprm-toggle-switch-slider:before {
      border-radius: 50%
    }

    .wprm-toggle-container {
      display: inline-flex;
      align-items: stretch;
      border: 1px solid #333;
      flex-shrink: 0;
      overflow: hidden
    }

    .wprm-toggle-container button.wprm-toggle {
      display: inline-block;
      padding: 5px 10px;
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      text-transform: inherit;
      letter-spacing: inherit;
      text-decoration: none;
      white-space: nowrap;
      border: none;
      border-radius: 0;
      box-shadow: none
    }

    .wprm-toggle-container button.wprm-toggle:not(.wprm-toggle-active) {
      background: 0 0 !important;
      color: inherit !important
    }

    .tippy-box[data-animation=fade][data-state=hidden] {
      opacity: 0
    }

    [data-tippy-root] {
      max-width: calc(100vw - 10px)
    }

    .tippy-box {
      position: relative;
      background-color: #333;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.4;
      white-space: normal;
      outline: 0;
      transition-property: transform, visibility, opacity
    }

    .tippy-box[data-placement^=top]>.tippy-arrow {
      bottom: 0
    }

    .tippy-box[data-placement^=top]>.tippy-arrow:before {
      bottom: -7px;
      left: 0;
      border-width: 8px 8px 0;
      border-top-color: initial;
      transform-origin: center top
    }

    .tippy-box[data-placement^=bottom]>.tippy-arrow {
      top: 0
    }

    .tippy-box[data-placement^=bottom]>.tippy-arrow:before {
      top: -7px;
      left: 0;
      border-width: 0 8px 8px;
      border-bottom-color: initial;
      transform-origin: center bottom
    }

    .tippy-box[data-placement^=left]>.tippy-arrow {
      right: 0
    }

    .tippy-box[data-placement^=left]>.tippy-arrow:before {
      border-width: 8px 0 8px 8px;
      border-left-color: initial;
      right: -7px;
      transform-origin: center left
    }

    .tippy-box[data-placement^=right]>.tippy-arrow {
      left: 0
    }

    .tippy-box[data-placement^=right]>.tippy-arrow:before {
      left: -7px;
      border-width: 8px 8px 8px 0;
      border-right-color: initial;
      transform-origin: center right
    }

    .tippy-box[data-inertia][data-state=visible] {
      transition-timing-function: cubic-bezier(.54, 1.5, .38, 1.11)
    }

    .tippy-arrow {
      width: 16px;
      height: 16px;
      color: #333
    }

    .tippy-arrow:before {
      content: "";
      position: absolute;
      border-color: transparent;
      border-style: solid
    }

    .tippy-content {
      position: relative;
      padding: 5px 9px;
      z-index: 1
    }

    #wprm-timer-container {
      position: fixed;
      z-index: 16777271;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50px;
      font-size: 24px;
      font-family: monospace, sans-serif;
      line-height: 50px;
      background-color: #000;
      color: #fff;
      display: flex;
      align-items: center
    }

    #wprm-timer-container .wprm-timer-icon {
      cursor: pointer;
      padding: 0 10px
    }

    #wprm-timer-container .wprm-timer-icon svg {
      display: table-cell;
      vertical-align: middle;
      width: 24px;
      height: 24px
    }

    #wprm-timer-container span {
      flex-shrink: 0
    }

    #wprm-timer-container span#wprm-timer-bar-container {
      flex: 1;
      padding: 0 10px 0 15px
    }

    #wprm-timer-container span#wprm-timer-bar-container #wprm-timer-bar {
      display: block;
      border: 3px solid #fff;
      height: 24px;
      width: 100%
    }

    #wprm-timer-container span#wprm-timer-bar-container #wprm-timer-bar #wprm-timer-bar-elapsed {
      display: block;
      height: 100%;
      width: 0%;
      background-color: #fff;
      border: 0
    }

    #wprm-timer-container.wprm-timer-finished {
      animation: 1s linear infinite wprmtimerblink
    }

    @keyframes wprmtimerblink {
      50% {
        opacity: .5
      }
    }

    .wprm-user-rating.wprm-user-rating-allowed .wprm-rating-star {
      cursor: pointer
    }

    .wprm-recipe-advanced-servings-container {
      margin: 5px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap
    }

    .wprm-recipe-advanced-servings-container .wprm-recipe-advanced-servings-input-unit {
      margin-left: 3px
    }

    .wprm-recipe-advanced-servings-container .wprm-recipe-advanced-servings-input-shape {
      margin-left: 5px
    }

    .wprm-recipe-equipment-container,
    .wprm-recipe-ingredients-container,
    .wprm-recipe-instructions-container {
      counter-reset: wprm-advanced-list-counter
    }

    .wprm-checkbox-container {
      margin-left: -16px
    }

    .rtl .wprm-checkbox-container {
      margin-left: 0;
      margin-right: -16px
    }

    .wprm-checkbox-container input[type=checkbox] {
      width: 16px !important;
      margin: 0 !important;
      opacity: 0
    }

    .wprm-checkbox-container label.wprm-checkbox-label {
      position: relative;
      display: inline !important;
      margin: 0 !important;
      left: 0;
      padding-left: 26px
    }

    .wprm-checkbox-container label::after,
    .wprm-checkbox-container label::before {
      position: absolute;
      content: "";
      display: inline-block
    }

    .rtl .wprm-checkbox-container label::after {
      right: 5px
    }

    .wprm-checkbox-container label::before {
      height: 18px;
      width: 18px;
      border: 1px solid;
      left: 0;
      top: 0
    }

    .wprm-checkbox-container label::after {
      height: 5px;
      width: 9px;
      border-left: 2px solid;
      border-bottom: 2px solid;
      transform: rotate(-45deg);
      left: 5px;
      top: 5px
    }

    .wprm-checkbox-container input[type=checkbox]+label::after {
      content: none
    }

    .wprm-checkbox-container input[type=checkbox]:checked+label::after {
      content: ""
    }

    .wprm-checkbox-container input[type=checkbox]:focus+label::before {
      outline: #3b99fc auto 5px
    }

    .wprm-recipe-equipment li,
    .wprm-recipe-ingredients li {
      position: relative
    }

    .wprm-recipe-equipment li .wprm-checkbox-container,
    .wprm-recipe-ingredients li .wprm-checkbox-container {
      display: inline-block;
      position: absolute;
      left: -32px;
      top: .25em;
      line-height: .9em
    }

    .wprm-recipe-equipment li.wprm-checkbox-is-checked,
    .wprm-recipe-ingredients li.wprm-checkbox-is-checked {
      text-decoration: line-through
    }

    .rtl .wprm-recipe-equipment li .wprm-checkbox-container,
    .rtl .wprm-recipe-ingredients li .wprm-checkbox-container {
      left: inherit;
      right: -32px
    }

    .wprm-list-checkbox-container:before {
      display: none !important
    }

    .wprm-list-checkbox-container.wprm-list-checkbox-checked {
      text-decoration: line-through
    }

    .wprm-list-checkbox-container .wprm-list-checkbox:hover {
      cursor: pointer
    }

    .no-js .wprm-private-notes-container,
    .no-js .wprm-recipe-private-notes-header {
      display: none
    }

    .wprm-private-notes-container:not(.wprm-private-notes-container-disabled) {
      cursor: pointer
    }

    .wprm-private-notes-container .wprm-private-notes-user {
      display: none
    }

    .wprm-private-notes-container.wprm-private-notes-has-notes .wprm-private-notes-user {
      display: block
    }

    .wprm-private-notes-container.wprm-private-notes-editing .wprm-private-notes-user {
      display: none
    }

    .wprm-private-notes-container .wprm-private-notes-user {
      white-space: pre-wrap
    }

    .wprm-print .wprm-private-notes-container {
      cursor: default
    }

    .wprm-print .wprm-private-notes-container .wprm-private-notes-user {
      display: block !important
    }

    input[type=number].wprm-recipe-servings {
      display: inline;
      width: 60px;
      margin: 0;
      padding: 5px
    }

    .wprm-recipe-servings-text-buttons-container {
      display: inline-flex
    }

    .wprm-recipe-servings-text-buttons-container input[type=text].wprm-recipe-servings {
      display: inline;
      width: 40px;
      margin: 0;
      padding: 0;
      vertical-align: top;
      text-align: center;
      outline: 0;
      border-radius: 0 !important
    }

    .wprm-recipe-servings-text-buttons-container .wprm-recipe-servings-change,
    .wprm-recipe-servings-text-buttons-container input[type=text].wprm-recipe-servings {
      border: 1px solid #333;
      height: 30px;
      user-select: none;
      font-size: 16px
    }

    .wprm-recipe-servings-text-buttons-container .wprm-recipe-servings-change {
      display: inline-block;
      width: 20px;
      line-height: 26px;
      background: #333;
      color: #fff;
      text-align: center;
      cursor: pointer;
      border-radius: 3px
    }

    .wprm-recipe-servings-text-buttons-container .wprm-recipe-servings-change:active {
      font-weight: 700
    }

    .wprm-recipe-servings-text-buttons-container .wprm-recipe-servings-change.wprm-recipe-servings-decrement {
      border-right: none;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important
    }

    .wprm-recipe-servings-text-buttons-container .wprm-recipe-servings-change.wprm-recipe-servings-increment {
      border-left: none;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important
    }

    .wprm-recipe-servings-container .tippy-box {
      padding: 5px 10px
    }

    input[type=range].wprm-recipe-servings-slider {
      -webkit-appearance: none;
      width: 100%;
      min-width: 150px;
      margin: 0;
      background: 0 0;
      border: 0
    }

    input[type=range].wprm-recipe-servings-slider:focus {
      outline: 0
    }

    input[type=range].wprm-recipe-servings-slider::-webkit-slider-runnable-track {
      width: 100%;
      height: 9.2px;
      cursor: pointer;
      box-shadow: .5px .5px 1px #000, 0 0 .5px #0d0d0d;
      background: #aaa;
      border-radius: 1.3px;
      border: .5px solid #010101
    }

    input[type=range].wprm-recipe-servings-slider::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000, 0 0 1px #0d0d0d;
      border: .7px solid #000;
      height: 22px;
      width: 10px;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -6.9px
    }

    input[type=range].wprm-recipe-servings-slider:focus::-webkit-slider-runnable-track {
      background: #bcbcbc
    }

    input[type=range].wprm-recipe-servings-slider::-moz-range-track {
      width: 100%;
      height: 9.2px;
      cursor: pointer;
      box-shadow: .5px .5px 1px #000, 0 0 .5px #0d0d0d;
      background: #aaa;
      border-radius: 1.3px;
      border: .5px solid #010101
    }

    input[type=range].wprm-recipe-servings-slider::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000, 0 0 1px #0d0d0d;
      border: .7px solid #000;
      height: 22px;
      width: 10px;
      border-radius: 3px;
      background: #fff;
      cursor: pointer
    }

    input[type=range].wprm-recipe-servings-slider::-ms-track {
      width: 100%;
      height: 9.2px;
      cursor: pointer;
      background: 0 0;
      border-color: transparent;
      color: transparent
    }

    input[type=range].wprm-recipe-servings-slider::-ms-fill-lower {
      background: #989898;
      border: .5px solid #010101;
      border-radius: 2.6px;
      box-shadow: .5px .5px 1px #000, 0 0 .5px #0d0d0d
    }

    input[type=range].wprm-recipe-servings-slider::-ms-fill-upper {
      background: #aaa;
      border: .5px solid #010101;
      border-radius: 2.6px;
      box-shadow: .5px .5px 1px #000, 0 0 .5px #0d0d0d
    }

    input[type=range].wprm-recipe-servings-slider::-ms-thumb {
      box-shadow: 1px 1px 1px #000, 0 0 1px #0d0d0d;
      border: .7px solid #000;
      height: 22px;
      width: 10px;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
      height: 9.2px
    }

    input[type=range].wprm-recipe-servings-slider:focus::-ms-fill-lower {
      background: #aaa
    }

    input[type=range].wprm-recipe-servings-slider:focus::-ms-fill-upper {
      background: #bcbcbc
    }

    .lwptoc {
      margin: -30px 0 20px
    }

    .lwptoc:first-child {
      margin-top: 16px
    }

    .lwptoc_i {
      padding: 14px 18px 18px;
      text-align: left
    }

    .lwptoc_header {
      margin-bottom: 6px
    }

    .rtl .lwptoc_header {
      text-align: right
    }

    .lwptoc_toggle {
      white-space: nowrap;
      margin-left: 4px;
      font-size: 80%
    }

    .rtl .lwptoc_toggle {
      margin-left: 0;
      margin-right: 4px
    }

    .lwptoc_toggle:before {
      content: '['
    }

    .lwptoc_toggle:after {
      content: ']'
    }

    .lwptoc_toggle_label {
      margin: 0 1px
    }

    .lwptoc_item {
      margin-top: 2px
    }

    .rtl .lwptoc_item {
      text-align: right
    }

    LI.lwptoc_item {
      margin: 2px 0 0 !important;
      padding: 0 !important;
      list-style: none !important
    }

    .lwptoc_item:first-child {
      margin-top: 0
    }

    LI.lwptoc_item:first-child {
      margin-top: 0 !important
    }

    .lwptoc_item_number {
      margin-right: 2px
    }

    .rtl .lwptoc_item_number {
      margin-right: 0;
      margin-left: 2px
    }

    .lwptoc_itemWrap .lwptoc_itemWrap {
      margin: 2px 0 0 14px
    }

    .rtl .lwptoc_itemWrap .lwptoc_itemWrap {
      margin-left: 0;
      margin-right: 14px
    }

    .lwptoc-autoWidth .lwptoc_i {
      display: inline-block
    }

    .lwptoc-notInherit .lwptoc_i DIV A {
      box-shadow: none !important;
      border: none !important;
      text-decoration: none !important
    }

    .lwptoc-notInherit .lwptoc_i DIV A:active,
    .lwptoc-notInherit .lwptoc_i DIV A:focus,
    .lwptoc-notInherit .lwptoc_i DIV A:hover {
      box-shadow: none !important;
      border: none !important;
      text-decoration: none !important
    }

    .lwptoc-notInherit .lwptoc_i DIV A:hover {
      border-bottom: 1px dotted !important
    }

    .lwptoc-light .lwptoc_i {
      color: #333;
      background: #fafafa
    }

    .lwptoc-light .lwptoc_i A {
      color: #3175e4
    }

    .lwptoc-light .lwptoc_i A:active,
    .lwptoc-light .lwptoc_i A:focus,
    .lwptoc-light .lwptoc_i A:hover {
      color: #3175e4;
      border-color: #3175e4
    }

    .lwptoc-light .lwptoc_items A:visited {
      color: #000394
    }

    .wprm-recipe-template-chic-hk {
      margin: 20px auto;
      background-color: #ececec;
      font-family: 'Work Sans';
      font-size: 18px;
      line-height: 1.5em !important;
      color: #333;
      max-width: 950px
    }

    .wprm-recipe-template-chic-hk li,
    .wprm-recipe-template-chic-hk p {
      font-family: 'Work Sans';
      font-size: 1em !important;
      line-height: 1.5em !important
    }

    .wprm-recipe-template-chic-hk li {
      margin: 0 0 0 32px !important;
      padding: 0 !important
    }

    .rtl .wprm-recipe-template-chic-hk li {
      margin: 0 32px 0 0 !important
    }

    .wprm-recipe-template-chic-hk ol,
    .wprm-recipe-template-chic-hk ul {
      margin: 0 !important;
      padding: 0 !important
    }

    .wprm-recipe-template-chic-hk br {
      display: none
    }

    .wprm-recipe-template-chic-hk .wprm-recipe-header,
    .wprm-recipe-template-chic-hk .wprm-recipe-name {
      font-family: 'Work Sans';
      color: #212121;
      line-height: 1.3em
    }

    .wprm-recipe-template-chic-hk h1,
    .wprm-recipe-template-chic-hk h2,
    .wprm-recipe-template-chic-hk h3,
    .wprm-recipe-template-chic-hk h4 {
      font-family: 'Work Sans';
      color: #212121;
      line-height: 1.3em;
      margin: 0 !important;
      padding: 0 !important
    }

    .wprm-recipe-template-chic-hk .wprm-recipe-header {
      margin-top: 1.2em !important
    }

    .wprm-recipe-template-chic-hk h1 {
      font-size: 2em
    }

    .wprm-recipe-template-chic-hk h2 {
      font-size: 1.8em
    }

    .wprm-recipe-template-chic-hk h3 {
      font-size: 1.2em
    }

    .wprm-recipe-template-chic-hk h4 {
      font-size: 1em
    }

    .wprm-recipe-template-chic-hk {
      font-size: 18px;
      border-style: inset;
      border-width: 2px;
      border-color: #4a90e2;
      padding: 10px;
      background-color: #ececec;
      max-width: 950px
    }

    .wprm-recipe-template-chic-hk a {
      color: #9013fe
    }

    .wprm-recipe-template-chic-hk .wprm-recipe-name {
      line-height: 1.3em;
      font-weight: 700
    }

    .wprm-recipe-template-chic-hk .wprm-template-chic-buttons {
      clear: both;
      font-size: .9em;
      text-align: center
    }

    .wprm-recipe-template-chic-hk .wprm-template-chic-buttons .wprm-recipe-icon {
      margin-right: 5px
    }

    .wprm-recipe-template-chic-hk .wprm-recipe-header {
      margin-bottom: .5em !important
    }

    .wprm-recipe-template-chic-hk .wprm-nutrition-label-container {
      font-size: .9em
    }

    .wprm-recipe-template-chic-hk .wprm-call-to-action {
      border-radius: 3px
    }

    #c1680564964217 * {
      margin: 0;
      padding: 0;
      position: static;
      outline: 0;
      background: 0 0;
      border: none;
      overflow: visible;
      visibility: visible;
      opacity: 1;
      box-sizing: content-box;
      -moz-box-sizing: content-box;
      text-decoration: none;
      font: 12px/1 arial;
      text-shadow: none;
      box-shadow: none;
      color: #000;
      text-align: left;
      vertical-align: top;
      float: none;
      max-width: none;
      max-height: none
    }

    #c1680564964217 .GGModal_StandAlone [tabindex]:active,
    #c1680564964217 .GGModal_StandAlone [tabindex]:focus,
    #c1680564964217 [id$="_ATTRIBUTION"] [tabindex]:active,
    #c1680564964217 [id$="_ATTRIBUTION"] [tabindex]:focus,
    #c1680564964217 [id$="_CLOSE"] [tabindex]:active,
    #c1680564964217 [id$="_CLOSE"] [tabindex]:focus {
      box-shadow: 0 0 10px 0 #666 !important
    }

    #c1680564964217>iframe {
      display: none !important
    }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
    integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
    crossorigin="anonymous"></script>

  <script>
    (function () {
      var PostID = 215384;
      var WP_API = "https://hebbarskitchen.com/wp-json/wp/v2/posts/" + PostID;
      $.getJSON(WP_API, {
        format: "json"
      }).done(function (data) {
        console.log(data.content.rendered);
        $('.td-post-content').html(data.content.rendered);
        $('.entry-title').html(data.title.rendered);
        $('.authorBy').html(data.yoast_head_json.author);
        $('time.entry-date').html(data.modified_gmt).attr('datetime', data.modified_gmt);
        $('.td-post-content img').addClass('responsive rounded img-fluid text-center cols-12').removeClass('alignnone size-large wp-image-215392');
        $('head').append(data.yoast_head);
      });
    })();
  </script>

<body
  class="post-template-default single single-post postid-215384 single-format-video locale-en-us vegetable-juice-recipe-veggie-juice global-block-template-1 td-wpml aa-prefix-hebba-  tdc-header-template  tdc-footer-template td-full-layout"
  itemscope="itemscope" itemtype="https://schema.org/WebPage">


  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-info">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Hebbarskitchen</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
    </nav>
  </header>
  <main class="mt-5 pt-5">

    <div id="td-outer-wrap" class="td-theme-wrap">
      <div class="td-container td-post-template-default ">
        <div class="td-pb-row ">
          <div class="td-pb-span8 td-main-content">
            <div class="td-ss-main-content">
              <div class="clearfix"></div>
              <article
                class="post-215384 col-12 post type-post status-publish format-video has-post-thumbnail category-beverages-recipes post_format-post-format-video groups-adolescents groups-aged groups-athletes groups-kids cook-method-blend recipe-time-10-minute-recipes difficulty-easy season-all-season season-summer">
                <div class="td-post-header">
                  <header class="td-post-title text-info">
                    <h1 class="entry-title"></h1>
                    <div class="td-module-meta-info">
                      <div class="td-post-author-name">
                        <div class="td-author-by">By</div> <a href="https://hebbarskitchen.com/author/hebbar5_wp/"
                          class="authorBy"></a>
                        <div class="td-author-line"> - </div>
                      </div> <span class="td-post-date"><time class="entry-date updated td-module-date"
                          datetime="2023-03-21T19:51:58+11:00"></time></span>
                      <div class="td-post-comments"><a
                          href="https://hebbarskitchen.com/vegetable-juice-recipe-veggie-juice/#comments"><i
                            class="td-icon-comments"></i>2</a></div>
                    </div>
                  </header>
                </div>
                <div class="td-post-content tagdiv-type col-12"></div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</body>

</html>`;

const PostSpecific = () => {

    return <SafeAreaView style={{
        backgroundColor: 'white',
        height: '100%',
    }}>
        <WebView
            originWhitelist={['*']}
            source={{ html: HTML, baseUrl: 'web/' }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />

    </SafeAreaView>
}


export default PostSpecific