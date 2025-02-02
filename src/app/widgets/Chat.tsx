'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/app/shared/ui/button"
import { Input } from "@/app/shared/ui/input"
import { ScrollArea } from "@/app/shared/ui/scroll-area"
import { io } from 'socket.io-client'
import { Square } from 'lucide-react';

interface MessageData {
  role: "user" | "assistant"; 
  content: string
}

export default function Component() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_WS_ORIGIN || 'ws://localhost:5000', {
      reconnectionDelayMax: 10000,
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      console.log("User connected to streaming");
    });

    socket.current.on("message", (data: string) => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          return [
            ...prevMessages.slice(0, -1), 
            { ...lastMessage, content: lastMessage.content + data }
          ];
        } else {
          return [...prevMessages, { role: 'assistant', content: data }];
        }
      });
    });

    socket.current.on("stream_finished", () => {
      setIsStreaming(false);
    });

    socket.current.on("disconnect", () => {
      console.log("User disconnected");
    });

    return () => {
      socket.current?.disconnect();
      socket.current?.off("connect");
      socket.current?.off("message");
      socket.current?.off("stream_finished");
      socket.current?.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: MessageData = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      setIsStreaming(true);
      socket.current?.emit("message", [...messages, { role: 'user', content: input }]);
    }
  }

  const handleStopStreaming = () => {
    setIsStreaming(false);
    socket.current?.emit("stop_stream");
  }

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border rounded-lg overflow-hidden shadow-xl bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-primary p-4 text-primary-foreground">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </div>
      <ScrollArea className="flex-grow p-4 space-y-2" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-in-out`}
            style={{
              opacity: 1,
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
            }}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 mb-5 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t p-4 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow py-5 rounded-xl"
          />
          {isStreaming ? (
            <Button onClick={handleStopStreaming} className="bg-primary rounded-xl w-12 h-10 p-0">
              <Square className='size-5' />
            </Button>
          ) : (
            <Button onClick={handleSend} onKeyPress={(e) => e.key === 'Enter' && handleSend()} type="submit" size="icon" className="bg-primary rounded-xl w-12 h-10">
              <Send className="size-5" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
