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
  import {BsPlusLg } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function AddPanel() {
     
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
    const {
      fields: array1Fields,
      append: appendArray1,
      remove: removeArray1,
    } = useFieldArray({
      control,
      name: "array1",
    });
    const initialRef = useRef(null);

    useEffect(() => {
        axios
          .get("/route/imageRepo")
          .then((res) => {
            setBrands(res.data)
          })
          .catch((err) => console.log("error"));
      }, []);
  
    async function onSubmit(data) {
      // send formData using your preferred method (e.g. fetch or axios)
      // console.log(brands[data.brands].logo_image_url)
  
      const form = new FormData();
      let size = [data.first_size];
      let price = [data.first_price];
      let panel_number = [data.first_number_of_panel];
  
        for (var i = 0; i < data.array1.length; i++) {
          size[i + 1] = data.array1[i].size;
          price[i + 1] = data.array1[i].price;
          panel_number[i + 1] = data.array1[i].number_of_panel;
        }
  
        form.append("product_image_url", data.product_image[0]);
        form.append("logo_image_url", brands[data.brands].logo_image_url);
        form.append("pdf", data.pdf[0]);
        form.append("brand", brands[data.brands].brand);
        form.append("product_desc", data.description)
        form.append("efficiancy_warranty", data.efficiency)
        form.append("model", data.model)
        form.append("prod_warranty", data.warranty)
        form.append("size", size)
        form.append("price", price)
        form.append("no_of_panels", panel_number)
        form.append("test", "ok")
  
        console.log("product_image_url", data.product_image[0]);
        console.log("logo_image_url", brands[data.brands].logo_image_url);
        console.log("pdf", data.pdf[0]);
        console.log("brand", brands[data.brands].brand);
        console.log("product_desc", data.description)
        console.log("efficiancy_warranty", data.efficiency)
        console.log("model", data.model)
        console.log("prod_warranty", data.warranty)
        console.log("size", size)
        console.log("price", price)
        console.log("no_of_panels", panel_number)
        console.log("test", "ok")
  
  
        // try {
        //   const response = await axios.post(`http://localhost:3050/route/addProduct/panel`, form);
        //   console.log(response.data);
        //   toast({
        //     title: "Product Updated",
        //     description: "Your Product has been updated",
        //     status: "success",
        //     duration: 1000,
        //     isClosable: true,
        //     position: "top position",
        //   });
        //   window.location.reload();
        // } catch (error) {
        //   console.log(data);
        //   toast({
        //     title: "Error",
        //     description: "Some Error occured, please try later",
        //     status: "error",
        //     duration: 1000,
        //     isClosable: true,
        //     position: "top position",
        //   });
        // }
      };

    return (
      <>
        <Button colorScheme="orange" onClick={onOpen}>
          <BsPlusLg className="font-bold mr-3" /> Add Panel
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              <ModalHeader>Add Panel</ModalHeader>
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
                        ref={initialRef}
                        placeholder="model"
                        {...register("model", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Description</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Product Description"
                        {...register("description", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Warranty</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Product Warranty"
                        {...register("warranty", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Efficiency</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Product Efficiency"
                        {...register("efficiency", { required: true })}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Product Image</FormLabel>
                      <Input
                        type="file"
                        {...register("product_image", {
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
                        {...register("pdf", {
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

                  <div className="border-2 border-gray-400 p-2 m-2 rounded-xl">
                    <Box>
                      <FormControl>
                        <FormLabel>Panel 1 - Number Of Panel</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Number Of Panel"
                          {...register(`first_number_of_panel`, {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Panel 1 - Size</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Panel Size"
                          {...register(`first_size`, {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Panel 1 - Price</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Panel Price"
                          {...register(`first_price`, {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </Box>
                  </div>

                  {array1Fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="border-2 border-gray-400 p-2 m-2 rounded-xl"
                    >
                      <Box>
                        <FormControl>
                          <FormLabel>
                            Panel {index + 2}- Number Of Panel
                          </FormLabel>
                          <Input
                            ref={initialRef}
                            placeholder="Number Of Panel"
                            {...register(`array1.${index}.number_of_panel`, {
                              required: true,
                            })}
                          />
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl>
                          <FormLabel>Panel {index + 2} - Size</FormLabel>
                          <Input
                            ref={initialRef}
                            placeholder="Panel Size"
                            {...register(`array1.${index}.size`, {
                              required: true,
                            })}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl>
                          <FormLabel>Panel {index + 2}- Price</FormLabel>
                          <Input
                            ref={initialRef}
                            placeholder="Panel Price"
                            {...register(`array1.${index}.price`, {
                              required: true,
                            })}
                          />
                        </FormControl>
                      </Box>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        type="button"
                        onClick={() => removeArray1(index)}
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
                    onClick={() => appendArray1({ name: "" })}
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