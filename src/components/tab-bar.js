import React from 'react'
import { View, Text } from 'react-native'

import Button from './button'
import { Search, Bookmark, Clock } from './icons'
import Box from './box'

import theme from '../utils/theme'


function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return label === 'Search' ? (
          <Box key={label} p={15} mt={-15} bg="white" borderRadius="full">
            <Button size={56} bg="red" borderRadius="full" onPress={onPress}>
              <Search color="white" />
            </Button>
          </Box>
        ) : (
            <Button key={label} pt={6} flexDirection="column" height={56} flex={1} onPress={onPress}>
              {label === 'History' && <Bookmark color={theme.colors.textLight} />}
              {label === 'Favorite' && <Clock color={theme.colors.textLight} />}
              <Box size={3} bg={isFocused ? 'red' : 'white'} mt={6} />
            </Button>
          )
      })}
    </View>
  );
}

export default TabBar;