import { useState } from "react";
import { Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";

import MediaUploadModal, { type MediaUploadResult } from "@/components/admin/MediaUploadModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { type IceExhibitionContent } from "@/data/ice-exhibition";

interface IceExhibitionEditorProps {
  data: IceExhibitionContent;
  onChange: (data: IceExhibitionContent) => void;
  onSave: () => void;
  onRestore: () => void;
  saving: boolean;
  loading: boolean;
}

type ImageTarget =
  | { section: "hero"; key: "backgroundImage" }
  | { section: "intro"; key: "image" }
  | { section: "currentStatus"; key: "image" }
  | { section: "originRows"; index: number; key: "image" }
  | { section: "inaugurations"; index: number; key: "image" }
  | { section: "testimonials"; index: number; key: "image" };

const mediaBase = (import.meta.env.VITE_MEDIA_BASE_URL || import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const toText = (items: string[]) => items.join("\n");
const fromText = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);

const imageUrl = (value: string) => {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("/assets/")) {
    return value;
  }
  return mediaBase ? `${mediaBase}/${value.replace(/^\/+/, "")}` : value;
};

const getUploadedPath = (result: MediaUploadResult) =>
  result.variants.find((variant) => variant.key === "main")?.path || result.variants[0]?.path || "";

const Field = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs text-muted-foreground">{label}</label>
    <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) => (
  <div className="space-y-1">
    <label className="text-xs text-muted-foreground">{label}</label>
    <Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} />
  </div>
);

