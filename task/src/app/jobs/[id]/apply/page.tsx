'use client'

import { useRouter, useParams } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useJob } from '@/hooks/useJobs'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  fullname: Yup.string()
    .required('Full name is required')
    .min(6, 'Full name must be at least 6 characters'),
  resume: Yup.mixed()
    .required('Resume is required'),
})

function JobApplyPage() {
  const router = useRouter()
  const { id } = useParams()

  const { isAuthenticated, user } = useAuth()
  const { jobs, jobApply } = useJob()

  const currentJob = jobs[Number(id) - 1]

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  if (!currentJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-700">Job not found.</p>
      </div>
    )
  }

  const formik = useFormik({
    initialValues: {
      fullname: user?.name ?? '',
      email: user?.email ?? '',
      resume: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (user) {
          await jobApply(user.id, currentJob.id.toString())
        }
        router.push('/jobs')
      } finally {
        setSubmitting(false)
      }
    },
  })

  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
          <CardContent className="p-6 space-y-2">
            <h1 className="text-xl font-bold text-gray-900">Apply for this job</h1>
            <p className="text-sm text-gray-600">
              You are applying for{' '}
              <span className="font-semibold text-gray-900">
                {currentJob.title}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-gray-900">
                {currentJob.company}
              </span>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
              <FieldGroup>
                <Field>
                  <Label htmlFor="fullname">Full name</Label>
                  <Input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <p className={errorClass}>{formik.errors.fullname}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className={errorClass}>{formik.errors.email}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] ?? null
                      formik.setFieldValue('resume', file)
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.resume && formik.errors.resume && (
                    <p className={errorClass}>{formik.errors.resume as string}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </Field>
              </FieldGroup>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Submitting...' : 'Submit application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobApplyPage

