import {
  Container, VStack, HStack, Text, Box, Image, Button, Link, SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/product.js'
import { set } from 'mongoose';

const Homepage = () => {

  const { fetchProducts, updateProduct, deleteProduct, products } = useProductStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", price: "", image: "" });

  async function isImageValid(url) {
    const res = await fetch("/api/images/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    return data.valid;
  }

  const [validImages, setValidImages] = useState({});

  useEffect(() => {
    const checkImages = async () => {
      const imagePromises = products.map(async (product) => {
        try {
          const isValid = await isImageValid(product.image);
          return { [product._id]: isValid };
        } catch (error) {
          return { [product._id]: false };
        }
      });

      const results = await Promise.all(imagePromises);
      const validImagesMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setValidImages(validImagesMap);
    };
    checkImages();
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <Container maxW="100%" p={12}>
      <VStack spacing={8}>
        <Box bg="black" p={4} borderRadius="full" boxShadow="dark-lg">
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            bgGradient="linear(to-r, blue.200, blue.700)"
            bgClip="text">
            Current Product Listings
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={8} w="full">
          {products.map((product) => (
            <Box
              boxShadow='lg'
              rounded='xl'
              outline={'1px solid'}
              outlineColor={'black'}
              overflow='hidden'
              transition='all 0.3s'
              _hover={{ transform: 'scale(1.0g5)', boxShadow: '2xl' }}
              key={product._id}
              h="100%">
              <VStack spacing={4} p={4} align={'center'} h='100%' justify={'space-between'}>
                <Image src={validImages[product._id] === false ? "/no-image-14596.png" : product.image}
                  w="100%"
                  maxH="160px"
                  objectFit="contain"
                  borderRadius="md"
                  mx="auto">
                </Image>
                <Text fontWeight={'bold'}> {product.name} </Text>
                <Text> {"$" + product.price}</Text>
                <HStack spacing={2}>
                  <Button onClick={() => {
                    setSelectedProduct(product);
                    setEditedProduct(product);
                    onOpen();
                  }}> Edit </Button>
                  <Button onClick={() => {
                    deleteProduct(product._id);
                  }}> Delete </Button>
                </HStack>
              </VStack>
            </Box>

          ))}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
          <ModalOverlay bg={"blackAlpha.800"} />
          <ModalContent bg="purple.700">
            <ModalHeader>Edit product {selectedProduct?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder='Product Name'
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                />
                <Input
                  placeholder='Product Price'
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                />
                <Input
                  placeholder='Image URL'
                  value={editedProduct.image}
                  onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
                />
              </VStack>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={() => {
                updateProduct(selectedProduct._id, editedProduct);
                onClose();
              }
              }>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {products.length === 0 && (
          <HStack spacing={3} justify="center">
            <Text fontSize="xl" fontWeight="bold" color="black">
              No Products Available
            </Text>
            <Link href="/create" color="blue.500">
              <Text fontSize="xl" fontWeight="bold" color="blue.500">Click here to create a new product</Text>
            </Link>
          </HStack>)}

      </VStack>
    </Container>
  )
}

export default Homepage