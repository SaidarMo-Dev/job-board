import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function SettingsAndNotificationsPage() {
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    adviceAndTips: true,
    smsAlerts: false,
    marketingEmails: true,
  });

  const profileCompletion =
    useAppSelector(
      (state) => state.dashboardStatsReducer.stats?.profileCompletion
    ) ?? 0;

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

                  {notifications.jobAlerts && profileCompletion !== 100 && (
                    <Alert>
                      <AlertDescription className="flex items-center gap-2">
                        Want even better recommendations?
                        <Link
                          to={ROUTES.MEMBER.PROFILE}
                          className="text-primary dark:text-foreground hover:underline"
                        >
                          Complete your profile
                        </Link>
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
