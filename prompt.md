Create a website for my company called "Schoonveld ICT". It's a freelance software enginering company.

## Technology stack
- The website is build using Astro 6.
- It uses Typescript
- It uses Tailwind CSS 4
- It uses Starwind UI components.

## Requirements
### General elements
- Add a navigation add the top with the provided log.svg and the company name.
- Add a light and dark theme and a theme switcher in the navigation.

### Pages
- A landing page
- A Resume page.

The landing page should have the following sections:
- a hero section with a heading text and a hero image. Use the provided hero-image.jpg
	+ The heading should be aligned left and the hero image aligned right. Apply a mask on the image to let the left portion of the image fade away behind the heading text. Make sure the person in the image stays fully visible.
- A CTA button tha scrolls to the contact form.
- A contact form.

The resume page shows my personal resume. It should have: 
 - a general description part at the top
 - a "Work Experience" part that lists my job an roles I had.
	+ Show the experience itemw in a vertical timeline.
	+ Experience items are provided per item in a markdown file.
	+ Use Astro's markdown integration to genarte the resume items from mardown files in the project dir at build time.
	+ Use the file resume/resume-item.md in the root of the project as an example for the item format.

### Design
Be creative. Add subtle animations to transitions. The website should have a clean business, look and feel.
You can use the following websites as inspiration:
- https://lenshq.io/
- https://www.daicarter.com/
- https://www.haproxy.com/
- https://www.jetbrains.com/

### Typography
- Use NimbusSansL as the main font.
- Use Jetbrains mono as secundairy font.
 
Don't do any backend integration for the contact form. Just focus on the front-end design and implementation.
Ask questions when extra input is needed.
