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
import '../api/telehealthcareflow-assigncaretaker.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class CaretakerAssign extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Assign New Care Giver</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide Care Giver Details
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Email</div>
                        <input id="email" required type="email"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Name</div>
                        <input id="name" type="text" required></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Phone</div>
                        <input id="phone" type="text" required></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Care Giver Type</div>
                        <input id="type" required type="text"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Priority</div>
                        <input id="priority" required type="number"></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_assignCareTaker">
        add & assign
      </paper-button>
    </div>
    <telehealthcareflow-assigncaretaker id="assigncaretaker" on-assigned-caretaker="_assignedCaretaker"></telehealthcareflow-assigncaretaker>
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

  _assignCareTaker() {
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var type = this.$.type.value;
      var priority = this.$.priority.value;
      this.$.assigncaretaker.assignCaretaker(this.subscriber, email, name, phone, type, priority);
  }

  _assignedCaretaker(event) {
      var email = this.$.email.value;
      this.close();
      this.dispatchEvent(new CustomEvent('assigned-caretaker', { detail: { 'email': email }}));
  }

}

customElements.define('caretaker-assign', CaretakerAssign);
