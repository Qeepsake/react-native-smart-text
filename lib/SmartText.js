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
/* NPM - Node Package Manage */
import React, { useContext } from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _isString from 'lodash.isstring';
import _map from 'lodash.map';
import _flatten from 'lodash.flatten';
import Emoji from 'node-emoji';
/* Utils - Project Utilities */
import { _getFontStyles, _resolveTextDecorationLine } from "./utils";
import { FontContext } from "./index";
/* Components */
import LightText from './LightText';
var SmartText = function (_a) {
    var items = _a.children, size = _a.size, color = _a.color, bold = _a.bold, italic = _a.italic, underline = _a.underline, strikethrough = _a.strikethrough, align = _a.align, lineHeight = _a.lineHeight, family = _a.family, opacity = _a.opacity, style = _a.style, _b = _a.m, m = _b === void 0 ? 0 : _b, _c = _a.mh, mh = _c === void 0 ? 0 : _c, _d = _a.mv, mv = _d === void 0 ? 0 : _d, _e = _a.mt, mt = _e === void 0 ? 0 : _e, _f = _a.mb, mb = _f === void 0 ? 0 : _f, _g = _a.ml, ml = _g === void 0 ? 0 : _g, _h = _a.mr, mr = _h === void 0 ? 0 : _h, _j = _a.p, p = _j === void 0 ? 0 : _j, _k = _a.ph, ph = _k === void 0 ? 0 : _k, _l = _a.pv, pv = _l === void 0 ? 0 : _l, _m = _a.pt, pt = _m === void 0 ? 0 : _m, _o = _a.pb, pb = _o === void 0 ? 0 : _o, _p = _a.pl, pl = _p === void 0 ? 0 : _p, _q = _a.pr, pr = _q === void 0 ? 0 : _q, props = __rest(_a, ["children", "size", "color", "bold", "italic", "underline", "strikethrough", "align", "lineHeight", "family", "opacity", "style", "m", "mh", "mv", "mt", "mb", "ml", "mr", "p", "ph", "pv", "pt", "pb", "pl", "pr"]);
    var smartChildren = items;
    var fonts = useContext(FontContext);
    var fontStyles = _getFontStyles(fonts, family, { weight: bold, style: italic ? "italic" : "normal" });
    /**
     * Maps children to limited markdown styles
     *
     * *italics* and **bold** supported
     */
    smartChildren = mapChildrenToTransformer(smartChildren, parseAsteriskInMarkdownString);
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
    return (React.createElement(RNText, __assign({ style: [
            __assign({ color: color, fontSize: size, textAlign: align, lineHeight: lineHeight, textDecorationLine: _resolveTextDecorationLine(underline, strikethrough), marginTop: mt || mv || m, marginBottom: mb || mv || m, marginLeft: ml || mh || m, marginRight: mr || mh || m, paddingTop: pt || pv || p, paddingBottom: pb || pv || p, paddingLeft: pl || ph || p, paddingRight: pr || ph || p, opacity: opacity }, fontStyles),
            style,
        ] }, props), smartChildren));
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
        return _flatten(_map(children, function (child, index) {
            if (_isString(child)) {
                return transform(child, index);
            }
            return child;
        }));
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
        return _map(children, function (child, index) {
            var type = _get(child, 'type', null);
            if (type === SmartText || type === LightText) {
                var ownProps = _get(child, 'props', null);
                var children_1 = _get(ownProps, 'children', null);
                return (React.createElement(SmartText, __assign({ key: index, size: size, color: color, bold: bold, italic: italic, underline: underline, strikethrough: strikethrough, align: align, lineHeight: lineHeight, family: family }, props, ownProps), children_1));
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
        var markdown = string;
        // We use (S^t) as a matching pattern as it is a unlikely occurance in any text
        markdown = markdown.replace(/\*{2}(.*?)\*{2}/g, function (match, p1) { return "=S^tS^t" + p1 + "S^tS^t="; });
        markdown = markdown.replace(/\*{1}(.*?)\*{1}/g, function (match, p1) { return "=S^t" + p1 + "S^t="; });
        return markdown.split(/=/g).map(function (item, index) {
            var text = item.replace(/(S\^t)/g, '');
            // **Double** asterisk is bold
            if (/(S\^t){2}(.*?)(S\^t){2}/.test(item)) {
                return (React.createElement(LightText, { key: index, bold: true }, text));
                // **single** asterisk is italic
            }
            else if (/(S\^t){1}(.*?)(S\^t){1}/.test(item)) {
                return (React.createElement(LightText, { key: index, italic: true }, text));
            }
            return text;
        });
    }
};
SmartText.propTypes = {
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
export default SmartText;
