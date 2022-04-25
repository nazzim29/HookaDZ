import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";

import { Calendar } from "react-native-calendars";
import moment from "moment";
import ModalCalender from "../components/ModalCalender";

import * as Yup from "yup";
import { useFormik } from "formik";
import { PostEvent } from "../actions/commandes";

//others
import Input from "../components/Input";

const styles = StyleSheet.create({
  step: {
    maxWidth: "80%",
    marginVertical: "15%",
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
  const slider = useSelector((state) =>
    state.ui.assets.find((el) => el.name == "step-1-slider")
  );
  const arrowBackIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "arrow-back")
  );
  // const handleDateClick = (day) => {
  //   setDate(day.dateString);
  // };
  // const handleSuivant = () => {
  //   if (!date || moment().diff(moment(date)) >= 0) {
  //     return;
  //   }
  //   props.navigation.navigate("Event2", { date });
  // };
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(false);
  const [OpenCalender, setOpenCalender] = useState(false);
  const [fields, setFields] = useState({
    adress: "",
    desc: "",
    dateEvent: "",
  });
  const SubSchema = Yup.object().shape({
    adress: Yup.string().required("Ce champ est obligatoire"),
    desc: Yup.string().required("Ce champ est obligatoire"),
    dateEvent: Yup.date().required("Ce champ est obligatoire"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      adress: fields?.adress,
      desc: fields?.desc,
      dateEvent: fields?.dateEvent,
    },
    validationSchema: SubSchema,
    onSubmit: (values) => {
      const dataFormat = {
        date: new Date(values.dateEvent),
        adresse: values.adress,
        description: values.desc,
      };
      dispatch(PostEvent(dataFormat, props.navigation.navigate));
      setFields({
        adress: "",
        desc: "",
        dateEvent: "",
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
          }}>
          {/* <Image style={styles.step} source={slider} /> */}
          <Text style={styles.title}>
            Quand pouvons nous vous rendre service ?
          </Text>
          <Text style={styles.texte}>Selectionner une date</Text>
          <Input
            icon={"event-icon"}
            onPressIcon={() => {
              console.log("test");
              setOpenCalender(!OpenCalender);
            }}
            style={{ marginTop: "5%", marginHorizontal: "5%", width: "90%" }}>
            <TextInput
              placeholder="Date"
              editable
              keyboardType="default"
              value={
                fields?.dateEvent
                  ? moment(fields?.dateEvent).format("YYYY-MM-DD")
                  : ""
              }
              onChangeText={(e) => setFields({ ...fields, dateEvent: e })}
              style={{
                flex: 1,
                fontFamily: "Inter-Regular",
                fontSize: 16,
                color: "#C9D1D9",
              }}
              error={
                formik.touched.dateEvent && Boolean(formik.errors.dateEvent)
              }
              placeholderTextColor={"#858585"}
            />
          </Input>
          {formik.touched.dateEvent && Boolean(formik.errors.dateEvent) && (
            <Text
              style={{
                color: "#b9203d",
                marginHorizontal: "5%",
                width: "90%",
              }}>
              {formik.touched.dateEvent && formik.errors.dateEvent}
            </Text>
          )}
          <Text style={styles.title}>Adresse</Text>
          <Text style={styles.texte}>
            Vous commandez pour le{" "}
            {fields?.dateEvent
              ? moment(fields?.dateEvent).format("dddd D MMMM")
              : ""}
          </Text>
          <Input
            icon={"marker-icon"}
            style={{ marginTop: "5%", marginHorizontal: "5%", width: "90%" }}>
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
              }}>
              {formik.touched.adress && formik.errors.adress}
            </Text>
          )}
          <Text style={styles.title}>Description</Text>
          <Text style={styles.texte}>
            Donnez nous plus de details un administrateur les confirmeras par la
            suite
          </Text>
          <Input
            icon={"phone-icon"}
            style={{ marginTop: "5%", marginHorizontal: "5%", width: "90%" }}>
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
              }}>
              {formik.touched.desc && formik.errors.desc}
            </Text>
          )}
          <View style={{ marginTop: 40 }}>
            <TouchableWithoutFeedback onPress={() => formik.submitForm()}>
              <LinearGradient
                colors={["#5D31BF", "#0B67FFD6"]}
                {...deg(90)}
                style={styles.btn}>
                <Text style={styles.txtbtn}>Envoyer</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ModalCalender
        open={OpenCalender}
        close={() => setOpenCalender(false)}
        value={
          fields?.dateEvent
            ? moment(fields?.dateEvent).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD")
        }
        handleDateClick={(e) => {
          setFields({
            ...fields,
            dateEvent: e
              ? moment(e).format("YYYY-MM-DD")
              : moment(fields?.dateEvent).format("YYYY-MM-DD"),
          });
        }}
      />
    </>
  );
};

export default Event;
