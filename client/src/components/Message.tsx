
interface MessageChat {
    room: string
    author: string
    message: string
    time: string
    username: string
}

function Message({room, author, message, time, username}: MessageChat ) {
    const position = username === author ? "chat chat-end" : "chat chat-start"
  return (
    <div className={position}>
        <div className="chat-header">
            {author}
            <time className="text-xs opacity-50">{time}</time>
        </div>
        <div className="chat-bubble">{message}</div>
        
        {/* <div className="chat-footer opacity-50">{time}</div> */}
    </div>
  )
}

export default Message