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
import '@polymer/paper-button/paper-button.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './api/telehealthcareflow-getsubscriberdetails.js';
import './search/search-listview.js';
import './dialogs/device-add.js'

class MyManageDevices extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }
        .title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        .title-container {
          padding-bottom: 14px;
        }
      </style>

      <div class="content-title">
        <h2>Add/Edit Devices</h2>
      </div>
      <div class="card-header">
        <div class="flex-1 event-title self-end">User Devices</div>
      </div>
      <div class="card-content">
        <div class="content-two">
          <div class="layout horizontal title-container">
            <div class="flex title">Devices</div>
            <paper-button class="filledBlue" on-tap="_openAddEditDialog">+ add device</paper-button>
          </div>
          <search-listview class="search-result" columns="[[columns]]"
            search-result="{{subscriber.devices}}" mode="{{_mode}}" on-action-edit="_showDetails"></search-listview>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_loginNow">SAVE</paper-button>
      </div>
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber"></telehealthcareflow-getsubscriberdetails>
      <device-add id="addDevice" on-registered-device="reloadData" subscriber="[[subscriber.email]]"></device-add>
    `;
  }

  static get properties() {
      return {
      columns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "deviceId" },
              { flex: "flex-2", label: "deviceType" },
              { flex: "flex-1", label: "tag" },
          ]
      },
      subscriber: {
          type: Object
      },
      email: {
          type: String
      }
    };
  }

  _setupSubscriber(event) {
      if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }
  }

  _showError(event) {
      console.log(event.detail.error);
  }

  _openAddEditDialog() {
      this.$.addDevice.open();
  }

  reloadData() {
      this.loadData(this.email);
  }

  loadData(email) {
    this.email = email;
    this.$.getdetails.getDetails(email);
  }
}

window.customElements.define('my-managedevices', MyManageDevices);
