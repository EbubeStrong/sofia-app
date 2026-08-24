// pharmacy.mock.ts

import { PharmacyReviewAction } from "@/components/Pharmacy/PharmacyReviewAction";
import { MockAppointmentsByTabItem } from "@/components/Pharmacy/utils/types";
import { Allergy, ApiPaginatedResponse, MedicalLog, PatientTab, Prescription, Vaccination } from "@/interfaces/patients";
import {IInventoryItem, ILowStockItem, IOrderHistoryItem, INearExpiryItem, ICartItem } from "@/interfaces/pharmacy";

export const mockAppointmentsByTab: Record<
  string,
  MockAppointmentsByTabItem[]
> = {
  prescription: [
    {
      appointmentId: "RX-2020-004",
      patientName: "Eric Monono",
      gender: "Female",
      age: 29,
      drugs: "Penicillin, Sulfa",
      doctor: "Dr. Emily Brown",
      date: "Jan 15, 2024 at 11:20 AM",
      priority: "High",
      patientId: "patient-1",
      action: (
        <PharmacyReviewAction
          status="prescription"
          buttonText="Review"
          patientId="patient-1"
          patientConsultationId={2020004}
        />
      ),
    },
    {
      appointmentId: "RX-2020-005",
      patientName: "Jennifer Lee",
      gender: "Female",
      age: 34,
      drugs: "Ibuprofen, Amoxicillin",
      doctor: "Dr. Sarah Smith",
      date: "Jan 16, 2024 at 2:30 PM",
      priority: "High",
      patientId: "patient-2",
      action: (
        <PharmacyReviewAction
          status="prescription"
          buttonText="Review"
          patientId="patient-2"
          patientConsultationId={2020005}
        />
      ),
    },
    {
      appointmentId: "RX-2020-006",
      patientName: "Michael Chen",
      gender: "Male",
      age: 45,
      drugs: "Aspirin, Lisinopril",
      doctor: "Dr. John Doe",
      date: "Jan 17, 2024 at 9:00 AM",
      priority: "High",
      patientId: "patient-3",
      action: (
        <PharmacyReviewAction
          status="prescription"
          buttonText="Review"
          patientId="patient-3"
          patientConsultationId={2020006}
        />
      ),
    },
  ],

  reject: [
    {
      appointmentId: "RX-2020-008",
      patientName: "Daniel Okorie",
      gender: "Male",
      age: 41,
      drugs: "Atorvastatin",
      doctor: "Dr. Peter Adams",
      date: "Jan 18, 2024 at 1:10 PM",
      priority: "High",
      patientId: "patient-8",
      action: (
        <PharmacyReviewAction
          status="reject"
          buttonText="Edit"
          patientId="patient-8"
          patientConsultationId={2020008}
        />
      ),
    },
    {
      appointmentId: "RX-2020-009",
      patientName: "Grace Williams",
      gender: "Female",
      age: 36,
      drugs: "Metformin",
      doctor: "Dr. Jane Collins",
      date: "Jan 19, 2024 at 9:45 AM",
      priority: "Low",
      patientId: "patient-9",
      action: (
        <PharmacyReviewAction
          status="reject"
          buttonText="Edit"
          patientId="patient-9"
          patientConsultationId={2020009}
        />
      ),
    },
  ],
  // filled: [
  //   {
  //     appointmentId: "RX-2020-008",
  //     patientName: "Jonathan ibru",
  //     gender: "Male",
  //     age: 32,
  //     drugs: "Methilin",
  //     doctor: "Dr. Emeka Godwin",
  //     date: "Jan 3, 2024 at 11:00 AM",
  //     priority: "High",
  //     patientId: "patient-4",
  //     action: (
  //       <PharmacyReviewAction
  //         status="filled"
  //         buttonText="Fill"
  //         patientId="patient-4"
  //       />
  //     ),
  //     files: [{ name: "Refill_Order.pdf", size: "42KB", date: "Jan 16, 2024" }],
  //   },
  //   {
  //     appointmentId: "RX-2020-005",
  //     patientName: "Jennifer Lee",
  //     gender: "Female",
  //     age: 34,
  //     drugs: "Ibuprofen, Amoxicillin",
  //     doctor: "Dr. Sarah Smith",
  //     date: "Jan 16, 2024 at 2:30 PM",
  //     priority: "High",
  //     patientId: "patient-5",
  //     action: (
  //       <PharmacyReviewAction
  //         status="filled"
  //         buttonText="Fill"
  //         patientId="patient-5"
  //       />
  //     ),
  //     files: [{ name: "Refill_Order.pdf", size: "42KB", date: "Jan 16, 2024" }],
  //   },
  //   {
  //     appointmentId: "RX-2020-006",
  //     patientName: "Michael Chen",
  //     gender: "Male",
  //     age: 45,
  //     drugs: "Aspirin, Lisinopril",
  //     doctor: "Dr. John Doe",
  //     date: "Jan 17, 2024 at 9:00 AM",
  //     priority: "High",
  //     patientId: "patient-6",
  //     action: (
  //       <PharmacyReviewAction
  //         status="filled"
  //         buttonText="Fill"
  //         patientId="patient-6"
  //       />
  //     ),
  //     files: [{ name: "Refill_Order.pdf", size: "42KB", date: "Jan 16, 2024" }],
  //   },
  //   {
  //     appointmentId: "RX-2020-007",
  //     patientName: "Sophia Lee",
  //     gender: "Female",
  //     age: 38,
  //     drugs: "Metformin",
  //     doctor: "Dr. Emily Smith",
  //     date: "Jan 18, 2024 at 10:30 AM",
  //     priority: "High",
  //     patientId: "patient-7",
  //     action: (
  //       <PharmacyReviewAction
  //         status="filled"
  //         buttonText="Fill"
  //         patientId="patient-7"
  //       />
  //     ),
  //     files: [{ name: "Refill_Order.pdf", size: "42KB", date: "Jan 16, 2024" }],
  //   },
  // ],
  approved: [
    {
      appointmentId: "RX-2020-012",
      patientName: "Samuel Adeyemi",
      gender: "Male",
      age: 52,
      drugs: "Losartan",
      doctor: "Dr. Henry Wilson",
      date: "Jan 19, 2024 at 4:00 PM",
      priority: "High",
      patientId: "patient-12",
      action: (
        <PharmacyReviewAction
          status="approved"
          buttonText="Fill"
          patientId="patient-12"
          patientConsultationId={2020012}
        />
      ),
    },
    {
      appointmentId: "RX-2020-013",
      patientName: "Amina Bello",
      gender: "Female",
      age: 47,
      drugs: "Insulin",
      doctor: "Dr. Fatima Musa",
      date: "Jan 20, 2024 at 8:15 AM",
      priority: "High",
      patientId: "patient-13",
      action: (
        <PharmacyReviewAction
          status="approved"
          buttonText="Fill"
          patientId="patient-13"
          patientConsultationId={2020013}
        />
      ),
    },
  ],
  completed: [
    {
      appointmentId: "RX-2020-014",
      patientName: "Joseph Martins",
      gender: "Male",
      age: 60,
      drugs: "Warfarin",
      doctor: "Dr. Luke Johnson",
      date: "Jan 14, 2024 at 12:00 PM",
      priority: "Low",
      patientId: "patient-14",
      action: (
        <PharmacyReviewAction
          status="completed"
          buttonText="Archive"
          patientId="patient-14"
          patientConsultationId={2020014}
        />
      ),
    },
  ],
  archived: [],
};

