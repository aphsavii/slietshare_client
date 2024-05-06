const Footer = () => {
  return (
    <footer className="w-full bg-lightBlack py-5 md:py-10 px-5">
      <div className="container mx-auto text-white">
        <span className="text-sm md:text-base tracking-wider">&copy; copyright SLIETshare { new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;