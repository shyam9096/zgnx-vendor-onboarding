import { ChoiceGroup, Dropdown, IDropdownStyles } from "@fluentui/react";
import { TextField } from "@microsoft/office-ui-fabric-react-bundle";
import * as React from "react";
import {
  VendorCountryOptions,
  zgxChoiceOptionsYesNo,
  zgxEntityOptions,
} from "../options/Options";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  root: { height: 100 },
};

const VendorDetails = ({
  onInputChange,
  vendorChoiceHandler,
  dropdownStyles,
  vendorChoiceEntityHandler,
  vendorChoicePaymentMethodHandler,
  vendorChoiceTermsOfPaymentHandler,
  vendorChoiceTaxStatusHandler,
  vendorChoiceBillingcurrency,
  validateUniqueTitle,
  isError,
  isTaxIDError,
  validateUniqueTaxID,
  validateVendorEmail,
  isEmailError,
  validatePhone,
  isPhoneError,
  HCPCountry,
  state,
}) => {
  return (
    <>
      <React.Fragment>
        <div>
          This form is required to ensure all 3rd-party suppliers are set-up in
          accordance with standard requirements defined by Zogenix. Prior to
          filling out this form please ensure your supplier does not already
          exist within Coupa. Please note, Section I is required at minimum to
          request a Legal Contract in CLM.
        </div>
        <br />
        <div>
          <b>For questions on using this form please contact </b>
          <a href="mailto:zogenix-procurement@zogenix.com">
            zogenix-procurement@zogenix.com
          </a>
        </div>
        <br />
        <h3>Section I: Basic Vendor Information</h3>
        <TextField
          label="Vendor / Payee Name"
          name="title"
          required
          onChange={onInputChange}
          onBlur={validateUniqueTitle}
        />
        <p style={{ color: "red" }} hidden={!isError}>
          {" "}
          The Vendor already exists, please choose another name
        </p>
        <p>
          (Name should match their legal entity name, as shown on the
          corresponding required governmental forms)
        </p>
        <Dropdown
          placeholder="Select an option"
          label="Entity"
          options={zgxEntityOptions}
          styles={dropdownStyles}
          required
          onChange={vendorChoiceEntityHandler}
        />
        <p>(Please select primary entity for initial set-up)</p>
        <ChoiceGroup
          name="GxPSuppliers"
          defaultSelectedKey="No"
          options={zgxChoiceOptionsYesNo}
          required
          onChange={vendorChoiceHandler}
          label="GxP Vendor?"
        />
        <p>
          A GxP Vendor, is any Vendor contracted by Zogenix, who performs or
          impacts manufacturing, testing, distribution, storage, safety data,
          clinical trial, non-clinical study, or regulatory filings, and any
          Vendor who supports our Quality Management System. For further
          information please refer to SOP010-WI01 : Using & Requesting GxP
          Vendors [9420-00497] or contact&nbsp;
          <a href="mailto:zogenix-procurement@zogenix.com">
            Zogenix Procurement
          </a>
          &nbsp;for assistance.
        </p>
        <TextField
          //we have changed Label name "Nature of Product" into "Description of Goods or Services to be Provided"
          label="Description of Goods or Services to be Provided "
          name="NatureofProduct"
          required
          onChange={onInputChange}
        />
        <br />
        <ChoiceGroup
          defaultSelectedKey="No"
          name="HCPPAGPOReportable"
          options={zgxChoiceOptionsYesNo}
          required
          onChange={vendorChoiceHandler}
          label="HCP/PAG/PO Reportable"
        />
        <p>
          Health Care Professional (HCP): Licensed Prescribers such as Medical
          Practitioners, MDs, Nurse Practitioners, Physician Assistants who are
          legally authorized to practice medicine. Reporting requirements
          include a large range of consulting arrangements, such as speaking at
          meetings, advisory boards, advise on drug development, health
          economics or best clinical practices.
          <br></br>
          <br></br>
          PAG (Patient Advocacy Group) or Patient Organizations (PO):
          Not-for-profit organizations (including the umbrella organizations to
          which they belong), mainly composed of patients and/or caregivers,
          that represent and/or support the needs of patients and/or caregivers.
        </p>
        {state.HideHCPCountryNameOptions == true && (
          <>
            <TextField
              label="HCP/PAG/PO Name"
              name="HCPPAGPOName"
              required
              onChange={onInputChange}
            />
            <Dropdown
              placeholder="Select an Country"
              label="HCP/PAG/PO Country"
              options={VendorCountryOptions}
              styles={dropdownStyles}
              required
              onChange={HCPCountry}
            />
          </>
        )}
        <ChoiceGroup
          defaultSelectedKey="No"
          name="HealthcareOrganization"
          options={zgxChoiceOptionsYesNo}
          required
          onChange={vendorChoiceHandler}
          label="Healthcare Organization"
        />
        <p>
          Health Care Organization (HCO): Teaching institutions, universities
          and clinics that conduct healthcare research. Payments are typically
          provided to an organization with a named HCP conducting the research”.
        </p>
        <ChoiceGroup
          defaultSelectedKey="No"
          name="Candidatereimbursement"
          options={zgxChoiceOptionsYesNo}
          required
          onChange={vendorChoiceHandler}
          label="Candidate reimbursement"
        />{" "}
        <p>
          Note: All U.S. based vendors must provide a tax ID except for
          candidate reimbursements
        </p>
        <Dropdown
          placeholder="Select an option"
          label="Payment Method"
          options={[
            { key: "ACH (US Companies Only)", text: "ACH (US Companies Only)" },
            { key: "Wire", text: "Wire" },
            { key: "Check (may be delayed)", text: "Check (may be delayed)" },
          ]}
          styles={dropdownStyles}
          onChange={vendorChoicePaymentMethodHandler}
        />
        <Dropdown
          placeholder="Select an option"
          label="Terms of Payment"
          options={[
            { key: "1% 10 Net 30", text: "1% 10 Net 30" },
            { key: "1% 30 NET 31", text: "1% 30 NET 31" },
            { key: "2% 10 NET 30", text: "2% 10 NET 30" },
            { key: "DUE ON RECEIPT", text: "DUE ON RECEIPT" },
            { key: "NET 10", text: "NET 10" },
            { key: "NET 15", text: "NET 15" },
            { key: "NET 20", text: "NET 20" },
            { key: "NET 25", text: "NET 25" },
            { key: "NET 30", text: "NET 30" },
            { key: "NET 45", text: "NET 45" },
            { key: "NET 60", text: "NET 60" },
            { key: "NET 90", text: "NET 90" },
            {
              key: "SVB Discount 2% 15 Net 4",
              text: "SVB Discount 2% 15 Net 4",
            },
          ]}
          styles={dropdownStyles}
          required
          onChange={vendorChoiceTermsOfPaymentHandler}
        />
        <Dropdown
          placeholder="Select an option"
          label="Billing Currency"
          required
          options={[
            { key: "USD", text: "USD" },
            { key: "GBP", text: "GBP" },
            { key: "ALB", text: "ALB" },
            { key: "AUD", text: "AUD" },
            { key: "BZD", text: "BZD" },
            { key: "CAD", text: "CAD" },
            { key: "CHF", text: "CHF" },
            { key: "CLP", text: "CLP" },
            { key: "DKK", text: "DKK" },
            { key: "EUR", text: "EUR" },
            { key: "JPY", text: "JPY" },
            { key: "KYD", text: "KYD" },
            { key: "SEK", text: "SEK" },
          ]}
          styles={dropdownStyles}
          onChange={vendorChoiceBillingcurrency}
        />
        <br></br>
        {/* <p>
          PLEASE NOTE:<br></br>
          1) A Completed IRS Form W-9 must be attached for ALL USD Vendors.
          <br></br>
          2) Payments will only be issued to the bank account holder name that
          matches either the W-9 form or the vendor name listed in the contract
          with Zogenix or its subsidiaries. Deviations from this practice will
          not be accepted.
        </p> */}
        <Dropdown
          placeholder="Select an option"
          label="Tax Status"
          options={[
            { key: "Corporation", text: "Corporation" },
            { key: "Employee", text: "Employee" },            
            {
              key: "Individual/Solo Proprietor",
              text: "Individual/Solo Proprietor",
            },
            { key: "Institution", text: "Institution" },
            { key: "Limited Liability", text: "Limited Liability" },
            { key: "Partnership", text: "Partnership" },            
          ]}
          styles={dropdownStyles}
          required
          onChange={vendorChoiceTaxStatusHandler}
        />
        {/* <p>
          Note: All U.S. based vendors must provide a tax ID except for
          candidate reimbursements.
        </p> */}
        <TextField
          label="Tax ID"
          name="TaxID"
          onChange={onInputChange}
          onBlur={validateUniqueTaxID}
        />
        <p style={{ color: "red" }} hidden={!isTaxIDError}>
          {" "}
          Tax ID already exists, please choose another Tax ID{" "}
        </p>
        <TextField
          label="Contact Name"
          required
          name="ContactName"
          onChange={onInputChange}
        />
        <TextField
          type="email"
          label="Contact Email"
          required
          name="ContactEmail"
          onChange={onInputChange}
          onBlur={(event) => {
            validateVendorEmail(event);
          }}
        />
        <p style={{ color: "red" }} hidden={!isEmailError}>
          {" "}
          Email is not valid{" "}
        </p>
        <TextField
          type="number"
          label="Phone Number"
          required
          name="PhoneNumber"
          onChange={onInputChange}
          onBlur={(event) => {
            validatePhone(event);
          }}
          maxLength={15}
        />
        <p style={{ color: "red" }} hidden={!isPhoneError}>
          {" "}
          Phone number is not valid{" "}
        </p>
        {/* <TextField
          label="Fax Number"
          required
          name="FaxNumber"
          onChange={onInputChange}
        /> */}
        <TextField
          label="Vendor website"
          name="Vendorwebsite"
          onChange={onInputChange}
        />{" "}
        <TextField
          label="SIRET CODE (if applicable)"
          name="SiretCode"
          onChange={onInputChange}
        />
      </React.Fragment>
    </>
  );
};

export default VendorDetails;
