import TextReveal from "./TextReveal";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 p-4">
      <TextReveal>
        <h1 className="text-2xl font-bold">Nitish</h1>
      </TextReveal>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>Project</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
