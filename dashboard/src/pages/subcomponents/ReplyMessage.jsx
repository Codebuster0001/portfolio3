// src/pages/ReplyMessage.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReplyMessage() {
  const { id } = useParams();
  const { messages } = useSelector((state) => state.messages);
  const message = messages.find((msg) => msg._id === id);

  if (!message) return <p className="text-red-500 p-4">Message not found.</p>;

  return (
    <section className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Reply to {message.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Email:</strong> {message.email}
          </p>
          <p className="my-2">
            <strong>Message:</strong> {message.message}
          </p>

          {/* You can replace this textarea with your actual reply form logic */}
          <textarea
            className="w-full mt-4 border rounded p-2"
            rows="5"
            placeholder="Type your reply here..."
          />
        </CardContent>
      </Card>
    </section>
  );
}
