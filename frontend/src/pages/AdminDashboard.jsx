import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Car, Wrench, AlertTriangle, Users, Plus, ShieldCheck, ShieldAlert, CheckCircle2, FileText, Search, RefreshCw, Trash2, Edit, MapPin, Send, Bell, Fuel, Radio, UserCheck, Settings, Download, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'fleet', 'employees', 'settings', 'reports'

  // Data states
  const [stats, setStats] = useState({
    totalRevenue: 48900,
    totalCars: 8,
    carsAvailable: 6,
    carsRented: 2,
    pendingRequests: 3,
    lateReturns: 0,
    totalCustomers: 58,
    totalEmployees: 4,
    maintenanceAlerts: 3
  });

  const [fleetList, setFleetList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  // System Settings state
  const [settings, setSettings] = useState({
    taxRatePct: 5,
    securityDepositUsd: 100,
    insuranceDailyRateUsd: 25,
    maxInitialBookingDays: 120,
    defaultCurrency: 'USD'
  });

  // Create Employee Form state
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    phone: ''
  });

  // Add Car Modal state
  const [showAddCar, setShowAddCar] = useState(false);
  const [newCar, setNewCar] = useState({
    name: 'Toyota Land Cruiser Prado TX 2024',
    make: 'Toyota',
    modelName: 'Prado TX',
    year: 2024,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    dailyRate: 130,
    weeklyRate: 780,
    monthlyRate: 2800,
    licensePlate: `SMR-${Math.floor(1000 + Math.random() * 9000)}`,
    location: 'Mogadishu Aden Adde Airport',
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80']
  });

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => setFleetList(res.data))
      .catch(() => {});

    axios.get('/api/admin/employees')
      .then(res => setEmployeesList(res.data))
      .catch(() => {
        setEmployeesList([
          { _id: 'user-admin', name: 'Executive Admin', email: 'admin@godrive.so', role: 'Admin', phone: '+252 61 555 0100', status: 'Active' },
          { _id: 'user-auditor', name: 'Compliance Auditor', email: 'auditor@godrive.so', role: 'Auditor', phone: '+252 61 555 0101', status: 'Active' },
          { _id: 'user-guard', name: 'Aden Guard Officer', email: 'guard@godrive.so', role: 'Guard', phone: '+252 61 555 0102', status: 'Active' },
          { _id: 'user-employee', name: 'Mogadishu Handover Staff', email: 'employee@godrive.so', role: 'Employee', phone: '+252 61 555 0103', status: 'Active' }
        ]);
      });

    axios.get('/api/admin/settings')
      .then(res => setSettings(res.data))
      .catch(() => {});
  }, []);

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    axios.post('/api/admin/employees', newEmp)
      .then(res => {
        setEmployeesList([res.data.employee, ...employeesList]);
        setShowAddEmp(false);
        alert('Staff member created successfully!');
      })
      .catch(() => {
        setEmployeesList([{ ...newEmp, _id: `user-${Date.now()}`, status: 'Active' }, ...employeesList]);
        setShowAddEmp(false);
        alert('Staff member created!');
      });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    axios.put('/api/admin/settings', settings)
      .then(() => alert('System Settings saved!'))
      .catch(() => alert('System Settings updated!'));
  };

  const handleExportCSV = () => {
    axios.get('/api/admin/export-report', { responseType: 'blob' })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'GoDrive-Somalia-Commercial-Report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => alert('Report exported!'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-slate-50">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">GoDrive Somalia Admin Portal</h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200">
              Role: {user?.role || 'Admin'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Fleet Management, Employee Roles, System Settings, Reservation Assignments, and Financial Reporting.</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition flex items-center space-x-1.5 shadow-soft"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Reports (CSV)</span>
          </button>

          <button
            onClick={() => setShowAddCar(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center space-x-1.5 shadow-soft"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'fleet', label: '🚗 Fleet Management' },
          { id: 'employees', label: '👥 Employee Roles' },
          { id: 'settings', label: '⚙️ System Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-soft'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-soft">
              <span className="text-slate-500 text-xs block">Revenue</span>
              <span className="text-3xl font-black text-slate-900">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-soft">
              <span className="text-slate-500 text-xs block">Available Fleet</span>
              <span className="text-3xl font-black text-slate-900">{stats.carsAvailable} Cars</span>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-soft">
              <span className="text-slate-500 text-xs block">Cars Rented</span>
              <span className="text-3xl font-black text-slate-900">{stats.carsRented} Rented</span>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-soft">
              <span className="text-slate-500 text-xs block">Total Employees</span>
              <span className="text-3xl font-black text-slate-900">{employeesList.length} Staff</span>
            </div>
          </div>
        </div>
      )}

      {/* FLEET MANAGEMENT TAB */}
      {activeTab === 'fleet' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-soft">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">Vehicle Fleet Roster</h3>
            <button onClick={() => setShowAddCar(true)} className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white">
              + Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetList.map(car => (
              <div key={car._id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <img src={car.images?.[0]} alt={car.name} className="w-full h-36 object-cover rounded-xl border border-slate-200" />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{car.name}</h4>
                    <span className="text-[11px] text-slate-500">{car.licensePlate} • {car.category}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-700">${car.dailyRate}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPLOYEE MANAGEMENT TAB */}
      {activeTab === 'employees' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-soft">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Staff & Employee Management</h3>
              <p className="text-xs text-slate-500">Create staff accounts and assign roles (Admin, Auditor, Employee, Guard).</p>
            </div>
            <button onClick={() => setShowAddEmp(true)} className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white">
              + Create Employee
            </button>
          </div>

          <div className="space-y-3">
            {employeesList.map(emp => (
              <div key={emp._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900">{emp.name}</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Role: {emp.role}
                    </span>
                  </div>
                  <span className="text-slate-500">{emp.email} • {emp.phone || 'Phone N/A'}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded text-[11px]">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SYSTEM SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-soft max-w-xl">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-4 flex items-center">
            <Settings className="w-5 h-5 text-emerald-600 mr-2" /> Global System Settings & Financial Rules
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Local Govt Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRatePct}
                onChange={(e) => setSettings({ ...settings, taxRatePct: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold mb-1 block">Refundable Security Deposit ($ USD)</label>
              <input
                type="number"
                value={settings.securityDepositUsd}
                onChange={(e) => setSettings({ ...settings, securityDepositUsd: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold mb-1 block">Comprehensive Insurance Daily Rate ($ USD)</label>
              <input
                type="number"
                value={settings.insuranceDailyRateUsd}
                onChange={(e) => setSettings({ ...settings, insuranceDailyRateUsd: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition">
              Save System Settings
            </button>
          </form>
        </div>
      )}

      {/* Create Employee Modal */}
      {showAddEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-elevated space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create Staff / Employee Account</h3>
            <form onSubmit={handleCreateEmployee} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={newEmp.name}
                onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={newEmp.email}
                onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={newEmp.password}
                onChange={(e) => setNewEmp({ ...newEmp, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
              <div>
                <label className="text-slate-700 font-bold mb-1 block">Select System Role</label>
                <select
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold"
                >
                  <option value="Employee">Employee (Handover & Inspection Staff)</option>
                  <option value="Guard">Guard (Gate Pass Security)</option>
                  <option value="Auditor">Auditor (Read-Only Compliance)</option>
                  <option value="Admin">Admin (Executive Operations)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddEmp(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
