
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToolProvider } from '@/context/ToolContext';

const Support: React.FC = () => {
  return (
    <ToolProvider>
      <SupportContent />
    </ToolProvider>
  );
};

const SupportContent: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Sent",
      description: "We'll get back to you as soon as possible."
    });
    // Reset form here if needed
  };
  
  return (
    <DashboardLayout currentPage="support">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Support</h1>
          <p className="text-gray-600">
            Need help? We're here for you.
          </p>
        </div>
        
        <Tabs defaultValue="contact">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">How do I add a new AI tool?</h3>
                    <p className="text-muted-foreground">
                      Navigate to the Home section and fill out the tool submission form with all required details, then click Submit.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">How long does the review process take?</h3>
                    <p className="text-muted-foreground">
                      We typically review new tool submissions within 24-48 hours.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">How do analytics work?</h3>
                    <p className="text-muted-foreground">
                      The analytics section shows user engagement with your tools. The data available depends on your subscription plan.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">How do I upgrade my plan?</h3>
                    <p className="text-muted-foreground">
                      Go to Settings {'>'} Plan and select the plan you wish to upgrade to.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">How do ad placements work?</h3>
                    <p className="text-muted-foreground">
                      In the Ads section, you can bid on different ad placement positions. The highest bid gets the position.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Support;
