"use strict";
/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* NPM - Node Package Manage */
var react_1 = require("react");
var react_native_1 = require("react-native");
var lodash_map_1 = require("lodash.map");
var lodash_get_1 = require("lodash.get");
var lodash_isstring_1 = require("lodash.isstring");
var node_emoji_1 = require("node-emoji");
var SmartText = function (_a) {
    var items = _a.children, _b = _a.size, size = _b === void 0 ? 18 : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, bold = _a.bold, italic = _a.italic, underline = _a.underline, strikethrough = _a.strikethrough, align = _a.align, lineHeight = _a.lineHeight, family = _a.family, opacity = _a.opacity, style = _a.style, _d = _a.margin, margin = _d === void 0 ? 0 : _d, _e = _a.horizontal, horizontal = _e === void 0 ? 0 : _e, _f = _a.vertical, vertical = _f === void 0 ? 0 : _f, _g = _a.top, top = _g === void 0 ? 0 : _g, _h = _a.bottom, bottom = _h === void 0 ? 0 : _h, _j = _a.left, left = _j === void 0 ? 0 : _j, _k = _a.right, right = _k === void 0 ? 0 : _k, props = __rest(_a, ["children", "size", "color", "bold", "italic", "underline", "strikethrough", "align", "lineHeight", "family", "opacity", "style", "margin", "horizontal", "vertical", "top", "bottom", "left", "right"]);
    return (react_1.default.createElement(react_native_1.Text, __assign({ style: [
            {
                color: color,
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
                opacity: opacity
            },
            style
        ] }, props), mapChildrenToEmoji(mapChildrenToSmartText(items))));
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
    function mapChildrenToEmoji(children) {
        // Id there are no complex elements in 'children' then we emojify the string
        if (lodash_isstring_1.default(children)) {
            return node_emoji_1.default.emojify(children);
        }
        return lodash_map_1.default(children, function (child) {
            if (lodash_isstring_1.default(child)) {
                return node_emoji_1.default.emojify(child);
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
        if (lodash_isstring_1.default(children)) {
            return children;
        }
        return lodash_map_1.default(children, function (child, index) {
            var type = lodash_get_1.default(child, "type", null);
            if (type === SmartText) {
                var ownProps = lodash_get_1.default(child, "props", null);
                var children_1 = lodash_get_1.default(ownProps, "children", null);
                return (react_1.default.createElement(SmartText, __assign({ key: index, size: size, color: color, bold: bold, italic: italic, underline: underline, strikethrough: strikethrough, align: align, lineHeight: lineHeight, family: family }, props, ownProps), children_1));
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
    function _resolveTextDecorationLine() {
        if (underline && strikethrough) {
            return "underline line-through";
        }
        else if (underline) {
            return "underline";
        }
        else if (strikethrough) {
            return "line-through";
        }
        return "none";
    }
};
exports.SmartText = SmartText;
