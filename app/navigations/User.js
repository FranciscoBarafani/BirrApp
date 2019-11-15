import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

//Main Screens
import AccountScreen from "../screens/account/account";
import HomeScreen from "../screens/home/home";
import NewPostScreen from "../screens/new/new";

//Routes inside each screen
const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,

    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerStyle: {
        backgroundColor: "#FFD400"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      }
    })
  }
});
const NewPostScreenStack = createStackNavigator({
  Home: {
    screen: NewPostScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Nuevo Post",
      headerStyle: {
        backgroundColor: "#FFD400"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      }
    })
  }
});
const AccountScreenStack = createStackNavigator({
  Home: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mi Cuenta",
      headerStyle: {
        backgroundColor: "#FFD400"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      }
    })
  }
});

//Global Routes // BottomTab Navigator
const RootStack = createBottomTabNavigator(
  {
    //BottomTabOptions
    Home: {
      screen: HomeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account"
            type="material-community"
            size={40}
            color={tintColor}
          />
        )
      })
    },
    New: {
      screen: NewPostScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-multiple-outline"
            type="material-community"
            size={40}
            color={tintColor}
          />
        )
      })
    },
    Account: {
      screen: AccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account"
            type="material-community"
            size={40}
            color={tintColor}
          />
        )
      })
    }
  }, //Tab Configuration
  {
    initialRouteName: "Home",
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#FFD400"
    }
  }
);

//Exporting
export default createAppContainer(RootStack);
