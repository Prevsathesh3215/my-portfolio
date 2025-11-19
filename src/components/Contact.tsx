import EncryptText from "./EncryptText";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";


export default function ContactPage() {
  const inputConfig = [
    {
      type: "text",
      label: "Name",
      id: "name",
      placeholder: "Your Name",
    },
    {
      type: "email",
      label: "Email",
      id: "email",
      placeholder: "Your Email",
    },
    {
      type: "textarea",
      label: "Message",
      id: "textarea",
      placeholder: "Enter Your Message here....",
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    console.log("Form Submitted");
    console.log(values);


      emailjs
    .send(
      "service_zqa78qe",
      "template_7f8fdfb",
      {
        from_name: values.name,
        reply_to: values.email,
        message: values.textarea,
      },
      "qBsJSIPKNV99jT93e"
    )
    .then(() => {
      console.log("Email sent!");
      alert("Message sent successfully!");
    })
    .catch((err) => {
      console.error("FAILED:", err);
      alert("Something went wrong. Try again!");
    });
  };

  return (
    <>
      <div className="flex justify-start">
        <EncryptText
          text="Contact Me"
          revealedClassName="text-3xl text-blue-500 font-retro"
          encryptedClassName="text-3xl text-blue-500 font-retro"
        />
      </div>

      <p className="text-xl mt-8 text-gray-400">
        You can find me on LinkedIn, Instagram and also Facebook
      </p>

      <Card className="bg-gray-900 text-white border-gray-700 my-10 mr-10 bg-gradient-to-r from-blue-900 to-red-400 before:content-[''] before:inset-0 before:bg-gradient-to-r before:from-sky-950 before:to-blue-900 before:blur-xl before:opacity-70 before:-z">
        <CardHeader>
          <CardTitle>Send me a Message!</CardTitle>
          <CardDescription>
            If you are interested in my services, looking to hire me, or just
            wanna hang out, hit me up!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {inputConfig.map((input, index) => (
              <div key={index} className="my-3">
                <Label htmlFor={input.id} className="text-lg">
                  {input.label}
                </Label>
                {input.type !== "textarea" && (
                  <Input
                    type={input.type}
                    id={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                    className="my-2 py-6 text-lg"
                  />
                )}

                {input.type === "textarea" && (
                  <Textarea
                    placeholder={input.placeholder}
                    id={input.id}
                    name={input.id}
                    className="my-2 py-3 text-2xl"
                  />
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="px-6 py-4 h-15 text-lg w-full"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
