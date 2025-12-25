import { AnimatedIconProps } from "./types";
import BatteryIcon from "./battery-icon";
import BatteryPauseIcon from "./battery-pause-icon";
import BookIcon from "./book-icon";
import BookmarkIcon from "./bookmark-icon";
import BulbSvg from "./bulb-svg";
import CartIcon from "./cart-icon";
import CheckedIcon from "./checked-icon";
import CreditCard from "./credit-card";
import DoubleCheckIcon from "./double-check-icon";
import DownCheveron from "./down-cheveron";
import FilledBellIcon from "./filled-bell-icon";
import FilledCheckedIcon from "./filled-checked-icon";
import GearIcon from "./gear-icon";
import Instagram from "./instagram";
import LikeIcon from "./like-icon";
import LogoutIcon from "./logout-icon";
import MagnifierIcon from "./magnifier-icon";
import PenIcon from "./pen-icon";
import PhoneVolume from "./phone-volume";
import PlayerIcon from "./player-icon";
import QRCodeSVG from "./qrcode-svg";
import QuestionMark from "./question-mark";
import RefreshIcon from "./refresh-icon";
import RightCheveron from "./right-cheveron";
import RocketIcon from "./rocket-icon";
import SendIcon from "./send-icon";
import ShieldCheck from "./shield-check";
import ShoppingCartIcon from "./shopping-cart-icon";
import SimpleCheckedIcon from "./simple-checked-icon";
import SkullEmoji from "./skull-emoji";
import StadiumIcon from "./stadium-icon";
import TextIcon from "./text-icon";
import ToggleIcon from "./toggle-icon";
import TrashIcon from "./trash-icon";
import TreeIcon from "./tree-icon";
import WhatsappIcon from "./whatsapp-icon";

export interface IconType {
  name: string;
  icon: React.FC<AnimatedIconProps>;
  keywords: string[];
  customProps?: {
    name: string;
    type: string;
    defaultValue: string | boolean | number;
  }[];
}

const ICON_LIST: IconType[] = [
  {
    name: "BatteryIcon",
    icon: BatteryIcon,
    keywords: ["battery", "charging", "bolt"],
  },
  {
    name: "BatteryPauseIcon",
    icon: BatteryPauseIcon,
    keywords: ["battery", "pause", "hold", "wait"],
  },
  {
    name: "BookIcon",
    icon: BookIcon,
    keywords: ["book", "read", "library", "study"],
  },
  {
    name: "BookmarkIcon",
    icon: BookmarkIcon,
    keywords: ["bookmark", "save", "favorite", "mark"],
  },
  {
    name: "BulbSvg",
    icon: BulbSvg,
    keywords: ["bulb", "light", "idea", "creativity"],
  },
  {
    name: "CartIcon",
    icon: CartIcon,
    keywords: ["cart", "shopping", "buy", "store"],
  },
  {
    name: "CheckedIcon",
    icon: CheckedIcon,
    keywords: ["check", "tick", "success", "done"],
  },
  {
    name: "CreditCard",
    icon: CreditCard,
    keywords: ["credit", "card", "payment", "money"],
  },
  {
    name: "DoubleCheckIcon",
    icon: DoubleCheckIcon,
    keywords: ["check", "double", "read", "seen"],
  },
  {
    name: "DownCheveron",
    icon: DownCheveron,
    keywords: ["arrow", "down", "expand", "more"],
  },
  {
    name: "FilledBellIcon",
    icon: FilledBellIcon,
    keywords: ["bell", "notification", "alert", "alarm"],
  },
  {
    name: "FilledCheckedIcon",
    icon: FilledCheckedIcon,
    keywords: ["check", "tick", "success", "filled", "done"],
  },
  {
    name: "GearIcon",
    icon: GearIcon,
    keywords: ["gear", "settings", "config", "options"],
  },
  {
    name: "Instagram",
    icon: Instagram,
    keywords: ["instagram", "social", "media", "photo"],
  },
  {
    name: "LikeIcon",
    icon: LikeIcon,
    keywords: ["like", "heart", "love", "favorite"],
  },
  {
    name: "LogoutIcon",
    icon: LogoutIcon,
    keywords: ["logout", "exit", "signout", "leave"],
  },
  {
    name: "MagnifierIcon",
    icon: MagnifierIcon,
    keywords: ["search", "find", "zoom", "look"],
  },
  {
    name: "PenIcon",
    icon: PenIcon,
    keywords: ["pen", "edit", "write", "modify"],
  },
  {
    name: "PhoneVolume",
    icon: PhoneVolume,
    keywords: ["phone", "call", "volume", "sound"],
  },
  {
    name: "PlayerIcon",
    icon: PlayerIcon,
    keywords: ["play", "media", "music", "video"],
  },
  {
    name: "QRCodeSVG",
    icon: QRCodeSVG,
    keywords: ["qr", "code", "scan", "barcode"],
  },
  {
    name: "QuestionMark",
    icon: QuestionMark,
    keywords: ["question", "help", "info", "faq"],
  },
  {
    name: "RefreshIcon",
    icon: RefreshIcon,
    keywords: ["refresh", "reload", "sync", "update"],
  },
  {
    name: "RightCheveron",
    icon: RightCheveron,
    keywords: ["arrow", "right", "next", "forward"],
  },
  {
    name: "RocketIcon",
    icon: RocketIcon,
    keywords: ["rocket", "launch", "space", "startup"],
  },
  {
    name: "SendIcon",
    icon: SendIcon,
    keywords: ["send", "message", "mail", "submit"],
  },
  {
    name: "ShieldCheck",
    icon: ShieldCheck,
    keywords: ["shield", "security", "safe", "protect"],
  },
  {
    name: "ShoppingCartIcon",
    icon: ShoppingCartIcon,
    keywords: ["cart", "shopping", "store", "buy"],
  },
  {
    name: "SimpleCheckedIcon",
    icon: SimpleCheckedIcon,
    keywords: ["check", "tick", "simple", "done"],
  },
  {
    name: "SkullEmoji",
    icon: SkullEmoji,
    keywords: ["skull", "death", "danger", "warning"],
  },
  {
    name: "StadiumIcon",
    icon: StadiumIcon,
    keywords: ["stadium", "arena", "sports", "game"],
  },
  {
    name: "TextIcon",
    icon: TextIcon,
    keywords: ["text", "type", "font", "write"],
  },
  {
    name: "ToggleIcon",
    icon: ToggleIcon,
    keywords: ["toggle", "switch", "on", "off"],
  },
  {
    name: "TrashIcon",
    icon: TrashIcon,
    keywords: ["trash", "delete", "remove", "bin"],
    customProps: [
      { name: "shakeOnClick", type: "boolean", defaultValue: false },
      { name: "dangerHover", type: "boolean", defaultValue: false },
      { name: "keepOpenOnDelete", type: "boolean", defaultValue: false },
    ],
  },
  {
    name: "TreeIcon",
    icon: TreeIcon,
    keywords: ["tree", "nature", "forest", "plant"],
  },
  {
    name: "WhatsappIcon",
    icon: WhatsappIcon,
    keywords: ["whatsapp", "chat", "message", "social"],
  },
];

export { ICON_LIST };
