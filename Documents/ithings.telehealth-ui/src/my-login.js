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
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import '@polymer/paper-button/paper-button.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './smart/smart-security.js';
import './smart/smart-config.js';

class MyLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles iron-flex iron-flex-alignment iron-positioning">
        :host {
          display: block;
        }
      </style>

      <smart-config id="globals"></smart-config>
      <smart-security id="security" user="[[user]]" password="[[password]]" on-smart-login-success="_loggedIn"></smart-security>

      <div class="card-header">
        Login to iThingsHealth
      </div>
      <div class="card-content">
        <div class="content-single">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Service Provider</div>
                    <input id="tenant" required type="text" placeholder="Please enter your service provider code"></input>
                </div>
                <div class="element">
                    <div class="inputlabel">User Email</div>
                    <input id="email" required type="email" placeholder="Please enter your email id registered"></input>
                </div>
                <div class="element">
                    <div class="inputlabel">Password</div>
                    <input id="password" type="password" required placeholder="Please enter your password"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_loginNow">LOGIN</paper-button>
      </div>
    `;
  }

  static get properties() {
      return {
          tenant: {
              type: String,
          },
          user: {
              type: String,
          },
          password: {
              type: String,
          }
      };
  }

  _loginNow() {
      this.tenant = this.$.tenant.value;
      this.$.globals.tenant = this.tenant;
      this.user = this.$.email.value;
      this.password = this.$.password.value;
      this.$.security.loginSmart();
  }

  _loggedIn(event) {
      console.log(event);
      this.dispatchEvent(new CustomEvent("login-success", { detail: { "sessionId": event.detail.sessionId, "userId": this.user } }));
  }
}

window.customElements.define('my-login', MyLogin);
