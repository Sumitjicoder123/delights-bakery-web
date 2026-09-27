
fetch("https://delights-bakery-web-git-main-sumiy1.vercel.app/admin")
  .then(res => res.text())
  .then(async text => {
    const scripts = [...text.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
    for(const s of scripts) {
      const url = s.startsWith("http") ? s : "https://delights-bakery-web-git-main-sumiy1.vercel.app" + (s.startsWith("/") ? s : "/" + s);
      const res = await fetch(url);
      const js = await res.text();
      if (js.includes("dummy.supabase.co")) console.log("Found dummy in", url);
      if (js.includes("uwlnomudmowjhubxhxhv.supabase.co")) console.log("Found REAL URL in", url);
    }
    console.log("Done checking.");
  });

