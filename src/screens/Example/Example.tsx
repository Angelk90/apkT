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

  const [fetchOne, { data, isSuccess, isLoading, isFetching }] =
    useLazyFetchOneQuery();

  useEffect(() => {
    if (isSuccess && data?.name) {
      Alert.alert(t('example:helloUser', { name: data.name }));
    }
  }, [isSuccess, data]);

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang);
  };

  const [dishs, setDishs] = React.useState([
    {
      dish: 7,
      times: 1,
    },
    {
      dish: 3,
      times: 1,
    },
  ]);

  const [order, setOrder] = React.useState(false);

  const dishOrder = () => {
    const clone = JSON.parse(JSON.stringify(dishs));
    if (order) return clone.sort((a, b) => a.dish - b.dish);
    else return dishs;
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.colCenter,
        Layout.scrollSpaceBetween,
      ]}>
      <View
        style={[
          Layout.fill,
          Layout.relative,
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}>
        <TextInput
          dense
          mode="outlined"
          label="Dish"
          placeholder="Dish"
          keyboardType="numeric"
          maxLength={3}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            if (text === '') return;
            const found = dishs.findIndex((el) => el.dish === parseInt(text));
            if (found === -1)
              setDishs([...dishs, { dish: parseInt(text), times: 1 }]);
            else {
              const clone = JSON.parse(JSON.stringify(dishs));
              clone[found].times++;
              console.log(clone, dishs);
              setDishs(clone);
            }
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
              }}>
              {times}
            </Badge>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Example;