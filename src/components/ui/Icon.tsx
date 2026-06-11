import {
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CarFront,
  Camera,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  Gauge,
  Hammer,
  Handshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Shield,
  Snowflake,
  SprayCan,
  Timer,
  Truck,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS = {
  "arrow-right": ArrowRight,
  "badge-check": BadgeCheck,
  "calendar-check": CalendarCheck,
  camera: Camera,
  car: CarFront,
  "car-swap": ArrowLeftRight,
  check: Check,
  "chevron-right": ChevronRight,
  clipboard: ClipboardList,
  clock: Clock,
  "file-text": FileText,
  gauge: Gauge,
  hammer: Hammer,
  handshake: Handshake,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  package: Package,
  phone: Phone,
  shield: Shield,
  snowflake: Snowflake,
  spray: SprayCan,
  timer: Timer,
  truck: Truck,
  whatsapp: MessageCircle,
  wrench: Wrench,
  x: X,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className} size={size} strokeWidth={1.8} aria-hidden />;
}
