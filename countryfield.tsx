/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
;
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

type CountrySelectProps = {
    value: string;
    onChange: (value: string) => void;
};

// ------------------------------------
// COUNTRY SELECT (JUST UI)
// ------------------------------------
const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
    const [open, setOpen] = useState(false);
    const countries = countryList().getData();

    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open}>
                    {value ? (
                        <span className="flex items-center gap-2">
                            <span>{getFlagEmoji(value)}</span>
                            <span>{countries.find((c) => c.value === value)?.label}</span>
                        </span>
                    ) : (
                        'Select your country...'
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search countries..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandList className="max-h-60">
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.value}
                                    onSelect={() => {
                                        onChange(country.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === country.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    <span className="flex items-center gap-2">
                                        <span>{getFlagEmoji(country.value)}</span>
                                        <span>{country.label}</span>
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


type SelectFieldProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
};

export const CountrySelectField = ({
    name,
    label,
    control,
    error,
    required = false,
}: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />

            {error && <p className="text-sm text-red-500">{error.message}</p>}
            <p className="text-xs text-gray-500">
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};
