
import React, { useState } from 'react';
import { DollarSign, CreditCard, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeeRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
}

const FeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feeRecords] = useState<FeeRecord[]>([
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      class: 'Grade 10 - A',
      feeType: 'Tuition Fee',
      amount: 5000,
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      status: 'paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      class: 'Grade 10 - A',
      feeType: 'Tuition Fee',
      amount: 5000,
      dueDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'Charlie Brown',
      studentId: 'STU003',
      class: 'Grade 9 - A',
      feeType: 'Tuition Fee',
      amount: 4500,
      dueDate: '2023-12-15',
      status: 'overdue'
    },
    {
      id: '4',
      studentName: 'Diana Prince',
      studentId: 'STU004',
      class: 'Grade 10 - B',
      feeType: 'Lab Fee',
      amount: 1000,
      dueDate: '2024-01-20',
      paidDate: '2024-01-18',
      status: 'paid',
      paymentMethod: 'Cash'
    }
  ]);

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStats = () => {
    const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
    const paidAmount = feeRecords
      .filter(record => record.status === 'paid')
      .reduce((sum, record) => sum + record.amount, 0);
    const pendingAmount = feeRecords
      .filter(record => record.status === 'pending')
      .reduce((sum, record) => sum + record.amount, 0);
    const overdueAmount = feeRecords
      .filter(record => record.status === 'overdue')
      .reduce((sum, record) => sum + record.amount, 0);

    return {
      total: totalAmount,
      paid: paidAmount,
      pending: pendingAmount,
      overdue: overdueAmount,
      collectionRate: totalAmount > 0 ? ((paidAmount / totalAmount) * 100).toFixed(1) : 0
    };
  };

  const stats = getStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'overdue': return <AlertCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
        <p className="text-gray-600 mt-2">Track and manage student fee payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold text-blue-600">₹{stats.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Collected</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="text-yellow-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">₹{stats.pending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">₹{stats.overdue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Fee Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search by student name, ID, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Fee Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredRecords.map(record => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <DollarSign size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-gray-500">{record.studentId} • {record.class}</p>
                        <p className="text-sm text-gray-500">{record.feeType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">₹{record.amount.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(record.status)}
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(record.dueDate).toLocaleDateString()}
                      </p>
                      {record.paidDate && (
                        <p className="text-xs text-green-600">
                          Paid: {new Date(record.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending & Overdue Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feeRecords.filter(r => r.status !== 'paid').map(record => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle size={20} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-gray-500">{record.class} • {record.feeType}</p>
                        <p className="text-sm text-red-600">Due: {new Date(record.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-lg">₹{record.amount.toLocaleString()}</p>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                      <Button size="sm">
                        <CreditCard size={16} className="mr-2" />
                        Collect Payment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Detailed fee collection reports and analytics will be available here.</p>
                <p className="text-sm text-gray-500 mt-2">Collection Rate: {stats.collectionRate}%</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeManagement;
