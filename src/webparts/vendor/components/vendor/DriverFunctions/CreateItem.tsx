import "@pnp/polyfill-ie11";
import "@pnp/sp/lists/web";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import { IDetailsListBasicExampleState } from "../../../../../interfaces/DetailsListBasicExampleState.type";
var SectionDataFiles: any;
export  class VendorService
{
  public async createVendorItems(state: IDetailsListBasicExampleState,
    updateStateFromCreatVendorItem,
    SplitData,
    url,
    DraftStatus)
  {
    return await sp.web.lists
    .getByTitle("Vendor Onboarding")
    .items.add({
      Title: state.title,
      Entity: { results: [state.entity] },
        VendorStatus: "Pending Creation",
        GxP_x0020_Suppliers: state.GxPSuppliers,
        Nature_x0020_of_x0020_Product: state.NatureofProduct,
        HCP_x002f_PAG_x002f_PO_x0020_Rep: state.HCPPAGPOReportable,
        HCP_x002f_PAG_x002f_PO_x0020_Nam: state.HCPPAGPOName,
        HCP_x002f_PAG_x002f_PO_x0020_Cou: state.HCPPAGPOCountry,
        Healthcare_x0020_Organization: state.HealthcareOrganization,
        Candidate_x0020_reimbursement: state.Candidatereimbursement,
        Payment_x0020_Method: state.PaymentMethod,
        Billing_x0020_Currency: state.BillingCurrency,
        Terms_x0020_of_x0020_Payment: state.TermsofPayment,
        Tax_x0020_Status: state.TaxStatus,
        Tax_x0020_ID: state.TaxID,
        Contact_x0020_Name: state.ContactName,
        Contact_x0020_Email: state.ContactEmail,
        Phone_x0020_Number: state.PhoneNumber,
        Fax_x0020_Number: state.FaxNumber,
        Vendor_x0020_website: state.Vendorwebsite,
        SIRET_x0020_CODE: state.SiretCode,
        RequestorsName: state.currentUser,
        IsDraft: DraftStatus,
        IsCheck: state.NotApplication,
    });
  }

}
export const createVendorItem = (
  state: IDetailsListBasicExampleState,
  updateStateFromCreatVendorItem,
  SplitData,
  url,
  DraftStatus
) => {
  return new Promise( async (resolve, reject) => {
    SectionDataFiles = [];
    if (
      !state.entity ||
      !state.ContactName ||
      !state.AddressOne ||
      !state.NatureofProduct ||
      // !state.PaymentMethod ||
      !state.TermsofPayment ||
      // !state.BillingCurrency ||
      !state.TaxStatus ||
      !state.ContactEmail ||
      !state.PhoneNumber ||
      !state.aState ||
      !state.aCountry ||
      !state.aCity ||
      !state.aZip
    ) {
      reject(false);
      return 0;
    }
    if (state.Shippingaddressform) {
      if (
        !state.ShippingAddressOne ||
        !state.ShippingCity ||
        !state.ShippingVendorCountry ||
        !state.ShippingState ||
        !state.ShippingZip
      ) {
        reject(false);
        return 0;
      }
    }
  let outcome = await sp.web.lists
      .getByTitle("Vendor Onboarding")
      .items.add({
        Title: state.title,
        Entity: { results: [state.entity] },
        VendorStatus: "Pending Creation",
        GxP_x0020_Suppliers: state.GxPSuppliers,
        Nature_x0020_of_x0020_Product: state.NatureofProduct,
        HCP_x002f_PAG_x002f_PO_x0020_Rep: state.HCPPAGPOReportable,
        HCP_x002f_PAG_x002f_PO_x0020_Nam: state.HCPPAGPOName,
        HCP_x002f_PAG_x002f_PO_x0020_Cou: state.HCPPAGPOCountry,
        Healthcare_x0020_Organization: state.HealthcareOrganization,
        Candidate_x0020_reimbursement: state.Candidatereimbursement,
        Payment_x0020_Method: state.PaymentMethod,
        Billing_x0020_Currency: state.BillingCurrency,
        Terms_x0020_of_x0020_Payment: state.TermsofPayment,
        Tax_x0020_Status: state.TaxStatus,
        Tax_x0020_ID: state.TaxID,
        Contact_x0020_Name: state.ContactName,
        Contact_x0020_Email: state.ContactEmail,
        Phone_x0020_Number: state.PhoneNumber,
        Fax_x0020_Number: state.FaxNumber,
        Vendor_x0020_website: state.Vendorwebsite,
        SIRET_x0020_CODE: state.SiretCode,
        RequestorsName: state.currentUser,
        IsDraft: DraftStatus,
        IsCheck: state.NotApplication,
      }) .then((VD) => {

        console.log(VD.data.ID);

        //updateStateFromCreatVendorItem( "dataid", r.data.ID );
        const dataId = VD.data.ID;
        //alert("Created Successfully");

        if (state.ShippingAddressOne != "") {
          sp.web.lists
            .getByTitle("VendorAddressList")
            .items.add({
              Address_x0020_Line_x0020_1: state.AddressOne,
              Address_x0020_Line_x0020_2: state.AddressTwo,
              Address_x0020_Line_x0020_3: state.AddressThree,
              Country: state.aCountry,
              State: state.aState,
              City: state.aCity,
              Zip: state.aZip,
              Vendor_x0020_list_x0020_item_x00: dataId,
              Subsidiary_x0020_code: SplitData,
              Address_x0020_Type: "Billing",
            })
            .then((VA) => {
              console.log(VA);
              updateStateFromCreatVendorItem("VlistID", VA.data.ID);
              //alert("Created Successfully");
            });

          sp.web.lists
            .getByTitle("VendorAddressList")
            .items.add({
              Address_x0020_Line_x0020_1: state.ShippingAddressOne,
              Address_x0020_Line_x0020_2: state.ShippingAddressTwo,
              Address_x0020_Line_x0020_3: state.ShippingAddressThree,
              Country: state.ShippingVendorCountry,
              State: state.ShippingState,
              City: state.ShippingState,
              Zip: state.ShippingZip,
              Vendor_x0020_list_x0020_item_x00: dataId,
              Subsidiary_x0020_code: SplitData,
              Address_x0020_Type: "Shipping",
            })
            .then((VA) => {
              console.log(VA);
              updateStateFromCreatVendorItem("VlistID", VA.data.ID);
              //alert("Created Successfully");
              window.setTimeout(function () {
                AddSectionData(dataId, SectionDataFiles);
              }, 25000);
            });
        } else {
          sp.web.lists
            .getByTitle("VendorAddressList")
            .items.add({
              Address_x0020_Line_x0020_1: state.AddressOne,
              Address_x0020_Line_x0020_2: state.AddressTwo,
              Address_x0020_Line_x0020_3: state.AddressThree,
              Country: state.aCountry,
              State: state.aState,
              City: state.aCity,
              Zip: state.aZip,
              Vendor_x0020_list_x0020_item_x00: dataId,
              Subsidiary_x0020_code: SplitData,
              Address_x0020_Type: "Both Shipping and Billing",
            })
            .then((VA) => {
              updateStateFromCreatVendorItem("VlistID", VA.data.ID);
              console.log(VA);
              //alert("Created Successfully");,
              //window.location.reload();
              window.setTimeout(function () {
                AddSectionData(dataId, SectionDataFiles);
              }, 25000);
            });
        }
        try {
          let myfilea = (document.querySelector("#newfile") as HTMLInputElement)
            .files[0];
          if (myfilea.size <= 10485760) {
            sp.web
              .getFolderByServerRelativeUrl(url)
              .files.add(myfilea.name, myfilea, true)
              .then((f) => {
                console.log(f);
                SectionDataFiles.push("W9");

                f.file.getItem().then((item) => {
                  item
                    .update({
                      ListItemID: dataId,
                      FileLeafRef: dataId + "-" + "Item" + "-" + 1,
                      S_x0020_Num: 1,
                    })
                    .then((myupdate) => {
                      console.log(myupdate);
                      //alert("Created Successfully");
                    });
                });
              });
          } else {
            sp.web
              .getFolderByServerRelativeUrl(url)
              .files.addChunked(myfilea.name, myfilea)
              .then(({ file }) => file.getItem())
              .then((item: any) => {
                console.log("File Uploaded");
                SectionDataFiles.push("W9");
                return item
                  .update({
                    ListItemID: dataId,
                    FileLeafRef: dataId + "-" + "Item" + "-" + 1,
                    S_x0020_Num: 1,
                  })
                  .then((myupdate) => {
                    console.log(myupdate);
                    //alert("Created Successfully");
                  });
              })
              .catch(console.log);
          }
        } catch (err) {}
        try {
          let myfileb = (
            document.querySelector("#newfilea") as HTMLInputElement
          ).files[0];
          if (myfileb.size <= 10485760) {
            sp.web
              .getFolderByServerRelativeUrl(url)
              .files.add(myfileb.name, myfileb, true)
              .then((f) => {
                console.log(f);
                SectionDataFiles.push("BANKING");

                f.file.getItem().then((item) => {
                  item
                    .update({
                      ListItemID: dataId,
                      FileLeafRef: dataId + "-" + "Item" + "-" + 2,
                      S_x0020_Num: 2,
                    })
                    .then((myupdate) => {
                      console.log(myupdate);
                      
                      //alert("Created Successfully");
                    });
                });
              });
          } else {
            sp.web
              .getFolderByServerRelativeUrl(url)
              .files.addChunked(myfileb.name, myfileb)
              .then(({ file }) => file.getItem())
              .then((item: any) => {
                console.log("File Uploaded");
                SectionDataFiles.push("BANKING");

                return item
                  .update({
                    ListItemID: dataId,
                    FileLeafRef: dataId + "-" + "Item" + "-" + 2,
                    S_x0020_Num: 2,
                  })
                  .then((myupdate) => {
                    console.log(myupdate);
                    //console.log("Created Successfully");
                  });
              })
              .catch(console.log);
          }
        } catch (err) {}
        // try {
        //   let myfilec = (
        //     document.querySelector("#newfileb") as HTMLInputElement
        //   ).files[0];
        //   if (myfilec.size <= 10485760) {
        //     sp.web
        //       .getFolderByServerRelativeUrl(url)
        //       .files.add(myfilec.name, myfilec, true)
        //       .then((f) => {
        //         console.log(f);
        //         SectionDataFiles.push("W8");

        //         f.file.getItem().then((item) => {
        //           item
        //             .update({
        //               ListItemID: dataId,
        //               FileLeafRef: dataId + "-" + "Item" + "-" + 3,
        //               S_x0020_Num: 3,
        //             })
        //             .then((myupdate) => {
        //               console.log(myupdate);
        //               //console.log("Created Successfully");
        //             });
        //         });
        //       });
        //   } else {
        //     sp.web
        //       .getFolderByServerRelativeUrl(url)
        //       .files.addChunked(myfilec.name, myfilec)
        //       .then(({ file }) => file.getItem())
        //       .then((item: any) => {
        //         console.log("File Uploaded");
        //         SectionDataFiles.push("W8");

        //         return item
        //           .update({
        //             ListItemID: dataId,
        //             FileLeafRef: dataId + "-" + "Item" + "-" + 3,
        //             S_x0020_Num: 3,
        //           })
        //           .then((myupdate) => {
        //             console.log(myupdate);
        //             window.location.reload();
        //             //console.log("Created Successfully");
        //           });
        //       })
        //       .catch(console.log);
        //   }
        // } catch (err) {}

        resolve(true);
      });
  });
};
// export const IsDraft = (
//   state: IDetailsListBasicExampleState,
//   updateStateFromCreatVendorItem,
//   SplitData,
//   url
// ) => {
//   return new Promise((resolve, reject) => {
//     SectionDataFiles = [];
//     sp.web.lists
//       .getByTitle("Vendor Onboarding")
//       .items.add({
//         Title: state.title,
//         Entity: { results: [state.entity] },
//         VendorStatus: "Pending Creation",
//         GxP_x0020_Suppliers: state.GxPSuppliers,
//         Nature_x0020_of_x0020_Product: state.NatureofProduct,
//         HCP_x002f_PAG_x002f_PO_x0020_Rep: state.HCPPAGPOReportable,
//         HCP_x002f_PAG_x002f_PO_x0020_Nam: state.HCPPAGPOName,
//         HCP_x002f_PAG_x002f_PO_x0020_Cou: state.HCPPAGPOCountry,
//         Healthcare_x0020_Organization: state.HealthcareOrganization,
//         Candidate_x0020_reimbursement: state.Candidatereimbursement,
//         Payment_x0020_Method: state.PaymentMethod,
//         Billing_x0020_Currency: state.BillingCurrency,
//         Terms_x0020_of_x0020_Payment: state.TermsofPayment,
//         Tax_x0020_Status: state.TaxStatus,
//         Tax_x0020_ID: state.TaxID,
//         Contact_x0020_Name: state.ContactName,
//         Contact_x0020_Email: state.ContactEmail,
//         Phone_x0020_Number: state.PhoneNumber,
//         Fax_x0020_Number: state.FaxNumber,
//         Vendor_x0020_website: state.Vendorwebsite,
//         SIRET_x0020_CODE: state.SiretCode,
//         RequestorsName: state.currentUser,
//         IsDraft: "No",
//       })
//       .then((VD) => {
//         console.log(VD.data.ID);

