/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */

/* NPM - Node Package Manage */
import React from "react";
import { Text as RNText } from "react-native";
import _map from "lodash.map";
import _get from "lodash.get";
import _isString from "lodash.isstring";
import Emoji from "node-emoji";

interface IProps {
  children: any;
  size?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  align?: string;
  lineHeight?: number;
  family?: string;
  opacity?: number;
  style?: object;
  margin?: number;
  horizontal?: number;
  vertical?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

const SmartText = ({
  children: items,
  size = 18,
  color = "#000000",
  bold,
  italic,
  underline,
  strikethrough,
  align,
  lineHeight,
  family,
  opacity,
  style,
  margin = 0,
  horizontal = 0,
  vertical = 0,
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  ...props
}: IProps): any => {
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
          marginTop: top || vertical || margin,
          marginBottom: bottom || vertical || margin,
          marginLeft: left || horizontal || margin,
          marginRight: right || horizontal || margin,
          opacity
        },
        style
      ]}
      {...props}
    >
      {mapChildrenToEmoji(mapChildrenToSmartText(items))}
    </RNText>
  );

  /**
   * Maps children to relevant emoji e.g. :grin: to 😀
   *
   * Full list of supported Emoji available at:
   * https://unicodey.com/emoji-data/table.htm
   *
   * @param children
   *
   * @return {Array || String}
   */
  function mapChildrenToEmoji(children: any): any {
    // Id there are no complex elements in 'children' then we emojify the string
    if (_isString(children)) {
      return Emoji.emojify(children);
    }

    return _map(children, (child: string | React.Component) => {
      if (_isString(child)) {
        return Emoji.emojify(child);
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
  function mapChildrenToSmartText(children: any): any {
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

    return _map(children, (child: any, index: number): any => {
      const type = _get(child, "type", null);

      if (type === SmartText) {
        const ownProps = _get(child, "props", null);
        const children = _get(ownProps, "children", null);

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
   * We use this function to build our textDecorationLine style property.
   * We allow this to be configure through two boolean variables `underline`
   * and `strikethrough`, but the textDecorationLine style property needs
   * a string which controls these two properties, one of:
   * ['none', 'underline', 'line-through', 'underline line-through']
   *
   * @return {string}
   * @private
   */
  function _resolveTextDecorationLine(): string {
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

export { SmartText };
