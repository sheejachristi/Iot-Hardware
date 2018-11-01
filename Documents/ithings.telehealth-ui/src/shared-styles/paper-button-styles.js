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
$_documentContainer.innerHTML = `<dom-module id="paper-button-styles">
  <template>    
  <style>
   paper-button {
      border-radius: 1px;
      font-size: 14px;
      font-family: 'Roboto-Bold';
      height: 50px;
      padding: 15px 45px;
      box-sizing: border-box;
      margin: 0px;
   }
    paper-button.filledBlue {
       border: 2px solid var(--app-accent-color);
       background-color: var(--app-accent-color);
       color: var( --light-theme-background-color);
    }
    paper-button.filledWhite {
      background-color: var( --light-theme-background-color);
      border: 2px solid var( --light-theme-background-color);
      color: var(--app-accent-color);
    }
    paper-button.borderBlue {
      background-color: var( --light-theme-background-color);
      color: var(--app-accent-color);
      border: 2px solid var(--app-accent-color);
    }
    paper-button.borderWhite {
      background-color: var(--app-accent-color);
      color: var(--light-theme-background-color);
      border: 2px solid var(--light-theme-background-color);
    }
    @media (max-width: 767px) {
      paper-button {
        font-size: 12px;
        padding: 0px 5px;
     }
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
