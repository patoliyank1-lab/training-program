'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth";
import { useJob } from "@/hooks/useJobs";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Jobs } from "@/Type";

function JobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { jobs } = useJob()


  const currentJob = jobs[Number(id) - 1]



  if (!currentJob) {
    return (
      <>
        JOb not found
      </>
    )
  }

  const onApply = () => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">{currentJob.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-gray-600 text-sm font-medium">{currentJob.company}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">

                  {currentJob.location}
                </div>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">

                    {currentJob.salary}
                  </span>
                </div>

                
              </div>
            </div>


            <div className="flex flex-wrap items-center justify-end gap-4">
             

              <div className="flex gap-3">
                {!isAuthenticated ? (
                  <div>
                    <Button variant={'outline'} onClick={onApply}>Login</Button>
                  </div>
                ) : (
                  <>

                    <ApplyForm job={currentJob} />

                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Job description</h2>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Responsibilities:</p>
              <ul className="space-y-1">
                {currentJob.description}
              </ul>
            </div>

            <div className="space-y-2 text-sm">
              {[
                { label: "Department", value: currentJob.title },
                { label: "Employment Type", value: currentJob.type },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-semibold text-gray-800 min-w-[130px]">{label}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>


            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Key Skills</p>
              <p className="text-xs text-gray-400 mb-3">
                Skills highlighted
              </p>
              <div className="flex flex-wrap gap-2">
                {currentJob.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600 bg-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-lg font-bold text-gray-900">About company</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Unitech Technocrats is a leading provider of industrial equipment solutions, specializing in machinery maintenance, customer service, and technical support across India. With a dedicated team of engineers, we ensure seamless operations for our clients across multiple sectors.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                {currentJob.location}
              </span>
              <span className="flex items-center gap-1.5">
                51-200 Employees
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobPage

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  fullname: Yup.string()
    .required("Full Name is required")
    .min(8, "Full Name must be at least 6 ")
});

function ApplyForm({job}:{job:Jobs}) {

  const {user} = useAuth(); 
  const {jobApply} = useJob()

  const onApply = () => {
    if(user && job){
      jobApply(user?.id, job.id.toString() )
    }
  };


  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const errorClass = "text-xs text-red-500 mt-1";
  return (
    <>
      <Dialog>
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTrigger asChild>
            <Button variant="outline">Apply</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="fullname">Full Name</Label>
                <Input 
                 id="fullname"
              type="fullname"
              name="fullname"
              placeholder="Enter Full Name"
              autoComplete="fullname"
              autoFocus
              required
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
               {formik.touched.fullname && formik.errors.fullname && <p className={errorClass}>{formik.errors.fullname}</p>}
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input 
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <p className={errorClass}>{formik.errors.email}</p>}
              </Field>
            </FieldGroup>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit"
              onClick={onApply}>Apply</Button>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}