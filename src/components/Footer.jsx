const Footer = () => {
    return (
      <footer className="w-full mt-auto bg-gray-800 text-white py-4 px-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
        <p className="text-center sm:text-left mb-2 sm:mb-0">
          Made with ❤️ by <span className="font-semibold">Shubham Khatik</span>
        </p>
        <p className="text-center sm:text-left mb-2 sm:mb-0">
         Email : <span className="font-semibold">sk@gmail.com</span>
        </p>
        <p className="text-center sm:text-left mb-2 sm:mb-0">
          password :<span className="font-semibold">Shubham@123</span>
        </p>
        <a
          href="https://github.com/shubhamkhatik/todo-app-fullstack-client"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
           GitHub Frontend
        </a>
        <a
          href="https://github.com/shubhamkhatik/todo-app-fullstack-server"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
           GitHub Backend
        </a>
      </div>
    </footer>
    );
  };
  export default Footer;