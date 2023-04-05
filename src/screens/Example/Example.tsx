import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Brand } from '../../components';
import { useTheme } from '../../hooks';
import { useLazyFetchOneQuery } from '../../services/modules/users';
import { changeTheme, ThemeState } from '../../store/theme';
import i18next from 'i18next';

import { Badge, TextInput, Button } from 'react-native-paper';

const Example = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useDispatch();

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang);
  };

  const [value, setValue] = React.useState('');
  const [dishs, setDishs] = React.useState([]);
  const [order, setOrder] = React.useState(false);

  const dishOrder = () => {
    const clone = JSON.parse(JSON.stringify(dishs));
    if (order) return clone.sort((a, b) => a.dish - b.dish);
    else return dishs;
  };

  const checkNumber = (array, numb) => {
    return array.findIndex(({ dish }) => dish === parseInt(numb));
  };

  const addNumber = (numb) => {
    const found = checkNumber(dishs, numb);
    if (found === -1) setDishs([...dishs, { dish: parseInt(numb), times: 1 }]);
    else {
      const clone = JSON.parse(JSON.stringify(dishs));
      clone[found].times++;
      setDishs(clone);
    }
  };

  return (
    <View style={[]}>
      <TextInput
        dense
        mode="outlined"
        label="Dish"
        placeholder="Dish"
        keyboardType="numeric"
        maxLength={3}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={({ nativeEvent: { text } }) => {
          setValue('');
          if (text === '' || isNaN(text)) return;
          addNumber(text);
        }}
      />
      <Button
        style={{
          backgroundColor: '#1E90FF',
          margin: 4,
        }}
        mode="contained"
        onPress={() => setOrder(!order)}>
        Order by number
      </Button>
      {dishOrder().map(({ dish, times }) => (
        <View
          style={{
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Badge
            style={{
              backgroundColor: '#1E90FF',
            }}>
            {dish}
          </Badge>
          <Badge
            style={{
              backgroundColor: 'powderblue',
            }}
            onPress={() => addNumber(dish)}>
            {times}
          </Badge>
        </View>
      ))}
    </View>
  );
};

export default Example;
