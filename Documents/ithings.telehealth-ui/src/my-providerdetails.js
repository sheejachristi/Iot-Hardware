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
import './api/telehealthcareflow-lookup.js';
import './api/telehealthcareflow-setupserviceprovider.js';
import './smart/smart-config.js';

class MyProviderDetails extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }

span
{
color:red;
}
 
      </style>

      <div class="content-title">
        <h2>Edit Service Provider Details</h2>
      </div>
      <div class="card-header">
        Service Provider Address
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Street1</div>

                    <input id="street1" required type="text" value="[[provider.address.street1]]"><span id="error_msg"></span></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Street2</div>
                    <input id="street2" type="text" required value='[[provider.address.street2]]'><span id="error_msg1"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Pincode</div>
                    <input id="pincode" required type="text" value="[[provider.address.pincode]]"><span id="error_msg2"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">City</div>
                    <input id="city" type="text" required value="[[provider.address.city]]"><span id="error_msg3"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">State</div>
                    <input id="state" required type="text" value="[[provider.address.state]]"><span id="error_msg4"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Country</div>
                    <input id="country" type="text" required value="[[provider.address.country]]"><span id="error_msg5"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-header">
        Primary Contact
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Service Provider Name</div>
                    <input id="name" required type="text" value="[[provider.providerName]]" readonly></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Contact Name<span>*</span></div>
                    <input id="name" required type="text" value="[[provider.primaryContact.name]]"><span id="error_msg6"></input> 
                    
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Contact Phone<span>*</span></div>
                    <input id="phone" type="text" required value="[[provider.primaryContact.phone]]"><span id="error_msg7"></input>
                </div>
<div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Contact Email</div>
                    <input id="email" required type="email" value="[[provider.primaryContact.email]]" readonly></input>
                </div>
            </div>

            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_saveNow">SAVE PROVIDER DETAILS</paper-button>
      </div>

      <smart-config id="globals"></smart-config>

      <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupProvider"></telehealthcareflow-lookup>
 <telehealthcareflow-setupserviceprovider id="setup"  on-setup-success="_setup"></ <telehealthcareflow-setupserviceprovider>
    `;
  }


  static get properties() {
      return {
        provider: {
            type: Object
        }
      };
  }

  _setupProvider(event) {
      if (event.detail.object != undefined) {
          this.provider = event.detail.object.result[0];
      }
  }
  _setup(event) {
  
      console.log(event);
}
  _showError(event) {
      console.log(event.detail.error);
  }

 _saveNow() {



 this.s1=this.$.street1.value;
 this.s2=this.$.street2.value;
 this.pc=this.$.pincode.value;
 this.cty=this.$.city.value;
 this.state=this.$.state.value;
 this.country=this.$.country.value;
 this.pname=this.$.name.value;
 this.pphone=this.$.phone.value;
 this.pemail=this.$.email.value;
 var name = this.$.globals.tenant;
 var pcreg=/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i; 
 var letter=/^[A-Za-z]+$/;
 var number=/^((?!(0))[0-9]{10})$/;

 if(this.s1 == "")
    {
  this.line = this.$.error_msg;
  this.line.innerHTML="Please fill the field";
  $(this.s1).css('border-color', 'red');
  return false;
    }
    else
    {
    this.line = this.$.error_msg;
    this.line.innerHTML="";
    }

 if(this.s2 == "")
    {
  this.line = this.$.error_msg1;
  this.line.innerHTML="Please fill the field";
  return false;
    }
     else
    {
    this.line = this.$.error_msg1;
    this.line.innerHTML="";
    }

 if(this.pc == "")
   {
  this.line = this.$.error_msg2;
  this.line.innerHTML="Please fill the field";
  return false;
    }
     else
    {
    this.line = this.$.error_msg2;
    this.line.innerHTML="";
    }

 if(!pcreg.test(this.pc))
    {
      this.line = this.$.error_msg2;
      this.line.innerHTML="Invalid PinCode format";
      return false;
    }
    else
    {
    this.line = this.$.error_msg2;
    this.line.innerHTML="";
    }

 if(this.cty == "")
   {
  this.line = this.$.error_msg3;
  this.line.innerHTML="Please fill the field";
  return false;
    }
    else
    {
    this.line = this.$.error_msg3;
    this.line.innerHTML="";
    }

   if(!letter.test(this.cty))
    {
  this.line = this.$.error_msg3;
  this.line.innerHTML="Invalid City";
  return false;     
    }
    else
    {
    this.line = this.$.error_msg3;
    this.line.innerHTML="";
    }

  if(this.state == "")
   {

   this.line = this.$.error_msg4;
   this.line.innerHTML="Please fill the field";
    return false;
    }
    else
    {
    this.line = this.$.error_msg4;
    this.line.innerHTML="";
    }

  if(!letter.test(this.state))
    {
  this.line = this.$.error_msg4;
  this.line.innerHTML="Invalid State";
  return false;     
    }
    else
    {
    this.line = this.$.error_msg4;
    this.line.innerHTML="";
    } 

  if(this.country == "")
   {

   this.line = this.$.error_msg5;
   this.line.innerHTML="Please fill the field";
   return false;
    }
     else
    {
    this.line = this.$.error_msg5;
    this.line.innerHTML="";
    }

 if(!letter.test(this.country))
    {
  this.line = this.$.error_msg5;
  this.line.innerHTML="Invalid Country";
  return false;     
    }
    else
    {
    this.line = this.$.error_msg5;
    this.line.innerHTML="";
    }

  if(this.pname == "")
   {

   this.line = this.$.error_msg6;
   this.line.innerHTML="Please fill the field";
   return false;
    }
     else
    {
    this.line = this.$.error_msg6;
    this.line.innerHTML="";
    }

 if(!letter.test(this.pname))
    {
  this.line = this.$.error_msg6;
  this.line.innerHTML="Invalid Contact Name";
  return false;     
    }
    else
    {
    this.line = this.$.error_msg6;
    this.line.innerHTML="";
    }

  if(this.pphone == "")
   {

  this.line = this.$.error_msg7;
  this.line.innerHTML="Please fill the field";
  return false;
    }
   else
    {
    this.line = this.$.error_msg7;
    this.line.innerHTML="";
    }

  if(!number.test(this.pphone))
    {
  this.line = this.$.error_msg7;
  this.line.innerHTML="Invalid Contact Phone";
  return false;     
    }
    else
    {
    this.line = this.$.error_msg7;
    this.line.innerHTML="";
    }

 this.$.setup.setupserviceprovider(name,this.s1,this.s2,this.pc,this.cty,this.state,this.country,this.pname,this.pemail,this.pphone);

  }
  loadData() {
      var pname = this.$.globals.tenant;
      this.$.lookup.lookup("ServiceProvider", pname);
  }

}



window.customElements.define('my-providerdetails', MyProviderDetails);
