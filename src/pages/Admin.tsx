import { useState } from 'react';
import { Plus, Users, Tag, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { gurus, categories } from '@/lib/mockData';

const Admin = () => {
  const [guruForm, setGuruForm] = useState({
    channelUrl: '',
    name: '',
    category: 'crypto',
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '📊',
    weights: {
      accuracy: 40,
      confidence: 25,
      timeframe: 20,
      reasoning: 10,
      impact: 5,
    },
  });

  const [predictionForm, setPredictionForm] = useState({
    guruId: '',
    title: '',
    asset: '',
    target: '',
    timeframeEnd: '',
    confidence: 'medium',
    reasoning: '',
  });

  const handleAddGuru = () => {
    if (!guruForm.channelUrl || !guruForm.name) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Added ${guruForm.name} to the platform!`);
    setGuruForm({ channelUrl: '', name: '', category: 'crypto' });
  };

  const handleAddCategory = () => {
    if (!categoryForm.name) {
      toast.error('Please enter a category name');
      return;
    }
    toast.success(`Category "${categoryForm.name}" created!`);
    setCategoryForm({ name: '', icon: '📊', weights: { accuracy: 40, confidence: 25, timeframe: 20, reasoning: 10, impact: 5 } });
  };

  const handleAddPrediction = () => {
    if (!predictionForm.guruId || !predictionForm.title) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Prediction added successfully!');
    setPredictionForm({
      guruId: '',
      title: '',
      asset: '',
      target: '',
      timeframeEnd: '',
      confidence: 'medium',
      reasoning: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Admin</span> Panel
          </h1>
          <p className="text-muted-foreground">
            Manage gurus, categories, and predictions
          </p>
        </div>

        <Tabs defaultValue="gurus" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="gurus" className="gap-2">
              <Users className="h-4 w-4" />
              Gurus
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="predictions" className="gap-2">
              <FileText className="h-4 w-4" />
              Predictions
            </TabsTrigger>
          </TabsList>

          {/* Add Guru */}
          <TabsContent value="gurus">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-accent" />
                  Add YouTuber
                </CardTitle>
                <CardDescription>
                  Add a new crypto influencer to track their predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="channelUrl">YouTube Channel URL *</Label>
                    <Input
                      id="channelUrl"
                      placeholder="https://youtube.com/@channel"
                      value={guruForm.channelUrl}
                      onChange={(e) => setGuruForm({ ...guruForm, channelUrl: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name *</Label>
                    <Input
                      id="name"
                      placeholder="CryptoWizard"
                      value={guruForm.name}
                      onChange={(e) => setGuruForm({ ...guruForm, name: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={guruForm.category} 
                    onValueChange={(v) => setGuruForm({ ...guruForm, category: v })}
                  >
                    <SelectTrigger className="w-full bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddGuru} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Fetch & Add Guru
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Category */}
          <TabsContent value="categories">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-accent" />
                  Add Category
                </CardTitle>
                <CardDescription>
                  Create a new prediction category with custom scoring weights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="catName">Category Name *</Label>
                    <Input
                      id="catName"
                      placeholder="Stocks"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="catIcon">Icon (emoji)</Label>
                    <Input
                      id="catIcon"
                      placeholder="📈"
                      value={categoryForm.icon}
                      onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Scoring Weights</Label>
                  {Object.entries(categoryForm.weights).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key}</span>
                        <span className="font-mono text-accent">{value}%</span>
                      </div>
                      <Slider
                        value={[value]}
                        max={100}
                        step={5}
                        onValueChange={([v]) => 
                          setCategoryForm({
                            ...categoryForm,
                            weights: { ...categoryForm.weights, [key]: v }
                          })
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleAddCategory} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Prediction */}
          <TabsContent value="predictions">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-accent" />
                  Manual Prediction Entry
                </CardTitle>
                <CardDescription>
                  Add a prediction for testing or manual tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Guru *</Label>
                    <Select 
                      value={predictionForm.guruId} 
                      onValueChange={(v) => setPredictionForm({ ...predictionForm, guruId: v })}
                    >
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Choose a guru" />
                      </SelectTrigger>
                      <SelectContent>
                        {gurus.map((guru) => (
                          <SelectItem key={guru.id} value={guru.id}>
                            {guru.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Confidence Level</Label>
                    <Select 
                      value={predictionForm.confidence} 
                      onValueChange={(v) => setPredictionForm({ ...predictionForm, confidence: v })}
                    >
                      <SelectTrigger className="bg-secondary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">🔥 High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">❄️ Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Prediction Statement *</Label>
                  <Input
                    placeholder="BTC will reach $100K by end of year"
                    value={predictionForm.title}
                    onChange={(e) => setPredictionForm({ ...predictionForm, title: e.target.value })}
                    className="bg-secondary"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Asset</Label>
                    <Input
                      placeholder="Bitcoin (BTC)"
                      value={predictionForm.asset}
                      onChange={(e) => setPredictionForm({ ...predictionForm, asset: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target</Label>
                    <Input
                      placeholder="$100,000"
                      value={predictionForm.target}
                      onChange={(e) => setPredictionForm({ ...predictionForm, target: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeframe End</Label>
                    <Input
                      type="date"
                      value={predictionForm.timeframeEnd}
                      onChange={(e) => setPredictionForm({ ...predictionForm, timeframeEnd: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reasoning</Label>
                  <Textarea
                    placeholder="Why did the guru make this prediction?"
                    value={predictionForm.reasoning}
                    onChange={(e) => setPredictionForm({ ...predictionForm, reasoning: e.target.value })}
                    className="bg-secondary min-h-[100px]"
                  />
                </div>

                <Button onClick={handleAddPrediction} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prediction
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
