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
import { Users, Activity } from 'lucide-react';
import { Card, CardContent } from './components/ui/card';

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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* <StatCards stats={overallStats} /> */}
      </div>
      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Cards Row - Ganti grid-rows-2 dengan custom rows */}
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[20%_80%] gap-4 mb-6" style={{height: '600px'}}>
          
          {/* Card Info Tambahan - baris 1 (20%) */}
          <div className="lg:col-span-1 lg:row-span-1">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Jumlah Kriminalitas
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      78%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50">
                    <div className="text-green-600">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map - 3 kolom, 2 baris (span penuh) */}
          <div className="lg:col-span-3 lg:row-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Peta Kriminalitas</h2>
                  <p className="text-sm text-slate-500">Klik pada wilayah untuk melihat detail statistik</p>
                </div>
              </div>
              <div className="h-[calc(100%-60px)] rounded-xl overflow-hidden">
                <CrimeMap 
                  geoJsonData={geoJsonData} 
                  onRegionClick={handleRegionClick}
                  selectedRegion={selectedRegion}
                />
              </div>
            </div>
          </div>
          
          {/* Card Statistik Lain - baris 1 (20%) */}
          <div className="lg:col-span-1 lg:row-span-1">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Respons Cepat
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      15 Menit
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50">
                    <div className="text-blue-600">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspot Card - baris 2 (80%) */}
          <div className="lg:col-span-1 lg:row-span-1">
            <HotspotCard hotspots={overallStats.hotspots} />
          </div>

          {/* Top Crime Types - baris 2 (80%) */}
          <div className="lg:col-span-1 lg:row-span-1">
            <TopCrimeTypes crimeTypes={overallStats.topCrimeTypes} />
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
