import React, {useState} from 'react';
import { FormControl} from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const passClick = () => setShow(!show);

    const submitHandler = async() =>{
        setLoading(true);
        if(!email || !password)
        {
            toast({
                title: 'confirm all fields are filled',
                status: 'warn',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const {data} = await axios.post('api/user/login',{email,password},config);
            toast({
                title: 'Success Login',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error){
            toast({
                title: 'ERROR',
                description: error.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };
    
    return (
        <VStack spacing = '5px'>
                <FormControl id='email' isRequired>
                    <Input
                        placeholder='Enter Email'
                        onChange={(e)=> setEmail(e.target.value)}
                    >
                    </Input>
                </FormControl>
                <FormControl id='password' isRequired>
                    <InputGroup>
                        <Input
                            type={show? 'text':'password'}
                            placeholder='Enter Password'
                            onChange={(e)=> setPassword(e.target.value)}
                        >
                        </Input>
                        <InputRightElement width={'2rem'}>
                            <Button onClick={passClick}height={'1rem'} size={'sm'}>
                                {show ? 'Hide': 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button onClick={submitHandler}height={'1rem'} size={'sm'}
                width={'100%'} marginTop={'10px'}>
                    Log In
                </Button>
            </VStack>
            
    )
};

export default Login