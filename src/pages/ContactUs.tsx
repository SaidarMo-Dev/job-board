// import { ContactForm } from "@/components/contact-form";
// import { ContactFAQ } from "@/components/contact-faq";
import { SocialLinks } from "@/features/contact/components/SocialLinks";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/features/contact/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background custom-container">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have questions about job opportunities, need technical support, or
            want to provide feedback? We're here to help you succeed in your
            career journey.
          </p>
        </div>
      </div>

      <div className="mx-auto px-4 max-w-6xl py-12">
        <div className="flex flex-col gap-8">
          {/* Contact Information */}
          <div className=" space-y-6">
            <Card className="border-none shadow-none">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">ilink.panel@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        Morocco
                        <br />
                        El Jadida, CA 94105
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 9AM-6PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Separator />
            <SocialLinks />
          </div>

          {/* Contact Form */}
          <div className="">
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">{/* <ContactFAQ /> */}</div>
      </div>
    </div>
  );
}
