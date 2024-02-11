import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Text,
    ModalBody,
    Center,
    VStack,
  } from "@chakra-ui/react";
  import { CheckCircleIcon } from "@chakra-ui/icons";
function Welcome(){
        return(
            <Center>
            <Modal isOpen={true}>
              <ModalOverlay />
              <ModalContent
                p={[2, 4, 6]} 
                width={["90%", "80%", "60%"]} 
                bgColor={"#FFDEAD"}
              >
                <Center>
                  <ModalHeader color={"green.500"}>
                    <CheckCircleIcon boxSize={20} />
                  </ModalHeader>
                </Center>
                <ModalBody p={4}>
                  <Center>
                    <VStack spacing={4}>
                      <Text
                        fontWeight={"bold"}
                        color={"green.500"}
                        fontSize={["xl", "2xl", "3xl"]}
                      >
                        SUCCESS
                      </Text>
                      <Text fontWeight={"bold"} fontSize={["lg", "xl", "2xl"]}>
                        Thank You
                      </Text>

                    </VStack>
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        )
}
export default Welcome;