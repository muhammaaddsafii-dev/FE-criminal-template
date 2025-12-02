import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TableIcon, Search, Filter } from 'lucide-react';

const CrimeTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const getStatusStyle = (status) => {
    return status === 'Selesai' 
      ? 'bg-emerald-100 text-emerald-700' 
      : 'bg-amber-100 text-amber-700';
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Pencurian':
        return 'bg-blue-100 text-blue-700';
      case 'Perampokan':
        return 'bg-red-100 text-red-700';
      case 'Penipuan':
        return 'bg-purple-100 text-purple-700';
      case 'Kekerasan':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredData = data.filter(item => {
    const matchSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.reportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = filterDistrict === 'all' || item.district === filterDistrict;
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchType = filterType === 'all' || item.type === filterType;
    
    return matchSearch && matchDistrict && matchStatus && matchType;
  });

  const districts = [...new Set(data.map(item => item.district))];
  const types = [...new Set(data.map(item => item.type))];

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <TableIcon className="w-5 h-5 text-slate-500" />
            Data Kriminalitas
          </CardTitle>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari lokasi atau no. laporan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[220px] h-9 text-sm"
              />
            </div>
            
            {/* Filter District */}
            <Select value={filterDistrict} onValueChange={setFilterDistrict}>
              <SelectTrigger className="w-[150px] h-9 text-sm">
                <SelectValue placeholder="Wilayah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Wilayah</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Filter Type */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[130px] h-9 text-sm">
                <SelectValue placeholder="Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Filter Status */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px] h-9 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Proses">Proses</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">No. Laporan</TableHead>
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Wilayah</TableHead>
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Jenis</TableHead>
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Lokasi</TableHead>
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Tanggal</TableHead>
                <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-mono text-sm text-slate-700">
                      {item.reportNumber}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {item.district}
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getTypeStyle(item.type)}`}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {item.location}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Tidak ada data yang ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-3 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Menampilkan {filteredData.length} dari {data.length} data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrimeTable;
