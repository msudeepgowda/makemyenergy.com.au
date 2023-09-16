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
    Switch
  } from "@chakra-ui/react";
  import {BsPlusLg } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";

export default function EditBattery({ singleBattery }) {
     
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const toast = useToast();
    const {
      register,
      control,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
    } = useForm();
  
    const initialRef = useRef(null);
  
    const [mainData, setMainData]=  useState([])
  
    const router = useRouter();
  
    async function onSubmit(data) {
      
  
        data.product_image_url= data.product_image_url[0];
        data.pdf_url=data.pdf_url[0];
        data.id=singleBattery._id
        data.brand=singleBattery.brand
        data.min=Number(data.min)
        data.max=Number(data.max)
        data.with_eps=Number(data.with_eps)
        data.without_eps=Number(data.without_eps)
        
        console.log(singleBattery,data)
  
        try {
          const response = await axios.post(`/route/updateProduct/battery`, data,{
            withCredentials: true,
            headers: {
              'admin-email': localStorage.getItem("makemyenergy_Admin_Email")
            }
          });
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
          <MdEdit className='text-[#EC652E] text-xl' onClick={onOpen} />
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalContent>
                <ModalHeader>Edit Battery</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                    <Box>
                      <FormControl>
                        <FormLabel>Model</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.model}
                          {...register("model", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Description</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.product_desc}
                          {...register("product_desc", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Warranty</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.prod_warranty}
                          {...register("prod_warranty", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Efficiency</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.efficiancy_warranty}
                          {...register("efficiancy_warranty", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Price with EPS</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.with_eps}
                          {...register("with_eps", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Price without EPS</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.without_eps}
                          {...register("without_eps", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Minimum</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.min}
                          {...register("min", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Maximum</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singleBattery.max}
                          {...register("max", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Image</FormLabel>
                        <Input
                          type="file"
                          {...register("product_image_url", {
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
                        <FormLabel>PDF</FormLabel>
                        <Input
                          type="file"
                          {...register("pdf_url", {
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
                    
                    {/* <Box>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="toggle" mb="0">
                        Toggle Button
                        </FormLabel>
                        <Switch
                        id="toggle"
                        {...register('toggle')}
                        control={control}
                        defaultChecked={true} // Set the default value for the toggle button
                        colorScheme="blue"
                        />
                    </FormControl>
                    </Box> */}
                    
    
                    
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