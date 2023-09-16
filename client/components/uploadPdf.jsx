import {
  AspectRatio,
  Box,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text, useToast
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const first = {
  rest: {
    scale: 0.95,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const PreviewImage = forwardRef((props, ref) => {
  return (
    <Box
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});

const validFileTypes = ["application/pdf"]

export default function UploadPdf({ route }) {

  const toast = useToast();

  const [error, setError] = useState("");

  const uploadPdf = async (e) => {
    const file = e.target.files[0]
    if (!validFileTypes.find(type => type === file.type)) {
      setError("File must be in .pdf")
      return;
    }

    const form = new FormData();
    form.append('pdf', file);

    await axios.post(`/route/${route}/${localStorage.getItem("makemyenergy_Email")}`, form, { headers: { useremail: localStorage.getItem('makemyenergy_Email') } }, { withCredentials: true }).then((response) => {
      if (response.status === 201) {
        window.location.reload()
        toast({
          title: "Pdf Uploaded Successfuly",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Unable to upload the Pdf',
          description: 'Please Upload again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }).catch(error => { console.log(error) })
  }

  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  return (
    <Container my="6">
      <AspectRatio width="250px" ratio={1.5}>
        <Box
          borderColor="#21376C"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          backgroundColor="#D7E1F9"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md"
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Box height="12" width="16" position="relative">
                  <PreviewImage
                    variants={first}
                    backgroundImage={`url("../folder.png")`}
                  />
                </Box>
                <Stack p="2" textAlign="center" spacing="1">
                  <Heading fontSize="rg" color="gray.700" fontWeight="semibold">
                    Upload/Drop your file here
                  </Heading>
                  <Text fontWeight="light">Supported: .pdf</Text>
                </Stack>
              </Stack>
              {error && <Text className="text-red-700 pl-5 text-2xl">{error}</Text>}
            </Box>
            <Input
              id="userImages"
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              // accept="image/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              onChange={uploadPdf}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}