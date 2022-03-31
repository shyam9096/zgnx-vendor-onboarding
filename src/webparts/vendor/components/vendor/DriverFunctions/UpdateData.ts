import "@pnp/polyfill-ie11";
import "@pnp/sp/lists/web";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import { IDetailsListBasicExampleItem } from "../../../../../interfaces/DetailsListBasicExampleItem.type";
import { IDetailsListBasicExampleState } from "../../../../../interfaces/DetailsListBasicExampleState.type";



export const updateData = (state: IDetailsListBasicExampleState, multiOpt: [any], getSelection: any, GetItems: any, updateStateFromCreatVendorItem: any) =>{
    sp.web.lists
      .getByTitle("Vendor Onboarding")
      .items.getById(
        (getSelection as IDetailsListBasicExampleItem).ID
      )
      .update({
        Title: state.title,
        Entity: { results: multiOpt },
        GxP_x0020_Suppliers: state.GxPSuppliers,
        Nature_x0020_of_x0020_Product: state.NatureofProduct,
        HCP_x002f_PAG_x002f_PO_x0020_Rep: state.HCPPAGPOReportable,
        Healthcare_x0020_Organization: state.HealthcareOrganization,
        Candidate_x0020_reimbursement: state.Candidatereimbursement,
        Payment_x0020_Method: state.PaymentMethod,
        Terms_x0020_of_x0020_Payment: state.TermsofPayment,
        Billing_x0020_Currency: state.BillingCurrency,
        Tax_x0020_Status: state.TaxStatus,
        Tax_x0020_ID: state.TaxID,
        Contact_x0020_Name: state.ContactName,
        Contact_x0020_Email: state.ContactEmail,
        Phone_x0020_Number: state.PhoneNumber,
        Vendor_x0020_website: state.Vendorwebsite,
        Fax_x0020_Number: state.FaxNumber,
      })
      .then(i => {
        console.log(i);
      });
    GetItems();
    //alert("Updated Successfully");

    state.tagdata.map((dataitem, Index) => {
      if (dataitem.Id == 0) {
        sp.web.lists
          .getByTitle("VendorAddressList")
          .items.add({
            Address_x0020_Line_x0020_1: dataitem.address1,
            Address_x0020_Line_x0020_2: dataitem.address2,
            Address_x0020_Line_x0020_3: dataitem.address3,
            Country: dataitem.Country,
            State: dataitem.State,
            City: dataitem.City,
            Zip: dataitem.Zip,
            Vendor_x0020_list_x0020_item_x00: dataitem.VlistID,
            Subsidiary_x0020_code: dataitem.SubsidiaryCode,
          })
          .then(r => {
            updateStateFromCreatVendorItem( "VlistID", r.data.ID );
            // alert("Created Successfully");
          });
      } else {
        var itemId = dataitem.Id;
        sp.web.lists
          .getByTitle("VendorAddressList")
          .items.getById(itemId)
          .update({
            Address_x0020_Line_x0020_1: dataitem.address1,
            Address_x0020_Line_x0020_2: dataitem.address2,
            Address_x0020_Line_x0020_3: dataitem.address3,
            Country: dataitem.Country,
            State: dataitem.State,
            City: dataitem.City,
            Zip: dataitem.Zip,
          })
          .then(r => {
            //console.log("Created Successfully");
          });
      }
    });

    let myfiled = (document.querySelector("#attachFomW9") as HTMLInputElement)
      .files[0];
    if (myfiled.size <= 10485760) {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.add(myfiled.name, myfiled, true)
        .then(f => {
          console.log(f);
          f.file.getItem().then(item => {
            item
              .update({
                ListItemID: state.uID,
                FileLeafRef: state.uID + "-" + "Item" + "-" + 1,
              })
              .then(myupdate => {
                console.log(myupdate);
                //alert("Created Successfully");
              });
          });
        });
    } else {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.addChunked(myfiled.name, myfiled)
        .then(({ file }) => file.getItem())
        .then((item: any) => {
          console.log("File Uploaded");
          return item
            .update({
              ListItemID: state.uID,
              FileLeafRef: state.uID + "-" + "Item" + "-" + 1,
            })
            .then(myupdate => {
              console.log(myupdate);
              //console.log("Created Successfully");
            });
        })
        .catch(console.log);
    }
    let myfilee = (document.querySelector("#attachFomW8") as HTMLInputElement)
      .files[0];
    if (myfilee.size <= 10485760) {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.add(myfilee.name, myfilee, true)
        .then(f => {
          console.log(f);
          f.file.getItem().then(item => {
            item
              .update({
                ListItemID: state.uID,
                FileLeafRef: state.uID + "-" + "Item" + "-" + 2,
              })
              .then(myupdate => {
                console.log(myupdate);
                //alert("Created Successfully");
              });
          });
        });
    } else {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.addChunked(myfilee.name, myfilee)
        .then(({ file }) => file.getItem())
        .then((item: any) => {
          console.log("File Uploaded");
          return item
            .update({
              ListItemID: state.uID,
              FileLeafRef: state.uID + "-" + "Item" + "-" + 2,
            })
            .then(myupdate => {
              console.log(myupdate);
              //console.log("Created Successfully");
            });
        })
        .catch(console.log);
    }
    let myfilef = (
      document.querySelector("#attachDownloadBankForm") as HTMLInputElement
    ).files[0];
    if (myfilef.size <= 10485760) {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.add(myfilef.name, myfilef, true)
        .then(f => {
          console.log(f);
          f.file.getItem().then(item => {
            item
              .update({
                ListItemID: state.uID,
                FileLeafRef: state.uID + "-" + "Item" + "-" + 3,
              })
              .then(myupdate => {
                console.log(myupdate);
                // alert("Created Successfully");
              });
          });
        });
    } else {
      sp.web
        .getFolderByServerRelativeUrl("/Vendor Onboarding Docs")
        .files.addChunked(myfilef.name, myfilef)
        .then(({ file }) => file.getItem())
        .then((item: any) => {
          console.log("File Uploaded");
          return item
            .update({
              ListItemID: state.uID,
              FileLeafRef: state.uID + "-" + "Item" + "-" + 3,
            })
            .then(myupdate => {
              console.log(myupdate);
              //console.log("Created Successfully");
            });
        })
        .catch(console.log);
    }
}