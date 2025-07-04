
import React, { useState } from 'react';
import { FileText, Plus, Calendar, Users, BarChart3, Award, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface Exam {
  id: string;
  name: string;
  type: 'unit-test' | 'mid-term' | 'final' | 'quarterly' | 'annual';
  subject: string;
  class: string;
  date: string;
  startTime: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  examiner: string;
  venue: string;
  instructions: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  studentsEnrolled: number;
  studentsAppeared: number;
}

interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  status: 'pass' | 'fail' | 'absent';
}

interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

const ExamManagement = () => {
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const mockExams: Exam[] = [
    {
      id: '1',
      name: 'Mid-term Examination',
      type: 'mid-term',
      subject: 'Mathematics',
      class: '10-A',
      date: '2024-02-01',
      startTime: '09:00',
      duration: 180,
      totalMarks: 100,
      passingMarks: 35,
      examiner: 'Mrs. Priya Sharma',
      venue: 'Room 101',
      instructions: 'Bring calculator, drawing instruments. No mobile phones allowed.',
      status: 'scheduled',
      studentsEnrolled: 45,
      studentsAppeared: 0
    },
    {
      id: '2',
      name: 'Unit Test 1',
      type: 'unit-test',
      subject: 'Science',
      class: '9-B',
      date: '2024-01-20',
      startTime: '10:30',
      duration: 120,
      totalMarks: 50,
      passingMarks: 18,
      examiner: 'Dr. Rajesh Kumar',
      venue: 'Science Lab',
      instructions: 'Practical and theory combined examination.',
      status: 'completed',
      studentsEnrolled: 42,
      studentsAppeared: 40
    },
    {
      id: '3',
      name: 'Quarterly Assessment',
      type: 'quarterly',
      subject: 'English',
      class: '8-C',
      date: '2024-01-25',
      startTime: '14:00',
      duration: 150,
      totalMarks: 80,
      passingMarks: 28,
      examiner: 'Ms. Anjali Gupta',
      venue: 'Room 205',
      instructions: 'Essay writing and comprehension test.',
      status: 'ongoing',
      studentsEnrolled: 38,
      studentsAppeared: 35
    }
  ];

  const mockResults: ExamResult[] = [
    {
      id: '1',
      examId: '2',
      studentId: 'STU001',
      studentName: 'Arjun Sharma',
      rollNumber: '101',
      marksObtained: 42,
      totalMarks: 50,
      percentage: 84,
      grade: 'A',
      rank: 1,
      status: 'pass'
    },
    {
      id: '2',
      examId: '2',
      studentId: 'STU002',
      studentName: 'Priya Patel',
      rollNumber: '102',
      marksObtained: 38,
      totalMarks: 50,
      percentage: 76,
      grade: 'B+',
      rank: 2,
      status: 'pass'
    },
    {
      id: '3',
      examId: '2',
      studentId: 'STU003',
      studentName: 'Rohit Kumar',
      rollNumber: '103',
      marksObtained: 15,
      totalMarks: 50,
      percentage: 30,
      grade: 'F',
      status: 'fail'
    }
  ];

  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [results, setResults] = useState<ExamResult[]>(mockResults);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'absent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-600';
      case 'B+': case 'B': return 'text-blue-600';
      case 'C+': case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getExamTypeIcon = (type: string) => {
    switch (type) {
      case 'unit-test': return '📝';
      case 'mid-term': return '📋';
      case 'final': return '🎓';
      case 'quarterly': return '📊';
      case 'annual': return '🏆';
      default: return '📄';
    }
  };

  const completedExams = exams.filter(e => e.status === 'completed').length;
  const ongoingExams = exams.filter(e => e.status === 'ongoing').length;
  const scheduledExams = exams.filter(e => e.status === 'scheduled').length;
  const totalStudentsExamined = exams.reduce((sum, exam) => sum + exam.studentsAppeared, 0);

  const calculateGradeDistribution = (examId: string): GradeDistribution[] => {
    const examResults = results.filter(r => r.examId === examId);
    const gradeMap: { [key: string]: number } = {};
    
    examResults.forEach(result => {
      gradeMap[result.grade] = (gradeMap[result.grade] || 0) + 1;
    });

    return Object.entries(gradeMap).map(([grade, count]) => ({
      grade,
      count,
      percentage: Math.round((count / examResults.length) * 100)
    }));
  };

  const calculateExamStats = (examId: string) => {
    const examResults = results.filter(r => r.examId === examId);
    const passed = examResults.filter(r => r.status === 'pass').length;
    const failed = examResults.filter(r => r.status === 'fail').length;
    const absent = examResults.filter(r => r.status === 'absent').length;
    const averageMarks = examResults.length > 0 
      ? examResults.reduce((sum, r) => sum + r.marksObtained, 0) / examResults.length 
      : 0;
    const passPercentage = examResults.length > 0 ? (passed / examResults.length) * 100 : 0;

    return { passed, failed, absent, averageMarks, passPercentage };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600 mt-2">Schedule exams, manage results, and generate reports</p>
        </div>
        <Dialog open={isCreateExamOpen} onOpenChange={setIsCreateExamOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={20} className="mr-2" />
              Schedule Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="examName">Exam Name</Label>
                <Input id="examName" placeholder="Enter exam name" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="examType">Exam Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit-test">Unit Test</SelectItem>
                      <SelectItem value="mid-term">Mid-term</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="social-studies">Social Studies</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-A">8-A</SelectItem>
                      <SelectItem value="9-B">9-B</SelectItem>
                      <SelectItem value="10-A">10-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="Exam venue" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Exam Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input id="duration" type="number" placeholder="180" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input id="totalMarks" type="number" placeholder="100" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input id="passingMarks" type="number" placeholder="35" />
                </div>
              </div>

              <Button className="w-full">Schedule Exam</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ongoing</p>
                <p className="text-2xl font-bold text-gray-900">{ongoingExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students Examined</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudentsExamined}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{getExamTypeIcon(exam.type)}</span>
                        <h3 className="text-lg font-semibold">{exam.name}</h3>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-600">Subject & Class</p>
                          <p>{exam.subject} - {exam.class}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Date & Time</p>
                          <p>{new Date(exam.date).toLocaleDateString()} at {exam.startTime}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Duration</p>
                          <p>{exam.duration} minutes</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Venue</p>
                          <p>{exam.venue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="font-medium text-gray-600">Total Marks</p>
                      <p className="font-bold">{exam.totalMarks}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Passing Marks</p>
                      <p className="font-bold">{exam.passingMarks}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Enrolled</p>
                      <p className="font-bold">{exam.studentsEnrolled}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Appeared</p>
                      <p className="font-bold">{exam.studentsAppeared}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-600 mb-2">Examiner</p>
                    <p>{exam.examiner}</p>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-600 mb-2">Instructions</p>
                    <p className="text-sm text-gray-600">{exam.instructions}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    {exam.status === 'completed' && (
                      <Button size="sm">View Results</Button>
                    )}
                    {exam.status === 'scheduled' && (
                      <Button size="sm" variant="outline">Start Exam</Button>
                    )}
                    <Button size="sm" variant="outline">Print Hall Ticket</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="mb-4">
            <Select value={selectedExam || ''} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select exam to view results" />
              </SelectTrigger>
              <SelectContent>
                {exams.filter(e => e.status === 'completed').map(exam => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.name} - {exam.subject} ({exam.class})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExam && (
            <Card>
              <CardHeader>
                <CardTitle>Exam Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.filter(r => r.examId === selectedExam).map((result) => (
                    <div key={result.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{result.studentName}</h3>
                        <p className="text-sm text-gray-600">Roll No: {result.rollNumber}</p>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                          <p className="font-medium text-gray-600">Marks</p>
                          <p className="font-bold">{result.marksObtained}/{result.totalMarks}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Percentage</p>
                          <p className="font-bold">{result.percentage}%</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Grade</p>
                          <p className={`font-bold text-lg ${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Status</p>
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                      </div>

                      {result.rank && (
                        <div className="text-center ml-4">
                          <p className="font-medium text-gray-600">Rank</p>
                          <div className="flex items-center justify-center">
                            <Award className="h-5 w-5 text-yellow-500 mr-1" />
                            <span className="font-bold">{result.rank}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {selectedExam && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const stats = calculateExamStats(selectedExam);
                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
                            <p className="text-sm text-gray-600">Passed</p>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                            <p className="text-sm text-gray-600">Failed</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Pass Percentage</span>
                            <span className="font-bold">{stats.passPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={stats.passPercentage} className="h-2" />
                        </div>

                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{stats.averageMarks.toFixed(1)}</p>
                          <p className="text-sm text-gray-600">Average Marks</p>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculateGradeDistribution(selectedExam).map((grade) => (
                      <div key={grade.grade} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold text-lg ${getGradeColor(grade.grade)}`}>
                            {grade.grade}
                          </span>
                          <span className="text-gray-600">{grade.count} students</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={grade.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium">{grade.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Result Summary Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate comprehensive result summary with class-wise performance analysis.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Individual student performance across all exams with improvement tracking.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Detailed analysis of performance in each subject with grade distribution.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hall Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate and print hall tickets for upcoming examinations.
                </p>
                <Button className="w-full">Print Hall Tickets</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Answer Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate answer sheet templates for different exam types and subjects.
                </p>
                <Button className="w-full">Generate Templates</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate student progress cards with detailed marks and grades.
                </p>
                <Button className="w-full">Generate Cards</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamManagement;
