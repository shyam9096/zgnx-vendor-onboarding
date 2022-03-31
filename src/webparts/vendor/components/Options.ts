import { IChoiceGroupOption, IColumn, IDropdownOption } from "office-ui-fabric-react";

export const zgxChoiceOptionsYesNo: IChoiceGroupOption[] = [
    { key: "Yes", text: "Yes" },
    { key: "No", text: "No" },
];

export const zgxEntityOptions: IDropdownOption[] = [
    { key: "ZINC: Zogenix, Inc.", text: "ZINC: Zogenix, Inc." },
    {
        key: "ZIL: Zogenix International Ltd",
        text: "ZIL: Zogenix International Ltd",
    },
    {
        key: "MODIS: Modis Therapeutics, Inc.",
        text: "MODIS: Modis Therapeutics, Inc.",
    },
    {
        key: "ZROI: Zogenix ROI (Republic of Ireland)",
        text: "ZROI: Zogenix ROI (Republic of Ireland)",
    },
    {
        key: "ZGMBH: Zogenix ZmBh (Germany)",
        text: "ZGMBH: Zogenix ZmBh (Germany)",
    },
    {
        key: "ZITA: Zogenix Srl (Italy)",
        text: "ZITA: Zogenix Srl (Italy)",
    },
    {
        key: "ZFR: Zogenix SAS (France)",
        text: "ZFR: Zogenix SAS (France)",
    },
];

export const zgxColumn: IColumn[] = [
    {
        key: "column1",
        name: "Vendor / Payee Name",
        fieldName: "Title",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: "column2",
        name: "Entity",
        fieldName: "Entity",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: "column3",
        name: "GxP Suppliers",
        fieldName: "GxP_x0020_Suppliers",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: "column4",
        name: "Nature of Product",
        fieldName: "Nature_x0020_of_x0020_Product",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: "column5",
        name: "HCP",
        fieldName: "HCP_x002f_PAG_x002f_PO_x0020_Rep",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
    {
        key: "column6",
        name: "Payment Method",
        fieldName: "Payment_x0020_Method",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    },
];