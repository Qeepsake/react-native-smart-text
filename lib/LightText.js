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
var prop_types_1 = require("prop-types");
var LightText = function (_a) {
    var children = _a.children, size = _a.size, color = _a.color, bold = _a.bold, italic = _a.italic, underline = _a.underline, strikethrough = _a.strikethrough, align = _a.align, lineHeight = _a.lineHeight, family = _a.family, opacity = _a.opacity, style = _a.style, _b = _a.m, m = _b === void 0 ? 0 : _b, _c = _a.mh, mh = _c === void 0 ? 0 : _c, _d = _a.mv, mv = _d === void 0 ? 0 : _d, _e = _a.mt, mt = _e === void 0 ? 0 : _e, _f = _a.mb, mb = _f === void 0 ? 0 : _f, _g = _a.ml, ml = _g === void 0 ? 0 : _g, _h = _a.mr, mr = _h === void 0 ? 0 : _h, _j = _a.p, p = _j === void 0 ? 0 : _j, _k = _a.ph, ph = _k === void 0 ? 0 : _k, _l = _a.pv, pv = _l === void 0 ? 0 : _l, _m = _a.pt, pt = _m === void 0 ? 0 : _m, _o = _a.pb, pb = _o === void 0 ? 0 : _o, _p = _a.pl, pl = _p === void 0 ? 0 : _p, _q = _a.pr, pr = _q === void 0 ? 0 : _q, props = __rest(_a, ["children", "size", "color", "bold", "italic", "underline", "strikethrough", "align", "lineHeight", "family", "opacity", "style", "m", "mh", "mv", "mt", "mb", "ml", "mr", "p", "ph", "pv", "pt", "pb", "pl", "pr"]);
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
                marginTop: mt || mv || m,
                marginBottom: mb || mv || m,
                marginLeft: ml || mh || m,
                marginRight: mr || mh || m,
                paddingTop: pt || pv || p,
                paddingBottom: pb || pv || p,
                paddingLeft: pl || ph || p,
                paddingRight: pr || ph || p,
                opacity: opacity
            },
            style
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
LightText.propTypes = {
    size: prop_types_1.default.number,
    color: prop_types_1.default.string,
    bold: prop_types_1.default.bool,
    italic: prop_types_1.default.bool,
    underline: prop_types_1.default.bool,
    strikethrough: prop_types_1.default.bool,
    align: prop_types_1.default.string,
    lineHeight: prop_types_1.default.number,
    family: prop_types_1.default.string,
    m: prop_types_1.default.number,
    mh: prop_types_1.default.number,
    mv: prop_types_1.default.number,
    mt: prop_types_1.default.number,
    mb: prop_types_1.default.number,
    ml: prop_types_1.default.number,
    mr: prop_types_1.default.number,
    p: prop_types_1.default.number,
    ph: prop_types_1.default.number,
    pv: prop_types_1.default.number,
    pt: prop_types_1.default.number,
    pb: prop_types_1.default.number,
    pl: prop_types_1.default.number,
    pr: prop_types_1.default.number,
    style: prop_types_1.default.any
};
exports.default = SmartText;