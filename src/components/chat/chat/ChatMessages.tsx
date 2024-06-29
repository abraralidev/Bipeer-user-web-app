import React from 'react'
import ChatMessage from './ChatMessage'

const ChatMessages = () => {
    return (
        <div className='overflow-y-scroll h-[50vh] space-y-3 px-4 py-3'>
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
            <ChatMessage isSendByMe={true} />
            <ChatMessage isSendByMe={false} />
        </div>
    )
}

export default ChatMessages