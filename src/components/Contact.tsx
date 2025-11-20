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
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    try {
      await emailjs.send(
        "service_zqa78qe",
        "template_7f8fdfb",
        {
          from_name: values.name,
          reply_to: values.email,
          message: values.textarea,
        },
        "qBsJSIPKNV99jT93e"
      );

      toast("Email sent!", {
        style: {
          background: "black",
          color: "white",
          borderRadius: "10px",
          borderColor: "gray",
          boxShadow: "0 0 20px rgba(59,130,246,0.5)",
          fontSize: "15px",
          textAlign: "center",
        },
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
    } catch (err) {
      console.error("FAILED:", err);
      toast.error("Something went wrong, please try again!", {
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setLoading(false);
    }
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

      <p className="flex flex-row text-xl mt-1 text-gray-400">
        You can find me on
        <a
          href="https://www.linkedin.com/in/sathesh-previn-377838244/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            size={30}
            className="ml-2 hover:text-blue-700 transition-colors"
          />
        </a>
        <a
          href="https://www.instagram.com/prevsathesh/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            size={30}
            className="mx-1 hover:text-pink-500 transition-colors"
          />
        </a>
        <a
          href="https://www.facebook.com/sathesh.previn/?locale=ms_MY"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook
            size={30}
            className="mx-1 hover:text-blue-600 transition-colors"
          />
        </a>
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
              disabled={loading}
              type="submit"
              className="px-6 py-4 h-15 text-lg w-full"
            >
              {loading ? (
                <Loader2 className="h-12 w-5 animate-spin text-white" />
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
