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
import { SwipeListView } from 'react-native-swipe-list-view';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

  const onChangeLanguage = (lang: 'en' | 'it') => {
    i18next.changeLanguage(lang);
  };

  const [value, setValue] = React.useState('');
  const [dishs, setDishs] = React.useState([]);
  const [order, setOrder] = React.useState(false);

  const dishOrder = () => {
    const clone = JSON.parse(JSON.stringify(dishs));
    if (order) return clone.sort((a: number, b: number) => a.dish - b.dish);
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
    <View style={[Layout.fill, Gutters.smallPadding, {}]}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TextInput
          dense
          mode="outlined"
          label="Dish"
          placeholder="Dish"
          keyboardType="phone-pad"
          maxLength={3}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            setValue('');
            if (text === '' || isNaN(text)) return;
            addNumber(text);
          }}
          theme={{
            colors: {
              placeholder: isDark ? '#FFFFFF' : '#000',
              text: '#1E90FF',
              primary: '#1E90FF',
              background: isDark ? '#1B1A23' : "#EFEFEF"
            },
          }}
          style={[
            {
              width: 60,
            },
          ]}
        />
        <Button
          style={{
            backgroundColor: '#1E90FF',
            width: 160,
            height: 40,
          }}
          mode="contained"
          onPress={() => setOrder(!order)}>
          Order by {order ? 'dish' : 'number'}
        </Button>
      </View>

      <SwipeListView
        data={dishOrder().map((el, i) => ({
          ...el,
          key: `${i}`,
          text: `${el.dish}`,
        }))}
        keyExtractor={(item) => `${item.key}`}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: '#fff',
              height: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 4,
              margin: 2,
            }}>
            <Badge
              style={{
                backgroundColor: '#1E90FF',
              }}>
              {item.dish}
            </Badge>
            <Badge
              style={{
                backgroundColor: '#b0e0e6',
              }}
              onPress={() => addNumber(item.dish)}>
              {item.times}
            </Badge>
          </View>
        )}
        renderHiddenItem={({ item }, rowMap) => <View style={{}}></View>}
        leftOpenValue={75}
        rightOpenValue={-75}
        style={{
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default Example;
