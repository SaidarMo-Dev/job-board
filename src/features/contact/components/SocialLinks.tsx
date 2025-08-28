import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "www.linkedin.com/in/mohammed-saidar-1b3477363",
    description: "Professional networking and career updates",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/jobportal",
    description: "Latest news and job market insights",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/jobportal",
    description: "Behind-the-scenes and company culture",
  },
];

export function SocialLinks() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Connect With Us</CardTitle>
        <p className="text-sm text-muted-foreground">
          Follow us on social media for the latest updates and career tips.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Button
              key={social.name}
              variant="ghost"
              className="w-full justify-start h-auto p-3 hover:bg-accent/50"
              asChild
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >
                <Icon className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <p className="font-medium">{social.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {social.description}
                  </p>
                </div>
              </a>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
