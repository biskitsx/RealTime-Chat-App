
import { SyntheticEvent, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import Message from './Message';

interface ChatProps {
    socket: Socket;
    username: string
    room: string
    setShowChat?: React.Dispatch<React.SetStateAction<boolean>>
}

interface MessageChat {
    room: string
    author: string
    message: string
    time: string
}

function Chat({ socket, username, room }: ChatProps) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [listMessage, setListMessage] = useState<MessageChat[]>([]) 

    const sendMessage = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (currentMessage !== "") {
            const dateNow = new Date(Date.now())
            const messageData: MessageChat = {
                room: room,
                author: username,
                message: currentMessage,
                time: dateNow.getHours() + ":" + dateNow.getMinutes()
            }
            socket.emit("sendMessage", messageData)
            setListMessage((list) => [...list, messageData]) 

        }
    }
    
    useEffect(()=>{
        socket.on("receiveMessage", (data: MessageChat) => {
            setListMessage((list) => [...list, data]) 
            console.log(listMessage)
        })
    },[socket])


    return (
        <div className='card w-96 bg-base-100 shadow-xl card-normal overflow-hidden'>
            {/* <button onClick={()=>setShowChat(false)}>BACK</button> */}
            <div className='bg-slate-800'>
                <h1 className='text-white p-3 font-semibold'>Room {room}</h1>
            </div>
            <div className='h-96 flex flex-col'>
                {listMessage && listMessage.map((msg, index)=>{
                    if (msg.author === username) {
                        return <Message author={msg.author} message={msg.message} username={username} time={msg.time} room={msg.room} key={index}/>
                    }
                    return <Message author={msg.author} message={msg.message} username={username} time={msg.time} room={msg.room} key={index}/>
                    }
                )}
            </div>




            <form className='flex justify-items-end'>
                <input
                    type="text"
                    placeholder=""
                    value={currentMessage}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                    }}
                    className="input input-bordered input-info w-full max-w-xs"
                />
                <button className='btn btn-primary' onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default Chat