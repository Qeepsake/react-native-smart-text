/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */

/* NPM - Node Package Manage */
import React, { useContext } from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
/* Utils - Project Utilities */
import { _getFontStyles, _resolveTextDecorationLine } from './utils';
import { FontContext } from './index';

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
  const fonts = useContext(FontContext);
  const fontStyles = _getFontStyles(fonts, family, {
    weight: bold,
    style: italic ? 'italic' : 'normal',
  });

  return (
    <RNText
      style={[
        {
          color,
          fontSize: size,
          textAlign: align,
          lineHeight: lineHeight,
          textDecorationLine: _resolveTextDecorationLine(
            underline,
            strikethrough,
          ),
          marginTop: mt || mv || m,
          marginBottom: mb || mv || m,
          marginLeft: ml || mh || m,
          marginRight: mr || mh || m,
          paddingTop: pt || pv || p,
          paddingBottom: pb || pv || p,
          paddingLeft: pl || ph || p,
          paddingRight: pr || ph || p,
          opacity,
          ...fontStyles,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

LightText.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
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
  style: PropTypes.any,
};

export default LightText;
