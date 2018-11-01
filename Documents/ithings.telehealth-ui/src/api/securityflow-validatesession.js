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
import '../shared-styles/shared-styles.js';
import '../smart/smart-client.js';

class SecurityFlowValidateSession extends PolymerElement {
  static get template() {
    return html`
      <smart-client id="client" flow="Security" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></smart-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "SessionValid"
      },
      failureAction: Object,
      successAction: Object
    };
  }

  constructor() {
      super();
  }

  _handleError(e) {
      var response = "";
      if (e.detail.responses != undefined) {
        response = e.detail.responses[0];
      } else if (e.detail.error != undefined) {
          response = e.detail.error;
      }
      this.failureAction(response);
  }

  _handleResponse(e) {
    var response = e.detail.responses[0];
    //var response = response["response"];
    this.successAction(response);
  }

  validSession(sess, success, failure) {
      this.$.client._dataChanged();
      this._postEvent = "SessionValid";
      this.successAction = success;
      this.failureAction = failure;
      var postData = {};
      var postTo = {};
      postTo['Session'] = sess;
      this.$.client.postSmart(postTo, postData);
  }

  logout(sess, success, failure) {
      this.$.client._dataChanged();
      this._postEvent = "Logout";
      this.successAction = success;
      this.failureAction = failure;
      var postData = {};
      var postTo = {};
      postTo['Session'] = sess;
      this.$.client.postSmart(postTo, postData);
  }

  getPermittedFeatures(success, failure) {
      this.$.client._dataChanged();
      this._postEvent = "GetPermittedFeatures";
      this.successAction = success;
      this.failureAction = failure;

      var postData = {};
      var postTo = {};
      postTo["FlowAdmin"] = "Security";
      this.$.client.postSmart(postTo, postData);
  }
}

window.customElements.define('securityflow-validatesession', SecurityFlowValidateSession);
