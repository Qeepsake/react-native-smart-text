/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */

/* NPM - Node Package Manage */
import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

const LightText = ({
  children,
  size,
  color,
  bold,
  italic,
  underline,
  strikethrough,
  align,
  lineHeight,
  family,
  opacity,
  style,
  m = 0,
  mh = 0,
  mv = 0,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  p = 0,
  ph = 0,
  pv = 0,
  pt = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  ...props
}) => {
  return (
    <RNText
      style={[
        {
          color,
          fontFamily: family,
          fontSize: size,
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textAlign: align,
          lineHeight: lineHeight,
          textDecorationLine: _resolveTextDecorationLine(),
          marginTop: mt || mv || m,
          marginBottom: mb || mv || m,
          marginLeft: ml || mh || m,
          marginRight: mr || mh || m,
          paddingTop: pt || pv || p,
          paddingBottom: pb || pv || p,
          paddingLeft: pl || ph || p,
          paddingRight: pr || ph || p,
          opacity
        },
        style
      ]}
      {...props}
    >
      {children}
    </RNText>
  );

  /**
   * We use this function to build our textDecorationLine style property.
   * We allow this to be configure through two boolean variables `underline`
   * and `strikethrough`, but the textDecorationLine style property needs
   * a string which controls these two properties, one of:
   * ['none', 'underline', 'line-through', 'underline line-through']
   *
   * @return {string}
   * @private
   */
  function _resolveTextDecorationLine() {
    if (underline && strikethrough) {
      return "underline line-through";
    } else if (underline) {
      return "underline";
    } else if (strikethrough) {
      return "line-through";
    }

    return "none";
  }
};

LightText.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  strikethrough: PropTypes.bool,
  align: PropTypes.string,
  lineHeight: PropTypes.number,
  family: PropTypes.string,
  m: PropTypes.number,
  mh: PropTypes.number,
  mv: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  p: PropTypes.number,
  ph: PropTypes.number,
  pv: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  style: PropTypes.any
};

export default SmartText;