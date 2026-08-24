export const ROUTE_PATH = Object.freeze({
  LOGIN: "/auth/sign-in",
  FORGOT_PASSWORD: "/auth/forgot-password",
  REGISTER: {
    REGISTER_PATH: "/auth/sign-up",
    get VERIFY_EMAIL() {
      return `${this.REGISTER_PATH}/verify-email`;
    },
  },
  VERIFY_EMAIL: "/auth/verify-email",
  VERIFY_OTP: "/auth/verify-otp",
  LICENSING: "/auth/licensing",
  TECHNOLOGY: "/auth/technology",
  ONBOARDING_COMPLETION: "/auth/onboarding-completion",
  COMPLETE_PROFILE: "/auth/complete-profile",
  RESET_PROCESSING: "/auth/reset-processing",
  RESET_PASSWORD: "/auth/reset-password",
  QUEUES: {
    QUEUES_PATH: "/queues",
  },
  DASHBOARD: {
    DASHBOARD_PATH: "/dashboard",
    get APPOINTMENT_PATH() {
      return `${this.DASHBOARD_PATH}/appointments`;
    },
    get BILLING_PATH() {
      return `${this.DASHBOARD_PATH}/billing`;
    },
    get PATIENTS_PATH() {
      return `${this.DASHBOARD_PATH}/patients`;
    },
  },
  ACCOUNTS: {
    ACCOUNTS_PATH: "/accounts",
    get OVERVIEW_PATH() {
      return `${this.ACCOUNTS_PATH}/account/overview`;
    },
    get BILLINGS_PATH() {
      return `${this.ACCOUNTS_PATH}/account/billings`;
    },
    get TICKETS_PATH() {
      return `${this.ACCOUNTS_PATH}/account/tickets`;
    },
  },
  LABORATORY: {
    LAB_PATH: "/laboratory",
  },
  ADMISSIONS: {
    ADMISSIONS_PATH: "/Admission/queue",
  },
  ANALYTICS: {
    ANALYTICS_PATH: "/laboratory",
  },
  CHECKIN: {
    CHECKIN_PATH: "/check-in",
  },
  PRESCRIPTION: {
    PRESCRIPTION_PATH: "/pharmacy/prescription-records",
  },
  DOCTORS: "/doctors",
  NURSES: "/nurses",
  RECORDS: "/records",
  PHARMACY: {
    PHARMACY_ROUTH: "/pharmacy",
    NEW_PRESCRIPTION: "/pharmacy/new-prescription",
    INVENTORY: "/pharmacy/inventory/dashboard",
    ORDER_MANAGEMENT: "/pharmacy/order-management/low-stock",
    get BILLING_HISTORY() {
      return `${this.PHARMACY_ROUTH}/billing-history`;
    },
    get TICKETS() {
      return `${this.PHARMACY_ROUTH}/tickets`;
    },
    get CHECKIN_PATH() {
      return `${this.PHARMACY_ROUTH}/check-in`;
    },
  },
  POPULATION_HEALTH: {
    POPULATION_HEALTH_ROUTH: "/population-health",
    get BILLING_HISTORY() {
      return `${this.POPULATION_HEALTH_ROUTH}/billing-history`;
    },
    get TICKETS() {
      return `${this.POPULATION_HEALTH_ROUTH}/tickets`;
    },
  },
  ACADEMIA: {
    ACADEMIA_ROUTH: "/academia",
    get BILLING_HISTORY() {
      return `${this.ACADEMIA_ROUTH}/billing-history`;
    },
    get TICKETS() {
      return `${this.ACADEMIA_ROUTH}/tickets`;
    },
  },
  PATIENTS: {
    PATIENT_ROUTH: "/patients",
    ACCOUNT: {
      ACCOUNT_ROUTH: "/patients/account",
      get PATIENT_SUMMARY() {
        return `${this.ACCOUNT_ROUTH}/summary`;
      },
      get PATIENT_INFORMATION() {
        return `${this.ACCOUNT_ROUTH}/patient-information`;
      },
      get NEXT_OF_KIN() {
        return `${this.ACCOUNT_ROUTH}/next-of-kin`;
      },
      get EMERGENCT_CONTACT() {
        return `${this.ACCOUNT_ROUTH}/emergency-contact`;
      },
      get INSURANCE_INFORMATION() {
        return `${this.ACCOUNT_ROUTH}/insurance-information`;
      },
      get APPOINTMENT() {
        return `${this.ACCOUNT_ROUTH}/appointment`;
      },
      get BILLING() {
        return `${this.ACCOUNT_ROUTH}/billing`;
      },
    },
    MEDICAL_RECORD: {
      MEDICAL_RECORD_ROUTH: "/patients/medical-record",
      get CHIEF_COMPLAINT_AND_HPI() {
        return `${this.MEDICAL_RECORD_ROUTH}/chief-complaint-and-hpi`;
      },
      get MEDICAL_CONDITION() {
        return `${this.MEDICAL_RECORD_ROUTH}/medical-condition`;
      },
      get ALLERGIES() {
        return `${this.MEDICAL_RECORD_ROUTH}/allergies`;
      },
    },
  },
  INSURANCE: {
    INSURANCE_ROUTH: "/insurance",
    get BILLING_HISTORY() {
      return `${this.INSURANCE_ROUTH}/billing-history`;
    },
    get TICKETS() {
      return `${this.INSURANCE_ROUTH}/tickets`;
    },
  },
  BILLINGS_AND_PAYMENTS: {
    BILLINGS_AND_PAYMENTS_ROUTH: "/billings-and-payments",
    get BILLING_HISTORY() {
      return `${this.BILLINGS_AND_PAYMENTS_ROUTH}/billing-history`;
    },
  },
  SETTINGS: {
    SETTINGS_ROUTH: "/settings",
    get GENERAL() {
      return `${this.SETTINGS_ROUTH}/general`;
    },
    get PROFESSION() {
      return `${this.SETTINGS_ROUTH}/profession`;
    },
    get NOTIFICATION() {
      return `${this.SETTINGS_ROUTH}/notification`;
    },
    get AVAILABILITY() {
      return `${this.SETTINGS_ROUTH}/availability`;
    },
    get USERS_AND_ACCESS() {
      return `${this.SETTINGS_ROUTH}/users-and-access`;
    },
    get AUDIT_LOGS() {
      return `${this.SETTINGS_ROUTH}/audit-logs`;
    },
    get CONFIGURATION() {
      return `${this.SETTINGS_ROUTH}/configuration`;
    },
  },
});

export enum StorageKeys {
  TOKEN = "token",
  USER = "user",
  CHECKIN = "checkin",
}
