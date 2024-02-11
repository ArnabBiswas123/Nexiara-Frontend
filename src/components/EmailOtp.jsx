import {
  HStack,
  PinInput,
  PinInputField,
  Center,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function EmailOtp() {
  const navigate = useNavigate();
  const toast = useToast();
  const [pin, setPin] = useState("");
  const [isresend, setisResend] = useState(false);
  const [isvarify, setisVarify] = useState(false);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, []);
  const handlePinChange = (value) => {
    setPin(value);
  };
  const submitHandler = async () => {
    if (!pin) {
      toast({
        title: "please Enter the OTP",
        description: "OTP sent to your Email",
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      setisVarify(true);
      const response = await fetch(
        "http://localhost:5000/api/v1/users/varifyemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            otp: pin,
          }),
        }
      );

      const data = await response.json();
      setisVarify(false);
      if (data.message === "Token is not correct") {
        navigate("/");
      }
      if (data.success === true) {
        toast({
          title: "Email varified successfully",
          description: "Welcome",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/welcome");
        }, 1500);
      } else {
        if (data.message === "otp is not correct") {
          toast({
            title: "please Enter the correct OTP",
            description: "OTP is incorrect",
            position: "top",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        } else {
          if (data.message === "Time limit exceeds") {
            setisVarify(false);
            toast({
              title: "Time limit exceeds",
              description: "Resend it",
              position: "top",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          } else {
            if (data.message === "Internal Server Error") {
              toast({
                title: "Some Error Happened",
                description: "Try after some time",
                position: "top",
                status: "error",
                duration: 1000,
                isClosable: true,
              });
            } else {
              navigate("/");
            }
          }
        }
      }
    }
  };

  const resendOtp = async () => {
    setisResend(true);
    const response = await fetch(
      "http://localhost:5000/api/v1/users/sendemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.message === "Token is not correct") {
      navigate("/");
    }

    if (data.success === true) {
      if (data.message === "Email is already varified") {
        toast({
          title: "Email is already varified",
          // description: "Varify Email",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/welcome");
        }, 1500);
      } else {
        if (data.message === "Email send successfully") {
          toast({
            title: "OTP sent successfully",
            // description: "Varify Email",
            position: "top",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setisResend(false);
        }
      }
    } else {
      setisResend(false);
      toast({
        title: "Some Error Happened",
        description: "Try after some time",
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Center
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      flexDirection={"column"}
      bgColor={"#FFDEAD"}
    >
      <Center
        h={"50%"}
        w={["100%", "80%", "60%", "40%"]}
        borderRadius={"2%"}
        display={"flex"}
        flexDirection={"column"}
        bgColor={"#FFF5EE"}
        boxShadow="dark-lg"
      >
        <Text fontSize={"4xl"} as={"b"} mb={8}>
          Varify your Email
        </Text>
        <Text mb={8}>
        An OTP has been sent to your Email
        </Text>
        <HStack>
          <PinInput
            value={pin}
            placeholder=""
            onChange={handlePinChange}
            size="lg"
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <PinInputField
                key={index}
                boxShadow={"base"}
                borderColor={"black"}
              />
            ))}
          </PinInput>
        </HStack>
        <Center w={"80%"} textAlign={"center"} gap={"4%"}>
          <Button
            colorScheme="blue"
            width={["30%", "25%", "25%", "20%"]}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            fontSize={"12px"}
            isLoading={isvarify}
            loadingText="Varifing"
          >
            Varify Email
          </Button>
          {/* {seconds>0?<Text>Time remaining: {seconds} seconds</Text>:<Text>Resend</Text>} */}
          <Button
            colorScheme="blue"
            width={["30%", "25%", "25%", "20%"]}
            loadingText="Sending"
            fontSize={"12px"}
            isLoading={isresend}
            style={{ marginTop: 15 }}
            onClick={resendOtp}
          >
            Resend
          </Button>
        </Center>
      </Center>
    </Center>
  );
}
export default EmailOtp;
