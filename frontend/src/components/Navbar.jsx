import React from 'react'
import { Link } from "react-router-dom";
import {Container, Flex, Text, HStack, Button, useColorMode} from '@chakra-ui/react'
import { PlusSquareIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW = {"100%"} px = {4}bg = {colorMode === "light" ? "gray.800" : "black"} >
        <Flex
        h = {16}
        alignItems = {"Center"}
        justifyContent = {"space-between"}
        flexDir = {{
            base: "column",
            sm: "row"
        }}
        >
        <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, blue.200, blue.700)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Sean's Product Store</Link>
				</Text>
        <HStack 
        spacing = {1}
        alignItems = {"center"} 
        justifyContent = {"center"}>
          <Link to = {"/create"}>
            <Button>
              <PlusSquareIcon fontSize = {20} boxSize={6} color={"blue.500"} />
            </Button>
          </Link>
          <Button onClick = {toggleColorMode}>
             {(() => {
                if (colorMode === "light") {
                  return "Dark Mode"
                } else {
                  return "Light Mode"
                }
             })()}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar