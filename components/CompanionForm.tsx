"use client"; // Required for client-side hooks like useForm

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {SelectTrigger, Select, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import {subjects} from "@/constants";
import {createCompanion} from "@/lib/actions/copanion.actions";
import {redirect} from "next/navigation";
const formSchema = z.object({
    name: z.string().min(1, { message: "Companion is required." }),
    subject: z.string().min(1, { message: "Subject is required." }),
    topic: z.string().min(1, { message: "Topic is required." }),
    voice: z.string().min(1, { message: "Voice is required." }),
    style: z.string().min(1, { message: "Style is required." }),
    duration: z.number().min(1, { message: "Duration is required." }),
});

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    });

    const onSubmit =async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);
        if (companion){
            redirect(`/companions/${companion.id}`);
        } else {
            console.error("Unable to create new companion");
            redirect("/");
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Companion Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the Companion Name" {...field} className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Name</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="subject"/>
                                            <SelectContent>
                                                {subjects.map((subject) => (
                                                    <SelectItem value={subject} key={subject} className="capitalize">
                                                        {subject}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What should this companion teach?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the topic you want to learn - ex: Derivatives in calculus, or the history of ancient Rome"
                                        className="input"
                                        rows={2} // Set rows to 2 for a two-line input box
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voice Type</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select a voice type"/>
                                            <SelectContent>
                                                <SelectItem value="male" className="capitalize">Male</SelectItem>
                                                <SelectItem value="female" className="capitalize">Female</SelectItem>
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Style</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select a style"/>
                                            <SelectContent>
                                                <SelectItem value="formal" className="capitalize">Formal</SelectItem>
                                                <SelectItem value="informal" className="capitalize">Informal</SelectItem>
                                                <SelectItem value="friendly" className="capitalize">Friendly</SelectItem>
                                                <SelectItem value="professional" className="capitalize">Professional</SelectItem>
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated session Duration (in minutes)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter the Duration"
                                        {...field}
                                        onChange={event => field.onChange(parseInt(event.target.value, 10))} // Ensure number type
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default CompanionForm;