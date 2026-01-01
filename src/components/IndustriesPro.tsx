import { siteConfig } from '@/data/siteConfig';
import { makeContactHref } from '@/lib/routes';
import { HoverEffect } from './ui/HoverEffect';
import { Eyebrow } from './ui/Eyebrow';

export function IndustriesPro() {
  const contactHref = makeContactHref(import.meta.env.BASE_URL);

  const items = siteConfig.industries.map((industry) => ({
    title: industry.title,
    description: industry.description,
    link: contactHref({ industry: industry.title }),
  }));

  return (
    <section className="section" id="industries">
      <div className="container-page">
        <div className="mb-10 text-center lg:mb-14">
          <Eyebrow>Industries</Eyebrow>
          <h2 className="heading-2 lg:text-4xl">Who we serve</h2>
          <p className="lede mx-auto mt-4 max-w-2xl lg:mt-5 lg:text-lg">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  );
}
