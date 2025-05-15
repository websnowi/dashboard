import React, { useState } from 'react';
import { useToolContext } from '@/context/ToolContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AddToolForm: React.FC = () => {
  const { addTool } = useToolContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    try {
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (data.url) {
        setImagePreview(data.url);
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        toast.error('Failed to upload image');
      }
    } catch (err) {
      toast.error('Error uploading image');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.description || !formData.link) {
        toast.error('Please fill in all required fields');
        return;
      }

      const finalImageUrl =
        formData.imageUrl ||
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60';

      addTool({
        ...formData,
        imageUrl: finalImageUrl,
      });

      setFormData({
        name: '',
        description: '',
        link: '',
        imageUrl: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting tool:', error);
      toast.error('Something went wrong while submitting the tool');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="dashboard-card mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New AI Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Tool Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter tool name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Tool Description *
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this tool does"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="link" className="block text-sm font-medium">
              Tool Link *
            </label>
            <Input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium">
              Tool Image
            </label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative w-40 h-40 overflow-hidden rounded-md">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-dashboard-primary hover:bg-dashboard-primary/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Tool'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddToolForm;
