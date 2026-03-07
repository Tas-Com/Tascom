export interface MockReport {
  id: string;
  reporterName: string;
  reportTitle: string;
  description: string;
  category: string;
  location: string;
  dateReported: string;
  status: "PENDING" | "RESOLVED";
  imageUrl: string;      
  profileImage?: string;  
}

export const mockReports: MockReport[] = [
  {
    id: "1839",
    reporterName: "Amir Radi",
    reportTitle: "Need Someone to Take Care of My Cat",
    description: "Inappropriate or offensive content",
    category: "Pet Care",
    location: "Downtown District",
    dateReported: "Oct 12, 2025",
    status: "PENDING",
    imageUrl: "/cat.jpg",
    profileImage: "/repouser1.jpg",
  },
  {
    id: "1722",
    reporterName: "Anas Mansour",
    reportTitle: "Gardening Help Needed for My Backyard",
    description: "Spam or misleading information",
    category: "Home Services",
    location: "West Side",
    dateReported: "May 21, 2025",
    status: "RESOLVED",
    imageUrl: "/repo.jpg",
    profileImage: "/repouser2.jpg",
  },
  {
    id: "1203",
    reporterName: "Rami Khader",
    reportTitle: "Need Help with Fixing My Front Door",
    description: "Harassment or bullying",
    category: "Errand",
    location: "City Center",
    dateReported: "April 09, 2025",
    status: "RESOLVED",
    imageUrl: "/repo2.jpg",
    profileImage: "/repouser3.jpg",
  },
];