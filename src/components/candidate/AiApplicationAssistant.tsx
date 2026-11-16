"use client";

import * as React from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { ChatMessage, CandidateProfile } from "@/types/candidate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AiApplicationAssistantProps {
  candidate: CandidateProfile;
}

const DEFAULT_SUGGESTIONS = [
  "What should I prep for my interview?",
  "When will I hear back?",
  "What documents are pending?",
  "Who is my recruiter?",
];

export function AiApplicationAssistant({ candidate }: AiApplicationAssistantProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: `Hi ${candidate.fullName.split(" ")[0]}! I'm your Cynbit AI Application Guide. Ask me anything about your current stage (${candidate.currentStage.toUpperCase()}), interview prep, or timeline.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, expanded]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    setInput("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidate.id,
          message: text,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            sender: "assistant",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-err-${Date.now()}`,
            sender: "assistant",
            text: "I couldn't retrieve that info right now. Please feel free to email your recruiter Pooja Rathore directly!",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-net-err-${Date.now()}`,
          sender: "assistant",
          text: "Connection interrupted. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="border-purple-200/80 dark:border-purple-900/60 shadow-sm relative overflow-hidden bg-gradient-to-b from-white via-white to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20">
      <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-950/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>AI Candidate Assistant</span>
                <Sparkles className="h-3.5 w-3.5 text-purple-500 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-xs">
                Grounded strictly on your application dossier
              </CardDescription>
            </div>
          </div>

          <Badge variant="purple" className="text-[10px] py-0.5 px-2">
            24/7 Verified
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-3 pb-3 space-y-3">
        {/* Messages Container */}
        <div
          ref={scrollRef}
          className="space-y-3 overflow-y-auto pr-1 max-h-[260px] min-h-[160px] text-xs"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-2.5",
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  msg.sender === "user"
                    ? "bg-cynbit-600 text-white"
                    : "bg-purple-600 text-white"
                )}
              >
                {msg.sender === "user" ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5" />
                )}
              </div>

              <div
                className={cn(
                  "rounded-xl p-3 max-w-[85%] whitespace-pre-line leading-relaxed",
                  msg.sender === "user"
                    ? "bg-cynbit-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                )}
              >
                {msg.text}
                <div
                  className={cn(
                    "text-[9px] mt-1 text-right",
                    msg.sender === "user"
                      ? "text-cynbit-100"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 pl-8">
              <span className="flex space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
              </span>
              <span className="text-[11px]">Consulting dossier...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="pt-1">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Quick Prompts
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_SUGGESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950/60 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 py-1 px-2.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700 text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your interview, timeline, or prep..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-xs focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 px-3"
            aria-label="Send message to AI assistant"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
