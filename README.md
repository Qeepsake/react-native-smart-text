<img src="https://raw.githubusercontent.com/LukeBrandonFarrell/open-source-images/master/react-native-smart-text/react-native-smart-text-example.png">

## Install

Install via npm:
```sh
 npm install react-native-smart-text --save
```

## Usage

To use in React Native. Import:
```js
 import { SmartText, LightText } from 'react-native-smart-text';
```

### Smart Text

The `<SmartText />` component contains a number of abilities:

1. Emoji 😄🥶🤯 it uses [node-emoji](https://www.npmjs.com/package/node-emoji) under the hood
2. Markdown support for *italics* and **bold**
3. Nested text support e.g. `<SmartText size={12} color='black'>My nested <SmartText bold>test!</SmartText>` where parent props will be inherited by children.

## Light Text

The `<LightText />` componnet takes all the same props as `<SmartText />` but has no abilities! This component can be used
to enjoy all the benefits of easy styling and positioning without any of the extra code or processing which comes with `<SmartText />`.

## Props

| Prop                | Type          | Optional  |                                                               
| ------------------- | ------------- | --------- |
| size               | number         | Yes       |                      
| color               | string         | Yes       |                      
| bold               | boolean         | Yes       |                      
| italic               | boolean         | Yes       |                      
| underline               | boolean         | Yes       |                      
| strikethrough               | boolean         | Yes       |                      
| align               | string         | Yes       |                      
| lineHeight               | number         | Yes       |                      
| family               | string         | Yes       |                      
| opacity               | number         | Yes       |                      
| style               | object         | Yes       |                      
| m, mh, mv, ml, mr, mt, mb               | number         | Yes       |       
| p, ph, pv, pl, pr, pt, pb               | number         | Yes       | 

## Authors

* [**Luke Brandon Farrell**](https://lukebrandonfarrell.com/) - *Author*

## License

This project is licensed under the MIT License
