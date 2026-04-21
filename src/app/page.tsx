'use client';

import ChatInput from "@/src/components/chat/ChatInput";
import ChatMessage from "@/src/components/chat/ChatMessage";
import FeedbackStars from "@/src/components/chat/FeedbackStars";
import LoadingIndicator from "@/src/components/chat/LoadingIndicator";
import Navbar from "@/src/components/layout/Navbar";
import { useAuth } from "@/src/contexts/AuthContext";
import apiService from "@/src/lib/api";
import { useState } from "react";
import LoginModal from "../components/authpages/LoginModal";

interface Message {
  id: string;
  question: string;
  answer: string;
  searchTime: number;
  source: string;
  timestamp: Date;
}

export default function HomePage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQueryId, setCurrentQueryId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const handleAskQuestion = async (question: string) => {
    if (!user?.id) {
      setPendingQuestion(question);
      setShowLoginModal(true);
      return;
    }

    await processQuestion(question);
  };

  const processQuestion = async (question: string) => {
    setLoading(true);
    try {
      const response = await apiService.askQuestion(question, user!.id);
      
      const newMessage: Message = {
        id: response.query_id,
        question: question,
        answer: response.answer,
        searchTime: response.search_time_ms,
        source: response.source_document,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [newMessage, ...prev]);
      setCurrentQueryId(response.query_id);
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (rating: number, comment: string) => {
    if (!currentQueryId) return;
    
    try {
      const message = messages.find(m => m.id === currentQueryId);
      if (message) {
        await apiService.submitFeedback({
          query_id: parseInt(message.id),
          rating,
          engineer_comment: comment,
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingQuestion) {
      processQuestion(pendingQuestion);
      setPendingQuestion(null);
    }
  };

  const handleCancelLogin = () => {
    setShowLoginModal(false);
    setPendingQuestion(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Technical Support Assistant
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ask any technical question about our systems and get instant AI-powered answers
            </p>
          </div>

          <ChatInput onAsk={handleAskQuestion} disabled={loading} />
          
          {loading && <LoadingIndicator />}
          
          <div className="mt-8 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage message={message} />
                {message.id === currentQueryId && (
                  <FeedbackStars onSubmit={handleFeedback} />
                )}
              </div>
            ))}
          </div>

          {messages.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Ready to help with technical questions
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try asking: "How do I configure VPN on Cisco router?" or "What is the revenue collection process?"
              </p>
            </div>
          )}
        </div>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCancelLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

// 'use client';

// import ChatInput from "@/src/components/chat/ChatInput";
// import ChatMessage from "@/src/components/chat/ChatMessage";
// import FeedbackStars from "@/src/components/chat/FeedbackStars";
// import LoadingIndicator from "@/src/components/chat/LoadingIndicator";
// import { useAuth } from "@/src/contexts/AuthContext";
// import apiService from "@/src/lib/api";
// import { useState } from "react";

// interface Message {
//   id: string;
//   question: string;
//   answer: string;
//   searchTime: number;
//   source: string;
//   timestamp: Date;
// }

// export default function HomePage() {
//   const { user } = useAuth(); // Get user object instead of userId
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentQueryId, setCurrentQueryId] = useState<string | null>(null);

//   const handleAskQuestion = async (question: string) => {
//     if (!user?.id) return; // Check user.id instead of userId

//     setLoading(true);
//     try {
//       const response = await apiService.askQuestion(question, user.id);
      
//       const newMessage: Message = {
//         id: response.query_id,
//         question: question,
//         answer: response.answer,
//         searchTime: response.search_time_ms,
//         source: response.source_document,
//         timestamp: new Date(),
//       };
      
//       setMessages((prev) => [newMessage, ...prev]);
//       setCurrentQueryId(response.query_id);
//     } catch (error) {
//       console.error('Error asking question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFeedback = async (rating: number, comment: string) => {
//     if (!currentQueryId) return;
    
//     try {
//       // Find the query ID from the message
//       const message = messages.find(m => m.id === currentQueryId);
//       if (message) {
//         await apiService.submitFeedback({
//           query_id: parseInt(message.id),
//           rating,
//           engineer_comment: comment,
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           AI Technical Support Assistant
//         </h1>
//         <p className="mt-2 text-gray-600 dark:text-gray-400">
//           Ask any technical question about our systems and get instant AI-powered answers
//         </p>
//       </div>

//       <ChatInput onAsk={handleAskQuestion} disabled={loading} />
      
//       {loading && <LoadingIndicator />}
      
//       <div className="mt-8 space-y-4">
//         {messages.map((message) => (
//           <div key={message.id}>
//             <ChatMessage message={message} />
//             {message.id === currentQueryId && (
//               <FeedbackStars onSubmit={handleFeedback} />
//             )}
//           </div>
//         ))}
//       </div>

//       {messages.length === 0 && !loading && (
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">🤖</div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//             Ready to help with technical questions
//           </h3>
//           <p className="mt-2 text-gray-500 dark:text-gray-400">
//             Try asking: "How do I configure VPN on Cisco router?" or "What is the revenue collection process?"
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }