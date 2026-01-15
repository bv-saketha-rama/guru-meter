import { useState, useMemo } from 'react';
import { Filter, Calendar } from 'lucide-react';
import { Header } from '@/components/Header';
import { PredictionCard } from '@/components/PredictionCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { predictions, gurus } from '@/lib/mockData';

const Predictions = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [guruFilter, setGuruFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const filteredPredictions = useMemo(() => {
    return predictions.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (guruFilter !== 'all' && p.guruId !== guruFilter) return false;
      if (confidenceFilter !== 'all' && p.confidence !== confidenceFilter) return false;
      return true;
    });
  }, [statusFilter, guruFilter, confidenceFilter]);

  const resetFilters = () => {
    setStatusFilter('all');
    setGuruFilter('all');
    setConfidenceFilter('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Prediction</span> History
          </h1>
          <p className="text-muted-foreground">
            Browse all predictions from tracked crypto influencers
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </div>

            <div className="flex flex-wrap gap-3 flex-1 md:justify-end">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-secondary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="correct">Correct</SelectItem>
                  <SelectItem value="incorrect">Incorrect</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={guruFilter} onValueChange={setGuruFilter}>
                <SelectTrigger className="w-[160px] bg-secondary">
                  <SelectValue placeholder="Guru" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gurus</SelectItem>
                  {gurus.map((guru) => (
                    <SelectItem key={guru.id} value={guru.id}>
                      {guru.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                <SelectTrigger className="w-[150px] bg-secondary">
                  <SelectValue placeholder="Confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Confidence</SelectItem>
                  <SelectItem value="high">High 🔥</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low ❄️</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
          <span>{filteredPredictions.length} predictions found</span>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Sorted by date</span>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPredictions.map((prediction, index) => (
            <div 
              key={prediction.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PredictionCard prediction={prediction} />
            </div>
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-medium mb-2">No predictions found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Predictions;
