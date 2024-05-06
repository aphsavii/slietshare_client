const Footer = () => {
  return (
    <footer className="w-full bg-lightBlack py-5 md:py-10 px-5">
      <div className="container mx-auto">
        <div className="w-full text-center mb-8">
          <p className="text-sm md:text-base tracking-wider text-gray-300 inline">A platform of the Slietiens for the Slietiens by the Slietiens <img className="inline relative bottom-[1.2px]" src="assets/icons/red-heart-icon.svg" alt="" /></p>
          <p className="text-xxs md:text-xs text-gray-500 mt-1">Many more features coming soon...</p>
        </div>
        <div>
        <p className="text-sm md:text-base tracking-wider text-gray-500">&copy; copyright SLIETshare {new Date().getFullYear()}</p>
        <p className="text-xs mt-3 text-warn">Please report any error or if you wanna contribute in development at <a href="mailto:info@slietshare.online"> info@slietshare.online</a></p>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;