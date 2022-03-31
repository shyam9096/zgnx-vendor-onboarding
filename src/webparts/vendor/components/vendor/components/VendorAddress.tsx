import {
  Checkbox,
  Dropdown,
  IDropdownStyles,
  TextField,
} from "office-ui-fabric-react";
import * as React from "react";
import { VendorCountryOptions } from "../options/Options";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  root: { height: 100 },
};

let pdflink: any =
  "https://zogenix.sharepoint.com/Shared%20Documents/W8_Blank.pdf";
const VendorAddress = ({
  onInputChange,
  Shippingaddress,
  vendorCountry,
  vendorShippingCountry,
  state,
  NotApplication,
}) => {
  return (
    <React.Fragment>
      <p>
        <b>Vendor Address</b>
      </p>
      <TextField
        label="Address Line 1 "
        required
        name="AddressOne"
        onChange={onInputChange}
      />
      <TextField
        label="Address Line 2 "
        name="AddressTwo"
        onChange={onInputChange}
      />
      <TextField
        label="Address Line 3 "
        name="AddressThree"
        onChange={onInputChange}
      />
      <TextField
        label="State"
        required
        name="aState"
        onChange={onInputChange}
      />
      <TextField label="City" required name="aCity" onChange={onInputChange} />
      <TextField label="Zip" required name="aZip" onChange={onInputChange} />
      <Dropdown
        placeholder="Select an Country"
        label="Country"
        options={VendorCountryOptions}
        styles={dropdownStyles}
        required
        onChange={vendorCountry}
      />
      <br />
      <Checkbox
        label="Is Shipping Address different from Billing Address"
        onChange={Shippingaddress}
      />
      <br />
      {state.Shippingaddressform && (
        <div className="form-group">
          <span>
            <b>Please Enter the Shipping Address Details</b>
          </span>
          <TextField
            label="Address Line 1 "
            required
            name="ShippingAddressOne"
            onChange={onInputChange}
          />
          <TextField
            label="Address Line 2 "
            name="ShippingAddressTwo"
            onChange={onInputChange}
          />
          <TextField
            label="Address Line 3 "
            name="ShippingAddressThree"
            onChange={onInputChange}
          />
          <TextField
            label="State"
            required
            name="ShippingState"
            onChange={onInputChange}
          />
          <TextField
            label="City"
            required
            name="ShippingCity"
            onChange={onInputChange}
          />
          <TextField
            label="Zip"
            required
            name="ShippingZip"
            onChange={onInputChange}
          />
          <Dropdown
            placeholder="Select an Country"
            label="Country"
            options={VendorCountryOptions}
            styles={dropdownStyles}
            required
            onChange={vendorShippingCountry}
          />
        </div>
      )}{" "}
      {/* This is attachment files */}
      <h4>PLEASE NOTE:</h4>
      <p>
        Completion of both <b>Section I and II</b> are required for your request
        to be processed
      </p>
      <p>
        A Completed IRS Form W-9 must be on hand for ALL USD Vendors. Payments
        will only be issued to the bank account holder name that matches either
        the W-9 form or the Vendor name listed in the contract with Zogenix or
        its subsidiaries – No deviations allowed
      </p>
      <p>
        All banking and government documents must be received prior to contract
        execution.
      </p>
      <p>
        Expedite Vendor Information for Legal Contracting - In the event the
        required files shown below are not available and the Vendor information
        is needed to start the Legal Contracting process, the requester can
        submit the partially completed form after Section I is complete. This
        allows for the <b>Section I</b> Vendor information to ONLY be sent to
        the Legal Contracting System. The user is required to return to the
        previously submitted form, attached the required documents, and select
        the <b>SUBMIT</b> button.{" "}
      </p>
      <p>
        All banking and government documents must be received prior to contract
        execution
      </p>
      <h3>Section II: Vendor Payment and Banking Information </h3>
      <Checkbox label="Not Applicable" onChange={NotApplication} />
      {state.NotApplication != "true" && (
        <div>
          <div>
            <h4>Attach Form W8 or W9</h4>
            <input type="file" name="myFile" id="newfile"></input>
            <br></br>
            <br></br>
            <a
              href="https://zogenix.sharepoint.com/Shared%20Documents/fw9.pdf"
              target="_blank"
            >
              Please click here to download W9 Sample Document
            </a>
          </div>
          <div>
            <h4>Attach Bank Instructions Form</h4>
            <input type="file" name="myFile" id="newfilea"></input>
            <br></br>
            <br></br>
            <a
              href="https://zogenix.sharepoint.com/Shared%20Documents/BANKING_INSTRUCTIONS_FORM.docx"
              target="_blank"
            >
              Please click here to download Banking Instructions Sample Document
            </a>
          </div>
        </div>
      )}
      {/* <div>
        <h4>Attach Form W8</h4>
        <p>Form W8 is available below for non-US vendors</p>
        <input type="file" name="myFile" id="newfileb"></input>
        <br></br>
        <br></br>

        <a
          href="https://zogenix.sharepoint.com/Shared%20Documents/W8_Blank.pdf"
          target="_blank"
        >
          Please click here to download W8 Sample Document
        </a>
      </div> */}
    </React.Fragment>
  );
};

export default VendorAddress;
