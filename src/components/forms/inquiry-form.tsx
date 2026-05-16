"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useCart } from "@/context/cart-context";
import { createInquiry } from "@/actions/create-inquiry";

import {
  inquirySchema,
  type InquirySchema,
} from "@/lib/validations/inquiry";

export default function InquiryForm() {
  const { items } = useCart();

  const form = useForm<InquirySchema>({
    resolver: zodResolver(inquirySchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: InquirySchema) {
    const result = await createInquiry({
      customer: values,

      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    });

    console.log(result);

    if (result.success) {
      alert("Inquiry submitted!");

      form.reset();
    } else {
      alert(result.error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-12"
    >
      <FieldGroup className="space-y-6">
        {/* name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                Full Name
              </FieldLabel>

              <Input
                {...field}
                id="name"
                placeholder="John Doe"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email Address
              </FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                placeholder="john@example.com"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">
                Phone Number
              </FieldLabel>

              <Input
                {...field}
                id="phone"
                placeholder="+36 30 123 4567"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* message */}
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message">
                Additional Information
              </FieldLabel>

              <Textarea
                {...field}
                id="message"
                placeholder="Tell us more about your inquiry..."
                className="min-h-[140px]"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button type="submit" size="lg">
          Submit Inquiry
        </Button>
      </FieldGroup>
    </form>
  );
}