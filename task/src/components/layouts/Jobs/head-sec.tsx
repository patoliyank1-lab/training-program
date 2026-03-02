'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCat } from "@/hooks/useCat";
import { Category, Location } from "@/Type";

function HeadSec() {

  const {location, categories} = useCat();
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '')
    setSelectedLocation(searchParams.get('location') ?? '')
    setSelectedCategory(searchParams.get('category') ?? '')
  }, [searchParams])

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (search.trim()) params.set('q', search.trim())
    if (selectedLocation) params.set('location', selectedLocation)
    if (selectedCategory) params.set('category', selectedCategory)
    const qs = params.toString()
    return qs ? `?${qs}` : ''
  }, [search, selectedLocation, selectedCategory])

  const onSearch = () => {
    router.push(`/jobs${queryString}`)
  }

  return (
    <div className="w-full bg-violet-50 py-15">
      <div className="flex md:flex-row mx-auto max-w-315 p-5 items-center justify-center">
        <div className="w-full flex flex-col gap-2.5">
          <div className="rounded-full mx-auto w-fit text-xs px-2 py-1 text-blue-800  bg-blue-300 shadow">
            <div>
              <div>BROWSE OPPORTUNITIES</div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 ">
            <h1 className="scroll-m-20 text-center text-5xl font-extrabold text-balance">
              Find a role that matches your ambition
            </h1>

             <p className="text-center">
            Explore opportunities that match your skills and passions, and land the job you&apos;ve always wanted with JobsPortal.
          </p>

          <div className="flex flex-col gap-2 md:flex-row justify-center mx-auto">
            <div>
              <Input
                id="input-button-group"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSearch()
                }}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <SelectDemo
                items={location}
                placeholder="Location"
                value={selectedLocation}
                onChange={setSelectedLocation}
              />
              <SelectDemo
                items={categories}
                placeholder="Category"
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
              <Button onClick={onSearch}>Search</Button>
            </div>
              
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadSec;


function SelectDemo({
  items,
  placeholder,
  value,
  onChange,
}: {
  items: Array<Location | Category>
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger  className="w-full max-w-48">
        <SelectValue placeholder={placeholder} className="h-12" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Type</SelectLabel>
          {items.map((i, index) => (
            <SelectItem key={index} value={i.name}>{i.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}