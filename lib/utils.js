/**
* @author Luke Brandon Farrell
* @description Module utilities
*/
import { createFontRegistry } from '@carimus/react-native-fonts';
/**
 * We use this function to build our textDecorationLine style property.
 * We allow this to be configure through two boolean variables `underline`
 * and `strikethrough`, but the textDecorationLine style property needs
 * a string which controls these two properties, one of:
 * ['none', 'underline', 'line-through', 'underline line-through']
 *
 * @param underline
 * @param strikethrough
 *
 * @return {string}
 * @private
 */
export function _resolveTextDecorationLine(underline, strikethrough) {
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
/**
 * Gets font styles
 *
 * @param fonts
 * @param family
 * @param options
 *
 * @return {object}
 * @private
 */
export function _getFontStyles(fonts, family, options) {
    if (fonts !== null &&
        typeof fonts !== "undefined" &&
        family !== null &&
        typeof family !== "undefined") {
        var createFontStyles = createFontRegistry(fonts).createFontStyles;
        return createFontStyles(family, options);
    }
    return {};
}
