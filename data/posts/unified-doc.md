---
title: unified-doc
date: 2020-03-30
tags: [unified, doc, content, spec, knowledge, open-source]
---

From Spectrum: https://spectrum.chat/unified/general/sharing-my-unified-journey-in-building-unified-doc~77f7e2d8-6496-4764-b040-a4250199ce69

> **unified-doc**: a unified document renderer for content

- Github: https://github.com/chrisrzhou/unified-doc
- Interactive docs: https://unified-doc.netlify.com/

## Background

In my previous job at Roam, I worked on a variety of NLP tools that used novel JS implementations to render and support annotations for text/html documents. We created some really cool stuff, but a number of challenges came up:

- Custom implementations do not always maintain high fidelity with the source content.
- Customizing the rendered document is difficult, depending on how far it deviates from the source content. Canvas-based solutions are basically impossible to customize.
- Annotation algorithms are coupled with the rendering implementations developed, and are usually fairly complex.
- Annotation algorithms are not perfect and do not work when performing substring calculations on content that may cover incomplete DOM nodes, hence breaking the split HTML.
- For new content types, we find ourselves needing to implement a new custom parser/annotator/renderer.
- Writing a custom parser is hard...
- And so I started researching...

## unified to the Rescue!

I learned about `unified` a month ago and was really excited about the ecosystem's potential of solving the problems mentioned above. I do not have a CS background, so getting ramped up on the basic ideas of parsers, syntax trees (and trees in general) took some time. After browsing through tons of utilities and reading up about the basic principles in `unified`, I was confident that the `unified` approach will solve all the separate problems above in a single 'unified' way!

`unified` solves:

- Parsing, annotating, rendering are decoupled operations in the `unified` mental model.
- There is already established support for parsing `text`, `markdown`, `html` content types into a unified `hast` tree.
- We can now write the annotation algorithm as a `hast` utility (`hast-util-annotate`) so that the only transformation is done to the syntax tree.
- Some careful thought is made about the annotation algorithm, which leads to the following requirements:
    - It should be decoupled from the rendering process.
    - It should not affect the layout of the source document.
    - It should be a `pure additive` operation to the `hast` tree for annotated nodes.
    - It should be simple and declarative.
    - It should support common annotation interactions (click, hover).
- Based on the requirements, the `tldr;` for the algorithm is to apply annotations on only `text` nodes, and add semantic `<mark />` tags that can be customized through CSS/styles. Nothing else about the source document changes.
- Rendering the `hast` tree is easily accomplished with already available libraries such as `rehype-react`.
- Supporting new content types and compilers/renderers is easily done with plugins that are decoupled.

## unified-doc Philosophy

Knowledge is _unified abstractly_ across humanity. We all share common goals of acquiring, understanding, storing, and sharing knowledge. Content represents the physical manifestation of storing knowledge, and it is accomplished with many digital formats in the modern computing age.

Various softwares act on content types to parse, process, and render the underlying data for human consumption. Many solutions try to be interoperable, but are largely limited by the lack of a common interface across content types and programs. These solutions can be largely described as _API interactions between software, and not as interactions with the actual content_. The `unified` initiative addresses this problem by representing content in unified syntax tress where programs can work closely with the structured content data.

`unified-doc` is a document renderer, with associated utilities, that uses the `unified` ecosystem to support a unified way to render supported content types into HTML-based markup. It represents content as structured data, and preserves fidelity of the original source content in the rendered document, all at the same time supporting powerful features that enrich the document (e.g. annotations). Outputting HTML markup allows interoperable ways to view and enrich the document with standard web technologies.

## Closing Thoughts

It has been an exciting and fun month learning about `unified` and applying it to old problems that were unsolved. The possibilities here are endless and I am excited to see what we can do with this ecosystem. The day when we are able to parse/transform/render popular proprietary content types (e.g. `docx`, `pdf`) is the day I believe we will greatly lower the activation energy to make content more shareable across machines and humans.
