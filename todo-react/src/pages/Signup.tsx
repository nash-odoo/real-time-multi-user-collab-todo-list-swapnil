import Card from "@/components/Card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

const Signup = () => {
  const formSchema = z
    .object({
      email: z.string().email({ message: "Invalid Email" }),
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      password: z.string().min(6),
      passwordConfirmation: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          message: "Passwords do not match",
          path: ["passwordConfirmation"],
          code: "custom",
        })
      }
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Card color="white-cream" className="max-w-[30rem] w-full">
      <h1 className="text-center text-2xl font-semibold">Signup</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email Address" />
                </FormControl>
                <FormDescription>Your Email Address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormDescription>Your First Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormDescription>Your Last Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormDescription>Your Password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password Confirmation"
                    type="password"
                  />
                </FormControl>
                <FormDescription>Confirm Your Password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <small className="text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-blue-500">
              Login here
            </Link>
          </small>

          <Button variant="green" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default Signup
