/**
 * @author Luke Brandon Farrell
 * @description exports library components
 */

import React from 'react';
import SmartText from './SmartText';
import LightText from './LightText';

export const FontContext = React.createContext(null);

export { SmartText, LightText };
