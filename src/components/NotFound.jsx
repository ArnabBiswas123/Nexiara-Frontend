import { Box, Heading, Text } from '@chakra-ui/react';

function NotFound() {
  return (
    <Box textAlign="center"  w={"100vw"}
    h={"100vh"}>
      <Heading as="h1" size="xl" mb="4">
        404 - Not Found
      </Heading>
      <Text fontSize="lg">
        The page you are looking for does not exist.
      </Text>
    </Box>
  );
}

export default NotFound;