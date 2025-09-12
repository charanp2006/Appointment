// Mock data for the Doctor Booking App

export const specialties = [
  { id: 1, name: 'Cardiology', icon: '❤️' },
  { id: 2, name: 'Dermatology', icon: '🧴' },
  { id: 3, name: 'Pediatrics', icon: '👶' },
  { id: 4, name: 'Orthopedics', icon: '🦴' },
  { id: 5, name: 'Neurology', icon: '🧠' },
  { id: 6, name: 'Ophthalmology', icon: '👁️' },
  { id: 7, name: 'Psychiatry', icon: '🧘' },
  { id: 8, name: 'General Medicine', icon: '⚕️' },
  { id: 9, name: 'Dentistry', icon: '🦷' },
  { id: 10, name: 'ENT', icon: '👂' },
  { id: 11, name: 'Gynecology', icon: '👩‍⚕️' },
  { id: 12, name: 'Urology', icon: '🫘' }
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    specialtyId: 1,
    rating: 4.8,
    reviewCount: 127,
    experience: 12,
    qualification: 'MD, FACC',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    hospital: 'City General Hospital',
    hospitalId: 1,
    address: '123 Medical Center Dr, Downtown',
    consultationFee: 150,
    latitude: 40.7128,
    longitude: -74.0060,
    availability: [
      { date: '2024-01-15', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { date: '2024-01-16', slots: ['09:30', '10:30', '11:30', '14:30', '15:30'] },
      { date: '2024-01-17', slots: ['09:00', '10:00', '16:00', '17:00'] }
    ],
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and minimally invasive procedures.',
    languages: ['English', 'Spanish'],
    services: ['Cardiac Consultation', 'ECG', 'Echocardiogram', 'Stress Testing']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    specialtyId: 2,
    rating: 4.9,
    reviewCount: 203,
    experience: 15,
    qualification: 'MD, FAAD',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    hospital: 'Metropolitan Medical Center',
    hospitalId: 2,
    address: '456 Health Plaza, Midtown',
    consultationFee: 120,
    latitude: 40.7589,
    longitude: -73.9851,
    availability: [
      { date: '2024-01-15', slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      { date: '2024-01-16', slots: ['08:30', '09:30', '10:30', '13:30', '14:30'] },
      { date: '2024-01-18', slots: ['08:00', '09:00', '15:00', '16:00'] }
    ],
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and aesthetic procedures.',
    languages: ['English', 'Mandarin'],
    services: ['Skin Consultation', 'Acne Treatment', 'Mole Removal', 'Botox', 'Chemical Peels']
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    specialtyId: 3,
    rating: 4.7,
    reviewCount: 89,
    experience: 8,
    qualification: 'MD, FAAP',
    image: 'https://images.unsplash.com/photo-1594824388066-d8e40c4ae2e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    hospital: 'Children\'s Healthcare Center',
    hospitalId: 3,
    address: '789 Kids Care Ave, Family District',
    consultationFee: 100,
    latitude: 40.6892,
    longitude: -74.0445,
    availability: [
      { date: '2024-01-15', slots: ['08:30', '09:30', '10:30', '11:30', '15:00'] },
      { date: '2024-01-17', slots: ['09:00', '10:00', '11:00', '16:00'] },
      { date: '2024-01-18', slots: ['08:30', '14:00', '15:00', '16:00'] }
    ],
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence.',
    languages: ['English', 'Spanish'],
    services: ['Well-child Visits', 'Vaccinations', 'Developmental Screenings', 'Sick Visits']
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    specialtyId: 4,
    rating: 4.6,
    reviewCount: 156,
    experience: 18,
    qualification: 'MD, FAAOS',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    hospital: 'Orthopedic Specialists Hospital',
    hospitalId: 4,
    address: '321 Bone & Joint Rd, Sports District',
    consultationFee: 180,
    latitude: 40.7831,
    longitude: -73.9712,
    availability: [
      { date: '2024-01-16', slots: ['07:30', '08:30', '13:00', '14:00', '15:00'] },
      { date: '2024-01-17', slots: ['08:00', '09:00', '10:00', '15:30'] },
      { date: '2024-01-19', slots: ['07:30', '13:00', '14:00', '16:00'] }
    ],
    about: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement surgeries.',
    languages: ['English'],
    services: ['Joint Consultation', 'Arthroscopy', 'Sports Injury Treatment', 'Joint Replacement']
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Neurology',
    specialtyId: 5,
    rating: 4.9,
    reviewCount: 94,
    experience: 14,
    qualification: 'MD, FAAN',
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    hospital: 'NeuroScience Institute',
    hospitalId: 5,
    address: '654 Brain Center Blvd, Research Park',
    consultationFee: 200,
    latitude: 40.7282,
    longitude: -73.9942,
    availability: [
      { date: '2024-01-15', slots: ['09:00', '11:00', '14:00', '16:00'] },
      { date: '2024-01-18', slots: ['10:00', '11:00', '15:00', '16:00'] },
      { date: '2024-01-19', slots: ['09:00', '10:00', '14:00'] }
    ],
    about: 'Dr. Lisa Thompson is a leading neurologist with expertise in treating complex neurological disorders and conducting cutting-edge research.',
    languages: ['English', 'French'],
    services: ['Neurological Consultation', 'EEG', 'EMG', 'Migraine Treatment', 'Seizure Management']
  }
];

export const hospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    type: 'General Hospital',
    rating: 4.5,
    reviewCount: 1250,
    address: '123 Medical Center Dr, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@citygeneral.com',
    website: 'www.citygeneral.com',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    latitude: 40.7128,
    longitude: -74.0060,
    beds: 350,
    established: 1985,
    departments: [
      'Cardiology', 'Emergency Medicine', 'Surgery', 'Internal Medicine', 
      'Radiology', 'Laboratory', 'Pharmacy', 'ICU'
    ],
    facilities: [
      '24/7 Emergency', 'ICU', 'Operating Theaters', 'MRI', 'CT Scan', 
      'X-Ray', 'Pharmacy', 'Laboratory', 'Parking'
    ],
    insurance: ['Blue Cross', 'Aetna', 'Cigna', 'Medicare', 'Medicaid'],
    doctorCount: 45,
    about: 'City General Hospital has been serving the community for over 35 years, providing comprehensive medical care with state-of-the-art facilities and experienced medical professionals.'
  },
  {
    id: 2,
    name: 'Metropolitan Medical Center',
    type: 'Medical Center',
    rating: 4.7,
    reviewCount: 890,
    address: '456 Health Plaza, Midtown',
    phone: '+1 (555) 987-6543',
    email: 'contact@metromedical.com',
    website: 'www.metromedical.com',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    latitude: 40.7589,
    longitude: -73.9851,
    beds: 280,
    established: 1992,
    departments: [
      'Dermatology', 'Ophthalmology', 'ENT', 'Psychiatry', 
      'Rehabilitation', 'Oncology', 'Neurology'
    ],
    facilities: [
      'Outpatient Clinics', 'Diagnostic Center', 'Rehabilitation Center', 
      'Oncology Unit', 'Mental Health Services', 'Cafeteria'
    ],
    insurance: ['UnitedHealth', 'Anthem', 'Blue Cross', 'Kaiser', 'Humana'],
    doctorCount: 38,
    about: 'Metropolitan Medical Center specializes in outpatient care and specialized medical services, offering cutting-edge treatments in a patient-centered environment.'
  },
  {
    id: 3,
    name: 'Children\'s Healthcare Center',
    type: 'Pediatric Hospital',
    rating: 4.8,
    reviewCount: 567,
    address: '789 Kids Care Ave, Family District',
    phone: '+1 (555) 456-7890',
    email: 'info@childrenshealthcare.com',
    website: 'www.childrenshealthcare.com',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    latitude: 40.6892,
    longitude: -74.0445,
    beds: 120,
    established: 1998,
    departments: [
      'Pediatrics', 'Neonatal ICU', 'Pediatric Surgery', 'Child Psychology', 
      'Pediatric Cardiology', 'Pediatric Oncology'
    ],
    facilities: [
      'NICU', 'Pediatric ICU', 'Play Areas', 'Family Rooms', 
      'Pediatric ER', 'Child Life Services'
    ],
    insurance: ['All major insurances accepted', 'CHIP', 'Medicaid'],
    doctorCount: 25,
    about: 'Children\'s Healthcare Center is dedicated exclusively to pediatric care, providing specialized medical services for infants, children, and adolescents in a child-friendly environment.'
  }
];

export const appointments = [
  {
    id: 1,
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'City General Hospital',
    date: '2024-01-15',
    time: '10:00',
    status: 'confirmed',
    type: 'consultation',
    reason: 'Regular checkup',
    patientName: 'John Doe'
  },
  {
    id: 2,
    doctorId: 3,
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Healthcare Center',
    date: '2024-01-18',
    time: '14:00',
    status: 'pending',
    type: 'consultation',
    reason: 'Child wellness visit',
    patientName: 'Jane Smith'
  }
];

export const reviews = [
  {
    id: 1,
    doctorId: 1,
    patientName: 'Anonymous Patient',
    rating: 5,
    comment: 'Dr. Johnson is excellent! Very thorough and explains everything clearly.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 2,
    doctorId: 2,
    patientName: 'Happy Patient',
    rating: 5,
    comment: 'Great dermatologist, very professional and knowledgeable.',
    date: '2024-01-08',
    verified: true
  },
  {
    id: 3,
    doctorId: 1,
    patientName: 'Satisfied Customer',
    rating: 4,
    comment: 'Good doctor, wait time was a bit long but worth it.',
    date: '2024-01-05',
    verified: false
  }
];