//         //updateStateFromCreatVendorItem( "dataid", r.data.ID );
//         const dataId = VD.data.ID;
//         //alert("Created Successfully");

//         if (state.ShippingAddressOne != "") {
//           sp.web.lists
//             .getByTitle("VendorAddressList")
//             .items.add({
//               Address_x0020_Line_x0020_1: state.AddressOne,
//               Address_x0020_Line_x0020_2: state.AddressTwo,
//               Address_x0020_Line_x0020_3: state.AddressThree,
//               Country: state.aCountry,
//               State: state.aState,
//               City: state.aCity,
//               Zip: state.aZip,
//               Vendor_x0020_list_x0020_item_x00: dataId,
//               Subsidiary_x0020_code: SplitData,
//               Address_x0020_Type: "Billing",
//             })
//             .then((VA) => {
//               console.log(VA);
//               updateStateFromCreatVendorItem("VlistID", VA.data.ID);
//               //alert("Created Successfully");
//             });

//           sp.web.lists
//             .getByTitle("VendorAddressList")
//             .items.add({
//               Address_x0020_Line_x0020_1: state.ShippingAddressOne,
//               Address_x0020_Line_x0020_2: state.ShippingAddressTwo,
//               Address_x0020_Line_x0020_3: state.ShippingAddressThree,
//               Country: state.ShippingVendorCountry,
//               State: state.ShippingState,
//               City: state.ShippingState,
//               Zip: state.ShippingZip,
//               Vendor_x0020_list_x0020_item_x00: dataId,
//               Subsidiary_x0020_code: SplitData,
//               Address_x0020_Type: "Shipping",
//             })
//             .then((VA) => {
//               console.log(VA);
//               updateStateFromCreatVendorItem("VlistID", VA.data.ID);
//               //alert("Created Successfully");
//               window.setTimeout(function () {
//                 AddSectionData(dataId, SectionDataFiles);
//               }, 9000);
//             });
//         } else {
//           sp.web.lists
//             .getByTitle("VendorAddressList")
//             .items.add({
//               Address_x0020_Line_x0020_1: state.AddressOne,
//               Address_x0020_Line_x0020_2: state.AddressTwo,
//               Address_x0020_Line_x0020_3: state.AddressThree,
//               Country: state.aCountry,
//               State: state.aState,
//               City: state.aCity,
//               Zip: state.aZip,
//               Vendor_x0020_list_x0020_item_x00: dataId,
//               Subsidiary_x0020_code: SplitData,
//               Address_x0020_Type: "Both Shipping and Billing",
//             })
//             .then((VA) => {
//               updateStateFromCreatVendorItem("VlistID", VA.data.ID);
//               console.log(VA);
//               //alert("Created Successfully");,
//               //window.location.reload();
//               window.setTimeout(function () {
//                 AddSectionData(dataId, SectionDataFiles);
//               }, 9000);
//             });
//         }
//         try {
//           let myfilea = (document.querySelector("#newfile") as HTMLInputElement)
//             .files[0];
//           if (myfilea.size <= 10485760) {
//             sp.web
//               .getFolderByServerRelativeUrl(url)
//               .files.add(myfilea.name, myfilea, true)
//               .then((f) => {
//                 console.log(f);
//                 SectionDataFiles.push("W9");