const IceExhibitionEditor = ({ data, onChange, onSave, onRestore, saving, loading }: IceExhibitionEditorProps) => {
  const [imageTarget, setImageTarget] = useState<ImageTarget | null>(null);

  const patch = (partial: Partial<IceExhibitionContent>) => onChange({ ...data, ...partial });

  const patchNested = <K extends keyof IceExhibitionContent>(
    key: K,
    value: Partial<IceExhibitionContent[K]>
  ) => {
    patch({ [key]: { ...(data[key] as object), ...value } } as Partial<IceExhibitionContent>);
  };

  const updateArrayItem = <K extends "stats" | "originRows" | "pillars" | "inaugurations" | "testimonials">(
    key: K,
    index: number,
    value: Partial<IceExhibitionContent[K][number]>
  ) => {
    const next = [...data[key]] as IceExhibitionContent[K];
    next[index] = { ...(next[index] as object), ...value } as IceExhibitionContent[K][number];
    patch({ [key]: next } as Partial<IceExhibitionContent>);
  };

  const removeArrayItem = <K extends "stats" | "originRows" | "pillars" | "inaugurations" | "testimonials">(
    key: K,
    index: number
  ) => patch({ [key]: data[key].filter((_, itemIndex) => itemIndex !== index) } as Partial<IceExhibitionContent>);

  const onUploaded = (result: MediaUploadResult) => {
    if (!imageTarget) return;
    const path = getUploadedPath(result);
    if (!path) return;

    if (imageTarget.section === "hero") patchNested("hero", { backgroundImage: path });
    if (imageTarget.section === "intro") patchNested("intro", { image: path });
    if (imageTarget.section === "currentStatus") patchNested("currentStatus", { image: path });
    if (imageTarget.section === "originRows") updateArrayItem("originRows", imageTarget.index, { image: path });
    if (imageTarget.section === "inaugurations") updateArrayItem("inaugurations", imageTarget.index, { image: path });
    if (imageTarget.section === "testimonials") updateArrayItem("testimonials", imageTarget.index, { image: path });
  };

  const ImageField = ({
    label,
    value,
    onValueChange,
    target,
  }: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    target: ImageTarget;
  }) => (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input value={value} onChange={(event) => onValueChange(event.target.value)} placeholder="https:// or uploaded media path" />
        <Button type="button" variant="outline" onClick={() => setImageTarget(target)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      {value && (
        <div className="h-28 w-full overflow-hidden rounded-lg border bg-muted/30">
          <img src={imageUrl(value)} alt={label} className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );

  return (
    <div id="ice-exhibition" className="space-y-4 pt-10">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-display font-semibold md:text-3xl">ICE Exhibition Page Editor</h2>
        <p className="text-sm text-muted-foreground">Update all public ICE Exhibition sections, images, CTAs, people, testimonials, and logos.</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Banner</CardTitle>
              <CardDescription>Background image, chip, H1, subtitle, and CTA buttons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageField
                label="Hero background image"
                value={data.hero.backgroundImage}
                onValueChange={(backgroundImage) => patchNested("hero", { backgroundImage })}
                target={{ section: "hero", key: "backgroundImage" }}
              />
              <Field label="Tag chip" value={data.hero.chip} onChange={(chip) => patchNested("hero", { chip })} />
              <Field label="H1" value={data.hero.title} onChange={(title) => patchNested("hero", { title })} />
              <TextField label="Subtitle" value={data.hero.subtitle} onChange={(subtitle) => patchNested("hero", { subtitle })} rows={3} />
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Primary CTA label" value={data.hero.primaryCta.label} onChange={(label) => patchNested("hero", { primaryCta: { ...data.hero.primaryCta, label } })} />
                <Field label="Primary CTA href" value={data.hero.primaryCta.href} onChange={(href) => patchNested("hero", { primaryCta: { ...data.hero.primaryCta, href } })} />
                <Field label="Secondary CTA label" value={data.hero.secondaryCta.label} onChange={(label) => patchNested("hero", { secondaryCta: { ...data.hero.secondaryCta, label } })} />
                <Field label="Secondary CTA href" value={data.hero.secondaryCta.href} onChange={(href) => patchNested("hero", { secondaryCta: { ...data.hero.secondaryCta, href } })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What is ICE</CardTitle>
              <CardDescription>Intro two-column content and image card.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Label" value={data.intro.label} onChange={(label) => patchNested("intro", { label })} />
                <Field label="Title" value={data.intro.title} onChange={(title) => patchNested("intro", { title })} />
              </div>
              <TextField label="Paragraphs, one per line" value={toText(data.intro.paragraphs)} onChange={(value) => patchNested("intro", { paragraphs: fromText(value) })} rows={8} />
              <ImageField label="Intro image" value={data.intro.image} onValueChange={(image) => patchNested("intro", { image })} target={{ section: "intro", key: "image" }} />
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Image alt" value={data.intro.imageAlt} onChange={(imageAlt) => patchNested("intro", { imageAlt })} />
                <Field label="First stat value" value={data.intro.statOneValue} onChange={(statOneValue) => patchNested("intro", { statOneValue })} />
                <Field label="First stat label" value={data.intro.statOneLabel} onChange={(statOneLabel) => patchNested("intro", { statOneLabel })} />
                <Field label="Second stat value" value={data.intro.statTwoValue} onChange={(statTwoValue) => patchNested("intro", { statTwoValue })} />
                <Field label="Second stat label" value={data.intro.statTwoLabel} onChange={(statTwoLabel) => patchNested("intro", { statTwoLabel })} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
              <CardDescription>Text, bullet list, CTA, and image.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Label" value={data.currentStatus.label} onChange={(label) => patchNested("currentStatus", { label })} />
              <Field label="Title" value={data.currentStatus.title} onChange={(title) => patchNested("currentStatus", { title })} />
              <TextField label="Bullets, one per line" value={toText(data.currentStatus.bullets)} onChange={(value) => patchNested("currentStatus", { bullets: fromText(value) })} rows={5} />
              <ImageField label="Status image" value={data.currentStatus.image} onValueChange={(image) => patchNested("currentStatus", { image })} target={{ section: "currentStatus", key: "image" }} />
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="CTA label" value={data.currentStatus.cta.label} onChange={(label) => patchNested("currentStatus", { cta: { ...data.currentStatus.cta, label } })} />
                <Field label="CTA href" value={data.currentStatus.cta.href} onChange={(href) => patchNested("currentStatus", { cta: { ...data.currentStatus.cta, href } })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stats Counter Strip</CardTitle>
              <CardDescription>Four large number cards shown below the intro.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.stats.map((stat, index) => (
                <div key={index} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_2fr_auto]">
                  <Input value={stat.value} onChange={(event) => updateArrayItem("stats", index, { value: event.target.value })} />
                  <Input value={stat.label} onChange={(event) => updateArrayItem("stats", index, { label: event.target.value })} />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem("stats", index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch({ stats: [...data.stats, { value: "", label: "" }] })}>
                <Plus className="mr-2 h-4 w-4" />
                Add stat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Origin Story</CardTitle>
              <CardDescription>Alternating rows with image and copy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.originRows.map((row, index) => (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Chip" value={row.chip} onChange={(chip) => updateArrayItem("originRows", index, { chip })} />
                    <Field label="Title" value={row.title} onChange={(title) => updateArrayItem("originRows", index, { title })} />
                  </div>
                  <TextField label="Paragraphs, one per line" value={toText(row.paragraphs)} onChange={(value) => updateArrayItem("originRows", index, { paragraphs: fromText(value) })} />
                  <ImageField label="Row image" value={row.image} onValueChange={(image) => updateArrayItem("originRows", index, { image })} target={{ section: "originRows", index, key: "image" }} />
                  <Button variant="ghost" onClick={() => removeArrayItem("originRows", index)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove row
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch({ originRows: [...data.originRows, { chip: "", title: "", paragraphs: [""], image: "", imageAlt: "" }] })}>
                <Plus className="mr-2 h-4 w-4" />
                Add origin row
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3-Pillar Philosophy Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.pillars.map((pillar, index) => (
                <div key={index} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_2fr_auto]">
                  <Input value={pillar.title} onChange={(event) => updateArrayItem("pillars", index, { title: event.target.value })} />
                  <Input value={pillar.body} onChange={(event) => updateArrayItem("pillars", index, { body: event.target.value })} />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem("pillars", index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch({ pillars: [...data.pillars, { title: "", body: "" }] })}>
                <Plus className="mr-2 h-4 w-4" />
                Add pillar
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VIP Inaugurations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.inaugurations.map((guest, index) => (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label="Name" value={guest.name} onChange={(name) => updateArrayItem("inaugurations", index, { name })} />
                    <Field label="Title" value={guest.title} onChange={(title) => updateArrayItem("inaugurations", index, { title })} />
                    <Field label="Year" value={guest.year} onChange={(year) => updateArrayItem("inaugurations", index, { year })} />
                  </div>
                  <ImageField label="Photo" value={guest.image} onValueChange={(image) => updateArrayItem("inaugurations", index, { image })} target={{ section: "inaugurations", index, key: "image" }} />
                  <Button variant="ghost" onClick={() => removeArrayItem("inaugurations", index)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove guest
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch({ inaugurations: [...data.inaugurations, { name: "", title: "", year: "", image: "" }] })}>
                <Plus className="mr-2 h-4 w-4" />
                Add inauguration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.testimonials.map((item, index) => (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label="Name" value={item.name} onChange={(name) => updateArrayItem("testimonials", index, { name })} />
                    <Field label="Designation" value={item.designation} onChange={(designation) => updateArrayItem("testimonials", index, { designation })} />
                    <Field label="Rating" value={String(item.rating)} onChange={(rating) => updateArrayItem("testimonials", index, { rating: Number(rating) || 5 })} />
                  </div>
                  <TextField label="Quote" value={item.quote} onChange={(quote) => updateArrayItem("testimonials", index, { quote })} rows={3} />
                  <ImageField label="Profile photo" value={item.image} onValueChange={(image) => updateArrayItem("testimonials", index, { image })} target={{ section: "testimonials", index, key: "image" }} />
                  <Button variant="ghost" onClick={() => removeArrayItem("testimonials", index)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove testimonial
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch({ testimonials: [...data.testimonials, { name: "", designation: "", quote: "", image: "", rating: 5 }] })}>
                <Plus className="mr-2 h-4 w-4" />
                Add testimonial
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Strip & Closing CTA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Logo strip heading" value={data.logoStrip.title} onChange={(title) => patchNested("logoStrip", { title })} />
              <TextField label="Logo names, one per line" value={toText(data.logoStrip.logos)} onChange={(value) => patchNested("logoStrip", { logos: fromText(value) })} rows={6} />
              <Field label="Closing title" value={data.closingCta.title} onChange={(title) => patchNested("closingCta", { title })} />
              <TextField label="Closing subtitle" value={data.closingCta.subtitle} onChange={(subtitle) => patchNested("closingCta", { subtitle })} rows={3} />
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Primary CTA label" value={data.closingCta.primaryCta.label} onChange={(label) => patchNested("closingCta", { primaryCta: { ...data.closingCta.primaryCta, label } })} />
                <Field label="Primary CTA href" value={data.closingCta.primaryCta.href} onChange={(href) => patchNested("closingCta", { primaryCta: { ...data.closingCta.primaryCta, href } })} />
                <Field label="Secondary CTA label" value={data.closingCta.secondaryCta.label} onChange={(label) => patchNested("closingCta", { secondaryCta: { ...data.closingCta.secondaryCta, label } })} />
                <Field label="Secondary CTA href" value={data.closingCta.secondaryCta.href} onChange={(href) => patchNested("closingCta", { secondaryCta: { ...data.closingCta.secondaryCta, href } })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Publish Changes</CardTitle>
              <CardDescription>Save the latest content to the backend or restore default ICE Exhibition copy.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-end gap-3">
              <Button variant="outline" onClick={onRestore} disabled={saving || loading}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore defaults
              </Button>
              <Button onClick={onSave} disabled={saving || loading}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save ICE Exhibition"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <MediaUploadModal
        open={Boolean(imageTarget)}
        onOpenChange={(open) => !open && setImageTarget(null)}
        onUploaded={onUploaded}
        folder="ice-exhibition"
      />
    </div>
  );
};

export default IceExhibitionEditor;