export const dummyInventoryData: IInventoryItem[] = [
  {
    drugId: "DRUG_001",
    drugName: "Paracetamol",
    drugForm: "Tablet",
    storageLocation: "Shelf A",
    drugPrice: 500,
    nafdacNumber: "NAFDAC-001",
    manufacturer: "Emzor",
    quantity: 120,
    expiryDate: "2026-01-15",
  },
  {
    drugId: "DRUG_002",
    drugName: "Amoxicillin",
    drugForm: "Capsule",
    storageLocation: "Shelf B",
    drugPrice: 1200,
    nafdacNumber: "NAFDAC-002",
    manufacturer: "GSK",
    quantity: 45,
    expiryDate: "2025-09-10",
  },
  {
    drugId: "DRUG_003",
    drugName: "Cough Syrup",
    drugForm: "Liquid",
    storageLocation: "Refrigerator",
    drugPrice: 1800,
    nafdacNumber: "NAFDAC-003",
    manufacturer: "May & Baker",
    quantity: 20,
    expiryDate: "2025-03-01",
  },
];

export const dummyLowStockInventoryData: ILowStockItem[] = [
  {
    drugId: "DRUG_001",
    drugName: "Paracetamol",
    strength: "50mg",
    unitType: "Tablet",
    manufacturer:"Emzor",
    drugCategory: "Antibiotics",
    drugQuantity: 9,
    reqQuantity: 0,
  },
  {
    drugId: "DRUG_002",
    drugName: "Amoxicillin",
    strength: "500mg",
    unitType: "Capsule",
    manufacturer:"Gsk",
    drugCategory: "antitoxidants",
    drugQuantity: 6,
    reqQuantity: 0,
  },
  {
    drugId: "DRUG_003",
    drugName: "Cough Syrup",
    strength: "200mg",
    unitType: "Liquid",
    manufacturer:"Pfizer",
    drugCategory: "Suppresants",
    drugQuantity: 8,
    reqQuantity: 0,
  },
];

