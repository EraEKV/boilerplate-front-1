'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Square, Paperclip } from 'lucide-react'
import { Button } from "@/app/shared/ui/button"
import { io } from 'socket.io-client'
import ReactMarkdown from 'react-markdown'
import { Toaster, toast } from 'sonner'

interface MessageData {
  role: "user" | "assistant"; 
  content: string
}

export default function Component() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    console.log(savedMessages);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
      setIsStreaming(false);
    }

    socket.current = io(process.env.NEXT_PUBLIC_BACKEND_ORIGIN || 'ws://localhost:5000', {
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

    socket.current.on("error", (error: string) => {
      toast.error(error);
    })

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
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);  

  useEffect(() => {
    if (!isStreaming) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [isStreaming])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setInput((prev) => prev + '\n');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: MessageData = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      localStorage.setItem("chatHistory", JSON.stringify([...messages, { role: 'user', content: input }]));
      setIsStreaming(true);
      socket.current?.emit("message", [...messages, { role: 'user', content: input }]);
    }
  }

  const handleClearMemory = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  }

  const handleStopStreaming = () => {
    setIsStreaming(false);
    socket.current?.emit("stop_stream");
  }

  return (
    <>
      <div className='fixed top-0 w-full z-50 bg-white'>
        <div className='py-4 flex justify-between px-5 items-center border-[2px] shadow-xl'>
          <h2 className='text-xl font-bold'>ChatKPT</h2>

          <Button onClick={handleClearMemory} className='px-3 py-5 text-base'>
            Clear memory
          </Button>

          {/* <div className='text-base'>
            Account
          </div> */}
        </div>
      </div>

      <div className="flex max-w-4xl h-screen pt-[10vh] mx-auto flex-col">
        <div className="flex-grow p-4 pb-0 space-y-2">
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
                className={`max-w-[70%] rounded-lg p-3 whitespace-pre-wrap break-words ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              >
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 px-4 bg-white pb-1 md:pb-2 space-y-1 md:space-y-2">
          <div className='relative rounded-3xl border-[2px] py-2 px-2'>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center">
              <Button className='absolute bottom-3 left-2 md:left-4 h-10 md:h-[38px] w-10 md:w-10 p-0 rounded-xl'>
                <Paperclip className='size-5'/>
              </Button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-[70%] md:w-[85%] mx-auto focus:outline-none py-3 overflow-y-auto max-h-[120px]"
                style={{ resize: 'none' }}
                placeholder="Type your message..."
              />
              {isStreaming ? (
                <Button onClick={handleStopStreaming} className="bg-primary rounded-xl w-10 md:w-10 h-10 md:h-[38px] p-0">
                  <Square className='size-5' />
                </Button>
              ) : (
                <Button onClick={handleSend} type="submit" className="absolute bottom-3 right-2 md:right-4 bg-primary rounded-xl w-10 md:w-10 h-10 md:h-[38px] p-0">
                  <Send className="size-5 mr-[1px] mt-[1px]" />
                </Button>
              )}
            </form>
          </div>
          <p className='text-center text-xs text-gray-400'>Да это полный клон ChatGPT с бесплатной GPT-4o.</p>
        </div>
        

        <Toaster position="top-center" richColors />
      </div>
    </>
  )
}
