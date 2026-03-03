interface AboutSkillsSectionProps {
  about: string;
  skills: string;
}

export function AboutSkillsSection({ about, skills }: AboutSkillsSectionProps) {
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row gap-12 w-full">
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-[24px] font-bold text-[#251455]">About Ali</h3>
        <p className="text-[14px] text-[#251455] opacity-70 leading-[1.6]">
          {about}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-[24px] font-bold text-[#251455]">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skillsList.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-[#F3F0FF] text-[#6B39F4] rounded-full text-[14px] font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
