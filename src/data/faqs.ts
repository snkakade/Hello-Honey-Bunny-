export interface FaqItem { category: string; question: string; answer: string; link?: { href: string; label: string } }

export const faqs: FaqItem[] = [
  { category: "Products and availability", question: "What products can currently be requested?", answer: "Fresh goat milk and goat milk paneer can currently be requested, subject to the available farm batch." },
  { category: "Products and availability", question: "How is availability confirmed?", answer: "Send a request on WhatsApp. We reply personally with the current batch availability and final pricing before any arrangement is confirmed." },
  { category: "Ordering and pricing", question: "Are pack sizes fixed?", answer: "No. The pack sizes shown on this website are indicative. Current options are confirmed with each batch." },
  { category: "Ordering and pricing", question: "How do I find the final price?", answer: "Final pricing is confirmed personally on WhatsApp because the website does not show live inventory or prices." },
  { category: "Storage", question: "How should the products be stored?", answer: "Keep them refrigerated, use clean utensils and follow the storage and use-by guidance supplied with your confirmed batch." },
  { category: "Dairy allergies and intolerances", question: "What should I know about allergies or intolerance?", answer: "Goat milk is still dairy and may contain lactose and milk proteins. Anyone with a diagnosed milk allergy, intolerance or medical dietary concern should seek advice from an appropriately qualified healthcare professional." },
  { category: "Pickup and delivery", question: "Do you offer pickup or delivery?", answer: "The available pickup or delivery arrangement is confirmed personally for each request. The website does not promise a particular option or coverage area." },
  { category: "Farm visits", question: "Can I visit the farm?", answer: "Farm visits require prior confirmation. Please contact us before making plans, as the farm does not publish public opening hours or private directions." },
  { category: "Business partnerships", question: "Can food businesses start a supply conversation?", answer: "Yes. Chefs, cafés, restaurants, retailers and other food businesses may discuss current or future requirements. An enquiry does not guarantee immediate supply.", link: { href: "/for-chefs-and-retailers", label: "Read about food business enquiries" } }
];

export const homeFaqs = faqs.filter((item) => [
  "What products can currently be requested?",
  "How is availability confirmed?",
  "Are pack sizes fixed?",
  "Do you offer pickup or delivery?",
  "Can I visit the farm?"
].includes(item.question));
