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
import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
var LightText = function (_a) {
    var children = _a.children, size = _a.size, color = _a.color, bold = _a.bold, italic = _a.italic, underline = _a.underline, strikethrough = _a.strikethrough, align = _a.align, lineHeight = _a.lineHeight, family = _a.family, opacity = _a.opacity, style = _a.style, _b = _a.m, m = _b === void 0 ? 0 : _b, _c = _a.mh, mh = _c === void 0 ? 0 : _c, _d = _a.mv, mv = _d === void 0 ? 0 : _d, _e = _a.mt, mt = _e === void 0 ? 0 : _e, _f = _a.mb, mb = _f === void 0 ? 0 : _f, _g = _a.ml, ml = _g === void 0 ? 0 : _g, _h = _a.mr, mr = _h === void 0 ? 0 : _h, _j = _a.p, p = _j === void 0 ? 0 : _j, _k = _a.ph, ph = _k === void 0 ? 0 : _k, _l = _a.pv, pv = _l === void 0 ? 0 : _l, _m = _a.pt, pt = _m === void 0 ? 0 : _m, _o = _a.pb, pb = _o === void 0 ? 0 : _o, _p = _a.pl, pl = _p === void 0 ? 0 : _p, _q = _a.pr, pr = _q === void 0 ? 0 : _q, props = __rest(_a, ["children", "size", "color", "bold", "italic", "underline", "strikethrough", "align", "lineHeight", "family", "opacity", "style", "m", "mh", "mv", "mt", "mb", "ml", "mr", "p", "ph", "pv", "pt", "pb", "pl", "pr"]);
    return (React.createElement(RNText, __assign({ style: [
            {
                color: color,
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
                opacity: opacity,
            },
            style,
        ] }, props), children));
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
        }
        else if (underline) {
            return 'underline';
        }
        else if (strikethrough) {
            return 'line-through';
        }
        return 'none';
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
    style: PropTypes.any,
};
export default LightText;
