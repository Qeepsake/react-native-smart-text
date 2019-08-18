/**
 * @author Luke Brandon Farrell
 * @description Text component.
 */
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
declare const SmartText: ({ children: items, size, color, bold, italic, underline, strikethrough, align, lineHeight, family, opacity, style, margin, horizontal, vertical, top, bottom, left, right, ...props }: IProps) => any;
export { SmartText };
