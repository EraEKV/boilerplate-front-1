'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/app/shared/ui/button"
import { Input } from "@/app/shared/ui/input"
import { ScrollArea } from "@/app/shared/ui/scroll-area"


export default function Component() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm an AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);
  

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      
      console.log('test ', )
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}` }])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border rounded-lg overflow-hidden shadow-xl bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-primary p-4 text-primary-foreground">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </div>
      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
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
              className={`max-w-[70%] rounded-lg p-3 mb-[3px] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
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
            onKeyPress={(e) => e.key == 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow py-5 rounded-xl"
          />
          <Button onClick={handleSend} type="submit" size="icon" className="bg-primary rounded-xl w-12 h-10">
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}