export const dummyAllMedicineRequestData: ICartItem[] = [
  {
    cartId: "DRUGREQUEST_001",
    drugName: "Paracetamol",
    unitType: "Tablet",
    strength: "100MG",
    requiredQuantity: 60,
    manufacturer: "EMZOR",
    addedOn: "21st Feb 2024"
  },
  {
    cartId: "DRUGREQUEST_002",
    drugName: "Amoxicillin",
    unitType: "Capsule",
    strength: "500MG",
    requiredQuantity: 100,
    manufacturer: "GLAXOSMITHKLINE",
    addedOn: "15th Mar 2024"
  },
  {
    cartId: "DRUGREQUEST_003",
    drugName: "Ibuprofen",
    unitType: "Tablet",
    strength: "400MG",
    requiredQuantity: 150,
    manufacturer: "PFIZER",
    addedOn: "3rd Apr 2024"
  },
  {
    cartId: "DRUGREQUEST_004",
    drugName: "Metformin",
    unitType: "Tablet",
    strength: "850MG",
    requiredQuantity: 120,
    manufacturer: "NOVARTIS",
    addedOn: "12th Jan 2024"
  },
  {
    cartId: "DRUGREQUEST_005",
    drugName: "Lisinopril",
    unitType: "Tablet",
    strength: "10MG",
    requiredQuantity: 90,
    manufacturer: "ASTRAZENECA",
    addedOn: "28th Feb 2024"
  },
  {
    cartId: "DRUGREQUEST_006",
    drugName: "Atorvastatin",
    unitType: "Tablet",
    strength: "20MG",
    requiredQuantity: 80,
    manufacturer: "ROCHE",
    addedOn: "7th Mar 2024"
  },
  {
    cartId: "DRUGREQUEST_007",
    drugName: "Salbutamol",
    unitType: "Inhaler",
    strength: "100MCG",
    requiredQuantity: 50,
    manufacturer: "CIPLA",
    addedOn: "19th Apr 2024"
  },
  {
    cartId: "DRUGREQUEST_008",
    drugName: "Omeprazole",
    unitType: "Capsule",
    strength: "20MG",
    requiredQuantity: 70,
    manufacturer: "SANOFI",
    addedOn: "5th Mar 2024"
  },
  {
    cartId: "DRUGREQUEST_009",
    drugName: "Ciprofloxacin",
    unitType: "Tablet",
    strength: "500MG",
    requiredQuantity: 110,
    manufacturer: "BAYER",
    addedOn: "14th Feb 2024"
  },
  {
    cartId: "DRUGREQUEST_010",
    drugName: "Insulin Glargine",
    unitType: "Vial",
    strength: "100IU/ML",
    requiredQuantity: 40,
    manufacturer: "NOVO NORDISK",
    addedOn: "22nd Mar 2024"
  },
  {
    cartId: "DRUGREQUEST_011",
    drugName: "Diazepam",
    unitType: "Tablet",
    strength: "5MG",
    requiredQuantity: 60,
    manufacturer: "ABBOTT",
    addedOn: "9th Apr 2024"
  },
  {
    cartId: "DRUGREQUEST_012",
    drugName: "Cetirizine",
    unitType: "Tablet",
    strength: "10MG",
    requiredQuantity: 200,
    manufacturer: "JOHNSON & JOHNSON",
    addedOn: "30th Jan 2024"
  }
];

