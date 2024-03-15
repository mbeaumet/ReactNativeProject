import React, { createContext, useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const FavoritesContext = createContext();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  drinkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  drinkImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  drinkName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteIcon: {
    marginRight: 10,
    zIndex: 1,
  },
  tabBar: {
    backgroundColor: '#e91e63',
  },
});

const getCocktailsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails par catégorie : ', error);
    return [];
  }
};

const getFavoriteDetails = async (drinkId) => {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );
    return response.data.drinks[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du cocktail favori : ', error);
    return null;
  }
};

function FeedItem({ drink, isFavorite, toggleFavorite, addToCart }) {
  return (
    <View style={styles.drinkContainer}>
      <TouchableOpacity>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.drinkImage} />
      </TouchableOpacity>
      <Text style={styles.drinkName}>{drink.strDrink}</Text>
      <View style={styles.favoriteIconContainer}>
        <TouchableOpacity
          onPress={() => toggleFavorite(drink.idDrink)}
          style={styles.favoriteIcon}
        >
          <MaterialCommunityIcons
            name={isFavorite ? 'heart' : 'heart-outline'}
            color={isFavorite ? 'red' : 'black'}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart(drink)}>
          <MaterialCommunityIcons
            name="cart"
            color="black"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CocktailCategory({ category }) {
  const [data, setData] = useState([]);
  const { favorites, toggleFavorite, addToCart } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchData = async () => {
      const cocktails = await getCocktailsByCategory(category);
      setData(cocktails);
    };

    fetchData();
  }, [category]);

  return (
    <ScrollView style={styles.container}>
      {data.map((drink, index) => {
        const isFavorite = favorites.includes(drink.idDrink);
        return (
          <FeedItem
            key={index}
            drink={drink}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        );
      })}
    </ScrollView>
  );
}

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const [favoriteDetails, setFavoriteDetails] = useState([]);

  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      const details = await Promise.all(favorites.map(getFavoriteDetails));
      setFavoriteDetails(details.filter(detail => detail !== null));
    };

    fetchFavoriteDetails();
  }, [favorites]);

  return (
    <ScrollView style={styles.container}>
      {favoriteDetails.map((favorite, index) => (
        <FeedItem
          key={index}
          drink={favorite}
          isFavorite={true}
          toggleFavorite={() => {}}
          addToCart={() => {}}
        />
      ))}
    </ScrollView>
  );
}

function Cart() {
  const { cart } = useContext(FavoritesContext);

  return (
    <ScrollView style={styles.container}>
      {cart.map((drink, index) => (
        <FeedItem
          key={index}
          drink={drink}
          isFavorite={false}
          toggleFavorite={() => {}}
          addToCart={() => {}}
        />
      ))}
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        style: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Ordinary Drinks"
        component={() => <CocktailCategory category="Ordinary_Drink" />}
        options={{
          tabBarLabel: 'Ordinary Drinks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="glass-pint-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cocktails"
        component={() => <CocktailCategory category="Cocktail" />}
        options={{
          tabBarLabel: 'Cocktails',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="glass-cocktail" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleFavorite = (drinkId) => {
    if (favorites.includes(drinkId)) {
      setFavorites(favorites.filter((id) => id !== drinkId));
    } else {
      setFavorites([...favorites, drinkId]);
    }
  };

  const addToCart = (drink) => {
    setCart([...cart, drink]);
  };

  return (
    <NavigationContainer>
      <FavoritesContext.Provider value={{ favorites, toggleFavorite, addToCart, cart }}>
        <MyTabs />
      </FavoritesContext.Provider>
    </NavigationContainer>
  )}