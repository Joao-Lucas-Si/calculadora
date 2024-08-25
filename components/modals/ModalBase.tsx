import { Modal, View, Dimensions } from "react-native"
import { ReactNode } from "react"
import cores from "../../style/vars"

export default function ModalBase({ visivel, children }:{ visivel: boolean, children: ReactNode }) {
  return (
    <Modal
      visible={visivel}
      transparent
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          paddingHorizontal: Dimensions.get("window").width * 0.05,
          paddingVertical: Dimensions.get("window").height * 0.05
        }}
      >
        <View 
          style={{
            height: "100%",
            backgroundColor: cores.fundo,
            borderWidth: 5,
            borderRadius: 15,
            overflow: "hidden",
            borderColor: cores.roxoMedio
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  )
}