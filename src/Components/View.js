import { bgcolor } from "@mui/system";
import React from "react";

const View = ({ style, children, ...props }) => {
  const paddingLeft = style?.paddingHorizontal || 0;
  const paddingRight = style?.paddingHorizontal || 0;
  const marginLeft = style?.marginHorizontal || 0;
  const marginRight = style?.marginHorizontal || 0;

  const paddingTop = style?.paddingVertical || 0;
  const paddingBottom = style?.paddingVertical || 0;
  const marginTop = style?.marginVertical || 0;
  const marginBottom = style?.marginVertical || 0;


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft,
        paddingRight,
        marginLeft,
        marginRight,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom,
        backgroundColor : style?.bgColor || "transparent",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default View;
