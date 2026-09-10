
import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Stethoscope,
  CalendarDays,
  FileText,
  Settings,
  MessageCircle,
  Phone,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const location = useLocation();

  
  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Find Doctors",
      path: "/doctors",
      icon: Stethoscope,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Medical Records",
      path: "/records",
      icon: FileText,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        padding: "1.5rem 1rem",

        position: "fixed",
        left: 0,
        top: 0,

        boxSizing: "border-box",
        overflowY: "auto",

        zIndex: 1000,
      }}
    >
      

      <div>
   

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            fontWeight: "800",
            fontSize: "1.35rem",

            color: "#2563eb",

            marginBottom: "2.5rem",
            paddingLeft: "0.5rem",
          }}
        >
        

          <div
            style={{
              width: "38px",
              height: "38px",

              borderRadius: "12px",

              background:
                "linear-gradient(135deg, #2563eb, #06b6d4)",

              color: "#ffffff",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "22px",
              fontWeight: "bold",

              boxShadow:
                "0 5px 15px rgba(37, 99, 235, 0.25)",
            }}
          >
            +
          </div>

          <span>DR.online</span>
        </div>

   

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/doctors" &&
                location.pathname === "/");

            
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",

                  gap: "12px",

                  padding: "12px 14px",

                  borderRadius: "12px",

                  textDecoration: "none",

                  fontSize: "0.95rem",

                  fontWeight: isActive ? "600" : "500",

                  color: isActive
                    ? "#ffffff"
                    : "#475569",

                  background: isActive
                    ? "linear-gradient(135deg, #2563eb, #06b6d4)"
                    : "transparent",

                  boxShadow: isActive
                    ? "0 6px 16px rgba(37, 99, 235, 0.22)"
                    : "none",

                  transition: "all 0.2s ease",

                  cursor: "pointer",
                }}

                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "#eff6ff";

                    e.currentTarget.style.color =
                      "#2563eb";

                    e.currentTarget.style.transform =
                      "translateX(4px)";
                  }
                }}

                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "transparent";

                    e.currentTarget.style.color =
                      "#475569";

                    e.currentTarget.style.transform =
                      "translateX(0)";
                  }
                }}
              >
                {/* Real SVG icon */}

                <Icon
                  size={20}
                  strokeWidth={2}
                  style={{
                    flexShrink: 0,
                  }}
                />

          

                <span>{item.label}</span>

               

                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

    

      <div>
      

        <div
          style={{
            borderTop: "1px solid #f1f5f9",

            paddingTop: "1rem",

            marginTop: "1rem",
          }}
        >
     

          <div
            style={{
              display: "flex",
              alignItems: "center",

              gap: "10px",

              padding: "10px",

              borderRadius: "12px",

              backgroundColor: "#f8fafc",
            }}
          >
            

            <div
              style={{
                width: "36px",
                height: "36px",

                borderRadius: "50%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: "#dbeafe",

                color: "#2563eb",
              }}
            >
              <LayoutDashboard size={18} />
            </div>

         

            <div>
              <p
                style={{
                  margin: 0,

                  fontSize: "0.85rem",

                  fontWeight: "700",

                  color: "#1f2937",
                }}
              >
                Patient Portal
              </p>

              <span
                style={{
                  fontSize: "0.75rem",

                  color: "#94a3b8",
                }}
              >
                Welcome back
              </span>
            </div>
          </div>
        </div>

       

        <div
          style={{
            marginTop: "12px",

            padding: "14px",

            borderRadius: "12px",

            background:
              "linear-gradient(135deg, #eff6ff, #f0fdfa)",

            border: "1px solid #dbeafe",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",

              fontSize: "0.8rem",

              fontWeight: "700",

              color: "#1e3a8a",
            }}
          >
            Need Help?
          </p>

          

          <a
            href="https://wa.me/961XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",

              gap: "8px",

              textDecoration: "none",

              color: "#16a34a",

              fontSize: "0.8rem",

              fontWeight: "600",

              marginBottom: "8px",

              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateX(0)";
            }}
          >
            <MessageCircle size={17} />

            <span>WhatsApp</span>
          </a>

         

          <a
            href="tel:+961XXXXXXXX"
            style={{
              display: "flex",
              alignItems: "center",

              gap: "8px",

              textDecoration: "none",

              color: "#2563eb",

              fontSize: "0.8rem",

              fontWeight: "600",

              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateX(0)";
            }}
          >
            <Phone size={17} />

            <span>+961 81 676 878</span>
          </a>
        </div>


        <div
          style={{
            marginTop: "14px",

            display: "flex",

            justifyContent: "center",

            gap: "10px",
          }}
        >
        

          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            style={{
              width: "36px",
              height: "36px",

              borderRadius: "10px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              backgroundColor: "#1877F2",

              color: "#ffffff",

              textDecoration: "none",

              fontSize: "18px",

              fontWeight: "700",

              boxShadow:
                "0 4px 10px rgba(24, 119, 242, 0.20)",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px)";

              e.currentTarget.style.boxShadow =
                "0 7px 16px rgba(24, 119, 242, 0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";

              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(24, 119, 242, 0.20)";
            }}
          >
            f
          </a>

         

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            style={{
              width: "36px",
              height: "36px",

              borderRadius: "10px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background:
                "linear-gradient(135deg, #833AB4, #E1306C, #FCAF45)",

              color: "#ffffff",

              textDecoration: "none",

              fontSize: "18px",

              fontWeight: "700",

              boxShadow:
                "0 4px 10px rgba(225, 48, 108, 0.20)",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px)";

              e.currentTarget.style.boxShadow =
                "0 7px 16px rgba(225, 48, 108, 0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";

              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(225, 48, 108, 0.20)";
            }}
          >
            ◎
          </a>

          

         
        </div>

     

        <p
          style={{
            textAlign: "center",

            margin: "10px 0 0",

            fontSize: "0.65rem",

            color: "#94a3b8",
          }}
        >
          © 2026 DR.online
        </p>
      </div>
    </aside>
  );
};

export default Navbar;

