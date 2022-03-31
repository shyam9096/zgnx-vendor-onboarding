import { ChoiceGroup, Dropdown } from "@fluentui/react";
import { TextField } from "@microsoft/office-ui-fabric-react-bundle";
import * as React from "react";
import {
  VendorCountryOptions,
  zgxChoiceOptionsYesNo,
  zgxEntityOptions,
} from "../options/Options";

const VendorEditform = ({
  onInputChange,
  dropdownStyles,
  vendorChoiceEntityHandler,
  vendorChoiceHandler,
  vendorChoicePaymentMethodHandler,
  vendorChoiceTermsOfPaymentHandler,
  vendorChoiceTaxStatusHandler,
  state,
  isEditable,
  vendorChoiceBillingcurrency,
  HCPCountry,
}) => {
  return (
    <React.Fragment>
      <TextField
        label="Vendor / Payee Name"
        name="title"
        defaultValue={state.title}
        required
        onChange={onInputChange}
        readOnly
      />
      <Dropdown
        // defaultSelectedKeys={state.uEntity}
        selectedKeys={state.uEntity}
        multiSelect
        placeholder="Select an option"
        label="Entity"
        options={zgxEntityOptions}
        styles={dropdownStyles}
        required
        //disabled={true}
        //onChange={vendorChoiceEntityHandler}
      />
      <ChoiceGroup
        name="GxPSuppliers"
        // defaultSelectedKey={state.GxPSuppliers}
        selectedKey={state.GxPSuppliers}
        options={zgxChoiceOptionsYesNo}
        required
        onChange={vendorChoiceHandler}
        label="GxP Vendor"
        //disabled
      />
      <TextField
        //we have changed Label name "Nature of Product" into "Description of Goods or Services to be Provided"
        label="Description of Goods or Services to be Provided"
        name="NatureofProduct"
        defaultValue={state.NatureofProduct}
        required
        onChange={onInputChange}
        readOnly
      />
      <ChoiceGroup
        name="HCPPAGPOReportable"
        //defaultSelectedKey={state.HCPPAGPOReportable}
        selectedKey={state.HCPPAGPOReportable}
        options={zgxChoiceOptionsYesNo}
        required
        onChange={vendorChoiceHandler}
        label="HCP/PAG/PO Reportable"
      />
      {/* <TextField
        label="HCP/PAG/PO Name"
        name="HCPPAGPOName"
        defaultValue={state.HCPPAGPOName}
        required
        onChange={onInputChange}
        readOnly
      />
      <Dropdown
        //defaultSelectedKey={state.HCPPAGPOCountry}
        selectedKey={state.HCPPAGPOCountry}
        placeholder="Select an Country"
        label="HCP/PAG/PO Country"
        options={VendorCountryOptions}
        styles={dropdownStyles}
        required
        onChange={HCPCountry}
      /> */}
      <ChoiceGroup
        name="HealthcareOrganization"
        // defaultSelectedKey={state.HealthcareOrganization}
        selectedKey={state.HealthcareOrganization}
        options={zgxChoiceOptionsYesNo}
        required
        onChange={vendorChoiceHandler}
        label="Healthcare Organization"
      />
      <ChoiceGroup
        name="Candidatereimbursement"
        // defaultSelectedKey={state.Candidatereimbursement}
        selectedKey={state.Candidatereimbursement}
        options={zgxChoiceOptionsYesNo}
        required
        onChange={vendorChoiceHandler}
        label="Candidate reimbursement"
      />
      <Dropdown
        placeholder="Select an option"
        // defaultSelectedKey={state.PaymentMethod}
        selectedKey={state.PaymentMethod}
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
        //defaultSelectedKey={state.TermsofPayment}
        selectedKey={state.TermsofPayment}
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
          { key: "NET 90", text: "NET 90" },
          { key: "SVB Discount 2% 15 Net 4", text: "SVB Discount 2% 15 Net 4" },
        ]}
        styles={dropdownStyles}
        onChange={vendorChoiceTermsOfPaymentHandler}
      />
      <Dropdown
        placeholder="Select an option"
        // defaultSelectedKey={state.BillingCurrency}
        selectedKey={state.BillingCurrency}
        label="Billing Currency"
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
      <Dropdown
        placeholder="Select an option"
        // defaultSelectedKey={state.TaxStatus}
        selectedKey={state.TaxStatus}
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
      />{" "}
      {state.VendorDocumentView == true && (
        <TextField
          label="Tax ID"
          name="TaxID"
          defaultValue={state.TaxID}
          onChange={onInputChange}
          readOnly
        />
      )}
      <TextField
        label="Contact Name"
        name="ContactName"
        defaultValue={state.ContactName}
        required
        onChange={onInputChange}
        readOnly
      />
      <TextField
        label="Contact Email"
        name="ContactEmail"
        defaultValue={state.ContactEmail}
        required
        onChange={onInputChange}
        readOnly
      />
      <TextField
        label="Phone Number"
        name="PhoneNumber"
        defaultValue={state.PhoneNumber}
        required
        onChange={onInputChange}
        readOnly
      />
      {/* <TextField
        label="Fax Number"
        name="FaxNumber"
        defaultValue={state.FaxNumber}
        required
        onChange={onInputChange}
        readOnly
      /> */}
      <TextField
        label="Vendor website"
        name="Vendorwebsite"
        defaultValue={state.Vendorwebsite}
        onChange={onInputChange}
        readOnly
      />{" "}
      <br />
    </React.Fragment>
  );
};

export default VendorEditform;