//                 f.file.getItem().then((item) => {
//                   item
//                     .update({
//                       ListItemID: dataId,
//                       FileLeafRef: dataId + "-" + "Item" + "-" + 1,
//                       S_x0020_Num: 1,
//                     })
//                     .then((myupdate) => {
//                       console.log(myupdate);
//                       //alert("Created Successfully");
//                     });
//                 });
//               });
//           } else {
//             sp.web
//               .getFolderByServerRelativeUrl(url)
//               .files.addChunked(myfilea.name, myfilea)
//               .then(({ file }) => file.getItem())
//               .then((item: any) => {
//                 console.log("File Uploaded");
//                 SectionDataFiles.push("W9");
//                 return item
//                   .update({
//                     ListItemID: dataId,
//                     FileLeafRef: dataId + "-" + "Item" + "-" + 1,
//                     S_x0020_Num: 1,
//                   })
//                   .then((myupdate) => {
//                     console.log(myupdate);
//                     //alert("Created Successfully");
//                   });
//               })
//               .catch(console.log);
//           }
//         } catch (err) {}
//         try {
//           let myfileb = (
//             document.querySelector("#newfilea") as HTMLInputElement
//           ).files[0];
//           if (myfileb.size <= 10485760) {
//             sp.web
//               .getFolderByServerRelativeUrl(url)
//               .files.add(myfileb.name, myfileb, true)
//               .then((f) => {
//                 console.log(f);
//                 SectionDataFiles.push("BANKING");

