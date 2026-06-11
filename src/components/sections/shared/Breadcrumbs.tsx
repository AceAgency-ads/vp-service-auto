import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-steel-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="chevron-right" size={13} className="text-coal-600" />}
              {last ? (
                <span aria-current="page" className="text-steel-300">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-steel-200">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
