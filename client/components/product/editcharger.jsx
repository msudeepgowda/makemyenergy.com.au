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

export default function EditCharger({ singlecharger }) {
     
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const toast = useToast();
    const {
      register,
      control,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
    } = useForm({
      defaultValues: {
        fields: singlecharger.size.map((value, index) => ({
          size: value,
          price: singlecharger.price[index],
        })),
      },
    });
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'fields',
    });
  
    const initialRef = useRef(null);

    const router = useRouter();
  
    async function onSubmit(data) {
      
        let size = [];
        let price = [];
  
        for (var i = 0; i < data.fields.length; i++) {
          size[i] = data.fields[i].size;
          price[i] = data.fields[i].price;
        }
  
        data.product_image_url= data.product_image_url[0];
        data.pdf_url=data.pdf_url[0];
        data.size=size
        data.price=price
        data.id=singlecharger._id
        data.brand=singlecharger.brand
        data.phase=Number(data.phase)
        
        console.log(data)
  
        try {
          const response = await axios.post(`/route/updateProduct/charger`, data,{
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
                <ModalHeader>Edit Panel</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                    <Box>
                      <FormControl>
                        <FormLabel>Model</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singlecharger.model}
                          {...register("model", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Description</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singlecharger.product_desc}
                          {...register("product_desc", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Warranty</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singlecharger.prod_warranty}
                          {...register("prod_warranty", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Product Efficiency</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singlecharger.efficiancy_warranty}
                          {...register("efficiancy_warranty", { required: true })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Phase</FormLabel>
                        <Input
                          ref={initialRef}
                          defaultValue={singlecharger.phase}
                          {...register("phase", { required: true })}
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
                    {fields.map((item, index) => (
                      <div key={index} className="border-2 border-gray-400 p-2 m-2 rounded-xl">
                        <Box>
                          <FormControl>
                            <FormLabel>
                              Panel {index + 1} - Size
                            </FormLabel>
                            <Input
                              ref={initialRef}
                              defaultValue={item.size}
                              {...register(`fields.${index}.size`, {
                                required: true,
                              })}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl>
                            <FormLabel>
                              Panel {index + 1}- Price
                            </FormLabel>
                            <Input
                              ref={initialRef}
                              defaultValue={item.price}
                              {...register(`fields.${index}.price`, {
                                required: true,
                              })}
                            />
                          </FormControl>
                        </Box>
                        <Button
                          colorScheme="red"
                          variant="outline"
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
    
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      type="button"
                      onClick={() => append({ size: '', price: '' })}
                    >
                      Add Panel Size & Price
                    </Button>
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