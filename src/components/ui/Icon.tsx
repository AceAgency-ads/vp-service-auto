import {
  SolarArrowRight,
  SolarBadgeCheck,
  SolarCalendarCheck,
  SolarCamera,
  SolarCar,
  SolarCarSwap,
  SolarCheck,
  SolarChevronRight,
  SolarClipboard,
  SolarClock,
  SolarFileText,
  SolarGauge,
  SolarHammer,
  SolarHandshake,
  SolarMail,
  SolarMapPin,
  SolarMenu,
  SolarPackage,
  SolarPhone,
  SolarShield,
  SolarSnowflake,
  SolarSpray,
  SolarStar,
  SolarTimer,
  SolarTruck,
  SolarWhatsapp,
  SolarWrench,
  SolarX,
  SolarZap,
} from "./solar-icons";

type SolarIcon = (props: { size: number; className?: string }) => React.ReactElement;

const ICONS = {
  "arrow-right": SolarArrowRight,
  "badge-check": SolarBadgeCheck,
  "calendar-check": SolarCalendarCheck,
  camera: SolarCamera,
  car: SolarCar,
  "car-swap": SolarCarSwap,
  check: SolarCheck,
  "chevron-right": SolarChevronRight,
  clipboard: SolarClipboard,
  clock: SolarClock,
  "file-text": SolarFileText,
  gauge: SolarGauge,
  hammer: SolarHammer,
  handshake: SolarHandshake,
  mail: SolarMail,
  "map-pin": SolarMapPin,
  menu: SolarMenu,
  package: SolarPackage,
  phone: SolarPhone,
  shield: SolarShield,
  snowflake: SolarSnowflake,
  spray: SolarSpray,
  star: SolarStar,
  timer: SolarTimer,
  truck: SolarTruck,
  whatsapp: SolarWhatsapp,
  wrench: SolarWrench,
  x: SolarX,
  zap: SolarZap,
} satisfies Record<string, SolarIcon>;

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
  return <Cmp size={size} className={className} />;
}
