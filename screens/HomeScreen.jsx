import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import FriendListItem from "../components/FriendListItem";

const dummyData = [
  {
    first: "Alice",
    last: "Smith",
    email: "test1@example.com",
  },
  {
    first: "Bob",
    last: "Smith",
    email: "test2@example.com",
  },
  {
    first: "Jane",
    last: "Smith",
    email: "test3@example.com",
  },
  {
    first: "Joe",
    last: "Smith",
    email: "test4@example.com",
  },
]

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(()=>{
    async function fetchData() {
      setData(dummyData);
      setLoading(false);
    }
    fetchData();
  }, []);            // Wird beim ersten Mal augeführt

  if (loading) {
    return <View style={styles.center}>
    <ActivityIndicator size='large' color='#2ad' />
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FriendListItem
            friend={item}
            onPress={() => navigation.navigate("Friend", { friend: item })}
          />
        )}
        keyExtractor={(item) => item.email}
        ItemSeparatorComponent={<View style={styles.listSeparator} />}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>Keine Daten geladen.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    paddingTop: 100,
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
  },
  listEmpty: {
    fontSize: 32,
    paddingTop: 100,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
