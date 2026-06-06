import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LinkedinIcon from "@/shared/components/LinkedinIcon";

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
        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-3 hover:bg-accent/50"
          asChild
        >
          <a
            href={"https://www.linkedin.com/in/mohammed-saidar-1b3477363"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3"
          >
            <LinkedinIcon className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-left">
              <p className="font-medium">LinkedIn</p>
              <p className="text-xs text-muted-foreground">
                Professional networking and career updates
              </p>
            </div>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