export const dummyOrderHistoryData: IOrderHistoryItem[] = [
  {
    requestId: "DRUGREQUEST_001",
    from: "orders@eldoradopharmacy.com",
    to: "kanedrugsdistributor@gmail.com",
    subject: "Emergency Restock – Blood Pressure Medications",
    orderDate: "2025-01-03",
    body: "Urgent request for Amlodipine and Losartan due to sudden stock depletion. Please confirm same-day or next-day delivery availability.",
  },
  {
    requestId: "DRUGREQUEST_002",
    from: "procurement@eldoradopharmacy.com",
    to: "vincevendors@gmail.com",
    subject: "Scheduled Monthly Antibiotic Supply",
    orderDate: "2025-01-08",
    body: "This is our planned monthly procurement for Amoxicillin, Ciprofloxacin, and Doxycycline. Kindly provide updated pricing and discounts.",
  },
  {
    requestId: "DRUGREQUEST_003",
    from: "eldoradopharmacy@eldorado.com",
    to: "kycmedicineenterprise@gmail.com",
    subject: "Pediatric Medication Supply Request",
    orderDate: "2025-01-12",
    body: "Requesting children-friendly syrups including Paracetamol, Ibuprofen, and multivitamins. Please confirm quantities and expiry dates.",
  },
  {
    requestId: "DRUGREQUEST_004",
    from: "inventory@eldoradopharmacy.com",
    to: "primepharmasuppliers@gmail.com",
    subject: "Diabetes Care Drug Availability Check",
    orderDate: "2025-01-15",
    body: "Inquiry on Metformin, Insulin pens, and test strips. Kindly include delivery timelines and minimum order quantities.",
  },
  {
    requestId: "DRUGREQUEST_005",
    from: "orders@eldoradopharmacy.com",
    to: "healthplusvendors@gmail.com",
    subject: "High-Demand Pain Relief Drug Refill",
    orderDate: "2025-01-18",
    body: "Due to increased walk-in demand, we require immediate restock of Ibuprofen, Diclofenac, and Tramadol tablets.",
  },
  {
    requestId: "DRUGREQUEST_006",
    from: "procurement@eldoradopharmacy.com",
    to: "medlinkdistributors@gmail.com",
    subject: "Anti-Malarial Drug Procurement",
    orderDate: "2025-01-21",
    body: "Requesting Artemether/Lumefantrine and Sulfadoxine-Pyrimethamine with batch numbers and valid expiry dates.",
  },
  {
    requestId: "DRUGREQUEST_007",
    from: "eldoradopharmacy@eldorado.com",
    to: "carefirstsupplies@gmail.com",
    subject: "Cold Season Medication Preparation",
    orderDate: "2025-01-25",
    body: "Preparing for increased cold cases. Request includes cough syrups, antihistamines, and immune-boosting supplements.",
  },
  {
    requestId: "DRUGREQUEST_008",
    from: "inventory@eldoradopharmacy.com",
    to: "royalpharmvendors@gmail.com",
    subject: "Skin Care and Dermatology Products",
    orderDate: "2025-01-28",
    body: "Please confirm availability of antifungal creams, hydrocortisone ointments, and medicated soaps with pricing.",
  },
  {
    requestId: "DRUGREQUEST_009",
    from: "bulkorders@eldoradopharmacy.com",
    to: "lifelinepharmdist@gmail.com",
    subject: "Bulk Vitamins and Supplements Order",
    orderDate: "2025-02-01",
    body: "Placing a bulk order for multivitamins, Vitamin D3, Calcium, and Omega-3 supplements. Kindly share wholesale rates.",
  },
  {
    requestId: "DRUGREQUEST_010",
    from: "orders@eldoradopharmacy.com",
    to: "trustmedsuppliers@gmail.com",
    subject: "Medical Consumables Restocking",
    orderDate: "2025-02-04",
    body: "Request for disposable syringes, latex gloves, surgical masks, and alcohol swabs. Urgent restock required.",
  },
  {
    requestId: "DRUGREQUEST_011",
    from: "procurement@eldoradopharmacy.com",
    to: "wellcarevendors@gmail.com",
    subject: "Gastrointestinal Medication Supply",
    orderDate: "2025-02-07",
    body: "We need Omeprazole, Antacid suspensions, and Loperamide tablets. Please provide quotations and delivery estimates.",
  },
  {
    requestId: "DRUGREQUEST_012",
    from: "eldoradopharmacy@eldorado.com",
    to: "unitypharmadistribution@gmail.com",
    subject: "Emergency First Aid Supplies Request",
    orderDate: "2025-02-10",
    body: "Requesting first aid essentials including antiseptics, cotton wool, bandages, and hydrogen peroxide for emergency use.",
  },
];



export const dummyInventoryNearExpiryData: INearExpiryItem[] = [
  {
    drugId: "346274662",
    drugName: "Metformin",
    capacity: "81mg",
    drugType: "Oral",
    amount: 4,
    dateOfExpiry: "21 Feb 2024",
  },
  {
    drugId: "346274663",
    drugName: "Lisnopril",
    capacity: "81mg",
    drugType: "Oral",
    amount: 5,
    dateOfExpiry: "21 Feb 2024",
  },
  {
    drugId: "346274664",
    drugName: "Astovastatin",
    capacity: "10mg",
    drugType: "Oral",
    amount: 8,
    dateOfExpiry: "21 Feb 2024",
  },
];


