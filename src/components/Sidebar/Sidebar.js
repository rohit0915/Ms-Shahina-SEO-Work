/** @format */

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, LOGOUT } from "../../store/authSlice";
import { openQuiz } from "../../store/quizSlice";
import AcneQuiz from "../AcneQuiz/AcneQuiz";
import { getProfile } from "../../Repository/Api";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MenuOptions } from "../../constants/constant";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track open submenu
  const [openSubSubmenu, setOpenSubSubmenu] = useState(null); // Track open sub-submenu
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const { isQuizOpen } = useSelector((store) => store.quiz);

  const navigationHandler = (link) => {
    onClose();
    navigate(link);
  };

  function LogoutHandler() {
    onClose();
    dispatch(LOGOUT());
    navigate("/login");
  }

  function fetchProfile() {
    getProfile(setProfile);
  }

  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  async function openQuizHandler() {
    await dispatch(openQuiz());
  }

  // Toggle submenu visibility
  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
    setOpenSubSubmenu(null); // Close any open sub-submenus
  };

  // Toggle sub-submenu visibility
  const toggleSubSubmenu = (key) => {
    setOpenSubSubmenu(openSubSubmenu === key ? null : key);
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={open}
      className="sidebar"
    >
      <div className="Sidebar_Menu">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AiOutlineClose className="closeIcon" onClick={() => onClose()} />
        </div>
        {isLoggedIn === true && (
          <>
            <div className="profile_View">
              {profile?.image ? (
                <ImageLazyLoading
                  img={profile?.image}
                  alt={"Avatar"}
                  className={"text-[10px]"}
                />
              ) : (
                <ImageLazyLoading
                  img={
                    "https://img.freepik.com/premium-vector/human-symbol-3d-icon-user-business-symbology-website-profile_593228-130.jpg?w=2000"
                  }
                  alt={"Default Avatar"}
                  className={"text-[10px]"}
                />
              )}

              <div className="content">
                <p className="title">
                  {profile?.firstName + " " + profile?.lastName}{" "}
                </p>

                <p className="email"> {profile?.email} </p>

                <Link to="/my-profile" onClick={() => onClose()}>
                  VIEW PROFILE{" "}
                </Link>
              </div>
            </div>

            <div className="empty"></div>
          </>
        )}

        <ul>
          {MenuOptions?.map((i, index) => (
            <li key={index}>
              {i.title === "ACNE QUIZ" ? (
                <span onClick={() => openQuizHandler()}>{i.title}</span>
              ) : i.title === "SERVICES" ? (
                <>
                  <div
                    className="menu-item flex-container"
                    onClick={() => toggleSubmenu(i.title)}
                  >
                    <span>{i.title}</span>
                    <IoIosArrowDown
                      className={`dropdown-icon ${openSubmenu === i.title ? "rotate" : ""
                        }`}
                    />
                  </div>
                  {openSubmenu === i.title && i.submenu && (
                    <ul className="submenu">
                      {i.submenu.map((subItem) => (
                        <li key={subItem.key}>
                          {subItem.children ? (
                            // Has children - use the toggle logic
                            <div
                              className="submenu-item flex-container"
                              onClick={() => toggleSubSubmenu(subItem.key)}
                            >
                              <span>{subItem.label}</span>
                              <IoIosArrowDown
                                className={`dropdown-icon ${openSubSubmenu === subItem.key ? "rotate" : ""
                                  }`}
                              />
                            </div>
                          ) : (
                            // No children - make the whole item clickable
                            <div
                              className="submenu-item flex-container"
                              onClick={() => navigationHandler(subItem.label.props.to)}
                            >
                              {subItem.label}
                            </div>
                          )}
                          {openSubSubmenu === subItem.key && subItem.children && (
                            <ul className="sub-submenu">
                              {subItem.children.map((child) => (
                                <li
                                  key={child.key}
                                  onClick={() => navigationHandler(child.label.props.to)}
                                >
                                  {child.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : i.title === "PAYMENT PLANS" ? (
                <a href={i.link}>{i.title}</a>
              ) : (
                <span onClick={() => navigationHandler(i.link)}>{i.title}</span>
              )}
            </li>
          ))}

          {isLoggedIn === true ? (
            <li onClick={() => LogoutHandler()}>Logout</li>
          ) : (
            <li onClick={() => navigationHandler("/login")}>LOGIN</li>
          )}
        </ul>
        {isQuizOpen && <AcneQuiz onClose={onClose} />}
      </div>
    </Drawer>
  );
};

export default Sidebar;