import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages || {} // Prevent destructure error
  );

  const [messageId, setMessageId] = useState("");

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

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
      dispatch(resetMessagesSlice()); // Only reset error/message, not messages array
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen sm:gap-4 sm:py-4 sm:pl-20 p-4">
      <Tabs defaultValue="messages">
        <TabsContent value="messages">
          <Card>
            

            <CardContent className="grid sm:grid-cols-2 gap-4">
              {messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card key={element._id} className="p-4 flex flex-col gap-2">
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Sender Name:</span>
                      {element.senderName}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Subject:</span>
                      {element.subject}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Message:</span>
                      {element.message}
                    </CardDescription>

                    <CardFooter className="justify-end">
                      <Button
                        onClick={() => handleMessageDelete(element._id)}
                        disabled={loading && messageId === element._id}
                        className="w-32"
                        variant="destructive"
                      >
                        {loading && messageId === element._id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground text-lg py-8">
                  No Messages Found!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
