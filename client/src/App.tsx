import { SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import { Socket, io } from "socket.io-client";
import Chat from "./components/Chat";
import Nav from "./components/Nav";

const socket = io("http://localhost:3000");


function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false)

    const joinRoom = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!(username == "" || room == "")) {
            socket.emit("joinRoom", room)
            setShowChat(true)
        }
    }

    return (
        <div className="h-screen place-items-center grid bg-zinc-100">
            <Nav/>
            {!showChat ? (
                <form className="card w-96 bg-base-100 shadow-xl card-normal">
                    <figure>
                        <img
                            src="https://images.immediate.co.uk/production/volatile/sites/3/2023/03/Jujutsu-Kaisen-Cropped-dbe733b.jpg?quality=90&resize=844,563"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Join a Room</h2>
                        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                        <input
                            type="text"
                            placeholder="John..."
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            className="input input-bordered input-info w-full max-w-xs"
                        />
                        <input
                            type="text"
                            placeholder="Room ID..."
                            value={room}
                            onChange={(e) => {
                                setRoom(e.target.value);
                            }}
                            className="input input-bordered input-info w-full max-w-xs"
                        />
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={joinRoom}>Submit</button>
                        </div>
                    </div>
                </form>
            ): (
                <Chat socket={socket} username={username} room={room} setShowChat={setShowChat}/>
            )}
        </div>
    );
}

export default App;
