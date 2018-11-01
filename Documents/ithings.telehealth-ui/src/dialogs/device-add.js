
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../shared-styles/shared-styles';
import '../shared-styles/input-styles';
import '../shared-styles/add-event-param-styles';
import '../api/telehealthcareflow-registersubscriberdevice.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class DeviceAdd extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Add User</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide Device Details
          </div>
          <div class="card-content">
            <div class="content-single">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Device Id</div>
                        <input id="deviceId" required type="text" placeholder="Give your device an id"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Device Type</div>
                        <input id="deviceType" type="text" required placeholder="Select a device type"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Connection String</div>
                        <input id="connection" type="text" required placeholder="Choose a connection method"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Device Location</div>
                        <input id="tag" type="text" required placeholder="Choose a when the device is placed."></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_registerDevice">
        add device
      </paper-button>
    </div>
    <telehealthcareflow-registersubscriberdevice id="register" on-registered-device="_registeredDevice"></telehealthcareflow-registersubscriberdevice>
   `;
  }

  static get properties() {
    return {
      _dialogElement: {
        type: Object,
        value: function() {
          return this;
        }
      },
      subscriber: {
          type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _registerDevice() {
      var did = this.$.deviceId.value;
      var dtype = this.$.deviceType.value;
      var conn = this.$.connection.value;
      var tag = this.$.tag.value;
      this.$.register.registerSubscriberDevice(this.subscriber, did, dtype, conn, tag);
  }

  _registeredDevice(event) {
      var did = this.$.deviceId.value;
      this.close();
      this.dispatchEvent(new CustomEvent('registered-device', { detail: { 'device': did }}));
  }

}

customElements.define('device-add', DeviceAdd);
