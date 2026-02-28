import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function HeadSec() {
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
            <div><Input id="input-button-group" placeholder="Type to search..." /></div>
            <div className="flex gap-2 justify-center items-center">
              <SelectDemo items={['Fairbanks','Bessemer','Barrington', 'Durant']} placeholder="Location" />
              <SelectDemo items={['UI/UX Designers','Project Management','IT Support & Help Desk', 'System Administration','']} placeholder="Category"/>
              <Button>Search</Button>
            </div>
              
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadSec;


function SelectDemo({items, placeholder}:{items:string[], placeholder:string}) {
  return (
    <Select>
      <SelectTrigger  className="w-full max-w-48">
        <SelectValue placeholder={placeholder} className="h-12" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Type</SelectLabel>
          {items.map((i, index) => (
            <SelectItem key={index} value="position">{i}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}