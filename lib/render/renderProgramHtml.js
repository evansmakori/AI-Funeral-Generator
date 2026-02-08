function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function css({ layout }) {
  const pal = layout.palette;
  const headingFont = layout.typography.headingFont || "Georgia";
  const bodyFont = layout.typography.bodyFont || "system-ui";

  return `
    :root{
      --bg:${pal.background};
      --text:${pal.text};
      --muted:${pal.muted};
      --accent:${pal.accent};
      --heading:${headingFont};
      --body:${bodyFont};
    }
    *{box-sizing:border-box;}
    html,body{margin:0;padding:0;}
    body{background:#f5f5f4;color:var(--text);font-family:var(--body);} 
    .sheet{
      width: 816px; /* 8.5in @96dpi */
      min-height: 1056px; /* 11in @96dpi */
      margin: 24px auto;
      background: var(--bg);
      border: 1px solid rgba(0,0,0,0.08);
      box-shadow: 0 18px 40px rgba(0,0,0,0.08);
      padding: 52px;
    }
    h1,h2,h3{font-family:var(--heading); letter-spacing:0.2px; margin:0 0 10px;}
    h1{font-size:34px; line-height:1.1;}
    h2{font-size:18px; color: var(--muted); font-weight:600;}
    p{margin:0 0 12px; line-height:1.55; color: var(--text);}
    .muted{color:var(--muted);}
    .rule{height:1px; background:rgba(0,0,0,0.08); margin:18px 0;}
    .grid{display:grid; grid-template-columns: 1fr 1fr; gap: 32px;}
    .panel{padding: 0;}
    .section-title{font-size:14px; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin: 18px 0 8px;}
    ul{margin:0; padding-left: 18px;}
    li{margin: 0 0 8px; line-height:1.45;}
    .hero{display:flex; align-items:flex-start; gap: 20px;}
    .hero img{width: 190px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(0,0,0,0.08);}
    .badge{display:inline-block; padding: 6px 10px; border-radius: 999px; border:1px solid rgba(0,0,0,0.08); color:var(--muted); font-size:12px;}
    @media print{
      body{background:white;}
      .sheet{box-shadow:none; margin:0; border:none; width:auto; min-height:auto;}
    }
  `;
}

function sectionBlocks({ content, layout, input }) {
  const sections = layout.sections || [];

  const map = {
    obituary: {
      title: "Obituary",
      render: () => `<p>${escapeHtml(content.obituary)}</p>`
    },
    orderOfService: {
      title: "Order of Service",
      render: () => `<ul>${(content.orderOfService || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
    },
    acknowledgements: {
      title: "Acknowledgements",
      render: () => `<p>${escapeHtml(content.acknowledgements)}</p>`
    },
    poemsOrReadings: {
      title: "Readings",
      render: () => (content.poemsOrReadings || []).map((x) => `<p>${escapeHtml(x)}</p>`).join("")
    },
    family: {
      title: "Family",
      render: () =>
        content.family?.length ? `<ul>${content.family.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : `<p class="muted">(Provided at the service)</p>`
    },
    serviceDetails: {
      title: "Service Details",
      render: () => {
        const s = input.structured || {};
        const rows = [
          s.serviceDate ? `Date: ${s.serviceDate}` : null,
          s.serviceTime ? `Time: ${s.serviceTime}` : null,
          s.location ? `Location: ${s.location}` : null,
          s.officiant ? `Officiant: ${s.officiant}` : null
        ].filter(Boolean);
        if (!rows.length) return `<p class="muted">(Not provided)</p>`;
        return `<ul>${rows.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`;
      }
    }
  };

  return sections
    .map((s) => {
      const def = map[s.key];
      if (!def) return "";
      return `
        <div class="panel">
          <div class="section-title">${escapeHtml(s.title || def.title)}</div>
          ${def.render()}
        </div>
      `;
    })
    .join("");
}

export function renderProgramHtml({ projectId, input, content, layout, uploads }) {
  const primary = layout?.imagePlan?.primary || uploads?.[0]?.publicPath || null;
  const fullName = input?.structured?.fullName || content.titleLine;
  const subtitle = content.subtitleLine;

  const topMeta = [
    input?.structured?.birthDate || input?.structured?.deathDate
      ? `${input?.structured?.birthDate || ""}${input?.structured?.birthDate && input?.structured?.deathDate ? " â " : ""}${
          input?.structured?.deathDate || ""
        }`
      : null
  ].filter(Boolean);

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Funeral Program</title>
      <style>${css({ layout })}</style>
    </head>
    <body>
      <div class="sheet">
        <div class="hero">
          ${primary ? `<img alt="" src="${escapeHtml(primary)}"/>` : ""}
          <div>
            <div class="badge">Program ID: ${escapeHtml(projectId)}</div>
            <h1>${escapeHtml(fullName)}</h1>
            <h2>${escapeHtml(subtitle)}</h2>
            ${topMeta.length ? `<p class="muted">${escapeHtml(topMeta.join(" Â· \n"))}</p>` : ""}
            <div class="rule"></div>
            <p class="muted">${escapeHtml(content.toneNotes)}</p>
          </div>
        </div>

        <div class="rule"></div>

        <div class="grid">
          ${sectionBlocks({ content, layout, input })}
        </div>
      </div>
    </body>
  </html>`;
}
