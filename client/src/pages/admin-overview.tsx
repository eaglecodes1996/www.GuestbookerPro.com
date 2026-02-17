import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp,
  Database,
  UserPlus,
  Zap,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdminOverviewData {
  users: {
    total: number;
    newLast7Days: number;
    newLast30Days: number;
    recentSignups: Array<{
      id: string;
      username: string;
      subscriptionTier: string;
      createdAt: string | null;
    }>;
  };
  subscriptions: {
    byTier: Record<string, number>;
    mrr: string;
  };
  activity: {
    totalShows: number;
    totalProfiles: number;
    totalApiCalls: number;
    totalTokens: number;
    totalCostDollars: string;
  };
}

const tierColors: Record<string, string> = {
  basic: 'bg-gray-100 text-gray-800',
  growth: 'bg-blue-100 text-blue-800',
  pro: 'bg-purple-100 text-purple-800',
  agency: 'bg-pink-100 text-pink-800',
  unlimited: 'bg-green-100 text-green-800',
};

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  trendLabel,
}: { 
  title: string; 
  value: string; 
  icon: any; 
  trend?: string;
  trendLabel?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && trendLabel && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-semibold text-green-600">+{trend}</span> {trendLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminOverview() {
  const { data: overview, isLoading, error } = useQuery<AdminOverviewData>({
    queryKey: ['/api/admin/overview'],
  });

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm text-destructive">
            Failed to load admin overview. You may not have admin permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-muted-foreground mt-2">
          Platform metrics, user activity, and revenue insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : overview ? (
          <>
            <MetricCard
              title="Total Users"
              value={overview.users.total.toString()}
              icon={Users}
              trend={overview.users.newLast7Days.toString()}
              trendLabel="new this week"
            />
            <MetricCard
              title="Monthly Revenue (MRR)"
              value={`$${overview.subscriptions.mrr}`}
              icon={DollarSign}
            />
            <MetricCard
              title="Total Shows"
              value={overview.activity.totalShows.toString()}
              icon={Database}
            />
            <MetricCard
              title="API Cost"
              value={`$${overview.activity.totalCostDollars}`}
              icon={Activity}
            />
          </>
        ) : null}
      </div>

      {/* Subscriptions by Tier */}
      {!isLoading && overview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Subscriptions by Tier
            </CardTitle>
            <CardDescription>
              Distribution of users across subscription tiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(overview.subscriptions.byTier).map(([tier, count]) => (
                <div key={tier} className="text-center p-4 border rounded-lg">
                  <Badge className={tierColors[tier] || 'bg-gray-100 text-gray-800'}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </Badge>
                  <p className="text-2xl font-bold mt-2">{count}</p>
                  <p className="text-xs text-muted-foreground">users</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Activity */}
      {!isLoading && overview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Platform Activity
            </CardTitle>
            <CardDescription>
              API usage and resource consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Profiles</p>
                <p className="text-2xl font-bold mt-1">{overview.activity.totalProfiles}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">API Calls (recent)</p>
                <p className="text-2xl font-bold mt-1">{overview.activity.totalApiCalls}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Tokens Used</p>
                <p className="text-2xl font-bold mt-1">{overview.activity.totalTokens.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent User Signups */}
      {!isLoading && overview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Recent User Signups
            </CardTitle>
            <CardDescription>
              Last 10 users who joined the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overview.users.recentSignups.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No recent signups
                    </TableCell>
                  </TableRow>
                ) : (
                  overview.users.recentSignups.map((user) => (
                    <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>
                        <Badge className={tierColors[user.subscriptionTier] || tierColors.basic}>
                          {user.subscriptionTier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.createdAt 
                          ? new Date(user.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {!isLoading && overview && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">New Users (7 days)</p>
                <p className="text-xl font-bold mt-1">{overview.users.newLast7Days}</p>
              </div>
              <div>
                <p className="text-muted-foreground">New Users (30 days)</p>
                <p className="text-xl font-bold mt-1">{overview.users.newLast30Days}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Shows per User</p>
                <p className="text-xl font-bold mt-1">
                  {overview.users.total > 0 
                    ? (overview.activity.totalShows / overview.users.total).toFixed(1)
                    : '0'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Profiles per User</p>
                <p className="text-xl font-bold mt-1">
                  {overview.users.total > 0
                    ? (overview.activity.totalProfiles / overview.users.total).toFixed(1)
                    : '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
