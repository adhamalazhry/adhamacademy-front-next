import Input from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function TeacherSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ابحث عن معلم"
        className="pl-11"
      />
    </div>
  );
}
