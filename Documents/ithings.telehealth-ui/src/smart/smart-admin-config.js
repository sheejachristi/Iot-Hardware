import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

var adminvalues = {};

class SmartAdminConfig extends PolymerElement {

  ready() {
      super.ready();
    for (var i = 0; i < this.attributes.length; ++i) {
        var attr = this.attributes[i];
        adminvalues[attr.nodeName] = attr.nodeValue;
        console.log("Set: " + attr.nodeName + ":" + attr.nodeValue);
    }
  }

  get tenant() {
      return "SmartOwner";
  }

  set sessionId(sess) {
      adminvalues["sessionId"] = sess;
  }

  get sessionId() {
      return adminvalues["sessionId"];
  }

  get adminvalues() {
      return adminvalues;
  }
}

window.customElements.define('smart-admin-config', SmartAdminConfig);