//                 f.file.getItem().then((item) => {
//                   item
//                     .update({
//                       ListItemID: dataId,
//                       FileLeafRef: dataId + "-" + "Item" + "-" + 2,
//                       S_x0020_Num: 2,
//                     })
//                     .then((myupdate) => {
//                       console.log(myupdate);
//                       //alert("Created Successfully");
//                     });
//                 });
//               });
//           } else {
//             sp.web
//               .getFolderByServerRelativeUrl(url)
//               .files.addChunked(myfileb.name, myfileb)
//               .then(({ file }) => file.getItem())
//               .then((item: any) => {
//                 console.log("File Uploaded");
//                 SectionDataFiles.push("BANKING");

//                 return item
//                   .update({
//                     ListItemID: dataId,
//                     FileLeafRef: dataId + "-" + "Item" + "-" + 2,
//                     S_x0020_Num: 2,
//                   })
//                   .then((myupdate) => {
//                     console.log(myupdate);
//                     //console.log("Created Successfully");
//                   });
//               })
//               .catch(console.log);
//           }
//         } catch (err) {}
//       });
//   });
// };
function AddSectionData(dataId, SectionDataFiles) {
  sp.web.lists
    .getByTitle("Vendor Onboarding")
    .items.getById(dataId)
    .update({
      Section2Data: { results: SectionDataFiles },
    })
    .then((i) => {
      window.setTimeout(function () {
        location.reload();
      }, 3000);
    });
}
