const mapping: Record<string, string> = {
  doctors: 'doctor',
  'marketing-managers': 'marketing_manager',
  patients: 'patient',
  pharmacists: 'pharmacist',
  'pharmacy-orders': 'pharmacy_order',
  prescriptions: 'prescription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
