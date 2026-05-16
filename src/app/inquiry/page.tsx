import InquiryForm from "@/components/forms/inquiry-form";

export default function InquiryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">
        Inquiry Details
      </h1>

      <p className="mt-4 text-neutral-600">
        Send your inquiry and our team will contact you.
      </p>

      <InquiryForm />
    </main>
  );
}