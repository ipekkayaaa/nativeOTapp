import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function DietScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Explore Healthy Lifestyle</Text>
      <Text style={styles.pageDescription}>
        Welcome to a journey of self-improvement and well-being! Dive into a treasure trove of resources that will empower you to lead a healthier and more fulfilling life. Here, we have carefully curated an array of valuable content to uplift your mind, body, and spirit. Explore a wealth of articles, delve into transformative diets, and stay updated with the latest health news—all designed to guide you on your path to a happier, healthier you.
      </Text>

      <View style={styles.linksContainer}>
        <LinkSection title="Healthy Articles">
          <LinkButton title="7 Tips for a Balanced Diet" url="https://www.example.com/healthy-article-1" />
          <LinkButton title="Exercises for a Strong Heart" url="https://www.example.com/healthy-article-2" />
          <LinkButton title="Boost Your Immunity with These Foods" url="https://www.example.com/healthy-article-3" />
        </LinkSection>

        <LinkSection title="Diets">
          <LinkButton title="Mediterranean Diet Plan" url="https://www.example.com/healthy-diet-1" />
          <LinkButton title="Vegetarian Diet: Benefits and Risks" url="https://www.example.com/healthy-diet-2" />
        </LinkSection>

        <LinkSection title="Health News">
          <LinkButton title="New Study on Sleep and Longevity" url="https://www.example.com/health-news-1" />
          <LinkButton title="Latest Discoveries in Heart Health" url="https://www.example.com/health-news-2" />
        </LinkSection>
      </View>
    </View>
  );
}

function LinkButton({ title, url }) {
  return (
    <TouchableOpacity onPress={() => openLink(url)} style={styles.linkContainer}>
      <Text style={styles.linkTitle}>{title}</Text>
      <Ionicons name="ios-arrow-forward" size={24} color="blue" />
    </TouchableOpacity>
  );
}

function LinkSection({ title, children }) {
  return (
    <View style={styles.linkSection}>
      <Text style={styles.linkCategory}>{title}</Text>
      {children}
    </View>
  );
}

function openLink(url) {
  Linking.openURL(url); // This will open the URL in the device's default browser.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  pageDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  linksContainer: {
    marginTop: 10,
  },
  linkSection: {
    marginBottom: 20,
  },
  linkCategory: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkTitle: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginRight: 10,
  },
});

export default DietScreen;
