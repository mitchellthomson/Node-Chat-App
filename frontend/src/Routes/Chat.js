import React, { useEffect, useState} from 'react'
import axios from "axios"

const Chat = () => {
const [chat, setChat] =useState([])
    const fetchChat = async() => {
        const data = await axios.get('/api/chat');
        setChat(data);
    };
    
    useEffect(() => {
        return () => {
            fetchChat();
        }
    }, [])
    return (
        <div>
            {chat.map()}  
        </div>
    )
};
export default Chat