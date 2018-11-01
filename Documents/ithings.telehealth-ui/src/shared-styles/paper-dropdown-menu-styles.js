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
$_documentContainer.innerHTML = `<dom-module id="paper-dropdown-menu-styles">
  <template>    
  <style>
     :host{
      --paper-input-container-underline: {
        display: none;
      }
      --paper-input-container-underline-focus: {
        display: none;
      }
      --paper-listbox: {
        cursor: pointer;
        min-width: 150px;
      }
    }
    paper-dropdown-menu {
      border: 2px solid var(--medium-blue-grey);
      padding: 0px 5px;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
