import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Mail, MessageSquare, Trash2, UserRoundCheck } from "lucide-react";

const Messages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const replyId = searchParams.get("reply");
  const messageRefs = useRef({});

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages || {}
  );

  const [messageId, setMessageId] = useState("");

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (replyId && messageRefs.current[replyId]) {
      messageRefs.current[replyId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messages, replyId]);

  const handleSingleDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  const openMailClientReply = (email, name = "") => {
    const subject = `RE: Message from ${name}`;
    const body = `Hi ${name},\n\nThank you for reaching out!\n\n[Your message here]\n\nBest regards,\nDeepak Kushwaha`;
    const mailToLink = `https://mail.google.com/mail/u/0/?fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}&tf=cm`;

    window.open(mailToLink, "_blank");
  };

  return (
    <div className="min-h-screen p-6  mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
           💬 Manage Messages
        </h1>
        <p className="text-muted-foreground italic">
          "Communication is the bridge between confusion and clarity." – Nat
          Turner
        </p>
      </div>

      <Tabs defaultValue="messages">
        <TabsContent value="messages">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages && messages.length > 0 ? (
              [...messages].reverse().map((msg) => (
                <Card
                  key={msg._id}
                  ref={(el) => (messageRefs.current[msg._id] = el)}
                  className={`hover:shadow-lg transition-all border border-muted-foreground/10 bg-card ${
                    msg._id === replyId ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserRoundCheck
                        className="text-muted-foreground"
                        size={18}
                      />
                      {msg.name || "Unknown Sender"}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-sm text-muted-foreground space-y-4">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Mail size={16} className="text-muted-foreground" />
                      <span className="font-medium">Email:</span>
                      <span className="text-blue-600 break-all">
                        {msg.email}
                      </span>
                    </div>

                    <div className="flex gap-2 items-start">
                      <MessageSquare
                        size={16}
                        className="text-muted-foreground mt-1"
                      />
                      <div className="flex gap-2">
                        <span className="font-medium">Message:</span>
                        <p className="text-slate-700 break-words whitespace-pre-line">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center mt-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openMailClientReply(msg.email, msg.name)}
                    >
                      Reply
                    </Button>

                    <Button
                      onClick={() => handleSingleDelete(msg._id)}
                      disabled={loading && messageId === msg._id}
                      variant="destructive"
                      size="sm"
                    >
                      {loading && messageId === msg._id
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground text-lg py-20">
                📭 No messages in your inbox yet.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
