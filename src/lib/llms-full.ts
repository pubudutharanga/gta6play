// src/lib/llms-full.ts — Full plain-text rendering of the page for AI crawlers.
// llms.txt points at the sections; llms-full.txt carries the whole page so a
// model can answer without fetching and parsing the HTML.

import { siteConfig, getDisclaimer } from "@/config/site";
import {
  quickAnswer,
  features,
  locations,
  screenshotsSection,
  howToPlay,
  controls,
  requirements,
  faq,
  finalCta,
  seoTitle,
  seoDescription,
} from "@/content/content";
import { screenshots } from "@/content/screenshots";

export function buildLlmsFullTxt(): string {
  const url = siteConfig.url;

  const quickFacts = quickAnswer.facts
    .map((fact) => `- ${fact.term}: ${fact.detail}`)
    .join("\n");

  const featureList = features.items
    .map((item) => `- ${item.title}: ${item.body}`)
    .join("\n");

  const locationList = locations.items
    .map((item) => `- ${item.name}: ${item.detail}`)
    .join("\n");

  const screenshotList = screenshots
    .map((shot) => `- ${shot.alt} — ${shot.caption}`)
    .join("\n");

  const stepList = howToPlay.steps
    .map((step, i) => `${i + 1}. ${step.title} — ${step.body}`)
    .join("\n");

  const controlList = controls.bindings
    .map(
      (binding) =>
        `- ${binding.action}: keyboard ${binding.keyboard}; gamepad ${binding.gamepad}`
    )
    .join("\n");

  const requirementList = [
    `${requirements.minimum.label}:`,
    ...requirements.minimum.specs.map(
      (spec) => `  - ${spec.term}: ${spec.detail}`
    ),
    `${requirements.recommended.label}:`,
    ...requirements.recommended.specs.map(
      (spec) => `  - ${spec.term}: ${spec.detail}`
    ),
  ].join("\n");

  const faqList = faq.items
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  return `# ${seoTitle}

${seoDescription}

Site: ${url}
Publisher: ${siteConfig.publisher}
Contact: ${siteConfig.contactEmail}
Last updated: ${siteConfig.lastUpdated}

## Quick facts
${quickFacts}

## ${quickAnswer.heading}
${quickAnswer.body}

## ${features.heading}
${featureList}

## ${locations.heading}
${locations.intro}
${locationList}

## ${screenshotsSection.heading}
${screenshotsSection.intro}
${screenshotList}

## ${howToPlay.heading}
${stepList}

## ${controls.heading}
${controls.caption}
${controlList}

## ${requirements.heading}
${requirementList}

## ${faq.heading}
${faqList}

## ${finalCta.heading}
${finalCta.body}

## Disclaimer
${getDisclaimer()}

## Privacy
${siteConfig.privacyNotice}
`;
}
