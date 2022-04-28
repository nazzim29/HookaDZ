import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	TouchableOpacity,
	Platform,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import * as Yup from "yup";
import { useFormik } from "formik";
import { PostEvent } from "../actions/commandes";

//others
import Input from "../components/Input";
import { debounce } from "lodash";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
const styles = StyleSheet.create({
	step: {
		maxWidth: "80%",
		marginBottom: "15%",
		marginHorizontal: "10%",
		resizeMode: "contain",
		alignItems: "center",
	},
	title: {
		fontWeight: "700",
		fontSize: 22,
		marginLeft: "10%",
		marginTop: "5%",
		width: "80%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	texte: {
		fontSize: 16,
		marginLeft: "10%",
		marginTop: "1%",
		width: "80%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Regular",
		color: "#C9D1D9",
	},
	link: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "#3299F1",
	},
	btn: {
		width: "80%",
		height: 50,
		marginTop: "5%",
		borderRadius: 15,
		marginHorizontal: "10%",
		alignItems: "center",
		justifyContent: "center",
		padding: 1,
	},
	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: "#C9D1D9",
	},
	header: {
		justifyContent: "flex-start",
		// backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerIcon: {
		margin: 10,
		height: 20.5,
		width: 12.5,
	},
});
const Event = (props) => {
	const dispatch = useDispatch();
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
  );
	const [OpenCalender, setOpenCalender] = useState(true);
	const [fields, setFields] = useState({
    adress: "",
		desc: "",
		dateEvent: new Date(),
		numero: "",
	});
	const SubSchema = Yup.object().shape({
		adress: Yup.string().required("Ce champ est obligatoire"),
		desc: Yup.string().required("Ce champ est obligatoire"),
		dateEvent: Yup.date().required("Ce champ est obligatoire"),
		numero: Yup.string()
			.matches(/^(\+\d{3})( )?\d{9}$|^0( )?(\d( )?){9}$/, "numero erroné")
			.required("Ce champ est obligatoire"),
  });
  const OpenCalenderAndroid = async () => {
    console.log('salut')
    if (Platform.OS === "android") {
      const date = await DateTimePickerAndroid.open({
				value: fields?.dateEvent,
				mode: "spinner",
				accentColor: "#5d31bf",
				minimumDate: new Date(),
				onChange: (event, date) => {
					if (date !== undefined) {
						setFields({ ...fields, dateEvent: date });
					}
				},
			});
      console.log(date)
    }
  }
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			adress: fields?.adress,
			desc: fields?.desc,
			dateEvent: fields?.dateEvent,
			numero: fields?.numero,
		},
		validationSchema: SubSchema,
		onSubmit: (values) => {
			const dataFormat = {
				date: values.dateEvent,
				adresse: values.adress,
				description: values.desc,
				numeros: values.numero,
			};

			dispatch(PostEvent(dataFormat, props.navigation.navigate));
			setFields({
				adress: "",
				desc: "",
				dateEvent: new Date(),
				numero: "",
			});
		},
	});
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
			</View>
			<KeyboardAwareScrollView style={{ flex: 1 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						paddingBottom: 15,
					}}
				>
					{/* <Image style={styles.step} source={slider} /> */}
					<Text style={styles.title}>
						Quand pouvons nous vous rendre service ?
					</Text>
					<Text style={styles.texte}>Selectionner une date</Text>
					{Platform.OS == "android" && (
            <TouchableWithoutFeedback
              onPressIn={() => OpenCalenderAndroid}
              // style={{borderWidth:2,borderColor:'#C9D1D9',borderRadius:10,padding:10,marginTop:10}}
            >
							<Input
                icon={"event-icon"}
                onPressIcon={() => OpenCalenderAndroid()}
								style={{
									marginBottom: "10%",
									marginTop: "5%",
									marginHorizontal: "5%",
									width: "90%",
								}}
							>
								<Text
									style={{
										flex: 1,
										fontFamily: "Inter-Regular",
										fontSize: 16,
										color: "#C9D1D9",
									}}
								>
									{moment(fields?.dateEvent).format("dddd D MMMM") ||
										"Choisir une date"}
								</Text>
							</Input>
						</TouchableWithoutFeedback>
					)}
					{Platform.OS=="ios" && (
						<DateTimePicker
							testID="dateTimePicker"
							style={{
								width: "90%",
								backgroundColor: "transparent",
								marginHorizontal: "5%",
								marginBottom: "5%",
							}}
							value={fields?.dateEvent|| new Date()}
							themeVariant="dark"
							textColor="white"
							accentColor={"transparent"}
							locale="fr-FR"
							// minimumDate={new Date()}
							mode={"date"}
							display={"spinner"}
              is24Hour={true}
              onChange={(e, date) => {
                console.log(date.toDateString());
                const sd = date
								setFields({ ...fields, dateEvent: sd });
								Platform.OS === "android" &&setOpenCalender(false);
							}}
						/>
					)}
					{formik.touched.dateEvent && Boolean(formik.errors.dateEvent) && (
						<Text
							style={{
								color: "#b9203d",
								marginHorizontal: "5%",
								width: "90%",
							}}
						>
							{formik.touched.dateEvent && formik.errors.dateEvent}
						</Text>
					)}
					<Text style={styles.title}>Adresse</Text>
					<Text style={styles.texte}>
						Vous commandez pour le{" "}
						{fields?.dateEvent
							? moment(fields?.dateEvent).format("dddd D MMMM YYYY")
							: ""}
					</Text>
					<Input
						icon={"marker-icon"}
						style={{
							marginBottom: "10%",
							marginTop: "5%",
							marginHorizontal: "5%",
							width: "90%",
						}}
					>
						<TextInput
							placeholder="Adresse de livraison"
							editable
							keyboardType="default"
							value={fields?.adress}
							onChangeText={(e) => setFields({ ...fields, adress: e })}
							style={{
								flex: 1,
								fontFamily: "Inter-Regular",
								fontSize: 16,
								color: "#C9D1D9",
							}}
							error={formik.touched.adress && Boolean(formik.errors.adress)}
							placeholderTextColor={"#858585"}
						/>
					</Input>
					{formik.touched.adress && Boolean(formik.errors.adress) && (
						<Text
							style={{
								color: "#b9203d",
								marginHorizontal: "5%",
								width: "90%",
							}}
						>
							{formik.touched.adress && formik.errors.adress}
						</Text>
					)}
					<Text style={styles.title}>Numero</Text>
					<Text style={styles.texte}>Ou pouvons nous vous contacter ?</Text>
					<Input
						icon={"phone-icon"}
						style={{
							marginBottom: "10%",
							marginTop: "5%",
							marginHorizontal: "5%",
							width: "90%",
						}}
					>
						<TextInput
							placeholder="Numero de telephone"
							editable
							keyboardType="phone-pad"
							value={fields?.numero}
							onChangeText={(e) => setFields({ ...fields, numero: e })}
							style={{
								flex: 1,
								fontFamily: "Inter-Regular",
								fontSize: 16,
								color: "#C9D1D9",
							}}
							error={formik.touched.numero && Boolean(formik.errors.numero)}
							placeholderTextColor={"#858585"}
						/>
					</Input>
					{formik.touched.numero && Boolean(formik.errors.numero) && (
						<Text
							style={{
								color: "#b9203d",
								marginHorizontal: "5%",
								width: "90%",
							}}
						>
							{formik.touched.numero && formik.errors.numero}
						</Text>
					)}
					<Text style={styles.title}>Description</Text>
					<Text style={styles.texte}>
						Donnez nous plus de details un administrateur les confirmeras par la
						suite
					</Text>
					<Input
						icon={"phone-icon"}
						style={{
							marginBottom: "10%",
							marginTop: "5%",
							marginHorizontal: "5%",
							width: "90%",
						}}
					>
						<TextInput
							placeholder="Description"
							editable
							multiline={true}
							keyboardType="default"
							value={fields?.desc}
							onChangeText={(e) => setFields({ ...fields, desc: e })}
							style={{
								flex: 1,
								fontFamily: "Inter-Regular",
								fontSize: 16,
								color: "#C9D1D9",
							}}
							error={formik.touched.desc && Boolean(formik.errors.desc)}
							placeholderTextColor={"#858585"}
						/>
					</Input>
					{formik.touched.desc && Boolean(formik.errors.desc) && (
						<Text
							style={{
								color: "#b9203d",
								marginHorizontal: "5%",
								width: "90%",
							}}
						>
							{formik.touched.desc && formik.errors.desc}
						</Text>
					)}
					<View style={{ marginTop: 40 }}>
						<TouchableWithoutFeedback onPress={() => formik.submitForm()}>
							<LinearGradient
								colors={["#5D31BF", "#0B67FFD6"]}
								{...deg(90)}
								style={styles.btn}
							>
								<Text style={styles.txtbtn}>Envoyer</Text>
							</LinearGradient>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
};

export default Event;
