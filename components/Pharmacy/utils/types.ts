// export interface IPharmacyItem {
//   prescId: string;
//   patient: React.ReactNode;
//   drug: string;
//   doctor: string;
//   date: string;
//   priority: React.ReactNode;
//   patientId: string;
//   callId?: string;
// }

export interface MockAppointmentsByTabItem {
   appointmentId: string;
    patientName: string;
    gender: string;
    age: number;
    drugs: string;
    doctor: string;
    date: string;
    priority: "High" | "Medium" | "Low";
    action?: React.ReactNode;   
    patientId: string;
  diagnosis?: string;
  bed?: string;
  duration?: string;
  stay?: string;
    files?: { name: string; size: string; date: string }[];
    // optional detailed fields used by approved tab detail view
    // lotNumber?: string;
    // rxPrescriptionNumber?: string;
    allowSubstitute?: string;
    datePrescribedDetail?: string;
    dateDispensed?: string;
    quantity?: number;
    refill?: number;
    daysOfSupply?: number;
    directions?: string;
}


export const mockReviewPatients = [
  {
    patientId: "patient-1",
    name: "Eric Monono",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",

    vitals: {
      temperature: "93.5",
      temperatureSource: "Oral",
      bloodPressure: "123/79",
      pulse: "75",
      respiratoryRate: "Regular",
      bmi: "75",
      height: "75",
      weight: "57",
      collectedBy: "Nurse Johnson Rita",
    },

    nurseNote: "",
    reasonForVisit: "",
    files: [
      {
        name: "100-digital-product-ideas.pdf",
        size: "9.0MB",
      },
    ],
  },
  {
    patientId: "patient-2",
    name: "Jennifer Lee",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",

    vitals: {
      temperature: "93.5",
      temperatureSource: "Oral",
      bloodPressure: "123/79",
      pulse: "75",
      respiratoryRate: "Regular",
      bmi: "75",
      height: "75",
      weight: "57",
      collectedBy: "Nurse Johnson Rita",
    },

    nurseNote: "",
    reasonForVisit: "",
    files: [
      {
        name: "100-digital-product-ideas.pdf",
        size: "9.0MB",
      },
    ],
  },
  {
    patientId: "patient-3",
    name: "Michael Chen",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",

    vitals: {
      temperature: "93.5",
      temperatureSource: "Oral",
      bloodPressure: "123/79",
      pulse: "75",
      respiratoryRate: "Regular",
      bmi: "75",
      height: "75",
      weight: "57",
      collectedBy: "Nurse Johnson Rita",
    },

    nurseNote: "",
    reasonForVisit: "",
    files: [
      {
        name: "100-digital-product-ideas.pdf",
        size: "9.0MB",
      },
    ],
  },
];

export interface Prescription {
  prescriptionId: string;
  drug: string;
  form: string;
  dosage: string;
  quantity: number;
  refillNumber: string;
  allowSubstitute: boolean;
  directions: string;
}

export interface ReviewPatient {
  patientId: string;
  name: string;
  dob: string;
  phone: string;
  accountId: string;
  priority: "High" | "Medium" | "Low";
  forwardedTo: string;

  hospital: {
    name: string;
    address: string;
    phone: string;
  };

  prescriber: {
    name: string;
    phone: string;
    datePrescribed: string;
  };

  prescriptions: Prescription[];
}

