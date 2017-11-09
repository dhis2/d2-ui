import React from "react";
import { render } from "react-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import D2UISvgIcon from "../../src/icon-svg/D2UISvgIcon";

const style = {
  margin: 16,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between"
};

const icons = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div style={style}>
      <D2UISvgIcon />
    </div>
  </MuiThemeProvider>
);

render(icons, document.getElementById("svgicon"));
