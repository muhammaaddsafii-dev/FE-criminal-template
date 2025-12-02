import React, { useState } from 'react';
import StatCards from './components/StatCards';
import HotspotCard from './components/HotspotCard';
import RecentIncidents from './components/RecentIncidents';
import TopCrimeTypes from './components/TopCrimeTypes';
import CrimeMap from './components/CrimeMap';
import RegionModal from './components/RegionModal';
import CrimeTable from './components/CrimeTable';
import { geoJsonData, crimeStatsByDistrict, overallStats, crimeTableData } from './data/mockData';
import { MapPin, Shield } from 'lucide-react';
import './App.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">CrimeWatch Jakarta</h1>
                <p className="text-xs text-slate-500">Sistem Visualisasi Kriminalitas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="w-4 h-4" />
              <span>DKI Jakarta, Indonesia</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <StatCards stats={overallStats} />

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <HotspotCard hotspots={overallStats.hotspots} />
          <RecentIncidents incidents={overallStats.recentIncidents} />
          <TopCrimeTypes crimeTypes={overallStats.topCrimeTypes} />
        </div>

        {/* Map Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Peta Kriminalitas</h2>
                <p className="text-sm text-slate-500">Klik pada wilayah untuk melihat detail statistik</p>
              </div>
            </div>
            <div className="h-[450px] rounded-xl overflow-hidden">
              <CrimeMap 
                geoJsonData={geoJsonData} 
                onRegionClick={handleRegionClick}
                selectedRegion={selectedRegion}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <CrimeTable data={crimeTableData} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4" />
              <span>CrimeWatch Jakarta - Data Dummy untuk Demonstrasi</span>
            </div>
            <p className="text-sm text-slate-400">© 2025 Sistem Visualisasi Kriminalitas</p>
          </div>
        </div>
      </footer>

      {/* Region Detail Modal */}
      <RegionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regionData={selectedRegion}
        crimeStats={selectedRegion ? crimeStatsByDistrict[selectedRegion.properties.id] : null}
      />
    </div>
  );
}

export default App;
