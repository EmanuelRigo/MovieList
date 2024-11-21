import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav>
      <Link href={"/"}>
        <Image src="/next.svg" width={50} height={17} priority></Image>
      </Link>
      <Link href={"/create"}>Create</Link>
    </nav>
  );
};

export default NavBar;
