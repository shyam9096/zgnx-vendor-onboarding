import { Dropdown, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { VendorCountryOptions } from "../options/Options";

const VendorAddressEditform = ({
  onInputChange,
  isEditable,
  addrsdata,
  onAddressChange,
  index,
  dropdownStyles,
  vendorCountry,
}) => {
  return (
    <React.Fragment>
      <TextField
        label="Address Line 1 "
        name="addressone"
        defaultValue={addrsdata?.address1}
        required
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
      <TextField
        label="Address Line 2 "
        name="AddressTwo"
        defaultValue={addrsdata.address2}
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
      <TextField
        label="Address Line 3 "
        name="AddressThree"
        defaultValue={addrsdata.address3}
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
      {/* <TextField
        label="Country"
        name="aCountry"
        required
        defaultValue={addrsdata.Country}
        onChange={event =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
       readOnly
      /> */}
      <Dropdown
        placeholder="Select an Country"
        label="Country"
        options={VendorCountryOptions}
        styles={dropdownStyles}
        //defaultSelectedKey={addrsdata.Country}
        selectedKey={addrsdata.Country}
        required
        onChange={vendorCountry}
      />
      <TextField
        label="State"
        name="aState"
        required
        defaultValue={addrsdata.State}
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
      <TextField
        label="City"
        name="aCity"
        required
        defaultValue={addrsdata.City}
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
      <TextField
        label="Zip"
        name="aZip"
        required
        defaultValue={addrsdata.Zip}
        onChange={(event) =>
          onAddressChange(
            event,
            index,
            (event.target as HTMLTextAreaElement).value
          )
        }
        readOnly
      />
    </React.Fragment>
  );
};

export default VendorAddressEditform;
