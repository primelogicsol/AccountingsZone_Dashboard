import { PartnerApplicationForm } from "@/components/form-submission"

export default function SubmitPartnerApplicationPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Submit Partner Application</h1>
      </div>
      <PartnerApplicationForm />
    </div>
  )
}
