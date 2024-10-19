import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  WTP: {   
    height: 50,
    width: 350,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    alignSelf: 'center',
  },
  loading:{
    width: 130,
    height: 130,
    paddingTop: 10,
    marginTop: 210,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 25,
    alignSelf: 'center',
    zIndex: 1,
  },
  loadingText:{
    width: 100,
    height: 40,
    marginTop: 123,
    marginLeft: 10,
    marginRight: 95,
    alignSelf: 'center',
    zIndex: 1,
  },
  Pokedex:{
    width: 364,
    height: 550,
    marginTop: -478,
    marginBottom: 10,
    marginLeft: 6,
    marginRight: 30,
    alignSelf: 'center',
  },
});

export default styles;
