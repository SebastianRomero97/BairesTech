import { NavItems} from "@/helpers/NavItems";
import Link from "next/link";

function  NavBar () {
    return <nav>
        <section>Logo</section>
       {NavItems.map((navigationitem) => {return (
        <Link href={navigationitem.route} key={navigationitem.name}>{navigationitem.name}</Link>
       )})}
    </nav>
}
export default NavBar;