export const mockPrescriptionPatients: ReviewPatient[] = [
  {
    patientId: "patient-1",
    name: "Eric Monono",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",
    hospital: {
      name: "St Mary’s Hospital",
      address: "12 John street Maryland Lagos",
      phone: "08083475321",
    },
    prescriber: {
      name: "David Udemezue",
      phone: "080837477828",
      datePrescribed: "12 FEB 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-2020-004",
        drug: "Ampiclox",
        form: "Dosage",
        dosage: "1 Tablet",
        quantity: 4,
        refillNumber: "4783473",
        allowSubstitute: true,
        directions: "Take one tablet by mouth (orally) 3 times a day",
      },
    ],
  },
  {
    patientId: "patient-2",
    name: "Jennifer Lee",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",
    hospital: {
      name: "Lagoon Hospital",
      address: "15 Bourdillon Road Ikoyi Lagos",
      phone: "08099887766",
    },
    prescriber: {
      name: "Dr Stephen James",
      phone: "08055667788",
      datePrescribed: "01 JAN 2025",
    },
    prescriptions: [
      {
        prescriptionId: "RX-2020-005",
        drug: "Paracetamol",
        form: "Tablet",
        dosage: "2 Tablets",
        quantity: 10,
        refillNumber: "2228899",
        allowSubstitute: false,
        directions: "Take two tablets after meals twice daily",
      },
      {
        prescriptionId: "RX-2020-015",
        drug: "Vitamin C",
        form: "Capsule",
        dosage: "1 Capsule",
        quantity: 30,
        refillNumber: "3344556",
        allowSubstitute: true,
        directions: "Take one capsule daily",
      },
    ],
  },
  {
    patientId: "patient-3",
    name: "Michael Chen",
    dob: "15/06/1985",
    phone: "080 (555) 123-4567",
    accountId: "3243564",
    priority: "High",
    forwardedTo: "Mike Tyson",
    hospital: {
      name: "General Hospital",
      address: "22 Broad Street Lagos",
      phone: "08022334455",
    },
    prescriber: {
      name: "Dr Linda Park",
      phone: "08066778899",
      datePrescribed: "20 MAR 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-2020-006",
        drug: "Ibuprofen",
        form: "Tablet",
        dosage: "1 Tablet",
        quantity: 20,
        refillNumber: "5566778",
        allowSubstitute: true,
        directions: "Take one tablet every 6 hours as needed for pain",
      },
    ],
  },
  {
    patientId: "patient-4",
    name: "Michael Chen",
    dob: "02/08/1990",
    phone: "08011223344",
    accountId: "3243565",
    priority: "High",
    forwardedTo: "Sarah Connor",
    hospital: {
      name: "Riverside Clinic",
      address: "45 Allen Avenue Ikeja Lagos",
      phone: "08099881234",
    },
    prescriber: {
      name: "Dr. John Doe",
      phone: "08066770011",
      datePrescribed: "Jan 17, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-556677-112233xx",
        drug: "Aspirin, Lisinopril",
        form: "Capsule",
        dosage: "500mg",
        quantity: 14,
        refillNumber: "8899001",
        allowSubstitute: true,
        directions: "Take one capsule every 8 hours for 7 days",
      },
    ],
  },
  {
    patientId: "patient-5",
    name: "Jennifer Lee",
    dob: "10/11/1991",
    phone: "08044556677",
    accountId: "3243566",
    priority: "High",
    forwardedTo: "Linda Smith",
    hospital: {
      name: "City Health Center",
      address: "78 Herbert Macaulay Way Lagos",
      phone: "08055661234",
    },
    prescriber: {
      name: "Dr. Sarah Smith",
      phone: "08099887755",
      datePrescribed: "Jan 16, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-334455-667788xx",
        drug: "Ibuprofen, Amoxicillin",
        form: "Tablet",
        dosage: "500mg",
        quantity: 30,
        refillNumber: "3344557",
        allowSubstitute: false,
        directions: "Take one tablet twice daily with meals",
      },
    ],
  },
  {  
    patientId: "patient-11",
    name: "Michael Chen",
    dob: "25/12/1980",
    phone: "08022334466",
    accountId: "3243567",
    priority: "High",
    forwardedTo: "Mark Brown",
    hospital: {
      name: "Sunrise Medical Center",
      address: "19 Opebi Road Ikeja Lagos",
      phone: "08066773344",
    },
    prescriber: {
      name: "Dr. John Doe",
      phone: "08055667700",
      datePrescribed: "Jan 17, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-667788-990011xx",
        drug: "Lisinopril",
        form: "Tablet",
        dosage: "10mg",
        quantity: 30,
        refillNumber: "6677881",
        allowSubstitute: true,
        directions: "Take one tablet daily in the morning",
      },
    ],
  },
  {
    patientId: "patient-12",
    name: "Sophia Lee",
    dob: "18/09/1987",
    phone: "08033445566",
    accountId: "3243568",
    priority: "High",
    forwardedTo: "Olivia Green",
    hospital: {
      name: "Hope Clinic",
      address: "33 Adeniran Ogunsanya Ikeja Lagos",
      phone: "08077889900",
    },
    prescriber: {
      name: "Dr. Emily Smith",
      phone: "08044556677",
      datePrescribed: "Jan 18, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-889900-223344xx",
        drug: "Metformin",
        form: "Tablet",
        dosage: "20mg",
        quantity: 30,
        refillNumber: "8899002",
        allowSubstitute: true,
        directions: "Take one tablet at bedtime",
      },
    ],
  },
  {  
    patientId: "patient-13",
    name: "Michael Chen",
    dob: "25/12/1980",
    phone: "08022334466",
    accountId: "3243567",
    priority: "High",
    forwardedTo: "Mark Brown",
    hospital: {
      name: "Sunrise Medical Center",
      address: "19 Opebi Road Ikeja Lagos",
      phone: "08066773344",
    },
    prescriber: {
      name: "Dr. John Doe",
      phone: "08055667700",
      datePrescribed: "Jan 17, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-667788-990011xx",
        drug: "Lisinopril",
        form: "Tablet",
        dosage: "10mg",
        quantity: 30,
        refillNumber: "6677881",
        allowSubstitute: true,
        directions: "Take one tablet daily in the morning",
      },
    ],
  },
  {
    patientId: "patient-14",
    name: "Jennifer Lee",
    dob: "10/11/1991",
    phone: "08044556677",
    accountId: "3243566",
    priority: "High",
    forwardedTo: "Linda Smith",
    hospital: {
      name: "City Health Center",
      address: "78 Herbert Macaulay Way Lagos",
      phone: "08055661234",
    },
    prescriber: {
      name: "Dr. Sarah Smith",
      phone: "08099887755",
      datePrescribed: "Jan 16, 2024",
    },
    prescriptions: [
      {
        prescriptionId: "RX-334455-667788xx",
        drug: "Ibuprofen, Amoxicillin",
        form: "Tablet",
        dosage: "500mg",
        quantity: 30,
        refillNumber: "3344557",
        allowSubstitute: false,
        directions: "Take one tablet twice daily with meals",
      },
    ],
  },
];

