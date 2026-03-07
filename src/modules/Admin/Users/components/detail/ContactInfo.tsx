import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ContactInfoProps {
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
}

export function ContactInfo({ email, phone, location, joinedDate }: ContactInfoProps) {
  const info = [
    { label: 'Email Address', value: email, icon: Mail },
    { label: 'Phone', value: phone, icon: Phone },
    { label: 'Location', value: location, icon: MapPin },
    { label: 'Joined', value: joinedDate, icon: Calendar },
  ];

  return (
    <div className="grid grid-cols-2 gap-y-8 gap-x-12">
      {info.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="w-[48px] h-[48px] rounded-2xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shrink-0">
            <item.icon size={22} />
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-medium text-text-third">{item.label}</p>
            <p className="text-[16px] font-bold text-[#251455]">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
