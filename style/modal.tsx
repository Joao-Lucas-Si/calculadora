import styleVars from "./vars"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    height: '90%',
    width: '95%',
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: 20,
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    zIndex: 2,
    backgroundColor: styleVars.fundo2,
    borderColor: styleVars.roxoMedio,
    borderWidth: 5,
    overflow: "hidden"
  },
})