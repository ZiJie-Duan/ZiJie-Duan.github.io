import {
  projects,
  searchable,
  categories,
  stages,
  languages,
} from "../data/projects";
const zh = document.body.dataset.lang === "zh";
const input = document.querySelector<HTMLInputElement>("#project-search")!;
const categoryButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-category]"),
];
const type = document.querySelector<HTMLSelectElement>("#type-filter")!;
const stage = document.querySelector<HTMLSelectElement>("#stage-filter")!;
const language = document.querySelector<HTMLSelectElement>("#language-filter")!;
const sort = document.querySelector<HTMLSelectElement>("#project-sort")!;
const collection = document.querySelector<HTMLElement>(".project-collection")!;
const cards = new Map(
  [...collection.querySelectorAll<HTMLElement>(".repo-card")].map((el) => [
    el.dataset.id!,
    el,
  ]),
);
const count = document.querySelector<HTMLElement>("#result-count")!;
const empty = document.querySelector<HTMLElement>(".empty-state")!;
const clear = document.querySelector<HTMLButtonElement>(".clear-filters")!;
const viewButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-view]"),
];
let category = "all",
  view = "list";
const initialOrder = new Map(projects.map((p, i) => [p.id, i]));
document
  .querySelectorAll<HTMLElement>(".project-filters,.browser-controls")
  .forEach((el) => (el.hidden = false));
function readUrl() {
  const params = new URLSearchParams(location.search);
  input.value = params.get("q") || "";
  category = params.get("category") || "all";
  if (!(category in categories)) category = "all";
  const set = (select: HTMLSelectElement, value: string | null) => {
    select.value = [...select.options].some((o) => o.value === value)
      ? value!
      : "all";
  };
  set(type, params.get("type"));
  set(stage, params.get("stage"));
  set(language, params.get("language"));
  sort.value = ["maturity", "updated", "name"].includes(
    params.get("sort") || "",
  )
    ? params.get("sort")!
    : "maturity";
  view = params.get("view") === "grid" ? "grid" : "list";
}
function apply(write = true) {
  const query = input.value.trim().toLowerCase();
  const ordered = [...projects].sort((a, b) =>
    sort.value === "updated"
      ? b.updated.localeCompare(a.updated) ||
        initialOrder.get(a.id)! - initialOrder.get(b.id)!
      : sort.value === "name"
        ? a.name.localeCompare(b.name, "en")
        : initialOrder.get(a.id)! - initialOrder.get(b.id)!,
  );
  let shown = 0;
  for (const p of ordered) {
    const el = cards.get(p.id)!;
    const match =
      (!query || searchable(p).includes(query)) &&
      (category === "all" || p.category === category) &&
      (stage.value === "all" || p.stage === stage.value) &&
      (language.value === "all" || p.language === language.value) &&
      (type.value === "all" ||
        (type.value === "original" && !p.fork) ||
        (type.value === "fork" && p.fork) ||
        (type.value === "archived" && p.archived));
    el.hidden = !match;
    if (match) shown++;
    collection.append(el);
  }
  categoryButtons.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.category === category)),
  );
  viewButtons.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.view === view)),
  );
  collection.dataset.layout = view;
  empty.hidden = shown > 0;
  count.textContent = zh
    ? `显示 ${shown} / ${projects.length} 个项目`
    : `Showing ${shown} of ${projects.length} projects`;
  clear.hidden =
    !query &&
    category === "all" &&
    stage.value === "all" &&
    language.value === "all" &&
    type.value === "all";
  const params = new URLSearchParams();
  if (query) params.set("q", input.value.trim());
  if (category !== "all") params.set("category", category);
  if (stage.value !== "all") params.set("stage", stage.value);
  if (language.value !== "all") params.set("language", language.value);
  if (type.value !== "all") params.set("type", type.value);
  if (sort.value !== "maturity") params.set("sort", sort.value);
  if (view !== "list") params.set("view", view);
  const suffix = params.size ? "?" + params.toString() : "";
  if (write)
    history.replaceState(null, "", location.pathname + suffix + location.hash);
  const langLink = document.querySelector<HTMLAnchorElement>(".lang");
  if (langLink)
    langLink.href =
      (zh ? "/en/projects/" : "/projects/") + suffix + location.hash;
}
function reset() {
  input.value = "";
  category = "all";
  type.value = "all";
  stage.value = "all";
  language.value = "all";
  apply();
}
readUrl();
apply(false);
categoryButtons.forEach((button) =>
  button.addEventListener("click", () => {
    category = button.dataset.category!;
    apply();
  }),
);
input.addEventListener("input", () => apply());
[type, stage, language, sort].forEach((el) =>
  el.addEventListener("change", () => apply()),
);
viewButtons.forEach((button) =>
  button.addEventListener("click", () => {
    view = button.dataset.view!;
    apply();
  }),
);
clear.addEventListener("click", reset);
document.querySelector("[data-reset]")?.addEventListener("click", reset);
window.addEventListener("popstate", () => {
  readUrl();
  apply(false);
});
if (location.hash) {
  try {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target && !target.hidden)
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: "center" });
        target.focus({ preventScroll: true });
      });
  } catch {}
}
