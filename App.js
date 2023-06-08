import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const API_KEY = "201f2537aedb4e9db7e594067f83cc6c"; // Replace with your News API key

export default function App() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=crypto&apiKey=${API_KEY}`
      );
      const result = await response.json();
      setNewsData(result.articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const renderNewsItem = ({ item }) => {
    const heroImage =
      item.urlToImage ||
      "https://img.freepik.com/free-vector/popular-cryptocurrency-logos-set_69286-369.jpg?w=2000"; // Placeholder image if urlToImage is not available

    return (
      <TouchableOpacity
        style={styles.newsItemContainer}

      >
        <View style={styles.newsItemHeader}>
          <Text style={styles.newsItemHeaderText}>NEWS</Text>
          <MaterialIcons name="arrow-forward" size={24} color="emerald" />
        </View>
        <View>
          <Image
            source={{ uri: heroImage }}
            style={styles.newsItemImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.newsItemContent}>
          <Text style={styles.newsItemDate}>June 8, 2023</Text>
          <Text style={styles.newsItemTitle}>{item.title}</Text>
          <Text style={styles.newsItemDescription} numberOfLines={4}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>News App</Text>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.newsList}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#EFBC9B",
  },
  newsList: {
    flexGrow: 1,
    marginTop: 16,
  },
  newsItemContainer: {
    backgroundColor: "#EFBC9B",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    placeSelf: "center",
    width: 500
  },
  newsItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#725D68",
    padding: 8,
  },
  newsItemHeaderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  newsItemImage: {
    width: "50%",
    height: 200,
  },
  newsItemContent: {
    padding: 16,
  },
  newsItemDate: {
    color: "gray",
    marginBottom: 8,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});