import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Button, Badge } from "@/components/PageBits";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/app/users")({ component: Users });

const users = [
  { n: "Sarah Johnson", e: "sarah@x.com", r: "patient", s: "active" },
  { n: "Dr. Anjali Patel", e: "anjali@clinic.com", r: "doctor", s: "active" },
  { n: "Admin User", e: "admin@glucocare.io", r: "admin", s: "active" },
  { n: "Michael Chen", e: "mchen@x.com", r: "patient", s: "suspended" },
  { n: "Dr. James Lee", e: "jlee@clinic.com", r: "doctor", s: "active" },
];

function Users() {
  return (
    <div>
      <PageHeader title="User Management" desc="Search, change roles, suspend or activate users" />
      <Card className="p-4">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{u.n}</TableCell>
                  <TableCell className="text-muted-foreground">{u.e}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {u.r}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        u.s === "active"
                          ? "bg-success/15 text-success hover:bg-success/15"
                          : "bg-destructive/15 text-destructive hover:bg-destructive/15"
                      }
                    >
                      {u.s}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        {u.s === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
