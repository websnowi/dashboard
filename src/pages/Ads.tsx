
import React, { useState } from 'react';
import { useToolContext } from '@/context/ToolContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface AdBid {
  toolId: string;
  amount: number;
  position?: number; // Used for homepage positions
}

const Ads: React.FC = () => {
  const { getApprovedTools } = useToolContext();
  const approvedTools = getApprovedTools();
  
  // State for current bids
  const [headerBannerBid, setHeaderBannerBid] = useState<AdBid | null>(null);
  const [popupBid, setPopupBid] = useState<AdBid | null>(null);
  const [homepagePositionBids, setHomepagePositionBids] = useState<AdBid[]>([]);
  
  // State for bid amounts
  const [bidAmounts, setBidAmounts] = useState<{[key: string]: number}>({
    headerBanner: headerBannerBid?.amount ? headerBannerBid.amount + 1 : 10,
    popup: popupBid?.amount ? popupBid.amount + 1 : 5,
    positions: Array(6).fill(0).map((_, i) => {
      const existingBid = homepagePositionBids.find(bid => bid.position === i);
      return existingBid?.amount ? existingBid.amount + 1 : 2;
    })
  });

  // State for selected tool
  const [selectedToolId, setSelectedToolId] = useState<string | null>(
    approvedTools.length > 0 ? approvedTools[0].id : null
  );
  
  const handlePlaceBid = (type: 'headerBanner' | 'popup' | 'position', position?: number) => {
    if (!selectedToolId) {
      toast.error('Please select a tool first');
      return;
    }
    
    const getBidAmount = () => {
      if (type === 'headerBanner') return bidAmounts.headerBanner;
      if (type === 'popup') return bidAmounts.popup;
      if (type === 'position' && position !== undefined) return bidAmounts.positions[position];
      return 0;
    };
    
    const bidAmount = getBidAmount();
    
    if (bidAmount <= 0) {
      toast.error('Bid amount must be greater than 0');
      return;
    }
    
    const newBid: AdBid = {
      toolId: selectedToolId,
      amount: bidAmount,
      ...(position !== undefined && { position })
    };
    
    // Update appropriate state based on bid type
    if (type === 'headerBanner') {
      setHeaderBannerBid(newBid);
      setBidAmounts(prev => ({
        ...prev,
        headerBanner: bidAmount + 1
      }));
      toast.success('Header banner bid placed successfully!');
    } else if (type === 'popup') {
      setPopupBid(newBid);
      setBidAmounts(prev => ({
        ...prev,
        popup: bidAmount + 1
      }));
      toast.success('Popup ad bid placed successfully!');
    } else if (type === 'position' && position !== undefined) {
      setHomepagePositionBids(prev => {
        const newBids = [...prev];
        const existingIndex = newBids.findIndex(bid => bid.position === position);
        
        if (existingIndex >= 0) {
          newBids[existingIndex] = newBid;
        } else {
          newBids.push(newBid);
        }
        
        return newBids;
      });
      
      setBidAmounts(prev => {
        const newPositions = [...prev.positions];
        newPositions[position] = bidAmount + 1;
        return {
          ...prev,
          positions: newPositions
        };
      });
      toast.success(`Homepage position ${position + 1} bid placed successfully!`);
    }
  };
  
  const getToolNameById = (id: string) => {
    const tool = approvedTools.find(tool => tool.id === id);
    return tool ? tool.name : 'Unknown Tool';
  };
  
  const getCurrentBidDisplay = (type: 'headerBanner' | 'popup' | 'position', position?: number) => {
    if (type === 'headerBanner' && headerBannerBid) {
      return (
        <div className="text-sm text-gray-600 mb-3">
          Current bid: <span className="font-semibold">${headerBannerBid.amount}</span> by <span className="font-semibold">{getToolNameById(headerBannerBid.toolId)}</span>
        </div>
      );
    } else if (type === 'popup' && popupBid) {
      return (
        <div className="text-sm text-gray-600 mb-3">
          Current bid: <span className="font-semibold">${popupBid.amount}</span> by <span className="font-semibold">{getToolNameById(popupBid.toolId)}</span>
        </div>
      );
    } else if (type === 'position' && position !== undefined) {
      const positionBid = homepagePositionBids.find(bid => bid.position === position);
      if (positionBid) {
        return (
          <div className="text-sm text-gray-600 mb-3">
            Current bid: <span className="font-semibold">${positionBid.amount}</span> by <span className="font-semibold">{getToolNameById(positionBid.toolId)}</span>
          </div>
        );
      }
    }
    
    return <div className="text-sm text-gray-600 mb-3">No current bids</div>;
  };

  return (
    <DashboardLayout currentPage="ads">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advertising Options</h1>
          <p className="text-gray-600">
            Promote your AI tools on our website with various advertising options.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Select Your Tool 
            </CardTitle>
            <CardDescription>
              Choose which of your approved tools you want to advertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {approvedTools.map(tool => (
                <Button
                  key={tool.id}
                  variant={selectedToolId === tool.id ? "default" : "outline"}
                  className="h-auto py-2 px-3 justify-start"
                  onClick={() => setSelectedToolId(tool.id)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-8 h-8 overflow-hidden rounded-sm flex-shrink-0">
                      <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="truncate">{tool.name}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            {approvedTools.length === 0 && (
              <p className="text-center py-4 text-gray-500">
                You don't have any approved tools yet. Get your tools approved first.
              </p>
            )}
          </CardContent>
        </Card>
        
        <Tabs defaultValue="premium" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="premium">Premium Positions</TabsTrigger>
            <TabsTrigger value="homepage">Homepage Positions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="premium" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Header Banner 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your tool will appear as a prominent banner at the top of our main website, receiving maximum visibility.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getCurrentBidDisplay('headerBanner')}
                
                <div className="flex gap-3">
                  <Input
                    type="number"
                    min={headerBannerBid ? headerBannerBid.amount + 1 : 1}
                    value={bidAmounts.headerBanner}
                    onChange={(e) => setBidAmounts(prev => ({ 
                      ...prev, 
                      headerBanner: Number(e.target.value) 
                    }))}
                    placeholder="Bid amount in $"
                    className="w-32"
                    disabled={!selectedToolId}
                  />
                  <Button 
                    onClick={() => handlePlaceBid('headerBanner')}
                    disabled={!selectedToolId}
                  >
                    Place Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Popup Ad 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your tool will appear in a popup when users visit our website, ensuring they see your tool first.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getCurrentBidDisplay('popup')}
                
                <div className="flex gap-3">
                  <Input
                    type="number"
                    min={popupBid ? popupBid.amount + 1 : 1}
                    value={bidAmounts.popup}
                    onChange={(e) => setBidAmounts(prev => ({ 
                      ...prev, 
                      popup: Number(e.target.value) 
                    }))}
                    placeholder="Bid amount in $"
                    className="w-32"
                    disabled={!selectedToolId}
                  />
                  <Button 
                    onClick={() => handlePlaceBid('popup')}
                    disabled={!selectedToolId}
                  >
                    Place Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="homepage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Homepage Tool Positions
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your tool will be featured in one of the top positions on our homepage. Position 1 is the most prominent.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <CardDescription>
                  Bid to secure a top position for your tool on our homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <Card key={i} className="shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          Position {i + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {getCurrentBidDisplay('position', i)}
                        
                        <div className="flex gap-2 flex-wrap">
                          <Input
                            type="number"
                            min={1}
                            value={bidAmounts.positions[i]}
                            onChange={(e) => {
                              const newPositions = [...bidAmounts.positions];
                              newPositions[i] = Number(e.target.value);
                              setBidAmounts(prev => ({
                                ...prev,
                                positions: newPositions
                              }));
                            }}
                            placeholder="Bid amount in $"
                            className="w-24"
                            disabled={!selectedToolId}
                          />
                          <Button 
                            onClick={() => handlePlaceBid('position', i)}
                            disabled={!selectedToolId}
                          >
                            Place Bid
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Ads;
