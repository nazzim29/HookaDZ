import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Box } from "native-base";

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 2,
		borderBottomColor: "#e6e6e6",
		backgroundColor: "#0017E4",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default function OrderRow(props) {	
	return (
        <Box minWidth={"100%"} height={100} {...styles.container}>
            <Text>hecafffffffffffffffffffffffffffffy</Text>
            {/* chevron icon for next page animation */}
            
		</Box>
	);
}
