import React, {useState} from 'react';
import { FormControl} from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpass, setConfirmPass] = useState();
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const [confirmshow, setConfirmShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const passClick = () => setShow(!show);
    const confirmClick  = () => setConfirmShow(!confirmshow);

    const submitHandler = async() =>{
        setLoading(true);
        if(!name||!email||!password || !confirmpass){
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
        if(password !== confirmpass){
            toast({
                title: 'passwords do NOT match',
                status: 'warn',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try{
            const config = {
                headers:{
                    'Content-type': 'application/json',
                },
            };
            const {data} = await axios.post("/api/user",{name,email,password},config);
            toast({
                title: 'Success Register',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
            return;
        }catch(error){
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
            <FormControl id='name' isRequired>
                <Input
                    placeholder='Enter Name'
                    onChange={(e)=> setName(e.target.value)}
                    >
                </Input>
            </FormControl>
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
            <FormControl id='passwordconfirm' isRequired>
                <InputGroup>
                    <Input
                        type={confirmshow? 'text':'password'}
                        placeholder='Confirm Password'
                        onChange={(e)=> setConfirmPass(e.target.value)}
                    >
                    </Input>
                    <InputRightElement width={'2rem'}>
                            <Button onClick={confirmClick}height={'1rem'} size={'sm'}>
                                {confirmshow ? 'Hide': 'Show'}
                            </Button>
                        </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button onClick={submitHandler}height={'1rem'} size={'sm'}
            width={'100%'} marginTop={'10px'}>
                Submit
            </Button>
        </VStack>
    )
};

export default Signup