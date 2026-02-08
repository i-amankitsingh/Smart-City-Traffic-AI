// import './App.css'
import { Toaster } from 'sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import LiveFeed from './pages/LiveFeed'
import RecordedAnalysis from './pages/RecordedAnalysis'
import UploadVideo from './pages/UploadVideo'
import TrafficAnalytics from './pages/TrafficAnalytics'
import ModelInsights from './pages/ModelInsights'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/live-feed" element={<LiveFeed />} />
            <Route path="/recorded" element={<RecordedAnalysis />} />
            <Route path="/analytics" element={<TrafficAnalytics />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route path="/insights" element={<ModelInsights />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
