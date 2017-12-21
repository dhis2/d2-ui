import React from "react";
import { shallow } from "enzyme";
import { Access } from "../Access.component";
import { getStubContext } from "../../../config/inject-theme";

describe("Sharing: Access component", () => {
    let accessComponent;
    const renderComponent = (props = {}) => {
        accessComponent = shallow(<Access {...props} />, {
            context: getStubContext()
        });
    };

    const accessProps = {
        access: {
            data: { canView: true, canEdit: true },
            meta: { canView: false, canEdit: false }
        },
        accessOptions: {
            data: { canView: true, canEdit: true, noAccess: true },
            meta: { canView: true, canEdit: true, noAccess: true }
        },
        accessType: "user",
        primaryText: "Tom Wakiki",
        secondaryText: "Some description",
        onChange: () => {},
        onRemove: () => {},
        disabled: false
    };

    renderComponent(accessProps);

    it("should render subcomponents", () => {
        expect(accessComponent.find("SvgIcon")).toHaveLength(1);
        expect(accessComponent.find("PermissionPicker")).toHaveLength(1);
        expect(accessComponent.find("IconButton")).toHaveLength(1);
    });

    it("should show the primary and secondary text", () => {
        expect(accessComponent.text()).toContain(accessProps.primaryText);
        expect(accessComponent.text()).toContain(accessProps.secondaryText);
    });
});
