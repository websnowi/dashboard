
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import { ToolProvider } from '@/context/ToolContext';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  return (
    <ToolProvider>
      <SettingsContent />
    </ToolProvider>
  );
};

const SettingsContent: React.FC = () => {
  const { userName, userPlan, updateUserName, updateUserPlan } = useUserContext();
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    username: userName,
    email: 'user@example.com',
    password: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const saveProfile = () => {
    updateUserName(form.username);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  const changePlan = (plan: 'starter' | 'professional' | 'enterprise') => {
    updateUserPlan(plan);
    toast({
      title: "Plan Changed",
      description: `You are now on the ${plan} plan.`
    });
  };
  
  const deleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <DashboardLayout currentPage="settings">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <Input 
                    id="username" 
                    name="username"
                    value={form.username} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={form.email} 
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="plan">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className={userPlan === 'starter' ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription className="text-xl font-bold">$29/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span>Monthly analytics</span>
                    </li>
                    <li className="flex items-center">
                      <span>Basic features</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={userPlan === 'starter' ? "outline" : "default"}
                    onClick={() => changePlan('starter')}
                    disabled={userPlan === 'starter'}
                    className="w-full"
                  >
                    {userPlan === 'starter' ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={userPlan === 'professional' ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription className="text-xl font-bold">$59/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span>Monthly & weekly analytics</span>
                    </li>
                    <li className="flex items-center">
                      <span>Advanced features</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={userPlan === 'professional' ? "outline" : "default"}
                    onClick={() => changePlan('professional')}
                    disabled={userPlan === 'professional'}
                    className="w-full"
                  >
                    {userPlan === 'professional' ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={userPlan === 'enterprise' ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription className="text-xl font-bold">$99/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span>Daily, weekly & monthly analytics</span>
                    </li>
                    <li className="flex items-center">
                      <span>Premium support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={userPlan === 'enterprise' ? "outline" : "default"}
                    onClick={() => changePlan('enterprise')}
                    disabled={userPlan === 'enterprise'}
                    className="w-full"
                  >
                    {userPlan === 'enterprise' ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Update your password or delete your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    value={form.password} 
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    value={form.confirmPassword} 
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Password Changed",
                      description: "Your password has been updated successfully."
                    });
                    setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
                  }}
                  disabled={!form.password || form.password !== form.confirmPassword}
                >
                  Update Password
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={deleteAccount}
                >
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
