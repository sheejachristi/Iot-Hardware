/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyCookies extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
    `;
  }

  static get properties() {
    return {
        sessionId: { 
            type: String,
            value: "",
            observer: "_setCookie"
        },
        sessKey: {
            type: String,
            value: "Session-Id"
        },
        userId: {
            type: String,
            value: "",
            observer: "_setCookie"
        },
        userKey: {
            type: String,
            value: "User-Id"
        }
    }
  }

  constructor() {
      super();
      this.sessionId = this.getCookie();
  }

  _setCookie() {
      var exdays = 5;
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      if ((this.sessionId != undefined) && (this.sessionId.length > 0)) {
          document.cookie = this.sessKey + "=" + this.sessionId + ";" + expires + ";path=/";
      }
      if ((this.userId != undefined) && (this.userId.length > 0)) {
          document.cookie = this.userKey + "=" + this.userId + ";" + expires + ";path=/";
      }
  }

  resetCookie() {
      this.sessionId = "";
      this.userId = "";
  }

  getCookie() {
      return this.getKey(this.sessKey);
  }

  getKey(key) {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  getUserId() {
      return this.getKey(this.userKey);
  }
}

window.customElements.define('my-cookies', MyCookies);
