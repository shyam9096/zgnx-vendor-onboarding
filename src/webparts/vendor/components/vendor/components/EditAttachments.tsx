import * as React from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import {
  Checkbox,
  Dropdown,
  IDropdownStyles,
  TextField,
} from "office-ui-fabric-react";
const spinnerStyles = {
  circle: {
    height: 70,
    width: 70,
    borderWidth: 3,
  },
};

var SpinnerActivate: boolean = false;
let Application: any;

export const EditAttachments = ({
  res,
  Deletefilea,
  Deletefileb,
  Deletefilec,
  isEditable,
  state,
  NotApplication,
}) => {
  Application = state.NotApplication;
  let DefaultApplication: boolean;
  if (state.NotApplication == "false") {
    DefaultApplication = false;
  } else if (state.NotApplication == "true") {
    DefaultApplication = true;
  }
  return (
    <React.Fragment>
      {(state.currentUser == state.RequestorName ||
        state.VendorDocumentView == true) && (
        <div>
          <Checkbox
            label="Not Application"
            onChange={NotApplication}
            defaultChecked={DefaultApplication}
          />
          {state.NotApplication != "true" && (
            <div>
              <div>
                <h4>Attach Form W8 or W9</h4>{" "}
                {state.FileaID > 0 && (
                  <div>
                    <input
                      
                      type="file"
                      name="myFile"
                      id="attachFomW9"
                      disabled={isEditable}
                    ></input>
                    <br />
                    <a href={state.FileEncodedAbsUrlA} target="_blank">
                      {state.FileLinkFilenameA}
                    </a>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={isEditable}
                      onClick={Deletefilea}
                    >
                      Remove
                    </button>
                  </div>
                )}{" "}
                {state.FileaID == 0 &&
                  state.currentUser == state.RequestorName && (
                    <div>
                      {" "}
                      <input type="file" name="myFile" id="newfileA"></input>
                      <br></br>
                      <br></br>
                      {/* <a
                  href="https://zogenix.sharepoint.com/Shared%20Documents/fw9.pdf"
                  target="_blank"
                >
                  Please click here to download W9 Sample Document
                </a> */}
                    </div>
                  )}
              </div>
              <div>
                <h4>Attach Bank Instructions Form</h4>{" "}
                {state.FilebID > 0 && (
                  <div>
                    <input
                      type="file"
                      name="myFile"
                      id="attachDownloadBankForm"
                      disabled={isEditable}
                    ></input>
                    <br />
                    <a href={state.FileEncodedAbsUrlB} target="_blank">
                      {state.FileLinkFilenameB}
                    </a>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={isEditable}
                      onClick={Deletefileb}
                    >
                      Remove
                    </button>
                  </div>
                )}{" "}
                {state.FilebID == 0 &&
                  state.currentUser == state.RequestorName && (
                    <div>
                      <input type="file" name="myFile" id="newfileB"></input>
                      <br></br>
                      <br></br>
                      {/* <a
                  href="https://zogenix.sharepoint.com/Shared%20Documents/BANKING_INSTRUCTIONS_FORM.docx"
                  target="_blank"
                >
                  Please click here to download Banking Instructions Sample
                  Document
                </a> */}
                    </div>
                  )}
              </div>
              {/* <div>
                {" "}
                <p>Form W8 is available below for non-US vendors</p>
                <h4>Attach Form W8</h4>{" "}
                {state.FilecID > 0 && (
                  <div>
                    <input
                      type="file"
                      name="myFile"
                      id="attachFomW8"
                      disabled={isEditable}
                    ></input>
                    <br />
                    <a href={state.FileEncodedAbsUrlC} target="_blank">
                      {state.FileLinkFilenameC}
                    </a>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={isEditable}
                      onClick={Deletefilec}
                    >
                      Remove
                    </button>
                  </div>
                )}{" "}
                {state.FilecID == 0 &&
                  state.currentUser == state.RequestorName && (
                    <div>
                      {" "}
                      <input type="file" name="myFile" id="newfileC"></input>
                      <br></br>
                      <br></br>
                      <a
                  href="https://zogenix.sharepoint.com/Shared%20Documents/W8_Blank.pdf"
                  target="_blank"
                >
                  Please click here to download W8 Sample Document
                </a> 
                    </div>
                  )}
              </div> */}
              {/* {(state.FileaID == 0 || state.FilebID == 0 || state.FilecID == 0) &&
            state.currentUser == state.RequestorName && (
              <div>
                <button
                  type="button"
                  style={{
                    marginTop: 20,
                    backgroundColor: "#0078d4",
                    color: "white",
                  }}
                  // className={styles.button}
                  //disabled={isApply}
                  onClick={() => SaveAttachments(state.uID)}
                >
                  Submit
                </button>
                {SpinnerActivate == true && (
                  <div>
                    <Spinner
                      label="Updating Please Wait"
                      ariaLive="assertive"
                      labelPosition="top"
                      styles={spinnerStyles}
                    />
                  </div>
                )}
              </div>
            )}{" "} */}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export const SaveAttachments = (dataId, SectionDataFiles, Draftstatus, url) => {
  //var SectionData: any = [];
  //SectionData.push(SectionDataFiles);
  SpinnerActivate = true;
  try {
    let myfilea = (document.querySelector("#newfileA") as HTMLInputElement)
      .files[0];
    if (myfilea.size <= 10485760) {
      sp.web
        .getFolderByServerRelativeUrl(url)
        .files.add(myfilea.name, myfilea, true)
        .then((f) => {
          console.log(f);
          f.file.getItem().then((item) => {
            SectionDataFiles.push("W9");
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
    //   let myfilea = (document.querySelector("#newfilea") as HTMLInputElement)
    //     .files[0];
    // } catch (err) {
    //   alert("hello");
    // }
    let myfileb = (document.querySelector("#newfileB") as HTMLInputElement)
      .files[0];
    if (myfileb.size <= 10485760) {
      sp.web
        .getFolderByServerRelativeUrl(url)
        .files.add(myfileb.name, myfileb, true)
        .then((f) => {
          console.log(f);
          f.file.getItem().then((item) => {
            SectionDataFiles.push("BANKING");
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
  //   let myfilec = (document.querySelector("#newfileC") as HTMLInputElement)
  //     .files[0];
  //   if (myfilec.size <= 10485760) {
  //     sp.web
  //       .getFolderByServerRelativeUrl(url)
  //       .files.add(myfilec.name, myfilec, true)
  //       .then((f) => {
  //         console.log(f);
  //         f.file.getItem().then((item) => {
  //           SectionDataFiles.push("W8");
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
  //             // window.location.reload();
  //             //console.log("Created Successfully");
  //           });
  //       })
  //       .catch(console.log);
  //   }
  // } catch (err) {}
  window.setTimeout(function () {
    UpdateSectionDataFiles(dataId, SectionDataFiles, Draftstatus, Application);
  }, 10000);
};
function UpdateSectionDataFiles(
  dataId,
  SectionDataFiles,
  Draftstatus,
  Application
) {
  sp.web.lists
    .getByTitle("Vendor Onboarding")
    .items.getById(dataId)
    .update({
      Section2Data: { results: SectionDataFiles },
      IsDraft: Draftstatus,
      IsCheck: Application,
    })
    .then((i) => {
      window.setTimeout(function () {
        location.reload();
      }, 15000);
    });
}
