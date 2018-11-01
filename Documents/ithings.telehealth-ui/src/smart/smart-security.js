import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "./smart-config.js"
import "./smart-client.js"

var sessionId;

var SESSIONID = "sessionId";

class SmartSecurity extends PolymerElement {
  static get template() {
    return html`
        <smart-config id="globals"></smart-config>
        <smart-client id="client" flow="Security" flow-event="Authenticate" on-smart-error="handleError" on-smart-response="storeSessionId"></smart-client>
    `;
  }

  static get properties() {
    return {
      user: { 
          type: String
      },
      password: { 
          type: String
      }
    };
  }

  loginSmart() {
      var postData = {};
      postData['identity'] = this.user;
      postData['password'] = this.password;
      postData['type'] = 'custom';
      var postTo = {};
      postTo['FlowAdmin'] = 'Security';
      this.$.client.postSmart(postTo, postData);
  }

  get sessionId() {
      return sessionId;
  }

  storeSessionId(evt) {
      var response = evt.detail.responses[0];
      sessionId = response[SESSIONID];
      this.$.globals.sessionId = sessionId;
      this.dispatchEvent(new CustomEvent("smart-login-success", { detail: { "sessionId": sessionId } }));
  }

  handleError(evt) {
    var error = evt.detail.error[0];
    if (error != undefined) {
        if (error.context.startsWith("Invalid credentials for")){
            this.dispatchEvent(new CustomEvent("smart-invalid-login", { detail: { "user" : this.user } }));
        } else {
            this.dispatchEvent(new CustomEvent("smart-error-login", { detail: { "code" : error.code, "context" : error.context } }));
        }
    }
  }
}

window.customElements.define('smart-security', SmartSecurity);

