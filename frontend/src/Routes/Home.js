import React from 'react'
import {Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react"
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'

const Home = () => {
    return (
        <Container maxW={'xl'} centerContent>
            <Box bg={'white'} m={'40px 10px 15px 0'}w={'100%'} 
            borderRadius={'10px'} borderWidth={'2px'} borderColor={'lightblue'} 
            display={'flex'} justifyContent={'center'}>

                <Text fontFamily={'Nunito'} fontSize={'30px'} >Welcome!</Text>

            </Box>
            <Box bg={'white'} w={'100%'} 
            borderRadius={'10px'} borderWidth={'2px'} borderColor={'lightblue'} 
            padding={2} fontFamily={'Nunito'}>

                <Tabs isFitted variant={'solid-rounded'}>
                    <TabList marginBottom={'2em'}>
                        <Tab >Login</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Login></Login>
                        </TabPanel>
                        <TabPanel>
                        <Signup></Signup>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home