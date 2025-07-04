
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, GraduationCap, Phone, Mail, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Teacher {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  experience: number;
  qualification: string;
  department: string;
  joiningDate: string;
  status: 'active' | 'inactive';
  salary: number;
}

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'John Smith',
      employeeId: 'EMP001',
      email: 'john.smith@school.edu',
      phone: '+1234567890',
      subjects: ['Mathematics', 'Physics'],
      classes: ['Grade 10 - A', 'Grade 11 - B'],
      experience: 8,
      qualification: 'M.Sc Mathematics',
      department: 'Science',
      joiningDate: '2020-06-15',
      status: 'active',
      salary: 50000
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      employeeId: 'EMP002',
      email: 'sarah.johnson@school.edu',
      phone: '+1234567891',
      subjects: ['English', 'Literature'],
      classes: ['Grade 9 - A', 'Grade 10 - B'],
      experience: 12,
      qualification: 'M.A English',
      department: 'Languages',
      joiningDate: '2018-04-20',
      status: 'active',
      salary: 55000
    },
    {
      id: '3',
      name: 'Mike Davis',
      employeeId: 'EMP003',
      email: 'mike.davis@school.edu',
      phone: '+1234567892',
      subjects: ['Chemistry', 'Biology'],
      classes: ['Grade 11 - A', 'Grade 12 - A'],
      experience: 15,
      qualification: 'Ph.D Chemistry',
      department: 'Science',
      joiningDate: '2015-08-10',
      status: 'active',
      salary: 65000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    qualification: '',
    department: '',
    experience: 0
  });

  const departments = ['Science', 'Languages', 'Mathematics', 'Social Studies', 'Arts'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Literature', 'History', 'Geography'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.employeeId && newTeacher.email) {
      const teacherToAdd: Teacher = {
        id: Date.now().toString(),
        name: newTeacher.name,
        employeeId: newTeacher.employeeId,
        email: newTeacher.email,
        phone: newTeacher.phone || '',
        subjects: [],
        classes: [],
        experience: newTeacher.experience || 0,
        qualification: newTeacher.qualification || '',
        department: newTeacher.department || '',
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'active',
        salary: 40000
      };
      setTeachers([...teachers, teacherToAdd]);
      setNewTeacher({});
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-600 mt-2">Manage teaching staff and their assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus size={20} />
              <span>Add Teacher</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newTeacher.name || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Teacher name"
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={newTeacher.employeeId || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, employeeId: e.target.value })}
                  placeholder="Employee ID"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newTeacher.phone || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={newTeacher.qualification || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                  placeholder="Educational qualification"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={newTeacher.department || ''} onValueChange={(value) => setNewTeacher({ ...newTeacher, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={newTeacher.experience || ''}
                  onChange={(e) => setNewTeacher({ ...newTeacher, experience: parseInt(e.target.value) || 0 })}
                  placeholder="Years of experience"
                />
              </div>
            </div>
            <Button onClick={handleAddTeacher} className="w-full mt-4">Add Teacher</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-gray-600">{teacher.employeeId}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTeacher(teacher.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{teacher.department}</span>
                  <Badge className={getStatusColor(teacher.status)}>
                    {teacher.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone size={14} className="text-gray-400" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen size={14} className="text-gray-400" />
                    <span>{teacher.qualification}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{teacher.experience} years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Classes:</span>
                    <span className="font-medium">{teacher.classes.length}</span>
                  </div>
                </div>
                {teacher.subjects.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
