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
<dom-module id="input-styles">
  <template>    
  <style>     
  input{
    width: 100%;
    height: 44px;
    border: 1px solid var(--medium-blue-grey);
    background-color: white;
    outline: none;
    text-indent: 10px;
    font-family: 'Roboto-Regular';
    font-size: 14px;
    color: var(--app-text-color);
    box-sizing: border-box;
    }
    input:focus {
      outline: none;
    }
    input:focus {
      border: 1px solid var(--app-accent-color);
    }
    input:required {
      border: 1px solid var(--app-accent-color);
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
