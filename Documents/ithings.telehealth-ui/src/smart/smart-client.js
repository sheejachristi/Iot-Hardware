import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "./smart-config.js"
import "./smart-admin-config.js"

var SMART_ACTION_LOOKUP = 'lookup';
var ERROR = "errors";
var RESPONSES = "responses";

/**
 * `smart-client`
 * An element to connect to smart platform
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SmartClient extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <smart-config id="globals"></smart-config>
      <smart-admin-config id="adminglobals"></smart-admin-config>
      <iron-ajax id="poster" method="POST" content-type="application/json" url="[[_computeURL(server, port, tenant, flow, flowEvent)]]" body="[[_computeParams(_postTo, _postData)]]" headers="[[_createHeaders(_sessionId)]]" handle-as="json" on-response="_handleResponse" on-error="_handleError">
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
        asAdmin: {
            type:Boolean,
            value: false
        },
        server: {
          type: String,
          value: '172.16.238.1'
        },
        port: {
          type: Number,
          value: 9081
        },
        tenant: {
          type: String
        },
        flow: {
          type: String
        },
        flowEvent: {
          type: String
        },
        _postTo: {
          type: Object,
          value: {}
        },
        _postData: {
          type: Object,
          value: {}
        },
        _sessionId: {
          type: String
        },
    };
  }

  ready() {
      super.ready();
      this.server = this.$.globals.server;
      this.port = this.$.globals.port;
      this.tenant = this.$.globals.tenant;

      if (this.asAdmin)
      {
          this.tenant = this.$.adminglobals.tenant;
      }
  }

  _dataChanged() {
  }

  _computeURL(svr, p, t, f, fe) {
      var computedUrl = "http://" + svr + ":" + p + "/";
      computedUrl += t + "/" + f + "/" + fe;

      console.log(computedUrl);

      return computedUrl;
  }

  _computeParams(pto, data) {
      var post = data;
      for (var key in pto) {
          if( pto.hasOwnProperty(key) ) {
              post[key] = {};
              post[key].___smart_action___ = SMART_ACTION_LOOKUP;
              post[key].___smart_value___ = pto[key];
          } 
      }              

      console.log(JSON.stringify(pto));
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(post));

      return JSON.stringify(post);
  }

  _createHeaders(sess) {
      var hdrs = {};
      //var sess = this.$.globals.sessionId;
      if (this.asAdmin)
      {
          sess = this.$.adminglobals.sessionId;
      }
      if (sess != undefined) {
        hdrs["Session-Id"] = sess;
      }

      return hdrs;
  }

  postSmart(todata, data) {
      this._postTo = todata;
      this._postData = data;
      this._sessionId = this.$.globals.sessionId;
      if (this.asAdmin)
      {
          sess = this.$.adminglobals.sessionId;
      }
      this.$.poster.generateRequest();
  }

  _handleResponse(data) {
      console.log(data.detail.response);
      var errors = data.detail.response[ERROR];
      if (errors != undefined) {
          this._fireError(errors);
      } else {
          var responses = data.detail.response[RESPONSES];
          var response = responses[0];
          if ((response != undefined) && (response[ERROR] != undefined))
          {
              errors = response[ERROR];
              this._fireError(errors);
          } else {
              this.dispatchEvent(new CustomEvent("smart-response", { detail: { "responses" : responses } }));
          }
      }
  }

  _fireError(errors) {
      var errs = [];
      for (var i = 0; i < errors.length; i++) {
          var err = {};
          var oneerr = errors[i];
          err.code = oneerr["code"];
          err.context = oneerr["context"];
          errs.push(err);
      }
      this.dispatchEvent(new CustomEvent("smart-error", { detail: { "error" : errs } }));
  }

  _handleError(error) {
      console.log(error);
      this.dispatchEvent(new CustomEvent("smart-network-error", { detail: { "error" : error.detail } }));
  }
}

window.customElements.define('smart-client', SmartClient);
