"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  contactFormSchema,
  type ContactFormData,
} from "../schemas/contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorField from "@/shared/components/ErrorField";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // TODO : Handle submiting data t  our support
  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      reset();
    }, 1200);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Send us a Message</CardTitle>
        <p className="text-muted-foreground">
          Fill out the form below and we'll respond as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                required
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <ErrorField message={errors.firstName.message} />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                {...register("lastName")}
                id="lastName"
                required
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <ErrorField message={errors.lastName.message} />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
            />
            {errors.email && <ErrorField message={errors.email.message} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              {...register("phoneNumber")}
              id="phone"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <ErrorField message={errors.phoneNumber.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType">Type of Inquiry *</Label>
            <Controller
              name="typeOfInquiry"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job-application">
                      Job Application Questions
                    </SelectItem>
                    <SelectItem value="technical-support">
                      Technical Support
                    </SelectItem>
                    <SelectItem value="general-feedback">
                      General Feedback
                    </SelectItem>
                    <SelectItem value="employer-support">
                      Employer Support
                    </SelectItem>
                    <SelectItem value="account-issues">
                      Account Issues
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.typeOfInquiry && (
              <ErrorField message={errors.typeOfInquiry.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              {...register("message")}
              id="message"
              required
              placeholder="Please provide details about your inquiry..."
              className="min-h-32"
            />
            {errors.message && <ErrorField message={errors.message.message} />}
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
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
      </CardContent>
    </Card>
  );
}
