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
import '../api/telehealthcareflow-registerindividual.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class SubscriberAdd extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Add Service User</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide User Details
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Email</div>
                        <input id="email" required type="email" placeholder="Please enter the service user email"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Name</div>
                        <input id="name" type="text" required placeholder="Please enter the service user name"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Phone</div>
                        <input id="phone" type="text" required placeholder="Please enter the service user phone"></input>
                    </div>
                </div>
            </div>
          </div>
          <div class="card-header">
            Provide User Address
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Street1</div>
                        <input id="street1" required type="text" placeholder="Please enter Door no, street"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Street2</div>
                        <input id="street2" type="text" placeholder="Please enter street location"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Pincode</div>
                        <input id="pincode" type="text" required placeholder="Please enter the pincode"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">City</div>
                        <input id="city" type="text" required placeholder="Please enter city"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">State</div>
                        <input id="state" type="text" required placeholder="Please enter the state"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Country</div>
                        <input id="country" type="text" required placeholder="Please enter the country"></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_registerIndividual">
        add service user
      </paper-button>
    </div>
    <telehealthcareflow-registerindividual id="register" on-registered-individual="_createdServiceUser"></telehealthcareflow-registerindividual>
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
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _registerIndividual() {
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var s1 = this.$.street1.value;
      var s2 = this.$.street2.value;
      var pc = this.$.pincode.value;
      var c = this.$.city.value;
      var st = this.$.state.value;
      var con = this.$.country.value;
      var lat = 12.6; //TODO:
      var lng = 75.6; //TODO:

      this.$.register.registerIndividual(email, name, phone, s1, s2, pc, c, st, con, lat, lng);
      
  }

  _createdServiceUser(event) {
      var email = this.$.email.value;
      this.close();
      this.dispatchEvent(new CustomEvent('serviceuser-created', { detail: { 'email': email }}));
  }

}

customElements.define('subscriber-add', SubscriberAdd);
