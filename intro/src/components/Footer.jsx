function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-indigo-200 text-gray-700 py-4 mt-10 rounded-t-xl shadow-inner">
      <div className="max-w-7xl mx-auto text-center text-sm font-medium">
        <p>
          &copy; {new Date().getFullYear()} Barterverse IT Students. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;