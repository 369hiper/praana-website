import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { countries } from '../data/countries';

interface CountrySelectorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string; // Allow overriding or adding classes
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Update searchTerm when value prop changes externally (though in this use case, we control it)
    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                // Reset search term to selected value if closed without selection
                if (value) {
                    setSearchTerm(value);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, value]);

    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (country: string) => {
        onChange(country);
        setSearchTerm(country);
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
        // Optional: could allow free text, or clear selection if empty
        if (e.target.value === '') {
            onChange('');
        }
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={() => setIsOpen(true)}
                    className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-praana-primary focus:border-praana-primary text-slate-900 pr-10 ${className || ''}`}
                    placeholder="Select Country"
                />
                <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                        <ul className="py-1">
                            {filteredCountries.map((country) => (
                                <li
                                    key={country}
                                    onClick={() => handleSelect(country)}
                                    className={`px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-between ${country === value ? 'bg-slate-50 font-medium text-praana-primary' : ''
                                        }`}
                                >
                                    {country}
                                    {country === value && <Check className="w-4 h-4" />}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm text-slate-500 text-center">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CountrySelector;
