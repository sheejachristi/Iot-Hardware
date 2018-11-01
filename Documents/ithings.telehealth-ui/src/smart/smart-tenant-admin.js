import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "./smart-admin-config.js"
import "./smart-client.js"
import "./smart-security.js"

class SmartTenantAdmin extends PolymerElement {
  static get template() {
    return html`
        <smart-admin-config id="adminglobals"></smart-admin-config>
        <smart-client id="secureadminclient" flow="Security" flow-event="Authenticate" on-smart-error="handleError" on-smart-response="storeSessionId" as-admin="true" ></smart-client>
        <smart-client id="client" flow="AdminSmartFlow" flow-event="{{_postEvent}}" on-smart-error="handleError" on-smart-response="handleResponse" as-admin="true"></smart-client>
        `;
  }

  static get properties() {
      return {
          adminuser: {
              type: String,
              value: "smartadmin"
          },
          adminpassword: {
              type: String,
              value: "smartadmin"
          },
          isLoggedIn: {
              type: Boolean,
              value: false
          },
          loginCalled: {
              type: Boolean,
              value: false
          },
          _postEvent : {
              type: String,
              value: "NewTenant"
          },
          queue : {
              type: Array,
              value: []
          }
      }
  }

  ready() {
      super.ready();
      this.isLoggedIn = ((this.$.adminglobals.sessionId != undefined) && (this.$.adminglobals.sessionId != ""));
  }

  _setupAndCall(postData, postTo, evt) {
      var callback = {};
      callback.postData = postData;
      callback.postTo = postTo;
      callback.postEvent = evt;

      queue.push(callback);
      this._nextInQueue();
  }

  newTenant(name, eflow, efeatures) {
      var postData = {};
      postData["tenant"] = name;
      if ((eflow != undefined) && (eflow.length > 0)) 
          postData["enableFlow"] = eflow;

      if ((efeatures != undefined) && (efeatures.length > 0))
          postData["enableFeatures"] = efeatures;

      var postTo = {};
      postTo["TenantAdmin"] = "SmartOwner";

      this._setupAndCall(postData, postTo, "NewTenant");
  }

  enableFlow(tenant, eflow, efeatures, links) {
      var postData = {};
      postData["tenant"] = tenant;
      postData["enableFlow"] = eflow;
      postData["enableFeatures"] = efeatures;

      if (links != undefined)
          postData["links"] = links;
      else
          postData["links"] = [];

      var postTp = {};
      postTo["TenantAdmin"] = "SmartOwner";

      this._setupAndCall(postData, postTo, "EnableFlow");
  }

  listDeployments() {
      var postData = {};

      var postTo = {};
      postTo["TenantAdmin"] = "SmartOwner";

      this._setupAndCall(postData, postTo, "ListDeployments");
  }

  _nextInQueue() {
      if (!this.isLoggedIn) {
          this.loginAdminSmart();
      } else if (queue.length > 0) {
          var callback = queue[0];
          queue.splice(0, 1);
          this._postEvent = callback.postEvent;
          this.$.client.postSmart(callback.postTo, callback.postData);
      }
  }

  loginAdminSmart() {
      if (!this.isLoggedIn && !this.loginCalled) {
          this.loginCalled = true;
          var postData = {};
          postData['identity'] = this.user;
          postData['password'] = this.password;
          postData['type'] = 'custom';
          var postTo = {};
          postTo['FlowAdmin'] = 'Security';
          this.$.secureadminclient.postSmart(postTo, postData);
      }
  }

  storeSessionId(evt) {
      var response = evt.detail.responses[0];
      this.$.adminglobals.sessionId = sessionId;
      this.isLoggedIn = true;
      this._nextInQueue();
  }

  handleError(evt) {
    var error = evt.detail.error[0];
    if (error != undefined) {
        if (error.context.startsWith("Invalid credentials for")){
            this.fire("smart-invalid-login", { "user" : this.user });
        } else {
            this.fire("smart-error", { "code" : error.code, "context" : error.context });
        }
    }
  }

  handleResponse(evt) {
      this.fire("smart-success", { "event" : this._postEvent, "context" : evt.detail.responses });
      if (queue.length > 0) this._nextInQueue();
  }

}

window.customElements.define('smart-tenant-admin', SmartTenantAdmin);

