import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

var values = {};

class SmartConfig extends PolymerElement {

  ready() {
      super.ready();
    for (var i = 0; i < this.attributes.length; ++i) {
        var attr = this.attributes[i];
        values[attr.nodeName] = attr.nodeValue;
        console.log("Set: " + attr.nodeName + ":" + attr.nodeValue);
    }
  }

  get server() {
      return values["server"];
  }

  get port() {
      return values["port"];
  }

  get tenant() {
      return values["tenant"];
  }

  set tenant(ten) {
      values["tenant"] = ten;
  }

  set sessionId(sess) {
      values["sessionId"] = sess;
  }

  get sessionId() {
      return values["sessionId"];
  }

  get values() {
      return values;
  }
}

window.customElements.define('smart-config', SmartConfig);
