import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "VendorWebPartStrings";
import { IVendorProps } from "../../interfaces/IVendorProps.type";
import Vendor from "./components/Vendor";

export interface IVendorWebPartProps {
  description: string;
  url: any;
}

export default class VendorWebPart extends BaseClientSideWebPart<IVendorWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IVendorProps> = React.createElement(
      Vendor,
      {
        description: this.properties.description,
        url: this.properties.url,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField("description", {
                //   label: strings.DescriptionFieldLabel,
                // }),
                PropertyPaneTextField("url", {
                  label: "Site url for Document Library",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
