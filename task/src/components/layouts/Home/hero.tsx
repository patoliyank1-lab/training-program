'use client'
import Image from "next/image";
import imageUrl from "@/assets/hero-image.png";
import { useMemo, useState } from "react";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Category, Location } from "@/Type";


export default function Hero({location, categories}:{location:Location[], categories:Category[]}) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

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
    <div className="">
      <div className="flex flex-col gap-10 md:flex-row mx-auto max-w-315 p-5 items-center min-h-[70vh]">
        <div className="flex flex-col gap-5 flex-1">
          <Item variant='outline' size="sm" asChild className="rounded-full bg-green-200 dark:bg-green-700 w-fit mx-auto shadow">
            <Link href="/jobs">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Ready to Find Your Dream Job?</ItemTitle>
              </ItemContent>
            </Link>
          </Item>

          <h1 className="scroll-m-20 text-center text-5xl font-extrabold text-balance">
            Take the next step in your career journey.
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

          <TotalJobsCard />

        </div>
        <div className="flex-1">
          <Image src={imageUrl} alt="hero-image" />
        </div>
      </div>
    </div>
  );
}





function SelectDemo({
  items,
  placeholder,
  value,
  onChange,
}: {
  items: Array<{ name: string }>
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


function TotalJobsCard() {
  return (
    <Card className="relative m-5 w-70 flex-row">
        <CardTitle className="absolute top-2 left-5 text-sm font-medium">Total Jobs</CardTitle>
      <CardContent>
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-xs text-muted-foreground">
          +10% from last month
        </p>
      </CardContent>
    </Card>
  )
}