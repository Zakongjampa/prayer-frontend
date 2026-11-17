import { createElement } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Heart,
  LibraryBig,
  Share2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import CollectionActionLink from "../components/CollectionActionLink";
import CollectionHero from "../components/CollectionHero";
import CollectionSectionHeading from "../components/CollectionSectionHeading";
import "./Home.css";

const features = [
  {
    icon: BookOpen,
    title: "Read with focus",
    description:
      "Open a prayer in a calm reading space designed to keep the words at the center.",
  },
  {
    icon: Heart,
    title: "Keep favorites close",
    description:
      "Sign in to save the prayers you return to and find them again easily.",
  },
  {
    icon: Sparkles,
    title: "Help the collection grow",
    description:
      "Preserve and share meaningful prayer texts with the wider community.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-5 text-[#f4e9d2] sm:px-6 lg:px-8">
      <CollectionHero
        eyebrow="A digital prayer collection"
        tibetanLabel="ཞལ་འདོན་དཔེ་ཆ།"
        titleId="home-title"
        title="A quiet place for"
        titleEmphasis="prayer and reflection."
        description="Explore a growing collection of Tibetan prayers, read at your own pace, and keep the words you cherish close."
        artworkLabel="A prayer manuscript resting on warm parchment"
        artworkKicker="Daily reading"
        artworkTibetan="ཞལ་འདོན།"
        artworkFooter="Words to return to"
        floatingIcon={Heart}
        actions={[
          {
            label: "Join the collection",
            to: "/signup",
            icon: ArrowRight,
            iconSize: 18,
            variant: "primary",
          },
          {
            label: "Explore prayers",
            to: "/prayers",
            icon: ArrowRight,
            iconSize: 18,
            variant: "secondary",
          },
          {
            label: "Discover more",
            href: "#about",
            icon: ArrowDown,
            variant: "tertiary",
          },
        ]}
      >
          <p className="mt-6 text-sm text-[#766253]">
            Already a member?{" "}
            <Link
              className="font-bold text-[#813f32] !no-underline underline-offset-4 hover:underline"
              to="/login"
            >
              Sign in
            </Link>
          </p>
      </CollectionHero>

      <section
        className="py-14 sm:py-20"
        id="about"
        aria-labelledby="home-about-title"
      >
        <CollectionSectionHeading
          eyebrow="A little more than a library"
          title="Made for reading, remembering, and returning."
          description="A simple digital home for prayer texts—easy to explore, personal to use, and built to keep meaningful words within reach."
          id="home-about-title"
          className="max-w-2xl"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              className="rounded-2xl border border-[#eed8b32b] bg-[#eed8b30e] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#eed8b352] hover:bg-[#eed8b317] motion-reduce:transition-none motion-reduce:hover:transform-none sm:p-7"
              key={feature.title}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#e7c98f1f] text-[#e7c98f]">
                  {createElement(feature.icon, {
                    size: 20,
                    strokeWidth: 1.7,
                    "aria-hidden": true,
                  })}
                </span>
                <span className="text-sm text-[#f4e9d2a6]">0{index + 1}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm leading-6 text-[#f4e9d2a6]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-collections py-12 sm:py-16"
        aria-labelledby="home-collections-title"
      >
        <CollectionSectionHeading
          eyebrow="More ways to practice together"
          title="From the pages of a book to a shared Tsok."
          description="Gather prayers into collections for personal reading or group practice, and make it easier for everyone to follow along."
          id="home-collections-title"
          className="max-w-2xl"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#eed8b333] bg-[linear-gradient(145deg,rgba(238,216,179,0.09),rgba(238,216,179,0.035)),rgba(36,16,18,0.4)] p-6 sm:p-8">
            <span className="mb-5 flex size-12 items-center justify-center rounded-full border border-[#e7c98f3d] bg-[#e7c98f1a] text-[#e7c98f]">
              {createElement(LibraryBig, {
                size: 22,
                strokeWidth: 1.7,
                "aria-hidden": true,
              })}
            </span>
            <h3 className="mb-3 text-xl font-semibold">
              Books for deeper reading
            </h3>
            <p className="text-sm leading-6 text-[#f4e9d2b8]">
              Explore books that bring related prayers together in one place.
              Read page by page, and return to the teachings and texts that
              matter to you.
            </p>
          </article>

          <article className="rounded-2xl border border-[#eed8b333] bg-[linear-gradient(145deg,rgba(238,216,179,0.09),rgba(238,216,179,0.035)),rgba(36,16,18,0.4)] p-6 sm:p-8">
            <span className="mb-5 flex size-12 items-center justify-center rounded-full border border-[#e7c98f3d] bg-[#e7c98f1a] text-[#e7c98f]">
              {createElement(Share2, {
                size: 22,
                strokeWidth: 1.7,
                "aria-hidden": true,
              })}
            </span>
            <h3 className="mb-3 text-xl font-semibold">
              Share a Tsok prayer list
            </h3>
            <p className="text-sm leading-6 text-[#f4e9d2b8]">
              Create an ordered list of prayers for a group reading, then share
              its link with friends or family so everyone can open the same
              collection and follow along together.
            </p>
          </article>
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#e8d5b0] px-6 py-8 text-[#3b2a20] shadow-[0_18px_50px_rgba(8,3,4,0.18)] sm:flex-row sm:items-center sm:px-10 sm:py-9">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d4836]">
            Begin whenever you are ready
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Make a little space for the words that matter.
          </h2>
        </div>
        <CollectionActionLink
          to="/signup"
          icon={ArrowRight}
          iconSize={18}
          className="shrink-0"
        >
          Get started
        </CollectionActionLink>
      </section>

      <footer className="flex flex-col gap-2 py-7 text-xs text-[#f4e9d294] sm:flex-row sm:items-center sm:justify-between">
        <span lang="bo">ཞལ་འདོན་དཔེ་ཆ།</span>
        <span>A quiet home for prayer and reflection.</span>
      </footer>
    </main>
  );
}
