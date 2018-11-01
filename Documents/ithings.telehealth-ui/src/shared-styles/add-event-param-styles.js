/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element';
import '@polymer/paper-styles/default-theme';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="add-event-param-styles">
  <template>    
    <style>
    .main-title {
      font-size: 22px;
      font-family: 'Roboto-Bold';
      color: var(--app-accent-color);
    }
    .main-header{
      padding: 23px 22px 10px 50px;
      box-sizing: border-box;
    }
    .btn-container {
      background: var(--app-accent-color);
      padding: 20px 21px 21px 0px;
    }
    .dialog-content-container {
      padding: 0px 8px 21px 26px;
    }
    .event-params-basic-detail-view {
      background: var(--light-theme-background-color);
      padding: 20px 0px 28px 32px;
    }
    .trigger-view-row-container {
      background: var(--light-theme-background-color);
      padding: 18px 32px 23px 32px;
      border-bottom: 2px solid var(--pale-blue-grey);
    }
    .dropdown-title{
      font-size: 14px;
      font-family: 'Roboto-Regular';
      color: var(--app-text-color);
      padding-bottom: 4px;
    }
    .editable-view {
      background: var(--light-blue-grey);
      color: var(--app-text-color);
      padding: 0px 17px;
      text-align: center;
      border-bottom: 2px solid #EDF5FA;
      font-family: 'Roboto-Regular';
    }
    .dropdown-width {
      width: 184px;
    }
    .from-drop-down {
      margin-right: 24px;
    }
    .dropdown-margin {
      margin-right: 48px;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
