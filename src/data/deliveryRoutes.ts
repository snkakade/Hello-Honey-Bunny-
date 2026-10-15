export const deliveryRoutes = [
  {
    code: "R1",
    name: "West Pune & Hinjewadi",
    areas: ["Susgaon", "Mahalunge", "Hinjewadi", "Wakad", "Balewadi", "Baner"],
    days: "Monday & Thursday",
    window: "6:30-10:00 AM"
  },
  {
    code: "R2",
    name: "PCMC",
    areas: ["Aundh", "Pimple Nilakh", "Pimple Saudagar", "Rahatani", "Pimpri", "Chinchwad", "Akurdi", "Nigdi", "Ravet", "Punawale", "Tathawade", "Wakad"],
    days: "Tuesday & Friday",
    window: "6:30-11:30 AM"
  },
  {
    code: "R3",
    name: "West & Central Pune",
    areas: ["Bavdhan", "Kothrud", "Karve Nagar", "Erandwane", "Deccan", "Shivajinagar"],
    days: "Monday & Thursday",
    window: "11:00 AM-3:00 PM"
  },
  {
    code: "R4",
    name: "Central & East Pune",
    areas: ["Shivajinagar", "Sangamwadi", "Koregaon Park (KP)", "Kalyani Nagar", "Viman Nagar", "Wadgaon Sheri", "Kharadi"],
    days: "Tuesday & Friday",
    window: "11:00 AM-4:00 PM"
  },
  {
    code: "R5",
    name: "South Pune",
    areas: ["Warje", "Sinhagad Road", "Dhayari", "Ambegaon", "Katraj", "Bibwewadi", "Kondhwa", "NIBM", "Undri"],
    days: "Wednesday & Saturday",
    window: "11:00 AM-4:30 PM"
  },
  {
    code: "R6",
    name: "Hadapsar & Solapur Road",
    areas: ["Magarpatta", "Amanora", "Hadapsar", "Manjari", "Shewalewadi", "Loni Kalbhor", "Kunjirwadi", "Uruli Kanchan"],
    days: "Wednesday & Saturday",
    window: "6:30-11:30 AM"
  }
] as const;
