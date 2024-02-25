import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface props {
  name: string;
  Icon: LucideIcon;
  href: string;
}

const AdminCards: React.FC<props> = ({ name, Icon, href }) => {
  return (
    <Link className="w-full h-full" href={href}>
      <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-muted p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
        <div className="font-light text-2xl text-primary">{name}</div>
        <div className="absolute bottom-5 right-5">
          {/* <Icon className="group-hover:fill-primary w-16 h-16 stroke fill-muted-foreground" /> */}

          <Icon className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke group-hover:stroke-primary stroke-muted-foreground" />
        </div>
        <div className="text-muted-foreground">View</div>
      </div>
    </Link>
  );
};

export default AdminCards;
