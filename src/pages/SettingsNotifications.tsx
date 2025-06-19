import { useState } from "react";
import { Mail, User, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router";

export default function SettingsAndNotificationsPage() {
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    adviceAndTips: true,
    smsAlerts: false,
    marketingEmails: true,
  });
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [copied, setCopied] = useState(false);

  const publicUrl = "snagajob.com/profiles/++684ed8";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Settings & Notifications
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your notifications and profile preferences
              </p>
            </div>
            <Link to="/members/password-security">
              <Button variant="outline" className="flex items-center gap-2">
                Password & Security
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription>
                    Choose what email notifications you'd like to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Job Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get tailored recommendations and see who's hiring near
                        you
                      </p>
                    </div>
                    <Switch
                      checked={notifications.jobAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          jobAlerts: checked,
                        })
                      }
                    />
                  </div>

                  {notifications.jobAlerts && (
                    <Alert>
                      <AlertDescription className="flex items-center gap-2">
                        Want even better recommendations?{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary"
                        >
                          Complete your profile
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Advice and Tips
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Supercharge your job search with expert tips from our
                        team
                      </p>
                    </div>
                    <Switch
                      checked={notifications.adviceAndTips}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          adviceAndTips: checked,
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Marketing Communications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          marketingEmails: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>
                    Receive text message alerts for important updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Job Alerts via SMS
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Stay ahead in your job search with notifications on new
                        job postings just for you
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          smsAlerts: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* end email notifications */}

            <div className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Public Profile
                  </CardTitle>
                  <CardDescription>
                    Control how your profile appears to employers and the public
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1 mr-4">
                      <Label className="text-base font-medium">
                        Profile Visibility
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        This controls whether or not the URL below is made
                        public. For your protection, your email address, full
                        physical address and phone number are never shared to
                        the public. This information is only available to
                        employers where you've applied for jobs.
                      </p>
                    </div>
                    <Switch
                      checked={profileVisibility}
                      onCheckedChange={setProfileVisibility}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Your Public URL
                      </Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Copy your unique URL for applications
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          value={publicUrl}
                          readOnly
                          className="flex-1 bg-muted"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex items-center gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Marketing Preferences</CardTitle>
                  <CardDescription>
                    Manage your marketing communication preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Unsubscribe from all marketing communications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
