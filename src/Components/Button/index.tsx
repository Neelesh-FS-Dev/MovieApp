/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Pressable,
  PressableProps,
  ViewStyle,
  Text,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
import styles from './style';

type Props = {
  variant?: string;
  title?: string;
  icon?: ImageSourcePropType;
  style?: ViewStyle;
} & PressableProps;

const Button: React.FC<Props> = ({style, variant, title, icon, ...props}) => {
  return (
    <Pressable
      style={[styles.wrapperCustom, styles[variant], style]}
      {...props}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon && <Image source={icon} style={{marginRight: 10}} />}
        <Text style={{color: '#fff'}}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
