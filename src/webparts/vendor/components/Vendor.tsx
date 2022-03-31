import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
} from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import { IDropdownStyles } from "@fluentui/react/lib/Dropdown";
import { Panel } from "@fluentui/react/lib/Panel";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import "@pnp/polyfill-ie11";
import "@pnp/sp/lists/web";
import { ICamlQuery, sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import {
  ITextFieldStyles,
  TextField,
} from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IDetailsListBasicExampleItem } from "../../../interfaces/DetailsListBasicExampleItem.type";
import { IDetailsListBasicExampleState } from "../../../interfaces/DetailsListBasicExampleState.type";
import { IVendorProps } from "../../../interfaces/IVendorProps.type";
import { validateEmail } from "../../../utils/Validation";
import styles from "./Vendor.module.scss";
import {
  EditAttachments,
  SaveAttachments,
} from "./vendor/components/EditAttachments";
import VendorAddress from "./vendor/components/VendorAddress";
import VendorAddressEditform from "./vendor/components/VendorAddressEditform";
import VendorDetails from "./vendor/components/VendorDetails";
import VendorEditform from "./vendor/components/VendorEditform";
import { createVendorItem } from "./vendor/DriverFunctions/CreateItem";
//import { IsDraft } from "./vendor/DriverFunctions/CreateItem";

import {Sticky, 
	StickyPositionType} from "office-ui-fabric-react";

//import { SaveAttachments } from "../../vendor/components/vendor/components/VendorAddressEditform";
import { updateData } from "./vendor/DriverFunctions/UpdateData";
import { zgxChoiceOptionsYesNo, zgxColumn } from "./vendor/options/Options";
import { vendorState } from "./vendor/state-variables/state";

import { VendorService } from './vendor/DriverFunctions/CreateItem';

var VS = new VendorService();

var SectionDataFiles: any;
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  root: { height: 100 },
};
const spinnerStyles = {
  circle: {
    height: 100,
    width: 100,
    borderWidth: 4,
  },
};
const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px",
});

let DefaultEntity: string[] = [];
let elemClicked: any;
let data: any;
var addingentity: string[] = [];
var splitingKey: any;
var SplitData: any;
var addsplitingKey: any;
var addSplitData: any;


const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};

export default class Vendor extends React.Component<
  IVendorProps,
  IDetailsListBasicExampleState
> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  private options: IChoiceGroupOption[];

  constructor(props: IVendorProps) {
    super(props);
    // Declared state variables in separate file
    this.state = vendorState;

    this.createItem = this.createItem.bind(this);
    this.ondismiss = this.ondismiss.bind(this);

    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ selectionDetails: this._getSelectionDetails(true) }),
    });
