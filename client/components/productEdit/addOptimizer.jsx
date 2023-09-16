import {
    useDisclosure,
    useToast,
    SimpleGrid,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
  } from "@chakra-ui/react";
  import { BsPlusLg } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function AddOptimizer() {
     
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [brands, setBrands] = useState([]);
    const router = useRouter();
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const toast = useToast();

    useEffect(() => {
        axios
          .get("/route/imageRepo")
          .then((res) => {
            setBrands(res.data)
          })
          .catch((err) => console.log("error"));
      }, []);
  
    async function onSubmit(data) {
        data.price=Number(data.price)
        data.pdf_url=data.pdf_url[0]
        data.product_image_url=data.product_image_url[0]
        data.brand=brands[data.brands].brand;
        data.logo_image_url=brands[data.brands].logo_image_url;

        console.log(data)
  
        try {
          const response = await axios.post(`http://localhost:3050/route/addProduct/optimizer`, data);
          console.log(response.data);
          toast({
            title: "Product Updated",
            description: "Your Product has been updated",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top position",
          });
          window.location.reload();
        } catch (error) {
          console.log(data);
          toast({
            title: "Error",
            description: "Some Error occured, please try later",
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top position",
          });
        }
      };

    return (
      <>
        <Button colorScheme="orange" onClick={onOpen}>
          <BsPlusLg className="font-bold mr-3" /> Add Optimizer
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              <ModalHeader>Add Optimizer</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Box>
                  <FormControl>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      placeholder="Select Brand"
                      {...register("brands", { required: true })}
                    >
                      {brands.map((singleBrand, index) => (
                        <option key={index} value={index}>
                          {singleBrand.brand}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <SimpleGrid
                  columns={2}
                  spacingX="40px"
                  spacingY="20px"
                  className="mt-4"
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Model </FormLabel>
                      <Input
                        placeholder="model"
                        {...register("model", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Description</FormLabel>
                      <Input
                        
                        placeholder="Product Description"
                        {...register("product_desc", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Warranty</FormLabel>
                      <Input
                        
                        placeholder="Product Warranty"
                        {...register("prod_warranty", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Efficiency</FormLabel>
                      <Input
                        
                        placeholder="Product Efficiency"
                        {...register("efficiancy_warranty", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Price</FormLabel>
                      <Input
                        
                        placeholder="Price"
                        {...register("price", { required: true })}
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl>
                      <FormLabel>Product Image</FormLabel>
                      <Input
                        type="file"
                        {...register("product_image_url", {
                          // required: true,
                          validate: {
                            fileSize: (value) =>
                              !value[0] || value[0].size <= 5000000,
                            fileType: (value) =>
                              !value[0] ||
                              ["image/jpeg", "image/png", "image/gif"].includes(
                                value[0].type
                              ),
                          },
                        })}
                      />
                      {errors.file?.type && (
                        <p className="text-red-400">
                          File must be a jpeg, png or gif image
                        </p>
                      )}
                      {errors.file?.size && (
                        <p className="text-red-400">
                          File must be no larger than 5MB
                        </p>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel> Product PDF</FormLabel>
                      <Input
                        type="file"
                        {...register("pdf_url", {
                          // required: true,
                          validate: {
                            fileSize: (value) =>
                              !value[0] || value[0].size <= 5000000,
                            fileType: (value) =>
                              !value[0] ||
                              ["application/pdf"].includes(
                                value[0].type
                              ),
                          },
                        })}
                      />
                      {errors.file?.type && (
                        <p className="text-red-400">
                          File must be a jpeg, png or gif image
                        </p>
                      )}
                      {errors.file?.size && (
                        <p className="text-red-400">
                          File must be no larger than 5MB
                        </p>
                      )}
                    </FormControl>
                  </Box>

                </SimpleGrid>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </>
    );
  }