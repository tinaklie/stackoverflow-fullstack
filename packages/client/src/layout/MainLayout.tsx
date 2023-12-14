import "./MainLayout.css";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="main">
      <section className="layout">
        <header></header>
        {children}
        <footer className="footer">&copy; 2023 Exxeta</footer>
      </section>
    </div>
  );
};
