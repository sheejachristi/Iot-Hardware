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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './smart/smart-config.js';
import './shared-styles/theme';
import './shared-styles/paper-button-styles';
import './my-navigation.js';
import './my-cookies.js';
import './my-providerdetails.js';
import './my-providerusers.js';
import './my-serviceusers.js';
import './my-subscribergeneral.js';
import './my-managecaretakers.js';
import './my-managedevices.js';
import './api/securityflow-validatesession.js';
import './api/telehealthcareflow-lookup.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style include="paper-button-styles iron-flex iron-flex-alignment iron-positioning">
        :host {
          display: block;
        }
        
        app-toolbar{
          height: 60px;
          color: #fff;
          padding: 0px 40px;
          background-color: var(--app-accent-color);
          box-sizing: border-box;
        }

        .welcome-text {
            font-size: 16px;
            margin: 10px;
        }

        app-drawer-layout{
          --app-drawer-width: 300px;
        }

        app-drawer{
          font-family: 'Roboto-Regular';
          --app-drawer-content-container: {
            background-color: var(--pale-blue-grey);
          }
        }

        .main-content.small{
          padding: 8px;
          height: calc(100% - 60px);
        }
        
        .page {
          display: none;
        }

        .page[active] {
          display: flex;
        }

        .main-content {
            margin: 26px 40px 0px 40px;
            box-sizing: border-box;
            height: 100%;
        }

        iron-pages {
            margin: 0px;
            padding: 0px;
        }

        #contentContainer {
            background-color: #fff !important;
        }

        paper-button.sign-in-btn {
            height: 30px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <smart-config id="globals" server="172.16.238.1" port="9081" tenant="sptest"></smart-config>
      <my-cookies id="cookies" user-Id="{{userId}}" session-id="{{sessionId}}"></my-cookies>
      <securityflow-validatesession id="validatesess"></securityflow-validatesession>
      <telehealthcareflow-lookup id="lookup" on-lookup-success="_setupProfile"></telehealthcareflow-lookup>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar><img id="header-logo" src="./src/images/ithings-logo.png" alt="iThings Health"></app-toolbar>
          <my-navigation sub-route="[[subroute]]" role-name="[[role]]" current-page="[[currentPage]]" rootPath="[[rootPath]]"></my-navigation>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout id="hd" has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar class="layout horizontal">
              <!--<paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>-->
              <span class="flex">&nbsp;</span>
              <div class="welcome-text">Welcome [[profileName]]</div>
              <paper-button class="filledWhite sign-in-btn" on-tap="_logout" hidden$="[[!validSession]]">logout</paper-button>
            </app-toolbar>
          </app-header>

          <div class="main-content">
              <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
                <my-login id="login" name="login" on-login-success="_loggedIn"></my-login>
                <my-providerdetails id="providerdetails" name="providerdetails"></my-providerdetails>
                <my-providerusers id="providerusers" name="providerusers"></my-providerusers>
                <my-serviceusers id="serviceusers" name="serviceusers" on-change-page="_changePage"></my-serviceusers>
                <my-subscribergeneral id="subscribergeneral" name="subscribergeneral"></my-subscribergeneral>
                <my-managecaretakers id="managecaretakers" name="managecaretakers"></my-managecaretakers>
                <my-managedevices id="managedevices" name="managedevices"></my-amanagedevices>
                <my-view1 name="view1"></my-view1>
                <my-view2 name="view2"></my-view2>
                <my-view3 name="view3"></my-view3>
                <my-view404 name="view404"></my-view404>
              </iron-pages>
          </div>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      sessionId: {
          type: String,
      },
      userId: {
          type: String,
      },
      role: {
          type: String,
          reflectToAttribute: true
      },
      currentPage: {
          type: String,
          notify: true
      },
      profileName: {
          type: String,
          reflectToAttribute: true
      },
      userId: {
          type: String,
          reflectToAttribute: true
      },
      roleName: {
        type: String,
        reflectToAttribute: true
      },
      routeData: Object,
      subroute: Object,
      validSession: {
          type: Boolean,
          value: false
      },
      profile: {
          type: Object,
          value: {}
      },
      activedata: {
          type: String
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
      super.ready();
      this.$.hd.$.contentContainer.style.backgroundColor = "#fff";
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
      if ((this.page != 'login') && !this.validSession) {
          var elem = this;
          var sess = (this.$.cookies.getCookie());
          if  ((sess != undefined) && (sess.length > 0)) {
            this.$.validatesess.validSession(sess, function() {
                elem.userId = elem.$.cookies.getUserId();
                elem.$.globals.sessionId = sess;
                elem.validSession = true;
                elem._setupApplication(page);
            }, function() {
                elem.page = "login";
            });
          } else {
              this.page = "login";
          }
      }

    if (!page) {
      this.page = 'login';
    } else if (['view1', 'view2', 'view3', 'login', 'providerdetails', 'providerusers', 'serviceusers', 'subscribergeneral', 'managecaretakers', 'managedevices'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    this.currentPage = page;
    switch (page) {
      case 'login':
        import('./my-login.js');
        break;
      case 'view1':
        import('./my-view1.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }

    if (this.validSession) {
        this._loadData(page);
    }
  }

  _loadData(page) {
    switch (page) {
      case 'managedevices':
          this.activedata = this.subroute.__queryParams.email;
          if (this.activedata != undefined) {
              this.$.managedevices.loadData(this.activedata);
          } else {
              this.page = "serviceusers";
          }

          break;
      case 'managecaretakers':
          this.activedata = this.subroute.__queryParams.email;
          if (this.activedata != undefined) {
              this.$.managecaretakers.loadData(this.activedata);
          } else {
              this.page = "serviceusers";
          }

          break;
      case 'subscribergeneral':
          this.activedata = this.subroute.__queryParams.email;
          if (this.activedata != undefined) {
              this.$.subscribergeneral.loadData(this.activedata);
          } else {
              this.page = "serviceusers";
          }

          break;
      case 'serviceusers':
          this.$.serviceusers.loadData();
          break;
      case 'providerusers':
          this.$.providerusers.loadData();
          break;
      case 'providerdetails':
        this.$.providerdetails.loadData();
        break;
    }
  }

  _loggedIn(event) {
      this.sessionId = event.detail.sessionId;
      this.userId = event.detail.userId;
      this.$.globals.sessionId = this.sessionId;
      this.validSession = true;
      this._setupApplication("");
  }

  _setupApplication(page) {
      var elem = this;
      this.$.validatesess.getPermittedFeatures(function(event) {
          elem.role = event.roleName;
          if (page == "") {
              page = "view1";
          }
          elem.page = page;
      }, function(event) {
          console.log(event);
      });

      this._getProfile();
      this._loadData(page);
  }

  _setupProfile(event) {
      if (event.detail.object != undefined) {
          this.profile = event.detail.object.result[0];
          if (this.profile != undefined) {
              this.profileName = this.profile.name;
          }
      }
  }

  _getProfile() {
      if ((this.userId != undefined) || (this.userId.length > 0)) {
          this.$.lookup.lookup("Profile", this.userId);
      }
  }

  _logout() {
      var elem = this;
      var sess = (this.$.cookies.getCookie());
      if  ((sess != undefined) && (sess.length > 0)) {
        this.$.validatesess.logout(sess, function() {
            elem.$.cookies.resetCookie();
            elem.validSession = false;
        }, function() {
        });
      }

      this.$.cookies.resetCookie();
      this.profileName = "";
      window.location =  window.location.protocol + "//" + window.location.host + this.rootPath;
  }

  _changePage(event) {
      this.activedata = event.detail.activedata;
      //this.page = event.detail.activepage;
      //this.set('route.path', "/" + event.detail.activepage + "?email=" + event.detail.activedata);
      window.location =  window.location.protocol + "//" + window.location.host + (this.rootPath + event.detail.activepage + "?" + event.detail.activedata);
  }
}

window.customElements.define('my-app', MyApp);
