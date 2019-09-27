/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */

/* NPM - Node Package Manage */
import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import _map from 'lodash.map';
import _get from 'lodash.get';
import _isString from 'lodash.isstring';
import Emoji from 'node-emoji';

const SmartText = ({
  children: items,
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
  let smartChildren = items;

  /**
   * Maps children to limited markdown styles
   *
   * *italics* and **bold** supported
   */
  // TODO : This currently breaks nesting text components
  //   smartChildren = mapChildrenToTransformer(
  //     smartChildren,
  //     parseAsteriskInMarkdownString
  //   );

  /**
   * Maps children to <SmartText /> or <span /> components
   */
  smartChildren = mapChildrenToSmartText(smartChildren);

  /**
   * Maps children to relevant emoji e.g. :grin: to 😀
   *
   * Full list of supported Emoji available at:
   * https://unicodey.com/emoji-data/table.htm
   */
  smartChildren = mapChildrenToTransformer(smartChildren, Emoji.emojify);

  return (
    <RNText
      style={[
        {
          color,
          fontFamily: family,
          fontSize: size,
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
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
          opacity,
        },
        style,
      ]}
      {...props}
    >
      {smartChildren}
    </RNText>
  );

  /**
   * Maps children to transformation function
   *
   * @param {*} children
   * @param {*} transform
   *
   * @return {Array | String}
   */
  function mapChildrenToTransformer(children, transform) {
    // Id there are no complex elements in 'children' then we transform the string
    if (_isString(children)) {
      return transform(children);
    }

    return _map(children, (child, index) => {
      if (_isString(child)) {
        return transform(child, index);
      }

      return child;
    });
  }

  /**
   * Maps children and copies props from parent SmartText to any children
   * SmartText components to allow composition of text.
   *
   * @param children
   *
   * @return {Array}
   */
  function mapChildrenToSmartText(children) {
    /*
     * No complex objects exist in children, return children and don't map to SmartText,
     * this is important because if we were to `_map` a string it would return an array of
     * single letters ["h", "e", "a" ...], this will break any other iterators applied to
     * the children after `mapChildrenToSmartText` e.g. the emoji iterator needs to work
     * with full strings.
     */
    if (_isString(children)) {
      return children;
    }

    return _map(children, (child, index) => {
      const type = _get(child, 'type', null);

      if (type === SmartText || type === 'span') {
        const ownProps = _get(child, 'props', null);
        const children = _get(ownProps, 'children', null);

        return (
          <SmartText
            key={index}
            size={size}
            color={color}
            bold={bold}
            italic={italic}
            underline={underline}
            strikethrough={strikethrough}
            align={align}
            lineHeight={lineHeight}
            family={family}
            {...props}
            {...ownProps}
          >
            {children}
          </SmartText>
        );
      }

      return child;
    });
  }

  /**
   * Parses astericks in a string and replaces it with a styled <span />
   *
   * @param {*} string
   * @param {*} amount
   *
   * @return {String}
   */
  function parseAsteriskInMarkdownString(string) {
    let markdown = string;

    // We use (S^t) as a matching pattern as it is a unlikely occurance in any text
    markdown = markdown.replace(
      /\*{2}(.*?)\*{2}/g,
      (match, p1) => `=S^tS^t${p1}S^tS^t=`,
    );
    markdown = markdown.replace(
      /\*{1}(.*?)\*{1}/g,
      (match, p1) => `=S^t${p1}S^t=`,
    );

    return markdown.split(/=/g).map(item => {
      const text = item.replace(/(S\^t)/g, '');

      // **Double** asterisk is bold
      if (/(S\^t){2}(.*?)(S\^t){2}/.test(item)) {
        return <span bold>{text}</span>;
        // **single** asterisk is italic
      } else if (/(S\^t){1}(.*?)(S\^t){1}/.test(item)) {
        return <span italic>{text}</span>;
      }

      return text;
    });
  }

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
      return 'underline line-through';
    } else if (underline) {
      return 'underline';
    } else if (strikethrough) {
      return 'line-through';
    }

    return 'none';
  }
};

SmartText.propTypes = {
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
  style: PropTypes.any,
};

export default SmartText;
