import {Button, Container, Heading, VStack, useColorModeValue, Box, Input} from '@chakra-ui/react';
import React from 'react'
import {useState} from 'react'
import {useProductStore} from '../store/product.js'


const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const {createProduct} = useProductStore();

  async function handleAdd(product) {
    const ret = await createProduct(product);
    console.log(ret)
    alert(ret.message);
    if (ret.success) {
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  }
  
  return (
    <Container maxW = {"container.sm"} pt = {8}>
      <VStack spacing = {8}>
        <Heading as = {"h2"} size = {"lg"} textAlign = {"center"} mb={8} color = {useColorModeValue("blue.700", "blue.400")}>
          Create a new product
        </Heading>
        <Box w = {"full"} bg = {useColorModeValue("white", "gray.800")} p = {100} borderRadius = {"md"} boxShadow = {"dark-lg"}>
          <VStack spacing = {4}>
            <Input name = "prod_name" type = "text" placeholder = {"Product Name"} value = {newProduct.name}
             onChange = {(e) => setNewProduct({...newProduct, name: e.target.value})} />
            <Input name  = "prod_price" type = "number" placeholder = {"Price"} value = {newProduct.price}
             onChange = {(e) => setNewProduct({...newProduct, price : e.target.value})}/>
             <Input name  = "prod_url" type = "text" placeholder = {"Image URL"} value = {newProduct.image}
             onChange = {(e) => setNewProduct({...newProduct, image : e.target.value})}/>
             <Button w = "full" onClick = {() => {handleAdd(newProduct)}} mt = {4} bg = {useColorModeValue("blue.200", "blue.600")}>
              Add Product
             </Button>
          </VStack>
        </Box>
      </VStack> 
    </Container>
  )
}

export default Createpage