export const queryKeys = {
  general: {
    countries: ["countries"],
    states: (countryId: string) => ["states", countryId],
    hospitals: (query: string, countryId?: string) => [
      "hospitals",
      query,
      countryId,
    ],
    practiceTypes: ["practiceTypes"],
    speciality: ["speciality"],
    onboarding_status: ["onboardingStatus"],
    insurance: (query: string) => ["insurance", query],
    roles: (roleName: string) => ["roles", roleName],
  },
  doctors: {
    appointments: (
      pageNumber: string,
      pageSize: string,
      query: string,
      isUpcoming: string
    ) => ["doctorAppointments", pageNumber, pageSize, query, isUpcoming],
    profile: ["doctorsProfile"],
    availability: (query: string) => ["availability", query],
    patients: (
      pageNumber: string,
      pageSize: string,
      query: string,
      doctorId: string
    ) => ["doctorspatients", pageNumber, pageSize, query, doctorId],
  },
  configurations: {
    departments: ["departments"],
    wards: ["wards"],
    rooms: ["rooms"],
    beds: ["beds"],
  },
  pharmacy: {
    inventory: (page: string, perPage: string, query: string) => [
      "pharmacy-inventory",
      page,
      perPage,
      query,
    ],
    patientInventory: (page: string, perPage: string, query: string) => [
      "pharmacy-patient-inventory",
      page,
      perPage,
      query,
    ],
    lowStock: (page: string, perPage: string, query: string) => [
      "pharmacyLowStock",
      page,
      perPage,
      query,
    ],
    allCartRequest: (page: string, perPage: string, query: string) => [
      "pharmacyAllRequest",
      page,
      perPage,
      query,
    ],
    orderHistory: (page: string, perPage: string, query: string) => [
      "pharmacyOrderHistory",
      page,
      perPage,
      query,
    ],
    multipleOrders: ["pharmacy-multiple-orders"],
    prescriptions: {
    root: ["pharmacy-prescriptions"],

    list: (
      page: string,
      perPage: string,
      tab: string,
      query?: string,
      priority?: string,
      visitStatus?: string,
      eventType?: string,
      date?: string
    ) => [
      "pharmacy-prescriptions",
      "list",
      tab,
      page,
      perPage,
      query,
      priority,
      visitStatus,
      eventType,
      date,
    ],

    prescriptionById: (consultationId?: number, patientId?: string, tab?: string) => [
      "pharmacy-prescriptions",
      "by-id",
      consultationId,
      patientId,
      tab,
    ],

    patientLastRejected: (patientId?: string) => [
      "pharmacy-prescriptions",
      "patient",
      patientId,
      "last-rejected",
    ],
  },
  },
};
