import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button } from "@/components/PageBits";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader title="Profile & Settings" desc="Manage your account preferences" />
      <Tabs defaultValue="profile">
        <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="health">Health</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList>

        <TabsContent value="profile"><Card className="p-6 space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 555 ..." /></div>
            <div className="space-y-2"><Label>Time zone</Label><Select defaultValue="pst"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="pst">Pacific (PST)</SelectItem><SelectItem value="est">Eastern (EST)</SelectItem><SelectItem value="utc">UTC</SelectItem></SelectContent></Select></div>
          </div>
          <Button className="bg-gradient-primary">Save changes</Button>
        </Card></TabsContent>

        <TabsContent value="health"><Card className="p-6 space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Diabetes type</Label><Select defaultValue="t2"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="t1">Type 1</SelectItem><SelectItem value="t2">Type 2</SelectItem><SelectItem value="gd">Gestational</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Units</Label><Select defaultValue="mgdl"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="mgdl">mg/dL</SelectItem><SelectItem value="mmol">mmol/L</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Height (cm)</Label><Input type="number" defaultValue={170} /></div>
            <div className="space-y-2"><Label>Weight (kg)</Label><Input type="number" defaultValue={72} /></div>
            <div className="space-y-2"><Label>Target low</Label><Input type="number" defaultValue={70} /></div>
            <div className="space-y-2"><Label>Target high</Label><Input type="number" defaultValue={180} /></div>
          </div>
          <Button className="bg-gradient-primary">Save preferences</Button>
        </Card></TabsContent>

        <TabsContent value="notifications"><Card className="p-6 space-y-4 max-w-2xl">
          {["Push notifications","Email alerts","SMS for critical events","Weekly summary","Medication reminders"].map(n=>(
            <div key={n} className="flex items-center justify-between"><Label>{n}</Label><Switch defaultChecked /></div>
          ))}
        </Card></TabsContent>

        <TabsContent value="security"><Card className="p-6 space-y-4 max-w-2xl">
          <div className="space-y-2"><Label>Current password</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>New password</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>Confirm</Label><Input type="password" /></div>
          <Button className="bg-gradient-primary">Update password</Button>
        </Card></TabsContent>
      </Tabs>
    </div>
  );
}
