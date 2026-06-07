import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Settings,
  Camera,
  Phone,
  Mail,
  Calendar,
  Shield,
  Eye,
  LogOut,
  Stethoscope,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, logout } = useAuth();
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Profile updated successfully");
    setSaving(false);
  };

  const getRoleIcon = () => {
    // @ts-ignore - user.role is extended in auth
    switch (user.role) {
      case "doctor":
        return <Stethoscope className="w-4 h-4" />;
      case "patient":
        return <Heart className="w-4 h-4" />;
      case "admin":
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  // @ts-ignore - user properties are extended
  const userRole = user.role || "patient";
  // @ts-ignore
  const userName = user.name || user.email?.split("@")[0] || "User";

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Card className="p-6 w-full md:w-80 flex-shrink-0">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 border-4 border-border">
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-semibold">
                    {userName
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-primary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-bold">{userName}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded mt-2 ${
                    userRole === "doctor"
                      ? "bg-primary/15 text-primary"
                      : userRole === "patient"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning"
                  }`}
                >
                  {getRoleIcon()}
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>Not provided</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex-1 w-full">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={userName.split(" ")[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={userName.split(" ")[1] || ""} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email || ""} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 000-0000" />
                    </div>

                    <Button
                      className="mt-4 bg-gradient-primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email updates about your account
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications on your device
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Security</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Eye className="w-4 h-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Shield className="w-4 h-4" />
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h3>
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
