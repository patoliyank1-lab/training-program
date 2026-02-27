import Image from "next/image";
import imageUrl from "@/assets/hero-image.png";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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


export default function Hero() {
  return (
    <div className="">
      <div className="flex flex-col gap-10 md:flex-row mx-auto max-w-315 h-50 p-5 items-center min-h-[70vh]">
        <div className="flex flex-col gap-5 flex-1">
          <Item variant='outline' size="sm" asChild className="rounded-full bg-green-200 dark:bg-green-700 w-fit mx-auto shadow">
            <Link href="/Jobs">
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

          <Field>
            <ButtonGroup>
              <Input id="input-button-group" placeholder="Type to search..." className="h-12" />
              <SelectDemo />
              <Button className="h-12">Search</Button>
            </ButtonGroup>
          </Field>

          <TotalJobsCard />

        </div>
        <div className="flex-1">
          <Image src={imageUrl} alt="hero-image" />
        </div>
      </div>
    </div>
  );
}




function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" className="h-12" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Type</SelectLabel>
          <SelectItem value="position">position</SelectItem>
          <SelectItem value="location">location</SelectItem>
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