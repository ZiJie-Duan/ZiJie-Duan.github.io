import { projects, searchable } from "../data/projects";
const zh = document.body.dataset.lang === "zh";
const root = document.documentElement;
const theme = document.querySelector<HTMLButtonElement>(".theme-toggle");
function syncTheme() {
  theme?.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
}
if (theme) {
  theme.hidden = false;
  syncTheme();
  theme.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("zijie-theme", root.dataset.theme);
    } catch {}
    syncTheme();
  });
}
const media = matchMedia("(prefers-color-scheme: dark)");
media.addEventListener("change", (e) => {
  let saved = null;
  try {
    saved = localStorage.getItem("zijie-theme");
  } catch {}
  if (!saved) {
    root.dataset.theme = e.matches ? "dark" : "light";
    syncTheme();
  }
});
const dialog = document.querySelector<HTMLDialogElement>(".command-dialog")!;
const input = document.querySelector<HTMLInputElement>("#command-input")!;
const results = dialog.querySelector<HTMLElement>(".command-results")!;
const count = dialog.querySelector<HTMLElement>(".command-count")!;
const base = zh ? "/projects/" : "/en/projects/";
function entry(title: string, sub: string, url: string) {
  const a = document.createElement("a");
  a.className = "command-result";
  a.href = url;
  const heading = document.createElement("strong");
  heading.textContent = title;
  const detail = document.createElement("span");
  detail.textContent = sub;
  const arrow = document.createElement("span");
  arrow.className = "command-arrow";
  arrow.textContent = "↗";
  a.append(heading, detail, arrow);
  results.append(a);
}
function render() {
  const query = input.value.trim().toLowerCase();
  results.replaceChildren();
  if (!query) {
    entry(
      zh ? "所有公开项目" : "All public projects",
      zh ? "搜索、分类与成熟度排序" : "Search, filter, and explore by maturity",
      base,
    );
    entry(
      zh ? "AI 与交互" : "AI & interaction",
      "Python / TypeScript",
      base + "?category=ai",
    );
    entry(
      zh ? "系统与网络" : "Systems & networks",
      "Rust / Swift / Python",
      base + "?category=systems",
    );
    entry(
      zh ? "硬件与制造" : "Hardware & making",
      "ESP32 / RP2040 / STM32",
      base + "?category=hardware",
    );
    count.textContent = zh ? "输入关键词开始搜索" : "Type to search";
    return;
  }
  const matches = projects.filter((p) => searchable(p).includes(query));
  matches
    .slice(0, 8)
    .forEach((p) =>
      entry(
        p.name,
        p.summary[zh ? "zh" : "en"],
        base +
          "?q=" +
          encodeURIComponent(p.id) +
          "#project-" +
          encodeURIComponent(p.id),
      ),
    );
  count.textContent = zh
    ? `${matches.length} 个匹配项目`
    : `${matches.length} matching projects`;
  if (matches.length > 8)
    entry(
      zh ? "查看全部结果" : "View all results",
      `${matches.length} ${zh ? "个项目" : "projects"}`,
      base + "?q=" + encodeURIComponent(query),
    );
  if (!matches.length) {
    const message = document.createElement("p");
    message.className = "command-empty";
    message.textContent = zh
      ? "没有找到，换个名称或技术关键词试试。"
      : "No matches. Try a different name or technology.";
    results.append(message);
  }
}
function open() {
  if (dialog.open) return;
  render();
  dialog.showModal();
  document.body.classList.add("dialog-open");
  input.focus();
}
document
  .querySelectorAll<HTMLButtonElement>("[data-open-search]")
  .forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", open);
  });
dialog
  .querySelector(".command-close")
  ?.addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});
input.addEventListener("input", render);
dialog.addEventListener("keydown", (event) => {
  const anchors = [...results.querySelectorAll<HTMLAnchorElement>("a")];
  if (["ArrowDown", "ArrowUp"].includes(event.key) && anchors.length) {
    event.preventDefault();
    const current = anchors.indexOf(
      document.activeElement as HTMLAnchorElement,
    );
    const next =
      event.key === "ArrowDown"
        ? (current + 1) % anchors.length
        : current <= 0
          ? anchors.length - 1
          : current - 1;
    anchors[next].focus();
  }
  if (event.key === "Enter" && document.activeElement === input && anchors[0]) {
    event.preventDefault();
    anchors[0].click();
  }
});
document.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement;
  const typing =
    target.matches("input,textarea,select") || target.isContentEditable;
  if (
    ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") ||
    (event.key === "/" && !typing)
  ) {
    event.preventDefault();
    open();
  }
});
