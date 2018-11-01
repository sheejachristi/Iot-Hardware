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

class MySubscriberGeneral extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }
      </style>

      <div class="content-title">
        <h2>Edit Service User Details</h2>
      </div>
      <div class="card-header">
        Service User Details
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Email</div>
                    <div class="readonlylabel">[[subscriber.email]]</div>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Name</div>
                    <input id="name" required type="text" value="[[subscriber.name]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Phone</div>
                    <input id="phone" type="text" required value="[[subscriber.phone]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-header">
        Service User Address
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Street1</div>
                    <input id="street1" required type="text" value="[[subscriber.facilityAddress.street1]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Street2</div>
                    <input id="street2" type="text" required value="[[subscriber.facilityAddress.street2]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Pincode</div>
                    <input id="pincode" required type="text" value="[[subscriber.facilityAddress.pincode]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">City</div>
                    <input id="city" type="text" required value="[[subscriber.facilityAddress.city]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">State</div>
                    <input id="state" required type="text" value="[[subscriber.facilityAddress.state]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Country</div>
                    <input id="country" type="text" required value="[[subscriber.facilityAddress.country]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_loginNow">SAVE</paper-button>
      </div>
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber"></telehealthcareflow-getsubscriberdetails>
    `;
  }

  static get properties() {
      return {
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

  loadData(email) {
    this.email = email;
    this.$.getdetails.getDetails(email);
  }
}

window.customElements.define('my-subscribergeneral', MySubscriberGeneral);
