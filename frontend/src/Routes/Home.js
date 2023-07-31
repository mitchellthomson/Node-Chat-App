import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";

const Chat = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            
        </div>
    );
};
export default Chat;