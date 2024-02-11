import {
  Center,
  Text,
  VStack,
  FormControl,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const fnameChangeHandler = (event) => {
    setFname(event.target.value);
    setErrors({
      ...errors,
      firstname: "",
    });
  };
  const lnameChangeHandler = (event) => {
    setLname(event.target.value);
    setErrors({
      ...errors,
      lastname: "",
    });
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    setErrors({
      ...errors,
      email: "",
    });
  };
  const mobileChangeHandler = (event) => {
    setMobile(event.target.value);
    setErrors({
      ...errors,
      mobile: "",
    });
  };

  const submitHandler = async () => {
    const nameRegx = /^[A-Za-z]+$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const mobileRegx = /^[6-9]\d{9}$/;
    const newErrors = {};
    if (fname.trim() === "") {
      newErrors.firstname = "Enter your first name";
    } else {
      if (nameRegx.test(fname) === false) {
        newErrors.firstname = "only alphbets are allowed";
      }
    }

    if (lname.trim() === "") {
      newErrors.lastname = "Enter your last name";
    } else {
      if (nameRegx.test(lname) === false) {
        newErrors.lastname = "only alphbets are allowed";
      }
    }
    if (emailRegex.test(email) === false) {
      newErrors.email = "Enter a valid email";
    }

    if (mobileRegx.test(mobile) === false) {
      newErrors.mobile = "Enter a valid mobile number";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "please Enter valid credentials",
        description: "some fiels are not valid",
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      setLoading(true);
      const result = await fetch("http://localhost:5000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: fname,
          lastname: lname,
          mobile: mobile,
          email: email,
        }),
      });
      const data = await result.json();
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        if (
          data.message === "Email and Mobile is not varified" ||
          data.message === "Mobile not varified" ||
          data.message === "User created"
        ) {
          const response = await fetch(
            "http://localhost:5000/api/v1/users/sendmobile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
              },
            }
          );
          const res = await response.json();
          if (res.success === true) {
            navigate("/mobile");
          } else {
            setLoading(false);
            toast({
              title: "Some Error Happened",
              description: "Try after some time",
              position: "top",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          }
        } else {
          if (data.message === "Email not varified") {
            const response = await fetch(
              "http://localhost:5000/api/v1/users/sendemail",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.token}`,
                },
              }
            );
            const res = await response.json();
            if (res.success === true) {
              navigate("/email");
            } else {
              setLoading(false);
              toast({
                title: "Some Error Happened",
                description: "Try after some time",
                position: "top",
                status: "error",
                duration: 1000,
                isClosable: true,
              });
            }
          }
        }
      } else {
        if (data.message === "Mobile and Email is varified") {
          navigate("/welcome");
        } else {
          setLoading(false);
          toast({
            title: "Internal server error",
            description: "Try after some time",
            position: "top",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Center w={"100vw"} h={"100vh"} bgColor={"#FFDEAD"}>
      <Center
        h={"80%"}
        w={["100%", "80%", "80%", "40%"]}
        borderRadius={"2%"}
        display={"flex"}
        flexDirection={"row"}
        // justifyContent={"flex-start"}
        bgColor={"#FFF5EE"}
        gap={"20%"}
        boxShadow="dark-lg"
      >
        <VStack w={"60%"} spacing={"10px"}>
          <Text fontSize={"4xl"} as={"b"} mb={4}>
            {" "}
            Register
          </Text>
          <FormControl id="first-name" isRequired isInvalid={errors.firstname}>
            <FormLabel>First-Name</FormLabel>
            <Input
              placeholder="Enter your First Name"
              value={fname}
              onChange={fnameChangeHandler}
              borderColor={"black"}
            />
            {errors.firstname ? (
              <FormErrorMessage>{errors.firstname}</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="Last-name" isRequired isInvalid={errors.lastname}>
            <FormLabel>Last-Name</FormLabel>
            <Input
              placeholder="Enter your Last Name"
              value={lname}
              onChange={lnameChangeHandler}
              borderColor={"black"}
            />
            {errors.lastname ? (
              <FormErrorMessage>{errors.lastname}</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="Email" isRequired isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChange={emailChangeHandler}
              borderColor={"black"}
            />
            {errors.email ? (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="Mobile" isRequired isInvalid={errors.mobile}>
            <FormLabel>Mobile No</FormLabel>
            <Input
              placeholder="Enter your Mobile No"
              value={mobile}
              onChange={mobileChangeHandler}
              borderColor={"black"}
            />
            {errors.mobile ? (
              <FormErrorMessage>{errors.mobile}</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <Button
            colorScheme="blue"
            width="50%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Submit
          </Button>
        </VStack>
      </Center>
    </Center>
  );
}
export default Signup;