if(zgxColumn!=undefined){
if(zgxColumn.length>0){
for(let i =0;i<zgxColumn.length;i++){
  // fieldName: "Title"
  // if(zgxColumn[i].fieldName=="Title"){
    // onColumnClick: this._onColumnClick,
    zgxColumn[i]["onColumnClick"]=this._onColumnClick
  // }
}
}
}
    this._columns = zgxColumn;
    this.options = zgxChoiceOptionsYesNo;
  }

  public async componentDidMount() {
    this.GetItems();
    let GroupNames = await sp.web.currentUser.groups.get();
    console.log(GroupNames);
    GroupNames.map((GroupName) => {
      if (GroupName.LoginName == "Vendor Document View") {
        this.setState({ VendorDocumentView: true });
      }
    });
    let user = await sp.web.currentUser();
    console.log(user.Title);
    this.setState({ currentUser: user.Title });
  }

  private Shippingaddress = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    isChecked?: boolean
  ) => {
    if (isChecked == true) {
      this.setState({ Shippingaddressform: true });
      console.log(`The option has been changed to ${isChecked}.`);
    } else {
      this.setState({ Shippingaddressform: false });
      console.log(`The option has been changed to ${isChecked}.`);
    }
  };
  private NotApplication = () => {
    if (this.state.NotApplication == "true") {
      this.SelectionDetails(false);
      this.setState({ NotApplication: "false" });
    } else {
      this.SelectionDetails(false);
      this.setState({ NotApplication: "true" });
    }
  };

  public SaveFile(uID, SectionDataFiles, Draftstatus) {
    let country: [];
    console.log();
    let myfilea: any;
    let myfileb: any;
    try {
      myfilea = (document.querySelector("#newfileA") as HTMLInputElement)
        .files[0];
    } catch {}
    try {
      myfileb = (document.querySelector("#newfileB") as HTMLInputElement)
        .files[0];
    } catch {}
    if (Draftstatus == "No") {
      if (this.state.tagdata[0].Country == "United States") {
        if (
          myfileb != undefined ||
          myfilea != undefined ||
          this.state.FileaID > 0 ||
          this.state.FilebID > 0 ||
          this.state.NotApplication == "true"
        ) {
          this.setState({ spinLoader: true });
          // alert("Sub");

          {
            SaveAttachments(uID, SectionDataFiles, Draftstatus, this.props.url);
          }
        } else {
          alert("Please upload either 'W8/W9 and Banking Instructions. If not applicable, select checkbox and hit submit");
        }
      } else {
        if (
          myfileb != undefined ||
          this.state.FilebID > 0 ||
          this.state.NotApplication == "true"
        ) {
          this.setState({ spinLoader: true });
          // alert("Sub");

          {
            SaveAttachments(uID, SectionDataFiles, Draftstatus, this.props.url);
          }
        } else {
          alert(
            "Please upload required documents. For Non-US, Banking is mandatory. Or click 'Not Applicable' checkbox, if documents are not applicable"
          );
        }
      }
    } else if (Draftstatus == "Yes") {
      this.setState({ spinLoader: true });
      // alert("Draft");

      {
        SaveAttachments(uID, SectionDataFiles, Draftstatus, this.props.url);
      }
    }
  }

  public GetItems() {
    {
      this.createItem;
    }
    sp.web.lists
      .getByTitle("Vendor Onboarding")
      .items.top(5000)
      .orderBy("ID", true)
      .filter("VendorStatus ne 'Approved'")
      .get()
      .then((itens) => {
        console.log(itens);
        this._allItems = itens;
        this.setState({
          items: itens,
          selectionDetails: this._getSelectionDetails(false),
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  public _onChange(ev: React.MouseEvent<HTMLElement>, readOnl) {
    console.log("toggle is " + (readOnl ? "checked" : "not checked"));
    if (readOnl == true) {
      this._getSelectionDetails(false);
    } else {
      this._getSelectionDetails(true);
    }
  }

  ondismiss = () => {
    this.setState({ isOpen: false, NotApplication: "" });
  };

  private ItemInvoked(): void {
    this.setState({ isOpen: true });
  }

  public render(): React.ReactElement<IVendorProps> {
    const { items, selectionDetails } = this.state;
    return (
      <Fabric className={styles.helloWorld}>
        {" "}
        {/*this.state.isFormVisible != true && (
          <div className={styles.heading}>
            <b>New Vendor Request Form</b>
          </div>
        )*/}{" "}
        {this.state.isFormVisible == true && (
          <div className={styles.heading}>
            <b>Start New Vendor Request Process</b>
          </div>
        )}
        <div style={{ float: "right", cursor: "pointer" }}>
          {this.state.showCancelIcon && (
            <Icon
              iconName="Cancel"
              onClick={this._alertClosed.bind(this)}
            ></Icon>
          )}
        </div>
        <div style={{ float: "right" }}>
          {this.state.closeNewForm && (
            <PrimaryButton
              onClick={this._alertClicked.bind(this)}
              text="New Onboarding Form"
            />
          )}
        </div>
        {this.state.isDetailsFormAvailable && (
          <React.Fragment>
            <Announced message={selectionDetails} />
            <TextField
              className={exampleChildClass}
              label="Filter by Vendor / Payee Name"
              onChange={this._onFilter}
              styles={textFieldStyles}
            />
          </React.Fragment>
        )}
        <Announced
          message={`Number of items after filter applied: ${items.length}.`}
        />
        
        <MarqueeSelection selection={this._selection}>
          {this.state.isDetailsFormAvailable && (
            <div>
              <DetailsList
                
                // stickyHeader={true}
                items={items}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                selectionMode={SelectionMode.single}
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="Row checkbox"
                onItemInvoked={this.ItemInvoked.bind(this)}
              />{" "}
            </div>
          )}{" "}
        </MarqueeSelection>
        
        <Panel  
          headerText="Vendor Details"
          isOpen={this.state.isOpen}
          onDismiss={this.ondismiss.bind(this)}
          closeButtonAriaLabel="Close"
        >
          {data}{" "}
          {
            this.state.spinfomodel?<div>
              {this.state.spinfo}
            </div>:""
          }
          {this.state.spinLoader && (
            <Stack>
              <Spinner
                label="Updating vendor details..."
                ariaLive="assertive"
                labelPosition="top"
                styles={spinnerStyles}
              />
            </Stack>
          )}
          {(this.state.FileaID == 0 ||
            this.state.FilebID == 0 ||
            this.state.FilecID == 0) &&
            this.state.currentUser == this.state.RequestorName && (
              <div>
                <button
                  className={styles.button}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#0078d4",
                    color: "white",
                  }}
                  onClick={this.SaveFile.bind(
                    this,
                    this.state.uID,
                    SectionDataFiles,
                    "No"
                  )}
                >
                  Submit
                </button>{" "}
                
                {/*<button
                  className={styles.button}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#0078d4",
                    color: "white",
                  }}
                  onClick={this.SaveFile.bind(
                    this,
                    this.state.uID,
                    SectionDataFiles,
                    "Yes"
                  )}
                >
                  Save as Draft
                  </button>  */}
              </div>
            )}
        </Panel>
        {this.state.isFormVisible && (
          <div>
            <p>
              <b>
                If Payee is not available, please submit a New Onboarding Form
                below
              </b>
            </p>
            <div className="form-group">
              <VendorDetails
                onInputChange={this.onInputChange}
                dropdownStyles={dropdownStyles}
                vendorChoiceHandler={this.vendorChoiceHandler}
                vendorChoiceTaxStatusHandler={this.vendorChoiceTaxStatusHandler}
                vendorChoiceTermsOfPaymentHandler={
                  this.vendorChoiceTermsOfPaymentHandler
                }
                vendorChoicePaymentMethodHandler={
                  this.vendorChoicePaymentMethodHandler
                }
                vendorChoiceBillingcurrency={this.vendorChoiceBillingcurrency}
                vendorChoiceEntityHandler={this.vendorChoiceEntityHandler}
                validateUniqueTitle={this.validateUniqueTitle}
                isError={this.state.isError}
                isTaxIDError={this.state.isTaxIDError}
                validateUniqueTaxID={this.validateUniqueTaxID}
                validateVendorEmail={this.validateVendorEmail}
                isEmailError={this.state.isEmailError}
                validatePhone={this.validatePhone}
                isPhoneError={this.state.isPhoneError}
                HCPCountry={this.HCPCountry}
                state={this.state}
              />

              <VendorAddress
                onInputChange={this.onInputChange}
                Shippingaddress={this.Shippingaddress}
                vendorCountry={this.vendorCountry}
                state={this.state}
                vendorShippingCountry={this.vendorShippingCountry}
                NotApplication={this.NotApplication}
              />
              <br></br>
              {this.state.spinLoader && (
                <Stack>
                  <Spinner
                    label="Saving Vendor Details..."
                    ariaLive="assertive"
                    labelPosition="top"
                    styles={spinnerStyles}
                  />
                </Stack>
              )}
            </div>
            <br />
            <div>
              <button
                type="button"
                className={styles.button}
                onClick={this.createItem.bind(this, "No")}
              >
                Submit
              </button>{" "}
              <button
                type="button"
                className={styles.button}
                onClick={this.createItem.bind(this, "Yes")}
              >
                Save as Draft
              </button>
            </div>
          </div>
        )}
      </Fabric>
    );
  }
  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    // alert("Alert");
    const { items } = this.state;
    const newColumns: IColumn[] = this._columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        // this.setState({
        //   announcedMessage: `${currColumn.name} is sorted ${
        //     currColumn.isSortedDescending ? 'descending' : 'ascending'
        //   }`,
        // });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this._columns= newColumns;
    this.setState({
      
      items: newItems,
    });
    function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
      const key = columnKey as keyof T;
      return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    }
  };
  
  // set spinner loader
  public setSpinnerLoader = (value: boolean) => {
    this.setState({ spinLoader: value });
  };
  public SelectionDetails(isEditable: any): any {
    const selectionCount = this._selection.getSelectedCount();
    if (selectionCount == 1) {
      this.vendor(
        (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).ID,
        isEditable
      );
    }
  }
  public _getSelectionDetails(isEditable: any): any {
    const selectionCount = this._selection.getSelectedCount();
    SectionDataFiles = [];
    this.setState({ FileaID: 0 });
    this.setState({ FilebID: 0 });
    this.setState({ FilecID: 0 });
    this.setState({ tagdata: [] });

    if (selectionCount == 1) {
      this.vendor(
        (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).ID,
        isEditable
      );
      console.log(
        (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
          .GxP_x0020_Suppliers
      );
      this.setState({
        RequestorName: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).RequestorsName,
      });
      console.log(
        (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
          .RequestorsName
      );
      this.setState({
        uID: (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
          .ID,
      });
      this.setState({
        title: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Title,
      });
      this.setState({
        HCPPAGPOName: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).HCP_x002f_PAG_x002f_PO_x0020_Nam,
      });
      this.setState({
        HCPPAGPOCountry: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).HCP_x002f_PAG_x002f_PO_x0020_Cou,
      });
      this.setState({
        uEntity: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Entity,
      });
      this.setState({
        GxPSuppliers: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).GxP_x0020_Suppliers,
      });
      this.setState({
        NatureofProduct: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Nature_x0020_of_x0020_Product,
      });
      this.setState({
        HCPPAGPOReportable: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).HCP_x002f_PAG_x002f_PO_x0020_Rep,
      });
      this.setState({
        HealthcareOrganization: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Healthcare_x0020_Organization,
      });
      this.setState({
        Candidatereimbursement: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Candidate_x0020_reimbursement,
      });
      this.setState({
        PaymentMethod: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Payment_x0020_Method,
      });
      this.setState({
        BillingCurrency: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Billing_x0020_Currency,
      });
      this.setState({
        TermsofPayment: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Terms_x0020_of_x0020_Payment,
      });
      this.setState({
        TaxStatus: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Tax_x0020_Status,
      });
      this.setState({
        TaxID: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Tax_x0020_ID,
      });
      this.setState({
        ContactName: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Contact_x0020_Name,
      });
      this.setState({
        ContactEmail: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Contact_x0020_Email,
      });
      this.setState({
        PhoneNumber: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Phone_x0020_Number,
      });
      this.setState({
        Vendorwebsite: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Vendor_x0020_website,
      });
      this.setState({
        FaxNumber: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Fax_x0020_Number,
      });
      this.setState({
        AddressOne: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Address_x0020_Line_x0020_1,
      });
      this.setState({
        AddressTwo: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Address_x0020_Line_x0020_2,
      });
      this.setState({
        AddressThree: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Address_x0020_Line_x0020_3,
      });
      this.setState({
        aCountry: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Country,
      });
      this.setState({
        aState: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).State,
      });
      this.setState({
        aCity: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).City,
      });
      this.setState({
        aZip: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).Zip,
      });
      this.setState({
        NotApplication: (
          this._selection.getSelection()[0] as IDetailsListBasicExampleItem
        ).IsCheck,
      });
      console.log(
        (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
          .Entity
      );
    } else {
      return `${selectionCount} items selected`;
    }
  }

  public async openmodel() {
    this.setState({ isOpen: true });
  }
  // public SectionData() {
  //   this.setState({ SectionData: "" });
  // }
  // public async UpdateVendorSectionData(uID) {
  //   alert(SectionDataFiles.length);
  //   this.SaveFile(uID);
  // }

  public async vendor(id, isEditable) {
    var attache = await sp.web.lists
      .getByTitle("VendorAddressList")
      .items.filter("Vendor_x0020_list_x0020_item_x00 eq " + id)
      .get()
      .then((addressitemvalues) => {
        if (addressitemvalues.length >= 1) {
          var tagData: any = [];
          for (var c = 0; c < addressitemvalues.length; c++) {
            tagData.push({
              Id: addressitemvalues[c].Id,
              Addresstype: addressitemvalues[c].Address_x0020_Type,
              options: {
                key: addressitemvalues[c].Subsidiary_x0020_code,
                text: this.state.uEntity[c],
              },
              address1: addressitemvalues[c].Address_x0020_Line_x0020_1,
              address2: addressitemvalues[c].Address_x0020_Line_x0020_2,
              address3: addressitemvalues[c].Address_x0020_Line_x0020_3,
              Country: addressitemvalues[c].Country,
              State: addressitemvalues[c].State,
              City: addressitemvalues[c].City,
              Zip: addressitemvalues[c].Zip,
              SubsidiaryCode: addressitemvalues[c].Subsidiary_x0020_code,
              VlistID: this.state.uID,
              addresstype: addressitemvalues[c].Address_x0020_Type,
            });
            this.setState({ tagdata: tagData });
            if (this.state.tagdata.length >= 1) {
              this.loadVendorDetails(isEditable);
            }
          }
        } else {
          this.loadVendorDetails(isEditable);
          setTimeout(this.openmodel.bind(this), 1000);
        }
      });
  }

  public loadVendorDetails(isEditable) {
    {
      var attachedFiles = sp.web.lists
        .getByTitle("Vendor Onboarding Docs")
        .items.select(
          "EncodedAbsUrl,FieldValuesAsText/FileRef,Title,File/Name,ID,ListItemID,LinkFilename,S_x0020_Num"
        )
        .filter(
          `ListItemID eq ${
            (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
              .ID
          }
         `
        )
        .orderBy("FileLeafRef", true)
        .expand("FieldValuesAsText")
        .get()
        .then((res: any) => {
          console.log(res);

          if (res.length >> 0) {
            res.map((FileID) => {
              if (FileID.S_x0020_Num == 1) {
                this.setState({ FileaID: FileID.ID });
                this.setState({
                  FileEncodedAbsUrlA: FileID.EncodedAbsUrl,
                });
                this.setState({
                  FileLinkFilenameA: FileID.LinkFilename,
                });
                SectionDataFiles.push("W9");
              }
              if (FileID.S_x0020_Num == 2) {
                this.setState({ FilebID: FileID.ID });
                this.setState({
                  FileEncodedAbsUrlB: FileID.EncodedAbsUrl,
                });
                this.setState({
                  FileLinkFilenameB: FileID.LinkFilename,
                });
                SectionDataFiles.push("BANKING");
              }
              if (FileID.S_x0020_Num == 3) {
                this.setState({ FilecID: FileID.ID });
                this.setState({
                  FileEncodedAbsUrlC: FileID.EncodedAbsUrl,
                });
                this.setState({
                  FileLinkFilenameC: FileID.LinkFilename,
                });
                SectionDataFiles.push("W8");
              }
            });
          }

          // if (res[0]) this.setState({ listitemidA: res[0].ListItemID });
          // } else {
          //   this.setState({ FileaID: 0 });
          //   this.setState({ FileEncodedAbsUrlA: "" });
          //   this.setState({ FileLinkFilenameA: "" });
          // }
          data = (
            <>
              <div>
                {/* <Toggle label="Edit" onText="Edit On" offText="Edit Off" onChange={this._onChange.bind(this)} /> */}
                <div className="form-group">
                  <VendorEditform
                    state={this.state}
                    isEditable={isEditable}
                    onInputChange={this.onInputChange}
                    dropdownStyles={dropdownStyles}
                    vendorChoiceEntityHandler={this.vendorChoiceEntityHandler}
                    vendorChoiceHandler={this.vendorChoiceHandler}
                    vendorChoiceTaxStatusHandler={
                      this.vendorChoiceTaxStatusHandler
                    }
                    vendorChoiceTermsOfPaymentHandler={
                      this.vendorChoiceTermsOfPaymentHandler
                    }
                    vendorChoicePaymentMethodHandler={
                      this.vendorChoicePaymentMethodHandler
                    }
                    vendorChoiceBillingcurrency={
                      this.vendorChoiceBillingcurrency
                    }
                    HCPCountry={this.HCPCountry}
                  />

                  {this.state.tagdata.map((addrsdata: any, index) => {
                    {
                      setTimeout(this.openmodel.bind(this), 0.5);
                    }
                    return (
                      <div>
                        <span>
                          <b>{addrsdata.SubsidiaryCode}</b>
                        </span>
                        <h4>Address Type:{addrsdata.addresstype}</h4>
                        <input type="hidden" value={addrsdata.Id}></input>
                        <VendorAddressEditform
                          onInputChange={this.onInputChange}
                          isEditable={isEditable}
                          vendorCountry={this.vendorCountry}
                          addrsdata={addrsdata}
                          index={index}
                          onAddressChange={this.onAddressChange}
                          dropdownStyles={dropdownStyles}
                        />
                        {console.log(data)}
                        <br />
                      </div>
                    );
                  })}
                  <EditAttachments
                    res={res}
                    NotApplication={this.NotApplication}
                    isEditable={isEditable}
                    Deletefilea={this.Deletefilea}
                    Deletefileb={this.Deletefileb}
                    Deletefilec={this.Deletefilec}
                    state={this.state}
                  />
                </div>
                <br />

                {/* <div>
              <button type="button" className="btn btn-primary" disabled={isEditable} onClick={this.UpdateData.bind(this)}>Update</button>
            </div> */}
              </div>
            </>
          );
        });
    }
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter(
            (i) => i.Title.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : this._allItems,
    });
    console.log(text);
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {};

  public onAddressChange = (ev: any, valueindex, valueData) => {
    let tagvalue = this.state.tagdata;
    tagvalue[valueindex].address1 = valueData;
    this.setState({ tagdata: tagvalue });
  };

  public addAddress1(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].address1 = valueData;
    this.setState({ tagdata: tagvalue });
  }

  public addAddress2(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].address2 = valueData;
    this.setState({ tagdata: tagvalue });
  }

  public addAddress3(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].address3 = valueData;
    this.setState({ tagdata: tagvalue });
  }

  public addCountry(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].Country = valueData;
    this.setState({ tagdata: tagvalue });
  }
  public addState(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].State = valueData;
    this.setState({ tagdata: tagvalue });
  }
  public addCity(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].City = valueData;
    this.setState({ tagdata: tagvalue });
  }
  public addZip(ev: any, valueindex, var2, valueData) {
    var tagvalue = this.state.tagdata;
    tagvalue[valueindex].Zip = valueData;
    this.setState({ tagdata: tagvalue });
  }

  // vendor choice group handler yes no basically
  // ToDo: React.FormEvent<HTMLInputElement> type of event, not working right now
  public vendorChoiceHandler = (ev: any, option: IChoiceGroupOption): void => {
    this.setState({ ...this.state, [ev.target.name]: option.key });
    if (ev.target.name == "HCPPAGPOReportable") {
      if (option.key == "No") {
        this.setState({ HideHCPCountryNameOptions: false });
      } else {
        this.setState({ HideHCPCountryNameOptions: true });
      }
    }
  };
  // vendor dropdown handlers
  public vendorChoiceEntityHandler = (
    ev: React.FormEvent<HTMLInputElement>,
    option: any
  ): void => {
    this.setState({ ...this.state, entity: option.key });
    console.log(option);
    elemClicked = option.text;
    var tagdata = this.state.tagdata;
    splitingKey = option.key.split(":");
    SplitData = splitingKey[0];

    if (option.selected == true) {
      tagdata.push({
        elemClicked,
        Id: 0,
        options: option,
        address1: "",
        address2: "",
        address3: "",
        Country: "",
        State: "",
        City: "",
        Zip: "",
        SubsidiaryCode: SplitData,
        VlistID: this.state.uID,
      });
      addingentity.push(elemClicked);
    } else {
      addingentity = addingentity.filter((item) => item !== null);
      var index = addingentity.indexOf(elemClicked);
      console.log(index);
      console.log(JSON.stringify(addingentity));
      if (index >= 0) {
        tagdata.splice(index + 1, 1);
        addingentity.splice(index, 1);
      }
    }
    this.setState({ tagdata: tagdata }, () => {});
    this._getSelectionDetails(false);
  };
  public vendorChoicePaymentMethodHandler = (
    ev: React.FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ): void => {
    this.setState({ ...this.state, PaymentMethod: option.key });
  };
  public vendorChoiceTermsOfPaymentHandler = (
    ev: React.FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ): void => {
    this.setState({ ...this.state, TermsofPayment: option.key });
  };
  public vendorChoiceTaxStatusHandler = (
    ev: React.FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ): void => {
    this.setState({ ...this.state, TaxStatus: option.key });
  };

  public vendorChoiceBillingcurrency = (
    ev: React.FormEvent<HTMLInputElement>,
    option: any
  ): void => {
    this.setState({ ...this.state, BillingCurrency: option.key });
  };

  public vendorCountry = (
    ev: React.FormEvent<HTMLInputElement>,
    option: any
  ): void => {
    this.setState({ ...this.state, aCountry: option.key });
  };

  public HCPCountry = (
    ev: React.FormEvent<HTMLInputElement>,
    option: any
  ): void => {
    this.setState({ ...this.state, HCPPAGPOCountry: option.key });
  };

  public vendorShippingCountry = (
    ev: React.FormEvent<HTMLInputElement>,
    option: any
  ): void => {
    this.setState({ ...this.state, ShippingVendorCountry: option.key });
  };

  // ToDo: set appropriate type to event instead of any;
  private onInputChange = async (ev: any) => {
    const { name, value } = ev.target;
    console.log(name, value);
    const titleBind = value;
    const statetitle = name;
    this.setState({
      ...this.state,
      [name]: value,
    });
    if ("title" == statetitle) {
      const titleFilter: ICamlQuery = await sp.web.lists
        .getByTitle("Vendor Onboarding")
        .getItemsByCAMLQuery({
          ViewXml:
            '<View><Query><Where><Eq><FieldRef Name="Title"/><Value Type="Text">' +
            titleBind +
            "</Value></Eq></Where></Query></View>",
        });
      console.log(titleFilter);
      this.setState({ titleUnique: titleFilter[0]?.Title });
    } else {
      const taxIDFilter: ICamlQuery = await sp.web.lists
        .getByTitle("Vendor Onboarding")
        .getItemsByCAMLQuery({
          ViewXml:
            '<View><Query><Where><Eq><FieldRef Name="Tax_x0020_ID"/><Value Type="Text">' +
            titleBind +
            "</Value></Eq></Where></Query></View>",
        });
      // console.log(taxIDFilter);
      this.setState({ taxIDUnique: taxIDFilter[0]?.Tax_x0020_ID });
    }
  };

  private validateUniqueTitle = (ev: any) => {
    const { value } = ev.target;
    if (this.state.titleUnique?.toLowerCase() == String(value).toLowerCase()) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
    }
  };

  //console.log(name, value)
  private validateUniqueTaxID = (ev: any) => {
    const { name, value } = ev.target;
    if (this.state.taxIDUnique?.toLowerCase() == String(value).toLowerCase()) {
      if (String(value).toLowerCase()) {
        this.setState({ isTaxIDError: true });
      } else {
        this.setState({ isTaxIDError: false });
      }
    } else {
      this.setState({ isTaxIDError: false });
    }
  };
  //validate Phone
  private validatePhone = (ev: any) => {
    const { value } = ev.target;
    if (value?.toString()?.length > 15 || value?.toString()?.length < 8) {
      this.setState({ isPhoneError: true });
    } else {
      this.setState({ isPhoneError: false });
    }
  };

  // handleValidation = () => {
  //   const { NatureofProduct } = this.state;
  //   let errors = { NatureofProduct: '' };

  //   if (!NatureofProduct) {
  //    errors.NatureofProduct = 'Nature is required';
  //   } else if (isNaN(NatureofProduct)) {
  //     errors.NatureofProduct = 'Nature must be a number';
  //   }

  // }

  // this function will use validateEmail function from utils folder
  // ValidateEmail function itself is validating email format with regx expression
  // validate email
  private validateVendorEmail = (ev: any) => {
    //console.log("validating email")
    const { value } = ev.target;
    if (validateEmail(value)) {
      //console.log("valid email")
      this.setState({ isEmailError: false });
    } else {
      //console.log("invalid email")
      this.setState({ isEmailError: true });
    }
  };

  // this function receives name and value of state to be set
  // after that it sets the state according to that
  // currently this function is used by createItem function
  private updateStateFromCreatVendorItem = (name: string, value: any) => {
    console.log("updating state of item vendor list");
    if (name === "dataid") {
      console.log("dataId: = ", value);
      this.setState({ dataid: value }, () => {
        console.log("updated dataid: = ", this.state.dataid);
      });
    } else if (name === "VlistID") {
      console.log("VlistID: - ", value);
      this.setState({ VlistID: value }, () => {
        console.log("updated vlistid: = ", this.state.VlistID);
      });
    }
  };
  // public IsDraft() {
  //   IsDraft(
  //     this.state,
  //     this.updateStateFromCreatVendorItem,
  //     SplitData,
  //     this.props.url
  //   ).then((data: boolean) => {
  //     console.log(data);
  //     //this.setState({ spinLoader: false });
  //     console.log("data created");
  //   });
  // }

  // createVendorItem record.
  public async createItem(DraftStatus) {
    let myfileb: any;
    let myfilea: any;

    try {
      myfileb = (document.querySelector("#newfilea") as HTMLInputElement)
        .files[0];
      console.log(myfileb);
    } catch {}
    try {
      myfilea = (document.querySelector("#newfile") as HTMLInputElement)
        .files[0];
      console.log(myfilea);
    } catch {}

    if (
      this.state.titleUnique != this.state.title &&
      this.state.taxIDUnique != this.state.TaxID
    ) {
      
      if (this.state.title != "") {
        if(this.state.BillingCurrency != ''){
        if (DraftStatus == "No") {
          if (
            this.state.aCountry == "United States" &&
            (this.state.ShippingVendorCountry == "United States" ||
              this.state.ShippingVendorCountry == "")
          ) {
            if (
              myfileb != undefined ||
              myfilea != undefined ||
              this.state.NotApplication == "true"
            ) {
              this.setState({ spinLoader: true });
              // let efg =
                  // await  VS.createVendorItems
               createVendorItem
              (
                this.state,
                this.updateStateFromCreatVendorItem,
                SplitData,
                this.props.url,
                DraftStatus
              )
                .then(async(boolean) => {
                  window.setTimeout(function () {
                    console.log(data);
                    this.setState({ spinfomodel:true });
                    console.log("Details Saved Successfuly!");
                    this.setState({spinfo:"Details Saved Successfuly!"});
                    this.setState({ spinLoader:false });
                  }, 30000);
               
                })
                .catch((error) => {
                  console.log(error.message);

                  this.setState({ spinfomodel: true });
                  this.setState({spinfo:error.message});
                  // alert("Please fill all the required fields");
                  this.setState({ spinLoader: false });
                });
            } else {
              alert(
                "Please upload either 'W8/W9 and Banking Instructions. If not applicable, select checkbox and hit submit"
              );
            }
          } else if (
            this.state.aCountry != "United States" &&
            (this.state.ShippingVendorCountry != "United States" ||
              this.state.ShippingVendorCountry == "")
          ) {
            if (myfileb != undefined || this.state.NotApplication == "true") {
              this.setState({ spinLoader: true });
             
              // await  VS.createVendorItems(
                let abc =   
              await createVendorItem(
                this.state,
                this.updateStateFromCreatVendorItem,
                SplitData,
                this.props.url,
                DraftStatus
              )
              // ;
              // console.log("abc");
              // console.log(abc);
                .then((data) => {

                  window.setTimeout(function () {
                    console.log(data);
                    this.setState({ spinfomodel:true });
                    console.log("Details Saved Successfuly!");
                    this.setState({spinfo:"Details Saved Successfuly!"});
                    this.setState({ spinLoader:false });
                  }, 30000);
                })
                .catch((error) => {
                  console.log(error.message);
                  // alert("Please fill all the required fields");
                  this.setState({ spinLoader: false });
                  this.setState({ spinfomodel: true });
                  this.setState({spinfo:error.message});
                });
            } else {
              alert("For Non-US vendor, Bank Instructions is mandatory");
            }
          }
        } else if (DraftStatus == "Yes") {
          this.setState({ spinLoader: true });
          let bcd 
            // await  VS.createVendorItems(
          = await createVendorItem(
            this.state,
            this.updateStateFromCreatVendorItem,
            SplitData,
            this.props.url,
            DraftStatus
          )
          // console.log("bcd");
          //     console.log(bcd);
            .then((data) => {

              window.setTimeout(function () {
                console.log(data);
                this.setState({ spinfomodel:true });
                console.log("Details Saved Successfuly!");
                this.setState({spinfo:"Details Saved Successfuly!"});
                this.setState({ spinLoader:false });
              }, 30000);
            })
            .catch((error) => {
              console.log(error.message);
              // alert("Please fill all the required fields");
              this.setState({ spinLoader: false });
              this.setState({ spinfomodel: true });
              this.setState({spinfo:error.message});
            });
        }

      }else {
        alert("Please select Billing Currency");
      }
    }
       else {
        alert("Please enter the Vendor / Payee Name");
      }
    } else {
      alert("Vendor Name / Tax ID already exists");
    }
  }

  private async UpdateData() {
    var multiOpt: any = [];
    {
      this.state.tagdata.map((addrsdata: any, index) => {
        multiOpt.push(addrsdata.options.text);
      });
    }
    updateData(
      this.state,
      multiOpt,
      this._selection.getSelection()[0],
      this.GetItems,
      this.updateStateFromCreatVendorItem
    );
  }

  private Deletefilea = () => {
    sp.web.lists
      .getByTitle("Vendor Onboarding Docs")
      .items.getById(this.state.FileaID)
      .delete()
      .then(function (data) {
        alert("Deleted Successfully");
      })
      .catch(function (data) {
        console.log(data);
      });
  };

  private Deletefileb = () => {
    sp.web.lists
      .getByTitle("Vendor Onboarding Docs")
      .items.getById(this.state.FilebID)
      .delete()
      .then(function (data) {
        alert("Deleted Successfully");
      })
      .catch(function (data) {
        console.log(data);
      });
  };

  private Deletefilec = () => {
    sp.web.lists
      .getByTitle("Vendor Onboarding Docs")
      .items.getById(this.state.FilecID)
      .delete()
      .then(function (data) {
        alert("Deleted Successfully");
      })
      .catch(function (data) {
        console.log(data);
      });
  };

  public _alertClicked() {
    this.setState({
      isFormVisible: true,
      isDetailsFormAvailable: false,
      showCancelIcon: true,
      closeNewForm: false,
    });
  }

  public _alertClosed() {
    this.setState({
      isFormVisible: false,
      isDetailsFormAvailable: true,
      showCancelIcon: false,
      closeNewForm: true,
    });
  }
}
