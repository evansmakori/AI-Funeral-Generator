export async function exportPdfOrPng({ html, format, layout }) {
  // We use Puppeteer for reliable server-side rendering of HTML to PDF/PNG.
  const puppeteer = await import("puppeteer");

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });

    if (format === "png") {
      const buf = await page.screenshot({ fullPage: true, type: "png" });
      return Buffer.from(buf);
    }

    const isHalfFold = layout?.page?.fold === "half-fold";
    const pdf = await page.pdf({
      format: "letter",
      printBackground: true,
      margin: { top: "0.4in", right: "0.4in", bottom: "0.4in", left: "0.4in" },
      landscape: Boolean(isHalfFold)
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
