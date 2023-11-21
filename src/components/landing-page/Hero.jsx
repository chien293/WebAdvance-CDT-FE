import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/landing-page/primitives";
import { GithubIcon } from "@/components/landing-page/Icons";
export default function Hero({ children }) {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 my-32 md:my-36">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Educate effortlessly with &nbsp;</h1>
          <h1 className={title({ color: "green" })}>Google Classroom&nbsp;</h1>
          <br />
          <h4 className={subtitle({ class: "mt-4" })}>
            Simplifying education with expert support.
          </h4>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            href={siteConfig.links.docs}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideSymbol hideCopyButton variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </>
  );
}