export const MOCK_DB: {
  prescription: Prescription[];
  allergies: Allergy[];
  vaccinations: Vaccination[];
  logs: MedicalLog[];
} = {
  prescription: [
    {
      id: 1,
      brandName: "Lisinopril",
      strength: "10mg",
      pack: "30",
      genericName: "Lisinopril",
      refillNumber: "3",
      form: "Tablet",
      total: "90",
      substitute: "No",
      status: "Rejected",
      directions: "Take one tablet daily in the morning",
      date: "March 15, 2025 at 8:45 AM",
    },
    {
      id: 2,
      brandName: "Metformin",
      strength: "500mg",
      pack: "60",
      genericName: "Metformin HCl",
      refillNumber: "5",
      form: "Tablet",
      total: "300",
      substitute: "Yes",
      status: "Rejected",
      directions: "Take one tablet twice daily with meals",
      date: "April 2, 2025 at 10:15 AM",
    },
    {
      id: 3,
      brandName: "Atorvastatin",
      strength: "20mg",
      pack: "30",
      genericName: "Atorvastatin Calcium",
      refillNumber: "2",
      form: "Tablet",
      total: "60",
      substitute: "No",
      status: "Completed",
      directions: "Take one tablet at bedtime",
      date: "February 28, 2025 at 3:20 PM",
    },
    {
      id: 4,
      brandName: "Ventolin",
      strength: "100mcg",
      pack: "1",
      genericName: "Albuterol",
      refillNumber: "1",
      form: "Inhaler",
      total: "200 doses",
      substitute: "No",
      status: "Completed",
      directions: "Use 2 puffs every 4-6 hours as needed for wheezing",
      date: "May 5, 2025 at 11:30 AM",
    },
    {
      id: 5,
      brandName: "Levothyroxine",
      strength: "75mcg",
      pack: "90",
      genericName: "Levothyroxine Sodium",
      refillNumber: "4",
      form: "Tablet",
      total: "360",
      substitute: "No",
      status: "Rejected",
      directions: "Take one tablet on empty stomach 30 minutes before breakfast",
      date: "April 18, 2025 at 9:00 AM",
    },
    {
      id: 6,
      brandName: "Amoxicillin",
      strength: "500mg",
      pack: "21",
      genericName: "Amoxicillin",
      refillNumber: "0",
      form: "Capsule",
      total: "21",
      substitute: "Yes",
      status: "Completed",
      directions: "Take one capsule three times daily for 7 days",
      date: "March 3, 2025 at 2:45 PM",
    },
    {
      id: 7,
      brandName: "Losartan",
      strength: "50mg",
      pack: "30",
      genericName: "Losartan Potassium",
      refillNumber: "6",
      form: "Tablet",
      total: "180",
      substitute: "Yes",
      status: "Rejected",
      directions: "Take one tablet daily",
      date: "May 12, 2025 at 10:00 AM",
    },
    {
      id: 8,
      brandName: "Omeprazole",
      strength: "20mg",
      pack: "30",
      genericName: "Omeprazole",
      refillNumber: "2",
      form: "Capsule",
      total: "60",
      substitute: "Yes",
      status: "Stand by",
      directions: "Take one capsule daily before breakfast",
      date: "May 8, 2025 at 4:15 PM",
    },
    {
      id: 9,
      brandName: "Sertraline",
      strength: "50mg",
      pack: "30",
      genericName: "Sertraline HCl",
      refillNumber: "3",
      form: "Tablet",
      total: "90",
      substitute: "No",
      status: "Stand by",
      directions: "Take one tablet daily in the morning",
      date: "April 25, 2025 at 1:30 PM",
    },
    {
      id: 10,
      brandName: "Hydrochlorothiazide",
      strength: "25mg",
      pack: "30",
      genericName: "Hydrochlorothiazide",
      refillNumber: "4",
      form: "Tablet",
      total: "120",
      substitute: "Yes",
      status: "Rejected",
      directions: "Take one tablet daily in the morning",
      date: "May 10, 2025 at 11:45 AM",
    },
    {
      id: 11,
      brandName: "Fluticasone",
      strength: "50mcg",
      pack: "1",
      genericName: "Fluticasone Propionate",
      refillNumber: "1",
      form: "Nasal Spray",
      total: "120 sprays",
      substitute: "No",
      status: "Rejected",
      directions: "Spray 2 times in each nostril once daily",
      date: "May 3, 2025 at 3:00 PM",
    },
    {
      id: 12,
      brandName: "Tramadol",
      strength: "50mg",
      pack: "20",
      genericName: "Tramadol HCl",
      refillNumber: "0",
      form: "Tablet",
      total: "20",
      substitute: "No",
      status: "Completed",
      directions: "Take one tablet every 6 hours as needed for pain",
      date: "April 10, 2025 at 9:15 AM",
    },
  ],

  allergies: [
    {
      id: 1,
      allergen: "Penicillin",
      reaction: "Hives and difficulty breathing",
      severity: "Severe",
      notedOn: "June 15, 2018",
      additionalNotes: "Anaphylactic reaction requiring epinephrine. Patient carries EpiPen.",
      addedBy: "Dr. Susan Johnson",
      agent: "Food",
    },
    {
      id: 2,
      allergen: "Sulfa drugs",
      reaction: "Skin rash and itching",
      severity: "Moderate",
      notedOn: "March 22, 2020",
      additionalNotes: "Developed Stevens-Johnson syndrome from Bactrim in 2020.",
      addedBy: "Dr. Michael Chen",
      agent: "Medications",
    },
    {
      id: 3,
      allergen: "Peanuts",
      reaction: "Anaphylaxis, throat swelling",
      severity: "Severe",
      notedOn: "August 5, 2015",
      additionalNotes: "First reaction at age 12. Must avoid all tree nuts as precaution.",
      addedBy: "Dr. Robert Wilson",
      agent: "Insect Venom",
    },
    {
      id: 4,
      allergen: "Iodine contrast",
      reaction: "Nausea and vomiting",
      severity: "Mild",
      notedOn: "November 10, 2022",
      additionalNotes: "Reaction during CT scan. Pre-medication required for future imaging.",
      addedBy: "Radiology Dept - Nurse Parker",
      agent: "Food",
    },
    {
      id: 5,
      allergen: "Latex",
      reaction: "Contact dermatitis",
      severity: "Moderate",
      notedOn: "February 14, 2021",
      additionalNotes: "Reaction to latex gloves during dental procedure. Use vinyl alternatives.",
      addedBy: "Dental Clinic - Dr. Miller",
      agent: "Medication",
    },
    {
      id: 6,
      allergen: "Shellfish",
      reaction: "Facial swelling and hives",
      severity: "Severe",
      notedOn: "July 30, 2019",
      additionalNotes: "Cross-reactivity possible with other seafood. Carry antihistamines.",
      addedBy: "Dr. Angela Martinez",
      agent: "Food",
    },
    {
      id: 7,
      allergen: "Aspirin",
      reaction: "Stomach pain and ulcers",
      severity: "Moderate",
      notedOn: "January 8, 2023",
      additionalNotes: "NSAID sensitivity. Avoid all NSAIDs including ibuprofen and naproxen.",
      addedBy: "Gastroenterology - Dr. Thompson",
      agent: "Insect Venom",
    },
    {
      id: 8,
      allergen: "Bee stings",
      reaction: "Anaphylactic shock",
      severity: "Severe",
      notedOn: "September 12, 2017",
      additionalNotes: "Completed venom immunotherapy 2018-2020. Still carries EpiPen.",
      addedBy: "Allergy Specialist - Dr. Kim",
      agent: "Medication",
    },
    {
      id: 9,
      allergen: "Eggs",
      reaction: "Hives and gastrointestinal distress",
      severity: "Moderate",
      notedOn: "April 3, 2024",
      additionalNotes: "Tolerates baked eggs but not raw or lightly cooked. Monitor for changes.",
      addedBy: "Pediatrician - Dr. Rodriguez",
      agent: "Medication",
    },
    {
      id: 10,
      allergen: "Cephalexin",
      reaction: "Diarrhea and abdominal pain",
      severity: "Mild",
      notedOn: "December 18, 2022",
      additionalNotes: "Cross-sensitivity with other cephalosporins. Use alternative antibiotics.",
      addedBy: "Dr. James Brown",
      agent: "Food",
    },
    {
      id: 11,
      allergen: "Cat dander",
      reaction: "Sneezing, watery eyes",
      severity: "Mild",
      notedOn: "October 5, 2020",
      additionalNotes: "Allergic rhinitis symptoms. Uses daily antihistamines during high exposure.",
      addedBy: "Dr. Patricia Lee",
      agent: "Medication",
    },
    {
      id: 12,
      allergen: "Codeine",
      reaction: "Severe itching and rash",
      severity: "Moderate",
      notedOn: "May 20, 2023",
      additionalNotes: "Opioid sensitivity. Consider alternative pain management options.",
      addedBy: "Pain Management - Dr. Anderson",
      agent: "Insect Venom",
    },
  ],


  vaccinations: [
  {
    id: 1,
    vaccineName: "COVID-19 (Pfizer)",
    dose: "Booster 3",
    administeredOn: "January 15, 2024",
    administeredBy: "Dr. Johnson",
    status: "Completed",
    severity: "Mild local reaction expected",
    unit: "0.5 mL",
    additionalNotes: "Patient reports migraine improvement post-vaccination. Monitor for 15 minutes post-injection. VIS provided and discussed",
    addedOn: "May 10, 2025 at 9:30 AM",
    scheduledOn: "March 15, 2024",
  },
  {
    id: 2,
    vaccineName: "Influenza",
    dose: "Annual 2024-2025",
    administeredOn: "October 10, 2024",
    administeredBy: "Nurse Williams",
    status: "Completed",
    severity: "Minimal reaction - mild soreness at injection site",
    unit: "0.5 mL",
    additionalNotes: "Quadrivalent vaccine. Patient experienced slight fatigue for 24 hours. Recommended for all patients >6 months. Egg allergy noted but safe for administration.",
    addedOn: "October 9, 2024 at 2:15 PM",
    scheduledOn: "September 20, 2024",
  },
  {
    id: 3,
    vaccineName: "Tetanus/Diphtheria/Pertussis",
    dose: "Tdap Booster",
    administeredOn: "March 5, 2023",
    administeredBy: "Dr. Martinez",
    status: "Completed",
    severity: "Moderate - arm soreness and mild fever common",
    unit: "0.5 mL",
    additionalNotes: "Given after minor injury with rusty metal. Provides protection for 10 years. Important for caregivers of newborns. Patient advised to rotate arm to reduce soreness.",
    addedOn: "March 4, 2023 at 11:00 AM",
    scheduledOn: "February 28, 2023",
  },
  {
    id: 4,
    vaccineName: "Shingles (Shingrix)",
    dose: "Dose 1 of 2",
    administeredOn: "February 20, 2025",
    administeredBy: "Dr. Chen",
    status: "Pending",
    severity: "High - significant reactions common with dose 2",
    unit: "0.5 mL",
    additionalNotes: "Patient experienced fatigue, muscle aches, and fever for 48 hours post-vaccination. Dose 2 scheduled 2-6 months after first dose. Recommended for adults 50+. Pre-medicated with acetaminophen.",
    addedOn: "February 18, 2025 at 3:45 PM",
    scheduledOn: "August 20, 2025",
  },
  {
    id: 5,
    vaccineName: "Pneumococcal (PCV20)",
    dose: "Single Dose",
    administeredOn: "November 8, 2024",
    administeredBy: "Nurse Rodriguez",
    status: "Completed",
    severity: "Low - well tolerated by most patients",
    unit: "0.5 mL",
    additionalNotes: "Covers 20 serotypes. Recommended for adults 65+ and those with certain medical conditions. Can be given same day as flu vaccine. No serious adverse events reported.",
    addedOn: "November 7, 2024 at 10:30 AM",
    scheduledOn: "November 1, 2024",
  },
  {
    id: 6,
    vaccineName: "Hepatitis B",
    dose: "Dose 3 of 3",
    administeredOn: "August 12, 2023",
    administeredBy: "Dr. Thompson",
    status: "Completed",
    severity: "Minimal - rare serious reactions",
    unit: "1.0 mL",
    additionalNotes: "Completed series (0, 1, 6 month schedule). Serology recommended 1-2 months after last dose to confirm immunity. Important for healthcare workers and travelers.",
    addedOn: "August 10, 2023 at 4:20 PM",
    scheduledOn: "August 5, 2023",
  },
  {
    id: 7,
    vaccineName: "MMR",
    dose: "Second Dose",
    administeredOn: "June 5, 2015",
    administeredBy: "Dr. Wilson",
    status: "Completed",
    severity: "Moderate - fever and rash possible 7-14 days post",
    unit: "0.5 mL",
    additionalNotes: "Live attenuated vaccine. Given as part of childhood immunization schedule. Contraindicated in pregnancy and severe immunodeficiency. Documentation of two doses required for school entry.",
    addedOn: "June 4, 2015 at 9:15 AM",
    scheduledOn: "June 1, 2015",
  },
  {
    id: 8,
    vaccineName: "Varicella",
    dose: "Single Dose",
    administeredOn: "July 18, 2016",
    administeredBy: "Dr. Davis",
    status: "Completed",
    severity: "Mild - varicella-like rash possible",
    unit: "0.5 mL",
    additionalNotes: "Live virus vaccine. Provides protection against chickenpox. Second dose may be recommended for increased protection. Avoid aspirin for 6 weeks post-vaccination.",
    addedOn: "July 15, 2016 at 2:30 PM",
    scheduledOn: "July 10, 2016",
  },
  {
    id: 9,
    vaccineName: "HPV (Gardasil 9)",
    dose: "Dose 2 of 3",
    administeredOn: "April 30, 2024",
    administeredBy: "Dr. Kim",
    status: "Pending",
    severity: "Low - syncope risk in adolescents",
    unit: "0.5 mL",
    additionalNotes: "Protects against 9 HPV types causing cancer and warts. Recommended for ages 9-45. Series completion important for maximum protection. Administered while seated to prevent fainting.",
    addedOn: "April 28, 2024 at 11:45 AM",
    scheduledOn: "October 30, 2024",
  },
  {
    id: 10,
    vaccineName: "Hepatitis A",
    dose: "Dose 2 of 2",
    administeredOn: "September 14, 2023",
    administeredBy: "Nurse Jackson",
    status: "Completed",
    severity: "Minimal - well tolerated",
    unit: "1.0 mL",
    additionalNotes: "Provides lifelong immunity after 2-dose series. Important for travelers to endemic areas, food handlers, and patients with liver disease. Can be given simultaneously with other vaccines.",
    addedOn: "September 12, 2023 at 3:00 PM",
    scheduledOn: "September 10, 2023",
  },
  {
    id: 11,
    vaccineName: "Meningococcal B",
    dose: "Single Dose",
    administeredOn: "December 3, 2022",
    administeredBy: "Dr. Brown",
    status: "Completed",
    severity: "Moderate - fever and injection site reactions common",
    unit: "0.5 mL",
    additionalNotes: "Recommended for adolescents and young adults, particularly college students living in dorms. May require multiple doses for full series. Patient experienced mild fever managed with antipyretics.",
    addedOn: "December 1, 2022 at 10:15 AM",
    scheduledOn: "November 28, 2022",
  },
  {
    id: 12,
    vaccineName: "RSV (Arexvy)",
    dose: "Single Dose",
    administeredOn: "October 25, 2024",
    administeredBy: "Dr. Garcia",
    status: "Completed",
    severity: "Low to moderate - similar to flu vaccine",
    unit: "0.5 mL",
    additionalNotes: "New vaccine for adults 60+. May reduce severity of RSV infection. Patient with COPD - high risk for severe RSV. Co-administered with flu vaccine in opposite arm. Monitor for rare neurological events.",
    addedOn: "October 23, 2024 at 1:30 PM",
    scheduledOn: "October 20, 2024",
  },
],

  logs: [
    {
      id: 1,
      action: "Prescription rejected - Hydrochlorothiazide",
      performedBy: "Pharmacist",
      createdAt: "May 10, 2025 10:12 AM",
    },
    {
      id: 2,
      action: "New prescription added - Lisinopril 10mg",
      performedBy: "Dr. Johnson",
      createdAt: "March 15, 2025 8:45 AM",
    },
    {
      id: 3,
      action: "Prescription refill requested - Metformin",
      performedBy: "Patient Portal",
      createdAt: "May 8, 2025 2:30 PM",
    },
    {
      id: 4,
      action: "Allergy updated - Added Penicillin allergy",
      performedBy: "Nurse Practitioner",
      createdAt: "June 15, 2018 11:20 AM",
    },
    {
      id: 5,
      action: "Vaccination administered - COVID-19 Booster",
      performedBy: "Dr. Johnson",
      createdAt: "January 15, 2024 9:15 AM",
    },
    {
      id: 6,
      action: "Patient profile updated - Contact information",
      performedBy: "Receptionist",
      createdAt: "April 22, 2025 3:45 PM",
    },
    {
      id: 7,
      action: "Prescription dosage adjusted - Atorvastatin increased to 20mg",
      performedBy: "Dr. Martinez",
      createdAt: "February 28, 2025 3:20 PM",
    },
    {
      id: 8,
      action: "Lab results reviewed - Lipid panel",
      performedBy: "Dr. Thompson",
      createdAt: "March 3, 2025 10:00 AM",
    },
    {
      id: 9,
      action: "Appointment scheduled - Annual physical",
      performedBy: "Patient Portal",
      createdAt: "May 5, 2025 1:15 PM",
    },
    {
      id: 10,
      action: "Insurance information updated",
      performedBy: "Billing Department",
      createdAt: "April 10, 2025 11:30 AM",
    },
    {
      id: 11,
      action: "Emergency contact added",
      performedBy: "Medical Assistant",
      createdAt: "January 8, 2025 9:45 AM",
    },
    {
      id: 12,
      action: "Medication discontinued - Amoxicillin",
      performedBy: "Dr. Chen",
      createdAt: "March 10, 2025 4:20 PM",
    },
  ],
};

const paginate = <T,>(
  items: T[],
  page: number,
  perPage: number
): ApiPaginatedResponse<T> => {
  const start = (page - 1) * perPage;
  const pagedData = items.slice(start, start + perPage);

  return {
    data: pagedData,
    page,
    perPage,
    totalCount: items.length,
    totalPages: Math.ceil(items.length / perPage),
  };
};





export const fetchPatientTabMock = async <T extends Prescription | Allergy | Vaccination | MedicalLog> (
  tab: PatientTab,
  page: number,
  perPage: number
): Promise<ApiPaginatedResponse<T>> => {
  await new Promise((r) => setTimeout(r, 400)); // simulate API delay

  const tabData = MOCK_DB[tab] as T[] ?? [];

  return paginate(tabData, page, perPage);
};


 