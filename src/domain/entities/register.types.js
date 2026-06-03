/**
 * Domain specification for Provider Registration flow
 */

export const STEP_IDS = {
  ACCOUNT: 0,
  CONTACT: 1,
  SERVICES: 2,
  HOURS: 3,
  SUCCESS: 4
};

export const INITIAL_FORM_DATA = {
  fullName: '',
  businessName: '',
  category: '',
  email: '',
  password: '',
  confirmPassword: '',
  referral: '',
  phone: '',
  whatsapp: '',
  location: '',
  serviceArea: '',
  district: '',
  coverageAreas: [],
  instagram: '',
  facebook: '',
  serviceType: [],
  servicePrices: {},
  is_emergency: false,
  facilities: [],
  experienceYears: 0,
  techCount: 0,
  additionalInfo: '',
  workingHours: {
    'الأحد': { start: '08:00', end: '18:00', closed: false },
    'الإثنين': { start: '08:00', end: '18:00', closed: false },
    'الثلاثاء': { start: '08:00', end: '18:00', closed: false },
    'الأربعاء': { start: '08:00', end: '18:00', closed: false },
    'الخميس': { start: '08:00', end: '18:00', closed: false },
    'الجمعة': { start: '08:00', end: '18:00', closed: true },
    'السبت': { start: '08:00', end: '18:00', closed: false }
  },
  shopPhotos: []
};
