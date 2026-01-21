"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Replace with your Formspree endpoint
      const formspreeEndpoint = "https://formspree.io/f/xykkobkv";

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
        {isSuccess ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Message Sent!
            </h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. I&apos;ll get back to you within 24
              hours.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsSuccess(false)}
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form  method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                {...register("subject")}
                className={errors.subject ? "border-destructive" : ""}
              />
              {errors.subject && (
                <p className="text-xs text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                {...register("message")}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <a
              href="mailto:samyogkhadka247@gmail.com"
              className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">samyogkhadka247@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">Nepal</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Connect With Me
          </h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/samyog7901"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/samyog-khadka-9553372a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-secondary/50 border border-border">
          <p className="text-muted-foreground italic">
            "I&apos;m always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            I&apos;ll try my best to get back to you!"
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-foreground mb-2">
            Quick Response Time
          </h4>
          <p className="text-sm text-muted-foreground">
            I typically respond within 24 hours. For urgent inquiries, feel free
            to reach out on LinkedIn for a faster response.
          </p>
        </div>
      </div>
    </div>
  );
}

