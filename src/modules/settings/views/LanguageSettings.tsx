import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "../hooks/useLanguage";

const languages = [
  { name: "Arabic", flagCode: "PS" },
  { name: "English", flagCode: "GB" },
  { name: "French", flagCode: "FR" },
  { name: "Spanish", flagCode: "ES" },
  { name: "Korean", flagCode: "KR" },
  { name: "German", flagCode: "DE" },
];

const LanguageSettings = () => {
 const { currentLanguage, updateLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase()),
  );
const handleSelect = (langName: string) => {
  updateLanguage(langName); 
  setIsOpen(false);
  setSearch("");
};


  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold text-text-primary">Language</h1>

      <div className="bg-bg-secondary border border-border-default rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">
          Preferred languages
        </h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 border border-border-default rounded-xl bg-bg-primary hover:border-brand-purple transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ReactCountryFlag
               countryCode={languages.find(l => l.name === currentLanguage)?.flagCode ?? "GB"}
                svg
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span className="text-sm font-medium text-text-primary">
                {currentLanguage}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border-default rounded-2xl shadow-lg z-50 overflow-hidden">
              <div className="p-3 border-b border-border-default">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full pl-9 pr-4 py-2 border border-border-default rounded-xl text-sm outline-none focus:border-brand-purple transition bg-bg-primary"
                  />
                </div>
              </div>

           
              <div className="max-h-70 overflow-y-auto py-2">
                {filtered.map((lang) => {
                  const selected = currentLanguage === lang.name;
                  return (
                    <div
                      key={lang.name}
                      onClick={() => handleSelect(lang.name)}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition
                        ${selected ? "bg-purple-50" : "hover:bg-bg-primary"}`}
                    >
                      <ReactCountryFlag
                        countryCode={lang.flagCode}
                        svg
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <span
                        className={`flex-1 text-sm ${selected ? "font-medium text-brand-purple" : "text-text-primary"}`}
                      >
                        {lang.name}
                      </span>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {filtered.length === 0 && (
                  <p className="text-center text-sm text-text-secondary py-4">
                    No results found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LanguageSettings;
