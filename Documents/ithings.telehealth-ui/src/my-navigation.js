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
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import './shared-styles/shared-styles.js';
import './icons/ithings-icons.js';

class MyNavigation extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        img {
            height: 54px;
            width: auto;
            border: 3px solid white;
            border-radius: 50%;
        }

        .fullname {
            font-size: 18px;
            font-weight: bold;
            margin-left: 16px;
            text-transform: none;
        }

        a {
            display: block;
            text-decoration: none;
            padding: 15px 15px;
            line-height: 20px;
            font-size: 14px;
            height: 50px;
            color: var(--app-text-color);
            text-transform: uppercase;
            box-sizing: border-box;
            outline: none;
        }

        iron-icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-left: 37px;
        }

        .backmenu {
            background-color: #E5EBEF;
            border-bottom: 1px solid var(--medium-blue-grey);
        }

        .mainmenu {
            background-color: #ECF2F6;
        }

        .globalmenu {
            background-color: #E5EBEF;
            border-top: 1px solid var(--medium-blue-grey);
        }

        a[selected] {
          color: var(--app-accent-color);
          background-color: white;
        }

        a iron-icon{
          --iron-icon-fill-color: var(--app-text-color);
        }

        a[selected] iron-icon{
          --iron-icon-fill-color: var(--app-accent-color);
        }

        .info {
            height: 98px;
        }

      </style>

      <template is="dom-if" if="[[showMenu]]">
          <iron-selector selected="[[currentPage]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <template is="dom-if" if="[[showPrevious]]">
                <div class="backmenu">
                    <a name="[[prevPage]]" href="[[rootPath]][[prevPage]]">
                        <iron-icon icon="ithings-icons:arrow-back"></iron-icon>
                        [[previousLabel]]
                    </a>
                </div>
            </template>
            <div class="mainmenu">
                <template is="dom-if" if="[[showProfile]]">
                    <a href="/" class="layout horizontal center info">
                        <img src="https://dummyimage.com/60x60/2f3042/2f3042">
                        <div class="fullname flex">[[name]]</div>
                    </a>
                </template>
                <template is="dom-repeat" items="[[currentNavigation]]">
                    <a name="[[item.page]]" href="[[rootPath]][[item.page]][[_getQueryParms(item.parms)]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                </template>
            </div>
            <div class="globalmenu">
                <template is="dom-repeat" items="[[globals]]">
                    <a name="[[item.page]]" href="[[rootPath]][[item.page]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                </template>
            </div>
          </iron-selector>
      </template>
    `;
  }

  static get properties() {
      return {
        showProfile: {
            type: Boolean,
            value: false
        },
        name: {
            type: String
        },
        prevPage: {
            type: String,
            value: "serviceusers"
        },
        previousLabel: {
            type: String,
            value: "Service User List"
        },
        showPrevious: {
            type: Boolean,
            value: false
        },
        rootPath: {
            type: String,
            reflectToAttribute: true
        },
        currentPage: {
            type: String,
            notify: true,
            observer: '_changeNavigation'
        },
        currentNavigation: {
            type: Array,
            reflectToAttribute: true
        },
        globals: {
            type: Array,
            value: [
                { label: "MY ACCOUNT", page: "accountsetup", icon: "account" }, 
                { label: "SUPPORT", page: "supportpage", icon: "support" }, 
                { label: "CONTACT", page: "contactpage", icon: "contact" }
            ]
        },
        firstlevel: {
            type: Object,
            value: {
                "tecadmin": [ 
                    { label: "SERVICE PROVIDER DETAILS", page: "providerdetails" }, 
                    { label: "USERS", page: "providerusers" }
                ],
                "tecassessor": [ 
                    { label: "SERVICE USERS", page: "serviceusers" }, 
                    { label: "CARE HOMES", page: "carehomes" }
                ],
                "techassistant": [
                    { label: "DEVICES", page: "devicespage" }
                ],
            }
        },
        secondlevel: {
            type: Object,
            value: { 
                "SERVICE USER": [ 
                    { label: "GENERAL DETAILS", page: "subscribergeneral", icon: "edit-patient", parms: ["email", "name"] }, 
                    { label: "MANAGE EVENTS", page: "manageevents", icon: "manage-events", parms: ["email", "name"] }, 
                    { label: "MANAGE DEVICES", page: "managedevices", icon: "manage-devices", parms: ["email", "name"]}, 
                    { label: "MANAGE CAREGIVERS", page: "managecaretakers", icon: "manage-categories", parms: ["email", "name"]}
                ],
                "CARE HOME": [ 
                    { label: "GENERAL DETAILS", page: "carehomegeneral" }, 
                    { label: "MANAGE EVENTS", page: "manageevents" }, 
                    { label: "MANAGE DEVICES", page: "managehomedevices" }
                ]
            }
        },
        pageNavigation: {
            type: Object,
            value: {}
        },
        showMenu: {
            type: Boolean,
            value: true
        },
        roleName: {
            type: String,
            observer: "_changeNavigation"
        },
        previousPage: {
            type: Object,
            value: {}
        },
        subRoute: {
            type: Object,
            observer: "_changeNavigation"
        }
      };
  }

  ready() {
      super.ready();
      this.pageNavigation = {};
      this.pageNavigation['login'] = [];
      this.pageNavigation['subscribergeneral'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['manageevents'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['managedevices'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['managecaretakers'] = this.secondlevel["SERVICE USER"];

      this.pageNavigation['carehomegeneral'] = this.secondlevel["CARE HOME"];
      this.pageNavigation['manageevents'] = this.secondlevel["CARE HOME"];
      this.pageNavigation['managehomedevices'] = this.secondlevel["CARE HOME"];

      this.previousPage['subscribergeneral'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['manageevents'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['managedevices'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['managecaretakers'] = { page: "serviceusers", label: "Service Users" };

  }

  _changeNavigation(page) {
      if (this.currentPage == 'login') {
          this.showMenu = false;
      } else {
          this.showMenu = true;
      }

      this.currentNavigation = this.pageNavigation[this.currentPage];

      if (this.currentNavigation == undefined) {
          var role = this.roleName;
          if (role == 'DefaultRole') {
              role = "tecadmin";
          }
          this.currentNavigation = this.firstlevel[role];
      }

      this.name = this.subRoute.__queryParams["name"];
      if (this.name != undefined) {
          this.showProfile = true;
      } else {
          this.showProfile = false;
      }

      var previous = this.previousPage[this.currentPage];
      if (previous != undefined) {
          this.showPrevious = true;
          this.previousLabel = previous.label;
          this.prevPage = previous.page;
      } else {
          this.showPrevious = false;
          this.previousLabel = "";
          this.prevPage = "";
      }
  }

  _getQueryParms(parms) {
      var query = "";
      if (parms != undefined) {
          query = "?";
          for (var i = 0; i < parms.length; i++) {
              query += parms[i] + "=" + this.subRoute.__queryParams[parms[i]] + "&";
          }
      }

      return query;
  }
}

window.customElements.define('my-navigation', MyNavigation);
