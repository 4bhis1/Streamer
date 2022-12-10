import { style } from "@mui/system";
import React from "react";
import View from "./View";

const CurvedBoxesWithShadows = ({ children, style, ...props }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        bgColor: "whitesmoke",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        ...style,
      }}
      {...props}
    >
      {children}
    </View>
  );
};

export default CurvedBoxesWithShadows;
