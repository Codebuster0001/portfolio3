import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SparklesText } from "@/components/magicui/sparkles-text";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-16 md:py-28 bg-black text-white"
    >
      <div className="max-w-6xl w-full space-y-12">
        {/* Heading */}
        <div className="text-center">
          <SparklesText className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's Connect
          </SparklesText>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Have a question, proposal, or just want to say hi? Fill out the form
            — I’ll get back to you soon.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Contact Form */}
          <Card className="bg-neutral-900 border border-gray-700 text-white shadow-2xl">
            <CardHeader className="pb-0" />
            <CardContent className="space-y-5">
              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-gray-800 text-white placeholder-gray-500 border-gray-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-gray-800 text-white placeholder-gray-500 border-gray-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="bg-gray-800 text-white placeholder-gray-500 border-gray-700"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-transform hover:scale-[1.02]"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="relative h-full w-full rounded-xl overflow-hidden shadow-xl hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1581091215367-3d9a5cf02429?q=80&w=1600&auto=format&fit=crop"
              alt="Contact Illustration"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
