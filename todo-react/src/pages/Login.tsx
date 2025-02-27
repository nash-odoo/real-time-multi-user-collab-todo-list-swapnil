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
import { login } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

const Login = () => {
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(6),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const { data, status, mutate } = useMutation(login, {
    onSuccess: () => {
      navigate("/dashboard")
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    mutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <Card color="white-cream" className="max-w-[30rem] w-full">
      <h1 className="text-center text-2xl font-semibold">Login</h1>
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

          <small className="text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="underline hover:text-blue-500">
              Signup here
            </Link>
          </small>

          <Button variant="green" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default Login
